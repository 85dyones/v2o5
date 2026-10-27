/**
 * O modelo de um guia da V2O5 (`docs/plano-de-conteudo.md`), do método da
 * Motors: H1 igual à busca (até 60 caracteres), resposta em duas frases no
 * primeiro parágrafo, três a seis perguntas como H2, FAQ de três ou quatro
 * perguntas (a mesma do schema), uma única saída comercial e fonte para todo
 * número. `lib/guias.ts` valida e `tests/guias.test.ts` trava.
 */
export type IdDoCluster = "atendimento" | "rastreamento" | "processo" | "sites" | "revendas";

export const CLUSTERS: Record<IdDoCluster, string> = {
  atendimento: "Atendimento e WhatsApp",
  rastreamento: "Rastreamento e venda",
  processo: "Processo e automação",
  sites: "Sites e busca",
  revendas: "Revendas de veículos",
};

/** As únicas páginas para onde um guia pode levar: a porta de entrada e as páginas de capacidade. */
export const SAIDAS_PERMITIDAS = [
  "/diagnostico",
  "/agente-de-ia-para-whatsapp",
  "/automacao-com-ia",
  "/criacao-de-sites",
  "/crm-com-whatsapp",
  "/rastreamento-de-conversoes",
  "/segmentos/revendas-de-veiculos",
] as const;

export interface TabelaDoGuia {
  legenda: string;
  cabecalho: string[];
  linhas: string[][];
}

export interface SecaoDoGuia {
  /** Uma sub-pergunta real, que vira o H2. */
  pergunta: string;
  paragrafos: string[];
  tabela?: TabelaDoGuia;
}

export interface FonteDoGuia {
  rotulo: string;
  /** Endereço da fonte (interno começa com `/`). Número lido de cliente leva `periodo`. */
  url?: string;
  periodo?: string;
}

export interface Guia {
  slug: string;
  cluster: IdDoCluster;
  /** O H1, igual à busca, até 60 caracteres. */
  titulo: string;
  /** A meta description, de 40 a 160 caracteres. */
  descricao: string;
  /** O primeiro parágrafo: a resposta em duas frases. */
  resposta: string;
  secoes: SecaoDoGuia[];
  faq: { pergunta: string; resposta: string }[];
  /** A única saída comercial do guia, no bloco final. */
  saida: { href: (typeof SAIDAS_PERMITIDAS)[number]; titulo: string; texto: string; botao: string };
  fontes: FonteDoGuia[];
  /** Slugs de outros guias, mostrados no fim. */
  relacionados: string[];
  publicadoEm: string;
  atualizadaEm: string;
  /** Rascunho não entra no sitemap, no índice nem no ar (só na prévia, com `PREVIA_DE_GUIAS=1`). */
  estado: "rascunho" | "publicado";
}
