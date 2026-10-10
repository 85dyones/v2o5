/**
 * Textos e opções do pedido de diagnóstico (plano, seção 6.1). As opções
 * são as mesmas que `src/lib/leads.ts` aceita; mudar aqui exige mudar lá.
 */

export const DIAGNOSTICO = {
  sobretitulo: "Diagnóstico gratuito",
  titulo: "Em 45 minutos, o que fazer primeiro.",
  apagado: "E um mapa com custo e prazo em até 24 horas.",
  texto:
    "Uma conversa com o fundador sobre como a sua empresa aparece, atende e vende hoje. Você sai com o que mudar primeiro, quanto custa e em quanto tempo, para usar com ou sem a V2O5.",
  passos: [
    {
      titulo: "Você conta como vende hoje",
      texto: "O formulário ao lado leva dois minutos. Com ele, a conversa já começa no que importa.",
    },
    {
      titulo: "45 minutos com o fundador",
      texto: "Por chamada de vídeo ou WhatsApp. Olhamos presença, atendimento, operação e funil, com os seus números.",
    },
    {
      titulo: "Mapa em até 24 horas",
      texto: "As mudanças de maior retorno, em ordem, com custo e prazo. É seu, mesmo que não contrate nada.",
    },
  ],
  paraQuem:
    "Para quem tem uma empresa que vende pelo WhatsApp, pela internet ou pela loja, e quer saber onde o cliente se perde antes de gastar em anúncio, site ou sistema.",
  formulario: {
    titulo: "Pedir o diagnóstico",
    enviar: "Pedir diagnóstico gratuito",
    enviando: "Enviando...",
    consentimento:
      "Ao enviar, você concorda em receber o contato da V2O5 pelo WhatsApp e pelo e-mail informados, para marcar a conversa.",
    erroGeral: "Não deu para enviar agora. Tente de novo em instantes.",
    erroCanal: "O envio está em configuração. Tente de novo mais tarde.",
  },
  recebido: {
    titulo: "Pedido recebido.",
    texto:
      "A V2O5 entra em contato pelo WhatsApp ou pelo e-mail que você informou, para marcar os 45 minutos com o fundador. Depois da conversa, o mapa chega em até 24 horas.",
    enquantoIsso: "Enquanto isso",
  },
};

export const SEGMENTOS = [
  { valor: "automotivo", rotulo: "Revenda de veículos" },
  { valor: "servicos", rotulo: "Serviços" },
  { valor: "comercio", rotulo: "Comércio" },
  { valor: "imobiliario", rotulo: "Imobiliário" },
  { valor: "saude", rotulo: "Saúde" },
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
  { valor: "contatos", rotulo: "Mais contatos do site e dos anúncios" },
  { valor: "responder", rotulo: "Responder mais rápido no WhatsApp" },
  { valor: "funil", rotulo: "Organizar o funil e o CRM" },
  { valor: "integrar", rotulo: "Integrar os sistemas que já uso" },
  { valor: "marca", rotulo: "Rever a marca" },
] as const;

export const ESTOQUES = [
  { valor: "ate-30", rotulo: "Até 30 veículos" },
  { valor: "31-80", rotulo: "31 a 80" },
  { valor: "81-150", rotulo: "81 a 150" },
  { valor: "151+", rotulo: "Mais de 150" },
] as const;

export const SISTEMAS = [
  { valor: "revenda-mais", rotulo: "Revenda Mais" },
  { valor: "autoconf", rotulo: "Autoconf" },
  { valor: "bndv", rotulo: "BNDV" },
  { valor: "boom", rotulo: "Boom" },
  { valor: "outro", rotulo: "Outro" },
  { valor: "nenhum", rotulo: "Nenhum" },
] as const;
