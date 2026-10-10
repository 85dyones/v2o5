import { describe, expect, it } from "vitest";
import { amostrarCaminho, lerCaminho } from "@/lib/contorno";
import { DESENHOS, VIEWBOX } from "@/lib/marca";

describe("contorno da nuvem", () => {
  const nuvem = DESENHOS.C1.nuvem;

  it("lê quatro arcos e a reta de fechamento", () => {
    const trechos = lerCaminho(nuvem);
    expect(trechos.map((t) => t.tipo)).toEqual(["arco", "arco", "arco", "arco", "reta"]);
  });

  it("cada arco passa pelas pontas do caminho (centro a um raio de distância)", () => {
    const pontas = [
      [30, 80],
      [28.09, 44.1],
      [67.93, 24.05],
      [99.58, 44.07],
      [98, 80],
    ];
    lerCaminho(nuvem).forEach((t, i) => {
      if (t.tipo !== "arco") return;
      for (const [x, y] of [pontas[i], pontas[i + 1]]) {
        expect(Math.hypot(x - t.cx, y - t.cy)).toBeCloseTo(t.r, 1);
      }
    });
  });

  it("os pontos começam no início do caminho e ficam dentro do viewBox", () => {
    const pontos = amostrarCaminho(nuvem, 360);
    expect(pontos).toHaveLength(360);
    expect(pontos[0].x).toBeCloseTo(30, 5);
    expect(pontos[0].y).toBeCloseTo(80, 5);
    for (const p of pontos) {
      expect(p.x).toBeGreaterThanOrEqual(VIEWBOX.x);
      expect(p.x).toBeLessThanOrEqual(VIEWBOX.x + VIEWBOX.largura);
      expect(p.y).toBeGreaterThanOrEqual(VIEWBOX.y);
      expect(p.y).toBeLessThanOrEqual(VIEWBOX.y + VIEWBOX.altura);
    }
  });

  it("os pontos saem igualmente espaçados pelo comprimento do caminho", () => {
    const n = 200;
    const passo = lerCaminho(nuvem).reduce((s, t) => s + t.comprimento, 0) / n;
    const pontos = amostrarCaminho(nuvem, n);
    const cordas = pontos.slice(1).map((p, i) => Math.hypot(p.x - pontos[i].x, p.y - pontos[i].y));
    // A corda nunca passa do passo; só encurta onde dois arcos se encontram.
    for (const c of cordas) expect(c).toBeLessThanOrEqual(passo + 1e-9);
    const iguais = cordas.filter((c) => c > passo * 0.98).length;
    expect(iguais / cordas.length).toBeGreaterThan(0.9);
  });
});
