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

const iniciarParticulas = vi.fn<(canvas: HTMLCanvasElement, opcoes: { sinalExterno?: boolean }) => object>(() => ({
  acender() {},
  ponteiro() {},
  disparar() {},
  usarSinalProprio() {},
  destruir() {},
}));
vi.mock("@/lib/particulas", () => ({ iniciarParticulas }));
const iniciarMolecula3d = vi.fn(() => ({ acender() {}, ponteiro() {}, destruir() {} }));
vi.mock("@/lib/molecula3d", () => ({ iniciarMolecula3d }));
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
  iniciarMolecula3d.mockClear();
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

describe("hero: a molécula 3D e as partículas", () => {
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

  it("com menos movimento nenhum dos dois motores é importado", async () => {
    prepararJanela(true);
    await montar();
    expect(iniciarParticulas).not.toHaveBeenCalled();
    expect(iniciarMolecula3d).not.toHaveBeenCalled();
  });

  it("sem a preferência os dois começam depois do load, e o sinal vem da 3D", async () => {
    prepararJanela(false);
    await montar();
    expect(iniciarMolecula3d).toHaveBeenCalledTimes(1);
    expect(iniciarParticulas).toHaveBeenCalledTimes(1);
    expect(iniciarParticulas.mock.calls[0][1]).toMatchObject({ sinalExterno: true });
  });

  it("sem WebGL 2 as partículas voltam ao sinal próprio", async () => {
    prepararJanela(false);
    const usarSinalProprio = vi.fn();
    iniciarParticulas.mockReturnValueOnce({ acender() {}, ponteiro() {}, disparar() {}, usarSinalProprio, destruir() {} });
    iniciarMolecula3d.mockReturnValueOnce(null as never);
    await montar();
    expect(iniciarMolecula3d).toHaveBeenCalledTimes(1);
    expect(usarSinalProprio).toHaveBeenCalledTimes(1);
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

describe("cursor: luz e ímã dos botões", () => {
  async function passarOMouse(menosMovimento: boolean) {
    prepararJanela(menosMovimento);
    const base = window.matchMedia;
    window.matchMedia = ((q: string) => ({ ...base(q), matches: q.includes("hover") ? true : base(q).matches })) as typeof window.matchMedia;
    const { default: LuzDoCursor } = await import("@/components/layout/LuzDoCursor");
    render(
      <>
        <LuzDoCursor />
        <a href="#x" className="botao">
          Pedir diagnóstico
        </a>
      </>,
    );
    const botao = screen.getByText("Pedir diagnóstico");
    botao.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 40 }) as DOMRect;
    const evento = new MouseEvent("pointermove", { bubbles: true, clientX: 190, clientY: 35 });
    Object.defineProperty(evento, "pointerType", { value: "mouse" });
    act(() => {
      botao.dispatchEvent(evento);
      vi.runOnlyPendingTimers();
    });
    return botao;
  }

  it("com menos movimento a luz segue, mas o botão não anda", async () => {
    const botao = await passarOMouse(true);
    expect(botao.style.getPropertyValue("--luz-x")).toBe("190px");
    expect(botao.style.getPropertyValue("--ima-x")).toBe("");
  });

  it("sem a preferência o botão é puxado na direção do cursor", async () => {
    const botao = await passarOMouse(false);
    expect(parseFloat(botao.style.getPropertyValue("--ima-x"))).toBeGreaterThan(0);
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
    // Exceções, com motivo: os motores são chamados só por quem já
    // perguntou (HeroMolecula); a rota de leads usa setTimeout no servidor,
    // como limite de tempo do webhook, sem animar nada.
    const excecoes = new Set(["src/lib/particulas.ts", "src/lib/molecula3d.ts", "src/app/api/leads/route.ts"]);
    const anima = /requestAnimationFrame|import\("motion"\)|from "motion"|setTimeout|iniciarParticulas\(/;
    for (const arquivo of arquivos("src", /\.tsx?$/)) {
      const codigo = semComentarios(ler(arquivo));
      if (!anima.test(codigo) || excecoes.has(arquivo)) continue;
      expect(codigo, `${arquivo} anima sem perguntar a lib/movimento`).toMatch(/prefereMenosMovimento\(\)/);
    }
  });
});
