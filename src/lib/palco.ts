/**
 * O palco do hero: a molécula C1d no meio e os trilhos por onde as
 * partículas passam. É o conceito da marca desenhado: contatos chegam
 * devagar pela esquerda, entram pelos oxigênios Ot1 e Ot2, atravessam a
 * cadeia V1, Ob, V2 e saem acelerados e âmbar por Ot4 (a maioria) e Ot3.
 *
 * O SVG estático (`PalcoDoHero.tsx`) e o canvas (`particulas.ts`) leem a
 * mesma geometria daqui, no mesmo espaço de coordenadas (`PALCO`), então o
 * canvas entra por cima sem mexer em nada do desenho.
 */
import { SIMBOLO_C1D } from "./marca-vetor";

export const PALCO = { largura: 160, altura: 120 } as const;

/** A molécula no palco: escala e centro (o centro do símbolo é 64,55). */
export const ESCALA_DA_MOLECULA = 1.25;
export const CENTRO_DA_MOLECULA = { x: 86, y: 60 } as const;
const CENTRO_DO_SIMBOLO = { x: 64, y: 55 } as const;

export const TRANSFORMACAO_DA_MOLECULA = `translate(${CENTRO_DA_MOLECULA.x} ${CENTRO_DA_MOLECULA.y}) scale(${ESCALA_DA_MOLECULA}) translate(${-CENTRO_DO_SIMBOLO.x} ${-CENTRO_DO_SIMBOLO.y})`;

export interface Ponto {
  x: number;
  y: number;
}

/** Bézier cúbica: início, dois controles, fim. */
export type Curva = [Ponto, Ponto, Ponto, Ponto];

export type IdDoAtomo = "Ot1" | "Ot2" | "V1" | "Ob" | "V2" | "Ot3" | "Ot4";

export function noPalco(p: Ponto): Ponto {
  return {
    x: CENTRO_DA_MOLECULA.x + (p.x - CENTRO_DO_SIMBOLO.x) * ESCALA_DA_MOLECULA,
    y: CENTRO_DA_MOLECULA.y + (p.y - CENTRO_DO_SIMBOLO.y) * ESCALA_DA_MOLECULA,
  };
}

/** Centro e raio de cada átomo do vetor grande, já no palco. */
export const ATOMOS = Object.fromEntries(
  Object.entries(SIMBOLO_C1D.grande.nos).map(([id, n]) => [id, { ...noPalco(n), r: n.r * ESCALA_DA_MOLECULA }]),
) as Record<IdDoAtomo, Ponto & { r: number }>;

/** O caminho dentro do catalisador, depois da entrada e antes da saída. */
export const CADEIA: IdDoAtomo[] = ["V1", "Ob", "V2"];

export type Entrada = "Ot1" | "Ot2";
export type Saida = "Ot4" | "Ot3";

/** Fração das partículas que sai por Ot4 (o átomo âmbar). */
export const PARTE_QUE_SAI_PELO_AMBAR = 0.78;

/** Faixa de altura, na borda do palco, de onde vem (ou para onde vai) cada trilho. */
export const FAIXAS: Record<Entrada | Saida, [number, number]> = {
  Ot2: [2, 58],
  Ot1: [62, 118],
  Ot4: [-6, 34],
  Ot3: [84, 126],
};

function unitario(de: Ponto, para: Ponto): Ponto {
  const dx = para.x - de.x;
  const dy = para.y - de.y;
  const d = Math.hypot(dx, dy);
  return { x: dx / d, y: dy / d };
}

/**
 * Trilho de entrada: sai da borda esquerda na altura `y0` e chega ao átomo
 * na direção da ligação com V1, para a partícula seguir sem quina.
 */
export function curvaDeEntrada(atomo: Entrada, y0: number): Curva {
  const a = ATOMOS[atomo];
  const d = unitario(a, ATOMOS.V1);
  return [
    { x: -6, y: y0 },
    { x: 18, y: y0 },
    { x: a.x - d.x * 22, y: a.y - d.y * 22 },
    { x: a.x, y: a.y },
  ];
}

/** Trilho de saída: deixa o átomo na direção da ligação com V2 e sai pela direita. */
export function curvaDeSaida(atomo: Saida, y1: number): Curva {
  const a = ATOMOS[atomo];
  const d = unitario(ATOMOS.V2, a);
  return [
    { x: a.x, y: a.y },
    { x: a.x + d.x * 16, y: a.y + d.y * 16 },
    { x: PALCO.largura - 14, y: y1 },
    { x: PALCO.largura + 6, y: y1 },
  ];
}

export function pontoNaCurva([p0, p1, p2, p3]: Curva, t: number): Ponto {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return { x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export function caminhoDaCurva([p0, p1, p2, p3]: Curva): string {
  return `M${r2(p0.x)} ${r2(p0.y)}C${r2(p1.x)} ${r2(p1.y)} ${r2(p2.x)} ${r2(p2.y)} ${r2(p3.x)} ${r2(p3.y)}`;
}

/** Sorteio com semente: o SVG do servidor sai igual em toda build. */
export function sorteador(semente: number): () => number {
  let s = semente >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const entre = ([min, max]: [number, number], f: number) => min + (max - min) * f;

/** Trilhos-guia desenhados no SVG: poucos, finos, só para mostrar o fluxo. */
export const GUIAS = {
  entrada: [
    ...[0.08, 0.42, 0.8].map((f) => curvaDeEntrada("Ot2", entre(FAIXAS.Ot2, f))),
    ...[0.2, 0.55, 0.92].map((f) => curvaDeEntrada("Ot1", entre(FAIXAS.Ot1, f))),
  ],
  saida: [
    ...[0.15, 0.5, 0.85].map((f) => curvaDeSaida("Ot4", entre(FAIXAS.Ot4, f))),
    curvaDeSaida("Ot3", entre(FAIXAS.Ot3, 0.45)),
  ],
};

export interface ParticulaParada {
  x: number;
  y: number;
  /** Rastro (só na saída): de onde a partícula vinha. */
  de?: Ponto;
  tipo: "entrada" | "saida";
  tamanho: number;
  alfa: number;
}

/**
 * As partículas do SVG estático: um quadro do fluxo, para quem não tem o
 * canvas (menos movimento, aparelho fraco, sem JavaScript) ver a ideia.
 */
export function particulasParadas(semente = 5): ParticulaParada[] {
  const sorte = sorteador(semente);
  const lista: ParticulaParada[] = [];
  for (let i = 0; i < 28; i++) {
    const atomo: Entrada = i % 2 ? "Ot1" : "Ot2";
    const curva = curvaDeEntrada(atomo, entre(FAIXAS[atomo], sorte()));
    const t = 0.08 + 0.86 * sorte();
    const p = pontoNaCurva(curva, t);
    lista.push({ ...p, tipo: "entrada", tamanho: 0.35 + 0.3 * sorte(), alfa: 0.3 + 0.5 * t });
  }
  for (let i = 0; i < 8; i++) {
    const atomo: Saida = i % 4 === 3 ? "Ot3" : "Ot4";
    const curva = curvaDeSaida(atomo, entre(FAIXAS[atomo], sorte()));
    const t = 0.12 + 0.75 * sorte();
    const p = pontoNaCurva(curva, t);
    const de = pontoNaCurva(curva, Math.max(0, t - 0.06 - 0.1 * t));
    lista.push({ ...p, de, tipo: "saida", tamanho: 0.45 + 0.25 * sorte(), alfa: 0.55 + 0.4 * sorte() });
  }
  return lista;
}
