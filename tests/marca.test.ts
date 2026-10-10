import { describe, expect, it } from "vitest";
import { amostrarCaminho } from "@/lib/contorno";
import { DESENHOS, MOLECULA, RAIO, SIMBOLO_ATUAL, moleculaDoHero, type VarianteDoSimbolo } from "@/lib/marca";

/**
 * A geometria de cada variação do símbolo: a rede cabe na nuvem, as
 * ligações e o sinal apontam para nós que existem, e o nó âmbar é onde o
 * sinal termina. Vale para a C1d nova e para as que vieram de marca.md.
 */

const TRACO_DA_NUVEM = 6;

function dentroDoContorno(contorno: { x: number; y: number }[], x: number, y: number): boolean {
  let dentro = false;
  for (let i = 0, j = contorno.length - 1; i < contorno.length; j = i++) {
    const a = contorno[i];
    const b = contorno[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) dentro = !dentro;
  }
  return dentro;
}

const variantes = Object.keys(DESENHOS) as VarianteDoSimbolo[];

describe.each(variantes)("símbolo %s", (variante) => {
  const desenho = DESENHOS[variante];
  const ids = new Set(desenho.nos.map((n) => n.id));

  it("cada nó fica dentro da nuvem, sem encostar no traço", () => {
    const contorno = amostrarCaminho(desenho.nuvem, 1440);
    for (const n of desenho.nos) {
      expect(dentroDoContorno(contorno, n.x, n.y), `${n.id} fora da nuvem`).toBe(true);
      const distancia = Math.min(...contorno.map((p) => Math.hypot(p.x - n.x, p.y - n.y)));
      const folga = distancia - RAIO[n.tipo] - TRACO_DA_NUVEM / 2;
      // O monograma C1a de marca.md tem o nó de baixo a 2,5: o piso é 2.
      expect(folga, `${n.id} encosta no traço da nuvem`).toBeGreaterThan(2);
    }
  });

  it("ligações e sinal usam nós que existem, e o sinal anda por ligações", () => {
    const pares = new Set(desenho.ligacoes.flatMap(([a, b]) => [`${a}-${b}`, `${b}-${a}`]));
    for (const [a, b] of desenho.ligacoes) expect(ids.has(a) && ids.has(b), `${a}-${b}`).toBe(true);
    for (let i = 0; i < desenho.sinal.length - 1; i++) {
      expect(pares.has(`${desenho.sinal[i]}-${desenho.sinal[i + 1]}`), desenho.sinal.join(" → ")).toBe(true);
    }
  });

  it("há um nó âmbar só, e é onde o sinal termina", () => {
    const ambar = desenho.nos.filter((n) => n.ambar);
    expect(ambar).toHaveLength(1);
    expect(desenho.sinal.at(-1)).toBe(ambar[0].id);
  });
});

describe("C1d, a molécula em V", () => {
  const v = DESENHOS.C1d;
  const no = (id: string) => v.nos.find((n) => n.id === id)!;

  it("o sinal desenha um V: desce até Ob e sobe de novo, em linha reta", () => {
    const [a, b, fundo, d, e] = v.sinal.map(no);
    expect(fundo.y).toBeGreaterThan(b.y);
    expect(b.y).toBeGreaterThan(a.y);
    expect(fundo.y).toBeGreaterThan(d.y);
    expect(d.y).toBeGreaterThan(e.y);
    // V1 e V2 sobre as retas que ligam as pontas ao fundo.
    const naReta = (p: typeof a, q: typeof a, r: typeof a) =>
      Math.abs((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
    expect(naReta(a, fundo, b)).toBeLessThan(1e-9);
    expect(naReta(fundo, e, d)).toBeLessThan(1e-9);
  });

  it("mantém a molécula do C1: os mesmos 7 nós e 6 ligações", () => {
    expect(v.nos.map((n) => `${n.id}:${n.tipo}`).sort()).toEqual(
      DESENHOS.C1.nos.map((n) => `${n.id}:${n.tipo}`).sort(),
    );
    expect(v.ligacoes).toEqual(DESENHOS.C1.ligacoes);
  });
});

describe("o hero segue o símbolo escolhido", () => {
  it("as partículas usam a mesma molécula do logo (o monograma usa a do C1)", () => {
    expect(MOLECULA).toBe(moleculaDoHero(SIMBOLO_ATUAL));
    expect(moleculaDoHero("C1a")).toBe(DESENHOS.C1);
    expect(moleculaDoHero("C1d")).toBe(DESENHOS.C1d);
    expect(MOLECULA.nos).toHaveLength(7);
    expect(MOLECULA.ligacoes).toHaveLength(6);
  });
});
