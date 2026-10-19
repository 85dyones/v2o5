import { describe, expect, it } from "vitest";
import { CIRCULOS_DA_NUVEM } from "@/lib/construcao";
import { SIMBOLO_C1D } from "@/lib/marca-vetor";

/**
 * A construção mostrada no fecho, no rodapé e em /sobre tem de ser a do
 * símbolo de verdade: cada arco da nuvem começa e termina em cima do seu
 * círculo, com o mesmo raio.
 */
describe("construção do símbolo", () => {
  it("cada arco da nuvem mora no círculo de mesmo índice", () => {
    const d = SIMBOLO_C1D.grande.nuvem;
    const inicio = d.match(/^M([\d.]+) ([\d.]+)/)!;
    let ponto = [Number(inicio[1]), Number(inicio[2])];
    const arcos = [...d.matchAll(/A([\d.]+) [\d.]+ 0 0 1 ([\d.]+) ([\d.]+)/g)];
    expect(arcos).toHaveLength(CIRCULOS_DA_NUVEM.length);
    arcos.forEach((a, i) => {
      const c = CIRCULOS_DA_NUVEM[i];
      const fim = [Number(a[2]), Number(a[3])];
      expect(Number(a[1]), `raio do arco ${i}`).toBe(c.r);
      for (const [x, y] of [ponto, fim]) expect(Math.hypot(x - c.x, y - c.y), `arco ${i}`).toBeCloseTo(c.r, 1);
      ponto = fim;
    });
  });
});
