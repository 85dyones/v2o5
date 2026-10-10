/**
 * Cores da marca, na forma que o código e os testes leem.
 *
 * A fonte é a tabela de `memory/context/marca.md`. O CSS repete estes valores
 * em `src/app/globals.css` (o Tailwind precisa deles como literais no
 * `@theme`), e `tests/contraste.test.ts` confere que os dois lugares dizem a
 * mesma coisa e que cada par de uso passa no AA.
 *
 * As três cores de etapa (violeta, verde, azul) ficam em 2,9:1 a 3,3:1 sobre
 * a tinta: servem de preenchimento com texto claro por cima, nunca de texto
 * sobre o fundo escuro. Para texto e traço sobre a tinta existem as versões
 * `-claro`, derivadas aqui e travadas pelo mesmo teste.
 */
export const CORES = {
  tinta: "#121418",
  papel: "#F2F1EC",
  grafite: "#2A2D34",
  superficie: "#1A1D22",
  secundarioEscuro: "#A9ACB4",
  secundarioClaro: "#5A5D66",
  ambar: "#F2A516",
  ambarForte: "#FFB937",
  ambarTexto: "#8A5600",
  violeta: "#6B46C8",
  verde: "#17773F",
  azul: "#2457C5",
  violetaClaro: "#9B8BE0",
  verdeClaro: "#5CC48A",
  azulClaro: "#7FA3F0",
  regua: "#D6D4CC",
} as const;

export type NomeDaCor = keyof typeof CORES;

/** Ordem das etapas do lead: atração → atendimento → CRM → venda. */
export const ETAPAS = ["violeta", "verde", "azul", "ambar"] as const;
export type Etapa = (typeof ETAPAS)[number];
