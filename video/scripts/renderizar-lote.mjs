#!/usr/bin/env node
// Renderiza os reels de um lote, um a um, a partir do CSV de roteiros.
// Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,L1-02] [--print L1-06=caminho.png]
// O HyperFrames não tem --batch: este script faz o laço com --variables.
import { readFileSync, mkdirSync, writeFileSync, rmSync, existsSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const [csv, ...flags] = process.argv.slice(2);
if (!csv) { console.error("Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,...] [--print L1-06=img.png]"); process.exit(1); }
const draft = flags.includes("--draft");
const so = (flags[flags.indexOf("--so") + 1] ?? "").split(",").filter(Boolean);
const prints = Object.fromEntries(flags.flatMap((f, i) => (f === "--print" ? [flags[i + 1].split("=")] : [])));

function lerCsv(texto) {
  const linhas = []; let campo = ""; let linha = []; let aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) { if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; } else if (c === '"') aspas = false; else campo += c; }
    else if (c === '"') aspas = true;
    else if (c === ",") { linha.push(campo); campo = ""; }
    else if (c === "\n") { linha.push(campo); linhas.push(linha); linha = []; campo = ""; }
    else if (c !== "\r") campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...resto] = linhas;
  return resto.filter((l) => l.length === cab.length).map((l) => Object.fromEntries(cab.map((k, i) => [k, l[i]])));
}

const reels = lerCsv(readFileSync(resolve(csv), "utf8")).filter((r) => !so.length || so.includes(r.codigo));
const saida = join(raiz, "saida");
mkdirSync(saida, { recursive: true });
const modelo = readFileSync(join(raiz, "modelos/reel/index.html"), "utf8");

for (const r of reels) {
  const dur = Math.max(12, Number(r.duracao_s));
  const G = 3.5, C = +(dur - 4.5).toFixed(1);
  const html = modelo
    .replaceAll("{{DURACAO}}", String(dur)).replaceAll("{{GANCHO_DUR}}", String(G))
    .replaceAll("{{MEIO_DUR}}", String(+(C - G).toFixed(1))).replaceAll("{{CTA_INICIO}}", String(C)).replaceAll("{{CTA_DUR}}", "4.5");
  const tmp = join(saida, `.tmp-${r.codigo}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  spawnSync("cp", ["-r", join(raiz, "modelos/reel") + "/.", tmp]);
  writeFileSync(join(tmp, "index.html"), html);
  let print = "";
  if (prints[r.codigo] && existsSync(prints[r.codigo])) {
    // A imagem precisa estar dentro da pasta do projeto para o render servi-la.
    mkdirSync(join(tmp, "assets"), { recursive: true });
    copyFileSync(resolve(prints[r.codigo]), join(tmp, "assets/print.png"));
    print = "assets/print.png";
  }
  const vars = { gancho: r.gancho, prova: r.texto_tela, print, cta: r.cta };
  const arq = join(saida, `${r.codigo}.mp4`);
  const res = spawnSync("npx", ["hyperframes", "render", tmp, "-o", arq, "-q", draft ? "draft" : "delivery", "--variables", JSON.stringify(vars), "--quiet"], { cwd: raiz, stdio: "inherit" });
  rmSync(tmp, { recursive: true, force: true });
  if (res.status !== 0) { console.error(`falhou: ${r.codigo}`); process.exit(res.status ?? 1); }
  console.log(`${r.codigo} -> ${arq} (${dur} s)`);
}
