#!/usr/bin/env node
// Renderiza os reels de um lote, um a um, a partir do CSV de roteiros.
// Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,L1-02]
//        [--print L1-06=img.png] [--cena L1-01=conversa] [--sem-som]
// O HyperFrames não tem --batch: este script faz o laço com --variables.
// O som do final (efeito curto, sem música) é sintetizado aqui e juntado ao vídeo com o ffmpeg.
import { readFileSync, mkdirSync, writeFileSync, rmSync, existsSync, copyFileSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const [csv, ...flags] = process.argv.slice(2);
if (!csv) { console.error("Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,...] [--print L1-06=img.png] [--cena L1-01=conversa] [--sem-som]"); process.exit(1); }
const draft = flags.includes("--draft");
const semSom = flags.includes("--sem-som");
const so = (flags[flags.indexOf("--so") + 1] ?? "").split(",").filter(Boolean);
const pares = (nome) => Object.fromEntries(flags.flatMap((f, i) => (f === nome ? [flags[i + 1].split("=")] : [])));
const prints = pares("--print");
const cenas = pares("--cena");

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

// O símbolo da marca vem do vetor do site (src/lib/marca-vetor.ts, versão grande).
function simbolo() {
  const ts = readFileSync(join(raiz, "../src/lib/marca-vetor.ts"), "utf8");
  const bloco = ts.slice(ts.indexOf('"grande": {'), ts.indexOf('"pequeno": {'));
  const pega = (re) => bloco.match(re)[1];
  const marca = readFileSync(join(raiz, "../src/lib/marca.ts"), "utf8");
  const vb = marca.match(/VIEWBOX = \{ x: (\d+), y: (\d+), largura: (\d+), altura: (\d+) \}/);
  return {
    VIEWBOX: `${vb[1]} ${vb[2]} ${vb[3]} ${vb[4]}`,
    NUVEM: pega(/"nuvem": "([^"]+)"/), TRACO: pega(/"tracoDaNuvem": ([\d.]+)/),
    REDE: pega(/"rede": "([^"]+)"/),
    AMBAR_CX: pega(/"ambar": \{\s*"cx": ([\d.]+)/), AMBAR_CY: pega(/"cy": ([\d.]+),\s*"r": [\d.]+\s*\},\s*"nos"/), AMBAR_R: pega(/"ambar": \{[^}]*"r": ([\d.]+)/),
  };
}

// Efeito sonoro do final: subida suave, batida do logo, toque do átomo âmbar e saída. Sem música.
function efeito(arquivo, inicioDoFim, total) {
  const ms = (s) => Math.round(s * 1000);
  const f = [
    { src: "anoisesrc=d=1.1:c=pink:a=0.5", filtro: "highpass=f=700,lowpass=f=5200,afade=t=in:d=0.9,afade=t=out:st=0.9:d=0.2,volume=0.45", t: inicioDoFim + 0.1 },
    { src: "sine=f=88:d=0.45", filtro: "afade=t=out:st=0.05:d=0.4,volume=0.9", t: inicioDoFim + 1.15 },
    { src: "sine=f=1318:d=0.7", filtro: "afade=t=in:d=0.01,afade=t=out:st=0.05:d=0.65,volume=0.22", t: inicioDoFim + 1.18 },
    { src: "anoisesrc=d=0.5:c=pink:a=0.5", filtro: "highpass=f=900,lowpass=f=4200,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.25,volume=0.28", t: total - 0.55 },
  ];
  const args = ["-v", "error", "-y"];
  f.forEach((x) => args.push("-f", "lavfi", "-i", x.src));
  const grafo = f.map((x, i) => `[${i}:a]${x.filtro},adelay=${ms(x.t)}|${ms(x.t)}[a${i}]`).join(";") + `;${f.map((_, i) => `[a${i}]`).join("")}amix=inputs=${f.length}:normalize=0,atrim=0:${total},volume=5,alimiter=limit=0.7,apad=whole_dur=${total}[o]`;
  args.push("-filter_complex", grafo, "-map", "[o]", "-ar", "48000", "-ac", "2", arquivo);
  const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error("falhou ao gerar o efeito sonoro");
}

const reels = lerCsv(readFileSync(resolve(csv), "utf8")).filter((r) => !so.length || so.includes(r.codigo));
const saida = join(raiz, "saida");
mkdirSync(saida, { recursive: true });
const modelo = readFileSync(join(raiz, "modelos/reel/index.html"), "utf8");
const sim = simbolo();

for (const r of reels) {
  const dur = Math.max(14, Number(r.duracao_s));
  const G = 3.5, E = +(dur - 5.5).toFixed(1);
  let html = modelo.replaceAll("{{DURACAO}}", String(dur)).replaceAll("{{GANCHO_DUR}}", String(G)).replaceAll("{{FIM_INICIO}}", String(E));
  for (const [k, val] of Object.entries(sim)) html = html.replaceAll(`{{${k}}}`, val);
  const tmp = join(saida, `.tmp-${r.codigo}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  spawnSync("cp", ["-r", join(raiz, "modelos/reel") + "/.", tmp]);
  writeFileSync(join(tmp, "index.html"), html);
  let print = "";
  if (prints[r.codigo] && existsSync(prints[r.codigo])) {
    mkdirSync(join(tmp, "assets"), { recursive: true });
    copyFileSync(resolve(prints[r.codigo]), join(tmp, "assets/print.png"));
    print = "assets/print.png";
  }
  const cena = cenas[r.codigo] ?? "texto";
  const legendas = cena === "conversa" ? r.corpo.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚ])/) : [];
  const vars = { gancho: r.gancho, prova: r.texto_tela, print, cta: r.cta, cena, legendas: JSON.stringify(legendas) };
  const mudo = join(saida, `${r.codigo}.mudo.mp4`);
  const arq = join(saida, `${r.codigo}.mp4`);
  const res = spawnSync("npx", ["hyperframes", "render", tmp, "-o", mudo, "-q", draft ? "draft" : "delivery", "--variables", JSON.stringify(vars), "--quiet"], { cwd: raiz, stdio: "inherit" });
  rmSync(tmp, { recursive: true, force: true });
  if (res.status !== 0) { console.error(`falhou: ${r.codigo}`); process.exit(res.status ?? 1); }
  if (semSom) { renameSync(mudo, arq); }
  else {
    const wav = join(saida, `${r.codigo}.efeito.wav`);
    efeito(wav, E, dur);
    const m = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", mudo, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", arq], { stdio: "inherit" });
    if (m.status !== 0) { console.error(`falhou ao juntar o som: ${r.codigo}`); process.exit(m.status ?? 1); }
    rmSync(mudo, { force: true }); rmSync(wav, { force: true });
  }
  console.log(`${r.codigo} -> ${arq} (${dur} s, ${draft ? "draft" : "final"})`);
}
