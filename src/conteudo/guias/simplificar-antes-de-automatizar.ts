import type { Guia } from "@/conteudo/guias/tipos";

/**
 * Guia 8 da fila (`docs/plano-de-conteudo.md`, seção 5): o método do `/sobre`
 * em formato de guia. Rascunho de 27/10/2026: sem demanda verificada no
 * Search Console ainda (critério 1), por isso `estado: "rascunho"`. Só usa
 * material que a V2O5 já publica (método, indicadores e o diagnóstico).
 */
export const GUIA_SIMPLIFICAR_ANTES_DE_AUTOMATIZAR: Guia = {
  slug: "simplificar-antes-de-automatizar",
  cluster: "processo",
  titulo: "Simplificar antes de automatizar: as cinco perguntas",
  descricao:
    "As cinco perguntas que eu faço antes de automatizar um processo, e como decidir entre eliminar uma etapa, integrar sistemas ou automatizar.",
  resposta:
    "Antes de automatizar um processo, responda cinco perguntas: qual é o problema, como funciona hoje e quanto custa, o que vai mudar, qual indicador deve mudar e se o resultado justificou o investimento. Se as duas primeiras mostram uma etapa que não precisava existir, eliminá-la costuma custar menos do que automatizá-la.",
  secoes: [
    {
      pergunta: "Por que simplificar antes de automatizar?",
      paragrafos: [
        "Automatizar um processo desnecessário só gasta recurso em velocidade. A tarefa continua sem sentido, agora com custo de ferramenta e de manutenção.",
        "Por isso o primeiro passo do meu trabalho é entender como a operação funciona de verdade. Só depois decido qual dos três caminhos resolve o problema com menos desperdício: desenvolver um sistema, integrar duas ferramentas que a empresa já tem ou eliminar uma etapa inútil.",
      ],
    },
    {
      pergunta: "Quais são as cinco perguntas?",
      paragrafos: [
        "Cada etapa do projeto tem uma pergunta que precisa de resposta escrita antes de a seguinte começar. É assim que a decisão deixa de depender de opinião.",
      ],
      tabela: {
        legenda: "As cinco etapas do projeto e a pergunta de cada uma",
        cabecalho: ["Etapa", "Pergunta", "O que sai dela"],
        linhas: [
          ["Diagnóstico", "Qual problema estamos tentando resolver?", "Um gargalo priorizado"],
          ["Linha de base", "Como funciona hoje e quanto custa?", "O ponto de partida, com número"],
          ["Intervenção", "O que será alterado e por quê?", "O escopo acordado"],
          ["Medição", "Qual indicador deve mudar?", "O indicador e como será lido"],
          ["Revisão", "O resultado justificou o investimento?", "A decisão sobre o próximo passo"],
        ],
      },
    },
    {
      pergunta: "Como decidir entre eliminar, integrar e automatizar?",
      paragrafos: [
        "A decisão sai do sinal que o processo dá, não da ferramenta que está na moda. A tabela resume o que eu procuro.",
      ],
      tabela: {
        legenda: "O sinal do processo e o caminho que ele indica",
        cabecalho: ["O que se vê no processo", "Caminho"],
        linhas: [
          ["Uma etapa cujo resultado ninguém usa", "Eliminar"],
          ["Dados copiados à mão entre dois sistemas que já existem", "Integrar"],
          ["Tarefa repetida, com regra clara e poucas exceções", "Automatizar"],
          ["Decisão com muita exceção e julgamento", "Manter com a equipe, com apoio de IA e passagem para uma pessoa"],
        ],
      },
    },
    {
      pergunta: "Que indicador usar antes e depois?",
      paragrafos: [
        "O indicador depende do problema escolhido, e é combinado antes de implementar. Os quatro que mais aparecem são o tempo para concluir uma tarefa, o retrabalho (quantas vezes a informação é recopiada ou pedida de novo), a conversão e a resposta (onde os contatos se perdem e quanto demora a resposta) e a visibilidade (se a equipe entende o estado da operação com dados confiáveis).",
        "Não existe um percentual de melhoria igual para todos. Define-se a linha de base, implementa-se dentro do escopo acordado e mede-se o que os dados disponíveis permitem medir.",
      ],
    },
    {
      pergunta: "O que sai de cada projeto?",
      paragrafos: [
        "Três coisas: algo funcionando, a evidência do que melhorou e uma decisão clara sobre o próximo passo, que pode ser uma nova melhoria ou encerrar. Implementar uma ferramenta é uma entrega técnica; melhorar o processo é uma entrega operacional; o resultado que importa para o cliente é a entrega de valor. São três coisas diferentes, e a medição existe para separar uma da outra.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Todo processo deve ser automatizado?",
      resposta:
        "Não. Processo com muita exceção e julgamento costuma ficar melhor com a equipe, com apoio de IA e passagem para uma pessoa quando a conversa pede. Automatizar só compensa quando a regra é clara e a tarefa se repete.",
    },
    {
      pergunta: "Preciso de IA para simplificar um processo?",
      resposta:
        "Não necessariamente. A IA entra onde faz diferença. Muitas vezes o ganho vem de eliminar uma etapa ou de integrar duas ferramentas que a empresa já usa.",
    },
    {
      pergunta: "Quanto tempo leva para achar o gargalo?",
      resposta:
        "O diagnóstico inicial é uma sessão gratuita de 45 minutos para entender o problema e priorizar um gargalo. Ele não inclui o mapeamento completo do processo, a implementação nem o acompanhamento.",
    },
    {
      pergunta: "E se a empresa já tem as ferramentas?",
      resposta:
        "Melhor ainda. Integrar o que já existe costuma ser mais barato do que comprar ou desenvolver algo novo, e é o caminho que eu avalio primeiro quando o problema é dado espalhado entre sistemas.",
    },
  ],
  saida: {
    href: "/diagnostico",
    titulo: "Qual processo está fazendo a sua operação perder tempo?",
    texto:
      "Traga o problema, como ele acontece hoje e o que deveria melhorar. A primeira conversa, de 45 minutos e gratuita, serve para avaliar se existe um bom caso para trabalhar.",
    botao: "Mapear um gargalo",
  },
  fontes: [{ rotulo: "O método e os indicadores da V2O5, descritos em Sobre e na home", url: "/sobre" }],
  relacionados: [],
  publicadoEm: "2026-10-27",
  atualizadaEm: "2026-10-27",
  estado: "rascunho",
};
