/**
 * O portfólio da V2O5 desde 27/10/2026 (Dyones, "Handoff mestre:
 * reposicionamento comercial, portfólio e política inicial de preços"):
 * soluções com preço de referência público e a continuidade, à parte e
 * opcional. Desde 12/11/2026 são três (Dyones: "vamos focar nos serviços
 * ainda mais"; Branding & Identidade e o tráfego pago saíram). Desde
 * 25/11/2026 o foco é o pequeno negócio (`docs/2026-11-25-foco-pequenos-negocios.md`):
 * o Atendimento com IA substitui o Sprint de Eficiência, com os mesmos preços
 * de entrada, e a Presença Assistida saiu.
 *
 * Regras que valem para tudo: preço de referência para testar
 * comercialmente, com o valor fechado em proposta para um escopo conhecido;
 * nenhum escopo ilimitado; cada pacote diz para quem é, o que inclui e o que
 * fica de fora; nenhuma solução obriga a comprar a seguinte. Todo "R$"
 * público sai daqui (`tests/precos-publicos.test.ts`), e
 * `memory/context/oferta.md` repete os mesmos números (`tests/ofertas.test.ts`).
 *
 * As quantidades de revisões, peças, canais, páginas, horas e prazos de
 * resposta foram redigidas em 27/10 e aprovadas pelo Dyones no mesmo dia
 * (`oferta.md`, "Quantidades redigidas em 27/10").
 */
import { mensalEmTexto, type Preco } from "@/conteudo/precos";
import type { Etapa } from "@/lib/tokens";

export { mensalEmTexto, precoEmTexto, type Preco } from "@/conteudo/precos";

export interface Pacote {
  nome: string;
  preco: Preco;
  /** A mensalidade opcional que acompanha o pacote (Presença) e o que ela cobre. */
  mensal?: { valor: number; cobre: string };
  para: string;
  inclui: string[];
  /** O pacote em destaque no cartão (só o Atendimento Integrado, a oferta principal do Atendimento com IA). */
  principal?: boolean;
}

export type IdOferta = "presenca" | "sites" | "atendimento";

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

const PRESENCA: Oferta = {
  id: "presenca",
  nome: "Presença Digital Local",
  rota: "/presenca-digital-local",
  etapa: "verde",
  resolve: "Quando o cliente procura e encontra informação errada, perfil parado ou nenhum jeito fácil de chamar.",
  recebe: "Perfil no Google, redes e WhatsApp organizados, com pedido de avaliação, modelos de conteúdo e, se quiser, a rotina mensal.",
  pacotes: [
    {
      nome: "Presença Essencial",
      preco: { valor: 790 },
      mensal: { valor: 390, cobre: "Suporte e até quatro pequenas atualizações por mês nos canais: horário, contato, foto ou informação." },
      para: "Para o negócio local que precisa ser encontrado com as informações certas.",
      inclui: [
        "Perfil da Empresa no Google configurado ou otimizado (a verificação depende do Google)",
        "Uma rede social organizada: Instagram ou Facebook",
        "WhatsApp Business com perfil, horário e mensagens de saudação e ausência",
        "Informações, contatos e botões de chamada revisados em todos os canais",
        "Pedido de avaliação no Google: link direto e mensagem pronta para mandar a quem comprou",
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
  continuidade: "A mensalidade opcional da Presença é contratada com ela. Se a empresa tiver site, ele segue com o Cuidado Técnico.",
};

const SITES: Oferta = {
  id: "sites",
  nome: "Sites & Integrações",
  rota: "/criacao-de-sites",
  etapa: "azul",
  resolve: "Quando o negócio depende só de rede social ou de portal, ou tem um site que não leva quem chega até a conversa.",
  recebe: "Site próprio, rápido no celular e achado no Google, que leva o cliente até o WhatsApp e, quando precisa, se liga ao sistema que você já usa.",
  pacotes: [
    {
      nome: "Landing Page",
      preco: { valor: 2900 },
      para: "Para um serviço ou uma oferta que precisa de uma página que leve o cliente até a conversa.",
      inclui: [
        "Uma página comercial com textos escritos pela V2O5",
        "Formulário ou botão de WhatsApp funcionando, com o contato chegando a quem atende",
        "A origem de cada contato gravada: Google, Instagram ou indicação",
        "SEO técnico da página e publicação no domínio da empresa",
        "Duas rodadas de revisão",
      ],
    },
    {
      nome: "Site Personalizado",
      preco: { valor: 5900 },
      para: "Para o negócio que precisa de um site próprio, com as páginas dos seus serviços e o WhatsApp à mão.",
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
        "Integração com um sistema que a empresa já usa (CRM, agenda, estoque, catálogo ou ERP), depois de verificar a documentação e o acesso",
        "Contatos medidos até o sistema, com a origem gravada",
        "Aviso quando a integração falha",
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

/**
 * Atendimento com IA (25/11/2026): o que era recurso do Sprint vira solução,
 * com os preços de entrada que eram do Sprint Essencial e do Integrado. Mora
 * na página do agente (`/agente-de-ia-para-whatsapp`), que já trazia a busca.
 */
const ATENDIMENTO: Oferta = {
  id: "atendimento",
  nome: "Atendimento com IA",
  rota: "/agente-de-ia-para-whatsapp",
  etapa: "ambar",
  resolve: "Quando o cliente chama no WhatsApp e espera, se perde entre as conversas ou some sem que ninguém retome.",
  recebe: "WhatsApp organizado, um agente de IA que responde na hora e passa a conversa à pessoa certa e, no Integrado, o contato de volta com quem já comprou.",
  pacotes: [
    {
      nome: "Atendimento Essencial",
      preco: { valor: 3900, aPartirDe: true },
      para: "Para o negócio que atende pelo WhatsApp e perde cliente na demora ou na confusão das conversas.",
      inclui: [
        "WhatsApp organizado numa caixa de atendimento, com etiquetas e respostas prontas",
        "Agente de IA que responde as dúvidas frequentes a qualquer hora, só com o que a empresa aprovou",
        "Passagem para a pessoa certa da equipe, com o resumo da conversa",
        "Lista de contatos com a origem de cada um",
        "Treinamento da equipe e uma rodada de ajustes com as conversas reais",
      ],
    },
    {
      nome: "Atendimento Integrado",
      preco: { valor: 6900, aPartirDe: true },
      para: "Para quem quer o agente fazendo as perguntas do seu negócio e levando cada contato ao sistema que já usa.",
      inclui: [
        "Tudo do Atendimento Essencial",
        "Agente de IA que faz as perguntas do seu negócio e agenda ou encaminha",
        "Integração com um sistema que a empresa já usa (CRM, agenda, estoque ou catálogo), depois de verificar a documentação e o acesso",
        "Contato de volta com quem parou de responder ou já comprou, só para quem consentiu e dentro das regras do WhatsApp",
        "Uma rodada de ajustes com as conversas reais",
      ],
      principal: true,
    },
  ],
  fora: [
    "Consumo de IA e mensagens do WhatsApp, pelo valor do provedor",
    "Resposta da equipe: o agente passa a conversa, e a sua equipe atende",
    "Respostas sobre o que a empresa não aprovou",
    "Mensagem em massa para quem não consentiu",
    "Integrações novas depois da entrega",
  ],
  regras: [
    "O agente responde só com o que a empresa aprovou e chama uma pessoa quando não sabe ou quando o cliente pede.",
    "Integração só entra na proposta depois de verificar documentação, credenciais, limites e custos do sistema.",
    "IA e mensagens vêm pelo valor do provedor, discriminados, com teto mensal combinado e aviso antes de ultrapassá-lo. A V2O5 gerencia.",
  ],
  continuidade: "O atendimento costuma seguir com as Integrações Monitoradas. Quem quer melhorar o agente mês a mês segue com a Evolução Contínua.",
};

/** As regras de preço que valem para as três soluções (`/precos`, `llms.txt`). */
export const REGRAS_DE_PRECO = [
  "São preços de referência para começar a conversa. O valor fechado sai em proposta e vale para um escopo conhecido.",
  "Cada pacote diz o que inclui e o que fica de fora. Nenhum tem escopo ilimitado.",
  "Custos de terceiros, como domínio, licenças, APIs, IA e mensagens do WhatsApp, ficam por fora e aparecem discriminados na proposta.",
  "Nenhuma solução obriga a comprar outra, e a continuidade é opcional.",
  "Aumento de vendas não é prometido. O que se mede é combinado antes de começar, com uma linha de base.",
  "O diagnóstico inicial, de 45 minutos, é gratuito e serve para escolher a solução que cabe no problema.",
];

/** A ordem da home, do menu e de `/precos`. */
export const OFERTAS: Oferta[] = [PRESENCA, SITES, ATENDIMENTO];

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

export type IdFrente = "manutencao-tecnica" | "monitoramento-e-otimizacao";

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
    mensal: 349,
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
    mensal: 590,
    frente: "monitoramento-e-otimizacao",
    para: "Para o atendimento com IA ou o site ligado a outros sistemas.",
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
    para: "Para quem quer melhorar o que foi entregue mês a mês, como as respostas do agente de IA.",
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
    resposta: `${PLANOS_DE_CONTINUIDADE.map((p) => `${p.nome}, ${mensalEmTexto(p.mensal)}`).join("; ")}. A mensalidade opcional da Presença Digital Local, de ${mensalEmTexto(Math.min(...mensaisDaPresenca()))} a ${mensalEmTexto(Math.max(...mensaisDaPresenca()))}, é contratada com ela.`,
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
