import { describe, expect, it } from "vitest";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * O H1 é o LCP (infra.md). Estas travas seguram o que já derrubou o número
 * nas medições de 09/10: título com animação de entrada, canvas no pacote
 * inicial, Motion fora dos pedaços carregados por seção. Com a direção B
 * (19/10) a molécula do hero saiu: a abertura é texto e o mapa em CSS.
 */

describe("a capa da home", () => {
  const hero = semComentarios(ler("src/components/home/Hero.tsx"));
  const css = ler("src/app/globals.css");

  it("o H1 é texto do servidor, sem animação nem opacidade", () => {
    expect(hero).not.toMatch(/^"use client"/m);
    expect(hero).toMatch(/<h1 id="titulo-hero" className="titulo-hero[ "]/);
    const regra = /\.titulo-hero\s*\{([^}]*)\}/.exec(css)![1];
    expect(regra).not.toMatch(/animation|opacity|transform/);
  });

  it("a abertura não traz canvas, 3D nem Motion: o mapa é HTML e CSS", () => {
    for (const arquivo of [
      "src/components/home/Hero.tsx",
      "src/components/home/mapa/MapaDaAbertura.tsx",
      "src/components/home/mapa/Estacoes.tsx",
    ]) {
      const codigo = semComentarios(ler(arquivo));
      expect(codigo, arquivo).not.toMatch(/<canvas|three|from "motion"|import\("motion"\)/);
    }
  });

  it("backdrop-filter vem depois do prefixo -webkit- (na ordem inversa o minificador o descarta)", () => {
    const linhas = css.split("\n");
    linhas.forEach((linha, i) => {
      if (/^\s*backdrop-filter:/.test(linha)) expect(linhas[i - 1], `linha ${i + 1}`).toMatch(/-webkit-backdrop-filter:/);
    });
  });

  it("Motion não entra na home: o movimento é CSS", () => {
    for (const arquivo of arquivos("src/components/home", /\.tsx$/)) {
      const codigo = semComentarios(ler(arquivo));
      expect(codigo, arquivo).not.toMatch(/from "motion"|import\("motion"\)/);
    }
  });

  it("orquestrador e diagrama chegam perto da tela, não na carga", () => {
    for (const arquivo of [
      "src/components/home/orquestrador/OrquestradorPreguicoso.tsx",
      "src/components/home/diagrama/DiagramaPreguicoso.tsx",
    ]) {
      expect(semComentarios(ler(arquivo)), arquivo).toMatch(/const importar = \(\) => import\("\.\/\w+Interativo"\)/);
    }
  });
});
