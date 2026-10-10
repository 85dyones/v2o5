import { describe, expect, it } from "vitest";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";
import {
  ATOMOS,
  FAIXAS,
  GUIAS,
  PALCO,
  curvaDeEntrada,
  curvaDeSaida,
  noPalco,
  particulasParadas,
  pontoNaCurva,
} from "@/lib/palco";
import { ler, semComentarios } from "./fonte";

/**
 * O palco do hero: a molécula é a do logo (mesmo vetor), os trilhos entram
 * pela esquerda nos oxigênios Ot1 e Ot2 e saem pela direita por Ot4 e Ot3.
 * O SVG estático e o canvas leem a mesma geometria.
 */

describe("o palco do hero", () => {
  it("os átomos são os do vetor grande do logo, levados ao palco", () => {
    for (const [id, n] of Object.entries(SIMBOLO_C1D.grande.nos)) {
      const a = ATOMOS[id as keyof typeof ATOMOS];
      expect(a).toMatchObject(noPalco(n));
    }
  });

  it("a molécula inteira cabe no palco, com folga", () => {
    for (const a of Object.values(ATOMOS)) {
      expect(a.x - a.r).toBeGreaterThan(10);
      expect(a.x + a.r).toBeLessThan(PALCO.largura - 10);
      expect(a.y - a.r).toBeGreaterThan(10);
      expect(a.y + a.r).toBeLessThan(PALCO.altura - 10);
    }
  });

  it("toda entrada nasce fora da borda esquerda e chega ao átomo dela", () => {
    for (const atomo of ["Ot1", "Ot2"] as const) {
      for (const y of FAIXAS[atomo]) {
        const c = curvaDeEntrada(atomo, y);
        expect(c[0].x).toBeLessThan(0);
        expect(pontoNaCurva(c, 1)).toEqual({ x: ATOMOS[atomo].x, y: ATOMOS[atomo].y });
      }
    }
  });

  it("toda saída deixa o átomo e termina fora da borda direita", () => {
    for (const atomo of ["Ot4", "Ot3"] as const) {
      for (const y of FAIXAS[atomo]) {
        const c = curvaDeSaida(atomo, y);
        expect(pontoNaCurva(c, 0)).toEqual({ x: ATOMOS[atomo].x, y: ATOMOS[atomo].y });
        expect(c[3].x).toBeGreaterThan(PALCO.largura);
      }
    }
    expect(GUIAS.saida.length).toBeGreaterThan(0);
  });

  it("as partículas paradas do SVG saem iguais em toda build", () => {
    expect(particulasParadas()).toEqual(particulasParadas());
    expect(particulasParadas().some((p) => p.tipo === "saida")).toBe(true);
  });

  it("o SVG estático e o motor usam a geometria do palco", () => {
    expect(semComentarios(ler("src/components/home/PalcoDoHero.tsx"))).toMatch(/from "@\/lib\/palco"/);
    expect(semComentarios(ler("src/lib/particulas.ts"))).toMatch(/from "\.\/palco"/);
  });
});
