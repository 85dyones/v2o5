/**
 * Sprint de Eficiência: o produto e o método aprovados em 25/10/2026, com os
 * valores do handoff de 27/10/2026 (Dyones: "manter o produto e o método";
 * R$ 3.900, R$ 6.900 e a partir de R$ 12.900, nomes no masculino). São preços
 * de referência: o valor fechado de cada projeto sai em proposta, depois de
 * delimitar o gargalo. Duração é referência, nunca promessa. Sem percentual,
 * ROI nem garantia de resultado. A continuidade que pode vir depois mora em
 * `ofertas.ts`, à parte e opcional. O repetido em `memory/context/oferta.md`
 * é conferido por `tests/sprint.test.ts`.
 */
import type { Preco } from "@/conteudo/precos";

export const SPRINT_DE_PRECOS = {
  sobretitulo: "Sprint de Eficiência",
  titulo: "Um projeto fechado para um gargalo, com preço em proposta.",
  texto:
    "Os valores são de referência e mudam com a complexidade, o risco e os custos diretos. O valor fechado sai depois de delimitar o gargalo. A duração é referência, não promessa automática.",
  niveis: [
    {
      nome: "Sprint Essencial",
      preco: { valor: 3900 } as Preco,
      duracao: "1 a 2 semanas",
      escopo: "Um gargalo delimitado, com a intervenção principal e a validação.",
      para: "Um problema específico, resolvido por uma intervenção pequena.",
      exemplos:
        "Corrigir o fluxo de captação de leads, automatizar uma tarefa repetitiva, integrar duas ferramentas que já existem ou melhorar um processo com gargalo claro.",
    },
    {
      nome: "Sprint Integrado",
      preco: { valor: 6900 } as Preco,
      duracao: "2 a 4 semanas",
      escopo: "Um fluxo que envolve sistemas, com validação, documentação e indicadores.",
      para: "Um gargalo que pede mudanças ligadas em processo, tecnologia e operação.",
      exemplos:
        "Estruturar captação, qualificação e distribuição de leads, integrar CRM, WhatsApp e automações, redesenhar o atendimento com indicadores ou melhorar a jornada entre aquisição e conversão.",
      principal: true,
    },
    {
      nome: "Sprint Avançado",
      preco: { valor: 12900, aPartirDe: true } as Preco,
      duracao: "4 a 8 semanas ou mais",
      escopo: "Integrações complexas, desenvolvimento específico, regras de negócio ou IA.",
      para: "Vários sistemas, regras de negócio, migrações ou maior risco técnico.",
      exemplos:
        "Orquestração entre sistemas, IA com fluxos de exceção ou reestruturação comercial com várias equipes. Pede escopo técnico e critérios de aceite mais rigorosos.",
    },
  ],
  revisao:
    "Uma solução que parecia simples pode revelar sistemas antigos ou dependências a mais. Nesse caso, escopo, prazo e proposta são revistos antes de seguir.",
  descoberta:
    "Quando o projeto pede levantamento técnico detalhado, ele pode começar por uma etapa de descoberta paga, com preço acordado antes da execução.",
  formacao: {
    titulo: "Do que o preço é feito",
    itens: [
      "Execução: diagnóstico aprofundado, desenvolvimento, configuração, testes e implantação.",
      "Complexidade e risco: integrações frágeis, dados ruins, dependência de terceiros e incerteza técnica.",
      "Custos diretos: APIs, infraestrutura, licenças e fornecedores do projeto, discriminados na proposta.",
    ],
  },
};

/**
 * O método obrigatório do Sprint, em seis passos (handoff de 27/10/2026).
 * Automação, IA, dados, painéis e copilotos são recursos da solução, não
 * produtos do menu.
 */
export const METODO = [
  {
    titulo: "Mapear o processo real",
    texto: "Como o fluxo acontece hoje, quem participa, onde trava e quanto custa. Registramos a situação inicial antes de mexer.",
  },
  {
    titulo: "Simplificar antes de automatizar",
    texto: "Tiramos as etapas que não precisam existir. Nem todo problema pede um agente de IA ou um software novo.",
  },
  {
    titulo: "Escolher a intervenção proporcional",
    texto: "Comprar, integrar, automatizar ou desenvolver, conforme o problema. A proposta fecha o escopo e os critérios de aceite.",
  },
  {
    titulo: "Implementar a solução acordada",
    texto: "Ligamos as ferramentas que já existem e, quando faz sentido, construímos integrações, automações ou agentes, com testes.",
  },
  {
    titulo: "Comparar antes e depois",
    texto: "Os indicadores disponíveis voltam a ser medidos e comparados com a situação inicial.",
  },
  {
    titulo: "Registrar e decidir o próximo passo",
    texto: "Documentamos o que mudou e decidimos a próxima melhoria, ou encerramos.",
  },
];

export const CONDICOES = {
  titulo: "Como o projeto é combinado",
  itens: [
    {
      titulo: "Escopo e aceite",
      texto:
        "Toda proposta define o problema, os entregáveis, as exclusões, o prazo, as responsabilidades do cliente, os critérios de aceite e os custos recorrentes. Mudança de escopo exige nova estimativa e aprovação.",
    },
    {
      titulo: "Pagamento",
      texto:
        "Em projetos, 50% na contratação, 30% na validação intermediária e 20% no aceite final. Em Sprints pequenos, 50% na contratação e 50% na entrega.",
    },
    {
      titulo: "Prazos e dependências",
      texto:
        "O cronograma depende de acessos, dados e aprovações do cliente. Bloqueios relevantes podem suspender ou reprogramar etapas, conforme o contrato.",
    },
    {
      titulo: "Defeitos e novas necessidades",
      texto:
        "Defeitos da implementação são corrigidos num período definido na proposta. Novas funcionalidades, mudanças externas e novas necessidades são tratadas à parte.",
    },
    {
      titulo: "Resultado",
      texto:
        "O preço remunera a entrega acordada. Aumento de vendas não é prometido antes de conhecer o cenário. Bônus por desempenho é complementar e excepcional, só com métrica objetiva, linha de base confiável, acesso aos dados e regra de atribuição acordada. Participação no resultado pede contrato específico e não substitui a remuneração mínima.",
    },
  ],
};
