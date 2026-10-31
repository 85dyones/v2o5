// Gera os criativos dos perfis (LinkedIn, Facebook, Instagram) em design/marca/redes/.
// Uso: node design/ferramentas/gerar-redes.mjs   (precisa do Playwright e do Chromium já instalados)
import { createRequire } from "node:module";
import { readFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const saida = join(raiz, "design", "marca", "redes");
mkdirSync(saida, { recursive: true });

// Embutida em base64: o Chromium não abre file:// a partir de uma página em memória.
const fonte = `data:font/woff2;base64,${readFileSync(join(raiz, "src", "app", "fonts", "geist-latin.woff2")).toString("base64")}`;
const bloco = readFileSync(join(raiz, "design", "marca", "bloco.svg"), "utf8");
const COR = { tinta: "#121418", papel: "#F2F1EC", regua: "#D6D4CC", ambar: "#F2A516", violeta: "#6B46C8", verde: "#17773F", azul: "#2457C5", grafite: "#2A2D34", secundario: "#5A5D66" };
const ETAPAS = [COR.violeta, COR.verde, COR.azul, COR.ambar];

const base = (w, h, corpo) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url("${fonte}");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;background:${COR.papel};font-family:Geist,system-ui,sans-serif;color:${COR.tinta};overflow:hidden}
.abs{position:absolute}
.bloco svg{width:100%;height:100%;display:block}
</style></head><body>${corpo}</body></html>`;

/** A rota: fio de tinta com as quatro paradas nas cores do vanádio. */
const rota = (x, y, largura, raio) => {
  const passo = largura / 3;
  const paradas = ETAPAS.map((c, i) => `<circle cx="${x + i * passo}" cy="${y}" r="${raio}" fill="${c}"/>`).join("");
  return `<svg class="abs" style="left:0;top:0" width="100%" height="100%"><line x1="${x}" y1="${y}" x2="${x + largura}" y2="${y}" stroke="${COR.tinta}" stroke-width="${Math.max(2, raio / 2.5)}"/>${paradas}</svg>`;
};

const PEÇAS = [];

// Avatar (todas as redes): o bloco da marca, quadrado, a rede corta em círculo.
PEÇAS.push({ arquivo: "avatar-1080.png", w: 1080, h: 1080, html: `<div class="bloco abs" style="inset:0">${bloco}</div>` });

// LinkedIn: banner da página da empresa (1128 x 191). A logo da página cobre o canto inferior esquerdo.
const banner = (w, h, k) => base(w, h, `
  ${rota(260 * k, h - 38 * k, w - 260 * k - 60 * k, 7 * k)}
  <div class="abs" style="left:${260 * k}px;top:${34 * k}px;font-weight:700;font-size:${34 * k}px;letter-spacing:-0.02em;line-height:1.1">V2O5 | Eficiência comercial e<br>operacional com tecnologia.</div>
  <div class="abs" style="right:${60 * k}px;top:${40 * k}px;text-align:right;font-weight:500;font-size:${15 * k}px;color:${COR.secundario};line-height:1.4">Diagnóstico gratuito de 45 minutos<br>On-line, em todo o Brasil<br><span style="color:${COR.tinta};font-weight:700">www.v2o5.com.br</span></div>`);
PEÇAS.push({ arquivo: "linkedin-banner-empresa-1128x191.png", w: 1128, h: 191, html: banner(1128, 191, 1), escala: 1 });
PEÇAS.push({ arquivo: "linkedin-banner-pessoal-1584x396.png", w: 1584, h: 396, escala: 1, html: base(1584, 396, `
  ${rota(560, 330, 900, 9)}
  <div class="abs" style="left:560px;top:90px;font-weight:700;font-size:56px;letter-spacing:-0.02em;line-height:1.1">Do problema ao resultado,<br>pelo caminho mais simples.</div>
  <div class="abs" style="left:560px;top:250px;font-weight:500;font-size:22px;color:${COR.secundario}">Dyones Oliveira · Fundador, V2O5 Vendas e Tecnologia · www.v2o5.com.br</div>`) });

// Facebook: capa 820 x 312 (arquivo em 2x). O avatar cobre o canto inferior esquerdo; no celular a rede corta as laterais.
PEÇAS.push({ arquivo: "facebook-capa-1640x624.png", w: 820, h: 312, escala: 2, html: base(820, 312, `
  ${rota(250, 262, 430, 6)}
  <div class="abs" style="left:250px;top:62px;font-weight:700;font-size:30px;letter-spacing:-0.02em;line-height:1.12">V2O5 | Eficiência comercial<br>e operacional com tecnologia.</div>
  <div class="abs" style="left:250px;top:150px;font-weight:500;font-size:15px;color:${COR.secundario};line-height:1.45">Diagnóstico gratuito de 45 minutos.<br>On-line, em todo o Brasil. <span style="color:${COR.tinta};font-weight:700">www.v2o5.com.br</span></div>`) });

// Instagram: capas dos destaques (1080 x 1920; o app mostra só um círculo no centro, por isso o símbolo fica grande e central).
const destaques = [
  { nome: "Método", cy: 560, cor: COR.violeta, glifo: `<path d="M150 560 L400 560 L400 380 L650 380 L650 560 L890 560" fill="none" stroke="${COR.tinta}" stroke-width="22" stroke-linejoin="round"/><circle cx="150" cy="560" r="34" fill="${COR.violeta}"/><circle cx="400" cy="380" r="34" fill="${COR.verde}"/><circle cx="650" cy="560" r="34" fill="${COR.azul}"/><circle cx="890" cy="560" r="34" fill="${COR.ambar}"/>` },
  { nome: "Soluções", cy: 500, cor: COR.verde, glifo: [[300, 400, COR.violeta], [580, 400, COR.verde], [300, 680, COR.azul], [580, 680, COR.ambar]].map(([x, y, c]) => `<rect x="${x}" y="${y - 140}" width="200" height="200" rx="18" fill="${c}"/>`).join("") },
  { nome: "Preços", cy: 530, cor: COR.ambar, glifo: `<text x="540" y="650" text-anchor="middle" font-family="Geist" font-weight="800" font-size="330" fill="${COR.tinta}" letter-spacing="-12">R$</text>` },
  { nome: "Case", cy: 505, cor: COR.azul, glifo: `<text x="540" y="650" text-anchor="middle" font-family="Geist" font-weight="800" font-size="400" fill="${COR.tinta}" letter-spacing="-12">M</text>` },
  { nome: "Diagnóstico", cy: 500, cor: COR.ambar, glifo: `<text x="540" y="620" text-anchor="middle" font-family="Geist" font-weight="800" font-size="330" fill="${COR.tinta}" letter-spacing="-10">45'</text>` },
];
for (const d of destaques) {
  PEÇAS.push({ arquivo: `instagram-destaque-${d.nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}-1080x1920.png`, w: 1080, h: 1920, html: base(1080, 1920, `
    <svg class="abs" style="left:0;top:0" width="1080" height="1920" viewBox="0 0 1080 1920"><g transform="translate(540 960) scale(0.85) translate(-540 -${d.cy})">${d.glifo}</g>
    <circle cx="540" cy="960" r="430" fill="none" stroke="${COR.regua}" stroke-width="3" stroke-dasharray="4 14"/></svg>`) });
}

// Perfil da Empresa no Google: logo 720 x 720 e foto de capa 1024 x 576 (16:9, texto no centro; o Google corta as bordas em alguns formatos).
PEÇAS.push({ arquivo: "google-logo-720.png", w: 720, h: 720, html: `<div class="bloco abs" style="inset:0">${bloco}</div>` });
PEÇAS.push({ arquivo: "google-capa-1024x576.png", w: 1024, h: 576, html: base(1024, 576, `
  ${rota(112, 400, 800, 9)}
  <div class="abs" style="left:112px;top:128px;font-weight:700;font-size:52px;letter-spacing:-0.02em;line-height:1.1">V2O5 | Eficiência comercial<br>e operacional com tecnologia.</div>
  <div class="abs" style="left:112px;top:290px;font-weight:500;font-size:24px;color:${COR.secundario};line-height:1.45">Diagnóstico gratuito de 45 minutos. On-line, em todo o Brasil.<br><span style="color:${COR.tinta};font-weight:700">www.v2o5.com.br</span></div>
  <div class="bloco abs" style="width:72px;height:72px;left:112px;top:36px">${bloco}</div>`) });

// Modelos de peça: post 1080 x 1350 e story 1080 x 1920 (fundo papel, rota na margem, marca no canto).
const marca = `<div class="bloco abs" style="width:96px;height:96px;left:80px;bottom:80px">${bloco}</div><div class="abs" style="left:200px;bottom:98px;font-weight:700;font-size:30px">V2O5 Vendas e Tecnologia</div>`;
PEÇAS.push({ arquivo: "instagram-modelo-post-1080x1350.png", w: 1080, h: 1350, html: base(1080, 1350, `
  ${rota(80, 110, 920, 12)}
  <div class="abs" style="left:80px;top:230px;width:920px;font-weight:700;font-size:96px;letter-spacing:-0.03em;line-height:1.05">Título da peça em até três linhas.</div>
  <div class="abs" style="left:80px;top:700px;width:760px;font-weight:500;font-size:40px;line-height:1.4;color:${COR.secundario}">Texto de apoio curto. Um número só entra com fonte e período.</div>
  ${marca}`) });
PEÇAS.push({ arquivo: "instagram-modelo-story-1080x1920.png", w: 1080, h: 1920, html: base(1080, 1920, `
  ${rota(80, 280, 920, 12)}
  <div class="abs" style="left:80px;top:420px;width:920px;font-weight:700;font-size:104px;letter-spacing:-0.03em;line-height:1.05">Pergunta ou ideia do story.</div>
  <div class="abs" style="left:80px;top:900px;width:800px;font-weight:500;font-size:44px;line-height:1.4;color:${COR.secundario}">Deixe o centro livre para o adesivo de enquete ou de link.</div>
  <div class="bloco abs" style="width:96px;height:96px;left:80px;bottom:320px">${bloco}</div><div class="abs" style="left:200px;bottom:338px;font-weight:700;font-size:30px">V2O5 Vendas e Tecnologia</div>`) });

const nav = await chromium.launch();
for (const p of PEÇAS) {
  const pag = await nav.newPage({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: p.escala ?? 1 });
  await pag.setContent(p.html, { waitUntil: "load" });
  await pag.evaluate(async () => { await document.fonts.load("800 100px Geist"); await document.fonts.load("700 100px Geist"); await document.fonts.load("500 100px Geist"); await document.fonts.ready; });
  await pag.screenshot({ path: join(saida, p.arquivo) });
  await pag.close();
  console.log(p.arquivo);
}
await nav.close();
copyFileSync(join(raiz, "design", "marca", "bloco-1080.png"), join(saida, "avatar-1080-original.png"));
