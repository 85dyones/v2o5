// Vetoriza o símbolo C1d: a rede da molécula (ligações + átomos) vira UMA
// forma, sem peças sobrepostas, e o átomo âmbar fica separado por um respiro.
// Saída: src/lib/marca-vetor.ts (gerado; não editar à mão).
//
// Duas espessuras ópticas: "grande" (hero, 64 px ou mais) e "pequeno" (topo,
// 20 a 48 px), com traços mais grossos para continuar legível.
//
// Uso: node scripts/vetorizar-logo.mjs   (tests/marca-vetor.test.ts confere
// que o arquivo gerado bate com a geometria de src/lib/marca.ts)
import { writeFileSync } from "node:fs";
import Module from "node:module";

// O paper usa o jsdom quando ele existe (está nas dependências de teste) e aí
// exige o pacote nativo `canvas`. Sem jsdom, ele roda só com geometria, que é
// tudo o que este script precisa.
const resolverOriginal = Module._resolveFilename;
Module._resolveFilename = function (pedido, ...resto) {
  if (pedido === "jsdom") throw new Error("jsdom desligado para o paper");
  return resolverOriginal.call(this, pedido, ...resto);
};
const { default: paper } = await import("paper/dist/paper-core.js");
Module._resolveFilename = resolverOriginal;

paper.setup(new paper.Size(200, 200));

/** Nós e ligações da C1d (copiados de src/lib/marca.ts; o teste confere). */
export const NOS = {
  Ot1: [40, 65, "O"],
  Ot2: [42, 42, "O"],
  V1: [53, 55, "V"],
  Ob: [64, 68, "O"],
  V2: [75, 55, "V"],
  Ot3: [88, 65, "O"],
  Ot4: [86, 42, "O"],
};
export const LIGACOES = [
  ["Ot1", "V1"],
  ["Ot2", "V1"],
  ["V1", "Ob"],
  ["Ob", "V2"],
  ["V2", "Ot3"],
  ["V2", "Ot4"],
];
export const AMBAR = "Ot4";

/**
 * Espessuras ópticas. `escala` aumenta a molécula em volta do centro (64, 55)
 * para ela ocupar melhor a nuvem; `ramos: false` tira Ot1 e Ot3 no tamanho
 * pequeno, onde só a cadeia em V continua nítida.
 */
export const ESPESSURAS = {
  grande: { V: 6.8, O: 4.8, ligacao: 3.8, nuvem: 5, respiro: 1.8, escala: 1.12, ramos: true },
  pequeno: { V: 7.6, O: 5.5, ligacao: 5.2, nuvem: 6.5, respiro: 2.3, escala: 1.05, ramos: false },
};

export const CENTRO = [64, 55];

const NUVEM =
  "M30 80 A18 18 0 0 1 28.09 44.1 A24 24 0 0 1 67.93 24.05 A20 20 0 0 1 99.58 44.07 A18 18 0 0 1 98 80 Z";

/** Posição de um nó na espessura dada (escala em volta do centro). */
export function posicao(id, esp) {
  const [x, y] = NOS[id];
  return [CENTRO[0] + (x - CENTRO[0]) * esp.escala, CENTRO[1] + (y - CENTRO[1]) * esp.escala];
}

/** Cápsula (retângulo com pontas redondas) entre dois pontos. */
function capsula(a, b, largura) {
  const d = b.subtract(a);
  const n = new paper.Point(-d.y, d.x).normalize(largura / 2);
  const caminho = new paper.Path();
  caminho.moveTo(a.add(n));
  caminho.lineTo(b.add(n));
  caminho.arcTo(b.add(d.normalize(largura / 2)), b.subtract(n));
  caminho.lineTo(a.subtract(n));
  caminho.arcTo(a.subtract(d.normalize(largura / 2)), a.add(n));
  caminho.closePath();
  return caminho;
}

function arredondar(d) {
  return d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 100) / 100));
}

const RAMOS = new Set(["Ot1", "Ot3"]);

export function vetorizar(esp) {
  const ponto = (id) => new paper.Point(...posicao(id, esp));
  const usa = (id) => esp.ramos || !RAMOS.has(id);
  let rede = null;
  const juntar = (forma) => {
    rede = rede ? rede.unite(forma) : forma;
  };
  for (const [a, b] of LIGACOES) if (usa(a) && usa(b)) juntar(capsula(ponto(a), ponto(b), esp.ligacao));
  for (const [id, [, , tipo]] of Object.entries(NOS)) {
    if (id !== AMBAR && usa(id)) juntar(new paper.Path.Circle(ponto(id), esp[tipo]));
  }
  // O respiro: a rede perde um anel em volta do átomo âmbar.
  const [ax, ay] = posicao(AMBAR, esp);
  const ar = esp[NOS[AMBAR][2]];
  rede = rede.subtract(new paper.Path.Circle(new paper.Point(ax, ay), ar + esp.respiro));
  const r2 = (n) => Math.round(n * 100) / 100;
  return {
    nuvem: NUVEM,
    tracoDaNuvem: esp.nuvem,
    rede: arredondar(rede.pathData),
    ambar: { cx: r2(ax), cy: r2(ay), r: ar },
    nos: Object.fromEntries(
      Object.keys(NOS).filter(usa).map((id) => [id, { x: r2(posicao(id, esp)[0]), y: r2(posicao(id, esp)[1]), r: esp[NOS[id][2]] }]),
    ),
  };
}

const saida = {
  grande: vetorizar(ESPESSURAS.grande),
  pequeno: vetorizar(ESPESSURAS.pequeno),
};

if (process.argv[1] && process.argv[1].endsWith("vetorizar-logo.mjs")) {
  const ts = `// Gerado por scripts/vetorizar-logo.mjs. Não editar à mão.
// O símbolo C1d vetorizado: a rede é uma forma só (sem sobreposição) e o
// átomo âmbar fica separado por um respiro.

export interface SimboloVetorizado {
  nuvem: string;
  tracoDaNuvem: number;
  rede: string;
  ambar: { cx: number; cy: number; r: number };
  /** Centro e raio de cada átomo desenhado (o canvas do hero usa). */
  nos: Record<string, { x: number; y: number; r: number }>;
}

export const SIMBOLO_C1D: Record<"grande" | "pequeno", SimboloVetorizado> = ${JSON.stringify(saida, null, 2)};
`;
  // Ícone da aba: a versão pequena sobre um quadrado tinta arredondado.
  const p = saida.pequeno;
  const icone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#121418"/>
  <g transform="translate(2.56 10.46) scale(0.46)">
    <path d="${p.nuvem}" fill="none" stroke="#F2F1EC" stroke-width="${p.tracoDaNuvem}" stroke-linejoin="round"/>
    <path d="${p.rede}" fill="#F2F1EC"/>
    <circle cx="${p.ambar.cx}" cy="${p.ambar.cy}" r="${p.ambar.r}" fill="#F2A516"/>
  </g>
</svg>
`;
  if (!process.argv.includes("--saida")) writeFileSync(new URL("../src/app/icon.svg", import.meta.url), icone);
  const indice = process.argv.indexOf("--saida");
  const destino = indice > 0 ? process.argv[indice + 1] : new URL("../src/lib/marca-vetor.ts", import.meta.url);
  writeFileSync(destino, ts);
  console.log(`${destino} gerado`);
}
