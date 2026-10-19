// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { prefereMenosMovimento } from "@/lib/movimento";
import { MOVIMENTO } from "@/lib/tokens";
import { frenteDoDesign, kebab } from "./design";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * A regra: com `prefers-reduced-motion: reduce`, nada se move. Nenhum
 * quadro agendado, nenhuma sequência por timer, nenhum observador de
 * entrada. O estado final aparece direto.
 *
 * Cada caso roda também sem a preferência, para provar que o teste vê o
 * movimento quando ele existe (senão passaria por vacuidade).
 */

const animate = vi.fn(() => ({ stop() {} }));
vi.mock("motion", () => ({ animate }));

let observadores: { cb: IntersectionObserverCallback; alvo?: Element }[] = [];

function prepararJanela(menosMovimento: boolean) {
  window.matchMedia = vi.fn((consulta: string) => ({
    matches: consulta.includes("prefers-reduced-motion") ? menosMovimento : false,
    media: consulta,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
  observadores = [];
  window.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      observadores.push({ cb });
    }
    observe(alvo: Element) {
      observadores[observadores.length - 1].alvo = alvo;
    }
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

/** Simula o observador avisando que o alvo entrou (ou não) na tela. */
function avisar(visivel: boolean) {
  for (const o of [...observadores]) {
    o.cb([{ isIntersecting: visivel, target: o.alvo } as IntersectionObserverEntry], {} as IntersectionObserver);
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, "requestAnimationFrame");
  animate.mockClear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("lib/movimento", () => {
  it("lê a preferência do sistema", () => {
    prepararJanela(true);
    expect(prefereMenosMovimento()).toBe(true);
    prepararJanela(false);
    expect(prefereMenosMovimento()).toBe(false);
  });
});

describe("entradas ao rolar: a rota e os blocos", () => {
  async function montar() {
    const { default: Entradas } = await import("@/components/layout/Entradas");
    render(
      <>
        <section data-entra="" data-testid="trecho" />
        <Entradas />
      </>,
    );
    return screen.getByTestId("trecho");
  }

  it("com menos movimento nada é observado e o trecho fica desenhado", async () => {
    prepararJanela(true);
    const trecho = await montar();
    expect(observadores).toHaveLength(0);
    expect(trecho.getAttribute("data-entra")).toBe("");
  });

  it("sem a preferência, fora da tela espera e desce ao entrar, uma vez", async () => {
    prepararJanela(false);
    const trecho = await montar();
    act(() => avisar(false));
    expect(trecho.getAttribute("data-entra")).toBe("espera");
    act(() => avisar(true));
    expect(trecho.getAttribute("data-entra")).toBe("vai");
  });

  it("o que já está na tela no primeiro aviso fica parado", async () => {
    prepararJanela(false);
    const trecho = await montar();
    act(() => avisar(true));
    expect(trecho.getAttribute("data-entra")).toBe("");
  });
});

describe("case: o número parado", () => {
  it("o número do case é texto do servidor: nenhum contador sobrou no site", () => {
    expect(ler("src/components/home/CaseMotors.tsx")).toMatch(/\{n\.valor\}/);
    for (const arquivo of arquivos("src", /\.tsx$/)) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/NumeroQueConta/);
    }
  });
});

describe("orquestrador: a demonstração", () => {
  async function montar() {
    const { default: OrquestradorInterativo } = await import(
      "@/components/home/orquestrador/OrquestradorInterativo"
    );
    const r = render(<OrquestradorInterativo comecarZerado />);
    return r.container;
  }

  it("com menos movimento mostra todos os passos e troca de aba sem timer", async () => {
    prepararJanela(true);
    const tela = await montar();
    expect(tela.querySelectorAll("[data-oculto]")).toHaveLength(0);
    fireEvent.click(screen.getByRole("tab", { name: "Automação" }));
    expect(tela.querySelectorAll("[data-oculto]")).toHaveLength(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("sem a preferência os passos aparecem um a um", async () => {
    prepararJanela(false);
    const tela = await montar();
    expect(tela.querySelectorAll("[data-oculto]").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("tab", { name: "Automação" }));
    expect(vi.getTimerCount()).toBeGreaterThan(0);
  });
});

describe("diagrama: a peça escolhida", () => {
  async function clicarNoCrm() {
    const { default: DiagramaInterativo } = await import("@/components/home/diagrama/DiagramaInterativo");
    render(<DiagramaInterativo />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /^CRM/ }));
      await vi.runAllTimersAsync();
    });
  }

  it("o clique escolhe a peça e acende o caminho dela, sem nada correr sozinho", async () => {
    for (const menos of [true, false]) {
      prepararJanela(menos);
      await clicarNoCrm();
      expect(screen.getByRole("button", { name: /^CRM/ }).getAttribute("aria-pressed")).toBe("true");
      expect(screen.getByRole("button", { name: /^Site/ }).hasAttribute("data-no-caminho")).toBe(false);
      expect(screen.getByRole("button", { name: /^Agente de IA/ }).hasAttribute("data-no-caminho")).toBe(true);
      expect(animate).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
      cleanup();
    }
  });
});

describe("CSS e fonte", () => {
  it("globals.css desliga transição, animação e rolagem suave com menos movimento", () => {
    const css = ler("src/app/globals.css");
    const bloco = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/.exec(css);
    expect(bloco).not.toBeNull();
    expect(bloco![1]).toMatch(/\*,\s*\*::before,\s*\*::after/);
    expect(bloco![1]).toMatch(/animation:\s*none !important/);
    expect(bloco![1]).toMatch(/transition:\s*none !important/);
    expect(bloco![1]).toMatch(/scroll-behavior:\s*auto !important/);
  });

  it("com menos movimento as quatro durações do sistema vão a zero", () => {
    const css = ler("src/app/globals.css");
    const bloco = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/.exec(css)![1];
    const raiz = /:root\s*\{([^}]*)\}/.exec(bloco);
    expect(raiz, ":root dentro do bloco de menos movimento").not.toBeNull();
    const duracoes = Object.keys(MOVIMENTO).filter((n) => n.startsWith("duracao"));
    expect(duracoes).toHaveLength(4);
    for (const nome of duracoes) {
      expect(raiz![1], nome).toMatch(new RegExp(`--${kebab(nome)}:\\s*0ms;`));
    }
  });

  it("curvas e durações são as do DESIGN.md, em tokens.ts e no :root do globals.css", () => {
    const css = ler("src/app/globals.css");
    const doDesign = frenteDoDesign().motion as Record<string, string>;
    expect(Object.fromEntries(Object.entries(MOVIMENTO).map(([n, v]) => [kebab(n), v]))).toEqual(doDesign);
    const raiz = /^:root\s*\{([^}]*)\}/m.exec(css)![1];
    for (const [nome, valor] of Object.entries(MOVIMENTO)) {
      expect(raiz, nome).toContain(`--${kebab(nome)}: ${valor};`);
    }
  });

  it("as curvas da base escura saíram e nenhuma animação repete sem fim", () => {
    const css = semComentarios(ler("src/app/globals.css"));
    expect(css).not.toMatch(/--ease-(saida|movimento|mola)/);
    expect(css).not.toMatch(/linear\(/);
    expect(css).not.toMatch(/\binfinite\b/);
  });

  it("transição e animação no CSS usam só as quatro durações", () => {
    // Fora a definição dos tokens e o zero do bloco de menos movimento, nenhum
    // número com ms ou s aparece no globals.css.
    const css = semComentarios(ler("src/app/globals.css")).replace(/:root\s*\{[^}]*\}/g, "");
    expect(css).not.toMatch(/[\s,(:]\d*\.?\d+m?s\b/);
    for (const arquivo of arquivos("src", /\.tsx$/)) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/(?<![\w-])duration-\d/);
    }
  });

  it("a rota e o mapa se desenham na curva de percurso, uma vez", () => {
    const css = semComentarios(ler("src/app/globals.css"));
    const tracos = [...css.matchAll(/animation:\s*traca-[a-z]+\s+var\(--duracao-[a-z]+\)\s+var\(--([a-z-]+)\)/g)];
    expect(tracos.length).toBeGreaterThan(2);
    for (const [, curva] of tracos) expect(curva).toBe("curva-percurso");
  });

  it("todo código que agenda quadro ou anima pergunta a lib/movimento", () => {
    // Exceções, com motivo: a rota de leads e o CAPI usam setTimeout no
    // servidor, como limite de tempo das chamadas; a medição usa setTimeout
    // para esperar a página carregar antes das tags; a âncora confere o pouso
    // em momentos marcados; o carregador por seção observa a tela só para
    // importar o pedaço interativo. Nenhum deles anima.
    const excecoes = new Set([
      "src/lib/useCarregarPerto.ts",
      "src/app/api/leads/route.ts",
      "src/lib/capi.ts",
      "src/lib/medicao.ts",
      "src/lib/ancora.ts",
    ]);
    const anima = /requestAnimationFrame|import\("motion"\)|from "motion"|setTimeout|IntersectionObserver\(/;
    for (const arquivo of arquivos("src", /\.tsx?$/)) {
      const codigo = semComentarios(ler(arquivo));
      if (!anima.test(codigo) || excecoes.has(arquivo)) continue;
      expect(codigo, `${arquivo} anima sem perguntar a lib/movimento`).toMatch(/prefereMenosMovimento\(\)/);
    }
  });
});
