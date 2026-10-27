/**
 * O portfólio da V2O5 desde 27/10/2026 (Dyones, "Handoff mestre:
 * reposicionamento comercial, portfólio e política inicial de preços"):
 * quatro soluções com preço de referência público e a continuidade, à parte
 * e opcional. Este arquivo tem Branding, Presença, Sites e a continuidade; o
 * Sprint mora em `sprint.ts` e entra aqui pela mesma interface.
 *
 * Regras que valem para tudo: preço de referência para testar
 * comercialmente, com o valor fechado em proposta para um escopo conhecido;
 * nenhum escopo ilimitado; cada pacote diz para quem é, o que inclui e o que
 * fica de fora; nenhuma solução obriga a comprar a seguinte. Todo "R$"
 * público sai daqui ou de `sprint.ts` (`tests/precos-publicos.test.ts`), e
 * `memory/context/oferta.md` repete os mesmos números (`tests/ofertas.test.ts`).
 *
 * As quantidades de revisões, peças, canais, páginas, horas e prazos de
 * resposta são o rascunho de 27/10 que o Dyones aprova no preview
 * (`oferta.md`, "Rascunhos que esperam aprovação").
 */
import { mensalEmTexto, type Preco } from "@/conteudo/precos";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import type { Etapa } from "@/lib/tokens";

export { mensalEmTexto, precoEmTexto, type Preco } from "@/conteudo/precos";

export interface Pacote {
  nome: string;
  preco: Preco;
  /** A mensalidade opcional que acompanha o pacote (Presença) e o que ela cobre. */
  mensal?: { valor: number; cobre: string };
  /** Duração de referência (Sprint), nunca promessa. */
  duracao?: string;
  para: string;
  inclui: string[];
  /** O pacote em destaque no cartão (só o Sprint Integrado, a oferta principal do Sprint). */
  principal?: boolean;
}

export type IdOferta = "branding" | "presenca" | "sites" | "sprint";

export interface Oferta {
  id: IdOferta;
  nome: string;
  rota: string;
  /** A cor da solução: as quatro valências do vanádio, na ordem da home. */
  etapa: Etapa;
  /** O problema que resolve, numa frase (home e `/precos`). */
  resolve: string;
  /** O que o cliente recebe, numa frase. */
  recebe: string;
  pacotes: Pacote[];
  /** O que nenhum pacote cobre. */
  fora: string[];
  /** Como o preço e o escopo funcionam nesta solução. */
  regras: string[];
  /** A continuidade que costuma acompanhar a solução. */
  continuidade?: string;
}

const BRANDING: Oferta = {
  id: "branding",
  nome: "Branding & Identidade",
  rota: "/branding-e-identidade",
  etapa: "violeta",
  resolve: "Quando a empresa é percebida abaixo do que entrega, ou cada canal mostra uma marca diferente.",
  recebe: "Identidade visual com regras de uso e, nos pacotes maiores, posicionamento e comunicação.",
  pacotes: [
    {
      nome: "Identidade Essencial",
      preco: { valor: 2400 },
      para: "Para quem precisa de uma identidade visual que funcione em todos os canais, sem projeto de posicionamento.",
      inclui: [
        "Logotipo com as variações de uso: horizontal, vertical, símbolo e versão em uma cor",
        "Paleta de cores e tipografia",
        "Aplicações essenciais: perfil das redes, assinatura de e-mail e cartão digital",
        "Guia básico de uso da marca, em PDF",
        "Arquivos finais em vetor e em imagem",
        "Duas rodadas de revisão",
      ],
    },
    {
      nome: "Marca em Uso",
      preco: { valor: 4900 },
      para: "Para quem quer a marca aplicada no dia a dia comercial, com regras de comunicação.",
      inclui: [
        "Tudo da Identidade Essencial",
        "Sistema visual completo: grafismos, uso de fotos e composição",
        "Diretrizes de comunicação: tom de voz e mensagens principais",
        "Aplicações comerciais: apresentação, proposta e cartão de visita",
        "Kit digital com modelos editáveis para posts, stories e capas",
        "Duas rodadas de revisão por etapa",
      ],
    },
    {
      nome: "Reposicionamento",
      preco: { valor: 7900, aPartirDe: true },
      para: "Para quem precisa mudar como o mercado percebe a empresa antes de mudar o visual.",
      inclui: [
        "Diagnóstico da marca atual, dos concorrentes e de como os clientes percebem a empresa",
        "Posicionamento e proposta de valor",
        "Identidade visual nova ou revisada",
        "Plano de aplicação nos canais e materiais",
        "Valor final na proposta, conforme o tamanho do diagnóstico",
      ],
    },
  ],
  fora: [
    "Registro da marca no INPI",
    "Impressão e produção gráfica",
    "Fotos e vídeos",
    "Criação de nome, só em proposta específica",
    "Produção contínua de materiais",
  ],
  regras: [
    "Logotipo sozinho não é vendido como projeto de branding: todo pacote entrega as regras para usar a marca.",
    "Entregáveis, arquivos finais e rodadas de revisão ficam escritos no contrato.",
    "Identidade visual e posicionamento são trabalhos diferentes. O posicionamento só entra no Reposicionamento.",
  ],
};

const PRESENCA: Oferta = {
  id: "presenca",
  nome: "Presença Digital Local",
  rota: "/presenca-digital-local",
  etapa: "verde",
  resolve: "Quando o cliente procura e encontra informação errada, perfil parado ou nenhum jeito fácil de chamar.",
  recebe: "Perfil no Google, redes e WhatsApp organizados, com modelos de conteúdo e, se quiser, a rotina mensal.",
  pacotes: [
    {
      nome: "Presença Essencial",
      preco: { valor: 790 },
      mensal: { valor: 290, cobre: "Suporte e até quatro pequenas atualizações por mês nos canais: horário, contato, foto ou informação." },
      para: "Para o negócio local que precisa ser encontrado com as informações certas.",
      inclui: [
        "Perfil da Empresa no Google configurado ou otimizado (a verificação depende do Google)",
        "Uma rede social organizada: Instagram ou Facebook",
        "WhatsApp Business com perfil, horário e mensagens de saudação e ausência",
        "Informações, contatos e botões de chamada revisados em todos os canais",
        "Três modelos de publicação com a identidade da empresa",
        "Uma rodada de revisão",
      ],
    },
    {
      nome: "Presença Estruturada",
      preco: { valor: 1490 },
      mensal: { valor: 490, cobre: "Kit mensal com quatro peças de conteúdo e uma campanha, prontas para publicar." },
      para: "Para quem quer usar os canais para vender, com calendário e campanhas.",
      inclui: [
        "Tudo da Presença Essencial, com até duas redes sociais",
        "Kit inicial com oito modelos reutilizáveis de posts e stories",
        "Calendário de oportunidades de três meses, com as datas e as épocas do ramo",
        "Uma campanha de lançamento, com peças e texto",
        "Uma rodada de revisão por entrega",
      ],
    },
    {
      nome: "Presença Assistida",
      preco: { valor: 1990 },
      mensal: {
        valor: 890,
        cobre: "Operação assistida: calendário do mês, oito peças de referência, programação nas redes e uma campanha. O volume final sai na proposta.",
      },
      para: "Para quem quer a rotina de conteúdo feita junto, com programação e acompanhamento.",
      inclui: [
        "Tudo da Presença Estruturada",
        "Ferramenta de agendamento e fluxo de aprovação configurados",
        "Calendário de três meses aprovado antes de começar",
        "Orientação para a equipe sobre fotos, vídeos e o atendimento nos canais",
      ],
    },
  ],
  fora: [
    "Verba de anúncios",
    "Gravação presencial de fotos e vídeos",
    "Resposta a comentários e mensagens",
    "Ferramentas pagas e serviços externos sem contratação específica",
    "Publicações ilimitadas",
  ],
  regras: [
    "A mensalidade é opcional: dá para contratar só a implantação.",
    "Você envia fotos, informações e ofertas, aprova as peças no prazo combinado e dá acesso aos perfis.",
    "Campanha por mensagem só para quem consentiu em receber, e toda campanha dentro das regras de cada plataforma.",
  ],
  continuidade: "As mensalidades da Presença são a frente de conteúdo e campanhas recorrentes da continuidade.",
};

const SITES: Oferta = {
  id: "sites",
  nome: "Sites & Integrações",
  rota: "/criacao-de-sites",
  etapa: "azul",
  resolve: "Quando a empresa depende de perfil de terceiros, ou o site não conversa com o sistema que ela já usa.",
  recebe: "Site próprio, rápido e medido, ligado ao CRM, ao estoque ou ao sistema de gestão quando o escopo pede.",
  pacotes: [
    {
      nome: "Landing Page",
      preco: { valor: 2900 },
      para: "Para uma oferta, campanha ou serviço que precisa de uma página que leve ao contato.",
      inclui: [
        "Uma página comercial com textos escritos pela V2O5",
        "Formulário ou botão de WhatsApp funcionando, com o contato chegando a quem atende",
        "Rastreamento básico: de onde veio cada contato",
        "SEO técnico da página e publicação no domínio da empresa",
        "Duas rodadas de revisão",
      ],
    },
    {
      nome: "Site Personalizado",
      preco: { valor: 5900 },
      para: "Para a empresa que precisa de um site próprio, com estrutura comercial.",
      inclui: [
        "Site institucional personalizado, com até seis páginas",
        "A entrega-base de todo site da V2O5, descrita nesta página",
        "SEO técnico básico e envio ao Search Console",
        "Contatos funcionando: WhatsApp, formulário e telefone",
        "Duas rodadas de revisão",
      ],
    },
    {
      nome: "Site Conectado",
      preco: { valor: 9900, aPartirDe: true },
      para: "Para quem precisa do site ligado ao sistema que já usa.",
      inclui: [
        "Tudo do Site Personalizado",
        "Integração com um sistema que a empresa já usa (CRM, agenda, catálogo ou ERP), depois de verificar a documentação e o acesso",
        "Contatos medidos até o sistema, com a origem gravada",
        "Aviso quando a integração falha",
      ],
    },
    {
      nome: "Site Automotivo Integrado",
      preco: { valor: 11900, aPartirDe: true },
      para: "Para a revenda que quer site próprio com o estoque do gestor e os contatos no CRM.",
      inclui: [
        "Site da revenda com identidade própria",
        "Estoque alimentado pelo gestor atual, por feed, API ou outro meio autorizado (Revenda Mais em produção)",
        "Página de cada veículo e tratamento dos vendidos",
        "Contatos encaminhados ao CRM que a loja já usa, com a origem registrada",
        "Monitoramento de falhas da integração",
      ],
    },
  ],
  fora: [
    "Domínio, e-mail, APIs pagas e licenças de terceiros",
    "Mídia paga",
    "Loja virtual com pagamento",
    "Fotos e vídeos",
    "Integrações novas depois da entrega",
  ],
  regras: [
    "O preço fechado vale para um escopo conhecido.",
    "Integração só entra na proposta depois de verificar documentação, credenciais, limites e custos do sistema. Integração padrão e desenvolvimento específico têm preços diferentes.",
    "O site não substitui o CRM nem o sistema de gestão: ele se liga ao que a empresa já usa.",
  ],
  continuidade: "Site e página costumam seguir com o Cuidado Técnico; site com integração, com as Integrações Monitoradas.",
};

/** O Sprint pela mesma interface, com os níveis e o método de `sprint.ts`. */
const SPRINT: Oferta = {
  id: "sprint",
  nome: "Sprint de Eficiência",
  rota: "/sprint-de-eficiencia",
  etapa: "ambar",
  resolve: "Quando um processo trava a operação: retrabalho, contato perdido, sistemas que não conversam.",
  recebe: "Um gargalo resolvido, com a solução implantada e os indicadores comparados antes e depois.",
  pacotes: SPRINT_DE_PRECOS.niveis.map((n) => ({
    nome: n.nome,
    preco: n.preco,
    duracao: n.duracao,
    para: n.para,
    inclui: [n.escopo, n.exemplos],
    principal: "principal" in n ? n.principal : undefined,
  })),
  fora: [
    "Desenvolvimento ilimitado",
    "Novos gargalos, integrações ou produtos fora da proposta",
    "Garantia de resultado comercial",
    "Custos de terceiros: APIs, infraestrutura, licenças e mídia, discriminados na proposta",
  ],
  regras: [SPRINT_DE_PRECOS.texto, SPRINT_DE_PRECOS.revisao, SPRINT_DE_PRECOS.descoberta],
  continuidade: "O que continua rodando depois do Sprint pode seguir com as Integrações Monitoradas ou a Evolução Contínua.",
};

/** As regras de preço que valem para as quatro soluções (`/precos`, `llms.txt`). */
export const REGRAS_DE_PRECO = [
  "São preços de referência para começar a conversa. O valor fechado sai em proposta e vale para um escopo conhecido.",
  "Cada pacote diz o que inclui e o que fica de fora. Nenhum tem escopo ilimitado.",
  "Custos de terceiros, como domínio, licenças, APIs, mídia paga, IA e mensagens, ficam por fora e aparecem discriminados na proposta.",
  "Nenhuma solução obriga a comprar outra, e a continuidade é opcional.",
  "Aumento de vendas não é prometido. O que se mede é combinado antes de começar, com uma linha de base.",
  "O diagnóstico inicial, de 45 minutos, é gratuito e serve para escolher a solução que cabe no problema.",
];

/** A ordem da home, do menu e de `/precos`. */
export const OFERTAS: Oferta[] = [BRANDING, PRESENCA, SITES, SPRINT];

export function ofertaDa(id: IdOferta): Oferta {
  const o = OFERTAS.find((x) => x.id === id);
  if (!o) throw new Error(`Solução sem oferta: ${id}`);
  return o;
}

/** O menor preço de implantação da solução: o "a partir de" da home e de `/precos`. */
export const precoDeEntrada = (o: Oferta) => Math.min(...o.pacotes.map((p) => p.preco.valor));

// ---------------------------------------------------------------------------
// Continuidade
// ---------------------------------------------------------------------------

export type IdFrente = "manutencao-tecnica" | "conteudo-e-campanhas" | "monitoramento-e-otimizacao";

export interface PlanoDeContinuidade {
  nome: string;
  mensal: number;
  frente: IdFrente;
  para: string;
  inclui: string[];
}

export const PLANOS_DE_CONTINUIDADE: PlanoDeContinuidade[] = [
  {
    nome: "Cuidado Técnico",
    mensal: 249,
    frente: "manutencao-tecnica",
    para: "Para manter no ar o site ou a página entregue.",
    inclui: [
      "Hospedagem gerenciada e certificado SSL",
      "Backup do código e do conteúdo, com restauração da última versão publicada",
      "Monitoramento de disponibilidade do site e do formulário",
      "Até 1 hora de suporte técnico por mês: correções e pequenas trocas de texto ou imagem",
      "Resposta em até 2 dias úteis, por WhatsApp ou e-mail, em horário comercial",
    ],
  },
  {
    nome: "Integrações Monitoradas",
    mensal: 490,
    frente: "monitoramento-e-otimizacao",
    para: "Para site ou fluxo ligado a outros sistemas.",
    inclui: [
      "Tudo do Cuidado Técnico",
      "Monitoramento das integrações entregues: estoque, envio de contatos e automações",
      "Registro de erros e aviso quando algo para",
      "Correção de falhas nas integrações entregues",
      "Até 2 horas de suporte técnico por mês, com resposta a falha de integração em até 1 dia útil",
    ],
  },
  {
    nome: "Evolução Contínua",
    mensal: 990,
    frente: "monitoramento-e-otimizacao",
    para: "Para quem quer melhorar o que foi entregue, mês a mês.",
    inclui: [
      "Tudo das Integrações Monitoradas",
      "Uma conversa mensal de 30 minutos para priorizar as melhorias",
      "Até 2 horas por mês reservadas para pequenas intervenções, além do suporte",
      "Registro do que mudou e da próxima prioridade",
    ],
  },
];

export const CONTINUIDADE = {
  titulo: "Continuidade: o que segue depois da entrega.",
  resumo:
    "Planos opcionais para manter funcionando e evoluindo o que foi entregue, com horas e prazo de resposta escritos.",
  texto:
    "A implantação termina na entrega. Se o que foi entregue continua rodando, a continuidade cuida dele, com limites que cabem no contrato. Nenhum plano é obrigatório: a necessidade e o escopo decidem.",
  frentes: [
    {
      id: "manutencao-tecnica" as IdFrente,
      nome: "Manutenção técnica",
      texto: "Hospedagem, segurança, backup e suporte para o site ou a página continuarem no ar.",
    },
    {
      id: "conteudo-e-campanhas" as IdFrente,
      nome: "Conteúdo e campanhas recorrentes",
      texto: "As mensalidades da Presença Digital Local: atualizações, kit mensal de conteúdo ou a rotina assistida.",
    },
    {
      id: "monitoramento-e-otimizacao" as IdFrente,
      nome: "Monitoramento e otimização",
      texto: "Integrações vigiadas, erros registrados e, se quiser, horas reservadas para melhorar o que roda.",
    },
  ],
  limites: [
    {
      titulo: "As horas",
      texto: "As horas de cada plano valem no mês e não acumulam para o seguinte.",
    },
    {
      titulo: "Correção ou novidade",
      texto:
        "Correção é fazer voltar a funcionar o que foi entregue e parou. Nova funcionalidade muda ou acrescenta algo, e é orçada à parte.",
    },
    {
      titulo: "Atendimento",
      texto: "Por WhatsApp ou e-mail, em horário comercial, no prazo de resposta de cada plano. Sem plantão fora desse horário.",
    },
    {
      titulo: "Custos por fora",
      texto:
        "Banco de dados, servidor dedicado, consumo de IA e mensagens vêm pelo valor do provedor, discriminados, com teto mensal combinado e aviso antes de ultrapassá-lo. A V2O5 gerencia. Domínio e e-mail também ficam por fora.",
    },
    {
      titulo: "Sua parte",
      texto: "Manter em dia os acessos e os pagamentos dos serviços de terceiros e avisar quando mudar o sistema que a solução usa.",
    },
    {
      titulo: "Saída",
      texto: "Com aviso prévio, a V2O5 entrega o código, os dados e os acessos nos termos do contrato.",
    },
  ],
};

/** O menor plano: o "a partir de" da continuidade. */
export const continuidadeAPartirDe = () => Math.min(...PLANOS_DE_CONTINUIDADE.map((p) => p.mensal));

const mensaisDaPresenca = () => PRESENCA.pacotes.flatMap((p) => (p.mensal ? [p.mensal.valor] : []));

export const planoDaFrente = (frente: IdFrente) => PLANOS_DE_CONTINUIDADE.filter((p) => p.frente === frente);

/** As perguntas de `/continuidade`, que viram o FAQPage da página. */
export const PERGUNTAS_DA_CONTINUIDADE = [
  {
    pergunta: "A continuidade é obrigatória?",
    resposta:
      "Não. Ela é contratada à parte, quando o que foi entregue continua rodando e precisa de cuidado. A necessidade e o escopo decidem o plano, ou nenhum.",
  },
  {
    pergunta: "Quanto custa?",
    resposta: `${PLANOS_DE_CONTINUIDADE.map((p) => `${p.nome}, ${mensalEmTexto(p.mensal)}`).join("; ")}. As mensalidades de conteúdo da Presença Digital Local vão de ${mensalEmTexto(Math.min(...mensaisDaPresenca()))} a ${mensalEmTexto(Math.max(...mensaisDaPresenca()))}.`,
  },
  {
    pergunta: "O que acontece se eu usar mais horas do que o plano tem?",
    resposta:
      "A V2O5 avisa antes de passar do limite. O que não cabe nas horas do mês vira orçamento à parte, aprovado por você antes de começar.",
  },
  {
    pergunta: "O que é correção e o que é novidade?",
    resposta:
      "Correção é fazer voltar a funcionar o que foi entregue e parou. Nova funcionalidade muda ou acrescenta algo, e é orçada à parte.",
  },
  {
    pergunta: "IA, mensagens e servidor estão incluídos?",
    resposta:
      "A hospedagem do site entra no Cuidado Técnico. Banco de dados, servidor dedicado, consumo de IA e mensagens vêm pelo valor do provedor, discriminados, com teto mensal combinado e aviso antes de ultrapassá-lo.",
  },
];

/**
 * Todo valor que pode aparecer em texto público, em número. A lista de
 * permitidos de `tests/precos-publicos.test.ts`.
 */
export const VALORES_PUBLICOS: number[] = [
  ...new Set([
    ...OFERTAS.flatMap((o) => o.pacotes.flatMap((p) => [p.preco.valor, ...(p.mensal ? [p.mensal.valor] : [])])),
    ...PLANOS_DE_CONTINUIDADE.map((p) => p.mensal),
  ]),
].sort((a, b) => a - b);
