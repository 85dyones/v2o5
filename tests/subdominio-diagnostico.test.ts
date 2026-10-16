// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, EMPRESA, HERO, LINHAS, MARCA_DO_SITE } from "@/conteudo/home";
import { PAGINAS } from "@/conteudo/paginas";
import { BRL, dataBR, mensalidadeDoPlano, OFERTA_DO_COMPLETO, PLANOS, REGRAS } from "@/conteudo/precos";
import { whatsappParaLer } from "@/lib/whatsapp";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import { ler, RAIZ } from "./fonte";

/**
 * As páginas da raiz de diagnostico.v2o5.com.br (`subdominios/diagnostico/`)
 * são HTML estático, publicado no repositório `85dyones/v2o5-diagnosticos`.
 * Elas repetem preço, número do case e WhatsApp do site; este teste falha
 * quando o site muda e a página do subdomínio fica para trás. Mudou aqui,
 * copie os dois arquivos para lá (LEIA-ME da pasta).
 */

const html = (arquivo: string) => new DOMParser().parseFromString(ler(`subdominios/diagnostico/${arquivo}`), "text/html");
const raiz = html("index.html");
const naoEncontrado = html("404.html");
/** O texto visível, com espaço entre um elemento e outro (textContent cola "deR$ 8.900"). */
const texto = (el: Document | Element | null) => {
  const raizDoTexto = el instanceof Document ? el.body : el;
  if (!raizDoTexto) return "";
  const partes: string[] = [];
  const andar = raizDoTexto.ownerDocument.createTreeWalker(raizDoTexto, NodeFilter.SHOW_TEXT);
  for (let n = andar.nextNode(); n; n = andar.nextNode()) {
    if (!["SCRIPT", "STYLE"].includes(n.parentElement?.tagName ?? "")) partes.push(n.textContent ?? "");
  }
  return partes.join(" ").replace(/\s+/g, " ").trim();
};

/** A marca das mensagens prontas das páginas de diagnóstico, do nó Configuração do fluxo da origem. */
const marcaDoDiagnostico = (() => {
  const fluxo = JSON.parse(ler("docs/n8n/origem-do-lead.json")) as {
    nodes: { name: string; parameters: { assignments?: { assignments: { name: string; value: string }[] } } }[];
  };
  const config = fluxo.nodes.find((n) => n.name === "Configuração");
  return config?.parameters.assignments?.assignments.find((a) => a.name === "marcaDoDiagnostico")?.value ?? "";
})();

const mensagens = (d: Document) =>
  [...d.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]')].map((a) => {
    const url = new URL(a.href);
    return { numero: url.pathname.slice(1), texto: url.searchParams.get("text") ?? "" };
  });

/** Largura e altura de um JPEG, lidas do marcador SOF. */
function tamanhoDoJpeg(b: Buffer): { largura: number; altura: number } {
  expect(b.readUInt16BE(0)).toBe(0xffd8);
  for (let i = 2; i < b.length; ) {
    const marca = b[i + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marca)) {
      return { altura: b.readUInt16BE(i + 5), largura: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error("JPEG sem marcador SOF");
}

describe("prévia da raiz no WhatsApp e nas redes", () => {
  // Regras da Meta para a prévia do WhatsApp: og:title, og:description e og:url
  // preenchidos dentro do <head>, o <head> nos primeiros 300 KB, og:image com
  // endereço absoluto, menos de 600 KB, 300 px ou mais de largura e proporção
  // de até 4:1.
  const fonte = ler("subdominios/diagnostico/index.html");
  const meta = (p: string) => raiz.querySelector(`meta[property="${p}"]`)?.getAttribute("content") ?? "";

  it("tem título, descrição, endereço e imagem antes do CSS", () => {
    for (const p of ["og:title", "og:description", "og:url", "og:image"]) expect(meta(p), p).not.toBe("");
    expect(meta("og:url")).toBe("https://diagnostico.v2o5.com.br/");
    // ?v= troca quando a imagem muda, para as redes que guardam a imagem pelo endereço buscarem a nova.
    const imagem = new URL(meta("og:image"));
    expect(`${imagem.origin}${imagem.pathname}`).toBe("https://diagnostico.v2o5.com.br/og.jpg");
    expect(Buffer.byteLength(fonte.slice(0, fonte.indexOf("</head>")))).toBeLessThan(300_000);
    expect(fonte.indexOf('property="og:image"')).toBeLessThan(fonte.indexOf("<style>"));
    expect(raiz.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe("summary_large_image");
  });

  it("a imagem existe, é JPEG 1200x630 e cabe no limite", () => {
    const imagem = readFileSync(join(RAIZ, "subdominios/diagnostico/og.jpg"));
    expect(imagem.length).toBeLessThan(600_000);
    expect(tamanhoDoJpeg(imagem)).toEqual({ largura: Number(meta("og:image:width")), altura: Number(meta("og:image:height")) });
    expect(meta("og:image:width")).toBe("1200");
    expect(meta("og:image:height")).toBe("630");
    expect(meta("og:image:type")).toBe("image/jpeg");
    // A imagem sai de og.html; o texto dela tem de bater com a página.
    const molde = ler("subdominios/diagnostico/og.html");
    expect(molde).toContain(raiz.querySelector("h1")?.textContent ?? "—");
    expect(molde).toContain("37 verificações");
    expect(molde).not.toMatch(/[—–]/);
  });
});

describe("raiz de diagnostico.v2o5.com.br", () => {
  it("fica fora do Google, com um H1 e movimento que desliga", () => {
    for (const d of [raiz, naoEncontrado]) {
      expect(d.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,nofollow");
      expect(d.querySelectorAll("h1")).toHaveLength(1);
      expect(d.documentElement.lang).toBe("pt-BR");
    }
    expect(ler("subdominios/diagnostico/index.html")).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });

  it("logo oficial parado no lugar da animação (o movimento fica no site principal)", () => {
    const fonte = ler("subdominios/diagnostico/index.html");
    expect(fonte).not.toMatch(/@keyframes|animation:/);
    expect(raiz.querySelectorAll("script")).toHaveLength(0);
    for (const arquivo of ["index.html", "og.html"]) {
      const d = ler(`subdominios/diagnostico/${arquivo}`);
      expect(d, arquivo).toContain(`d="${SIMBOLO_C1D.grande.rede}"`);
      expect(d, arquivo).toContain(`d="${SIMBOLO_C1D.grande.nuvem}"`);
    }
  });

  it("texto sem travessão", () => {
    expect(texto(raiz)).not.toMatch(/[—–]/);
    expect(texto(naoEncontrado)).not.toMatch(/[—–]/);
  });

  it("os planos têm o preço e o conteúdo da tabela vigente do site", () => {
    for (const p of PLANOS) {
      const cartao = raiz.querySelector(`[data-plano="${p.id}"]`);
      expect(cartao, p.id).not.toBeNull();
      const t = texto(cartao);
      expect(t).toContain(p.nome);
      expect(t).toContain(p.pilar);
      expect(t).toContain(p.para);
      for (const item of p.inclui) expect(t, `${p.id}: ${item}`).toContain(item);
      expect(t).toContain(`Implantação a partir de ${BRL(p.implantacao)}`);
      expect(t).toContain(`Mensalidade a partir de ${BRL(mensalidadeDoPlano(p))} /mês`);
      if (p.destaque) expect(t).toContain(p.destaque);
      if (p.bonus) expect(t).toContain(p.bonus.replace(/^Bônus de fechamento: /, ""));
    }
    const completo = texto(raiz.querySelector('[data-plano="completo"]'));
    expect(completo).toContain(`até ${dataBR(OFERTA_DO_COMPLETO.ate)}; depois, ${BRL(PLANOS.find((p) => p.id === "completo")!.mensalidade)}`);
    expect(texto(raiz)).toContain(`o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias`);
  });

  it("os números do case são os da home, com a fonte ao lado", () => {
    const t = texto(raiz);
    for (const n of CASE.numeros) expect(t).toContain(`${n.valor}${n.complemento ? ` ${n.complemento}` : ""} ${n.texto}`);
    expect(t).toContain(CASE.fonte);
    expect(t).toContain(CASE_MOTORS.resumo);
    expect(t).toContain(HERO.nota);
  });

  it("os cartões de solução repetem a frase do site e levam a páginas que existem", () => {
    const t = texto(raiz);
    for (const linha of ["sites", "rastreamento", "agente", "crm", "automacao", "avaliacoes"]) {
      const l = LINHAS.find((x) => x.linha === linha);
      expect(l, linha).toBeDefined();
      expect(t, linha).toContain(l!.frase);
    }
    const rotas = new Set(PAGINAS.map((p) => p.rota));
    const links = [...raiz.querySelectorAll<HTMLAnchorElement>("a[href^='https://www.v2o5.com.br']")].map((a) => new URL(a.href));
    expect(links.length).toBeGreaterThan(10);
    for (const url of links) {
      expect(url.hostname, url.href).toBe("www.v2o5.com.br");
      expect(rotas.has(url.pathname === "" ? "/" : url.pathname), url.href).toBe(true);
      if (url.pathname !== "/privacidade") expect(url.searchParams.get("utm_source"), url.href).toBe("diagnostico.v2o5.com.br");
    }
  });

  it("o WhatsApp é o da V2O5 e a mensagem pronta marca o lead no n8n", () => {
    const daRaiz = mensagens(raiz);
    const do404 = mensagens(naoEncontrado);
    expect(daRaiz.length).toBeGreaterThan(0);
    for (const m of [...daRaiz, ...do404]) expect(m.numero).toBe(EMPRESA.whatsapp);
    for (const m of daRaiz) expect(m.texto).toContain(MARCA_DO_SITE);
    // O 404 é de quem recebeu um diagnóstico: a mensagem é a das páginas de diagnóstico.
    expect(marcaDoDiagnostico).toBe("Dyones. Vi o diagnóstico da");
    expect(do404.filter((m) => m.texto).every((m) => m.texto.includes(marcaDoDiagnostico))).toBe(true);
  });

  it("rodapé com a empresa, sem cidade e sem contato pessoal", () => {
    const t = texto(raiz);
    for (const dado of [EMPRESA.nome, EMPRESA.razaoSocial, EMPRESA.cnpj]) expect(t).toContain(dado);
    // Sem cidade e sem contato pessoal (nome, número escrito, e-mail) no subdomínio (Dyones, 16/10): o contato é pelos botões.
    for (const d of [raiz, naoEncontrado]) {
      const tt = texto(d);
      for (const fora of [EMPRESA.cidade, EMPRESA.email, "Dyones", whatsappParaLer()]) expect(tt, fora).not.toContain(fora);
      expect(d.querySelector('a[href^="mailto:"]')).toBeNull();
    }
  });

  it("a contagem de verificações fecha em 37", () => {
    let total = Number(/(\d+) verificações/.exec(texto(raiz.querySelector(".identidade")))?.[1]);
    for (const etapa of raiz.querySelectorAll(".etapa")) {
      const itens = etapa.querySelectorAll("li").length;
      expect(etapa.querySelector(".conta")?.textContent).toBe(`${itens} verificações`);
      total += itens;
    }
    expect(total).toBe(37);
    expect(raiz.querySelector("h2#t-verificacoes")?.textContent).toMatch(/^37 verificações/);
  });
});
