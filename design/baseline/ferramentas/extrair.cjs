// Extrai, do site em produção, o texto de cada rota (DOM -> Markdown, sem mexer
// em palavra) e o que não pode quebrar (head, JSON-LD, eventos, WhatsApp, forms).
// Uso: node extrair.cjs <pasta-de-saida-json>
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const SAIDA = process.argv[2];
const BASE = process.env.BASE_URL || "https://www.v2o5.com.br";
const ROTAS = [
  "/", "/agente-de-ia-para-whatsapp", "/automacao-com-ia", "/criacao-de-sites", "/crm-com-whatsapp",
  "/rastreamento-de-conversoes", "/gestao-de-trafego", "/segmentos/revendas-de-veiculos", "/cases/motors-store",
  "/precos", "/sobre", "/diagnostico", "/diagnostico/recebido", "/guias", "/privacidade",
  "/branding-e-identidade", "/presenca-digital-local", "/sprint-de-eficiencia", "/continuidade",
  "/esta-rota-nao-existe-baseline",
];

// Roda dentro da página: converte um elemento em linhas de Markdown.
function paraMarkdown(raizSel) {
  const BLOCO_PADRAO = new Set(["ADDRESS","ARTICLE","ASIDE","BLOCKQUOTE","DD","DETAILS","DIALOG","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HR","LEGEND","LI","MAIN","NAV","OL","P","PRE","SECTION","SUMMARY","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL","SELECT","TEXTAREA","OPTION"]);
  const PULAR = new Set(["SCRIPT","STYLE","NOSCRIPT","TEMPLATE","LINK","META","CANVAS","IFRAME","VIDEO","AUDIO","DEFS","CLIPPATH","LINEARGRADIENT","RADIALGRADIENT","MASK","PATTERN","FILTER","SYMBOL"]);
  const INLINE_DISPLAY = new Set(["inline","inline-block","inline-flex","inline-grid","contents","ruby"]);
  const raiz = typeof raizSel === "string" ? document.querySelector(raizSel) : raizSel;
  if (!raiz) return null;
  const blocos = [];
  let buf = "";
  const pilha = [{ tipo: "p", nivel: 0, nota: "" }];
  const atual = () => pilha[pilha.length - 1];
  const limpa = (s) => s.replace(/[ \t\n\r\f]+/g, " ");
  function flush() {
    const t = buf.replace(/^ +| +$/g, "").replace(/ +(  \n)/g, "$1");
    buf = "";
    if (!t || !t.replace(/\s+/g, "")) return;
    const c = atual();
    blocos.push({ tipo: c.tipo, nivel: c.nivel, texto: t, nota: c.nota, prof: c.prof || 0 });
  }
  function ehBloco(el) {
    const tag = el.tagName.toUpperCase();
    if (el.namespaceURI === "http://www.w3.org/2000/svg") return tag === "TEXT" || tag === "SVG";
    const cs = getComputedStyle(el);
    if (cs.display === "none") return BLOCO_PADRAO.has(tag);
    return !INLINE_DISPLAY.has(cs.display);
  }
  function notaDe(el) {
    const notas = [];
    if (el.getAttribute && el.getAttribute("aria-hidden") === "true") notas.push("decorativo, aria-hidden");
    if (el.nodeType === 1 && el.namespaceURI !== "http://www.w3.org/2000/svg") {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") notas.push("oculto no desktop 1440");
      else if ((cs.clip === "rect(0px, 0px, 0px, 0px)" || cs.clipPath === "inset(50%)") && parseFloat(cs.width) <= 1) notas.push("só leitor de tela");
    }
    return notas.join("; ");
  }
  const profLista = () => pilha.filter((p) => p.tipo === "li").length;
  function tipoDo(el) {
    const tag = el.tagName.toUpperCase();
    if (/^H[1-6]$/.test(tag)) return { tipo: "h", nivel: Number(tag[1]) };
    if (tag === "LI") return { tipo: "li" };
    if (tag === "OPTION") return { tipo: "opcao" };
    if (tag === "TD" || tag === "TH") return { tipo: "celula" };
    if (tag === "BLOCKQUOTE") return { tipo: "citacao" };
    if (tag === "PRE") return { tipo: "pre" };
    if (el.namespaceURI === "http://www.w3.org/2000/svg") return { tipo: "svg" };
    return { tipo: atual().tipo === "citacao" ? "citacao" : "p" };
  }
  // Link "cartão" (com título, parágrafo ou lista dentro) vira bloco; botão e link simples viram [texto](href).
  function temBlocoDentro(el) {
    return !!el.querySelector("h1,h2,h3,h4,h5,h6,p,ul,ol,li,table,figure,blockquote,dl");
  }
  function andar(no) {
    if (no.nodeType === 3) { buf += limpa(no.nodeValue); return; }
    if (no.nodeType !== 1) return;
    const el = no;
    const tag = el.tagName.toUpperCase();
    if (PULAR.has(tag)) return;
    if (el.namespaceURI === "http://www.w3.org/2000/svg" && tag === "TITLE") return;
    if (tag === "BR") { buf += "  \n"; return; }
    if (tag === "IMG") {
      const alt = el.getAttribute("alt");
      if (alt && alt.trim()) buf += `![${limpa(alt).trim()}](${el.getAttribute("src") || ""})`;
      return;
    }
    if (tag === "INPUT") {
      const tipo = (el.getAttribute("type") || "text").toLowerCase();
      if (["hidden"].includes(tipo)) return;
      const ph = el.getAttribute("placeholder");
      if (ph) buf += ` <!-- placeholder do campo ${el.name}: ${ph} -->`;
      if (tipo === "submit" || tipo === "button") buf += ` ${el.value} `;
      return;
    }
    if (tag === "SELECT") {
      flush();
      blocos.push({ tipo: "comentario", texto: `opções do campo ${el.name}` });
    }
    const nota = notaDe(el);
    const href = tag === "A" ? el.getAttribute("href") : null;
    const bloco = ehBloco(el);
    if (tag === "A" && href && !temBlocoDentro(el)) {
      if (bloco) flush();
      let interno = "";
      const salvo = buf; buf = "";
      const achatar = (n) => {
        if (n.nodeType === 3) { buf += limpa(n.nodeValue); return; }
        if (n.nodeType !== 1 || PULAR.has(n.tagName.toUpperCase())) return;
        if (n.tagName.toUpperCase() === "IMG") { const a = n.getAttribute("alt"); if (a && a.trim()) buf += a.trim(); return; }
        const b = ehBloco(n) && n.namespaceURI !== "http://www.w3.org/2000/svg";
        if (b) buf += " ";
        for (const f of n.childNodes) achatar(f);
        if (b) buf += " ";
      };
      for (const f of el.childNodes) achatar(f);
      interno = buf.replace(/ +/g, " ").replace(/^ +| +$/g, ""); buf = salvo;
      const lab = el.getAttribute("aria-label");
      const texto = interno || (lab ? `<!-- link sem texto, aria-label: ${lab} -->` : "");
      if (texto) buf += (buf && !/\s$/.test(buf) && getComputedStyle(el).display !== "inline" ? " " : "") + `[${texto}](${href})`;
      if (bloco) { pilha.push({ ...tipoDo(el), nota: [...new Set([...atual().nota.split("; "), ...nota.split("; ")].filter(Boolean))].join("; "), prof: profLista() }); flush(); pilha.pop(); }
      return;
    }
    if (!bloco) {
      const cs = el.namespaceURI === "http://www.w3.org/2000/svg" ? null : getComputedStyle(el);
      const separa = cs && cs.display !== "inline" && cs.display !== "contents";
      if (separa) buf += " ";
      if (nota && el.textContent.trim()) buf += `<!-- ${nota} -->`;
      for (const f of el.childNodes) andar(f);
      if (separa) buf += " ";
      return;
    }
    flush();
    if (tag === "A" && href) blocos.push({ tipo: "comentario", texto: `o bloco abaixo é um link para ${href}` });
    if (tag === "TR") blocos.push({ tipo: "linha-inicio" });
    pilha.push({ ...tipoDo(el), nota: [...new Set([...atual().nota.split("; "), ...nota.split("; ")].filter(Boolean))].join("; "), prof: profLista() });
    for (const f of el.childNodes) andar(f);
    flush();
    pilha.pop();
    if (tag === "TR") blocos.push({ tipo: "linha-fim" });
  }
  andar(raiz);
  flush();
  // Monta o Markdown.
  const linhas = [];
  let anterior = null;
  let linhaDaTabela = null;
  for (const b of blocos) {
    if (b.tipo === "linha-inicio") { linhaDaTabela = []; continue; }
    if (b.tipo === "linha-fim") {
      if (linhaDaTabela && linhaDaTabela.length) { linhas.push(""); linhas.push("| " + linhaDaTabela.join(" | ") + " |"); }
      linhaDaTabela = null; anterior = "tabela"; continue;
    }
    if (linhaDaTabela && b.tipo !== "comentario") { linhaDaTabela.push(b.texto.replace(/\|/g, "\\|").replace(/  \n/g, " ")); continue; }
    const nota = b.nota ? ` <!-- ${b.nota} -->` : "";
    let linha;
    if (b.tipo === "h") linha = `${"#".repeat(b.nivel)} ${b.texto}${nota}`;
    else if (b.tipo === "li") linha = `${"  ".repeat(Math.max(0, b.prof - 1))}- ${b.texto}${nota}`;
    else if (b.tipo === "opcao") linha = `- ${b.texto}${nota}`;
    else if (b.tipo === "citacao") linha = `> ${b.texto}${nota}`;
    else if (b.tipo === "comentario") linha = `<!-- ${b.texto} -->`;
    else if (b.tipo === "svg") linha = `${b.texto} <!-- texto em SVG${b.nota ? "; " + b.nota : ""} -->`;
    else linha = `${b.texto}${nota}`;
    const lista = b.tipo === "li" || b.tipo === "opcao";
    if (!(lista && (anterior === "li" || anterior === "opcao"))) linhas.push("");
    linhas.push(linha);
    anterior = b.tipo === "comentario" ? anterior : b.tipo;
  }
  return linhas.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function coletarHead() {
  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const metas = {};
  for (const m of document.querySelectorAll("meta[property], meta[name]")) {
    metas[m.getAttribute("property") || m.getAttribute("name")] = m.getAttribute("content");
  }
  return {
    lang: document.documentElement.lang,
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    robots: meta('meta[name="robots"]'),
    metas,
    icones: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({ rel: l.rel, href: l.getAttribute("href"), type: l.type })),
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch { return s.textContent; } }),
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.replace(/\s+/g, " ").trim()),
    eventos: [...document.querySelectorAll("[data-evento]")].map((e) => ({
      evento: e.getAttribute("data-evento"), local: e.getAttribute("data-local"),
      texto: e.textContent.replace(/\s+/g, " ").trim().slice(0, 80), href: e.getAttribute("href"),
      emHeader: !!e.closest("header"), emFooter: !!e.closest("footer"),
    })),
    whatsapp: [...document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')].map((a) => ({
      href: a.getAttribute("href"), mensagem: (() => { try { return new URL(a.href).searchParams.get("text"); } catch { return null; } })(),
      texto: a.textContent.replace(/\s+/g, " ").trim().slice(0, 80), target: a.target, rel: a.rel,
      evento: a.getAttribute("data-evento"), local: a.getAttribute("data-local"),
    })),
    emails: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => ({ href: a.getAttribute("href"), texto: a.textContent.replace(/\s+/g, " ").trim(), evento: a.getAttribute("data-evento"), local: a.getAttribute("data-local") })),
    formularios: [...document.querySelectorAll("form")].map((f) => ({
      action: f.getAttribute("action"), method: f.getAttribute("method"), novalidate: f.noValidate,
      campos: [...f.querySelectorAll("input, select, textarea, button")].map((c) => ({
        tag: c.tagName.toLowerCase(), name: c.getAttribute("name"), type: c.getAttribute("type"), required: c.required,
        autocomplete: c.getAttribute("autocomplete"), inputmode: c.getAttribute("inputmode"), placeholder: c.getAttribute("placeholder"),
        maxlength: c.getAttribute("maxlength"), value: c.tagName === "INPUT" && ["checkbox","radio","submit"].includes(c.type) ? c.value : undefined,
        rotulo: (c.id && document.querySelector(`label[for="${CSS.escape(c.id)}"]`)?.textContent.trim()) || c.closest("label")?.textContent.replace(/\s+/g, " ").trim() || null,
        opcoes: c.tagName === "SELECT" ? [...c.options].map((o) => ({ valor: o.value, rotulo: o.textContent.trim() })) : undefined,
        texto: c.tagName === "BUTTON" ? c.textContent.replace(/\s+/g, " ").trim() : undefined,
        tabindex: c.getAttribute("tabindex"),
      })),
    })),
    ancoras: [...document.querySelectorAll("[id]")].map((e) => e.id).filter((id) => !/^(«|:r|_R_|radix)/.test(id) && !id.includes("«")),
    linksInternos: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") || h.startsWith("#") || h.includes("v2o5.com.br")))],
  };
}

(async () => {
  fs.mkdirSync(SAIDA, { recursive: true });
  const browser = await chromium.launch();

  // Passo A: home com a medição como o visitante encontra, só para ver o que carrega de terceiros.
  const ctxA = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR", timezoneId: "America/Sao_Paulo" });
  const pA = await ctxA.newPage();
  const terceiros = [];
  pA.on("request", (r) => { const u = r.url(); if (!u.startsWith(BASE)) terceiros.push(u.split("?")[0]); });
  await pA.goto(BASE + "/", { waitUntil: "networkidle" });
  await pA.waitForTimeout(6000);
  const avisoA = await pA.evaluate(() => document.querySelector('aside[aria-label="Aviso de medição"]')?.innerText ?? null);
  const dataLayer = await pA.evaluate(() => (window.dataLayer || []).map((x) => { try { return JSON.parse(JSON.stringify(Array.from(x))); } catch { return String(x); } }));
  const temGtag = await pA.evaluate(() => typeof window.gtag === "function");
  const temFbq = await pA.evaluate(() => typeof window.fbq === "function");
  await ctxA.close();

  // Passo B: todas as rotas como o visitante encontra. O passo A confirma que nenhuma ferramenta
  // de medição carrega em produção (sem ID na Vercel), então nada vai ao GA4 nem à Meta.
  if (terceiros.length) throw new Error("Há medição ligada em produção; grave a oposição antes de extrair: " + terceiros.join(", "));
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR", timezoneId: "America/Sao_Paulo" });
  const resultado = { extraidoEm: new Date().toISOString(), base: BASE, medicaoNaHome: { terceiros: [...new Set(terceiros)], aviso: avisoA, gtag: temGtag, fbq: temFbq, dataLayer }, rotas: {} };
  for (const rota of ROTAS) {
    const page = await ctx.newPage();
    const resp = await page.goto(BASE + rota, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(async () => {
      const passo = 500;
      for (let y = 0; y < document.documentElement.scrollHeight; y += passo) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    const head = await page.evaluate(coletarHead);
    const md = {
      main: await page.evaluate(paraMarkdown, "main"),
      header: await page.evaluate(paraMarkdown, "body > header, header"),
      footer: await page.evaluate(paraMarkdown, "body > footer, footer"),
      skip: await page.evaluate(() => document.querySelector('a[href="#conteudo"]')?.textContent.trim() ?? null),
      foraDoMain: await page.evaluate((fn) => {
        const f = new Function("return " + fn)();
        const extras = [...document.body.children].filter((e) => !["MAIN","HEADER","FOOTER","SCRIPT","STYLE","NEXT-ROUTE-ANNOUNCER","TEMPLATE"].includes(e.tagName) && !e.matches('a[href="#conteudo"]') && e.textContent.trim());
        return extras.map((e) => f(e)).filter(Boolean);
      }, paraMarkdown.toString()),
    };
    const extras = {};
    extras.rotulos = await page.evaluate(() => [...document.querySelectorAll("[aria-label]")].map((e) => ({
      rotulo: e.getAttribute("aria-label"), tag: e.tagName.toLowerCase(), role: e.getAttribute("role"),
      regiao: e.closest("header") ? "topo" : e.closest("footer") ? "rodape" : e.closest("main") ? "main" : "fora",
    })));
    if (rota === "/diagnostico") {
      // Campos condicionais do segmento automotivo. Só seleciona; nada é enviado.
      await page.selectOption('select[name="segmento"]', "automotivo");
      await page.waitForTimeout(500);
      extras.formularioAutomotivo = (await page.evaluate(coletarHead)).formularios;
      extras.mdAutomotivo = await page.evaluate(paraMarkdown, "form");
    }
    resultado.rotas[rota] = { status: resp.status(), cabecalhos: { "x-robots-tag": resp.headers()["x-robots-tag"] ?? null, "content-type": resp.headers()["content-type"], "cache-control": resp.headers()["cache-control"] }, urlFinal: page.url(), head, md, extras };
    console.log("ok", rota, resp.status(), head.title);
    await page.close();
  }
  // Passo C: estados que só aparecem com clique na home (abas da demonstração e peças do diagrama).
  const ctxC = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR", timezoneId: "America/Sao_Paulo", reducedMotion: "reduce" });
  const pc = await ctxC.newPage();
  await pc.goto(BASE + "/", { waitUntil: "networkidle" });
  const interacoes = { abas: [], pecas: [] };
  const abas = pc.locator('[role="tablist"][aria-label="Frentes da demonstração"] [role="tab"]');
  const nAbas = await abas.count();
  for (let i = 0; i < nAbas; i++) {
    await abas.nth(i).scrollIntoViewIfNeeded();
    await abas.nth(i).click();
    await pc.waitForTimeout(800);
    interacoes.abas.push({ aba: (await abas.nth(i).innerText()).trim(), md: await pc.evaluate(paraMarkdown, '[role="tabpanel"]') });
  }
  const ids = await pc.evaluate(() => [...new Set([...document.querySelectorAll("[data-peca]")].map((e) => e.getAttribute("data-peca")))]);
  for (const id of ids) {
    const alvo = pc.locator(`[data-peca="${id}"]`).filter({ visible: true }).first();
    if (!(await alvo.count())) { interacoes.pecas.push({ peca: id, md: null, erro: "sem elemento visível" }); continue; }
    await alvo.scrollIntoViewIfNeeded();
    await alvo.click({ force: true });
    await pc.waitForTimeout(500);
    interacoes.pecas.push({ peca: id, md: await pc.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.innerText : null;
    }, 'div[aria-live="polite"]'), mdFormatado: await pc.evaluate(paraMarkdown, 'div[aria-live="polite"]') });
  }
  resultado.interacoesDaHome = interacoes;
  await ctxC.close();
  await browser.close();

  // Respostas cruas: robots, sitemap, llms.txt, redirecionamentos e 410.
  const cru = {};
  for (const p of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
    const r = await fetch(BASE + p);
    cru[p] = { status: r.status, tipo: r.headers.get("content-type"), corpo: await r.text() };
  }
  const redir = {};
  const alvos = ["https://v2o5.com.br/", "http://www.v2o5.com.br/", BASE + "/jornada", BASE + "/solucoes", BASE + "/contrate", BASE + "/politica-privacidade", BASE + "/blog", BASE + "/author/dyones", BASE + "/feed", BASE + "/comments/feed", BASE + "/wp-sitemap.xml", BASE + "/hello-world", BASE + "/test-post", BASE + "/api/leads"];
  for (const u of alvos) {
    const r = await fetch(u, { redirect: "manual" });
    redir[u] = { status: r.status, location: r.headers.get("location") };
  }
  resultado.cru = cru;
  resultado.redirecionamentos = redir;
  fs.writeFileSync(path.join(SAIDA, "extracao.json"), JSON.stringify(resultado, null, 2));
  console.log("terceiros na home:", resultado.medicaoNaHome.terceiros.join(", "));
})().catch((e) => { console.error(e); process.exit(1); });
