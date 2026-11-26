import { listaDeSistemasIntegraveis, SISTEMA_EM_PRODUCAO, SISTEMAS_INTEGRAVEIS } from "@/conteudo/diagnostico";
import { mensalEmTexto, precoEmTexto } from "@/conteudo/precos";
import { ofertaDa, PLANOS_DE_CONTINUIDADE } from "@/conteudo/ofertas";
/**
 * Página de exemplo do segmento automotivo (`/segmentos/revendas-de-veiculos`):
 * as mesmas soluções que a V2O5 vende para qualquer negócio, aplicadas à
 * revenda a partir do que roda na Motors Store. Desde 17/11/2026 não há
 * produto próprio para revendas (Dyones: revenda como prova, não como
 * produto). Desde 25/11/2026 (foco em pequenos negócios, sem anúncio) a
 * página fala de três peças: site ligado ao estoque, atendimento e
 * qualificação com IA no WhatsApp e o lead entregue ao CRM da loja. Os dois
 * caminhos são o Site Conectado, de Sites & Integrações, e o Atendimento
 * Integrado, do Atendimento com IA. Os valores saem de `ofertas.ts`. Os
 * números do case moram em `/cases/motors-store`, que o hub só aponta.
 * `tests/automotivo.test.ts` confere.
 */
const SITE_CONECTADO = ofertaDa("sites").pacotes.find((p) => p.nome === "Site Conectado")!;
const ATENDIMENTO_INTEGRADO = ofertaDa("atendimento").pacotes.find((p) => p.nome === "Atendimento Integrado")!;
const [, MONITORADAS, EVOLUCAO] = PLANOS_DE_CONTINUIDADE;

export const HUB_AUTOMOTIVO = {
  rota: "/segmentos/revendas-de-veiculos",
  sobretitulo: "Revendas de veículos",
  titulo: "Site de estoque e atendimento com IA para revendas de veículos.",
  /** Curto de propósito: o LCP da página é o H1 (`tests/automotivo.test.ts`). */
  resumo:
    "Site de estoque ligado ao sistema da loja e um agente de IA que atende, qualifica e entrega o lead pronto ao CRM, com preço de referência.",
  /** Os sistemas de gestão com que a V2O5 trabalha para revendas: um em produção, os outros por fluxo (Dyones, 13/10). */
  sistemas: {
    rotulo: "Funciona com o sistema da loja",
    emProducao: SISTEMA_EM_PRODUCAO,
    integraveis: SISTEMAS_INTEGRAVEIS,
    outros: "outro sistema, por fluxo",
  },
  fatos: [
    { rotulo: "Dois caminhos", valor: "O Site Conectado e o Atendimento Integrado, juntos ou um de cada vez" },
    { rotulo: "Integração em produção", valor: "Revenda Mais: o estoque entra no site e no agente sozinho" },
    { rotulo: "Integráveis por fluxo", valor: listaDeSistemasIntegraveis() },
    { rotulo: "Referência", valor: "Motors Store, revenda de seminovos em Curitiba, com números lidos do banco" },
  ],
  pacote: {
    titulo: "O que a V2O5 monta para revendas.",
    texto:
      "Três peças na mesma base: o que entra por uma aparece nas outras. As três rodam na Motors Store. O escopo de cada projeto sai em proposta.",
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
          "Responde com o estoque real, qualifica com as perguntas da loja (interesse, prazo, forma de pagamento) e agenda a visita.",
      },
      {
        linha: "Integração com o sistema da loja",
        titulo: "Lead pronto no CRM da loja",
        texto:
          "O lead qualificado entra no CRM que a loja já usa, com o carro de interesse, a origem e a conversa, e o vendedor segue dali. Em produção com o Revenda Mais.",
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
        solucao: "Sites & Integrações",
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
        nome: ATENDIMENTO_INTEGRADO.nome,
        solucao: ofertaDa("atendimento").nome,
        para: "Para responder na hora, a qualquer hora, qualificar e entregar o lead pronto ao vendedor.",
        inclui: [
          "Agente de IA no WhatsApp com o estoque real",
          "Qualificação com as perguntas da loja: interesse, prazo e forma de pagamento",
          "Lead entregue ao CRM da loja, com a ficha e a conversa",
          "Treinamento da equipe",
        ],
        rotuloDoPreco: "Implantação",
        preco: precoEmTexto(ATENDIMENTO_INTEGRADO.preco).replace(/^a/, "A"),
        rotuloDaContinuidade: "Continuidade opcional",
        continuidade: `${MONITORADAS.nome}, ${mensalEmTexto(MONITORADAS.mensal)}, ou ${EVOLUCAO.nome}, ${mensalEmTexto(EVOLUCAO.mensal)}`,
      },
    ],
    rodape:
      "Uso da IA e mensagens do WhatsApp ficam por fora, pelo valor do provedor, discriminados na fatura, com teto mensal combinado e aviso antes de ultrapassá-lo; a V2O5 gerencia.",
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
        "Se a loja já tem equipe ou fotógrafo, o site e o agente usam as fotos que estão no sistema. Se não tem, a V2O5 pode indicar parceiros de fotografia, contratados à parte.",
    },
    {
      pergunta: "Posso começar só pelo site de estoque?",
      resposta:
        "Pode. O Site Conectado funciona sozinho: o estoque no site e a origem dos contatos primeiro, e o Atendimento Integrado entra depois, na mesma base.",
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
      "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o sistema da Motors Store, para ver onde a sua revenda perde cliente.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver todos os preços",
  },
};
