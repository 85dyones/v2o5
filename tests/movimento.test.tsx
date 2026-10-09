// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { prefereMenosMovimento } from "@/lib/movimento";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * A regra: com `prefers-reduced-motion: reduce`, nada se move. Nenhum
 * quadro agendado, nenhuma sequência por timer, e nem o motor de partículas
 * nem o Motion chegam a ser importados. O estado final aparece direto.
 *
 * Cada caso roda também sem a preferência, para provar que o teste vê o
 * movimento quando ele existe (senão passaria por vacuidade).
 */

const iniciarParticulas = vi.fn(() => ({ acender() {}, ponteiro() {}, destruir() {} }));
vi.mock("@/lib/particulas", () => ({ iniciarParticulas }));
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
  iniciarParticulas.mockClear();
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

describe("hero: o canvas de partículas", () => {
  async function montar() {
    const { default: HeroMolecula } = await import("@/components/home/HeroMolecula");
    render(
      <section>
        <HeroMolecula />
      </section>,
    );
    // load + ocioso + import dinâmico
    await act(async () => {
      window.dispatchEvent(new Event("load"));
      await vi.runAllTimersAsync();
    });
  }

  it("com menos movimento o motor nem é importado", async () => {
    prepararJanela(true);
    await montar();
    expect(iniciarParticulas).not.toHaveBeenCalled();
  });

  it("sem a preferência o motor começa depois do load", async () => {
    prepararJanela(false);
    await montar();
    expect(iniciarParticulas).toHaveBeenCalledTimes(1);
  });
});

describe("case: o número que conta", () => {
  async function montar() {
    const { default: NumeroQueConta } = await import("@/components/home/NumeroQueConta");
    render(<NumeroQueConta valor={132} />);
  }

  it("com menos movimento fica no valor e não agenda quadro", async () => {
    prepararJanela(true);
    await montar();
    expect(observadores).toHaveLength(0);
    expect(screen.getByText("132")).toBeTruthy();
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("sem a preferência zera fora da tela e conta ao entrar", async () => {
    prepararJanela(false);
    await montar();
    act(() => avisar(false));
    expect(screen.getByText("0")).toBeTruthy();
    act(() => avisar(true));
    expect(window.requestAnimationFrame).toHaveBeenCalled();
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

describe("diagrama: o pulso", () => {
  async function clicarNoCrm() {
    const { default: DiagramaInterativo } = await import("@/components/home/diagrama/DiagramaInterativo");
    render(<DiagramaInterativo />);
    // getClientRects vazio no jsdom: finge que o primeiro arranjo está visível.
    const svg = document.querySelector("svg[data-diagrama]") as SVGSVGElement;
    svg.getClientRects = () => [{}] as unknown as DOMRectList;
    await act(async () => {
      fireEvent.click(screen.getAllByRole("button", { name: "CRM" })[0]);
      await vi.runAllTimersAsync();
    });
  }

  it("com menos movimento o caminho acende e o Motion não é chamado", async () => {
    prepararJanela(true);
    await clicarNoCrm();
    expect(screen.getAllByRole("button", { name: "CRM" })[0].getAttribute("aria-pressed")).toBe("true");
    expect(animate).not.toHaveBeenCalled();
  });

  it("sem a preferência o pulso corre", async () => {
    prepararJanela(false);
    await clicarNoCrm();
    expect(animate).toHaveBeenCalledTimes(1);
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

  it("todo código que agenda quadro ou anima pergunta a lib/movimento", () => {
    // Exceções, com motivo: o motor é chamado só por quem já perguntou
    // (HeroMolecula); BentoLuz e o hook de carga só respondem ao ponteiro e à
    // rolagem, sem movimento próprio.
    const excecoes = new Set([
      "src/lib/particulas.ts",
      "src/components/home/BentoLuz.tsx",
    ]);
    const anima = /requestAnimationFrame|import\("motion"\)|from "motion"|setTimeout|iniciarParticulas\(/;
    for (const arquivo of arquivos("src", /\.tsx?$/)) {
      const codigo = semComentarios(ler(arquivo));
      if (!anima.test(codigo) || excecoes.has(arquivo)) continue;
      expect(codigo, `${arquivo} anima sem perguntar a lib/movimento`).toMatch(/prefereMenosMovimento\(\)/);
    }
  });
});
