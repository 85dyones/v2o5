// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CSP } from "../next.config";
import { PAGINAS } from "@/conteudo/paginas";
import { solucaoDa } from "@/conteudo/solucoes";
import {
  CHAVE_DA_MEDICAO,
  CHAVE_DO_LEAD,
  ESPERA_MAXIMA_MS,
  EVENTO_DA_MEDICAO,
  LINHA_DA_ROTA,
  apagarCookie,
  carregarFerramentas,
  contextoDaPagina,
  cookiesDeMedicaoPresentes,
  depoisDoConteudo,
  desligarMedicao,
  eventoDoClique,
  ferramentas,
  ferramentasAtivas,
  identificadoresDaMeta,
  leadGerado,
  leadNestaSessao,
  lerCookie,
  medicaoDesligada,
  prepararFerramentas,
  religarMedicao,
  urlDoScript,
} from "@/lib/medicao";
import { CHAVE_DA_ORIGEM } from "@/lib/origem";
import { COLETA_DE_TERCEIROS, SCRIPTS_DE_TERCEIROS, TERCEIROS } from "@/lib/terceiros";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * A camada de dados (plano, seção 7): só carrega com ID válido e sem
 * oposição, nunca antes do conteúdo; os eventos têm os nomes e parâmetros
 * do plano; a CSP, os scripts e a página de privacidade falam dos mesmos
 * domínios; e todo CTA e link de contato está marcado para a medição.
 */

const fontes = arquivos("src", /\.tsx$/);

describe("ferramentas e oposição", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("só ID com o formato certo liga a ferramenta", () => {
    expect(ferramentas({ ga4: "G-ABCD1234", pixel: "123456789012345" })).toEqual({ ga4: "G-ABCD1234", pixel: "123456789012345" });
    expect(ferramentas({ ga4: "", pixel: "" })).toEqual({ ga4: null, pixel: null });
    expect(ferramentas({ ga4: "UA-1234-1", pixel: "abc" })).toEqual({ ga4: null, pixel: null });
    expect(ferramentas({ ga4: "G-ABCD1234<script>", pixel: "1" })).toEqual({ ga4: null, pixel: null });
  });

  it("com a oposição gravada, nenhuma ferramenta fica ativa", () => {
    const ids = { ga4: "G-ABCD1234", pixel: "123456789012345" };
    expect(ferramentasAtivas(ids, false)).toEqual(ids);
    expect(ferramentasAtivas(ids, true)).toEqual({ ga4: null, pixel: null });
    expect(medicaoDesligada()).toBe(false);
    localStorage.setItem(CHAVE_DA_MEDICAO, "desligada");
    expect(medicaoDesligada()).toBe(true);
    expect(medicaoDesligada(null)).toBe(false);
  });

  it("desligar grava a escolha, apaga a origem e avisa; religar desfaz", () => {
    sessionStorage.setItem(CHAVE_DA_ORIGEM, JSON.stringify({ gclid: "x" }));
    const ouvinte = vi.fn();
    window.addEventListener(EVENTO_DA_MEDICAO, ouvinte);
    desligarMedicao();
    expect(localStorage.getItem(CHAVE_DA_MEDICAO)).toBe("desligada");
    expect(sessionStorage.getItem(CHAVE_DA_ORIGEM)).toBeNull();
    expect(ouvinte).toHaveBeenCalledTimes(1);
    religarMedicao();
    expect(localStorage.getItem(CHAVE_DA_MEDICAO)).toBeNull();
    expect(ouvinte).toHaveBeenCalledTimes(2);
    window.removeEventListener(EVENTO_DA_MEDICAO, ouvinte);
  });
});

describe("cookies", () => {
  it("lê um cookie pelo nome e lista os de medição, inclusive os _ga_<id>", () => {
    const cookies = "_ga=GA1.1.1; _ga_ABCD1234=GS1.1.2; _fbp=fb.1.1760000000000.42; outro=1";
    expect(lerCookie("_fbp", cookies)).toBe("fb.1.1760000000000.42");
    expect(lerCookie("nada", cookies)).toBeNull();
    expect(cookiesDeMedicaoPresentes(cookies)).toEqual(["_ga", "_ga_ABCD1234", "_fbp"]);
    expect(cookiesDeMedicaoPresentes("")).toEqual([]);
    expect(identificadoresDaMeta(cookies)).toEqual({ fbp: "fb.1.1760000000000.42" });
    expect(identificadoresDaMeta("")).toEqual({});
  });

  it("apaga no host, no domínio com ponto e no domínio pai", () => {
    document.cookie = "_fbp=fb.1.1.2; path=/";
    expect(lerCookie("_fbp")).toBe("fb.1.1.2");
    apagarCookie("_fbp", "www.v2o5.com.br");
    expect(lerCookie("_fbp")).toBeNull();
  });
});

describe("tipo da página", () => {
  it("toda página do mapa tem um tipo", () => {
    for (const p of PAGINAS) expect(contextoDaPagina(p.rota).page_type, p.rota).not.toBe("outra");
    expect(contextoDaPagina("/")).toEqual({ page_type: "home" });
    expect(contextoDaPagina("/precos/")).toEqual({ page_type: "precos" });
    expect(contextoDaPagina("/segmentos/revendas-de-veiculos")).toEqual({ page_type: "segmento", segment: "revendas-de-veiculos" });
    expect(contextoDaPagina("/cases/motors-store")).toEqual({ page_type: "case" });
    expect(contextoDaPagina("/diagnostico/recebido")).toEqual({ page_type: "recebido" });
    expect(contextoDaPagina("/qualquer-coisa")).toEqual({ page_type: "outra" });
  });

  it("a linha de cada página de solução é a mesma de conteudo/solucoes.ts", () => {
    for (const [rota, linha] of Object.entries(LINHA_DA_ROTA)) {
      expect(solucaoDa(rota).linha, rota).toBe(linha);
      expect(contextoDaPagina(rota)).toEqual({ page_type: "solucao", service_line: linha });
    }
    // /gestao-de-trafego saiu do mapa em 19/10: responde 307 para /#solucoes (desde 25/10, quando /precos deixou de ter a seção de tráfego).
    expect(PAGINAS.find((p) => p.rota === "/gestao-de-trafego")).toBeUndefined();
  });
});

describe("eventos", () => {
  const elemento = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstElementChild!;
  };

  it("cta_click leva o lugar e o rótulo visível, sem espaços repetidos", () => {
    const el = elemento('<a data-evento="cta_click" data-local="hero">\n  Pedir   diagnóstico <svg></svg>\n</a>');
    expect(eventoDoClique(el, false)).toEqual({ nome: "cta_click", parametros: { cta_location: "hero", cta_label: "Pedir diagnóstico" } });
  });

  it("click_whatsapp vira pos_lead depois do lead e perde o evento Contact da Meta", () => {
    const el = elemento('<a data-evento="click_whatsapp" data-local="rodape">WhatsApp</a>');
    expect(eventoDoClique(el, false)).toEqual({
      nome: "click_whatsapp",
      parametros: { whatsapp_location: "rodape", pos_lead: "nao" },
      meta: { nome: "Contact", padrao: true, parametros: { content_name: "rodape" } },
    });
    expect(eventoDoClique(el, true)).toEqual({
      nome: "click_whatsapp_pos_lead",
      parametros: { whatsapp_location: "rodape", pos_lead: "sim" },
      meta: undefined,
    });
  });

  it("click_email e elementos sem data-evento", () => {
    expect(eventoDoClique(elemento('<a data-evento="click_email" data-local="sobre">x</a>'), false)).toEqual({
      nome: "click_email",
      parametros: { email_location: "sobre" },
    });
    expect(eventoDoClique(elemento("<a>x</a>"), false)).toBeNull();
  });

  it("o lead gerado vai ao GA4 e ao Pixel com o mesmo event_id, e marca a sessão", () => {
    sessionStorage.clear();
    const gtag = vi.fn();
    const fbq = vi.fn();
    window.gtag = gtag;
    window.fbq = fbq as unknown as Window["fbq"];
    expect(leadNestaSessao()).toBe(false);
    leadGerado({ event_id: "Lead.abc", form_id: "diagnostico", lead_type: "diagnostico", segmento: "automotivo" });
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      event_id: "Lead.abc",
      form_id: "diagnostico",
      lead_type: "diagnostico",
      segmento: "automotivo",
    });
    expect(fbq).toHaveBeenCalledWith("track", "Lead", { content_name: "diagnostico", content_category: "automotivo" }, { eventID: "Lead.abc" });
    expect(sessionStorage.getItem(CHAVE_DO_LEAD)).toBe("Lead.abc");
    expect(leadNestaSessao()).toBe(true);
    delete window.gtag;
    delete window.fbq;
  });
});

describe("carga das ferramentas", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.head.innerHTML = "";
  });

  it("prepara as filas no formato do gtag.js e do fbevents.js", () => {
    const win = {} as Window;
    prepararFerramentas({ ga4: "G-ABCD1234", pixel: "123456789012345" }, win);
    expect(win.dataLayer).toHaveLength(2);
    const [js, config] = win.dataLayer as IArguments[];
    expect(Object.prototype.toString.call(js)).toBe("[object Arguments]");
    expect(js[0]).toBe("js");
    expect(config[0]).toBe("config");
    expect(config[1]).toBe("G-ABCD1234");
    expect(config[2]).toEqual({ send_page_view: false });
    expect(win.fbq!.queue).toEqual([
      ["set", "autoConfig", false, "123456789012345"],
      ["init", "123456789012345"],
    ]);
    expect(win._fbq).toBe(win.fbq);
    prepararFerramentas({ ga4: "G-ABCD1234", pixel: "123456789012345" }, win);
    expect(win.dataLayer).toHaveLength(2);
  });

  it("sem ID, não prepara nada", () => {
    const win = {} as Window;
    prepararFerramentas({ ga4: null, pixel: null }, win);
    expect(win.gtag).toBeUndefined();
    expect(win.fbq).toBeUndefined();
  });

  it("injeta um script por ferramenta, dos domínios da CSP, uma vez só", () => {
    carregarFerramentas({ ga4: "G-ABCD1234", pixel: "123456789012345" });
    carregarFerramentas({ ga4: "G-ABCD1234", pixel: "123456789012345" });
    const scripts = [...document.head.querySelectorAll("script")].map((s) => s.src);
    expect(scripts).toEqual([urlDoScript("ga4", "G-ABCD1234"), urlDoScript("pixel", "123456789012345")]);
    for (const src of scripts) expect(SCRIPTS_DE_TERCEIROS.some((h) => src.startsWith(`${h}/`)), src).toBe(true);
    expect(document.head.querySelector("script")!.async).toBe(true);
  });

  it("espera o load e um momento ocioso, no máximo ESPERA_MAXIMA_MS; cancelar impede", () => {
    vi.useFakeTimers();
    const tarefa = vi.fn();
    const win = { document: { readyState: "complete" }, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as Window;
    depoisDoConteudo(tarefa, win);
    expect(tarefa).not.toHaveBeenCalled();
    vi.advanceTimersByTime(ESPERA_MAXIMA_MS);
    expect(tarefa).toHaveBeenCalledTimes(1);

    const carregando = { document: { readyState: "loading" }, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as Window;
    const outra = vi.fn();
    const cancelar = depoisDoConteudo(outra, carregando);
    expect(carregando.addEventListener).toHaveBeenCalledWith("load", expect.any(Function), { once: true });
    cancelar();
    (carregando.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1]();
    vi.advanceTimersByTime(ESPERA_MAXIMA_MS * 2);
    expect(outra).not.toHaveBeenCalled();
  });
});

describe("CSP, scripts e privacidade falam dos mesmos domínios", () => {
  const diretivas = Object.fromEntries(
    CSP.split(";").map((d) => {
      const [nome, ...valores] = d.trim().split(/\s+/);
      return [nome, valores.filter((v) => /^https?:/.test(v))];
    }),
  );

  it("script-src tem exatamente os domínios de script; connect-src e img-src, os de coleta", () => {
    expect(diretivas["script-src"]).toEqual(SCRIPTS_DE_TERCEIROS);
    expect(diretivas["connect-src"]).toEqual(COLETA_DE_TERCEIROS);
    expect(diretivas["img-src"]).toEqual(COLETA_DE_TERCEIROS);
    for (const nome of ["default-src", "style-src", "font-src"]) expect(diretivas[nome], nome).toEqual([]);
  });

  it("a página de privacidade nomeia cada ferramenta e cada domínio", () => {
    const pagina = semComentarios(ler("src/app/privacidade/page.tsx"));
    for (const t of Object.values(TERCEIROS)) {
      expect(pagina).toContain(t.nome);
      for (const host of [t.script, ...t.coleta]) {
        const dominio = host.replace(/^https:\/\/(\*\.|www\.)?/, "");
        expect(pagina, host).toContain(dominio);
      }
    }
    expect(pagina).toContain("ControleDeMedicao");
    expect(pagina).toContain("API de Conversões");
  });

  it(".env.example lista toda variável de ambiente que o código lê", () => {
    const exemplo = ler(".env.example");
    const codigo = arquivos("src").map((a) => semComentarios(ler(a))).join("\n");
    const nomes = new Set([...codigo.matchAll(/\b(?:process\.)?env\.([A-Z][A-Z0-9_]+)/g)].map((m) => m[1]));
    nomes.delete("NODE_ENV");
    expect(nomes.size).toBeGreaterThanOrEqual(7);
    for (const nome of nomes) expect(exemplo, nome).toMatch(new RegExp(`^${nome}=`, "m"));
  });
});

describe("todo CTA e link de contato está marcado", () => {
  /** A tag inteira a partir da abertura, pulando `>` dentro de chaves (onClick={() => ...}). */
  const tags = (codigo: string, abertura: RegExp) =>
    [...codigo.matchAll(new RegExp(`${abertura.source}(?:[^>{]|\\{[^}]*\\})*>`, "g"))].map((m) => m[0]);

  it("data-evento sempre vem com data-local", () => {
    for (const arquivo of fontes) {
      for (const tag of tags(semComentarios(ler(arquivo)), /<(?:a|Link)\b[^>]*data-evento=/g)) {
        expect(tag, `${arquivo}: ${tag}`).toMatch(/data-local="[a-z-]+"/);
      }
    }
  });

  it("todo link de WhatsApp e todo botão principal para /diagnostico disparam evento", () => {
    for (const arquivo of fontes) {
      const codigo = semComentarios(ler(arquivo));
      for (const tag of tags(codigo, /<a\b[^>]*href=\{linkWhatsApp\(/g)) {
        expect(tag, `${arquivo}: ${tag}`).toContain('data-evento="click_whatsapp"');
      }
      for (const tag of tags(codigo, /<Link\b[^>]*href="\/diagnostico"/g)) {
        expect(tag, `${arquivo}: ${tag}`).toContain('data-evento="cta_click"');
      }
    }
  });

  it("o layout monta a medição e o formulário dispara form_start e generate_lead", () => {
    expect(ler("src/app/layout.tsx")).toContain("<Medicao />");
    const form = semComentarios(ler("src/components/diagnostico/Formulario.tsx"));
    expect(form).toContain("formularioIniciado(");
    expect(form).toContain("leadGerado(");
    expect(form).toContain('dados.medicao = "desligada"');
  });
});
