import { describe, expect, it } from "vitest";
import { ler, semComentarios } from "./fonte";

/**
 * O H1 é o LCP (infra.md). Estas travas seguram o que já derrubou o número
 * nas medições de 09/10: título com animação de entrada, canvas no pacote
 * inicial, Motion fora dos pedaços carregados por seção.
 */

describe("a capa da home", () => {
  const hero = semComentarios(ler("src/components/home/Hero.tsx"));
  const css = ler("src/app/globals.css");

  it("o H1 é texto do servidor, sem animação nem opacidade", () => {
    expect(hero).not.toMatch(/^"use client"/m);
    expect(hero).toMatch(/<h1 id="titulo-hero" className="titulo-hero">/);
    const regra = /\.titulo-hero\s*\{([^}]*)\}/.exec(css)![1];
    expect(regra).not.toMatch(/animation|opacity|transform/);
  });

  it("os motores do hero (partículas e 3D) só entram por import() dinâmico", () => {
    const molecula = semComentarios(ler("src/components/home/HeroMolecula.tsx"));
    expect(molecula).toMatch(/await import\("@\/lib\/particulas"\)/);
    expect(molecula).toMatch(/import\("@\/lib\/molecula3d"\)/);
    expect(molecula).not.toMatch(/^import \{[^}]*\} from "@\/lib\/(particulas|molecula3d)"/m);
  });

  it("backdrop-filter vem depois do prefixo -webkit- (na ordem inversa o minificador o descarta)", () => {
    const linhas = css.split("\n");
    linhas.forEach((linha, i) => {
      if (/^\s*backdrop-filter:/.test(linha)) expect(linhas[i - 1], `linha ${i + 1}`).toMatch(/-webkit-backdrop-filter:/);
    });
  });

  it("Motion só aparece no pedaço interativo do diagrama, por import()", () => {
    const usos = ["src/components/home/diagrama/DiagramaInterativo.tsx"];
    expect(semComentarios(ler(usos[0]))).toMatch(/await import\("motion"\)/);
    expect(semComentarios(ler(usos[0]))).not.toMatch(/^import \{[^}]*\} from "motion"/m);
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
