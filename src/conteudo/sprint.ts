/**
 * Sprint de Eficiência e continuidade: a política comercial do apêndice de
 * `CLAUDE_SITE_IMPLEMENTATION_AJUSTADO.md`, que o Dyones aprovou por inteiro
 * em 25/10/2026 ("todo o apêndice pode ser tratado como aprovado"). As
 * faixas do Sprint e da continuidade mensal são de referência: o preço
 * fechado de cada projeto sai em proposta. Em 25/10/2026 o Dyones decidiu
 * que só o Sprint e a recorrência que acompanha o Sprint têm valor público
 * (o resto do cardápio de 15/10 é dado interno). A faixa mensal paga a gestão
 * continuada; nuvem e IA ficam por fora, pelo valor do provedor e discriminadas,
 * e a V2O5 gerencia as duas (Dyones, 25/10). Não se detalha quem é dono das
 * contas: o texto só fala em recorrência.
 * Duração é referência, nunca promessa. Sem percentual, ROI nem garantia de
 * resultado. O repetido em `memory/context/oferta.md` é conferido por
 * `tests/sprint.test.ts`.
 */
import { BRL } from "@/conteudo/precos";

export interface Faixa {
  de: number;
  ate: number;
  /** A faixa é "a partir de" no teto (Sprint Avançada: 12.000 a 25.000 ou mais). */
  ouMais?: boolean;
}

export const faixaEmTexto = (f: Faixa) => `${BRL(f.de)} a ${BRL(f.ate)}${f.ouMais ? " ou mais" : ""}`;

export const SPRINT_DE_PRECOS = {
  sobretitulo: "Sprint de Eficiência",
  titulo: "Um projeto fechado para um gargalo, com preço em proposta.",
  texto:
    "As faixas abaixo são de referência e mudam com a complexidade, o risco e os custos diretos. O valor fechado sai depois de delimitar o gargalo. A duração é referência, não promessa automática.",
  niveis: [
    {
      nome: "Sprint Essencial",
      faixa: { de: 3000, ate: 5000 } as Faixa,
      duracao: "1 a 2 semanas",
      para: "Um problema específico, resolvido por uma intervenção pequena.",
      exemplos:
        "Corrigir o fluxo de captação de leads, automatizar uma tarefa repetitiva, integrar duas ferramentas que já existem ou melhorar um processo com gargalo claro.",
    },
    {
      nome: "Sprint Integrada",
      faixa: { de: 6000, ate: 12000 } as Faixa,
      duracao: "2 a 4 semanas",
      para: "Um gargalo que pede mudanças ligadas em processo, tecnologia e operação.",
      exemplos:
        "Estruturar captação, qualificação e distribuição de leads, integrar CRM, WhatsApp e automações, redesenhar o atendimento com indicadores ou melhorar a jornada entre aquisição e conversão.",
      principal: true,
    },
    {
      nome: "Sprint Avançada",
      faixa: { de: 12000, ate: 25000, ouMais: true } as Faixa,
      duracao: "4 a 8 semanas ou mais",
      para: "Vários sistemas, regras de negócio, migrações ou maior risco técnico.",
      exemplos:
        "Orquestração entre sistemas, IA com fluxos de exceção ou reestruturação comercial com várias equipes. Pede escopo técnico e critérios de aceite mais rigorosos.",
    },
  ],
  revisao:
    "Uma solução que parecia simples pode revelar sistemas antigos ou dependências a mais. Nesse caso, escopo, prazo e proposta são revistos antes de seguir.",
  formacao: {
    titulo: "Do que o preço é feito",
    itens: [
      "Execução: diagnóstico aprofundado, desenvolvimento, configuração, testes e implantação.",
      "Complexidade e risco: integrações frágeis, dados ruins, dependência de terceiros e incerteza técnica.",
      "Custos diretos: APIs, infraestrutura, licenças e fornecedores do projeto, discriminados na proposta.",
    ],
  },
};

export const CONTINUIDADE = {
  titulo: "O que continua depois da entrega.",
  texto:
    "O Sprint termina na entrega. Se a solução continua rodando, há uma parte recorrente, em contrato à parte, com limites de atendimento e escopo escritos. A proposta separa cada custo:",
  recorrencia: [
    {
      titulo: "Gestão continuada",
      texto: "Monitoramento, correções e ajustes, com capacidade reservada. É a faixa mensal abaixo.",
    },
    {
      titulo: "Nuvem",
      texto: "Servidor, banco de dados e backups, pelo valor do provedor e discriminados. A V2O5 gerencia.",
    },
    {
      titulo: "IA e mensagens",
      texto:
        "O consumo de IA e as mensagens do WhatsApp variam com o volume e vêm pelo valor do provedor, discriminados na fatura. A V2O5 gerencia.",
    },
  ],
  porque:
    "Modelos de IA, APIs e regras do negócio mudam, e o que funciona na entrega precisa de ajuste para continuar funcionando.",
  modalidades: [
    {
      nome: "Estabilidade e suporte",
      faixa: { de: 1200, ate: 2500 } as Faixa,
      texto: "Monitoramento acordado, correções dentro do escopo, manutenção e acompanhamento técnico.",
    },
    {
      nome: "Evolução contínua",
      faixa: { de: 2500, ate: 5000 } as Faixa,
      texto: "Suporte, revisão de indicadores e capacidade mensal reservada para melhorias priorizadas.",
    },
  ],
  limites:
    "O contrato define prazo de resposta, canais, limite de horas ou capacidade, exclusões e o preço de demandas adicionais. A faixa mensal paga a gestão: nuvem, IA e demais custos de terceiros ficam por fora, discriminados. Ela não cobre desenvolvimento ilimitado, plantão irrestrito, nova integração sem orçamento nem garantia de resultado comercial. Novos gargalos, integrações, automações ou produtos são orçados à parte.",
};

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
        "Em projetos, 50% na contratação, 30% na validação intermediária e 20% no aceite final. Em Sprints pequenas, 50% na contratação e 50% na entrega.",
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
