import { listaDeSistemasIntegraveis, SISTEMA_EM_PRODUCAO, SISTEMAS_INTEGRAVEIS } from "@/conteudo/diagnostico";
import { CASE } from "@/conteudo/home";
/**
 * Hub do segmento automotivo (`/segmentos/revendas-de-veiculos`): o que um
 * Sprint de Eficiência para revendas costuma juntar (o site de estoque do
 * sistema da Motors Store, agente, CRM e rastreamento), o caminho de um lead
 * na revenda, os números do case e as perguntas de dono de loja. Sem valor
 * público desde 25/10/2026 (só o Sprint tem, em `sprint.ts`); número só de
 * `CASE` (lido do banco da Motors, com fonte e período).
 * `tests/automotivo.test.ts` confere.
 *
 * Sobre o agente: a memória do case registra n8n, Evolution e Chatwoot na
 * Motors, não um agente de IA. Por isso o texto diz que o agente completa o
 * sistema, sem afirmar que roda na loja (pendência 13).
 */
export const HUB_AUTOMOTIVO = {
  rota: "/segmentos/revendas-de-veiculos",
  sobretitulo: "Revendas de veículos",
  titulo: "O sistema da Motors Store, pronto para a sua revenda.",
  /** Curto de propósito: o LCP da página é o H1 (`tests/automotivo.test.ts`). */
  resumo:
    "Site de estoque ligado ao sistema que a loja já usa, agente de IA no WhatsApp, CRM e rastreamento até a venda, dentro de um Sprint.",
  /** Os sistemas de gestão com que o Sprint para revendas trabalha: um em produção, os outros por fluxo (Dyones, 13/10). */
  sistemas: {
    rotulo: "Funciona com o sistema da loja",
    emProducao: SISTEMA_EM_PRODUCAO,
    integraveis: SISTEMAS_INTEGRAVEIS,
    outros: "outro sistema, por fluxo",
  },
  fatos: [
    { rotulo: "No Sprint", valor: "Intervenções para revendas, escolhidas pelo gargalo da loja" },
    { rotulo: "Integração em produção", valor: "Revenda Mais: o estoque entra no site e no agente sozinho" },
    { rotulo: "Integráveis por fluxo", valor: listaDeSistemasIntegraveis() },
    { rotulo: "Referência", valor: "Motors Store, revenda de seminovos em Curitiba, com números lidos do banco" },
  ],
  pacote: {
    titulo: "O que um Sprint para revendas costuma juntar.",
    texto:
      "Quatro peças na mesma base: o que entra por uma aparece nas outras. Site, rastreamento, painel e automações rodam na Motors Store; o agente de IA no WhatsApp completa o sistema. O escopo de cada projeto sai em proposta.",
    pecas: [
      {
        linha: "Sites e presença",
        titulo: "Site de estoque integrado ao sistema da loja",
        texto:
          `Vitrine, ficha de veículo, páginas por marca e modelo e páginas locais. O carro entra no site quando entra no sistema de gestão e sai quando é vendido. Em produção com o Revenda Mais. ${listaDeSistemasIntegraveis()} entram por fluxo de integração.`,
      },
      {
        linha: "Agente de IA no WhatsApp",
        titulo: "Atende à noite e no fim de semana",
        texto:
          "Responde com o estoque real, qualifica o interesse, agenda a visita e passa ao vendedor a conversa e a origem do contato.",
      },
      {
        linha: "CRM e sistemas sob medida",
        titulo: "Funil com origem e próximo passo",
        texto: "Cada lead com o carro de interesse, o anúncio que trouxe a pessoa e o responsável.",
      },
      {
        linha: "Rastreamento até a venda",
        titulo: "A venda volta para o Google e a Meta",
        texto:
          "Pixel, API de Conversões e GA4 com um identificador único por lead. A campanha passa a otimizar pelo carro vendido.",
      },
    ],
  },
  caminho: {
    titulo: "O caminho de um lead na revenda.",
    texto: "Do carro que entra no estoque à venda que volta para o anúncio, sem ninguém digitar duas vezes.",
    passos: [
      {
        titulo: "O carro entra no sistema da loja",
        texto: `Revenda Mais, ${listaDeSistemasIntegraveis().replace(" e ", ", ")} ou outro: na sincronização seguinte está no site, na ficha do agente e no feed de anúncios.`,
      },
      {
        titulo: "Alguém busca o modelo",
        texto: "Acha o anúncio de veículo no Google, o catálogo na Meta ou a página do carro na busca.",
      },
      {
        titulo: "Chama no WhatsApp às 21h",
        texto: "O agente responde com a ficha, o preço e os horários de visita, e avisa o vendedor.",
      },
      {
        titulo: "O lead entra no CRM com a origem",
        texto: "O vendedor começa o dia com o nome, o carro e o anúncio que trouxe a pessoa.",
      },
      {
        titulo: "A venda é registrada",
        texto: "O carro sai do site, o cliente recebe o obrigado e Google e Meta recebem a conversão uma vez só.",
      },
    ],
  },
  case: {
    titulo: "Medido na Motors Store.",
    texto: "Os números do sistema rodando, lidos no banco de dados da loja. O case completo tem o que foi construído, peça por peça.",
    fonte: CASE.fonte,
    numeros: CASE.numeros,
    href: "/cases/motors-store",
    botao: "Ler o case completo",
  },
  perguntas: [
    {
      pergunta: "Minha loja usa outro sistema de gestão. O Sprint funciona?",
      resposta:
        `Funciona. O Sprint lê o estoque do sistema que a loja já usa. Com o Revenda Mais a integração está em produção. ${listaDeSistemasIntegraveis()} entram como integração definida na proposta, depois de ver a API ou a exportação que cada um oferece; o mesmo vale para outro sistema.`,
    },
    {
      pergunta: "O agente responde com o estoque de verdade?",
      resposta:
        "Sim. Ele consulta o mesmo estoque do site, sincronizado com o sistema da loja, e só fala do que a ficha confirma. Quando a conversa pede uma pessoa, chama o vendedor.",
    },
    {
      pergunta: "Preciso de fotógrafo?",
      resposta:
        "Se a loja já tem equipe ou fotógrafo, o site, o feed de anúncios e o agente usam as fotos que estão no sistema. Se não tem, a V2O5 pode indicar parceiros de fotografia, contratados à parte.",
    },
    {
      pergunta: "Posso começar só pelo site de estoque?",
      resposta:
        "Pode. Um Sprint resolve um gargalo de cada vez: se o gargalo for o estoque no site e a origem dos contatos, o Sprint começa por aí e o atendimento entra depois, na mesma base.",
    },
    {
      pergunta: "O site e os dados são meus?",
      resposta:
        "Sim. Domínio, hospedagem e código ficam no nome da loja desde o primeiro dia, e os dados ficam num banco do seu negócio, com exportação quando você pedir.",
    },
  ],
  chamada: {
    titulo: "Quer ver o sistema rodando na sua revenda?",
    texto:
      "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o sistema da Motors Store, para identificar e priorizar o gargalo da sua revenda.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver os preços do Sprint",
  },
};
