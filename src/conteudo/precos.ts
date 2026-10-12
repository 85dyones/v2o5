/**
 * A tabela de preços, em número e num lugar só. É o que a home, a página
 * `/precos`, o hub automotivo, o `llms.txt` e o schema mostram;
 * `memory/context/oferta.md` repete os mesmos valores e
 * `tests/precos.test.ts` confere os dois lados.
 *
 * Regra de 10/10 (Dyones): nenhuma mensalidade abaixo de R$ 590, porque ela
 * cobre hospedagem e manutenção. O uso do modelo de IA e as mensagens da
 * API oficial do WhatsApp continuam fora, pelo valor real, na mesma fatura.
 *
 * Regra de 12/10 (Dyones): o que cresce com o cliente tem preço publicado,
 * para a margem não cair: usuário extra, dados e infra (`DEGRAUS`). CRM e
 * Painel do dono sobem para R$ 790 porque cada um ganha banco próprio.
 * Tráfego vira Google Ads e Meta Ads, avulsos ou juntos com bônus.
 */

export const PISO_DA_MENSALIDADE = 590;

export type Pilar = "mapa" | "operacao";

export interface Degrau {
  /** "Usuário extra", "Cada 500 conversas a mais". */
  rotulo: string;
  valor: number;
  /** "/mês", "por fonte", "por canal". */
  unidade: string;
}

export interface LinhaDePreco {
  id: string;
  nome: string;
  href: string;
  pilar: Pilar;
  /** Implantação, "a partir de". Ausente quando a linha não tem implantação. */
  implantacao?: number;
  /** Mensalidade, "a partir de". Ausente quando a linha é cobrada por unidade. */
  mensalidade?: number;
  /** "por fluxo", "por projeto", "por campanha": a implantação é por unidade, sem mensalidade. */
  unidade?: string;
  /** Verba de mídia por fora, paga direto ao Google e à Meta. */
  maisVerba?: boolean;
  /** Por que não tem implantação (tráfego: só com o rastreamento ativo). */
  semImplantacao?: string;
  /** O que a mensalidade (ou a implantação por unidade) cobre. */
  cobre: string;
  /** O que já vem dentro ("5 usuários", "3 fontes de dados"). */
  inclui?: string[];
  /** O que cresce com o cliente e tem preço publicado. */
  degraus?: Degrau[];
  /** Custos repassados pelo valor real, na mesma fatura. */
  repasses?: string[];
  /** Vantagem de contratar junto (tráfego: feed de catálogo incluso). */
  bonus?: string;
}

/** O que cresce com o cliente. Vale para CRM, Painel do dono e pacote automotivo. */
export const DEGRAUS = {
  usuarioExtra: 89,
  conversas: { bloco: 500, valor: 190 },
  dados: { limite: "20 mil contatos ou 8 GB", valor: 190 },
  fonteExtra: { implantacao: 1900, mensalidade: 190 },
  infraAcima: { limite: "8 GB ou 1 milhão de linhas", gestao: 20 },
};

/** Reajuste da mensalidade: índice anual e gatilho de repasse cambial. */
export const REAJUSTE = { indice: "IPCA", gatilhoCambial: 10 };

export const LINHAS_DE_PRECO: LinhaDePreco[] = [
  {
    id: "sites",
    nome: "Sites e presença",
    href: "/criacao-de-sites",
    pilar: "mapa",
    implantacao: 7900,
    mensalidade: 590,
    cobre:
      "Hospedagem, manutenção, atualizações de segurança, SEO técnico contínuo, Perfil da Empresa no Google e relatório mensal.",
  },
  {
    id: "rastreamento",
    nome: "Rastreamento até a venda",
    href: "/rastreamento-de-conversoes",
    pilar: "mapa",
    implantacao: 2900,
    mensalidade: 590,
    cobre:
      "Tags e API de Conversões em dia, conferência mensal da qualidade do dado e relatório de origem das vendas.",
  },
  {
    id: "googleAds",
    nome: "Google Ads",
    href: "/gestao-de-trafego",
    pilar: "mapa",
    mensalidade: 1200,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre:
      "Pesquisa, Performance Max e anúncios de veículos ou Shopping quando couber, ajustados pela venda registrada no CRM. Relatório mensal.",
  },
  {
    id: "metaAds",
    nome: "Meta Ads",
    href: "/gestao-de-trafego",
    pilar: "mapa",
    mensalidade: 1200,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre:
      "Instagram e Facebook com o catálogo de veículos ou produtos, públicos da base do CRM e API de Conversões. Relatório mensal.",
  },
  {
    id: "trafego",
    nome: "Google Ads e Meta Ads juntos",
    href: "/gestao-de-trafego",
    pilar: "mapa",
    mensalidade: 1990,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre: "As duas plataformas pela mesma equipe, com a verba movida para onde a venda aparece.",
    bonus: "Feed de catálogo incluso (avulso, R$ 1.900).",
  },
  {
    id: "catalogo",
    nome: "Anúncios de catálogo",
    href: "/gestao-de-trafego",
    pilar: "mapa",
    implantacao: 1900,
    unidade: "por feed",
    cobre:
      "Feed do estoque ou dos produtos no padrão do Google (anúncios de veículos e Shopping) e da Meta, atualizado quando o estoque muda. Incluso na contratação de Google Ads e Meta Ads juntos.",
  },
  {
    id: "redes",
    nome: "Conteúdo e redes com IA",
    href: "/diagnostico",
    pilar: "mapa",
    implantacao: 1500,
    mensalidade: 1290,
    cobre:
      "Perfis configurados, calendário e 12 publicações por mês montadas do que a empresa já produz, cada uma com link rastreado, e relatório mensal. Produção de foto, vídeo e peças à parte.",
    inclui: ["12 publicações por mês", "2 redes"],
  },
  {
    id: "avaliacoes",
    nome: "Avaliações no Google",
    href: "/diagnostico",
    pilar: "mapa",
    implantacao: 1900,
    unidade: "por fluxo",
    cobre:
      "Pedido de avaliação no WhatsApp depois da venda, com o link certo e o acompanhamento no painel. A manutenção entra na mensalidade do CRM ou do site.",
  },
  {
    id: "branding",
    nome: "Branding e gestão de marca",
    href: "/diagnostico",
    pilar: "mapa",
    implantacao: 1500,
    unidade: "por projeto",
    cobre: "Posicionamento, identidade visual, tom de voz e o guia da marca.",
  },
  {
    id: "agente",
    nome: "Agente de IA no WhatsApp",
    href: "/agente-de-ia-para-whatsapp",
    pilar: "operacao",
    implantacao: 3900,
    mensalidade: 790,
    cobre: "Agente no ar, ajustes de roteiro e da base de conhecimento, passagem para a equipe e suporte.",
    inclui: [`${DEGRAUS.conversas.bloco} conversas por mês`],
    degraus: [{ rotulo: `Cada ${DEGRAUS.conversas.bloco} conversas a mais`, valor: DEGRAUS.conversas.valor, unidade: "/mês" }],
    repasses: ["Uso do modelo de IA", "Mensagens da API oficial do WhatsApp"],
  },
  {
    id: "crm",
    nome: "CRM e sistemas sob medida",
    href: "/crm-com-whatsapp",
    pilar: "operacao",
    implantacao: 4900,
    mensalidade: 790,
    cobre: "Painel, funil, régua de alertas, banco de dados próprio, backups, hospedagem e suporte.",
    inclui: ["5 usuários", `Até ${DEGRAUS.dados.limite} de dados`],
    degraus: [
      { rotulo: "Usuário extra", valor: DEGRAUS.usuarioExtra, unidade: "/mês" },
      { rotulo: `Acima de ${DEGRAUS.dados.limite}`, valor: DEGRAUS.dados.valor, unidade: "/mês" },
    ],
  },
  {
    id: "painel",
    nome: "Painel do dono",
    href: "/diagnostico",
    pilar: "operacao",
    implantacao: 4900,
    mensalidade: 790,
    cobre:
      "Funil, verba, custo por lead e vendas por origem numa tela, atualizada todo dia a partir do CRM e do rastreamento. Banco próprio, backups, hospedagem e suporte. Sem licença por usuário.",
    inclui: ["3 usuários", "3 fontes de dados", `Até ${DEGRAUS.infraAcima.limite}`],
    degraus: [
      { rotulo: "Usuário extra", valor: DEGRAUS.usuarioExtra, unidade: "/mês" },
      { rotulo: "Fonte de dados extra", valor: DEGRAUS.fonteExtra.implantacao, unidade: `de implantação + R$ ${DEGRAUS.fonteExtra.mensalidade}/mês` },
    ],
    repasses: [`Acima de ${DEGRAUS.infraAcima.limite}, a infra pelo valor real mais ${DEGRAUS.infraAcima.gestao}% de gestão`],
  },
  {
    id: "automacao",
    nome: "Automação de processos",
    href: "/automacao-com-ia",
    pilar: "operacao",
    implantacao: 1900,
    unidade: "por fluxo",
    cobre: "Um fluxo no n8n entregue, testado e documentado. A manutenção entra na mensalidade do CRM ou do site.",
  },
  {
    id: "posvenda",
    nome: "Pós-venda e recorrência",
    href: "/diagnostico",
    pilar: "operacao",
    implantacao: 1900,
    unidade: "por fluxo",
    cobre:
      "Régua de retorno no n8n (revisão, troca, seguro, recompra) pelo WhatsApp, ligada ao CRM. A manutenção entra na mensalidade do CRM.",
  },
  {
    id: "reativacao",
    nome: "Reativação de base",
    href: "/diagnostico",
    pilar: "operacao",
    implantacao: 1900,
    unidade: "por campanha",
    cobre:
      "Extração dos dados, formatação e higienização da base própria, segmentação, roteiro em duas variantes, cadência e relatório de retorno no CRM.",
    inclui: ["Até 5 mil contatos", "1 canal"],
    degraus: [
      { rotulo: "Canal extra", valor: 490, unidade: "por campanha" },
      { rotulo: "Cada 5 mil contatos a mais", valor: 290, unidade: "por campanha" },
      { rotulo: "Campanha recorrente, depois da primeira", valor: 990, unidade: "/mês" },
      { rotulo: "Número dedicado no WhatsApp não oficial", valor: 290, unidade: "por número/mês" },
    ],
    repasses: ["Mensagens da API oficial do WhatsApp", "SMS, pelo valor da operadora", "Chip do número dedicado"],
  },
];

/**
 * Os canais da reativação de base e o que cada um custa e arrisca. Sem tarifa
 * em número: a da Meta e a das operadoras mudam e são repassadas pelo valor
 * cobrado. Os limites de envio da API oficial são definidos pela Meta pela
 * qualidade do número.
 */
export const CANAIS_DA_REATIVACAO = [
  {
    nome: "WhatsApp pela API oficial",
    recomendado: true,
    paga: "A tarifa da Meta por mensagem de marketing entregue, repassada pelo valor cobrado, sem acréscimo.",
    regras:
      "Modelo de mensagem aprovado pela Meta, saída fácil em toda mensagem e limite diário de envios que cresce com a qualidade do número.",
    risco: "Baixo. Bloqueios e denúncias em excesso reduzem o limite e podem suspender o número por um período.",
  },
  {
    nome: "WhatsApp por número não oficial",
    recomendado: false,
    paga: `R$ 290 por número/mês de operação (instância, aquecimento, monitoramento) e o chip. Sem tarifa por mensagem.`,
    regras:
      "Número exclusivo da campanha, nunca o número principal da empresa; aquecimento de uma a duas semanas; centenas de mensagens por dia, no máximo; termo de aceite assinado.",
    risco: "Alto. A Meta pode bloquear o número de forma permanente na primeira ocorrência grave, sem suporte.",
  },
  {
    nome: "SMS",
    recomendado: false,
    paga: "O valor da operadora por mensagem, pré-pago, repassado sem acréscimo.",
    regras: "Texto curto com o nome da empresa e a saída fácil. Serve para quem não tem WhatsApp ou para o lembrete.",
    risco: "Baixo. Entrega sem garantia de leitura.",
  },
];

/** O pacote do segmento automotivo (o sistema da Motors Store). */
export const AUTOMOTIVO_PRECO = {
  siteDeEstoque: { implantacao: 7900, mensalidade: 590 },
  /** Site de estoque, agente de IA, CRM, rastreamento e integração com o Revenda Mais. */
  pacote: { implantacao: 14900, mensalidade: 1990, usuarios: 5, linhas: ["sites", "agente", "crm", "rastreamento"] },
  /** As duas plataformas de tráfego entram no pacote por menos que avulsas. */
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

export const linhasDoPilar = (pilar: Pilar) => LINHAS_DE_PRECO.filter((l) => l.pilar === pilar);

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

/** Quanto Google Ads e Meta Ads juntos economizam frente aos dois avulsos. */
export const economiaDoTrafegoJunto = () =>
  (linhaDePreco("googleAds").mensalidade ?? 0) + (linhaDePreco("metaAds").mensalidade ?? 0) - (linhaDePreco("trafego").mensalidade ?? 0);
