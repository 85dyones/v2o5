/**
 * A tabela de preços, em número e num lugar só. É o que a home, a página
 * `/precos`, o hub automotivo, as páginas de solução, o `llms.txt` e o
 * schema mostram; `memory/context/oferta.md` repete os mesmos valores e
 * `tests/precos.test.ts` confere os dois lados.
 *
 * Cardápio de 15/10/2026 (Dyones): três planos com preço fechado no lugar
 * das quinze linhas avulsas, o tráfego como serviço à parte, módulos para
 * quem já tem o sistema e serviços. Quem chega escolhe pelo problema que
 * tem; a venda adicional mora nos módulos.
 * - Presença R$ 8.900 + R$ 990/mês; Atendimento R$ 7.900 + R$ 1.590/mês.
 * - Completo R$ 14.900 + R$ 2.290/mês de tabela: a manutenção integrada passa
 *   de 7 horas por mês ("passa de 7 horas, ajuste"). Por tempo limitado, sai
 *   a R$ 1.990/mês (`OFERTA_DO_COMPLETO`), e quem fecha o Completo leva a
 *   implantação do Painel do dono de bônus ("no site, completo é bônus de
 *   fechamento").
 * - Módulos (painel, reativação e campanhas, funil sob medida, consulta
 *   veicular, área de repasse) só para quem tem Atendimento ou Completo;
 *   consulta e repasse aparecem só no hub de revendas. Consulta por placa a
 *   R$ 49,90 (custo do provedor perto de R$ 30, "precisamos de um lucro").
 * - Branding sai da tabela e fica anunciado como serviço sob consulta.
 *
 * Regras que continuam: nenhuma mensalidade que mantém sistema no ar fica
 * abaixo do piso (R$ 690, a do rastreamento sozinho), porque ela cobre
 * hospedagem e manutenção; módulos rodam em cima da mensalidade do plano.
 * O uso do modelo de IA, as mensagens da API oficial do WhatsApp e o SMS
 * ficam fora, pelo valor real, na mesma fatura.
 */

export const PISO_DA_MENSALIDADE = 690;

export type IdPlano = "presenca" | "atendimento" | "completo";

/** As duas metades do H1, que organizam a home e as páginas de solução. */
export type Pilar = "mapa" | "operacao";

export interface Degrau {
  /** "Usuário extra", "Cada 500 conversas a mais". */
  rotulo: string;
  valor: number;
  /** "/mês", "por campanha". */
  unidade: string;
}

/** O que cresce com o cliente. Vale para os planos e o painel. */
export const DEGRAUS = {
  usuarioExtra: 89,
  conversas: { bloco: 500, valor: 190 },
  dados: { limite: "20 mil contatos ou 8 GB", valor: 190 },
};

/** Usuários do CRM que vêm no Atendimento e no Completo, sem licença por pessoa. */
export const USUARIOS_NO_CRM = 5;

/** Reajuste da mensalidade: índice anual e gatilho de repasse cambial. */
export const REAJUSTE = { indice: "IPCA", gatilhoCambial: 10 };

export const REGRAS = {
  parcelas: 6,
  diasParaEntregarNaSaida: 15,
  /** Referência do plano de mídia da Motors (plano, seção 3.3). */
  margemPorCarro: 7000,
};

/** "R$ 7.900"; com centavos só quando houver ("R$ 49,90"). */
export const BRL = (n: number) => {
  const [inteiro, centavos] = n.toFixed(2).split(".");
  const milhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return Number.isInteger(n) ? `R$ ${milhar}` : `R$ ${milhar},${centavos}`;
};

/** "31/12/2026" a partir de "2026-12-31". */
export const dataBR = (iso: string) => iso.split("-").reverse().join("/");

// ---------------------------------------------------------------------------
// Planos
// ---------------------------------------------------------------------------

export interface Plano {
  id: IdPlano;
  nome: string;
  /** A metade do H1 que o plano cumpre. */
  pilar: string;
  /** Para que serve, numa frase. */
  para: string;
  inclui: string[];
  implantacao: number;
  /** Mensalidade de tabela. */
  mensalidade: number;
  /** Bônus de fechamento. */
  bonus?: string;
  /** Rótulo de destaque no cartão. */
  destaque?: string;
  /** Linha final do cartão. */
  rodape: string;
  /** Custos repassados pelo valor real, na mesma fatura. */
  repasses?: string[];
}

const PRESENCA = { implantacao: 8900, mensalidade: 990 };
const ATENDIMENTO = { implantacao: 7900, mensalidade: 1590 };
const TRAFEGO_NO_COMPLETO = 1300;

export const PLANOS: Plano[] = [
  {
    id: "presenca",
    nome: "Presença",
    pilar: "No mapa",
    para: "Ser encontrado no Google e saber de onde vem cada contato.",
    inclui: [
      "Site institucional ou de estoque, com hospedagem e manutenção",
      "Perfil da Empresa no Google e SEO técnico",
      "Rastreamento até a venda, com API de Conversões",
      "Pedido de avaliação no WhatsApp depois da venda",
      "Relatório mensal da origem dos contatos",
    ],
    ...PRESENCA,
    rodape: "Base para o tráfego pago, que só roda com o rastreamento ligado.",
  },
  {
    id: "atendimento",
    nome: "Atendimento",
    pilar: "Operação com IA",
    para: "Responder na hora, a qualquer hora, sem perder o contato que chegou.",
    inclui: [
      `Agente de IA no WhatsApp, ${DEGRAUS.conversas.bloco} conversas por mês`,
      `CRM com funil, aviso de lead parado e ${USUARIOS_NO_CRM} usuários`,
      "Passagem do agente para a equipe na mesma conversa",
      "Treinamento da equipe",
      "Banco próprio, backups e suporte",
    ],
    ...ATENDIMENTO,
    repasses: ["Uso do modelo de IA", "Mensagens da API oficial do WhatsApp"],
    rodape: "Uso da IA e mensagens da API oficial do WhatsApp pelo valor real, na mesma fatura.",
  },
  {
    id: "completo",
    nome: "Completo",
    pilar: "Mapa e operação",
    destaque: "O sistema da Motors Store",
    para: "Do anúncio à venda, tudo ligado e medido.",
    inclui: [
      "Tudo da Presença e do Atendimento",
      "Integração com o sistema de gestão (Revenda Mais em produção)",
      "Um fluxo de automação à escolha: pós-venda ou integração entre sistemas",
      `Google Ads e Meta Ads por ${BRL(TRAFEGO_NO_COMPLETO)}/mês, se quiser`,
    ],
    implantacao: 14900,
    mensalidade: 2290,
    bonus: "Bônus de fechamento: a implantação do Painel do dono fica por conta da V2O5.",
    repasses: ["Uso do modelo de IA", "Mensagens da API oficial do WhatsApp"],
    rodape: `Separados, Presença e Atendimento somam ${BRL(PRESENCA.implantacao + ATENDIMENTO.implantacao)} + ${BRL(PRESENCA.mensalidade + ATENDIMENTO.mensalidade)}/mês.`,
  },
];

/**
 * Preço temporário do Completo (Dyones, 15/10: "coloque um bônus temporário
 * pelo preço de R$ 1.990"). A data é a do fim da condição; depois dela o
 * site volta à mensalidade de tabela. `tests/precos.test.ts` falha quando a
 * data passa, para ninguém esquecer a oferta no ar.
 */
export const OFERTA_DO_COMPLETO = { mensalidade: 1990, ate: "2026-12-31" };

export function plano(id: IdPlano): Plano {
  const p = PLANOS.find((x) => x.id === id);
  if (!p) throw new Error(`Plano sem preço: ${id}`);
  return p;
}

/** A mensalidade que o cartão mostra em destaque: a da oferta, quando houver. */
export const mensalidadeDoPlano = (p: Plano) => (p.id === "completo" ? OFERTA_DO_COMPLETO.mensalidade : p.mensalidade);

/** Presença e Atendimento contratados separados. */
export function somaDosPlanosSeparados() {
  const a = plano("presenca");
  const b = plano("atendimento");
  return { implantacao: a.implantacao + b.implantacao, mensalidade: a.mensalidade + b.mensalidade };
}

// ---------------------------------------------------------------------------
// Tráfego, módulos e serviços
// ---------------------------------------------------------------------------

export type Grupo = "trafego" | "avulso" | "modulo" | "servico";

export interface LinhaDePreco {
  id: string;
  nome: string;
  href: string;
  grupo: Grupo;
  /** Implantação, "a partir de". Ausente quando a linha não tem implantação. */
  implantacao?: number;
  /** Mensalidade, "a partir de". */
  mensalidade?: number;
  /** "por fluxo", "por projeto": a implantação é por unidade, sem mensalidade. */
  unidade?: string;
  /** Cobrança por uso, além da mensalidade (consulta por placa). */
  porUso?: { valor: number; unidade: string };
  /** Verba de mídia por fora, paga direto ao Google e à Meta. */
  maisVerba?: boolean;
  /** Por que não tem implantação (tráfego: só com o rastreamento ativo). */
  semImplantacao?: string;
  /** Sem preço publicado: orçado no diagnóstico. */
  sobConsulta?: boolean;
  /** O que a mensalidade (ou a implantação por unidade) cobre. */
  cobre: string;
  /** O que já vem dentro ("3 usuários"). */
  inclui?: string[];
  /** O que cresce com o cliente e tem preço publicado. */
  degraus?: Degrau[];
  /** Custos repassados pelo valor real, na mesma fatura. */
  repasses?: string[];
  /** Vantagem ou bônus. */
  bonus?: string;
  /** Quem pode contratar. */
  requisito?: string;
  /** Onde aparece: `/precos` (padrão) ou só o hub de revendas. */
  onde?: "precos" | "revendas";
}

const PARA_QUEM_TEM_O_SISTEMA = "Para quem tem Atendimento ou Completo";

export const LINHAS_DE_PRECO: LinhaDePreco[] = [
  {
    id: "googleAds",
    nome: "Google Ads",
    href: "/gestao-de-trafego",
    grupo: "trafego",
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
    grupo: "trafego",
    mensalidade: 1200,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre:
      "Instagram e Facebook com o catálogo de veículos ou produtos, anúncios que abrem conversa no WhatsApp, públicos da base do CRM e API de Conversões. Relatório mensal.",
  },
  {
    id: "trafego",
    nome: "Google Ads e Meta Ads juntos",
    href: "/gestao-de-trafego",
    grupo: "trafego",
    mensalidade: 1990,
    maisVerba: true,
    semImplantacao: "sem implantação, com o rastreamento ativo",
    cobre: "As duas plataformas pela mesma equipe, com a verba movida para onde a venda aparece.",
    bonus: "Feed de catálogo incluso: o estoque ou os produtos no anúncio.",
  },
  {
    id: "trafegoNoCompleto",
    nome: "Google Ads e Meta Ads no Completo",
    href: "/gestao-de-trafego",
    grupo: "trafego",
    mensalidade: TRAFEGO_NO_COMPLETO,
    maisVerba: true,
    semImplantacao: "sem implantação",
    cobre: "A mesma gestão das duas plataformas, com o feed de catálogo, para quem tem o plano Completo.",
    requisito: "No plano Completo",
  },
  {
    id: "rastreamento",
    nome: "Rastreamento até a venda",
    href: "/rastreamento-de-conversoes",
    grupo: "avulso",
    implantacao: 2900,
    mensalidade: 690,
    cobre:
      "Tags e API de Conversões em dia, conferência mensal da qualidade do dado e relatório de origem das vendas. Para quem já tem site; no plano Presença, vem junto com o site e o Google.",
  },
  {
    id: "painel",
    nome: "Painel do dono",
    href: "/diagnostico",
    grupo: "modulo",
    implantacao: 3900,
    mensalidade: 490,
    cobre:
      "Funil, verba, custo por lead e vendas por origem numa tela, atualizada todo dia a partir do CRM, do rastreamento e das contas de anúncio. Sem licença por usuário.",
    inclui: ["3 usuários", "3 fontes de dados"],
    degraus: [{ rotulo: "Usuário extra", valor: DEGRAUS.usuarioExtra, unidade: "/mês" }],
    bonus: "No Completo, a implantação é bônus de fechamento.",
    requisito: PARA_QUEM_TEM_O_SISTEMA,
  },
  {
    id: "reativacao",
    nome: "Reativação e campanhas",
    href: "/diagnostico",
    grupo: "modulo",
    implantacao: 1900,
    mensalidade: 290,
    cobre:
      "Importa e segmenta a base própria, dispara SMS com link rastreado e mostra quem clicou, respondeu ou pediu para sair. Quem responde entra no CRM com a origem.",
    degraus: [
      { rotulo: "Campanha de WhatsApp operada pela V2O5", valor: 950, unidade: "por campanha" },
      { rotulo: "Pacote de 3 campanhas de WhatsApp", valor: 2490, unidade: "por pacote" },
    ],
    repasses: ["SMS, pelo valor do provedor", "Mensagens da API oficial do WhatsApp"],
    requisito: PARA_QUEM_TEM_O_SISTEMA,
  },
  {
    id: "funil",
    nome: "Funil sob medida",
    href: "/diagnostico",
    grupo: "modulo",
    implantacao: 1900,
    unidade: "por projeto",
    cobre:
      "Etapas, motivos de ganho e perda, aviso de lead parado e transferência automática ajustados ao processo da equipe. A manutenção entra na mensalidade do plano.",
    requisito: PARA_QUEM_TEM_O_SISTEMA,
  },
  {
    id: "consulta",
    nome: "Consulta veicular completa",
    href: "/segmentos/revendas-de-veiculos",
    grupo: "modulo",
    implantacao: 990,
    mensalidade: 190,
    porUso: { valor: 49.9, unidade: "por placa" },
    cobre:
      "FIPE do mês sem custo, histórico de 24 meses com tendência e faixa de compra, e consulta por placa com dez checagens (leilão, sinistro, gravame, roubo, débitos, recall e outras) e um veredito. Placa repetida abre do histórico sem custo.",
    requisito: PARA_QUEM_TEM_O_SISTEMA,
    onde: "revendas",
  },
  {
    id: "repasse",
    nome: "Área de repasse",
    href: "/segmentos/revendas-de-veiculos",
    grupo: "modulo",
    implantacao: 2900,
    mensalidade: 390,
    cobre:
      "Vitrine de carros no estado para lojistas e consumidores, com laudo, conta aberta contra a FIPE e ficha de defeitos com foto. Os compradores se inscrevem, e a equipe vê quem combina com cada carro antes de avisar.",
    requisito: PARA_QUEM_TEM_O_SISTEMA,
    onde: "revendas",
  },
  {
    id: "redes",
    nome: "Conteúdo e gestão de redes sociais",
    href: "/diagnostico",
    grupo: "servico",
    implantacao: 1500,
    mensalidade: 1699,
    cobre:
      "Duas redes com perfis configurados, calendário e 12 publicações por mês feitas do que a empresa já produz, cada uma com link rastreado, e relatório mensal. Produção de foto, vídeo e peças fica à parte.",
    inclui: ["12 publicações por mês", "2 redes"],
  },
  {
    id: "automacao",
    nome: "Fluxo de automação",
    href: "/automacao-com-ia",
    grupo: "servico",
    implantacao: 1900,
    unidade: "por fluxo",
    cobre:
      "Um fluxo no n8n entregue, testado e documentado: pós-venda, avaliações ou integração entre sistemas. A manutenção entra na mensalidade do plano.",
  },
  {
    id: "branding",
    nome: "Branding e gestão de marca",
    href: "/diagnostico",
    grupo: "servico",
    sobConsulta: true,
    cobre: "Posicionamento, identidade visual, tom de voz e o guia da marca, orçados no diagnóstico.",
  },
];

export function linhaDePreco(id: string): LinhaDePreco {
  const l = LINHAS_DE_PRECO.find((x) => x.id === id);
  if (!l) throw new Error(`Linha sem preço: ${id}`);
  return l;
}

export const linhasDoGrupo = (grupo: Grupo, onde: "precos" | "revendas" = "precos") =>
  LINHAS_DE_PRECO.filter((l) => l.grupo === grupo && (l.onde ?? "precos") === onde);

/** "a partir de R$ 1.900 + R$ 290/mês", "a partir de R$ 1.900 por fluxo", "sob consulta". */
export function precoDaLinha(l: LinhaDePreco): string {
  if (l.sobConsulta) return "sob consulta";
  const partes: string[] = [];
  if (l.implantacao) partes.push(`${BRL(l.implantacao)}${l.unidade ? ` ${l.unidade}` : ""}`);
  if (l.mensalidade) partes.push(`${BRL(l.mensalidade)}/mês${l.maisVerba ? " + verba" : ""}`);
  const uso = l.porUso ? ` e ${BRL(l.porUso.valor)} ${l.porUso.unidade}` : "";
  return `a partir de ${partes.join(" + ")}${uso}`;
}

// ---------------------------------------------------------------------------
// Onde cada capacidade do cardápio mora
// ---------------------------------------------------------------------------

/**
 * Cada cartão da home e cada página de solução fala de uma capacidade
 * (site, agente, CRM...). Ela mora num plano ou numa linha de preço; daqui
 * sai o texto de preço do cartão, sempre da mesma tabela.
 */
export interface Capacidade {
  nome: string;
  plano?: IdPlano;
  linha?: string;
  /** Vem dentro do plano, sem preço próprio no cartão. */
  incluso?: boolean;
  /** Texto do cartão quando não é o preço direto. */
  preco?: () => string;
}

const noPlano = (id: IdPlano) => {
  const p = plano(id);
  return `no plano ${p.nome}, a partir de ${BRL(p.implantacao)} + ${BRL(mensalidadeDoPlano(p))}/mês`;
};

export const CAPACIDADES: Record<string, Capacidade> = {
  sites: { nome: "Sites e presença", plano: "presenca" },
  rastreamento: {
    nome: "Rastreamento até a venda",
    linha: "rastreamento",
    preco: () => `${precoDaLinha(linhaDePreco("rastreamento"))}, ou no plano Presença`,
  },
  googleAds: { nome: "Google Ads", linha: "googleAds", preco: () => `${precoDaLinha(linhaDePreco("googleAds"))}, por plataforma` },
  metaAds: { nome: "Meta Ads", linha: "metaAds" },
  trafego: { nome: "Google Ads e Meta Ads juntos", linha: "trafego" },
  catalogo: { nome: "Anúncios de catálogo", linha: "trafego", preco: () => "incluso no Google Ads e Meta Ads juntos" },
  redes: { nome: "Conteúdo e gestão de redes sociais", linha: "redes" },
  avaliacoes: { nome: "Avaliações no Google", plano: "presenca", incluso: true },
  agente: { nome: "Agente de IA no WhatsApp", plano: "atendimento" },
  crm: { nome: "CRM e sistemas sob medida", plano: "atendimento" },
  painel: {
    nome: "Painel do dono",
    linha: "painel",
    preco: () => `${precoDaLinha(linhaDePreco("painel"))}; implantação de bônus no Completo`,
  },
  automacao: { nome: "Automação de processos", linha: "automacao" },
  posvenda: {
    nome: "Pós-venda e recorrência",
    linha: "automacao",
    preco: () => `${precoDaLinha(linhaDePreco("automacao"))}; um vem no plano Completo`,
  },
  reativacao: { nome: "Reativação de base", linha: "reativacao" },
  branding: { nome: "Branding e gestão de marca", linha: "branding" },
};

export function capacidade(id: string): Capacidade {
  const c = CAPACIDADES[id];
  if (!c) throw new Error(`Capacidade sem lugar no cardápio: ${id}`);
  return c;
}

/** O texto de preço de um cartão: "no plano Presença, a partir de...", "a partir de...", "incluso no plano...". */
export function precoDa(id: string): string {
  const c = capacidade(id);
  if (c.preco) return c.preco();
  if (c.plano) return c.incluso ? `incluso no plano ${plano(c.plano).nome}` : noPlano(c.plano);
  return precoDaLinha(linhaDePreco(c.linha!));
}

/**
 * O preço que a página de solução mostra: o do plano em que a capacidade
 * mora, ou o da linha. Sai no mesmo formato de `LinhaDePreco`, para o
 * bloco de preço e o schema não terem dois caminhos.
 */
export function ofertaDaCapacidade(id: string): LinhaDePreco {
  const c = capacidade(id);
  if (c.linha) return linhaDePreco(c.linha);
  const p = plano(c.plano!);
  return {
    id: p.id,
    nome: `Plano ${p.nome}`,
    href: "/precos",
    grupo: "avulso",
    implantacao: p.implantacao,
    mensalidade: p.mensalidade,
    cobre: `${p.para} ${p.inclui.join("; ")}.`,
    repasses: p.repasses,
  };
}

// ---------------------------------------------------------------------------
// Revendas e parceiros
// ---------------------------------------------------------------------------

/** Com a margem de referência, em quantos meses uma venda a mais paga a mensalidade do Completo. */
export const mesesQueUmaVendaPaga = () => Math.floor(REGRAS.margemPorCarro / plano("completo").mensalidade);

/** Completo com as duas plataformas de tráfego, por mês, sem a verba (na oferta). */
export const mensalidadeDoCompletoComTrafego = () =>
  OFERTA_DO_COMPLETO.mensalidade + (linhaDePreco("trafegoNoCompleto").mensalidade ?? 0);

/** Quanto Google Ads e Meta Ads juntos economizam frente aos dois avulsos. */
export const economiaDoTrafegoJunto = () =>
  (linhaDePreco("googleAds").mensalidade ?? 0) + (linhaDePreco("metaAds").mensalidade ?? 0) - (linhaDePreco("trafego").mensalidade ?? 0);

/**
 * Indicação de fotógrafo parceiro (Dyones, 13/10: "precisa de fotógrafo?
 * temos parceiros incríveis para lhe indicar, a partir de R$ 890,00 mensais,
 * saiba mais"). O preço é do parceiro, "a partir de"; a V2O5 indica e o
 * "saiba mais" abre o WhatsApp da V2O5. Sem nome de parceiro no site.
 */
const FOTOGRAFO_A_PARTIR_DE = 890;
export const FOTOGRAFIA_PARCEIRA = {
  pergunta: "Precisa de fotógrafo?",
  aPartirDe: FOTOGRAFO_A_PARTIR_DE,
  texto: `A V2O5 indica parceiros de fotografia, com pacote mensal a partir de ${BRL(FOTOGRAFO_A_PARTIR_DE)}.`,
  botao: "Saiba mais",
  mensagem: "Olá! Vi no site da V2O5 a indicação de fotógrafo parceiro e quero saber mais.",
};
