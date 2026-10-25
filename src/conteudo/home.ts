/**
 * Textos e dados da home, num lugar só para revisar o texto (humanizer) e os
 * números (fonte e período) sem caçar pelos componentes.
 *
 * Regras: português, frases curtas, sem travessão; preço sempre "a partir
 * de" (`memory/context/oferta.md`); número do case só com fonte e período
 * (`memory/projects/case-motors.md`), travado por `tests/conteudo.test.ts`.
 */
import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import type { Etapa } from "@/lib/tokens";
import { BRL, dataBR, DEGRAUS, linhaDePreco, mensalidadeDoPlano, OFERTA_DO_COMPLETO, plano, PLANOS, precoDa, REAJUSTE, REGRAS, somaDosPlanosSeparados, USUARIOS_NO_CRM } from "@/conteudo/precos";

/**
 * O H1 da home, desde 25/10/2026 (reposicionamento em torno do Sprint de
 * Eficiência, `V2O5_CORE.md`). O de 09/10 e a decisão estão em
 * `memory/decisoes.md`.
 */
export const TITULO_DA_HOME = "Do problema ao resultado, pelo caminho mais simples.";

export const HERO = {
  eyebrow: "Estratégia, processos e tecnologia",
  subtitulo:
    "Achamos o gargalo, simplificamos o processo e implementamos tecnologia para reduzir atrito e medir o resultado. IA entra onde faz diferença.",
  /** A vitrine de diagnostico.v2o5.com.br repete esta nota (`tests/subdominio-diagnostico.test.ts`). */
  nota: "Diagnóstico gratuito: 45 minutos de conversa com o fundador e um mapa do que fazer, em até 24 horas.",
  principio: "Começamos pelo processo e pelo resultado desejado. A ferramenta vem depois.",
  cta: "Mapear um gargalo",
  ctaSecundario: "Conhecer o método",
  conectamos: { rotulo: "O que conectamos", itens: ["Processos", "Atendimento", "Dados", "Integrações", "Automação", "IA aplicada"] },
};

/** O problema, antes da ferramenta (`V2O5_CORE.md`, seção 4). */
export const DORES = {
  titulo: "O problema raramente é falta de ferramenta.",
  apagado: "Quase sempre é atrito entre as que já existem.",
  texto:
    "A operação perde tempo entre sistemas que não conversam, tarefas repetidas e decisões tomadas sem informação suficiente. É por aí que a gente começa.",
  itens: [
    {
      titulo: "Informação espalhada",
      texto: "Dados em planilhas, mensagens e sistemas diferentes impedem uma visão confiável do que está acontecendo.",
    },
    {
      titulo: "Retrabalho que virou rotina",
      texto:
        "Gente copiando dados, cobrando retorno e repetindo etapas que poderiam ser eliminadas, integradas ou automatizadas.",
    },
    {
      titulo: "Atividade sem resultado visível",
      texto:
        "A operação funciona, mas ninguém mede com clareza o tempo gasto, onde trava e o que de fato melhorou.",
    },
  ],
};

/** O produto principal. Sem preço e sem prazo: o escopo se define depois da conversa. */
export const SPRINT = {
  rotulo: "Produto principal",
  titulo: "Sprint de Eficiência V2O5",
  texto:
    "Uma intervenção com escopo definido para escolher um processo prioritário, reduzir atrito e medir o que mudou. Sem começar por uma plataforma completa e sem automatizar o caos só para dizer que tem IA.",
  principio:
    "Comprar, integrar, automatizar ou desenvolver: a decisão depende do problema, não da preferência por uma ferramenta.",
  cta: "Escolher um processo",
  etapas: [
    {
      titulo: "Mapear o processo real",
      texto:
        "Entendemos o fluxo atual, as pessoas envolvidas, as falhas, os tempos e o custo do problema. Definimos uma linha de base antes de mexer.",
      entregas: ["Mapa do fluxo", "Gargalo prioritário", "Indicador inicial"],
    },
    {
      titulo: "Simplificar antes de automatizar",
      texto:
        "Tiramos as etapas desnecessárias e desenhamos uma solução proporcional. Nem todo problema pede um agente de IA ou um software novo.",
      entregas: ["Fluxo proposto", "Escopo acordado", "Plano de implementação"],
    },
    {
      titulo: "Implementar a solução",
      texto:
        "Conectamos as ferramentas que já existem e, quando faz sentido, desenvolvemos integrações, automações ou agentes de IA para rodar o novo fluxo.",
      entregas: ["Integrações", "Automação", "Documentação essencial"],
    },
    {
      titulo: "Medir e decidir o próximo passo",
      texto:
        "Comparamos a operação com a linha de base, registramos o que mudou e decidimos se vale otimizar, ampliar ou encerrar.",
      entregas: ["Indicadores", "Leitura de resultado", "Próxima decisão"],
    },
  ],
};

/** Indicadores possíveis. Nenhum percentual: `V2O5_CORE.md`, seção 2. */
export const INDICADORES = {
  sobretitulo: "Resultado antes de vaidade técnica",
  titulo: "O que conta é o que mudou na operação.",
  texto:
    "O indicador depende do problema escolhido. Antes de implementar, combinamos o que acompanhar e como o resultado será observado.",
  itens: [
    { titulo: "Tempo", texto: "Quanto demora para concluir uma tarefa ou mover uma solicitação entre etapas." },
    { titulo: "Retrabalho", texto: "Quantas vezes a informação precisa ser recopiada, corrigida ou pedida de novo." },
    {
      titulo: "Conversão e resposta",
      texto: "Onde os contatos se perdem, quanto demora a resposta e quais oportunidades avançam.",
    },
    {
      titulo: "Visibilidade",
      texto: "Se a equipe entende o estado da operação e age com dados confiáveis.",
    },
  ],
  regra:
    "Não prometemos um percentual de melhoria igual para todos. Definimos uma linha de base, implementamos dentro do escopo acordado e medimos o que os dados disponíveis permitem medir.",
};

/**
 * O resumo do case na home: só o que o case já publica (estoque sincronizado,
 * origem dos leads, integrações comerciais). Os números ficam em `CASE` e na
 * página do case, com fonte e período. A 16ª Vara Cível não aparece aqui.
 */
export const PROJETO = {
  rotulo: "Projeto em ambiente real",
  titulo: "Motors Store",
  texto:
    "Integração de partes da operação comercial de uma revenda de seminovos para aproximar o estoque, a origem dos contatos e o acompanhamento das oportunidades.",
  pilulas: ["Sincronização de estoque", "Rastreamento de leads", "Integrações comerciais"],
  sobretitulo: "Construir, observar, melhorar",
  chamada: "A tecnologia precisa deixar rastro de valor.",
  paragrafo:
    "Os projetos da V2O5 testam hipóteses em operações reais. Implementar é uma parte do trabalho; registrar a linha de base, acompanhar o comportamento e aprender com os dados também é entrega.",
  provas: [
    "Começamos por um gargalo específico, não por uma lista de funcionalidades.",
    "Usamos os sistemas que já existem sempre que resolvem com menos atrito.",
    "Separamos o que foi implementado do que já tem resultado comprovado.",
  ],
  link: "Ler o case completo",
};

/** A escada de oferta. Escopo, preço e prazo só depois de entender o problema. */
export const ESCADA = {
  sobretitulo: "Uma entrada clara, sem escopo infinito",
  titulo: "Começamos pequeno e ampliamos com evidência.",
  texto:
    "Três formas de trabalhar, conforme o estágio da operação. Escopo, valor e prazo se definem depois que o processo é entendido.",
  degraus: [
    {
      tipo: "Etapa inicial",
      titulo: "Diagnóstico de Gargalo",
      texto: "Para quem sabe que algo trava e ainda precisa descobrir onde uma mudança teria mais efeito.",
      saida: "Saída: problema priorizado e plano de ação.",
    },
    {
      tipo: "Produto principal",
      titulo: "Sprint de Eficiência",
      texto: "Para resolver um processo delimitado, com redesenho, implementação e indicadores de acompanhamento.",
      saida: "Saída: solução implementada e forma de medir.",
      destaque: true,
    },
    {
      tipo: "Depois da entrega",
      titulo: "Evolução Monitorada",
      texto: "Para acompanhar o desempenho, corrigir desvios e evoluir o processo com base no uso real.",
      saida: "Saída: melhoria contínua com prioridades claras.",
    },
  ],
};

/** De onde vem o nome (também em `/sobre`). */
export const NOME = {
  rotulo: "Por que V2O5?",
  titulo: "Um catalisador para a mudança.",
  paragrafos: [
    "O nome vem do pentóxido de vanádio, usado como catalisador em processos químicos. A imagem resume como a V2O5 pensa tecnologia: ela não precisa ser o centro da operação, precisa ajudar a mudança a acontecer com menos esforço.",
    "O trabalho começa entendendo como o negócio funciona de fato. Depois a gente liga estratégia, processos e tecnologia para achar o caminho mais simples entre o problema e o resultado.",
  ],
};

/** O fecho da home: o CTA leva ao formulário de `/diagnostico`. */
export const FECHO = {
  titulo: "Qual processo está fazendo a sua operação perder tempo?",
  texto:
    "Não precisa chegar com um briefing grande nem saber qual ferramenta usar. Traga o problema, como ele acontece hoje e o que deveria melhorar. A primeira conversa serve para avaliar se existe um bom caso para trabalhar.",
  botao: "Mapear um gargalo",
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
  | "marca"
  | "painel"
  | "reativacao"
  | "redes"
  | "avaliacoes"
  | "catalogo"
  | "posvenda";

export interface Linha {
  /** A capacidade em `precos.ts` (`CAPACIDADES`), de onde sai o texto de preço. */
  linha: string;
  titulo: string;
  frase: string;
  preco: string;
  href: string;
  etapa: Etapa;
  /** A cena de produto que ilustra o cartão (`Vinhetas.tsx`). */
  vinheta: Vinheta;
}

/**
 * As peças do cardápio que a home mostra em cartão. O preço de cada uma sai
 * de `precoDa`: o plano em que ela mora ou a linha de preço própria. Os
 * pilares (abaixo) decidem a ordem dos cartões na home.
 */
export const LINHAS: Linha[] = [
  {
    linha: "sites",
    titulo: "Sites e presença",
    frase:
      "Carrega rápido no celular, aparece no Google e grava de onde veio cada contato. Hospedagem, manutenção e SEO técnico já na mensalidade.",
    preco: precoDa("sites"),
    href: "/criacao-de-sites",
    etapa: "violeta",
    vinheta: "site",
  },
  {
    linha: "rastreamento",
    titulo: "Rastreamento até a venda",
    frase: "Cada venda com a origem: qual anúncio, qual busca, qual página. Sem isso, a verba vai para onde parece funcionar.",
    preco: precoDa("rastreamento"),
    href: "/rastreamento-de-conversoes",
    etapa: "violeta",
    vinheta: "jornada",
  },
  {
    linha: "googleAds",
    titulo: "Tráfego pago no Google e na Meta",
    frase:
      "Google Ads e Meta Ads por plataforma ou juntos, com anúncios que abrem conversa no WhatsApp e a verba ajustada pela venda registrada no CRM. Quem contrata os dois leva o feed de catálogo. Começa com o rastreamento ligado.",
    preco: precoDa("googleAds"),
    href: "/precos#titulo-trafego",
    etapa: "violeta",
    vinheta: "campanhas",
  },
  {
    linha: "catalogo",
    titulo: "Anúncios de catálogo",
    frase:
      "O estoque ou os produtos viram anúncio no Google (anúncios de veículos e Shopping) e na Meta, e saem do ar quando o item é vendido.",
    preco: precoDa("catalogo"),
    href: "/precos#titulo-trafego",
    etapa: "violeta",
    vinheta: "catalogo",
  },
  {
    linha: "redes",
    titulo: "Conteúdo e gestão de redes sociais",
    frase:
      "Duas redes com perfis configurados e um calendário de 12 publicações por mês feitas do que a empresa já produz: o estoque, os guias, a novidade da semana. Cada post com link rastreado.",
    preco: precoDa("redes"),
    href: "/diagnostico",
    etapa: "violeta",
    vinheta: "redes",
  },
  {
    linha: "avaliacoes",
    titulo: "Avaliações no Google",
    frase:
      "Depois da venda, o cliente recebe no WhatsApp o pedido de avaliação com o link certo, e o painel mostra quem respondeu.",
    preco: precoDa("avaliacoes"),
    href: "/diagnostico",
    etapa: "ambar",
    vinheta: "avaliacoes",
  },
  {
    linha: "agente",
    titulo: "Agente de IA no WhatsApp",
    frase:
      "Responde na hora, a qualquer hora, com as informações do seu negócio. Quando a conversa pede uma pessoa, chama alguém da equipe.",
    preco: precoDa("agente"),
    href: "/agente-de-ia-para-whatsapp",
    etapa: "verde",
    vinheta: "agente",
  },
  {
    linha: "crm",
    titulo: "CRM e sistemas sob medida",
    frase: "Nenhum contato esquecido numa conversa: cada um num funil, com a origem, a etapa e o próximo passo à vista.",
    preco: precoDa("crm"),
    href: "/crm-com-whatsapp",
    etapa: "azul",
    vinheta: "crm",
  },
  {
    linha: "painel",
    titulo: "Painel do dono",
    frase:
      "Funil, verba, custo por lead e vendas por origem numa tela, atualizada todo dia a partir do CRM, do rastreamento e das contas de anúncio. Sem licença por usuário.",
    preco: precoDa("painel"),
    href: "/diagnostico",
    etapa: "azul",
    vinheta: "painel",
  },
  {
    linha: "automacao",
    titulo: "Automação de processos",
    frase: "A tarefa que alguém faz à mão toda semana passa a rodar sozinha entre os sistemas que você já usa.",
    preco: precoDa("automacao"),
    href: "/automacao-com-ia",
    etapa: "azul",
    vinheta: "fluxo",
  },
  {
    linha: "posvenda",
    titulo: "Pós-venda e recorrência",
    frase:
      "Revisão, troca, seguro ou recompra: a régua de retorno manda a mensagem na data certa e devolve o cliente ao funil.",
    preco: precoDa("posvenda"),
    href: "/diagnostico",
    etapa: "ambar",
    vinheta: "posvenda",
  },
  {
    linha: "reativacao",
    titulo: "Reativação de base",
    frase:
      "A sua base de clientes antigos, limpa e segmentada, recebe uma conversa no WhatsApp ou um SMS. Quem responde entra no CRM com a origem.",
    preco: precoDa("reativacao"),
    href: "/diagnostico",
    etapa: "verde",
    vinheta: "reativacao",
  },
];

/** Um serviço do cardápio, como aparece no bento de soluções. */
export interface Servico {
  /** A capacidade em `precos.ts` quando o preço vem da tabela. */
  linha?: string;
  titulo: string;
  frase: string;
  /** O texto de preço da tabela, ou em que plano ele vem incluso. */
  preco: string;
  href: string;
  etapa: Etapa;
  vinheta: Vinheta;
}

const linha = (id: string): Servico => {
  const l = LINHAS.find((x) => x.linha === id);
  if (!l) throw new Error(`Linha sem cartão na home: ${id}`);
  return l;
};

/** Cabeçalho da seção de soluções. */
export const SOLUCOES = {
  titulo: "As peças que o Sprint usa quando o problema pede.",
  apagado: "Cada uma também pode ser contratada avulsa.",
  texto:
    "Tudo com preço publicado e sem fidelidade, em três planos ou avulso. A mensalidade já inclui hospedagem e manutenção, e tudo roda na mesma base: o que entra por uma peça aparece nas outras.",
};

/**
 * As duas metades do H1, cada uma com os serviços que a cumprem. Serviço sem
 * preço próprio na tabela diz em qual linha vem incluso (plano, seção 3.2: o
 * Perfil de Empresa e o SEO técnico estão na fundação dos sites).
 * `tests/conteudo.test.ts` confere. A ordem é a da grade (`Solucoes.tsx`):
 * no mapa, três fileiras de três; na operação, o agente no bloco grande com
 * CRM e painel ao lado, depois automação, reativação e pós-venda, e as
 * integrações numa faixa inteira.
 */
export const PILARES: { id: string; sobretitulo: string; titulo: string; frase: string; servicos: Servico[] }[] = [
  {
    id: "mapa",
    sobretitulo: "No mapa",
    titulo: "Coloque sua empresa no mapa.",
    frase:
      "Quem procura o que você vende acha você ou acha o concorrente. Esta metade cuida de ser você: no Google, no Maps, nos anúncios, nas redes e nas respostas das IAs de busca.",
    servicos: [
      {
        linha: "branding",
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
        preco: "incluso no plano Presença",
        href: "/criacao-de-sites",
        etapa: "violeta",
        vinheta: "perfil",
      },
      {
        titulo: "SEO e busca por IA",
        frase: "Para ranquear no Google e ser citado nas respostas das IAs: SEO técnico, conteúdo e dados estruturados no site.",
        preco: "SEO técnico incluso no plano Presença",
        href: "/criacao-de-sites",
        etapa: "violeta",
        vinheta: "busca",
      },
      linha("sites"),
      linha("googleAds"),
      linha("rastreamento"),
      linha("catalogo"),
      linha("redes"),
      linha("avaliacoes"),
    ],
  },
  {
    id: "operacao",
    sobretitulo: "Operação com IA",
    titulo: "Multiplique a operação com IA.",
    frase:
      "O contato que chega fora do horário recebe resposta na hora e entra no funil com a origem. A equipe começa o dia com o próximo passo pronto, e o dono vê o mês numa tela.",
    servicos: [
      linha("agente"),
      linha("crm"),
      linha("painel"),
      linha("automacao"),
      linha("reativacao"),
      linha("posvenda"),
      {
        linha: "automacao",
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
      "Formado em Administração pela FAE Business School, está na tecnologia desde 1992, quando ganhou um curso num concurso da escola. Em branding, fez a mudança da Top Imóveis para Top Soluções Imobiliárias e assinou o blog da Top até agosto de 2024; na Motors Store, assina os 26 guias do site. É ele quem conduz o diagnóstico gratuito.",
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
  painel: {
    titulo: "Painel do dono",
    atualizacao: "atualizado hoje às 6h",
    indicadores: ["Leads", "Custo por lead", "Vendas"],
    origens: [
      { nome: "Google Ads", largura: "78%" },
      { nome: "Meta Ads", largura: "54%" },
      { nome: "Site", largura: "36%" },
    ],
    fontes: ["CRM", "Rastreamento", "Revenda Mais"],
  },
  reativacao: {
    campanha: "Clientes de 2023",
    canal: "WhatsApp pela API oficial",
    contatos: [
      { nome: "Paulo S.", estado: "respondeu", etapa: "verde" },
      { nome: "Ana L.", estado: "agendou visita", etapa: "ambar" },
      { nome: "Jorge M.", estado: "sem WhatsApp, foi por SMS", etapa: "azul" },
      { nome: "Rita F.", estado: "pediu para sair", etapa: "violeta" },
    ],
  },
  redes: {
    titulo: "Calendário",
    dias: ["seg", "ter", "qua", "qui", "sex", "sáb"],
    posts: [
      { dia: 0, texto: "Carro da semana", rede: "Instagram" },
      { dia: 2, texto: "Guia novo", rede: "Instagram" },
      { dia: 4, texto: "Cliente levou o dele", rede: "Facebook" },
    ],
    rastreado: "link rastreado",
  },
  avaliacoes: {
    mensagem: "Obrigado pela compra, Marina! Se puder, conta como foi o atendimento:",
    link: "g.page/sua-empresa/review",
    avaliacao: { nome: "Marina R.", estrelas: 5, texto: "Atendimento rápido e o carro igual ao anúncio." },
  },
  catalogo: {
    feed: "Feed do estoque",
    estado: "atualizado às 3h",
    itens: [
      { nome: "Onix LT 2022", destinos: ["Google", "Meta"], ativo: true },
      { nome: "HB20 Comfort 2021", destinos: ["Google", "Meta"], ativo: true },
      { nome: "Corolla XEi 2020", destinos: ["vendido, saiu do ar"], ativo: false },
    ],
  },
  posvenda: [
    { icone: "etiqueta", texto: "Venda registrada no CRM" },
    { icone: "relogio", texto: "6 meses: lembrete da revisão" },
    { icone: "conversa", texto: "12 meses: o seguro vence, quer cotar?" },
    { icone: "carro", texto: "24 meses: hora de trocar?" },
  ],
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
    "O pacote é o sistema da Motors Store: site de estoque integrado ao sistema da loja (Revenda Mais, Autoconf e outros), agente de IA no WhatsApp, CRM e rastreamento até a venda.",
  preco: `Plano Completo a partir de ${BRL(plano("completo").implantacao)} de implantação e ${BRL(OFERTA_DO_COMPLETO.mensalidade)} por mês até ${dataBR(OFERTA_DO_COMPLETO.ate)}; depois, ${BRL(plano("completo").mensalidade)}.`,
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
  /** Só dígitos, com o 55 (Dyones, 10/10). Link e rótulo saem daqui (`lib/whatsapp.ts`). */
  whatsapp: "5541998089550",
  /**
   * E-mails públicos (10/10), alias da mesma caixa na Hostinger. O do
   * diagnóstico é a porta de entrada do site, o mesmo lugar para onde todo
   * botão leva, e a resposta automática ao lead sairá dele. O de privacidade
   * é o contato do encarregado que a LGPD (art. 41) manda publicar. Links
   * saem de `lib/email.ts`.
   */
  email: "diagnostico@v2o5.com.br",
  emailPrivacidade: "privacidade@v2o5.com.br",
  /** Fundação da V2O5, pelo Dyones (13/10): dezembro de 2019. Vai para o schema (`foundingDate`) e para `/sobre`. */
  fundacao: "2019-12",
  fundacaoPorExtenso: "dezembro de 2019",
};

/** Assunto pré-preenchido do e-mail, por lugar. */
export const EMAIL = {
  assuntos: {
    diagnostico: "Quero o diagnóstico gratuito",
    privacidade: "Meus dados pessoais",
  },
};

/**
 * O trecho que toda mensagem pronta do WhatsApp carrega. O n8n reconhece o
 * lead do site por ele na primeira mensagem da conversa e marca o contato
 * com `origem = v2o5` (`docs/n8n/origem-do-lead.json`); só contato marcado
 * fala com o agente de IA. Mudar aqui exige mudar nos fluxos.
 */
export const MARCA_DO_SITE = "site da V2O5";

/** Mensagem pré-preenchida do WhatsApp, por página (plano, seção 6.1). */
export const WHATSAPP = {
  mensagens: {
    home: `Olá! Vim pelo ${MARCA_DO_SITE} e quero pedir o diagnóstico gratuito.`,
    precos: `Olá! Vi a página de preços no ${MARCA_DO_SITE} e quero conversar sobre a minha empresa.`,
    diagnostico: `Olá! Vim pelo ${MARCA_DO_SITE} e quero marcar o diagnóstico gratuito.`,
    recebido: `Olá! Acabei de pedir o diagnóstico no ${MARCA_DO_SITE} e quero adiantar a conversa.`,
    revendas: `Olá! Vi a página de revendas no ${MARCA_DO_SITE} e quero conversar sobre a minha loja.`,
    sobre: `Olá! Vi a página Sobre no ${MARCA_DO_SITE} e quero conversar sobre a minha empresa.`,
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
    titulo: "Mensalidade fechada por plano",
    texto: `Três planos de ${BRL(Math.min(...PLANOS.map(mensalidadeDoPlano)))} a ${BRL(Math.max(...PLANOS.map((p) => p.mensalidade)))} por mês, com hospedagem e manutenção dentro. O que cresce com você (usuário, dados, conversas) tem preço publicado. IA e mensagens do WhatsApp pelo valor real, na mesma fatura.`,
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
    resposta: `O site vem no plano Presença, a partir de ${BRL(plano("presenca").implantacao)} de implantação e ${BRL(plano("presenca").mensalidade)} por mês, junto com o Perfil da Empresa no Google, o SEO técnico, o rastreamento até a venda e o pedido de avaliação. A mensalidade cobre hospedagem, manutenção, atualizações de segurança e o relatório mensal. Domínio e e-mail profissional entram na fundação do projeto.`,
  },
  {
    pergunta: "O que a mensalidade inclui?",
    resposta:
      "Hospedagem, manutenção, atualizações de segurança, monitoramento e um relatório mensal. O uso do modelo de IA e as mensagens da API oficial do WhatsApp são cobrados pelo valor real, discriminados na mesma fatura. A verba de anúncios é paga direto ao Google e à Meta. Usuário, dados e conversas acima do que vem incluso têm preço publicado na tabela.",
  },
  {
    pergunta: "Quero o site e o agente. Pago os dois planos?",
    resposta: `Não precisa. O Completo junta a Presença e o Atendimento por ${BRL(plano("completo").mensalidade)} por mês (${BRL(OFERTA_DO_COMPLETO.mensalidade)} até ${dataBR(OFERTA_DO_COMPLETO.ate)}), contra ${BRL(somaDosPlanosSeparados().mensalidade)} dos dois separados, e ainda traz a integração com o sistema de gestão, um fluxo de automação e a implantação do Painel do dono de bônus. Tráfego, conteúdo e módulos ficam fora do plano, com preço publicado.`,
  },
  {
    pergunta: "Tem cobrança por usuário?",
    resposta: `O CRM do Atendimento e do Completo vem com ${USUARIOS_NO_CRM} usuários e o Painel do dono com 3, sem licença por pessoa. Acima disso, cada usuário extra custa ${BRL(DEGRAUS.usuarioExtra)} por mês.`,
  },
  {
    pergunta: "Os preços sobem com o dólar?",
    resposta: `A mensalidade é reajustada uma vez por ano pelo ${REAJUSTE.indice}. Hospedagem, banco de dados e modelos de IA são cobrados em dólar: se a variação cambial passar de ${REAJUSTE.gatilhoCambial}% desde a assinatura, a diferença é repassada só nesses itens, com o cálculo na fatura.`,
  },
  {
    pergunta: "Tem fidelidade ou multa?",
    resposta: `Não. A implantação pode ser paga metade na assinatura e metade na entrega, ou em até ${REGRAS.parcelas} vezes, e a mensalidade cancela quando quiser. Se sair, você recebe o código, os dados e o domínio em até ${REGRAS.diasParaEntregarNaSaida} dias.`,
  },
  {
    pergunta: "Preciso trocar o sistema de gestão que já uso?",
    resposta: `Não. A V2O5 liga o que você já usa. Em produção hoje: o estoque do Revenda Mais sincronizado com o site e o agente da Motors Store. ${listaDeSistemasIntegraveis()} e outros sistemas entram como fluxo de automação, a partir de ${BRL(linhaDePreco("automacao").implantacao!)} por fluxo.`,
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
    pergunta: "Vocês disparam para listas compradas?",
    resposta:
      "Não. A reativação de base usa a base própria da empresa, com registro de origem e saída fácil em toda mensagem. Lista comprada ou raspada fere a LGPD e derruba o número no WhatsApp.",
  },
  {
    pergunta: "Por onde sai a campanha de reativação?",
    resposta:
      "Por SMS, com link rastreado e saída fácil, disparado do painel; ou por WhatsApp, numa campanha operada pela V2O5, pela API oficial ou por um número dedicado à campanha, nunca o principal da empresa. A API oficial cobra por mensagem e limita o volume diário, por isso o canal sai do diagnóstico, pelo tamanho da base. SMS e mensagens pelo valor do provedor, na mesma fatura.",
  },
  {
    pergunta: "Como funciona o diagnóstico gratuito?",
    resposta:
      "São 45 minutos de conversa com o fundador sobre presença, atendimento, operação e funil. Em até 24 horas você recebe um mapa do que fazer primeiro, com custo e prazo, para usar com ou sem a V2O5.",
  },
  {
    pergunta: "A V2O5 atende fora de Curitiba?",
    resposta:
      "Sim. O atendimento é remoto, para empresas de todo o Brasil.",
  },
];
