import { describe, expect, it } from "vitest";
import { ler } from "./fonte";

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
});
