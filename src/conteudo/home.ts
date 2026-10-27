/**
 * Textos e dados da home, num lugar só para revisar o texto (humanizer) e os
 * números (fonte e período) sem caçar pelos componentes.
 *
 * Regras: português, frases curtas, sem travessão; preço só de `ofertas.ts`
 * e `sprint.ts`, nunca digitado; número do case só com fonte e período
 * (`memory/projects/case-motors.md`), travado por `tests/conteudo.test.ts`.
 */
import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import type { Etapa } from "@/lib/tokens";
import { CONDICOES, METODO } from "@/conteudo/sprint";
import { mensalEmTexto, precoEmTexto } from "@/conteudo/precos";
import { continuidadeAPartirDe, OFERTAS, precoDeEntrada } from "@/conteudo/ofertas";

/**
 * O H1 da home, desde 25/10/2026 (reposicionamento em torno do Sprint de
 * Eficiência, `V2O5_CORE.md`). O de 09/10 e a decisão estão em
 * `memory/decisoes.md`.
 */
export const TITULO_DA_HOME = "Do problema ao resultado, pelo caminho mais simples.";

export const HERO = {
  eyebrow: "Estratégia, processos e tecnologia",
  /** A mensagem central do handoff de 27/10/2026, na voz do site. */
  subtitulo:
    "A V2O5 ajuda empresas a melhorar a marca, a presença digital e a operação, ligando processos e tecnologia ao que o negócio precisa de verdade.",
  /** A vitrine de diagnostico.v2o5.com.br repete esta nota (`tests/subdominio-diagnostico.test.ts`). */
  nota: "Diagnóstico gratuito: 45 minutos de conversa com o fundador para identificar e priorizar um gargalo.",
  principio: "Começamos pelo processo e pelo resultado desejado. A ferramenta vem depois.",
  cta: "Pedir diagnóstico gratuito",
  ctaSecundario: "Ver as quatro soluções",
  conectamos: { rotulo: "Quatro soluções", itens: OFERTAS.map((o) => o.nome) },
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

/** O método do Sprint na home, em seis passos (`METODO` em `sprint.ts`), com o que cada passo deixa. */
const ENTREGAS_DO_METODO = [
  ["Mapa do fluxo", "Linha de base"],
  ["Fluxo proposto"],
  ["Escopo acordado", "Critérios de aceite"],
  ["Integrações", "Automação", "Testes"],
  ["Indicadores"],
  ["Documentação", "Próxima decisão"],
];

export const SPRINT = {
  rotulo: "Sprint de Eficiência",
  titulo: "O método: do processo real à próxima decisão.",
  texto:
    "Um projeto com escopo definido para um gargalo específico. Processo, integração, automação e IA entram como meios, conforme o problema.",
  principio:
    "Comprar, integrar, automatizar ou desenvolver: a decisão depende do problema, não da preferência por uma ferramenta.",
  cta: "Escolher um processo",
  link: "Ver os Sprints e os preços",
  etapas: METODO.map((m, i) => ({ ...m, entregas: ENTREGAS_DO_METODO[i] })),
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
    "Revenda de seminovos em Curitiba, com gargalos diagnosticados em busca, leads, site e acompanhamento comercial. O case mostra o diagnóstico como o antes, o que a V2O5 implementou como o depois e, à parte, o que foi medido.",
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

const entradas = OFERTAS.map(precoDeEntrada);

/**
 * Como começar (27/10/2026): o diagnóstico gratuito, uma das quatro
 * soluções e, se fizer sentido, a continuidade. Valores de `ofertas.ts`.
 */
export const ESCADA = {
  sobretitulo: "Como começar",
  titulo: "Uma conversa, uma solução e, se precisar, a continuidade.",
  texto: "Escopo, valor e prazo ficam por escrito antes de começar.",
  degraus: [
    {
      tipo: "Etapa inicial",
      titulo: "Diagnóstico gratuito",
      texto:
        "Sessão inicial gratuita de 45 minutos para entender o problema e escolher por onde começar. Avalia se existe um projeto viável.",
      saida: "Não inclui mapeamento completo do processo, implementação nem acompanhamento.",
    },
    {
      tipo: "A solução",
      titulo: "Uma das quatro soluções",
      texto:
        "Branding, Presença, Sites ou Sprint, com pacotes de escopo claro. O valor fechado sai em proposta, com entregáveis, exclusões, prazo e custos de terceiros.",
      saida: `Preços de entrada de ${precoEmTexto({ valor: Math.min(...entradas) })} a ${precoEmTexto({ valor: Math.max(...entradas) })}. Nenhuma solução obriga a comprar a seguinte.`,
      href: "/precos",
      destaque: true,
    },
    {
      tipo: "Depois da entrega",
      titulo: "Continuidade, se precisar",
      texto: "Planos opcionais para manter e evoluir o que foi entregue, com horas e prazo de resposta escritos.",
      saida: `Planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}. Não inclui desenvolvimento ilimitado nem novas integrações sem orçamento.`,
      href: "/continuidade",
    },
  ],
  nota: "Bônus por desempenho fica como opção futura do Sprint, só com linha de base, regra de atribuição acordada e dados auditáveis. Não faz parte da oferta padrão.",
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
  titulo: "Por onde a sua empresa precisa começar?",
  texto:
    "Não precisa chegar com um briefing grande nem saber qual solução escolher. Traga o problema, como ele acontece hoje e o que deveria melhorar. A primeira conversa serve para avaliar se existe um bom caso para trabalhar.",
  botao: "Pedir diagnóstico gratuito",
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

export interface ItemDaNavegacao {
  rotulo: string;
  href: string;
  /** Os grupos (Soluções e Continuidade) abrem um painel com estes links. */
  itens?: { rotulo: string; href: string }[];
  /** O último link do painel, para a página do grupo. */
  todos?: string;
}

/** O menu de 27/10/2026: as quatro soluções e a continuidade em grupos, depois preços, case e sobre. */
export const NAVEGACAO: ItemDaNavegacao[] = [
  {
    rotulo: "Soluções",
    href: "/#solucoes",
    todos: "Ver as quatro soluções",
    itens: [
      ...OFERTAS.map((o) => ({ rotulo: o.nome, href: o.rota })),
      { rotulo: "Revendas de veículos", href: "/segmentos/revendas-de-veiculos" },
    ],
  },
  {
    rotulo: "Continuidade",
    href: "/continuidade",
    todos: "Ver a continuidade",
    itens: [
      { rotulo: "Manutenção técnica", href: "/continuidade#manutencao-tecnica" },
      { rotulo: "Conteúdo e campanhas recorrentes", href: "/continuidade#conteudo-e-campanhas" },
      { rotulo: "Monitoramento e otimização", href: "/continuidade#monitoramento-e-otimizacao" },
    ],
  },
  { rotulo: "Preços", href: "/precos" },
  { rotulo: "Case", href: "/cases/motors-store" },
  { rotulo: "Sobre", href: "/sobre" },
];

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
  /** A capacidade em `precos.ts` (`CAPACIDADES`), dado interno: nenhum valor dela é publicado. */
  linha: string;
  titulo: string;
  frase: string;
  href: string;
  etapa: Etapa;
  /** A cena de produto que ilustra o cartão (`Vinhetas.tsx`). */
  vinheta: Vinheta;
}

/**
 * As peças do cardápio que a home mostra em cartão. O preço de cada uma sai
 * a capacidade de `precos.ts` (dado interno, sem valor público). Os pilares
 * (abaixo) decidem a ordem dos cartões na home.
 */
export const LINHAS: Linha[] = [
  {
    linha: "sites",
    titulo: "Sites & Integrações",
    frase:
      "Site próprio, rápido no celular e achado no Google, que grava de onde veio cada contato e se liga ao sistema que você já usa.",
    href: "/criacao-de-sites",
    etapa: "violeta",
    vinheta: "site",
  },
  {
    linha: "rastreamento",
    titulo: "Rastreamento até a venda",
    frase: "Cada venda com a origem: qual anúncio, qual busca, qual página. Sem isso, a verba vai para onde parece funcionar.",
    href: "/rastreamento-de-conversoes",
    etapa: "violeta",
    vinheta: "jornada",
  },
  {
    linha: "googleAds",
    titulo: "Tráfego pago no Google e na Meta",
    frase:
      "Google Ads e Meta Ads com anúncios que abrem conversa no WhatsApp e a verba ajustada pela venda registrada no CRM. Começa com o rastreamento ligado, e a verba é paga direto às plataformas.",
    href: "/diagnostico",
    etapa: "violeta",
    vinheta: "campanhas",
  },
  {
    linha: "catalogo",
    titulo: "Anúncios de catálogo",
    frase:
      "O estoque ou os produtos viram anúncio no Google (anúncios de veículos e Shopping) e na Meta, e saem do ar quando o item é vendido.",
    href: "/diagnostico",
    etapa: "violeta",
    vinheta: "catalogo",
  },
  {
    linha: "redes",
    titulo: "Conteúdo e redes sociais",
    frase:
      "Perfis organizados, modelos com a identidade da empresa e, se quiser, a rotina mensal de conteúdo e campanhas, na Presença Digital Local.",
    href: "/presenca-digital-local",
    etapa: "violeta",
    vinheta: "redes",
  },
  {
    linha: "avaliacoes",
    titulo: "Avaliações no Google",
    frase:
      "Depois da venda, o cliente recebe no WhatsApp o pedido de avaliação com o link certo, e o painel mostra quem respondeu.",
    href: "/diagnostico",
    etapa: "ambar",
    vinheta: "avaliacoes",
  },
  {
    linha: "agente",
    titulo: "Agente de IA no WhatsApp",
    frase:
      "Responde na hora, a qualquer hora, com as informações do seu negócio. Quando a conversa pede uma pessoa, chama alguém da equipe.",
    href: "/agente-de-ia-para-whatsapp",
    etapa: "verde",
    vinheta: "agente",
  },
  {
    linha: "crm",
    titulo: "CRM e sistemas sob medida",
    frase: "Nenhum contato esquecido numa conversa: cada um num funil, com a origem, a etapa e o próximo passo à vista.",
    href: "/crm-com-whatsapp",
    etapa: "azul",
    vinheta: "crm",
  },
  {
    linha: "automacao",
    titulo: "Automação de processos",
    frase: "A tarefa que alguém faz à mão toda semana passa a rodar sozinha entre os sistemas que você já usa.",
    href: "/automacao-com-ia",
    etapa: "azul",
    vinheta: "fluxo",
  },
  {
    linha: "posvenda",
    titulo: "Pós-venda e recorrência",
    frase:
      "Revisão, troca, seguro ou recompra: a régua de retorno manda a mensagem na data certa e devolve o cliente ao funil.",
    href: "/diagnostico",
    etapa: "ambar",
    vinheta: "posvenda",
  },
  {
    linha: "diagnostico",
    titulo: "Diagnóstico e análise de operação",
    frase:
      "Onde o contato se perde, quanto tempo cada etapa leva e o que pesa na rotina. O diagnóstico de presença e a análise do fluxo viram o mapa que decide o escopo do Sprint.",
    href: "/diagnostico",
    etapa: "verde",
    vinheta: "jornada",
  },
  {
    linha: "consultoria",
    titulo: "Consultoria de processos",
    frase: "Desenho do fluxo, regras de passagem entre equipes e rotina de acompanhamento, com o que a equipe já usa antes de comprar qualquer ferramenta.",
    href: "/diagnostico",
    etapa: "azul",
    vinheta: "fluxo",
  },
  {
    linha: "dados",
    titulo: "Indicadores e painéis",
    frase: "Funil, tempo de resposta, custo por contato e vendas por origem numa tela só, atualizada a partir do CRM, do rastreamento e das contas de anúncio.",
    href: "/diagnostico",
    etapa: "azul",
    vinheta: "painel",
  },
];

/** Um serviço do cardápio, como aparece no bento de soluções. */
export interface Servico {
  /** A capacidade em `precos.ts` (dado interno, sem valor público). */
  linha?: string;
  titulo: string;
  frase: string;
  href: string;
  etapa: Etapa;
  vinheta: Vinheta;
}

const linha = (id: string): Servico => {
  const l = LINHAS.find((x) => x.linha === id);
  if (!l) throw new Error(`Linha sem cartão na home: ${id}`);
  return l;
};

/** A seção `#solucoes` da home (27/10/2026): as quatro soluções, de `ofertas.ts`. */
export const SOLUCOES = {
  titulo: "Quatro soluções.",
  apagado: "Escolha pelo problema que você tem.",
  texto:
    "Cada uma resolve um tipo de problema e tem pacotes com preço de referência. Elas se completam, mas nenhuma obriga a comprar a seguinte.",
  continuidade: {
    titulo: "Continuidade",
    texto: "Depois da entrega, planos opcionais para manter e evoluir o que foi entregue, com limites escritos.",
  },
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
    id: "operacao",
    sobretitulo: "Organizar a operação",
    titulo: "Responder rápido e organizar a operação.",
    frase:
      "O contato que chega fora do horário recebe resposta na hora e entra no funil com a origem. A equipe começa o dia com o próximo passo pronto, e o dono vê o mês numa tela.",
    servicos: [
      linha("agente"),
      linha("diagnostico"),
      linha("consultoria"),
      linha("crm"),
      linha("dados"),
      linha("automacao"),
      {
        linha: "automacao",
        titulo: "Integrações entre sistemas",
        frase: "Site, CRM, ERP e os sistemas do seu setor trocando dados sozinhos. Em produção hoje: o estoque do Revenda Mais.",
        href: "/automacao-com-ia",
        etapa: "azul",
        vinheta: "integracoes",
      },
      // A venda e o pós-venda fecham o grupo: a rota da margem só sobe de etapa (26/10/2026).
      linha("posvenda"),
    ],
  },
  {
    id: "mapa",
    sobretitulo: "Trazer mais gente",
    titulo: "De que adianta trazer mais gente se a operação não está pronta?",
    frase:
      "Por isso esta parte vem depois da operação. Com o atendimento respondendo, estas capacidades cuidam de ser você no Google, no Maps, nos anúncios, nas redes e nas respostas das IAs de busca, com a origem de cada contato registrada.",
    servicos: [
      {
        linha: "branding",
        titulo: "Branding e gestão de marca",
        frase:
          "Antes de anunciar, decida o que a marca promete. Posicionamento, identidade visual e tom de voz num guia que vale para o perfil, o site, os anúncios e o atendimento.",
        href: "/diagnostico",
        etapa: "violeta",
        vinheta: "marca",
      },
      {
        titulo: "Perfil da Empresa no Google",
        frase:
          "Quem busca perto de casa vê o Maps antes do site. O antigo Google Meu Negócio, completo e verificado, com a empresa aparecendo na sua região.",
        href: "/criacao-de-sites",
        etapa: "violeta",
        vinheta: "perfil",
      },
      {
        titulo: "SEO e busca por IA",
        frase: "Para ranquear no Google e ser citado nas respostas das IAs: SEO técnico, conteúdo e dados estruturados no site.",
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
  /** A etapa do funil. Nas camadas, a mais próxima: ela não aparece, só o rótulo da camada. */
  etapa: Etapa;
  /**
   * Camada: acompanha o caminho inteiro em vez de ser uma parada nele. A
   * ordem das paradas é a do funil (atração, atendimento, gestão, venda); o
   * rastreamento não é uma parada: grava a origem na entrada e devolve a
   * venda ao anúncio (atribuição em ciclo fechado), e a automação liga as peças.
   */
  camada?: string;
  texto: string;
  /** O caminho que acende quando esta peça é escolhida (só paradas). */
  caminho: IdDaPeca[];
}

/**
 * Corrigido em 26/10/2026 (Dyones: "não pode haver atração na ponta final do
 * funil"). As cinco paradas seguem a ordem do funil de mercado (consciência e
 * consideração, qualificação, oportunidade, conversão); as duas camadas vêm
 * depois, separadas. Referências: ciclo de vida do lead (lead, qualificado,
 * oportunidade, cliente) e atribuição em ciclo fechado.
 */
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
    caminho: ["whatsapp", "agente", "crm"],
  },
  {
    id: "crm",
    nome: "CRM",
    etapa: "azul",
    texto: "O funil onde cada lead aparece com a origem e o próximo passo, de contato qualificado a oportunidade.",
    caminho: ["agente", "crm", "venda"],
  },
  {
    id: "venda",
    nome: "Venda",
    etapa: "ambar",
    texto: "O fechamento registrado no CRM, com a origem conhecida. É daqui que a conversão volta para o anúncio.",
    caminho: ["crm", "venda"],
  },
  {
    id: "n8n",
    nome: "n8n",
    etapa: "azul",
    camada: "Liga as peças",
    texto: "É a automação entre os sistemas. Atualiza o estoque no site e avisa a equipe quando entra um lead.",
    caminho: ["site", "agente", "crm"],
  },
  {
    id: "rastreamento",
    nome: "Rastreamento",
    etapa: "violeta",
    camada: "Origem na entrada, venda de volta ao anúncio",
    texto:
      "Grava de onde veio cada contato na entrada e, quando a venda é registrada no CRM, devolve a conversão para Google e Meta. Fecha o ciclo: a verba aprende com o que virou venda.",
    caminho: ["site", "whatsapp", "crm", "venda"],
  },
];

/** As cinco paradas, na ordem do funil, e as duas camadas que acompanham o caminho inteiro. */
export const PARADAS = PECAS.filter((p) => !p.camada);
export const CAMADAS = PECAS.filter((p) => p.camada);

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
    "O modelo parte do sistema da Motors Store: site de estoque integrado ao sistema da loja (Revenda Mais, Autoconf e outros), agente de IA no WhatsApp, CRM e rastreamento até a venda.",
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

/** A assinatura institucional desde 25/10/2026 (rodapé, `/sobre`, schema, `llms.txt`). */
export const ASSINATURA = "V2O5 | Eficiência comercial e operacional com tecnologia.";

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

/** Chamada curta entre seções: a pergunta que o dono está se fazendo e o botão. */
export const CHAMADA = {
  depoisDasSolucoes: {
    titulo: "Quer saber qual gargalo atacar primeiro?",
    texto: "O diagnóstico é gratuito: 45 minutos com o fundador para identificar e priorizar um gargalo, sem compromisso.",
  },
  depoisDoCase: {
    titulo: "Quer o mesmo sistema na sua empresa?",
    texto: "A conversa de 45 minutos é com o fundador, que montou o da Motors Store.",
  },
  botao: "Pedir diagnóstico gratuito",
};

/**
 * As perguntas que o dono faz antes de contratar. Viram FAQPage no schema.
 * Desde 27/10/2026 os valores saem de `ofertas.ts` e `sprint.ts`; nenhuma
 * resposta digita preço (`tests/precos-publicos.test.ts`).
 */
export const PERGUNTAS = [
  {
    pergunta: "Quanto custa?",
    resposta: `O diagnóstico inicial, de 45 minutos, é gratuito. Os preços de entrada são ${OFERTAS.map((o) => `${o.nome} ${precoEmTexto({ valor: precoDeEntrada(o), aPartirDe: true })}`).join(", ")}, e a continuidade tem planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}. São preços de referência: o valor fechado sai em proposta, para um escopo conhecido.`,
  },
  {
    pergunta: "Preciso contratar tudo?",
    resposta:
      "Não. Cada solução resolve um tipo de problema e funciona sozinha. Elas se completam, e o diagnóstico ajuda a escolher por onde começar. A continuidade também é opcional.",
  },
  {
    pergunta: "O que um Sprint entrega?",
    resposta:
      "Um projeto fechado para um gargalo delimitado: mapeamento do fluxo atual, priorização, implementação da solução acordada, testes e comparação dos indicadores disponíveis antes e depois. A proposta define o problema, os entregáveis, as exclusões, o prazo, as responsabilidades do cliente e os critérios de aceite.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta: `No Sprint: ${CONDICOES.itens[1].texto.replace(/^E/, "e")} Nas outras soluções, as condições saem na proposta.`,
  },
  {
    pergunta: "E depois da entrega?",
    resposta: `A implantação termina na entrega. Se o que foi entregue continua rodando, a continuidade cuida dele, em contrato à parte e com horas e prazo de resposta escritos, com planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}. Banco de dados, servidor dedicado, IA e mensagens ficam por fora, pelo valor do provedor, e a V2O5 gerencia. Nenhum plano cobre desenvolvimento ilimitado.`,
  },
  {
    pergunta: "Preciso trocar o sistema de gestão que já uso?",
    resposta: `Não. A V2O5 liga o que você já usa. Em produção hoje: o estoque do Revenda Mais sincronizado com o site e o agente da Motors Store. ${listaDeSistemasIntegraveis()}, entre outros, entram como integração, depois de verificar a documentação e o acesso de cada um.`,
  },
  {
    pergunta: "O agente de IA atende sozinho?",
    resposta:
      "Responde na hora com as informações do seu negócio e, quando a conversa pede uma pessoa, chama alguém da equipe. A conversa fica registrada no CRM, com a origem do contato.",
  },
  {
    pergunta: "Vocês fazem tráfego pago sem rastreamento?",
    resposta:
      "Não. Sem rastreamento até a venda, a campanha otimiza pelo formulário preenchido, e verba vai para o anúncio que gera contato barato, mesmo quando ele vende pouco. A gestão de tráfego entra num projeto só com o rastreamento ligado, e a verba é paga direto às plataformas.",
  },
  {
    pergunta: "Como funciona o diagnóstico gratuito?",
    resposta:
      "São 45 minutos de conversa com o fundador sobre marca, presença, atendimento, operação e funil, para identificar e priorizar o problema e avaliar se existe um projeto viável. A sessão não inclui mapeamento completo do processo, implementação nem acompanhamento de resultados. Havendo um bom caso, o próximo passo é a proposta da solução que cabe no problema, com escopo, entregáveis, prazo e investimento.",
  },
  {
    pergunta: "A V2O5 atende fora de Curitiba?",
    resposta:
      "Sim. O atendimento é remoto, para empresas de todo o Brasil.",
  },
];
