import { listaDeSistemasIntegraveis, SISTEMA_EM_PRODUCAO, SISTEMAS_INTEGRAVEIS } from "@/conteudo/diagnostico";
import { mensalEmTexto, precoEmTexto } from "@/conteudo/precos";
import { ofertaDa, PLANOS_DE_CONTINUIDADE } from "@/conteudo/ofertas";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
/**
 * Página de exemplo do segmento automotivo (`/segmentos/revendas-de-veiculos`):
 * as mesmas soluções que a V2O5 vende para qualquer negócio, aplicadas à
 * revenda a partir do que roda na Motors Store (site ligado ao estoque,
 * agente, CRM e rastreamento). Desde 17/11/2026 não há produto próprio para
 * revendas: os dois caminhos são o Site Conectado, de Sites & Integrações, e
 * a Operação com IA, um Sprint Integrado (Dyones: revenda como prova, não como
 * produto). Os valores saem de `ofertas.ts` e `sprint.ts`. Os modelos
 * Mapa e Completo e a oferta do Completo até 31/12/2026 saíram com a tabela
 * de 15/10. Os números do case e o caminho do lead moram em
 * `/cases/motors-store`, que o hub só aponta. `tests/automotivo.test.ts` confere.
 *
 * Sobre o agente: a memória do case registra n8n, Evolution e Chatwoot na
 * Motors, não um agente de IA. Por isso o texto diz que o agente completa o
 * sistema, sem afirmar que roda na loja (pendência 13).
 */
const SITE_CONECTADO = ofertaDa("sites").pacotes.find((p) => p.nome === "Site Conectado")!;
const SPRINT_INTEGRADO = SPRINT_DE_PRECOS.niveis.find((n) => n.nome === "Sprint Integrado")!;
const [, MONITORADAS, EVOLUCAO] = PLANOS_DE_CONTINUIDADE;

export const HUB_AUTOMOTIVO = {
  rota: "/segmentos/revendas-de-veiculos",
  sobretitulo: "Revendas de veículos",
  titulo: "O que roda na Motors Store, aplicado à sua revenda.",
  /** Curto de propósito: o LCP da página é o H1 (`tests/automotivo.test.ts`). */
  resumo:
    "Site de estoque ligado ao sistema que a loja já usa, agente de IA no WhatsApp, CRM e rastreamento até a venda, com preço de referência.",
  /** Os sistemas de gestão com que o Sprint para revendas trabalha: um em produção, os outros por fluxo (Dyones, 13/10). */
  sistemas: {
    rotulo: "Funciona com o sistema da loja",
    emProducao: SISTEMA_EM_PRODUCAO,
    integraveis: SISTEMAS_INTEGRAVEIS,
    outros: "outro sistema, por fluxo",
  },
  fatos: [
    { rotulo: "Dois caminhos", valor: "O Site Conectado e a Operação com IA, juntos ou um de cada vez" },
    { rotulo: "Integração em produção", valor: "Revenda Mais: o estoque entra no site e no agente sozinho" },
    { rotulo: "Integráveis por fluxo", valor: listaDeSistemasIntegraveis() },
    { rotulo: "Referência", valor: "Motors Store, revenda de seminovos em Curitiba, com números lidos do banco" },
  ],
  pacote: {
    titulo: "O que a V2O5 monta para revendas.",
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
  /** Os dois caminhos para revendas (27/10/2026), com o preço da tabela e a continuidade opcional. */
  planos: {
    titulo: "Dois caminhos para revendas.",
    texto:
      "Os mesmos pacotes que a V2O5 vende para qualquer negócio, aplicados à revenda. Um cuida do site e do estoque; o outro, do atendimento. Dá para começar por qualquer um e somar o outro depois, na mesma base. Os valores são de referência, e o preço fechado sai em proposta.",
    itens: [
      {
        id: "site",
        nome: SITE_CONECTADO.nome,
        sprint: "Sites & Integrações",
        para: "Para a revenda que quer o site ligado ao estoque do sistema de gestão, com os contatos medidos.",
        inclui: [
          "Tudo do Site Personalizado, com a página de cada veículo e o tratamento dos vendidos",
          "Estoque alimentado pelo sistema de gestão, por feed, API ou outro meio autorizado (Revenda Mais em produção)",
          "Contatos medidos até o sistema da loja, com a origem gravada",
          "Aviso quando a integração falha",
        ],
        rotuloDoPreco: "Implantação",
        preco: precoEmTexto(SITE_CONECTADO.preco).replace(/^a/, "A"),
        rotuloDaContinuidade: "Continuidade opcional",
        continuidade: `${MONITORADAS.nome}, ${mensalEmTexto(MONITORADAS.mensal)}`,
      },
      {
        id: "operacao",
        nome: "Operação com IA",
        sprint: SPRINT_INTEGRADO.nome,
        para: "Responder na hora, a qualquer hora, sem perder o contato que chegou.",
        inclui: [
          "Agente de IA no WhatsApp com o estoque real",
          "CRM com funil, origem do contato e aviso de lead parado",
          "Passagem do agente para o vendedor na mesma conversa",
          "Treinamento da equipe",
        ],
        rotuloDoPreco: "Preço de referência",
        preco: precoEmTexto(SPRINT_INTEGRADO.preco),
        rotuloDaContinuidade: "Continuidade opcional",
        continuidade: `${MONITORADAS.nome}, ${mensalEmTexto(MONITORADAS.mensal)}, ou ${EVOLUCAO.nome}, ${mensalEmTexto(EVOLUCAO.mensal)}`,
      },
    ],
    rodape:
      "Uso da IA e mensagens do WhatsApp ficam por fora, pelo valor do provedor, discriminados na fatura, com teto mensal combinado e aviso antes de ultrapassá-lo; a V2O5 gerencia. A campanha de anúncios fica com a loja ou com a agência dela.",
  },
  case: {
    texto: "O que foi construído na Motors Store, os números lidos no banco da loja e o caminho de um lead, do estoque à venda, estão no case.",
    href: "/cases/motors-store",
    botao: "Ler o case da Motors Store",
  },
  perguntas: [
    {
      pergunta: "Minha loja usa outro sistema de gestão. Funciona?",
      resposta:
        `O site lê o estoque do sistema que a loja já usa. Com o Revenda Mais a integração está em produção. ${listaDeSistemasIntegraveis()} entram como integração definida na proposta, depois de ver a API ou a exportação que cada um oferece; o mesmo vale para outro sistema.`,
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
        "Pode. O Site Conectado funciona sozinho: o estoque no site e a origem dos contatos primeiro, e a Operação com IA entra depois, na mesma base.",
    },
    {
      pergunta: "O site e os dados são meus?",
      resposta:
        "Sim. Domínio, hospedagem e código ficam no nome da loja, e os dados ficam num banco do seu negócio, com exportação quando você pedir, nos termos do contrato.",
    },
  ],
  chamada: {
    titulo: "Quer ver o sistema rodando na sua revenda?",
    texto:
      "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o sistema da Motors Store, para identificar e priorizar o gargalo da sua revenda.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver todos os preços",
  },
};
