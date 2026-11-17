import { CASE } from "@/conteudo/home";

/**
 * Página do case Motors Store. Tudo que é número vem de
 * `memory/projects/case-motors.md` (lido do banco da loja em 17/11/2026,
 * leads de 05/09 a 17/11; a leitura de 08/10 ficou no histórico) e
 * `tests/case.test.ts` confere. O atendimento entra desde 17/11: o Ney, agente
 * de IA da loja, roda pela Evolution API desde 21/10 (fora do Chatwoot), e o
 * tempo até a primeira resposta sai das mensagens gravadas por ele.
 * Publicação de nome, logo e números autorizada pelo Dyones em 08/10.
 * Regra do Dyones (11/10): só número medido, com fonte; sem ressalva sobre o
 * que ainda não foi medido e sem promessa de dado futuro. Cliente compra
 * resultado.
 */

export const CASE_MOTORS = {
  rota: "/cases/motors-store",
  cliente: {
    nome: "Motors Store",
    url: "https://motorsstore.com.br",
    cidade: "Curitiba",
    estado: "PR",
    ramo: "revenda de seminovos",
  },
  sobretitulo: "Case",
  titulo: "Motors Store: o sistema inteiro numa revenda de seminovos.",
  /** Curto de propósito: o LCP da página é o H1, e um parágrafo maior que ele rouba o posto (regra do CLAUDE.md; `tests/case.test.ts`). */
  resumo:
    "A V2O5 montou para a Motors Store, em Curitiba, o site de estoque, o agente de IA no WhatsApp, o rastreamento até a venda e as automações.",
  fatos: [
    { rotulo: "Cliente", valor: "Motors Store, revenda de seminovos em Curitiba" },
    { rotulo: "Entrega", valor: "site de estoque, agente de IA, guias, rastreamento, painel e automações" },
    { rotulo: "Fonte", valor: "banco de dados da Motors, lido em 17/11/2026" },
  ],
  /**
   * Os gargalos que o Dyones confirmou em 25/10/2026 (roteiro ajustado). São
   * diagnóstico, não resultado: aparecem separados do que foi implementado e
   * do que foi medido.
   */
  diagnosticado: {
    sobretitulo: "Antes: diagnosticado",
    titulo: "O que travava a Motors Store.",
    texto: "Os gargalos identificados antes da intervenção, na ordem da jornada do comprador.",
    itens: [
      "Baixa visibilidade nas buscas orgânicas, nos buscadores e nas IAs.",
      "Falta de leads qualificados.",
      "Presença digital fraca.",
      "Design do site ruim.",
      "Site lento.",
      "Acompanhamento comercial inconsistente.",
    ],
  },
  construido: {
    sobretitulo: "Depois: implementado",
    titulo: "O que a V2O5 montou.",
    texto: "Cada peça é uma linha do cardápio da V2O5, ligada às outras pela mesma base de dados.",
    pecas: [
      {
        linha: "Sites e presença",
        titulo: "Site de estoque em Next.js",
        texto:
          "Vitrine, ficha de veículo, páginas por marca e modelo e seis páginas locais escritas à mão. O estoque entra sozinho do Revenda Mais.",
      },
      {
        linha: "SEO e busca por IA",
        titulo: "26 guias com método próprio",
        texto:
          "Hub de conteúdo assinado pelo fundador da V2O5, com dados estruturados por página, llms.txt e IndexNow, para o Google e as IAs encontrarem cada guia.",
      },
      {
        linha: "Rastreamento até a venda",
        titulo: "Cada lead com a origem",
        texto:
          "Camada de dados versionada e testada; Meta Pixel com API de Conversões deduplicada por event_id; GA4 e GTM; UTM e click IDs gravados no lead.",
      },
      {
        linha: "Atendimento com IA",
        titulo: "O Ney, agente da loja no WhatsApp",
        texto:
          "Agente de IA feito para a Motors: responde com o estoque real, qualifica pela régua da loja e passa o cliente à equipe na hora certa.",
      },
      {
        linha: "Integrações entre sistemas",
        titulo: "Lead qualificado no CRM do Revenda Mais",
        texto:
          "Na passagem, o lead vai ao CRM do Revenda Mais com a origem da mídia, o carro de interesse e a qualificação do Ney, e o CRM distribui ao vendedor.",
      },
      {
        linha: "CRM e sistemas sob medida",
        titulo: "Painel da loja",
        texto:
          "A mesa do Ney: quem está com o agente, quem já foi ao CRM e quem precisa do dono, junto do estoque, da mídia paga e das consultas de placa.",
      },
      {
        linha: "Automação de processos",
        titulo: "Rotinas no n8n",
        texto:
          "Sincronização do estoque com o Revenda Mais, entrada das conversas do WhatsApp pela Evolution API, rodada do atendimento a cada 15 minutos e alerta de falha de integração.",
      },
      {
        linha: "Conteúdo com IA",
        titulo: "Descritivo de veículo com IA",
        texto:
          "Gerador de descritivo com modelo de linguagem, validado contra invenção de dado: o texto só sai com o que a ficha confirma.",
      },
    ],
  },
  numeros: {
    sobretitulo: "Medido",
    titulo: "Os números do sistema.",
    fonte: CASE.fonte,
    itens: [
      {
        valor: 237,
        complemento: "",
        texto: "leads no funil de 05/09 a 17/11: 131 pelos formulários do site e 106 pelo WhatsApp direto",
      },
      {
        valor: 129,
        complemento: "de 131",
        texto: "leads do site com o identificador que impede a Meta de contar a mesma conversão duas vezes",
      },
      { valor: 113, complemento: "de 131", texto: "leads do site ligados ao veículo que motivou o contato" },
      {
        valor: 96,
        complemento: "de 131",
        texto: "leads do site com gclid ou fbclid: o anúncio exato que trouxe a pessoa",
      },
      { valor: 26, complemento: "", texto: "guias publicados, assinados pelo fundador da V2O5" },
      {
        valor: 148,
        complemento: "",
        texto: "veículos no estoque sincronizado com o Revenda Mais, 60 já marcados como vendidos",
      },
    ],
  },
  rastreio: {
    titulo: "Como a venda fica rastreável.",
    texto:
      "Cada lead do site sai com um identificador que o navegador e o servidor compartilham. A Meta e o Google recebem a mesma conversão pelos dois caminhos e contam uma vez só. O lead chega com a origem, o anúncio e o carro, e leva os três até o CRM do Revenda Mais.",
    exemplo: "Formato real dos eventos; os valores são ilustrativos.",
  },
  /**
   * O Ney e o lead qualificado no CRM do Revenda Mais (17/11/2026). Como
   * funciona: `docs/ATENDIMENTO_IA.md`, `docs/FLUXO_DO_LEAD.md` e
   * `docs/INTEGRACAO_REVENDAMAIS.md` do repositório da Motors. Números lidos
   * do banco em 17/11 (`memory/projects/case-motors.md`). A ficha é o formato
   * do texto que vai ao CRM, com valores ilustrativos.
   */
  atendimento: {
    sobretitulo: "Atendimento com IA",
    titulo: "O Ney qualifica, o Revenda Mais distribui.",
    texto:
      "O Ney é o agente de IA da Motors Store no WhatsApp, feito sob medida para a loja. Ele conversa com quem chega pelo anúncio, pelo site ou direto, e só passa o cliente à equipe quando a conversa está pronta para o vendedor.",
    passos: [
      {
        titulo: "Responde com o estoque real",
        texto: "Lê o estoque que o Revenda Mais sincroniza, com o link de cada carro, e manda as fotos aos poucos: primeiro de fora, o interior se o cliente quiser.",
      },
      {
        titulo: "Preenche a ficha e soma o aquecimento",
        texto: "Carro, forma de pagamento, entrada, troca, prazo e visita. Uma régua de pesos dá a nota de 0 a 100 e mostra o motivo de cada ponto.",
      },
      {
        titulo: "Passa na hora certa",
        texto: "Quando o cliente marca a visita, chega à simulação do financiamento, pede uma condição que só o vendedor dá ou pede para falar com uma pessoa.",
      },
      {
        titulo: "Entrega no CRM do Revenda Mais",
        texto: "O lead vai ao CRM com a origem da mídia, o carro de interesse e a qualificação do Ney, e o CRM escolhe o vendedor. Se o CRM recusar, o envio tenta de novo e o dono é avisado.",
      },
      {
        titulo: "Retoma sem atropelar a equipe",
        texto: "Quem parou de responder recebe uma retomada no tempo certo. Quem já está com um vendedor fica com ele, e a mensagem nova vai para a loja.",
      },
    ],
    numeros: [
      { valor: 125, complemento: "", texto: "clientes atendidos pelo Ney no WhatsApp desde 21/10" },
      {
        valor: 93,
        complemento: "de 100",
        texto: "primeiras mensagens respondidas pelo Ney em até um minuto, com mediana de 38 segundos",
      },
      { valor: 37, complemento: "", texto: "leads qualificados pelo Ney entregues ao CRM do Revenda Mais desde 04/11" },
    ],
    fonte: "Banco de dados da Motors Store, lido em 17/11/2026. Conversas de 21/10 a 17/11/2026; envios ao CRM de 04/11 a 17/11/2026.",
    ficha: {
      legenda: "lead no CRM do Revenda Mais",
      nota: "Formato do lead que chega ao CRM; os valores são ilustrativos.",
      titulo: "VISITA MARCADA, qualificado pelo Ney",
      linhas: [
        ["Aquecimento", "82/100, quer visitar a loja"],
        ["Visita marcada", "sábado, às 10h"],
        ["Procura", "Compass Longitude 2021"],
        ["Pagamento", "financiado, com entrada"],
        ["Troca", "Gol 2015"],
        ["Origem", "Site da Loja - Meta ADS, com a campanha e o anúncio"],
        ["Resumo da conversa", "o que o cliente pediu, em poucas linhas"],
      ],
    },
  },
  stack: {
    titulo: "Com o que foi feito",
    itens: ["Next.js", "Vercel", "Supabase", "n8n", "Evolution API", "Meta Pixel e API de Conversões", "GA4 e GTM", "Revenda Mais (estoque e CRM)"],
  },
  assinatura:
    "Quem assina os 26 guias da Motors Store é o fundador da V2O5, Dyones Oliveira. É ele quem conduz o diagnóstico gratuito.",
  chamada: {
    titulo: "Quer o mesmo sistema na sua revenda?",
    texto: "Os caminhos da V2O5 para revendas partem deste sistema. O diagnóstico gratuito diz por onde começar.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver os caminhos para revendas",
  },
};

/**
 * Página do case da 16ª Vara Cível (17/11/2026): a triagem do atendimento por
 * WhatsApp da serventia, em uso desde outubro de 2025. Publicação do nome
 * autorizada pela vara (Dyones, 17/11/2026). O detalhe do cliente mora no
 * repositório privado; aqui entra só o que a leitura dos fluxos de 14/10/2026
 * confirma. Sem IA: a versão em uso é triagem por menu. Sem número por
 * enquanto: a regra de quando os números entram está em
 * `memory/projects/case-16-vara-civel.md`. `tests/case-16-vara-civel.test.ts` confere.
 */
export const CASE_16VC = {
  rota: "/cases/16-vara-civel",
  cliente: {
    nome: "16ª Vara Cível de Curitiba",
    completo: "Serventia da 16ª Vara Cível do Foro Central de Curitiba",
    cidade: "Curitiba",
    estado: "PR",
    ramo: "serventia judicial do TJPR",
  },
  sobretitulo: "Case",
  titulo: "16ª Vara Cível: a triagem do WhatsApp da serventia.",
  /** Curto de propósito: o LCP da página é o H1. */
  resumo:
    "A V2O5 montou para a 16ª Vara Cível de Curitiba a triagem automatizada do WhatsApp, que separa cada pedido por assunto e setor antes de chegar à equipe.",
  fatos: [
    { rotulo: "Cliente", valor: "Serventia da 16ª Vara Cível do Foro Central de Curitiba (TJPR)" },
    { rotulo: "Entrega", valor: "triagem por WhatsApp, encaminhamento por setor e registro no sistema de atendimento" },
    { rotulo: "Em uso", valor: "desde outubro de 2025" },
  ],
  antes: {
    sobretitulo: "Antes: o ponto de partida",
    titulo: "O que chegava pelo WhatsApp.",
    texto: "O fluxo desenhado em maio de 2025 para o atendimento da serventia, antes da automação.",
    itens: [
      "Pedidos sobre andamento de processo e diligências chegavam pela mesma conversa.",
      "Parte do que chegava era do gabinete das magistradas, e parte da serventia.",
      "Na serventia, cada diligência tem um setor responsável, e alguém precisava triar e encaminhar.",
    ],
  },
  construido: {
    sobretitulo: "Depois: implementado",
    titulo: "O que a V2O5 montou.",
    texto: "Uma triagem por menu, sem resposta jurídica automática: ela coleta os dados, encaminha e deixa a resposta com a equipe da serventia.",
    pecas: [
      {
        linha: "Atendimento no WhatsApp",
        titulo: "Três caminhos logo na entrada",
        texto: "Boas-vindas em nome da 16ª Vara Cível e um menu: recebi uma intimação, consultar um processo ou tirar uma dúvida.",
      },
      {
        linha: "Consulta de processo",
        titulo: "Os dados certos antes de encaminhar",
        texto:
          "Nome, parte ou advogado, número do processo no formato do CNJ e a situação: concluso com a magistrada ou em análise na serventia. Antes de enviar, a pessoa confere os dados.",
      },
      {
        linha: "Encaminhamento por setor",
        titulo: "Cada conversa marcada com o setor",
        texto:
          "Na serventia, a pessoa escolhe o setor, e a conversa entra no sistema de atendimento com o setor e os dados preenchidos, e a pessoa recebe o prazo de retorno.",
      },
      {
        linha: "Intimação e gabinete",
        titulo: "Cada assunto no seu caminho",
        texto:
          "Quem recebeu uma intimação pelo WhatsApp é chamado por um atendente para confirmar a identidade. Assunto do gabinete recebe a orientação de contato com o gabinete da magistrada.",
      },
    ],
  },
  stack: {
    titulo: "Com o que foi feito",
    itens: ["WhatsApp", "Evolution API", "Typebot", "n8n", "Chatwoot"],
  },
  assinatura: "O projeto é conduzido pelo fundador da V2O5, Dyones Oliveira. É ele quem conduz o diagnóstico gratuito.",
  chamada: {
    titulo: "Sua equipe tria pedidos um por um no WhatsApp?",
    texto: "O diagnóstico é gratuito: 45 minutos com o fundador para identificar e priorizar o gargalo do seu atendimento.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver todos os preços",
  },
};
