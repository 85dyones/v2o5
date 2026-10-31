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
const COR = { linhaGrade: "#E4E2DA", tintaViolet: "#E0D9F0", tintaVerde: "#D3E6D9", tintaAzul: "#D5E0F3", tintaAmbar: "#F7E2B5", cartao: "#FAF9F5", tinta: "#121418", papel: "#F2F1EC", regua: "#D6D4CC", ambar: "#F2A516", violeta: "#6B46C8", verde: "#17773F", azul: "#2457C5", grafite: "#2A2D34", secundario: "#5A5D66" };
const ETAPAS = [COR.violeta, COR.verde, COR.azul, COR.ambar];


const base = (w, h, corpo) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url("${fonte}");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;background:${COR.papel};font-family:Geist,system-ui,sans-serif;color:${COR.tinta};overflow:hidden;position:relative}
.abs{position:absolute}
.bloco svg{width:100%;height:100%;display:block}
.rot{font-weight:500;text-transform:uppercase;letter-spacing:.14em;color:${COR.secundario}}
.h{font-weight:600;letter-spacing:-0.045em;line-height:1}
</style></head><body>${corpo}</body></html>`;

/** Colunas finas, como no fundo do site. */
const grade = (w, h, passo, inicio = 0) => {
  let l = "";
  for (let x = inicio; x < w; x += passo) l += `<line x1="${x + 0.5}" y1="0" x2="${x + 0.5}" y2="${h}" stroke="${COR.linhaGrade}" stroke-width="1"/>`;
  return `<svg class="abs" style="left:0;top:0" width="${w}" height="${h}">${l}</svg>`;
};

/** Faixa de quatro células com fio no topo na cor da etapa (a tira de soluções do site). */
const CELULAS = [["Branding", COR.violeta], ["Presença", COR.verde], ["Sites", COR.azul], ["Sprint", COR.ambar]];
const faixa = (x, y, larg, alt, fonte_) => {
  const c = larg / 4;
  return CELULAS.map(([t, cor], i) => `<div class="abs" style="left:${x + i * c}px;top:${y}px;width:${c}px;height:${alt}px;border:1px solid ${COR.regua};${i ? "border-left:none;" : ""}background:${COR.cartao}">
    <div class="abs" style="left:${fonte_ * 1.1}px;top:-1px;width:${fonte_ * 2.2}px;height:${Math.max(3, fonte_ * 0.28)}px;background:${cor}"></div>
    <div class="abs rot" style="left:${fonte_ * 1.1}px;top:${alt / 2 - fonte_ * 0.3}px;font-size:${fonte_}px">${t}</div></div>`).join("");
};

/** Botão do site: quadrado âmbar com seta e bloco tinta com o texto. */
const botao = (x, y, alt, texto, fonte_) => `<div class="abs" style="left:${x}px;top:${y}px;height:${alt}px;display:flex"><div style="width:${alt}px;height:${alt}px;background:${COR.ambar};display:flex;align-items:center;justify-content:center"><svg width="${alt * 0.4}" height="${alt * 0.4}" viewBox="0 0 16 16" fill="none" stroke="${COR.tinta}" stroke-width="1.8"><path d="M2 8h11M9 4l4 4-4 4"/></svg></div><div style="background:${COR.tinta};color:${COR.papel};font-weight:600;font-size:${fonte_}px;padding:0 ${alt * 0.5}px;display:flex;align-items:center">${texto}</div></div>`;

/** Rota na margem: barra vertical em quatro trechos, com o nó oco no topo. */
const margem = (x, y, alt, larg) => {
  const t = alt / 4;
  const barras = ETAPAS.map((c, i) => `<div class="abs" style="left:${x}px;top:${y + i * t}px;width:${larg}px;height:${t}px;background:${c}"></div>`).join("");
  const no = `<div class="abs" style="left:${x + larg / 2 - larg * 1.1}px;top:${y - larg * 1.1}px;width:${larg * 2.2}px;height:${larg * 2.2}px;border-radius:50%;background:${COR.papel};border:${larg * 0.4}px solid ${COR.tinta}"></div>`;
  return barras + no;
};

const PEÇAS = [];

// Avatar (todas as redes): o bloco da marca, quadrado, a rede corta em círculo.
PEÇAS.push({ arquivo: "avatar-1080.png", w: 1080, h: 1080, html: `<div class="bloco abs" style="inset:0">${bloco}</div>` });

// LinkedIn, página da empresa (1128 x 191, arquivo em 2x). A logo cobre x 0 a 260 e y de 70 para baixo.
PEÇAS.push({ arquivo: "linkedin-banner-empresa-1128x191.png", w: 1128, h: 191, escala: 2, html: base(1128, 191, `
  ${grade(1128, 191, 96, 48)}
  <div class="abs" style="left:0;bottom:0;width:100%;height:3px;background:${COR.tinta}"></div>
  <div class="abs rot" style="left:296px;top:22px;font-size:11px">Estratégia, processos e tecnologia</div>
  <div class="abs h" style="left:296px;top:44px;font-size:36px">Do problema ao resultado,<br>pelo caminho mais simples.</div>
  ${faixa(296, 132, 440, 40, 10)}
  <div class="abs rot" style="right:48px;top:22px;font-size:11px;text-align:right">Diagnóstico gratuito · on-line · Brasil todo</div>
  ${botao(792, 126, 46, "www.v2o5.com.br", 15)}`) });

// LinkedIn, perfil do fundador (1584 x 396). A foto do perfil cobre o canto inferior esquerdo.
PEÇAS.push({ arquivo: "linkedin-banner-pessoal-1584x396.png", w: 1584, h: 396, escala: 1, html: base(1584, 396, `
  ${grade(1584, 396, 132, 66)}
  <div class="abs" style="left:0;bottom:0;width:100%;height:4px;background:${COR.tinta}"></div>
  <div class="abs rot" style="left:560px;top:52px;font-size:15px">Dyones Oliveira · Fundador</div>
  <div class="abs h" style="left:560px;top:90px;font-size:68px">Do problema ao resultado,<br>pelo caminho mais simples.</div>
  ${faixa(560, 266, 600, 64, 14)}
  ${botao(1212, 258, 80, "www.v2o5.com.br", 20)}`) });

// Facebook, capa 820 x 312 (arquivo em 2x). O avatar cobre o canto inferior esquerdo; o celular corta as laterais.
PEÇAS.push({ arquivo: "facebook-capa-1640x624.png", w: 820, h: 312, escala: 2, html: base(820, 312, `
  ${grade(820, 312, 82, 41)}
  <div class="abs" style="left:0;bottom:0;width:100%;height:3px;background:${COR.tinta}"></div>
  <div class="abs rot" style="left:215px;top:36px;font-size:10px">Estratégia, processos e tecnologia</div>
  <div class="abs h" style="left:215px;top:58px;font-size:41px">Do problema ao resultado,<br>pelo caminho mais simples.</div>
  ${faixa(215, 186, 360, 38, 9)}
  ${botao(215, 242, 38, "www.v2o5.com.br", 13)}
  <div class="abs rot" style="left:445px;top:254px;font-size:10px">Diagnóstico gratuito · on-line</div>`) });

// Google, logo e foto de capa (16:9).
PEÇAS.push({ arquivo: "google-logo-720.png", w: 720, h: 720, html: `<div class="bloco abs" style="inset:0">${bloco}</div>` });
PEÇAS.push({ arquivo: "google-capa-1024x576.png", w: 1024, h: 576, escala: 2, html: base(1024, 576, `
  ${grade(1024, 576, 96, 64)}
  <div class="abs" style="left:0;bottom:0;width:100%;height:4px;background:${COR.tinta}"></div>
  ${margem(64, 88, 400, 8)}
  <div class="abs rot" style="left:128px;top:76px;font-size:15px">Estratégia, processos e tecnologia</div>
  <div class="abs h" style="left:128px;top:112px;font-size:70px">Do problema ao<br>resultado, pelo<br>caminho mais simples.</div>
  ${faixa(128, 396, 600, 62, 13)}
  ${botao(128, 484, 56, "www.v2o5.com.br", 18)}
  <div class="abs rot" style="left:440px;top:502px;font-size:14px">Diagnóstico gratuito · on-line · Brasil todo</div>`) });

// Instagram: capas dos destaques (1080 x 1920). O app mostra só um círculo no centro; o disco em tinta da etapa dá corpo ao ícone.
const destaques = [
  { nome: "Método", cy: 560, fundo: COR.tintaViolet, glifo: `<path d="M150 560 L400 560 L400 380 L650 380 L650 560 L890 560" fill="none" stroke="${COR.tinta}" stroke-width="22" stroke-linejoin="round"/><circle cx="150" cy="560" r="34" fill="${COR.violeta}"/><circle cx="400" cy="380" r="34" fill="${COR.verde}"/><circle cx="650" cy="560" r="34" fill="${COR.azul}"/><circle cx="890" cy="560" r="34" fill="${COR.ambar}"/>` },
  { nome: "Soluções", cy: 500, fundo: COR.tintaVerde, glifo: [[300, 400, COR.violeta], [580, 400, COR.verde], [300, 680, COR.azul], [580, 680, COR.ambar]].map(([x, y, c]) => `<rect x="${x}" y="${y - 140}" width="200" height="200" rx="18" fill="${c}"/>`).join("") },
  { nome: "Preços", cy: 530, fundo: COR.tintaAmbar, glifo: `<text x="540" y="650" text-anchor="middle" font-family="Geist" font-weight="700" font-size="330" fill="${COR.tinta}" letter-spacing="-14">R$</text>` },
  { nome: "Case", cy: 505, fundo: COR.tintaAzul, glifo: `<text x="540" y="650" text-anchor="middle" font-family="Geist" font-weight="700" font-size="400" fill="${COR.tinta}" letter-spacing="-14">M</text>` },
  { nome: "Diagnóstico", cy: 500, fundo: COR.tintaAmbar, glifo: `<text x="540" y="620" text-anchor="middle" font-family="Geist" font-weight="700" font-size="330" fill="${COR.tinta}" letter-spacing="-12">45'</text>` },
];
for (const d of destaques) {
  PEÇAS.push({ arquivo: `instagram-destaque-${d.nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}-1080x1920.png`, w: 1080, h: 1920, html: base(1080, 1920, `
    ${grade(1080, 1920, 120, 60)}
    <svg class="abs" style="left:0;top:0" width="1080" height="1920" viewBox="0 0 1080 1920"><circle cx="540" cy="960" r="430" fill="${d.fundo}" stroke="${COR.tinta}" stroke-width="6"/><g transform="translate(540 960) scale(0.82) translate(-540 -${d.cy})">${d.glifo}</g></svg>`) });
}

// Modelos de peça: post 1080 x 1350 e story 1080 x 1920 (grade, rota na margem, marca embaixo).
const marcaPe = (x, y) => `<div class="bloco abs" style="width:96px;height:96px;left:${x}px;top:${y}px">${bloco}</div><div class="abs" style="left:${x + 120}px;top:${y + 14}px;font-weight:600;font-size:30px;letter-spacing:-0.02em">V2O5 Vendas e Tecnologia</div><div class="abs rot" style="left:${x + 120}px;top:${y + 56}px;font-size:18px">www.v2o5.com.br</div>`;
PEÇAS.push({ arquivo: "instagram-modelo-post-1080x1350.png", w: 1080, h: 1350, html: base(1080, 1350, `
  ${grade(1080, 1350, 120, 60)}
  <div class="abs" style="left:0;top:0;width:100%;height:6px;background:${COR.tinta}"></div>
  ${margem(60, 150, 900, 14)}
  <div class="abs rot" style="left:150px;top:118px;font-size:24px">Pilar da semana</div>
  <div class="abs h" style="left:150px;top:180px;width:840px;font-size:118px">Título da peça em até três linhas.</div>
  <div class="abs" style="left:150px;top:760px;width:760px;font-size:40px;line-height:1.4;color:${COR.secundario}">Texto de apoio curto. Um número só entra com fonte e período.</div>
  <div class="abs" style="left:150px;top:1010px;width:840px;height:2px;background:${COR.tinta}"></div>
  ${marcaPe(150, 1080)}`) });
PEÇAS.push({ arquivo: "instagram-modelo-story-1080x1920.png", w: 1080, h: 1920, html: base(1080, 1920, `
  ${grade(1080, 1920, 120, 60)}
  <div class="abs" style="left:0;top:0;width:100%;height:6px;background:${COR.tinta}"></div>
  ${margem(60, 330, 1000, 14)}
  <div class="abs rot" style="left:150px;top:300px;font-size:26px">Pilar da semana</div>
  <div class="abs h" style="left:150px;top:370px;width:840px;font-size:132px">Pergunta ou ideia do story.</div>
  <div class="abs" style="left:150px;top:1000px;width:760px;font-size:44px;line-height:1.4;color:${COR.secundario}">Deixe o centro livre para o adesivo de enquete ou de link.</div>
  ${marcaPe(150, 1500)}`) });


// LinkedIn, Service Page: cartões de exemplo (1200 x 627) com os pacotes e preços de referência de `src/conteudo/ofertas.ts` e `sprint.ts`.
const dataUri = (arq, mime) => `data:${mime};base64,${readFileSync(join(raiz, "src", "assets", "motors", arq)).toString("base64")}`;
const cartao = ({ arquivo, etiqueta, cor, titulo, linhas, rodape, lateral = "" }) => PEÇAS.push({ arquivo, w: 1200, h: 627, escala: 1, html: base(1200, 627, `
  ${grade(1200, 627, 100, 50)}
  <div class="abs" style="left:0;top:0;width:12px;height:100%;background:${cor}"></div>
  <div class="abs" style="left:0;bottom:0;width:100%;height:4px;background:${COR.tinta}"></div>
  <div class="bloco abs" style="width:56px;height:56px;left:64px;top:44px">${bloco}</div>
  <div class="abs rot" style="left:138px;top:62px;font-size:16px">${etiqueta}</div>
  <div class="abs h" style="left:64px;top:128px;width:${lateral ? 560 : 1000}px;font-size:${lateral ? 54 : 62}px">${titulo}</div>
  <div class="abs" style="left:64px;top:${lateral ? 300 : 280}px;width:${lateral ? 600 : 1070}px">${linhas.map(([n, d, v]) => `<div style="display:flex;align-items:baseline;gap:20px;padding:14px 0;border-top:1px solid ${COR.regua}"><div style="font-weight:600;font-size:26px;letter-spacing:-0.02em;min-width:${lateral ? 250 : 330}px">${n}</div><div style="font-weight:500;font-size:18px;color:${COR.secundario};flex:1">${d}</div><div style="font-weight:700;font-size:24px;background:${COR.tintaAmbar};padding:0 8px;white-space:nowrap">${v}</div></div>`).join("")}</div>
  ${lateral}
  <div class="abs rot" style="left:64px;bottom:34px;font-size:15px">${rodape}</div>
  <div class="abs" style="right:64px;bottom:26px;font-weight:700;font-size:20px">www.v2o5.com.br</div>`) });

cartao({ arquivo: "linkedin-servico-sprint-1200x627.png", etiqueta: "Sprint de Eficiência", cor: COR.ambar, titulo: "Um gargalo resolvido, com antes e depois medidos.",
  linhas: [["Sprint Essencial", "1 a 2 semanas · um gargalo delimitado", "R$ 3.900"], ["Sprint Integrado", "2 a 4 semanas · um fluxo entre sistemas", "R$ 6.900"], ["Sprint Avançado", "Escopo sob medida, em proposta", "a partir de R$ 12.900"]],
  rodape: "Preços de referência. O valor fechado sai em proposta." });
cartao({ arquivo: "linkedin-servico-sites-1200x627.png", etiqueta: "Sites & Integrações", cor: COR.azul, titulo: "Site próprio, rápido e ligado ao seu sistema.",
  linhas: [["Landing Page", "Uma oferta, uma página", "R$ 2.900"], ["Site Personalizado", "Estrutura comercial", "R$ 5.900"], ["Site Conectado", "CRM ou estoque", "a partir de R$ 9.900"]],
  rodape: "Case: Motors Store · capturas de 26/10/2026",
  lateral: `<div class="abs" style="right:64px;top:44px;display:flex;gap:18px"><img src="${dataUri("vitrine.webp", "image/webp")}" style="width:190px;height:411px;object-fit:cover;object-position:top;border:2px solid ${COR.tinta}"><img src="${dataUri("veiculo.webp", "image/webp")}" style="width:190px;height:411px;object-fit:cover;object-position:top;border:2px solid ${COR.tinta};margin-top:56px"></div>` });
cartao({ arquivo: "linkedin-servico-presenca-1200x627.png", etiqueta: "Presença Digital Local", cor: COR.verde, titulo: "Ser encontrado com a informação certa.",
  linhas: [["Presença Essencial", "Mensalidade opcional de R$ 390", "R$ 790"], ["Presença Estruturada", "Mensalidade opcional de R$ 490", "R$ 1.490"], ["Presença Assistida", "Mensalidade opcional de R$ 890", "R$ 1.990"]],
  rodape: "Perfil no Google, redes e WhatsApp organizados" });
cartao({ arquivo: "linkedin-servico-branding-1200x627.png", etiqueta: "Branding & Identidade", cor: COR.violeta, titulo: "Uma marca que mostra o que a empresa entrega.",
  linhas: [["Identidade Essencial", "Identidade visual funcional e guia básico", "R$ 2.400"], ["Marca em Uso", "Aplicada no dia a dia comercial", "R$ 4.900"], ["Reposicionamento", "Muda como o mercado percebe a empresa", "a partir de R$ 7.900"]],
  rodape: "Preços de referência. Escopo fechado em proposta." });
cartao({ arquivo: "linkedin-servico-continuidade-1200x627.png", etiqueta: "Continuidade", cor: COR.grafite, titulo: "Manter e evoluir o que foi entregue, com limites escritos.",
  linhas: [["Cuidado Técnico", "Hospedagem, backup e suporte", "R$ 349/mês"], ["Integrações Monitoradas", "Monitora e corrige as integrações", "R$ 590/mês"], ["Evolução Contínua", "Melhorias mensais priorizadas", "R$ 990/mês"]],
  rodape: "Opcional. Nenhuma solução obriga a comprar outra." });
const passos = [["1", "Responde na hora", COR.violeta], ["2", "Qualifica", COR.verde], ["3", "Agenda", COR.azul], ["4", "Chama a equipe", COR.ambar]];
PEÇAS.push({ arquivo: "linkedin-servico-chatbot-whatsapp-1200x627.png", w: 1200, h: 627, html: base(1200, 627, `
  ${grade(1200, 627, 100, 50)}
  <div class="abs" style="left:0;top:0;width:12px;height:100%;background:${COR.verde}"></div>
  <div class="abs" style="left:0;bottom:0;width:100%;height:4px;background:${COR.tinta}"></div>
  <div class="bloco abs" style="width:56px;height:56px;left:64px;top:44px">${bloco}</div>
  <div class="abs rot" style="left:138px;top:62px;font-size:16px">Chatbot com IA para WhatsApp</div>
  <div class="abs h" style="left:64px;top:128px;width:1000px;font-size:62px">Um agente que atende com o que a empresa sabe.</div>
  ${passos.map(([n, t, c], i) => `<div class="abs" style="left:${64 + i * 275}px;top:330px;width:255px;height:130px;border:1px solid ${COR.regua};background:${COR.cartao}"><div class="abs" style="left:20px;top:-1px;width:44px;height:5px;background:${c}"></div><div class="abs rot" style="left:20px;top:26px;font-size:14px">Passo ${n}</div><div class="abs" style="left:20px;top:64px;font-weight:600;font-size:26px;letter-spacing:-0.02em">${t}</div></div>`).join("")}
  <div class="abs rot" style="left:64px;bottom:34px;font-size:15px">Entra num Sprint de Eficiência</div>
  <div class="abs" style="right:64px;bottom:26px;font-weight:700;font-size:20px">www.v2o5.com.br</div>`) });

const nav = await chromium.launch();
for (const p of PEÇAS) {
  const pag = await nav.newPage({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: p.escala ?? 1 });
  await pag.setContent(p.html, { waitUntil: "load" });
  await pag.evaluate(async () => { await document.fonts.load("600 100px Geist"); await document.fonts.load("500 100px Geist"); await document.fonts.load("700 100px Geist"); await document.fonts.ready; });
  await pag.screenshot({ path: join(saida, p.arquivo) });
  await pag.close();
  console.log(p.arquivo);
}
await nav.close();
copyFileSync(join(raiz, "design", "marca", "bloco-1080.png"), join(saida, "avatar-1080-original.png"));
