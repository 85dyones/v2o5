/**
 * Textos e opções do pedido de diagnóstico (plano, seção 6.1). As opções
 * são as mesmas que `src/lib/leads.ts` aceita; mudar aqui exige mudar lá.
 */

export const DIAGNOSTICO = {
  sobretitulo: "Diagnóstico gratuito",
  titulo: "Descubra onde seu negócio perde cliente.",
  apagado: "Gratuitamente.",
  texto:
    "Em 45 minutos, vemos como o cliente acha o seu negócio e como ele é atendido, e recomendamos por onde começar.",
  passos: [
    {
      titulo: "Você conta como vende hoje",
      texto: "O formulário desta página leva dois minutos. Com ele, a conversa já começa no que importa.",
    },
    {
      titulo: "45 minutos com o fundador",
      texto: "Por chamada de vídeo ou WhatsApp. Vemos como o cliente acha o seu negócio no Google, nas redes e no site, e como ele é atendido no WhatsApp.",
    },
    {
      titulo: "Uma proposta, se fizer sentido",
      texto: "Se fizer sentido seguir, você recebe por escrito a solução que cabe no problema (Presença, Sites ou Atendimento com IA), o que entra, o prazo e o valor. Se não fizer, a conversa termina ali, sem custo.",
    },
  ],
  paraQuem:
    "Para o pequeno negócio que vende pelo WhatsApp ou no balcão e quer saber onde perde cliente antes de gastar com site ou sistema.",
  /** O que a sessão inicial não inclui (decisão de 25/10/2026; texto no foco em pequenos negócios desde 25/11/2026). */
  escopo:
    "O diagnóstico é a sessão inicial, gratuita, de 45 minutos. Ele mostra o que pesa mais hoje (ser achado, responder ou fazer o cliente voltar) e por onde começar. Implementação e acompanhamento de resultados ficam para depois, na solução contratada e, se fizer sentido, na continuidade, com escopo, valor e prazo definidos em proposta.",
  formulario: {
    titulo: "Pedir o diagnóstico",
    enviar: "Pedir diagnóstico gratuito",
    microtexto: "Sem custo e sem compromisso de contratação.",
    enviando: "Enviando...",
    consentimento:
      "Ao enviar, você concorda em receber o contato da V2O5 pelo WhatsApp e pelo e-mail informados, para marcar a conversa.",
    erroGeral: "Não deu para enviar agora. Tente de novo ou chame no WhatsApp.",
    erroCanal: "O formulário está fora do ar agora. Chame no WhatsApp, que a gente marca por lá.",
  },
  recebido: {
    titulo: "Pedido recebido.",
    texto:
      "A V2O5 entra em contato pelo WhatsApp ou pelo e-mail que você informou, para marcar os 45 minutos com o fundador.",
    enquantoIsso: "Enquanto isso",
  },
};

/** Do pequeno negócio mais comum para o menos (26/11/2026); os valores são os que o n8n e o banco recebem. */
export const SEGMENTOS = [
  { valor: "comercio", rotulo: "Comércio" },
  { valor: "servicos", rotulo: "Serviços" },
  { valor: "saude", rotulo: "Saúde" },
  { valor: "automotivo", rotulo: "Revenda de veículos" },
  { valor: "imobiliario", rotulo: "Imobiliário" },
  { valor: "industria", rotulo: "Indústria" },
  { valor: "outro", rotulo: "Outro" },
] as const;

export const PORTES = [
  { valor: "1", rotulo: "Só eu" },
  { valor: "2-5", rotulo: "2 a 5 pessoas" },
  { valor: "6-20", rotulo: "6 a 20 pessoas" },
  { valor: "21+", rotulo: "Mais de 20" },
] as const;

export const OBJETIVOS = [
  { valor: "aparecer", rotulo: "Aparecer no Google e no Maps" },
  { valor: "contatos", rotulo: "Receber mais contatos pelo site" },
  { valor: "responder", rotulo: "Responder mais rápido no WhatsApp" },
  { valor: "funil", rotulo: "Organizar os contatos e fazer o cliente voltar" },
  { valor: "integrar", rotulo: "Integrar os sistemas que já uso" },
] as const;

export const ESTOQUES = [
  { valor: "ate-30", rotulo: "Até 30 veículos" },
  { valor: "31-80", rotulo: "31 a 80" },
  { valor: "81-150", rotulo: "81 a 150" },
  { valor: "151+", rotulo: "Mais de 150" },
] as const;

/**
 * Sistemas de gestão de revenda que o formulário oferece. O Revenda Mais é
 * a integração em produção (Motors); os outros nomes são os players grandes
 * do setor, citados no site como integráveis por fluxo (Dyones, 13/10), e
 * `tests/automotivo.test.ts` cobra que hub, home e soluções usem esta lista.
 */
export const SISTEMAS = [
  { valor: "revenda-mais", rotulo: "Revenda Mais" },
  { valor: "autoconf", rotulo: "Autoconf" },
  { valor: "bndv", rotulo: "BNDV" },
  { valor: "boom", rotulo: "Boom" },
  { valor: "altimus", rotulo: "Altimus" },
  { valor: "syonet", rotulo: "Syonet" },
  { valor: "outro", rotulo: "Outro" },
  { valor: "nenhum", rotulo: "Nenhum" },
] as const;

export const SISTEMA_EM_PRODUCAO = "Revenda Mais";

/** Os sistemas além do que já roda: "Autoconf, BNDV, Boom, Altimus e Syonet". */
export const SISTEMAS_INTEGRAVEIS = SISTEMAS.filter((s) => !["revenda-mais", "outro", "nenhum"].includes(s.valor)).map(
  (s) => s.rotulo,
);

export const listaDeSistemasIntegraveis = (): string =>
  `${SISTEMAS_INTEGRAVEIS.slice(0, -1).join(", ")} e ${SISTEMAS_INTEGRAVEIS[SISTEMAS_INTEGRAVEIS.length - 1]}`;
