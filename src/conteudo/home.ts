/**
 * Textos e dados da home, num lugar só para revisar o texto (humanizer) e os
 * números (fonte e período) sem caçar pelos componentes.
 *
 * Regras: português, frases curtas, sem travessão; preço só de `ofertas.ts`,
 * nunca digitado; número do case só com fonte e período
 * (`memory/projects/case-motors.md`), travado por `tests/conteudo.test.ts`.
 */
import { listaDeSistemasIntegraveis } from "@/conteudo/diagnostico";
import type { Etapa } from "@/lib/tokens";
import { mensalEmTexto, precoEmTexto } from "@/conteudo/precos";
import { continuidadeAPartirDe, OFERTAS, precoDeEntrada } from "@/conteudo/ofertas";

/**
 * O H1 da home, desde 25/11/2026 (foco em pequenos negócios,
 * `docs/2026-11-25-foco-pequenos-negocios.md`). Os de 09/10 e 25/10 e as
 * decisões estão em `memory/decisoes.md`.
 */
export const TITULO_DA_HOME = "Coloque seu negócio no mapa e cuide de cada cliente que chega.";

export const HERO = {
  eyebrow: "Digitalização para pequenos negócios",
  /** O foco de 25/11/2026, na voz do site. */
  subtitulo:
    "A V2O5 deixa o seu negócio fácil de achar no Google e organiza o WhatsApp para nenhum cliente ficar sem resposta.",
  /** A vitrine de diagnostico.v2o5.com.br repete esta nota (`tests/subdominio-diagnostico.test.ts`). */
  nota: "Diagnóstico gratuito: 45 minutos de conversa com o fundador para ver onde o seu negócio perde cliente.",
  principio: "Começamos pelo cliente que você quer atender melhor. A ferramenta vem depois.",
  cta: "Pedir diagnóstico gratuito",
  ctaSecundario: "Ver as três soluções",
  conectamos: { rotulo: "Três soluções", itens: OFERTAS.map((o) => o.nome) },
};

/** O problema do pequeno negócio, antes da ferramenta (25/11/2026). */
export const DORES = {
  titulo: "O cliente procura, chama e às vezes desiste.",
  apagado: "Quase sempre por um detalhe que dá para arrumar.",
  texto:
    "Perfil desatualizado, mensagem que demora, cliente que comprou uma vez e nunca mais apareceu. A V2O5 começa por esses detalhes.",
  itens: [
    {
      titulo: "Difícil de achar",
      texto: "Perfil no Google sem horário, sem foto ou com o telefone antigo. Quem procura perto de casa acaba no vizinho.",
    },
    {
      titulo: "Resposta que demora",
      texto:
        "A mensagem chega no WhatsApp à noite ou no meio do movimento e fica para depois. Quando a resposta sai, o cliente já comprou em outro lugar.",
    },
    {
      titulo: "Cliente que não volta",
      texto: "Ninguém lembra de quem comprou nem de chamar de novo na hora certa. A venda seguinte fica por conta do acaso.",
    },
  ],
};

/** Indicadores possíveis. Nenhum percentual: `V2O5_CORE.md`, seção 2. */
export const INDICADORES = {
  sobretitulo: "Resultado antes de vaidade técnica",
  titulo: "O que conta é o cliente bem atendido.",
  texto:
    "O que acompanhar depende do problema do seu negócio. Antes de começar, a gente combina o que vai olhar e como.",
  itens: [
    { titulo: "Tempo de resposta", texto: "Quanto demora a primeira resposta no WhatsApp, no horário e fora dele." },
    { titulo: "Contatos perdidos", texto: "Quantas conversas ficam sem resposta ou sem próximo passo." },
    { titulo: "Avaliações", texto: "Quantas avaliações novas chegam ao Google e o que os clientes contam nelas." },
    { titulo: "Clientes que voltam", texto: "Quantos clientes compram de novo depois do primeiro contato." },
  ],
  regra:
    "Ninguém aqui promete um percentual de melhoria. A gente anota como está hoje e, depois da entrega, compara com o que os dados mostram.",
};

/**
 * Os dois cases na home, com o mesmo peso (25/11/2026), os dois como
 * atendimento: só o que cada case já publica. Os números ficam nas páginas
 * dos cases, com fonte e período.
 */
export const PROJETO = {
  rotulo: "Cases",
  titulo: "Dois atendimentos no ar.",
  apagado: "Um no comércio, outro no serviço público.",
  cases: [
    {
      nome: "Motors Store",
      texto:
        "Revenda de seminovos em Curitiba. O site se liga ao estoque, o agente de IA atende no WhatsApp e cada cliente chega pronto, com a ficha preenchida, ao CRM do Revenda Mais.",
      pilulas: ["Site ligado ao estoque", "Agente de IA no WhatsApp", "Cliente no CRM do Revenda Mais"],
      link: "Ler o case da Motors Store",
      href: "/cases/motors-store",
    },
    {
      nome: "16ª Vara Cível de Curitiba",
      texto:
        "Um WhatsApp para os onze setores e o gabinete. A triagem pergunta o assunto e entrega cada conversa ao setor certo, com os dados preenchidos.",
      pilulas: ["Triagem no WhatsApp", "Conversa no setor certo", "Sempre com saída para uma pessoa"],
      link: "Ler o case da 16ª Vara Cível",
      href: "/cases/16-vara-civel",
    },
  ],
  provas: [
    "Começamos pelo cliente que precisa ser atendido, não por uma lista de funcionalidades.",
    "Usamos os sistemas que já existem sempre que resolvem com menos atrito.",
    "Separamos o que foi implementado do que já tem resultado medido.",
  ],
};

const entradas = OFERTAS.map(precoDeEntrada);

/**
 * Como começar (27/10/2026): o diagnóstico gratuito, uma das
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
        "45 minutos com o fundador para ver onde o seu negócio perde cliente e por onde começar. Se não houver um bom caso, a conversa termina ali.",
      saida: "Não inclui implementação nem acompanhamento de resultados.",
    },
    {
      tipo: "A solução",
      titulo: "Uma das três soluções",
      texto:
        "Presença, Sites ou Atendimento com IA, com pacotes de escopo claro. O valor fechado sai em proposta, com entregáveis, exclusões, prazo e custos de terceiros.",
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
};

/** De onde vem o nome (também em `/sobre`). */
export const NOME = {
  rotulo: "Por que V2O5?",
  titulo: "Um catalisador para a mudança.",
  paragrafos: [
    "O nome vem do pentóxido de vanádio, usado como catalisador em processos químicos: ele acelera a reação sem virar o produto final. É assim que a V2O5 usa a tecnologia no seu negócio, para a mudança acontecer com menos esforço.",
    "O trabalho começa entendendo como o negócio funciona de fato: como o cliente acha a empresa e como ele é atendido. Depois a gente põe a tecnologia que resolve isso, num formato que a equipe consegue usar no dia a dia.",
  ],
};

/** O fecho da home: o CTA leva ao formulário de `/diagnostico` (texto no foco em pequenos negócios desde 26/11/2026). */
export const FECHO = {
  titulo: "Onde o seu negócio está perdendo cliente?",
  texto:
    "Não precisa saber qual solução escolher. Conte como o cliente acha o seu negócio e como ele é atendido no WhatsApp. Em 45 minutos, o fundador mostra onde você perde cliente e por onde começar, sem custo e sem compromisso.",
  botao: "Pedir diagnóstico gratuito",
};

/**
 * Integrações em produção no sistema da Motors Store (`case-motors.md`).
 * Regra de `oferta.md`: integração só aparece quando roda em produção.
 * Nome em texto, nunca logotipo.
 */
export const FERRAMENTAS = {
  rotulo: "Em produção na Motors Store",
  nomes: ["WhatsApp", "n8n", "Revenda Mais"],
} as const;

export interface ItemDaNavegacao {
  rotulo: string;
  href: string;
  /** Os grupos (Soluções e Continuidade) abrem um painel com estes links. */
  itens?: { rotulo: string; href: string }[];
  /** O último link do painel, para a página do grupo. */
  todos?: string;
}

/** O menu de 27/10/2026 (três soluções desde 12/11, dois cases desde 17/11): as soluções, a continuidade e os cases em grupos, depois preços e sobre. */
export const NAVEGACAO: ItemDaNavegacao[] = [
  {
    rotulo: "Soluções",
    href: "/#solucoes",
    todos: "Ver as três soluções",
    // Só as três soluções. Revendas de veículos é exemplo, não produto
    // (17/11/2026): a página segue no ar, ligada pelo rodapé (grupo Empresa).
    itens: OFERTAS.map((o) => ({ rotulo: o.nome, href: o.rota })),
  },
  {
    rotulo: "Continuidade",
    href: "/continuidade",
    todos: "Ver a continuidade",
    itens: [
      { rotulo: "Manutenção técnica", href: "/continuidade#manutencao-tecnica" },
      { rotulo: "Monitoramento e otimização", href: "/continuidade#monitoramento-e-otimizacao" },
    ],
  },
  { rotulo: "Preços", href: "/precos" },
  {
    rotulo: "Cases",
    href: "/#case",
    itens: [
      { rotulo: "Motors Store", href: "/cases/motors-store" },
      { rotulo: "16ª Vara Cível", href: "/cases/16-vara-civel" },
    ],
  },
  { rotulo: "Sobre", href: "/sobre" },
];

/**
 * As quatro etapas do caminho do cliente, nas quatro cores do vanádio
 * (26/11/2026, aprovado pelo Dyones; antes, Atração, Atendimento, Gestão e
 * Venda). A etiqueta de uma página diz a etapa dela (`fase`), que pode não
 * ser a da cor: a Presença é verde e fala de ser achado.
 */
export const NOME_DA_ETAPA: Record<Etapa, string> = {
  violeta: "Ser achado",
  verde: "Responder",
  azul: "Organizar",
  ambar: "Voltar a comprar",
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
  /** A etapa que a etiqueta mostra, quando não é a da cor (`NOME_DA_ETAPA`). */
  fase?: Etapa;
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
      "Link direto e mensagem pronta para pedir a avaliação a quem comprou, na Presença Digital Local. Avaliação recente pesa na busca do bairro.",
    href: "/presenca-digital-local",
    etapa: "ambar",
    fase: "violeta",
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
    titulo: "CRM com WhatsApp",
    frase: "Nenhum cliente esquecido numa conversa: cada um com a origem e o histórico, e o aviso de quando chamar de novo.",
    href: "/crm-com-whatsapp",
    etapa: "azul",
    vinheta: "crm",
  },
  {
    linha: "automacao",
    titulo: "Automação de tarefas",
    frase: "A tarefa que alguém faz à mão toda semana passa a rodar sozinha entre os sistemas que você já usa.",
    href: "/automacao-com-ia",
    etapa: "azul",
    vinheta: "fluxo",
  },
  {
    linha: "posvenda",
    titulo: "Pós-venda e recorrência",
    frase:
      "Contato de volta com quem já comprou, na hora da recompra ou do retorno, no Atendimento Integrado. Só para quem consentiu, dentro das regras do WhatsApp.",
    href: "/agente-de-ia-para-whatsapp#titulo-pacotes",
    etapa: "ambar",
    vinheta: "posvenda",
  },
  {
    linha: "diagnostico",
    titulo: "Diagnóstico gratuito",
    frase:
      "Como o cliente acha o seu negócio hoje, quanto espera pela resposta no WhatsApp e onde desiste. São 45 minutos com o fundador para ver por onde começar.",
    href: "/diagnostico",
    etapa: "verde",
    vinheta: "jornada",
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

/** A seção `#solucoes` da home (27/10/2026; três desde 12/11): as soluções de `ofertas.ts`. */
export const SOLUCOES = {
  titulo: "Três soluções.",
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
 * `tests/conteudo.test.ts` confere. Desde 12/11/2026 o mapa não tem
 * branding nem tráfego pago (saíram do portfólio). Na operação, o agente no bloco grande com
 * CRM e painel ao lado, depois automação, reativação e pós-venda, e as
 * integrações numa faixa inteira.
 */
export const PILARES: { id: string; sobretitulo: string; titulo: string; frase: string; servicos: Servico[] }[] = [
  {
    id: "mapa",
    sobretitulo: "Colocar no mapa",
    titulo: "Ser encontrado por quem procura perto.",
    frase:
      "O negócio aparece certo no Google, no Maps, nas redes e nas respostas das IAs de busca, com a origem de cada contato registrada.",
    servicos: [
      {
        titulo: "Perfil da Empresa no Google",
        frase:
          "Quem busca perto de casa vê o Maps antes do site. O antigo Google Meu Negócio, completo e verificado, com a empresa aparecendo na sua região.",
        href: "/presenca-digital-local",
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
      linha("redes"),
      linha("avaliacoes"),
    ],
  },
  {
    id: "operacao",
    sobretitulo: "Cuidar de cada cliente",
    titulo: "Responder rápido e não perder ninguém.",
    frase:
      "A mensagem que chega fora do horário recebe resposta na hora e vai para a pessoa certa, com a origem. Quem já comprou recebe o contato de volta na hora certa.",
    servicos: [
      linha("agente"),
      linha("diagnostico"),
      linha("crm"),
      linha("automacao"),
      {
        linha: "automacao",
        titulo: "Integrações entre sistemas",
        frase: "Site, CRM, agenda e os sistemas do seu setor trocando dados sozinhos. Em produção hoje: o estoque do Revenda Mais.",
        href: "/automacao-com-ia",
        etapa: "azul",
        vinheta: "integracoes",
      },
      linha("posvenda"),
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
      acao: "Uma promessa só, dita do mesmo jeito no Google, nas redes, no site e na conversa com o agente.",
      base: { tipo: "Experiência", texto: "Rebranding da Top Imóveis para Top Soluções Imobiliárias" },
    },
    {
      nome: "Marketing",
      pergunta: "Quem encontra você?",
      acao: "Google, Maps e redes com a informação certa para quem já procura o que você vende.",
      base: { tipo: "Prática", texto: "Conteúdo e SEO da Motors Store" },
    },
    {
      nome: "Vendas",
      pergunta: "Quem responde, e quando?",
      acao: "O agente de IA responde na hora e passa ao vendedor a conversa, o interesse e a origem do cliente.",
      base: { tipo: "Prática", texto: "Atendimento e CRM da Motors Store" },
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
      "Formado em Administração pela FAE Business School, está na tecnologia desde 1992, quando ganhou um curso num concurso da escola. Fez a mudança de marca da Top Imóveis para Top Soluções Imobiliárias e assinou o blog da Top até agosto de 2024; na Motors Store, assina os 26 guias do site. É ele quem conduz o diagnóstico gratuito.",
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
      origem: "veio do Google",
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
    { coluna: "Novo", etapa: "violeta", cartoes: [["Banho e tosa", "Instagram"], ["Ração 15 kg", "Site"]] },
    { coluna: "Atendimento", etapa: "verde", cartoes: [["Consulta de rotina", "Google"]] },
    { coluna: "Venda", etapa: "ambar", cartoes: [["Pacote mensal", "Indicação"]] },
  ],
  fluxo: [
    { icone: "raio", texto: "Venda marcada no CRM" },
    { icone: "janela", texto: "Produto sai da vitrine do site" },
    { icone: "conversa", texto: "Cliente recebe o obrigado" },
    { icone: "sinal", texto: "Pedido de avaliação no dia seguinte" },
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
    avaliacao: { nome: "Marina R.", estrelas: 5, texto: "Atendimento rápido e tudo como combinado." },
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

/**
 * A demonstração da página do Atendimento com IA, desde 25/11/2026 num pet
 * shop de exemplo (antes, uma revenda com anúncio): a resposta fora do
 * horário, o que acontece sozinho depois e o contato de volta com quem já
 * comprou. Dados fictícios, sem preço.
 */
export const FRENTES: Frente[] = [
  {
    id: "agente",
    aba: "Agente de IA",
    resumo: "Uma mensagem chega no WhatsApp do pet shop às 21h e é respondida na hora.",
    passos: [
      {
        tipo: "entrada",
        autor: "Cliente",
        hora: "21:14",
        texto: "Boa noite! Vocês têm horário de banho e tosa no sábado?",
      },
      {
        tipo: "sistema",
        titulo: "Agente consulta a base",
        detalhes: ["Agenda: sábado às 9h e às 14h livres", "Serviço: banho e tosa, porte pequeno ou médio"],
        etapa: "verde",
      },
      {
        tipo: "saida",
        autor: "Agente de IA",
        hora: "21:14",
        texto: "Temos sim! Sábado às 9h ou às 14h. Qual é o porte do seu pet?",
      },
    ],
    crm: {
      titulo: "Banho e tosa",
      campos: [
        { rotulo: "Origem", valor: "Google, Perfil da Empresa" },
        { rotulo: "Interesse", valor: "Sábado às 9h" },
        { rotulo: "Responsável", valor: "Agente de IA" },
      ],
      etapa: "verde",
      etiqueta: "Em atendimento",
    },
  },
  {
    id: "automacao",
    aba: "Automação",
    resumo: "O banho termina e o resto acontece sem ninguém digitar nada.",
    passos: [
      {
        tipo: "sistema",
        titulo: "Agenda: atendimento concluído",
        detalhes: ["Banho e tosa da Luna, por Carla"],
        etapa: "azul",
      },
      {
        tipo: "sistema",
        titulo: "Fluxo no n8n começa",
        detalhes: ["Equipe: aviso de pet pronto", "Cliente: horário de retirada"],
        etapa: "azul",
      },
      {
        tipo: "saida",
        autor: "WhatsApp automático",
        hora: "16:02",
        texto: "A Luna está pronta! Pode buscar até as 18h.",
      },
      {
        tipo: "sistema",
        titulo: "Pedido de avaliação",
        detalhes: ["No dia seguinte, com o link direto do Google"],
        etapa: "ambar",
      },
    ],
    crm: {
      titulo: "Banho e tosa",
      campos: [
        { rotulo: "Origem", valor: "Google, Perfil da Empresa" },
        { rotulo: "Desfecho", valor: "Concluído" },
        { rotulo: "Próximo contato", valor: "Daqui a um mês" },
      ],
      etapa: "ambar",
      etiqueta: "Venda",
    },
  },
  {
    id: "retorno",
    aba: "Contato de volta",
    resumo: "Quem comprou ração no mês passado recebe a lembrança na hora certa.",
    passos: [
      {
        tipo: "sistema",
        titulo: "Lembrete do mês",
        detalhes: ["Ração comprada há um mês", "Cliente aceitou receber lembretes"],
        etapa: "ambar",
      },
      {
        tipo: "saida",
        autor: "WhatsApp automático",
        hora: "10:00",
        texto: "Oi, Ana! A ração da Luna deve estar acabando. Quer que a gente separe outro saco?",
      },
      {
        tipo: "entrada",
        autor: "Cliente",
        hora: "10:12",
        texto: "Quero sim, busco amanhã.",
      },
      {
        tipo: "sistema",
        titulo: "Pedido separado",
        detalhes: ["Equipe avisada no WhatsApp", "Retirada de amanhã registrada"],
        etapa: "azul",
      },
    ],
    crm: {
      titulo: "Ração",
      campos: [
        { rotulo: "Origem", valor: "Cliente da loja" },
        { rotulo: "Desfecho", valor: "Recompra" },
        { rotulo: "Próximo contato", valor: "Daqui a um mês" },
      ],
      etapa: "ambar",
      etiqueta: "Venda",
    },
  },
];

// ---------------------------------------------------------------------------
// Case Motors Store
// ---------------------------------------------------------------------------

/**
 * Só número lido do banco da Motors, com período declarado. Fonte:
 * `memory/projects/case-motors.md` (leitura de 17/11/2026; a tabela de
 * leads começa em 05/09/2026).
 */
export const CASE = {
  fonte: "Banco de dados da Motors Store, lido em 17/11/2026. Leads contados de 05/09 a 17/11/2026.",
  numeros: [
    { valor: 26, complemento: "", texto: "guias publicados, assinados pelo fundador da V2O5" },
    { valor: 148, complemento: "", texto: "veículos sincronizados com o estoque do Revenda Mais" },
  ],
};

/**
 * Revendas de veículos como exemplo (17/11/2026): a seção da home saiu, e o
 * automotivo fica como o case da Motors Store e a página de exemplo. Este
 * bloco alimenta só o `llms.txt`.
 */
export const AUTOMOTIVO = {
  titulo: "Para revendas de veículos",
  texto:
    "As mesmas soluções de qualquer negócio, na revenda, a partir do que roda na Motors Store: site ligado ao estoque do sistema da loja (Revenda Mais, Autoconf e outros) e agente de IA que atende no WhatsApp e passa cada cliente ao CRM da loja.",
  href: "/segmentos/revendas-de-veiculos",
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
  /** Perfis oficiais (Dyones, 28/10). Entram no `sameAs` do schema. */
  redes: {
    instagram: "https://www.instagram.com/v2o5_consultoria/",
    linkedin: "https://www.linkedin.com/company/v2o5-consutoria/",
  },
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

/** A assinatura institucional desde 25/11/2026 (rodapé, `/sobre`, schema, `llms.txt`); a de 25/10 está em `memory/decisoes.md`. */
export const ASSINATURA = "V2O5 | Digitalização para pequenos negócios.";

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
    titulo: "Quer saber por onde começar?",
    texto: "O diagnóstico é gratuito: 45 minutos com o fundador para ver o que mais pesa no seu negócio, sem compromisso.",
  },
  depoisDoCase: {
    titulo: "Quer o mesmo cuidado com os seus clientes?",
    texto: "A conversa de 45 minutos é com o fundador, que montou o atendimento dos dois cases.",
  },
  botao: "Pedir diagnóstico gratuito",
};

/**
 * As perguntas que o dono faz antes de contratar. Viram FAQPage no schema.
 * Desde 27/10/2026 os valores saem de `ofertas.ts`; nenhuma
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
    pergunta: "O que o Atendimento com IA entrega?",
    resposta:
      "O WhatsApp organizado, um agente de IA que responde com as informações do seu negócio e passa a conversa à pessoa certa, e a lista de contatos com a origem. No Atendimento Integrado, o agente também faz as perguntas do seu negócio, agenda ou encaminha, leva cada contato ao sistema que você já usa e chama de volta quem já comprou, só para quem consentiu.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta: "As condições saem na proposta, com o escopo, os entregáveis, o prazo e os custos de terceiros por escrito.",
  },
  {
    pergunta: "E depois da entrega?",
    resposta: `A implantação termina na entrega. Se o que foi entregue continua rodando, a continuidade cuida dele, em contrato à parte e com horas e prazo de resposta escritos, com planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}. Banco de dados, servidor dedicado, IA e mensagens ficam por fora, pelo valor do provedor, e a V2O5 gerencia. Nenhum plano cobre desenvolvimento ilimitado.`,
  },
  {
    pergunta: "Preciso trocar o sistema que já uso?",
    resposta: `Não. A V2O5 liga o que você já usa: a agenda, o catálogo, o estoque ou o CRM, depois de verificar a documentação e o acesso de cada um. Em produção hoje: o estoque do Revenda Mais sincronizado com o site e o agente da Motors Store. Na revenda de veículos, ${listaDeSistemasIntegraveis()} entram do mesmo jeito.`,
  },
  {
    pergunta: "O agente de IA atende sozinho?",
    resposta:
      "Responde na hora com as informações do seu negócio e, quando a conversa pede uma pessoa, chama alguém da equipe. A conversa fica registrada na lista de contatos, com a origem de cada um.",
  },
  {
    pergunta: "Vocês fazem tráfego pago?",
    resposta:
      "Não. A V2O5 cuida de o negócio ser encontrado no Google e de atender bem quem chega. Quem anuncia segue com a própria campanha, e o site grava de onde veio cada contato.",
  },
  {
    pergunta: "Como funciona o diagnóstico gratuito?",
    resposta:
      "São 45 minutos de conversa com o fundador sobre como o cliente acha o seu negócio, como ele é atendido no WhatsApp e os sistemas que você já usa, para ver onde você perde cliente e por onde começar. A sessão não inclui implementação nem acompanhamento de resultados. Havendo um bom caso, o próximo passo é a proposta da solução que cabe no problema, com escopo, entregáveis, prazo e investimento.",
  },
  {
    pergunta: "A V2O5 atende fora de Curitiba?",
    resposta:
      "Sim. O atendimento é remoto, para pequenos negócios de todo o Brasil.",
  },
];
