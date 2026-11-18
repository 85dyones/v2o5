#!/usr/bin/env node
// Gera os carrosséis fixos da V2O5: PNG 1080x1350 (Instagram e Facebook) e PDF (LinkedIn, documento).
// Uso: node social/carrosseis/gerar.mjs   (precisa do Playwright global; saída em social/carrosseis/saida/)
//   CAPA=papel|ambar|tinta|escuro  troca o estilo de todas as capas (padrão: o "estilo" de cada capa em conteudo.json)
//   OPCOES=1                       gera só as quatro opções de capa do primeiro carrossel
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../..");
// conteudo-dores-v2.json (18/11) substitui as seis dores de conteudo-semana1.json: capa com cenário, cena de virada, escala e chamada específica.
const dados = {
  ...JSON.parse(readFileSync(join(aqui, "conteudo.json"), "utf8")),
  ...JSON.parse(readFileSync(join(aqui, "conteudo-semana1.json"), "utf8")),
  ...JSON.parse(readFileSync(join(aqui, "conteudo-dores-v2.json"), "utf8")),
  ...JSON.parse(readFileSync(join(aqui, "conteudo-fixos-v2.json"), "utf8")),
};
const fonte = "data:font/woff2;base64," + readFileSync(join(raiz, "src/app/fonts/geist-latin.woff2")).toString("base64");

// O símbolo da marca e a planta de construção do rodapé do site, lidos direto dos dados do site.
const { SIMBOLO_C1D } = await import(join(raiz, "src/lib/marca-vetor.ts"));
const { DESENHOS, VIEWBOX } = await import(join(raiz, "src/lib/marca.ts"));
const { CIRCULOS_DA_NUVEM, COTAS_DOS_ATOMOS } = await import(join(raiz, "src/lib/construcao.ts"));
const V = SIMBOLO_C1D.grande;
const NOS = V.nos;
const vb = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.largura} ${VIEWBOX.altura}`;
const simbolo = (cor, atomo = "#F2A516") =>
  `<svg viewBox="${vb}" aria-hidden="true"><path d="${V.nuvem}" fill="none" stroke="${cor}" stroke-width="${V.tracoDaNuvem}" stroke-linejoin="round"/><path d="${V.rede}" fill="${cor}"/><circle cx="${V.ambar.cx}" cy="${V.ambar.cy}" r="${V.ambar.r}" fill="${atomo}"/></svg>`;

// A planta do símbolo, como no rodapé do site: grade, círculos da nuvem, ligações, cotas e o símbolo por cima.
const TONS = {
  papel: { grade: "#E3E1DA", constr: "#BDBBB3", no: "#BDBBB3", cota: "#7A7972", simbolo: "#121418", atomo: "#F2A516" },
  ambar: { grade: "rgba(18,20,24,.13)", constr: "rgba(18,20,24,.38)", no: "rgba(18,20,24,.45)", cota: "rgba(18,20,24,.6)", simbolo: "#121418", atomo: "#F2F1EC" },
  tinta: { grade: "rgba(18,20,24,.10)", constr: "rgba(18,20,24,.30)", no: "rgba(18,20,24,.4)", cota: "rgba(18,20,24,.55)", simbolo: "#121418", atomo: "#F2A516" },
};
TONS.verde = TONS.tinta; // as tintas das valências do vanádio: verde, violeta e azul (tinta)
TONS.violeta = TONS.tinta;
function planta(tom) {
  const t = TONS[tom];
  const gx = [...new Set([...Object.values(NOS).map((n) => n.x), ...CIRCULOS_DA_NUVEM.map((c) => c.x)])];
  const gy = [...new Set([...Object.values(NOS).map((n) => n.y), ...CIRCULOS_DA_NUVEM.map((c) => c.y)])];
  const ambarId = Object.entries(NOS).find(([, n]) => n.x === V.ambar.cx && n.y === V.ambar.cy)?.[0];
  const lig = DESENHOS.C1d.ligacoes;
  const grade = gx.map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100"/>`).join("") + gy.map((y) => `<line x1="-10" y1="${y}" x2="140" y2="${y}"/>`).join("");
  const circulos = CIRCULOS_DA_NUVEM.map((c) => `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" stroke-dasharray="1.2 1.2"/><rect x="${c.x - 0.9}" y="${c.y - 0.9}" width="1.8" height="1.8" fill="${t.no}" stroke="none"/>`).join("");
  const ligacoes = lig.map(([a, b]) => `<line x1="${NOS[a].x}" y1="${NOS[a].y}" x2="${NOS[b].x}" y2="${NOS[b].y}"/>`).join("");
  const atomos = Object.entries(NOS).map(([id, n]) => `<circle cx="${n.x}" cy="${n.y}" r="${n.r + 1.6}" stroke="${id === ambarId ? "#F2A516" : t.no}" stroke-width=".4"/>`).join("");
  const cotas = CIRCULOS_DA_NUVEM.map((c) => `<line x1="${c.x}" y1="${c.y}" x2="${c.x + c.r * 0.707}" y2="${c.y - c.r * 0.707}" stroke="${t.cota}" stroke-width=".25"/><text x="${c.x + c.r * 0.36 + 1}" y="${c.y - c.r * 0.36 - 1}">r ${c.r}</text>`).join("");
  return `<svg class="planta" viewBox="2 10 124 78" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<g stroke="${t.grade}" stroke-width=".25">${grade}</g>
<g fill="none" stroke="${t.constr}" stroke-width=".35">${circulos}${ligacoes}${atomos}</g>
<g font-family="Geist,sans-serif" font-size="2.4" fill="${t.cota}">${cotas}<text x="${NOS.V1.x - 4}" y="${NOS.V1.y + 11.5}">V · ${COTAS_DOS_ATOMOS.V}</text><text x="${NOS.Ob.x + 6.5}" y="${NOS.Ob.y + 1}">O · ${COTAS_DOS_ATOMOS.O}</text></g>
<path d="${V.nuvem}" fill="none" stroke="${t.simbolo}" stroke-width="${V.tracoDaNuvem}" stroke-linejoin="round"/><path d="${V.rede}" fill="${t.simbolo}"/><circle cx="${V.ambar.cx}" cy="${V.ambar.cy}" r="${V.ambar.r}" fill="${t.atomo}"/></svg>`;
}

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const CSS = `
@font-face{font-family:Geist;src:url("${fonte}") format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}
@page{size:1080px 1350px;margin:0}
body{background:#fff}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;background:#F2F1EC;color:#121418;font-family:Geist,sans-serif;page-break-after:always;break-after:page}
.s.esc{background:#121418;color:#F2F1EC}
.topo{position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:600;letter-spacing:-.01em;z-index:2}
.topo .m{display:flex;align-items:center;gap:16px}.topo i{display:block;width:38px;height:38px;background:#F2A516}
.topo .n{font-weight:500;color:#5A5D66}.esc .topo .n{color:#A9ACB4}
.fio{position:absolute;left:72px;right:72px;top:130px;height:3px;background:#121418;z-index:2}.esc .fio{background:#2E3138}
.corpo{position:absolute;left:72px;right:72px;top:190px;bottom:150px;display:flex;flex-direction:column;justify-content:center;z-index:2}
.et{align-self:flex-start;background:#F2A516;color:#121418;font-size:28px;font-weight:700;letter-spacing:.04em;padding:8px 18px;margin-bottom:36px;text-transform:uppercase}
h1{font-size:104px;line-height:1.04;font-weight:700;letter-spacing:-.04em}
h2{font-size:78px;line-height:1.08;font-weight:700;letter-spacing:-.035em}
p.c{font-size:42px;line-height:1.3;font-weight:500;margin-top:34px;color:#121418}
.sub{font-size:46px;line-height:1.25;color:#A9ACB4;margin-top:40px;font-weight:500}
.rod{position:absolute;left:72px;right:72px;bottom:64px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:500;color:#5A5D66;gap:30px;z-index:2}
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
.it.g{margin-top:44px}.it.g span{font-size:50px}.it.g u{width:72px;height:72px;line-height:72px;font-size:40px}
.sol .nm{font-size:40px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#5A5D66}
.sol .res{font-size:68px;line-height:1.1;font-weight:700;letter-spacing:-.035em;margin-top:18px}
.cena{margin-top:30px;border-left:4px solid #121418;padding-left:0}
.cena .l{display:flex;gap:28px;align-items:baseline;padding:26px 0 26px 34px;border-bottom:3px solid #D6D4CC}
.cena .l:last-child{border-bottom:0}
.cena .q{flex:none;width:250px;font-size:30px;font-weight:700;letter-spacing:.02em;color:#5A5D66;text-transform:uppercase}
.cena .t{font-size:44px;line-height:1.22;font-weight:600;letter-spacing:-.02em}
.cena .l.d{background:#F2A516;border-bottom:0}.cena .l.d .q{color:#121418}
.esc2 .faixa{flex:none}
.esc .faixa{}
.faixa{flex:none;min-width:190px;background:#121418;color:#F2F1EC;font-size:44px;font-weight:700;padding:14px 22px;text-align:center;letter-spacing:-.02em}
.linhae{display:flex;gap:30px;align-items:center;margin-top:34px;padding:28px 30px;border:3px solid #121418;background:#FAF9F5}
.linhae span{font-size:42px;line-height:1.22;font-weight:600;letter-spacing:-.02em}
.linhae.m3{background:#F7E2B5}
.nota{margin-top:44px;font-size:34px;line-height:1.3;color:#5A5D66;font-weight:500;border-top:3px solid #D6D4CC;padding-top:26px}
.passo{border:3px solid #121418;background:#FAF9F5;padding:36px 40px;margin-top:32px}
.passo .n{font-size:30px;font-weight:700;background:#F2A516;display:inline-block;padding:4px 14px;margin-bottom:18px}
.passo h3{font-size:56px;line-height:1.08;font-weight:700;letter-spacing:-.03em}
.passo p{font-size:36px;line-height:1.3;margin-top:16px;font-weight:500;color:#33363D}
.num{margin-top:40px}.num b{display:block;font-size:150px;line-height:.95;font-weight:700;letter-spacing:-.05em}
.num span{display:block;font-size:40px;line-height:1.25;font-weight:500;margin-top:10px;color:#33363D}
.dest{color:#F2A516}
.botao{display:inline-block;margin-top:54px;background:#F2A516;color:#121418;font-size:50px;font-weight:700;letter-spacing:-.02em;padding:24px 44px}
.s.ambar{background:#F2A516}.s.tinta{background:#D5E0F3}.s.papel{background:#F2F1EC}
.planta{position:absolute;left:60px;top:650px;width:960px;height:604px;z-index:1}
.s.ambar .topo i{background:#121418}
.s.ambar .seta{background:#121418;color:#F2A516}
.s.verde{background:#D3E6D9}.s.violeta{background:#E0D9F0}
.s.verde .fio,.s.violeta .fio{background:#121418}
.s.ambar .fio,.s.tinta .fio,.s.papel .fio{background:#121418}
.s .corpo.alto{justify-content:flex-start;bottom:auto}
.s .sub.cl{color:#33363D}
`;
function slide(t, i, n) {
  const estilo = t.tipo === "capa" ? (process.env.CAPA ?? t.estilo ?? "papel") : "escuro";
  const capaClara = t.tipo === "capa" && estilo !== "escuro";
  const claro = (t.tipo !== "capa" && t.tipo !== "cta") || capaClara;
  const topo = `<div class="topo"><div class="m"><i></i>V2O5 Vendas e Tecnologia</div><div class="n">${i + 1}/${n}</div></div><div class="fio"></div>`;
  const rod = (txt, seta) => `<div class="rod"><span>${txt}</span>${seta ? '<span class="seta">→</span>' : ""}</div>`;
  const seta = i < n - 1;
  let corpo = "";
  if (t.tipo === "capa" && !capaClara) corpo = `<div class="simb">${simbolo("#F2F1EC")}</div><div class="et">${esc(t.etiqueta)}</div><h1>${esc(t.titulo)}</h1><div class="sub">${esc(t.sub)}</div>`;
  if (capaClara) corpo = `<div class="et" style="background:${estilo === "ambar" ? "#121418" : "#F2A516"};color:${estilo === "ambar" ? "#F2F1EC" : "#121418"}">${esc(t.etiqueta)}</div><h1 style="font-size:${t.titulo.length > 70 ? 66 : t.titulo.length > 45 ? 76 : 96}px">${esc(t.titulo)}</h1><div class="sub cl" style="font-size:${t.titulo.length > 45 ? 36 : 46}px;margin-top:26px">${esc(t.sub)}</div>`;
  if (t.tipo === "texto") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.corpo.map((c) => `<p class="c">${esc(c)}</p>`).join("")}`;
  if (t.tipo === "solucao") {
    const texto = t.cor === "#F2A516" ? "#121418" : "#fff";
    corpo = `<div class="sol" style="--c:${t.cor};--pc:${texto}"><div class="et" style="background:${t.cor};color:${texto}">${esc(t.etiqueta)}</div><h2>${esc(t.nome)}</h2><div class="l">Quando</div><div class="t">${esc(t.quando)}</div><div class="l">O que você recebe</div><div class="t">${esc(t.recebe)}</div><div class="preco">${esc(t.preco)}</div></div>`;
  }
  if (t.tipo === "frente") {
    const texto = t.cor === "#F2A516" ? "#121418" : "#fff";
    corpo = `<div class="sol" style="--c:${t.cor};--pc:${texto}"><div class="et" style="background:${t.cor};color:${texto}">${esc(t.etiqueta)}</div><div class="nm">${esc(t.nome)}</div><div class="res">${esc(t.resultado)}</div><div class="l">Como</div><div class="t">${esc(t.como)}</div><div class="preco">${esc(t.preco)}</div></div>`;
  }
  if (t.tipo === "lista") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.itens.map((x, k) => `<div class="it${t.itens.length <= 3 ? " g" : ""}"><u>${k + 1}</u><span>${esc(x)}</span></div>`).join("")}${t.nota ? `<div class="nota">${esc(t.nota)}</div>` : ""}`;
  if (t.tipo === "cena") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2><div class="cena">${t.linhas.map((x) => `<div class="l${x.d ? " d" : ""}"><div class="q">${esc(x.q)}</div><div class="t">${esc(x.t)}</div></div>`).join("")}</div>`;
  if (t.tipo === "escala") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.linhas.map((x, k) => `<div class="linhae${k === 1 ? " m3" : ""}"><div class="faixa">${esc(x.faixa)}</div><span>${esc(x.texto)}</span></div>`).join("")}${t.nota ? `<div class="nota">${esc(t.nota)}</div>` : ""}`;
  if (t.tipo === "passos") corpo = `<div class="et">${esc(t.etiqueta)}</div>${t.passos.map((p) => `<div class="passo"><div class="n">${p.n}</div><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div>`).join("")}`;
  if (t.tipo === "numeros") corpo = `<div class="et">${esc(t.etiqueta)}</div><h2>${esc(t.titulo)}</h2>${t.numeros.map((x) => `<div class="num"><b>${esc(x.valor)}</b><span>${esc(x.rotulo)}</span></div>`).join("")}${t.nota ? `<div class="nota">${esc(t.nota)}</div>` : ""}`;
  if (t.tipo === "cta") corpo = `<div class="simb" style="width:220px;height:138px">${simbolo("#F2F1EC")}</div><h1 style="font-size:88px">${esc(t.titulo)} <span class="dest">${esc(t.destaque)}</span></h1><div><span class="botao">${esc(t.botao)}</span></div>`;
  const pe = t.tipo === "capa" ? rod(esc(t.rodape), true) : t.tipo === "cta" ? rod(esc(t.rodape), false) : rod("<b>v2o5.com.br</b>", seta);
  const fundo = capaClara ? planta(estilo) : "";
  const classe = capaClara ? estilo : claro ? "" : "esc";
  return `<section class="s ${classe}">${topo}${fundo}<div class="corpo${capaClara ? " alto" : ""}">${corpo}</div>${pe}</section>`;
}
const html = (slides) => `<!doctype html><meta charset="utf-8"><style>${CSS}</style>${slides.map((t, i) => slide(t, i, slides.length)).join("")}`;

const saida = join(aqui, "saida");
mkdirSync(saida, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
if (process.env.OPCOES === "1") {
  mkdirSync(join(saida, "opcoes-capa"), { recursive: true });
  const primeiro = dados["o-que-fazemos"].slides;
  for (const estilo of ["escuro", "papel", "ambar", "tinta"]) {
    process.env.CAPA = estilo;
    await p.setContent(html([primeiro[0], primeiro[1]]));
    await p.waitForTimeout(300);
    const [capa] = await p.$$("section.s");
    await capa.screenshot({ path: join(saida, "opcoes-capa", `capa-${estilo}.png`) });
  }
  await b.close();
  process.exit(0);
}
// Cada rede lê a chamada de um jeito: no Instagram o link está na bio; no Facebook, na legenda; no LinkedIn, no primeiro comentário.
function adaptar(slides, rede) {
  if (rede === "instagram") return slides;
  const destino = rede === "facebook" ? "Link na legenda" : "Link no primeiro comentário";
  return slides.map((s) => {
    const t = { ...s };
    if (t.tipo === "capa" && t.rodape) t.rodape = t.rodape.replace(/^Deslize/, rede === "linkedin" ? "Continue" : "Deslize");
    if (t.tipo === "cta") {
      if (t.botao === "Link na bio") t.botao = rede === "linkedin" ? "v2o5.com.br/diagnostico" : "Peça pelo link na legenda";
      if (t.rodape) t.rodape = t.rodape.replace("Link na bio.", `${destino}.`).replace("Salve e envie", rede === "linkedin" ? "Salve e compartilhe" : "Salve e envie");
    }
    return t;
  });
}
const nomePasta = { instagram: saida, facebook: join(saida, "facebook"), linkedin: join(saida, "linkedin") };
mkdirSync(nomePasta.facebook, { recursive: true });
mkdirSync(nomePasta.linkedin, { recursive: true });
for (const [nome, c] of Object.entries(dados)) {
  for (const rede of ["instagram", "facebook", "linkedin"]) {
    await p.setContent(html(adaptar(c.slides, rede)));
    await p.waitForTimeout(300);
    const secoes = await p.$$("section.s");
    if (rede !== "linkedin") for (let i = 0; i < secoes.length; i++) await secoes[i].screenshot({ path: join(nomePasta[rede], `${nome}-${String(i + 1).padStart(2, "0")}.png`) });
    if (rede !== "facebook") await p.pdf({ path: join(nomePasta[rede], `${nome}.pdf`), width: "1080px", height: "1350px", printBackground: true, preferCSSPageSize: true });
    if (rede === "instagram") console.log(nome, secoes.length, "slides");
  }
}
await b.close();
