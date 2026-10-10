/**
 * A tabela de preços, em número e num lugar só. É o que a home, a página
 * `/precos`, o `llms.txt` e o schema mostram; `memory/context/oferta.md`
 * repete os mesmos valores e `tests/precos.test.ts` confere os dois lados.
 *
 * Regra de 10/10 (Dyones): nenhuma mensalidade abaixo de R$ 590, porque ela
 * cobre hospedagem e manutenção. O uso do modelo de IA e as mensagens da
 * API oficial do WhatsApp continuam fora, pelo valor real, na mesma fatura.
 */

export const PISO_DA_MENSALIDADE = 590;

export interface LinhaDePreco {
  id: string;
  nome: string;
  href: string;
  /** Implantação, "a partir de". Ausente quando a linha não tem implantação. */
  implantacao?: number;
  /** Mensalidade, "a partir de". Ausente quando a linha é cobrada por unidade. */
  mensalidade?: number;
  /** "por fluxo", "por projeto": a implantação é por unidade, sem mensalidade. */
  unidade?: string;
  /** Verba de mídia por fora, paga direto ao Google e à Meta. */
  maisVerba?: boolean;
  /** Por que não tem implantação (tráfego: só com o rastreamento ativo). */
  semImplantacao?: string;
  /** O que a mensalidade (ou a implantação por unidade) cobre. */
  cobre: string;
}

export const LINHAS_DE_PRECO: LinhaDePreco[] = [
  {
    id: "sites",
    nome: "Sites e presença",
    href: "/criacao-de-sites",
    implantacao: 7900,
    mensalidade: 590,
    cobre:
      "Hospedagem, manutenção, atualizações de segurança, SEO técnico contínuo, Perfil da Empresa no Google e relatório mensal.",
  },
  {
    id: "agente",
    nome: "Agente de IA no WhatsApp",
    href: "/agente-de-ia-para-whatsapp",
    implantacao: 3900,
    mensalidade: 790,
    cobre: "Agente no ar, ajustes de roteiro e da base de conhecimento, passagem para a equipe e suporte.",
  },
  {
    id: "crm",
    nome: "CRM e sistemas sob medida",
    href: "/crm-com-whatsapp",
    implantacao: 4900,
    mensalidade: 590,
    cobre: "Painel, funil, régua de alertas, usuários da equipe, hospedagem e suporte.",
  },
  {
    id: "rastreamento",
    nome: "Rastreamento até a venda",
    href: "/rastreamento-de-conversoes",
    implantacao: 2900,
    mensalidade: 590,
    cobre:
      "Tags e API de Conversões em dia, conferência mensal da qualidade do dado e relatório de origem das vendas.",
  },
  {
    id: "trafego",
    nome: "Tráfego pago no Google e na Meta",
    href: "/gestao-de-trafego",
    mensalidade: 1800,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre: "Campanhas no Google Ads e na Meta ajustadas pela venda registrada no CRM, com relatório mensal.",
  },
  {
    id: "automacao",
    nome: "Automação de processos",
    href: "/automacao-com-ia",
    implantacao: 1900,
    unidade: "por fluxo",
    cobre: "Um fluxo no n8n entregue, testado e documentado. A manutenção entra na mensalidade do CRM ou do site.",
  },
  {
    id: "branding",
    nome: "Branding e gestão de marca",
    href: "/diagnostico",
    implantacao: 1500,
    unidade: "por projeto",
    cobre: "Posicionamento, identidade visual, tom de voz e o guia da marca.",
  },
];

/** O pacote do segmento automotivo (o sistema da Motors Store). */
export const AUTOMOTIVO_PRECO = {
  siteDeEstoque: { implantacao: 7900, mensalidade: 590 },
  /** Site de estoque, agente de IA, CRM, rastreamento e integração com o Revenda Mais. */
  pacote: { implantacao: 14900, mensalidade: 1990, linhas: ["sites", "agente", "crm", "rastreamento"] },
  /** O tráfego entra no pacote por menos que avulso. */
  trafegoNoPacote: 1300,
};

export const REGRAS = {
  parcelas: 6,
  diasParaEntregarNaSaida: 15,
  /** Referência do plano de mídia da Motors (plano, seção 3.3). */
  margemPorCarro: 7000,
};

export const BRL = (n: number) => `R$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

export function linhaDePreco(id: string): LinhaDePreco {
  const l = LINHAS_DE_PRECO.find((x) => x.id === id);
  if (!l) throw new Error(`Linha sem preço: ${id}`);
  return l;
}

/** "a partir de R$ 7.900 + R$ 590/mês", como aparece nos cartões. */
export function precoDa(id: string): string {
  const l = linhaDePreco(id);
  const partes: string[] = [];
  if (l.implantacao) partes.push(`${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`);
  if (l.mensalidade) partes.push(`${BRL(l.mensalidade)}/mês${l.maisVerba ? " + verba" : ""}`);
  return `a partir de ${partes.join(" + ")}`;
}

/** Soma das linhas avulsas que o pacote automotivo junta. */
export function somaDoPacote() {
  const linhas = AUTOMOTIVO_PRECO.pacote.linhas.map(linhaDePreco);
  return {
    implantacao: linhas.reduce((s, l) => s + (l.implantacao ?? 0), 0),
    mensalidade: linhas.reduce((s, l) => s + (l.mensalidade ?? 0), 0),
  };
}

/** Desconto do pacote sobre a soma das linhas, em porcentagem inteira. */
export function descontoDoPacote() {
  const soma = somaDoPacote();
  const { pacote } = AUTOMOTIVO_PRECO;
  return {
    implantacao: Math.round((1 - pacote.implantacao / soma.implantacao) * 100),
    mensalidade: Math.round((1 - pacote.mensalidade / soma.mensalidade) * 100),
  };
}

/** Pacote completo com tráfego, por mês, sem a verba. */
export const mensalidadeDoPacoteComTrafego = () =>
  AUTOMOTIVO_PRECO.pacote.mensalidade + AUTOMOTIVO_PRECO.trafegoNoPacote;

/** Com a margem de referência, em quantos meses uma venda a mais paga o pacote. */
export const mesesQueUmaVendaPaga = () =>
  Math.floor(REGRAS.margemPorCarro / AUTOMOTIVO_PRECO.pacote.mensalidade);
