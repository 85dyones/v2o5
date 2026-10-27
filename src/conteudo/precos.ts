/**
 * Formatação de preço e os nomes das capacidades. Desde 27/10/2026 os preços
 * moram em `ofertas.ts` (Branding, Presença, Sites e continuidade) e em
 * `sprint.ts` (Sprint). O cardápio de 15/10 (planos Presença, Atendimento e
 * Completo, tráfego, módulos e serviços) saiu do código; o registro dele está
 * em `memory/context/oferta.md`, "Histórico".
 */

/** "R$ 7.900"; com centavos só quando houver ("R$ 49,90"). */
export const BRL = (n: number) => {
  const [inteiro, centavos] = n.toFixed(2).split(".");
  const milhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return Number.isInteger(n) ? `R$ ${milhar}` : `R$ ${milhar},${centavos}`;
};

/** "31/12/2026" a partir de "2026-12-31". */
export const dataBR = (iso: string) => iso.split("-").reverse().join("/");

export interface Preco {
  valor: number;
  /** "a partir de": o pacote de topo, cujo preço cresce com o escopo. */
  aPartirDe?: boolean;
}

/** "R$ 2.400" ou "a partir de R$ 7.900". */
export const precoEmTexto = (p: Preco) => (p.aPartirDe ? `a partir de ${BRL(p.valor)}` : BRL(p.valor));

/** "R$ 290/mês". */
export const mensalEmTexto = (valor: number) => `${BRL(valor)}/mês`;

/** As duas metades do H1 de 09/10, que ainda agrupam as páginas de recurso. */
export type Pilar = "mapa" | "operacao";

/**
 * O nome de cada capacidade, das páginas de recurso e das soluções. Nenhuma
 * tem preço próprio: o preço é o do pacote da solução (`ofertas.ts`) ou do
 * Sprint em que a capacidade entra.
 */
export const CAPACIDADES: Record<string, { nome: string }> = {
  sites: { nome: "Sites & Integrações" },
  rastreamento: { nome: "Rastreamento até a venda" },
  googleAds: { nome: "Google Ads" },
  metaAds: { nome: "Meta Ads" },
  trafego: { nome: "Google Ads e Meta Ads juntos" },
  catalogo: { nome: "Anúncios de catálogo" },
  redes: { nome: "Conteúdo e redes sociais" },
  avaliacoes: { nome: "Avaliações no Google" },
  agente: { nome: "Agente de IA no WhatsApp" },
  crm: { nome: "CRM e sistemas sob medida" },
  painel: { nome: "Painel do dono" },
  automacao: { nome: "Automação de processos" },
  posvenda: { nome: "Pós-venda e recorrência" },
  reativacao: { nome: "Reativação de base" },
  diagnostico: { nome: "Diagnóstico e análise de operação" },
  consultoria: { nome: "Consultoria de processos" },
  dados: { nome: "Indicadores e painéis" },
  branding: { nome: "Branding & Identidade" },
  presenca: { nome: "Presença Digital Local" },
  sprint: { nome: "Sprint de Eficiência" },
};

export function capacidade(id: string): { nome: string } {
  const c = CAPACIDADES[id];
  if (!c) throw new Error(`Capacidade sem nome: ${id}`);
  return c;
}
