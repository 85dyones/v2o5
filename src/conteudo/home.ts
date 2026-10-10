/**
 * Textos e dados da home, num lugar só para revisar o texto (humanizer) e os
 * números (fonte e período) sem caçar pelos componentes.
 *
 * Regras: português, frases curtas, sem travessão; preço sempre "a partir
 * de" (`memory/context/oferta.md`); número do case só com fonte e período
 * (`memory/projects/case-motors.md`), travado por `tests/conteudo.test.ts`.
 */
import type { Etapa } from "@/lib/tokens";
import { AUTOMOTIVO_PRECO, BRL, precoDa, REGRAS } from "@/conteudo/precos";

/**
 * O H1 da home, escolhido em 09/10 entre duas opções (a outra está em
 * `memory/decisoes.md`).
 */
export const TITULO_DA_HOME = "Coloque sua empresa no mapa e multiplique a operação com IA.";

export const HERO = {
  subtitulo:
    "Site, Google, anúncios, agente de IA e CRM montados por uma equipe só, num sistema que mostra de onde veio cada venda e fica no nome da sua empresa.",
  nota: "Diagnóstico gratuito: 45 minutos de conversa com o fundador e um mapa do que fazer, em até 24 horas.",
};

/**
 * Integrações em produção no sistema da Motors Store (`case-motors.md`).
 * Regra de `oferta.md`: integração só aparece quando roda em produção.
 * Nome em texto, nunca logotipo.
 */
export const FERRAMENTAS = {
  rotulo: "Em produção na Motors Store",
  nomes: ["WhatsApp", "Meta Ads", "GA4", "n8n", "Revenda Mais"],
} as const;

export const NAVEGACAO = [
  { rotulo: "Soluções", href: "/#solucoes" },
  { rotulo: "Automotivo", href: "/segmentos/revendas-de-veiculos" },
  { rotulo: "Case", href: "/cases/motors-store" },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Sobre", href: "/sobre" },
] as const;

export const NOME_DA_ETAPA: Record<Etapa, string> = {
  violeta: "Atração",
  verde: "Atendimento",
  azul: "Gestão",
  ambar: "Venda",
};

export type Vinheta =
  | "agente"
  | "busca"
  | "crm"
  | "fluxo"
  | "jornada"
  | "campanhas"
  | "perfil"
  | "site"
  | "integracoes"
  | "marca";

export interface Linha {
  titulo: string;
  frase: string;
  preco: string;
  href: string;
  etapa: Etapa;
  /** A cena de produto que ilustra o cartão (`Vinhetas.tsx`). */
  vinheta: Vinheta;
}

/** As seis linhas gerais, na ordem do bento (a primeira ocupa o bloco grande). */
export const LINHAS: Linha[] = [
  {
    titulo: "Agente de IA no WhatsApp",
    frase:
      "Responde na hora, a qualquer hora, com as informações do seu negócio. Quando a conversa pede uma pessoa, chama alguém da equipe.",
    preco: precoDa("agente"),
    href: "/agente-de-ia-para-whatsapp",
    etapa: "verde",
    vinheta: "agente",
  },
  {
    titulo: "Sites e presença",
    frase:
      "Carrega rápido no celular, aparece no Google e grava de onde veio cada contato. Hospedagem, manutenção e SEO técnico já na mensalidade.",
    preco: precoDa("sites"),
    href: "/criacao-de-sites",
    etapa: "violeta",
    vinheta: "site",
  },
  {
    titulo: "CRM e sistemas sob medida",
    frase: "Nenhum contato esquecido numa conversa: cada um num funil, com a origem, a etapa e o próximo passo à vista.",
    preco: precoDa("crm"),
    href: "/crm-com-whatsapp",
    etapa: "azul",
    vinheta: "crm",
  },
  {
    titulo: "Automação de processos",
    frase: "A tarefa que alguém faz à mão toda semana passa a rodar sozinha entre os sistemas que você já usa.",
    preco: precoDa("automacao"),
    href: "/automacao-com-ia",
    etapa: "azul",
    vinheta: "fluxo",
  },
  {
    titulo: "Rastreamento até a venda",
    frase: "Cada venda com a origem: qual anúncio, qual busca, qual página. Sem isso, a verba vai para onde parece funcionar.",
    preco: precoDa("rastreamento"),
    href: "/rastreamento-de-conversoes",
    etapa: "violeta",
    vinheta: "jornada",
  },
  {
    titulo: "Tráfego pago no Google e na Meta",
    frase:
      "Campanhas no Google Ads e na Meta (Instagram e Facebook) com a verba ajustada pela venda registrada no CRM. Começa com o rastreamento ligado.",
    preco: precoDa("trafego"),
    href: "/gestao-de-trafego",
    etapa: "violeta",
    vinheta: "campanhas",
  },
];

/** Um serviço do cardápio, como aparece no bento de soluções. */
export interface Servico {
  titulo: string;
  frase: string;
  /** "a partir de" da tabela de `oferta.md`, ou em que linha ele vem incluso. */
  preco: string;
  href: string;
  etapa: Etapa;
  vinheta: Vinheta;
}

const linha = (href: string): Servico => {
  const l = LINHAS.find((x) => x.href === href);
  if (!l) throw new Error(`Linha sem preço em oferta.md: ${href}`);
  return l;
};

/** Cabeçalho da seção de soluções. */
export const SOLUCOES = {
  titulo: "Tudo que leva o cliente do Google ao caixa.",
  apagado: "Comece pela linha que trava hoje e some as outras depois.",
  texto:
    "Cada linha tem preço publicado e sem fidelidade. A mensalidade já inclui hospedagem e manutenção, e todas rodam na mesma base: o que entra por uma aparece nas outras.",
};

/**
 * As duas metades do H1, cada uma com os serviços que a cumprem. Serviço sem
 * preço próprio na tabela de `oferta.md` diz em qual linha vem incluso
 * (plano, seção 3.2: o Perfil de Empresa e o SEO técnico estão na fundação
 * dos sites). `tests/conteudo.test.ts` confere.
 */
export const PILARES: { id: string; sobretitulo: string; titulo: string; frase: string; servicos: Servico[] }[] = [
  {
    id: "mapa",
    sobretitulo: "No mapa",
    titulo: "Coloque sua empresa no mapa.",
    frase:
      "Quem procura o que você vende acha você ou acha o concorrente. Esta metade cuida de ser você: no Google, no Maps, nos anúncios e nas respostas das IAs de busca.",
    servicos: [
      {
        titulo: "Branding e gestão de marca",
        frase:
          "Antes de anunciar, decida o que a marca promete. Posicionamento, identidade visual e tom de voz num guia que vale para o perfil, o site, os anúncios e o atendimento.",
        preco: precoDa("branding"),
        href: "/diagnostico",
        etapa: "violeta",
        vinheta: "marca",
      },
      {
        titulo: "Perfil da Empresa no Google",
        frase:
          "Quem busca perto de casa vê o Maps antes do site. O antigo Google Meu Negócio, completo e verificado, com a empresa aparecendo na sua região.",
        preco: "incluso em Sites e presença",
        href: "/criacao-de-sites",
        etapa: "violeta",
        vinheta: "perfil",
      },
      {
        titulo: "SEO e busca por IA",
        frase: "Para ranquear no Google e ser citado nas respostas das IAs: SEO técnico, conteúdo e dados estruturados no site.",
        preco: "SEO técnico incluso em Sites e presença",
        href: "/criacao-de-sites",
        etapa: "violeta",
        vinheta: "busca",
      },
      linha("/criacao-de-sites"),
      linha("/gestao-de-trafego"),
      linha("/rastreamento-de-conversoes"),
    ],
  },
  {
    id: "operacao",
    sobretitulo: "Operação com IA",
    titulo: "Multiplique a operação com IA.",
    frase:
      "O contato que chega fora do horário recebe resposta na hora e entra no funil com a origem. A equipe começa o dia com o próximo passo pronto.",
    servicos: [
      linha("/agente-de-ia-para-whatsapp"),
      linha("/automacao-com-ia"),
      linha("/crm-com-whatsapp"),
      {
        titulo: "Integrações entre sistemas",
        frase: "Site, CRM, ERP e os sistemas do seu setor trocando dados sozinhos. Em produção hoje: o estoque do Revenda Mais.",
        preco: precoDa("automacao"),
        href: "/automacao-com-ia",
        etapa: "azul",
        vinheta: "integracoes",
      },
    ],
  },
];

/**
 * Visão 360: o cliente atravessa marca, marketing, vendas e gestão, e a venda
 * se perde nas passagens entre uma área e outra. Cada área traz a base do
 * fundador que responde por ela (formação, experiência ou prática na Motors).
 * Fatos do fundador: o que ele contou em 09/10 (Administração na FAE
 * Business School; rebranding da Top Imóveis para Top Soluções
 * Imobiliárias; conduz o diagnóstico) e o que publicou no site antigo (curso
 * de informática ganho num concurso da escola, em 1992). O número da costura do meio vem do
 * estudo da HBR em `evidencia`.
 */
export const VISAO_360 = {
  sobretitulo: "Visão 360",
  titulo: "O cliente se perde nas costuras entre uma área e outra.",
  tituloApagado: "A V2O5 olha o caminho inteiro, da marca ao caixa.",
  texto:
    "É comum a empresa contratar por partes: a marca com um designer, os anúncios com uma agência, o site com um programador, enquanto o atendimento fica com a equipe. Cada parte entrega a sua e mede o próprio número, e o trecho entre elas fica sem dono.",
  evidencia: {
    texto:
      "Pesquisadores mandaram um contato pelo site de 2.241 empresas americanas: 23% nunca responderam, e as que responderam levaram 42 horas em média. No mesmo estudo, quem retornou em até uma hora teve quase sete vezes mais chance de conversar com quem decide a compra.",
    fonte: "Oldroyd, McElheran e Elkington, The Short Life of Online Sales Leads, Harvard Business Review, março de 2011",
    href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
  areas: [
    {
      nome: "Marca",
      pergunta: "Por que escolher você?",
      acao: "Uma promessa só, dita do mesmo jeito no Google, no anúncio, no site e na conversa com o agente.",
      base: { tipo: "Experiência", texto: "Rebranding da Top Imóveis para Top Soluções Imobiliárias" },
    },
    {
      nome: "Marketing",
      pergunta: "Quem encontra você?",
      acao: "SEO e anúncios no Google e na Meta para quem já procura o que você vende, com a verba indo para o que virou venda.",
      base: { tipo: "Prática", texto: "Conteúdo, SEO e tráfego da Motors Store" },
    },
    {
      nome: "Vendas",
      pergunta: "Quem responde, e quando?",
      acao: "O agente de IA responde na hora e passa ao vendedor a conversa, o interesse e a origem do cliente.",
      base: { tipo: "Prática", texto: "Funil e CRM da Motors Store" },
    },
    {
      nome: "Gestão",
      pergunta: "Quanto sobra no fim do mês?",
      acao: "O projeto começa pela conta da empresa: margem, ticket médio, custo por venda e prazo para se pagar.",
      base: { tipo: "Formação", texto: "Administração na FAE Business School" },
    },
  ],
  /** O que costuma romper na passagem de uma área para a seguinte. */
  costuras: ["A promessa muda no caminho", "O contato espera 42 h", "A venda entra sem origem"],
  fio: {
    titulo: "O fio é a tecnologia.",
    texto: "Dados num lugar só e integrações que rodam sozinhas, tudo no nome da sua empresa.",
  },
  fundador: {
    nome: "Dyones Oliveira",
    papel: "Fundador da V2O5",
    texto:
      "Formado em Administração pela FAE Business School, está na informática desde 1992, quando ganhou um curso num concurso da escola. Em branding, fez a mudança da Top Imóveis para Top Soluções Imobiliárias; na Motors Store, assina os 26 guias do site. É ele quem conduz o diagnóstico gratuito.",
    escola: "FAE Business School",
  },
};

/**
 * Textos das vinhetas do bento: cenas de produto paradas, sem número de
 * resultado. Os nomes de carro e de campanha são de exemplo.
 */
export const VINHETAS = {
  agente: {
    nome: "Agente da loja",
    estado: "responde na hora",
    dia: "Hoje",
    contato: {
      iniciais: "MR",
      nome: "Marina R.",
      origem: "veio do Google Ads",
      campos: [
        { rotulo: "Interesse", valor: "Visita no sábado" },
        { rotulo: "Próximo passo", valor: "Sábado, 10h" },
        { rotulo: "Responsável", valor: "Carla" },
      ],
      etiqueta: "Em atendimento",
      aviso: "Carla foi avisada no WhatsApp",
    },
    conversa: [
      { tipo: "entrada", texto: "Oi! Vocês abrem sábado?" },
      { tipo: "ferramenta", texto: "Consultou os horários da loja" },
      { tipo: "saida", texto: "Abrimos sim, das 9h às 13h. Quer que eu reserve um horário para você?" },
      { tipo: "entrada", texto: "Pode ser às 10h." },
      { tipo: "ferramenta", texto: "Horário reservado e equipe avisada" },
      { tipo: "saida", texto: "Pronto, sábado às 10h com a Carla. Quer a localização da loja?" },
      { tipo: "entrada", texto: "Quero sim, obrigado!" },
    ],
  },
  busca: {
    consulta: "seminovos em curitiba",
    dominio: "suaempresa.com.br",
    trilha: "estoque",
    titulo: "Seminovos revisados em Curitiba",
    respostaDaIa: "Resposta de IA",
  },
  crm: [
    { coluna: "Novo", etapa: "violeta", cartoes: [["HB20 2021", "Meta Ads"], ["Kicks 2022", "Site"]] },
    { coluna: "Atendimento", etapa: "verde", cartoes: [["Onix LT 2022", "Google Ads"]] },
    { coluna: "Venda", etapa: "ambar", cartoes: [["Corolla 2020", "Google Ads"]] },
  ],
  fluxo: [
    { icone: "raio", texto: "Venda marcada no CRM" },
    { icone: "janela", texto: "Carro sai da vitrine do site" },
    { icone: "conversa", texto: "Cliente recebe o obrigado" },
    { icone: "sinal", texto: "Google e Meta recebem a venda" },
  ],
  jornada: {
    passos: ["Anúncio", "Site", "Lead", "Venda"],
    identificador: "Lead.3f9c2a7e",
    lados: ["navegador", "servidor"],
  },
  marca: {
    titulo: "Guia da marca",
    tipografia: "Tipografia",
    cores: ["#2B3A67", "#3E8E7E", "#D9C8A9", "#EDE7DC"],
    tom: { rotulo: "Tom de voz", palavras: ["direto", "próximo"] },
  },
  perfil: {
    nome: "Sua Empresa",
    categoria: "Categoria do negócio · Sua cidade",
    aberto: "Aberto agora",
    horario: "fecha às 18h",
    acoes: ["Rotas", "Ligar", "Site", "WhatsApp"],
  },
  site: {
    endereco: "suaempresa.com.br",
    botao: "Chamar no WhatsApp",
    secundario: "Ver serviços",
  },
  integracoes: {
    origem: "Revenda Mais",
    estado: "em produção",
    meio: "n8n",
    destinos: ["Site", "CRM", "Agente de IA"],
  },
  campanhas: {
    criterio: "Otimizando por venda confirmada",
    linhas: [
      { nome: "Seminovos", canal: "Google Ads", estado: "gera venda", ativa: true },
      { nome: "Remarketing", canal: "Meta Ads", estado: "gera venda", ativa: true },
      { nome: "Institucional", canal: "Meta Ads", estado: "pausada", ativa: false },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Orquestrador: demonstração com dados fictícios
// ---------------------------------------------------------------------------

export type Passo =
  | { tipo: "entrada"; autor: string; hora: string; texto: string }
  | { tipo: "saida"; autor: string; hora: string; texto: string }
  | { tipo: "sistema"; titulo: string; detalhes: string[]; etapa: Etapa };

export interface CartaoDoCrm {
  titulo: string;
  campos: { rotulo: string; valor: string }[];
  etapa: Etapa;
  etiqueta: string;
}

export interface Frente {
  id: string;
  aba: string;
  resumo: string;
  passos: Passo[];
  crm: CartaoDoCrm;
}

export const FRENTES: Frente[] = [
  {
    id: "agente",
    aba: "Agente de IA",
    resumo: "Uma mensagem chega no WhatsApp da loja às 21h e é respondida na hora.",
    passos: [
      {
        tipo: "entrada",
        autor: "Cliente",
        hora: "21:14",
        texto: "Boa noite! O Onix 2022 do anúncio ainda está disponível?",
      },
      {
        tipo: "sistema",
        titulo: "Agente consulta a base",
        detalhes: ["Estoque: Onix LT 1.0 turbo 2022, disponível", "Agenda: test drive amanhã às 10h e às 15h"],
        etapa: "verde",
      },
      {
        tipo: "saida",
        autor: "Agente de IA",
        hora: "21:14",
        texto: "Está sim! É o LT 1.0 turbo, com 41 mil km. Quer agendar um test drive? Tenho amanhã às 10h ou às 15h.",
      },
    ],
    crm: {
      titulo: "Onix LT 2022",
      campos: [
        { rotulo: "Origem", valor: "Google Ads, campanha Seminovos" },
        { rotulo: "Interesse", valor: "Test drive" },
        { rotulo: "Responsável", valor: "Agente de IA" },
      ],
      etapa: "verde",
      etiqueta: "Em atendimento",
    },
  },
  {
    id: "automacao",
    aba: "Automação",
    resumo: "A venda é marcada no CRM e o resto acontece sem ninguém digitar nada.",
    passos: [
      {
        tipo: "sistema",
        titulo: "CRM: negócio marcado como ganho",
        detalhes: ["Onix LT 2022, vendido por Carla"],
        etapa: "azul",
      },
      {
        tipo: "sistema",
        titulo: "Fluxo no n8n começa",
        detalhes: ["Site: carro sai da vitrine", "Equipe: aviso no grupo de vendas"],
        etapa: "azul",
      },
      {
        tipo: "saida",
        autor: "WhatsApp automático",
        hora: "09:02",
        texto: "Obrigado pela compra! Se puder, conta pra gente como foi o atendimento.",
      },
      {
        tipo: "sistema",
        titulo: "Conversão enviada",
        detalhes: ["Google Ads e Meta recebem a venda", "Com o identificador do lead, ela conta uma vez só"],
        etapa: "ambar",
      },
    ],
    crm: {
      titulo: "Onix LT 2022",
      campos: [
        { rotulo: "Origem", valor: "Google Ads, campanha Seminovos" },
        { rotulo: "Desfecho", valor: "Ganho" },
        { rotulo: "Venda atribuída", valor: "Anúncio de 02/10" },
      ],
      etapa: "ambar",
      etiqueta: "Venda",
    },
  },
  {
    id: "rastreamento",
    aba: "Site e rastreamento",
    resumo: "Do clique no anúncio ao lead no CRM, com a origem registrada em cada passo.",
    passos: [
      {
        tipo: "sistema",
        titulo: "Visitante chega de um anúncio",
        detalhes: ["Origem e clique do Google guardados"],
        etapa: "violeta",
      },
      {
        tipo: "sistema",
        titulo: "Abre a ficha e preenche o formulário",
        detalhes: ["Lead gravado com um identificador único"],
        etapa: "violeta",
      },
      {
        tipo: "sistema",
        titulo: "Lead enviado para Meta e Google",
        detalhes: ["Pelo servidor, com o mesmo identificador do navegador", "Meta e Google contam o lead uma vez só"],
        etapa: "violeta",
      },
      {
        tipo: "sistema",
        titulo: "Lead entra no CRM",
        detalhes: ["Com origem, campanha e veículo de interesse"],
        etapa: "azul",
      },
    ],
    crm: {
      titulo: "Novo lead",
      campos: [
        { rotulo: "Origem", valor: "Google Ads, campanha Seminovos" },
        { rotulo: "Veículo", valor: "Onix LT 2022" },
        { rotulo: "Identificador", valor: "Lead.3f9c2a7e" },
      ],
      etapa: "violeta",
      etiqueta: "Novo",
    },
  },
];

// ---------------------------------------------------------------------------
// Como tudo se liga
// ---------------------------------------------------------------------------

export type IdDaPeca = "site" | "whatsapp" | "agente" | "n8n" | "crm" | "rastreamento" | "venda";

export interface Peca {
  id: IdDaPeca;
  nome: string;
  etapa: Etapa;
  texto: string;
  /** O caminho que acende quando esta peça é escolhida. */
  caminho: IdDaPeca[];
}

export const PECAS: Peca[] = [
  {
    id: "site",
    nome: "Site",
    etapa: "violeta",
    texto: "Recebe o visitante e guarda de onde ele veio antes de levá-lo ao WhatsApp ou ao formulário.",
    caminho: ["site", "whatsapp", "agente", "crm", "venda"],
  },
  {
    id: "whatsapp",
    nome: "WhatsApp",
    etapa: "verde",
    texto: "É onde a conversa acontece. Cada mensagem chega ao agente com o histórico do contato.",
    caminho: ["site", "whatsapp", "agente", "crm"],
  },
  {
    id: "agente",
    nome: "Agente de IA",
    etapa: "verde",
    texto: "Responde com as informações do seu negócio e qualifica o contato antes de passar para a equipe.",
    caminho: ["whatsapp", "agente", "n8n", "crm"],
  },
  {
    id: "n8n",
    nome: "n8n",
    etapa: "azul",
    texto: "É a automação entre os sistemas. Atualiza o estoque no site e avisa a equipe quando entra um lead.",
    caminho: ["agente", "n8n", "crm"],
  },
  {
    id: "crm",
    nome: "CRM",
    etapa: "azul",
    texto: "O funil onde cada lead aparece com a origem e o próximo passo.",
    caminho: ["agente", "crm", "venda"],
  },
  {
    id: "rastreamento",
    nome: "Rastreamento",
    etapa: "violeta",
    texto: "Liga cada lead e cada venda ao anúncio de origem e devolve a conversão para Google e Meta.",
    caminho: ["site", "rastreamento", "crm", "venda", "rastreamento"],
  },
  {
    id: "venda",
    nome: "Venda",
    etapa: "ambar",
    texto: "O fechamento registrado no CRM, com a origem conhecida.",
    caminho: ["crm", "venda", "rastreamento"],
  },
];

/** Ligações do diagrama (sem direção; o caminho decide o sentido do pulso). */
export const LIGACOES_DO_DIAGRAMA: [IdDaPeca, IdDaPeca][] = [
  ["site", "whatsapp"],
  ["whatsapp", "agente"],
  ["agente", "crm"],
  ["agente", "n8n"],
  ["n8n", "crm"],
  ["crm", "venda"],
  ["site", "rastreamento"],
  ["rastreamento", "crm"],
  ["venda", "rastreamento"],
];

// ---------------------------------------------------------------------------
// Case Motors Store
// ---------------------------------------------------------------------------

/**
 * Só número lido do banco da Motors, com período declarado. Fonte:
 * `memory/projects/case-motors.md` (leitura de 08/10/2026; a tabela de
 * leads começa em 05/09/2026).
 */
export const CASE = {
  fonte: "Banco de dados da Motors Store, lido em 08/10/2026. Leads contados de 05/09 a 08/10/2026.",
  numeros: [
    {
      valor: 42,
      complemento: "de 44",
      texto: "leads do site chegaram com identificador para não contar a mesma conversão duas vezes",
    },
    { valor: 26, complemento: "", texto: "guias publicados, assinados pelo fundador da V2O5" },
    { valor: 132, complemento: "", texto: "veículos sincronizados com o estoque do Revenda Mais" },
  ],
  /** Formato real dos eventos; valores ilustrativos. */
  terminal: [
    "03:00:12  estoque.sync       fonte=revenda-mais  alterados=3",
    "14:32:07  lead.recebido      origem=google/cpc   gclid=sim",
    "14:32:07  meta.capi.Lead     event_id=Lead.3f9c2a7e  status=200",
    "14:32:08  ga4.generate_lead  event_id=Lead.3f9c2a7e  status=204",
    "14:32:08  n8n.novo_lead      aviso=equipe  canal=whatsapp",
  ],
};

export const AUTOMOTIVO = {
  titulo: "Para revendas de veículos",
  texto:
    "O pacote é o sistema da Motors Store: site de estoque integrado ao Revenda Mais, agente de IA no WhatsApp, CRM e rastreamento até a venda.",
  preco: `Pacote completo a partir de ${BRL(AUTOMOTIVO_PRECO.pacote.implantacao)} de implantação e ${BRL(AUTOMOTIVO_PRECO.pacote.mensalidade)} por mês.`,
  href: "/segmentos/revendas-de-veiculos",
  /** Vinheta do estoque: carros de exemplo, rotulada como exemplo. */
  estoque: {
    titulo: "Estoque",
    origem: "sincronizado com o Revenda Mais",
    destinos: ["no site", "no agente"],
    carros: [
      ["Onix LT 1.0 turbo", "2022"],
      ["HB20 Comfort", "2021"],
      ["Corolla XEi", "2020"],
      ["Compass Longitude", "2021"],
    ],
  },
};

export const EMPRESA = {
  nome: "V2O5 Vendas e Tecnologia",
  razaoSocial: "V2O5 Tecnologia da Informação Ltda.",
  cnpj: "68.490.470/0001-14",
  cidade: "Almirante Tamandaré/PR",
  /** Só dígitos, com o 55 (Dyones, 10/10). Link e rótulo saem daqui (`lib/whatsapp.ts`). */
  whatsapp: "5541998089550",
};

/** Mensagem pré-preenchida do WhatsApp, por página (plano, seção 6.1). */
export const WHATSAPP = {
  mensagens: {
    home: "Olá! Vim pelo site da V2O5 e quero pedir o diagnóstico gratuito.",
    precos: "Olá! Vi a página de preços da V2O5 e quero conversar sobre a minha empresa.",
    diagnostico: "Olá! Quero marcar o diagnóstico gratuito da V2O5.",
    recebido: "Olá! Acabei de pedir o diagnóstico pelo site e quero adiantar a conversa.",
  },
};

// ---------------------------------------------------------------------------
// Garantias, perguntas e chamadas (regras comerciais de oferta.md)
// ---------------------------------------------------------------------------

/** As regras comerciais que tiram o medo de contratar. Cada uma está em `oferta.md`. */
export const GARANTIAS = [
  { titulo: "Sem fidelidade", texto: "Mensalidade mês a mês. Cancela quando quiser." },
  {
    titulo: `Implantação em até ${REGRAS.parcelas}x`,
    texto: "Ou metade na assinatura e metade na entrega.",
  },
  {
    titulo: "O sistema é seu",
    texto: `Se sair, recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
  },
  {
    titulo: "Mensalidade sem surpresa",
    texto: "Hospedagem e manutenção dentro. Uso de IA e mensagens do WhatsApp pelo valor real, na mesma fatura.",
  },
];

/** Chamada curta entre seções: a pergunta que o dono está se fazendo e o botão. */
export const CHAMADA = {
  depoisDasSolucoes: {
    titulo: "Quer saber o que fazer primeiro na sua empresa?",
    texto: "O diagnóstico é gratuito e sai com um mapa do que fazer, com custo e prazo, para usar com ou sem a V2O5.",
  },
  depoisDoCase: {
    titulo: "Quer o mesmo sistema na sua empresa?",
    texto: "A conversa de 45 minutos é com o fundador, que montou o da Motors Store.",
  },
  botao: "Pedir diagnóstico gratuito",
};

/**
 * As perguntas que o dono faz antes de contratar, respondidas com as regras
 * de `oferta.md`. Viram FAQPage no schema. Todo número daqui está na
 * tabela de preços (`tests/conteudo.test.ts`).
 */
export const PERGUNTAS = [
  {
    pergunta: "Quanto custa um site com a V2O5?",
    resposta: `A partir de ${BRL(7900)} de implantação e ${BRL(590)} por mês. A mensalidade cobre hospedagem, manutenção, atualizações de segurança, SEO técnico contínuo e o Perfil da Empresa no Google. Domínio e e-mail profissional entram na fundação do projeto.`,
  },
  {
    pergunta: "O que a mensalidade inclui?",
    resposta:
      "Hospedagem, manutenção, atualizações de segurança, monitoramento e um relatório mensal. O uso do modelo de IA e as mensagens da API oficial do WhatsApp são cobrados pelo valor real, discriminados na mesma fatura. A verba de anúncios é paga direto ao Google e à Meta.",
  },
  {
    pergunta: "Tem fidelidade ou multa?",
    resposta: `Não. A implantação pode ser paga metade na assinatura e metade na entrega, ou em até ${REGRAS.parcelas} vezes, e a mensalidade cancela quando quiser. Se sair, você recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
  },
  {
    pergunta: "Preciso trocar o sistema de gestão que já uso?",
    resposta: `Não. A V2O5 liga o que você já usa. Em produção hoje: o estoque do Revenda Mais sincronizado com o site e o agente da Motors Store. Outras integrações entram como fluxo de automação, a partir de ${BRL(1900)} por fluxo.`,
  },
  {
    pergunta: "O agente de IA atende sozinho?",
    resposta:
      "Responde na hora com as informações do seu negócio e, quando a conversa pede uma pessoa, chama alguém da equipe. A conversa fica registrada no CRM, com a origem do contato.",
  },
  {
    pergunta: "Vocês fazem tráfego pago sem rastreamento?",
    resposta:
      "Não. Sem rastreamento até a venda, a campanha otimiza pelo formulário preenchido, e verba vai para o anúncio que gera contato barato, mesmo quando ele vende pouco. A gestão de tráfego começa com o rastreamento ligado.",
  },
  {
    pergunta: "Como funciona o diagnóstico gratuito?",
    resposta:
      "São 45 minutos de conversa com o fundador sobre presença, atendimento, operação e funil. Em até 24 horas você recebe um mapa do que fazer primeiro, com custo e prazo, para usar com ou sem a V2O5.",
  },
  {
    pergunta: "A V2O5 atende fora de Curitiba?",
    resposta:
      "Sim. A sede fica em Almirante Tamandaré, na região de Curitiba, e o atendimento é remoto para empresas de todo o Brasil.",
  },
];
