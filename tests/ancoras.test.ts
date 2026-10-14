// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { MOMENTOS_DE_CORRECAO, alvoDaAncora, corrigirPouso } from "@/lib/ancora";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Âncoras (#perguntas, #solucoes, #como-se-liga) precisam aterrissar no
 * título. Medido em 12/10: com `content-visibility: auto` e a estimativa de
 * 900px, o alvo ficava 470px abaixo em /precos#perguntas e 1.890px abaixo
 * na home do celular, porque as seções renderizavam com a altura real
 * depois da rolagem. A regra abaixo revela as seções quando há fragmento.
 */
describe("âncoras", () => {
  const css = ler("src/app/globals.css");

  it("com fragmento na URL, as seções adiadas ganham a altura real antes da rolagem", () => {
    expect(css).toMatch(/\.adiada\s*\{\s*content-visibility:\s*auto;/);
    expect(css).toMatch(/html:has\(:target\)\s+\.adiada\s*\{\s*content-visibility:\s*visible;/);
  });

  it("a Geist Mono tem reservas com a mesma largura, para a troca de fonte não empurrar a âncora", () => {
    expect(css).toMatch(/--font-mono:\s*"Geist Mono",\s*"Geist Mono Reserva",\s*"Geist Mono Reserva Consolas"/);
    const reservas = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
    expect(reservas).toHaveLength(2);
    for (const r of reservas) {
      expect(r).toMatch(/src:\s*local\(/);
      expect(r).not.toMatch(/url\(/);
      expect(r).toMatch(/size-adjust:\s*\d/);
      expect(r).toMatch(/ascent-override:\s*100\.5%/);
      expect(r).toMatch(/descent-override:\s*29\.5%/);
    }
  });

  it("o esboço do orquestrador tem a mesma altura da versão interativa: o botão de repetir já vem no HTML", () => {
    const visao = ler("src/components/home/orquestrador/OrquestradorVisao.tsx");
    expect(visao).not.toMatch(/aoRepetir \? \(/);
    expect(visao).toMatch(/disabled=\{!aoRepetir\}/);
  });

  it("o topo fixo não cobre o título alvo", () => {
    expect(css).toMatch(/scroll-padding-top:\s*5rem/);
  });

  // Medido em 13/10 (226 casos): com rolagem suave, o que muda de altura acima
  // do alvo durante a animação (hidratação, fonte) errava o pouso em até
  // 400 px; sem suavidade, todos os casos pousaram a 80 px.
  it("as âncoras rolam sem suavidade e nenhuma seção pede margem extra além do topo", () => {
    expect(css).not.toMatch(/scroll-behavior:\s*smooth/);
    for (const arquivo of arquivos("src", /\.tsx$/)) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/scroll-mt-/);
    }
  });

  it("o layout confere o pouso depois da carga e das trocas de fragmento", () => {
    expect(ler("src/app/layout.tsx")).toContain("<Ancora />");
    const comp = semComentarios(ler("src/components/layout/Ancora.tsx"));
    expect(comp).toContain('addEventListener("hashchange"');
    expect(comp).toContain("corrigirPouso()");
  });

  it("link com fragmento é <a> nativo, nunca o Link do Next, que não marca o :target", () => {
    for (const arquivo of arquivos("src", /\.tsx$/)) {
      const codigo = semComentarios(ler(arquivo));
      expect(codigo, arquivo).not.toMatch(/<Link\b[^>]*href="[^"]*#/);
    }
    for (const arquivo of ["src/components/layout/Topo.tsx", "src/components/layout/MenuCelular.tsx"]) {
      expect(ler(arquivo), arquivo).toContain("<LinkOuAncora");
    }
    expect(semComentarios(ler("src/components/LinkOuAncora.tsx"))).toMatch(/href\.includes\("#"\)/);
  });

  it("o bloco 'o que registramos' já vem no HTML do servidor, com a mesma altura", () => {
    const comp = semComentarios(ler("src/components/solucoes/OQueRegistramos.tsx"));
    expect(comp).toMatch(/useSyncExternalStore\(assinar, lerOrigem, \(\) => "\{\}"\)/);
    expect(comp).not.toMatch(/if \(bruto === null\) return null/);
  });
});

describe("correção de pouso (lib/ancora.ts)", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
    history.replaceState(null, "", location.pathname);
  });

  it("acha o alvo do fragmento, inclusive codificado, e ignora hash vazio ou inválido", () => {
    document.body.innerHTML = '<h2 id="titulo-preço"></h2>';
    expect(alvoDaAncora("#titulo-pre%C3%A7o", document)?.id).toBe("titulo-preço");
    expect(alvoDaAncora("", document)).toBeNull();
    expect(alvoDaAncora("#", document)).toBeNull();
    expect(alvoDaAncora("#%E0%A4%A", document)).toBeNull();
    expect(alvoDaAncora("#nada", document)).toBeNull();
  });

  it("rola o alvo para o topo, sem suavidade, nos momentos marcados, e para quando a pessoa mexe", () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<section id="perguntas"></section>';
    const alvo = document.getElementById("perguntas")!;
    const rolar = vi.fn();
    alvo.scrollIntoView = rolar;
    history.replaceState(null, "", "#perguntas");
    const cancelar = corrigirPouso();
    vi.advanceTimersByTime(MOMENTOS_DE_CORRECAO[1] + 1);
    expect(rolar).toHaveBeenCalledTimes(2);
    expect(rolar).toHaveBeenLastCalledWith({ block: "start", behavior: "instant" });
    window.dispatchEvent(new Event("wheel"));
    vi.advanceTimersByTime(5000);
    expect(rolar).toHaveBeenCalledTimes(2);
    cancelar();
  });

  it("sem fragmento, não faz nada", () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<section id="x"></section>';
    const rolar = vi.fn();
    document.getElementById("x")!.scrollIntoView = rolar;
    corrigirPouso();
    vi.advanceTimersByTime(5000);
    expect(rolar).not.toHaveBeenCalled();
  });
});
