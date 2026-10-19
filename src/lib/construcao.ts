/**
 * A construção do símbolo C1d (19/10, referência brand.dropbox.com/logo): a
 * nuvem é feita de quatro arcos de círculo, e cada arco de `NUVEM_C1` mora
 * num destes círculos. `tests/construcao.test.ts` confere que as pontas dos
 * arcos caem em cima deles. O fecho, o rodapé e /sobre desenham a partir daqui.
 */
export const CIRCULOS_DA_NUVEM = [
  { x: 30, y: 62, r: 18 },
  { x: 52, y: 42, r: 24 },
  { x: 80, y: 40, r: 20 },
  { x: 98, y: 62, r: 18 },
] as const;

/** As cotas que o desenho mostra: o raio de cada átomo, no vetor grande. */
export const COTAS_DOS_ATOMOS = { V: "6,8", O: "4,8" } as const;
