import { describe, expect, it } from "vitest";
import { ORDEM, cadeiaDoPulso, noEspacoLocal } from "@/lib/molecula3d";
import { ATOMOS, CENTRO_DA_MOLECULA, ESCALA_DA_MOLECULA, RAIO_DA_LIGACAO, RESPIRO_DO_AMBAR } from "@/lib/palco";
import { ler } from "./fonte";

/**
 * A molécula 3D tem de ser o mesmo desenho do logo: átomos e espessuras do
 * vetor grande, no mesmo palco do SVG. Assim o canvas entra por cima sem
 * mexer na silhueta e as partículas continuam chegando nos átomos.
 */

describe("a molécula 3D", () => {
  it("usa os sete átomos do palco, com o centro da molécula na origem", () => {
    expect([...ORDEM].sort()).toEqual(Object.keys(ATOMOS).sort());
    for (const id of ORDEM) {
      const [x, y, r] = noEspacoLocal(id);
      expect(x + CENTRO_DA_MOLECULA.x).toBeCloseTo(ATOMOS[id].x, 6);
      expect(CENTRO_DA_MOLECULA.y - y).toBeCloseTo(ATOMOS[id].y, 6);
      expect(r).toBe(ATOMOS[id].r);
    }
  });

  it("ligação e respiro são os do vetor grande (scripts/vetorizar-logo.mjs)", () => {
    const script = ler("scripts/vetorizar-logo.mjs");
    const grande = /grande:\s*\{([^}]*)\}/.exec(script)![1];
    const valor = (nome: string) => Number(new RegExp(`${nome}:\\s*([\\d.]+)`).exec(grande)![1]);
    expect(RAIO_DA_LIGACAO).toBeCloseTo((valor("ligacao") / 2) * ESCALA_DA_MOLECULA, 6);
    expect(RESPIRO_DO_AMBAR).toBeCloseTo(valor("respiro") * ESCALA_DA_MOLECULA, 6);
  });

  it("o pulso percorre o V de Ot2 a Ot4, de 0 a 1", () => {
    const cadeia = cadeiaDoPulso();
    expect(cadeia).toHaveLength(5);
    expect(cadeia[0][2]).toBe(0);
    expect(cadeia[4][2]).toBe(1);
    for (let i = 1; i < cadeia.length; i++) expect(cadeia[i][2]).toBeGreaterThan(cadeia[i - 1][2]);
    expect(cadeia[0].slice(0, 2)).toEqual(noEspacoLocal("Ot2").slice(0, 2));
    expect(cadeia[4].slice(0, 2)).toEqual(noEspacoLocal("Ot4").slice(0, 2));
  });

  it("sem WebGL 2 devolve null, e o hero fica com o SVG", async () => {
    const { iniciarMolecula3d } = await import("@/lib/molecula3d");
    const canvas = { getContext: () => null } as unknown as HTMLCanvasElement;
    expect(iniciarMolecula3d(canvas)).toBeNull();
  });
});
