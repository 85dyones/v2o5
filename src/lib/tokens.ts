/**
 * O sistema visual do redesign 2026, na forma que o código e os testes leem.
 *
 * A fonte é `design/DESIGN.md` (front matter e tabelas), que parte da tabela
 * de `memory/context/marca.md`. O CSS repete estes valores no `@theme` e no
 * `:root` de `src/app/globals.css` (o Tailwind precisa deles como literais),
 * e `tests/contraste.test.ts` confere que os três lugares dizem a mesma coisa
 * e que cada par de uso passa no AA.
 *
 * Base clara: o papel é o fundo e a tinta é o texto. O âmbar continua sendo a
 * ação, mas sobre o papel fica em 1,83:1, por isso nunca é texto no claro e o
 * botão leva a `acaoBorda`. Violeta, verde e azul servem de texto e de traço
 * sobre o papel nos valores puros da marca; as versões `-claro` saíram junto
 * com a base escura.
 */
export const CORES = {
  fundo: "#F2F1EC",
  fundoCartao: "#FAF9F5",
  fundoAlternado: "#E8E6DF",
  texto: "#121418",
  textoSecundario: "#5A5D66",
  linha: "#D6D4CC",
  linhaCampo: "#7A7972",
  acao: "#F2A516",
  acaoBorda: "#8A5600",
  acaoTexto: "#8A5600",
  etapaAtracao: "#6B46C8",
  etapaAtendimento: "#17773F",
  etapaCrm: "#2457C5",
  faixaEscura: "#121418",
  faixaEscuraTexto: "#F2F1EC",
  faixaEscuraSecundario: "#A9ACB4",
  faixaEscuraLinha: "#2E3138",
  tintaVioleta: "#E0D9F0",
  tintaVerde: "#D3E6D9",
  tintaAzul: "#D5E0F3",
  tintaAmbar: "#F7E2B5",
  erro: "#B3261E",
} as const;

export type NomeDaCor = keyof typeof CORES;

/** Ordem das etapas do lead: atração → atendimento → CRM → venda. */
export const ETAPAS = ["violeta", "verde", "azul", "ambar"] as const;
export type Etapa = (typeof ETAPAS)[number];

/** A cor de cada etapa: as três da marca e o âmbar da ação para a venda. */
export const COR_DA_ETAPA: Record<Etapa, NomeDaCor> = {
  violeta: "etapaAtracao",
  verde: "etapaAtendimento",
  azul: "etapaCrm",
  ambar: "acao",
};

type Estilo = {
  tamanho: string;
  peso: number;
  entrelinha: number;
  espacejamento?: string;
};

/**
 * Escala de terça maior (razão 1,25) sobre o corpo de 17 px, fluida entre
 * 375 e 1440 px de largura. Família: Geist; o `rotulo` é Geist Mono em caixa
 * alta.
 */
export const TIPOGRAFIA = {
  marca: { tamanho: "clamp(4.0625rem, 2.698rem + 5.822vw, 7.9375rem)", peso: 600, entrelinha: 0.9, espacejamento: "-0.05em" },
  numero: { tamanho: "clamp(3.25rem, 2.172rem + 4.601vw, 6.3125rem)", peso: 600, entrelinha: 1, espacejamento: "-0.045em" },
  titulo1: { tamanho: "clamp(2.625rem, 1.767rem + 3.662vw, 5.0625rem)", peso: 600, entrelinha: 1, espacejamento: "-0.045em" },
  titulo2: { tamanho: "clamp(2.0625rem, 1.644rem + 1.784vw, 3.25rem)", peso: 600, entrelinha: 1.05, espacejamento: "-0.04em" },
  destaque: { tamanho: "clamp(1.6875rem, 1.357rem + 1.408vw, 2.625rem)", peso: 500, entrelinha: 1.15, espacejamento: "-0.03em" },
  titulo3: { tamanho: "clamp(1.6875rem, 1.555rem + 0.5634vw, 2.0625rem)", peso: 600, entrelinha: 1.1, espacejamento: "-0.025em" },
  tituloCartao: { tamanho: "1.3125rem", peso: 600, entrelinha: 1.2, espacejamento: "-0.02em" },
  guia: { tamanho: "clamp(1.0625rem, 0.9745rem + 0.3756vw, 1.3125rem)", peso: 400, entrelinha: 1.45 },
  corpo: { tamanho: "1.0625rem", peso: 400, entrelinha: 1.6 },
  legenda: { tamanho: "0.875rem", peso: 400, entrelinha: 1.5 },
  rotulo: { tamanho: "0.75rem", peso: 500, entrelinha: 1.4, espacejamento: "0.08em" },
} as const satisfies Record<string, Estilo>;

export type NomeDoEstilo = keyof typeof TIPOGRAFIA;

/**
 * Ritmo em 4 px. Os passos são os do Tailwind (`--spacing: 0.25rem`, então
 * `p-1` = 4 px e `p-24` = 96 px); os três nomeados são fluidos.
 */
export const PASSOS_DE_ESPACO = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;

export const ESPACOS = {
  secao: "clamp(4rem, 3.296rem + 3.005vw, 6rem)",
  tituloConteudo: "clamp(2rem, 1.648rem + 1.502vw, 3rem)",
  grade: "clamp(1.5rem, 1.324rem + 0.7512vw, 2rem)",
} as const;

/**
 * Curvas e durações. Com `prefers-reduced-motion: reduce`, as quatro durações
 * vão a zero no CSS (tests/movimento.test.tsx).
 */
export const MOVIMENTO = {
  curvaSaida: "cubic-bezier(0.22, 1, 0.36, 1)",
  curvaAbre: "cubic-bezier(0.625, 0.05, 0, 1)",
  curvaPercurso: "cubic-bezier(0.65, 0, 0.35, 1)",
  curvaPadrao: "ease",
  duracaoCurta: "200ms",
  duracaoMedia: "350ms",
  duracaoAbre: "500ms",
  duracaoRevela: "900ms",
} as const;

export type NomeDoMovimento = keyof typeof MOVIMENTO;
