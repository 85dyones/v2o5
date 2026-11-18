#!/usr/bin/env node
// Gera os carrosséis fixos da V2O5: PNG 1080x1350 (Instagram e Facebook) e PDF (LinkedIn, documento).
// Uso: node social/carrosseis/gerar.mjs   (precisa do Playwright global; saída em social/carrosseis/saida/)
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../..");
const dados = JSON.parse(readFileSync(join(aqui, "conteudo.json"), "utf8"));
const fonte = "data:font/woff2;base64," + readFileSync(join(raiz, "src/app/fonts/geist-latin.woff2")).toString("base64");

// Símbolo da marca, do vetor do site (versão grande).
const ts = readFileSync(join(raiz, "src/lib/marca-vetor.ts"), "utf8");
const bloco = ts.slice(ts.indexOf('"grande": {'), ts.indexOf('"pequeno": {'));
const pega = (re) => bloco.match(re)[1];
const vb = readFileSync(join(raiz, "src/lib/marca.ts"), "utf8").match(/VIEWBOX = \{ x: (\d+), y: (\d+), largura: (\d+), altura: (\d+) \}/);
const simbolo = (cor) =>
  `<svg viewBox="${vb[1]} ${vb[2]} ${vb[3]} ${vb[4]}" aria-hidden="true"><path d="${pega(/"nuvem": "([^"]+)"/)}" fill="none" stroke="${cor}" stroke-width="${pega(/"tracoDaNuvem": ([\d.]+)/)}" stroke-linejoin="round"/><path d="${pega(/"rede": "([^"]+)"/)}" fill="${cor}"/><circle cx="${pega(/"ambar": \{\s*"cx": ([\d.]+)/)}" cy="${pega(/"cy": ([\d.]+),\s*"r": [\d.]+\s*\},\s*"nos"/)}" r="${pega(/"ambar": \{[^}]*"r": ([\d.]+)/)}" fill="#F2A516"/></svg>`;

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const CSS = `
@font-face{font-family:Geist;src:url("${fonte}") format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}
@page{size:1080px 1350px;margin:0}
body{background:#fff}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;background:#F2F1EC;color:#121418;font-family:Geist,sans-serif;page-break-after:always;break-after:page}
.s.esc{background:#121418;color:#F2F1EC}
.topo{position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:600;letter-spacing:-.01em}
.topo .m{display:flex;align-items:center;gap:16px}.topo i{display:block;width:38px;height:38px;background:#F2A516}
.topo .n{font-weight:500;color:#5A5D66}.esc .topo .n{color:#A9ACB4}
.fio{position:absolute;left:72px;right:72px;top:130px;height:3px;background:#121418}.esc .fio{background:#2E3138}
.corpo{position:absolute;left:72px;right:72px;top:190px;bottom:150px;display:flex;flex-direction:column;justify-content:center}
.et{align-self:flex-start;background:#F2A516;color:#121418;font-size:28px;font-weight:700;letter-spacing:.04em;padding:8px 18px;margin-bottom:36px;text-transform:uppercase}
h1{font-size:104px;line-height:1.04;font-weight:700;letter-spacing:-.04em}
h2{font-size:78px;line-height:1.08;font-weight:700;letter-spacing:-.035em}
p.c{font-size:42px;line-height:1.3;font-weight:500;margin-top:34px;color:#121418}
.sub{font-size:46px;line-height:1.25;color:#A9ACB4;margin-top:40px;font-weight:500}
.rod{position:absolute;left:72px;right:72px;bottom:64px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:500;color:#5A5D66;gap:30px}
.esc .rod{color:#A9ACB4}.rod b{color:#121418;font-weight:700}.esc .rod b{color:#F2F1EC}
.seta{flex:none;display:inline-block;background:#F2A516;color:#121418;width:64px;height:64px;text-align:center;line-height:60px;font-size:40px;font-weight:700}
.simb{width:300px;height:188px;margin-bottom:56px}
.sol{border-left:18px solid var(--c);padding-left:44px}
.sol h2{font-size:92px}.sol .l{font-size:26px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#5A5D66;margin-top:40px}
.sol .t{font-size:40px;line-height:1.28;font-weight:500;margin-top:10px}
.preco{display:inline-block;margin-top:48px;background:var(--c);color:var(--pc);font-size:58px;font-weight:700;letter-spacing:-.03em;padding:16px 30px}
.it{display:flex;gap:30px;align-items:flex-start;margin-top:34px}
.it u{flex:none;width:62px;height:62px;background:#F2A516;color:#121418;font-size:34px;font-weight:700;text-align:center;line-height:62px;text-decoration:none}
.it span{font-size:44px;line-height:1.25;font-weight:600;letter-spacing:-.02em;padding-top:2px}
.nota{margin-top:44px;font-size:34px;line-height:1.3;color:#5A5D66;font-weight:500;border-top:3px solid #D6D4CC;padding-top:26px}
.passo{border:3px solid #121418;background:#FAF9F5;padding:36px 40px;margin-top:32px}
.passo .n{font-size:30px;font-weight:700;background:#F2A516;display:inline-block;padding:4px 14px;margin-bottom:18px}
.passo h3{font-size:56px;line-height:1.08;font-weight:700;letter-spacing:-.03em}
.passo p{font-size:36px;line-height:1.3;margin-top:16px;font-weight:500;color:#33363D}
.num{margin-top:40px}.num b{display:block;font-size:150px;line-height:.95;font-weight:700;letter-spacing:-.05em}
.num span{display:block;font-size:40px;line-height:1.25;font-weight:500;margin-top:10px;color:#33363D}
.dest{color:#F2A516}
.botao{display:inline-block;margin-top:54px;background:#F2A516;color:#121418;font-size:50px;font-weight:700;letter-spacing:-.02em;padding:24px 44px}
`;
function slide(t, i, n) {
  const claro = t.tipo !== "capa" && t.tipo !== "cta";
  const topo = `<div class="topo"><div class="m"><i></i>V2O5 Vendas e Tecnologia</div><div class="n">${i + 1}/${n}</div></div><div class="fio"></div>`;
  const rod = (txt, seta) => `<div class="rod"><span>${txt}</span>${seta ? '<span class="seta">→</span>' : ""}</div>`;
  const seta = i < n - 1;
  let corpo = "";
  if (t.tipo === "capa") corpo = `<div class="simb">${simbolo("#F2F1EC")}</div><div class="et">${esc(t.etiqueta)}</div><h1>${esc(t.titulo)}</h1><div class="sub">${esc(t.sub)}</div>`;
  if (t.tipo === "texto") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.corpo.map((c) => `<p class="c">${esc(c)}</p>`).join("")}`;
  if (t.tipo === "solucao") {
    const texto = t.cor === "#F2A516" ? "#121418" : "#fff";
    corpo = `<div class="sol" style="--c:${t.cor};--pc:${texto}"><div class="et" style="background:${t.cor};color:${texto}">${esc(t.etiqueta)}</div><h2>${esc(t.nome)}</h2><div class="l">Quando</div><div class="t">${esc(t.quando)}</div><div class="l">O que você recebe</div><div class="t">${esc(t.recebe)}</div><div class="preco">${esc(t.preco)}</div></div>`;
  }
  if (t.tipo === "lista") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.itens.map((x, k) => `<div class="it"><u>${k + 1}</u><span>${esc(x)}</span></div>`).join("")}${t.nota ? `<div class="nota">${esc(t.nota)}</div>` : ""}`;
  if (t.tipo === "passos") corpo = `<div class="et">${esc(t.etiqueta)}</div>${t.passos.map((p) => `<div class="passo"><div class="n">${p.n}</div><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div>`).join("")}`;
  if (t.tipo === "numeros") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.numeros.map((x) => `<div class="num"><b>${esc(x.valor)}</b><span>${esc(x.rotulo)}</span></div>`).join("")}${t.nota ? `<div class="nota">${esc(t.nota)}</div>` : ""}`;
  if (t.tipo === "cta") corpo = `<div class="simb" style="width:220px;height:138px">${simbolo("#F2F1EC")}</div><h1 style="font-size:88px">${esc(t.titulo)} <span class="dest">${esc(t.destaque)}</span></h1><div><span class="botao">${esc(t.botao)}</span></div>`;
  const pe = t.tipo === "capa" ? rod(esc(t.rodape), true) : t.tipo === "cta" ? rod(esc(t.rodape), false) : rod("<b>v2o5.com.br</b>", seta);
  return `<section class="s ${claro ? "" : "esc"}">${topo}<div class="corpo">${corpo}</div>${pe}</section>`;
}
const html = (slides) => `<!doctype html><meta charset="utf-8"><style>${CSS}</style>${slides.map((t, i) => slide(t, i, slides.length)).join("")}`;

const saida = join(aqui, "saida");
mkdirSync(saida, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [nome, c] of Object.entries(dados)) {
  await p.setContent(html(c.slides));
  await p.waitForTimeout(400);
  const secoes = await p.$$("section.s");
  for (let i = 0; i < secoes.length; i++) await secoes[i].screenshot({ path: join(saida, `${nome}-${String(i + 1).padStart(2, "0")}.png`) });
  await p.pdf({ path: join(saida, `${nome}.pdf`), width: "1080px", height: "1350px", printBackground: true, preferCSSPageSize: true });
  console.log(nome, secoes.length, "slides");
}
await b.close();
