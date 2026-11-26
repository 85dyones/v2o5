#!/usr/bin/env node
// Gera as capas dos reels (1080x1920) com o gancho e o destaque âmbar de legenda, como no vídeo.
// Lê ../docs/reels/lote-1.csv (gancho) e capas.json (trecho em destaque). Saída: saida/capas/L1-XX.jpg
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const destaques = JSON.parse(readFileSync(join(raiz, "capas.json"), "utf8"));
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
const ganchos = Object.fromEntries(lerCsv(readFileSync(join(raiz, "../docs/reels/lote-1.csv"), "utf8")).map((r) => [r.codigo, r.gancho]));
const fonte = "data:font/woff2;base64," + readFileSync(join(raiz, "modelos/reel/assets/geist-latin.woff2")).toString("base64");
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function html(g, trecho) {
  const i = g.indexOf(trecho);
  if (i < 0) throw new Error(`destaque não está no gancho: ${trecho} / ${g}`);
  const antes = g.slice(0, i), fim = g.slice(i + trecho.length);
  const quebra = (t) => esc(t).replace(/([.?!])\s+/g, "$1<br>");
  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url("${fonte}") format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:#F2F1EC;font-family:Geist,sans-serif;color:#121418;overflow:hidden}
.marca{position:absolute;left:72px;top:270px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:600;letter-spacing:-.01em}
.marca i{width:44px;height:44px;background:#F2A516;display:block}.fio{position:absolute;left:72px;right:72px;top:350px;height:3px;background:#121418}
h1{position:absolute;left:72px;right:72px;top:560px;font-size:108px;line-height:1.14;font-weight:700;letter-spacing:-.035em}
mark{background:#F2A516;color:#121418;padding:0 .09em;margin:0 -.03em;box-decoration-break:clone;-webkit-box-decoration-break:clone}
</style><div class="marca"><i></i>V2O5 Vendas e Tecnologia</div><div class="fio"></div><h1>${quebra(antes)}<mark>${quebra(trecho)}</mark>${quebra(fim)}</h1>`;
}
mkdirSync(join(raiz, "saida/capas"), { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [c, trecho] of Object.entries(destaques)) {
  await p.setContent(html(ganchos[c], trecho)); await p.waitForTimeout(250);
  await p.screenshot({ path: join(raiz, `saida/capas/${c}.jpg`), type: "jpeg", quality: 92 });
}
await b.close();
console.log("capas:", Object.keys(destaques).length);
