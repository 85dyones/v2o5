/**
 * Geometria do símbolo da V2O5 (família C1), copiada de
 * `memory/context/marca.md`. O mesmo desenho alimenta o SVG do topo, o SVG
 * estático do hero e as partículas do canvas.
 *
 * Logo escolhido em 09/10: C1d, a proposta do Dyones (a molécula do C1
 * virada em V). As outras variações ficam para comparação. Para trocar o
 * símbolo do site inteiro, mude `SIMBOLO_ATUAL`.
 */

export type VarianteDoSimbolo = "C1" | "C1a" | "C1b" | "C1c" | "C1d";

export const SIMBOLO_ATUAL: VarianteDoSimbolo = "C1d";

/** viewBox comum a toda a família (proporção 1,6). */
export const VIEWBOX = { x: 8, y: 14, largura: 112, altura: 70 } as const;

export interface No {
  id: string;
  x: number;
  y: number;
  /** "V" é o vanádio (raio 6,5); "O" é o oxigênio (raio 4,5). */
  tipo: "V" | "O";
  ambar?: boolean;
}

export interface Desenho {
  nuvem: string;
  nos: No[];
  ligacoes: [string, string][];
  /** Caminho do sinal, na ordem em que acende. */
  sinal: string[];
  /** Traço extra (a fenda do C1b). */
  extra?: string;
  /** Ramos finos sem nó na ponta (C1a), traço 2,5. */
  ramos?: [number, number, number, number][];
}

const NUVEM_C1 =
  "M30 80 A18 18 0 0 1 28.09 44.1 A24 24 0 0 1 67.93 24.05 A20 20 0 0 1 99.58 44.07 A18 18 0 0 1 98 80 Z";

const NUVEM_C1B =
  "M30 80 A18 18 0 0 1 26.48 44.35 A20 20 0 0 1 64 31.28 A20 20 0 0 1 101.52 44.35 A18 18 0 0 1 98 80 Z";

const MOLECULA_C1: Desenho = {
  nuvem: NUVEM_C1,
  nos: [
    { id: "Ot1", x: 40, y: 45, tipo: "O" },
    { id: "Ot2", x: 42, y: 68, tipo: "O" },
    { id: "V1", x: 53, y: 56, tipo: "V" },
    { id: "Ob", x: 64, y: 42, tipo: "O" },
    { id: "V2", x: 75, y: 56, tipo: "V" },
    { id: "Ot3", x: 88, y: 45, tipo: "O", ambar: true },
    { id: "Ot4", x: 86, y: 68, tipo: "O" },
  ],
  ligacoes: [
    ["Ot1", "V1"],
    ["Ot2", "V1"],
    ["V1", "Ob"],
    ["Ob", "V2"],
    ["V2", "Ot3"],
    ["V2", "Ot4"],
  ],
  sinal: ["Ot2", "V1", "Ob", "V2", "Ot3"],
};

const MONOGRAMA_C1A: Desenho = {
  nuvem: NUVEM_C1,
  nos: [
    { id: "TL", x: 42, y: 38, tipo: "O" },
    { id: "V1", x: 53, y: 54, tipo: "V" },
    { id: "BC", x: 64, y: 70, tipo: "O" },
    { id: "V2", x: 75, y: 54, tipo: "V" },
    { id: "TR", x: 86, y: 38, tipo: "O", ambar: true },
  ],
  // O V principal (M42 38 L64 70 L86 38) passa pelos cinco nós.
  ligacoes: [
    ["TL", "V1"],
    ["V1", "BC"],
    ["BC", "V2"],
    ["V2", "TR"],
  ],
  ramos: [
    [53, 54, 40, 62],
    [75, 54, 88, 62],
  ],
  sinal: ["TL", "V1", "BC", "V2", "TR"],
};

const CEREBRO_C1B: Desenho = {
  nuvem: NUVEM_C1B,
  extra: "M64 31.28 L64 40",
  nos: [
    { id: "Ot1", x: 38, y: 48, tipo: "O" },
    { id: "Ot2", x: 40, y: 68, tipo: "O" },
    { id: "V1", x: 51, y: 58, tipo: "V" },
    { id: "Ob", x: 64, y: 50, tipo: "O" },
    { id: "V2", x: 77, y: 58, tipo: "V" },
    { id: "Ot3", x: 90, y: 48, tipo: "O", ambar: true },
    { id: "Ot4", x: 88, y: 68, tipo: "O" },
  ],
  ligacoes: MOLECULA_C1.ligacoes,
  sinal: MOLECULA_C1.sinal,
};

/**
 * C1d: a molécula do C1 virada de cabeça para baixo, para a cadeia
 * Ot2–V1–Ob–V2–Ot4 desenhar um V (proposta do Dyones, escolhida em 09/10). Mesmos 7 nós e
 * 6 ligações; V1 e V2 descem uma unidade para os cinco nós do V ficarem em
 * linha reta. O âmbar vai para a ponta de cima à direita, onde o sinal
 * termina. `tests/marca.test.ts` confere que tudo cabe na nuvem.
 */
const MOLECULA_EM_V_C1D: Desenho = {
  nuvem: NUVEM_C1,
  nos: [
    { id: "Ot1", x: 40, y: 65, tipo: "O" },
    { id: "Ot2", x: 42, y: 42, tipo: "O" },
    { id: "V1", x: 53, y: 55, tipo: "V" },
    { id: "Ob", x: 64, y: 68, tipo: "O" },
    { id: "V2", x: 75, y: 55, tipo: "V" },
    { id: "Ot3", x: 88, y: 65, tipo: "O" },
    { id: "Ot4", x: 86, y: 42, tipo: "O", ambar: true },
  ],
  ligacoes: MOLECULA_C1.ligacoes,
  sinal: ["Ot2", "V1", "Ob", "V2", "Ot4"],
};

export const DESENHOS: Record<VarianteDoSimbolo, Desenho> = {
  C1: MOLECULA_C1,
  C1a: MONOGRAMA_C1A,
  C1b: CEREBRO_C1B,
  C1c: MOLECULA_C1,
  C1d: MOLECULA_EM_V_C1D,
};

/**
 * A molécula das partículas do hero segue o símbolo escolhido, para o logo e
 * o hero serem o mesmo desenho. O monograma C1a não é molécula: usa a do C1.
 */
export function moleculaDoHero(variante: VarianteDoSimbolo): Desenho {
  return variante === "C1a" ? MOLECULA_C1 : DESENHOS[variante];
}

export const MOLECULA = moleculaDoHero(SIMBOLO_ATUAL);

export const RAIO = { V: 6.5, O: 4.5 } as const;

/**
 * Folga em volta do desenho no hero, em fração da caixa. O SVG estático e o
 * canvas usam a mesma, para a troca entre os dois não mexer no desenho.
 */
export const MARGEM_DO_HERO = 0.06;
