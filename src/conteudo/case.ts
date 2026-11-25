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
    "A V2O5 montou para a Motors Store, em Curitiba, o site de estoque, o agente de IA no WhatsApp, a entrega do lead ao CRM e as automações.",
  fatos: [
    { rotulo: "Cliente", valor: "Motors Store, revenda de seminovos em Curitiba" },
    { rotulo: "Entrega", valor: "site de estoque, agente de IA, guias, painel, integração com o CRM e automações" },
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
        linha: "Atendimento com IA",
        titulo: "O Ney, agente da loja no WhatsApp",
        texto:
          "Agente de IA feito para a Motors: responde com o estoque real, qualifica pela régua da loja e passa o cliente à equipe na hora certa.",
      },
      {
        linha: "Integrações entre sistemas",
        titulo: "Lead qualificado no CRM do Revenda Mais",
        texto:
          "Na passagem, o lead vai ao CRM do Revenda Mais com a origem do contato, o carro de interesse e a qualificação do Ney, e o CRM distribui ao vendedor.",
      },
      {
        linha: "CRM e sistemas sob medida",
        titulo: "Painel da loja",
        texto:
          "A mesa do Ney: quem está com o agente, quem já foi ao CRM e quem precisa do dono, junto do estoque e das consultas de placa.",
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
      { valor: 113, complemento: "de 131", texto: "leads do site ligados ao veículo que motivou o contato" },
      { valor: 26, complemento: "", texto: "guias publicados, assinados pelo fundador da V2O5" },
      {
        valor: 148,
        complemento: "",
        texto: "veículos no estoque sincronizado com o Revenda Mais, 60 já marcados como vendidos",
      },
    ],
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
      "O Ney é o agente de IA da Motors Store no WhatsApp, feito sob medida para a loja. Ele conversa com quem chega pelo site ou direto pelo WhatsApp, e só passa o cliente à equipe quando a conversa está pronta para o vendedor.",
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
        texto: "O lead vai ao CRM com a origem do contato, o carro de interesse e a qualificação do Ney, e o CRM escolhe o vendedor. Se o CRM recusar, o envio tenta de novo e o dono é avisado.",
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
        ["Origem", "Site da Loja"],
        ["Resumo da conversa", "o que o cliente pediu, em poucas linhas"],
      ],
    },
  },
  stack: {
    titulo: "Com o que foi feito",
    itens: ["Next.js", "Vercel", "Supabase", "n8n", "Evolution API", "Revenda Mais (estoque e CRM)"],
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
 * Página do case da 16ª Vara Cível: a triagem do atendimento por WhatsApp da
 * serventia, em uso desde outubro de 2025. Publicação do nome e da marca
 * autorizada pela vara (Dyones, 17/11/2026). Storytelling revisto em 17/11:
 * o ponto de partida (um WhatsApp para os onze setores), o desenho e as
 * regras, uma conversa de exemplo e o que muda para a equipe. Tudo sai da
 * leitura dos fluxos de 14/10/2026 (textos do Typebot e menu dos setores).
 * Sem IA: a versão em uso é triagem por menu. Números desde 17/11/2026,
 * quando o Dyones confirmou resolvido o problema de atribuição ao time: só
 * contagens lidas no sistema de atendimento em 14/10/2026, com fonte e
 * período (`memory/projects/case-16-vara-civel.md`). `tests/case-16-vara-civel.test.ts` confere.
 */
export const CASE_16VC = {
  rota: "/cases/16-vara-civel",
  cliente: {
    nome: "16ª Vara Cível de Curitiba",
    completo: "Serventia da 16ª Vara Cível do Foro Central de Curitiba",
    cidade: "Curitiba",
    estado: "PR",
    ramo: "serventia judicial do TJPR",
    /** Texto alternativo da marca do tribunal na ficha do cliente. */
    marca: "Tribunal de Justiça do Estado do Paraná",
  },
  sobretitulo: "Case",
  titulo: "16ª Vara Cível: a triagem do WhatsApp da serventia.",
  /** Curto de propósito: o LCP da página é o H1. */
  resumo:
    "Um WhatsApp para onze setores e o gabinete. A V2O5 desenhou com a serventia a triagem que separa cada pedido antes de ele chegar à equipe.",
  fatos: [
    { rotulo: "Cliente", valor: "Serventia da 16ª Vara Cível do Foro Central de Curitiba (TJPR)" },
    { rotulo: "Entrega", valor: "triagem por WhatsApp, encaminhamento por setor e registro no sistema de atendimento" },
    { rotulo: "Em uso", valor: "desde outubro de 2025" },
  ],
  antes: {
    sobretitulo: "Antes",
    titulo: "Um WhatsApp para onze setores.",
    texto:
      "Pelo mesmo número chegavam a intimação a confirmar, a pergunta sobre o andamento e a dúvida de quem advoga no processo. Cada pedido tinha um dono, o gabinete da magistrada ou um setor da serventia, e alguém da equipe precisava pedir o número do processo e descobrir a quem passar o pedido.",
    setoresTitulo: "Os onze caminhos da serventia",
    setores: [
      "Desarquivamento e arquivamento",
      "Recolhimento de guias",
      "Petições, juntadas e manifestações",
      "Alvarás, certidões e termos",
      "Editais, mandados e ofícios",
      "Sisbajud, Renajud e outros sistemas conveniados",
      "Retorno de conclusão",
      "Decurso de prazo",
      "Audiências",
      "Despacho com a magistrada",
      "Portarias do juízo",
    ],
  },
  desenho: {
    sobretitulo: "O desenho",
    titulo: "Primeiro o caminho, depois a ferramenta.",
    texto:
      "O fluxo foi desenhado com a serventia em maio de 2025, pergunta por pergunta, a partir de como cada setor trabalha. Está em uso desde outubro de 2025, e quatro regras vieram junto.",
    regras: [
      {
        titulo: "Nada de resposta jurídica automática",
        texto: "A triagem coleta os dados e encaminha. Quem responde sobre o processo é a equipe da serventia.",
      },
      {
        titulo: "Toda conversa tem saída para uma pessoa",
        texto: "Cada caminho leva a um setor da serventia, a um atendente ou ao contato do gabinete da magistrada.",
      },
      {
        titulo: "Intimação confirmada por um atendente",
        texto: "Quem recebeu uma intimação pelo WhatsApp informa o nome, e um atendente retoma a conversa para confirmar a identidade.",
      },
      {
        titulo: "A pessoa confere antes de enviar",
        texto: "No fim, a triagem mostra os dados para conferência e informa o prazo de retorno do setor.",
      },
    ],
  },
  /**
   * Uma consulta de exemplo, com os textos do fluxo em uso (Typebot, lido em
   * 14/10/2026) encurtados e nome e dados fictícios. A pessoa responde pelo
   * número da opção, como no fluxo.
   */
  conversa: {
    sobretitulo: "Na prática",
    titulo: "Uma consulta, do começo ao fim.",
    texto:
      "É assim que um pedido de alvará sai da conversa já com o setor e os dados, sem ninguém da equipe precisar perguntar nada.",
    nota: "Exemplo com nome e dados fictícios; os textos seguem o fluxo em uso, encurtados.",
    legenda: "WhatsApp da 16ª Vara Cível de Curitiba",
    mensagens: [
      {
        de: "vara",
        texto:
          "Marina, seja bem-vinda ao atendimento da 16ª Vara Cível de Curitiba. Sobre qual assunto é seu contato hoje?\n1 · Recebi uma intimação pelo WhatsApp\n2 · Quero consultar o status de um processo\n3 · Preciso tirar uma dúvida",
      },
      { de: "pessoa", texto: "2" },
      { de: "vara", texto: "Você é parte ou advogado(a) no processo?\n1 · Parte\n2 · Advogado(a)" },
      { de: "pessoa", texto: "2" },
      { de: "vara", texto: "Informe o número completo do processo." },
      { de: "pessoa", texto: "o número do processo, no formato do CNJ" },
      {
        de: "vara",
        texto: "O processo está concluso com a magistrada ou aguardando análise da serventia?\n1 · Concluso com a magistrada\n2 · Análise pela serventia",
      },
      { de: "pessoa", texto: "2" },
      {
        de: "vara",
        texto: "Em qual setor deseja atendimento?\n1 · Desarquivamento/Arquivamento\n…\n4 · Expedição de Alvarás, Certidões e Termos\n…\n11 · Portarias do Juízo",
      },
      { de: "pessoa", texto: "4" },
      {
        de: "vara",
        texto: "Confira os dados: setor, parte ou advogado(a), nome, número do processo, observação e urgência. Os dados estão corretos?\n1 · Sim\n2 · Não",
      },
      { de: "pessoa", texto: "1" },
      {
        de: "vara",
        texto:
          "Sua solicitação foi registrada. As informações foram enviadas ao setor de Expedição de Alvarás, Certidões e Termos, que analisará sua demanda no prazo estimado de até 48 horas úteis.",
      },
    ],
  },
  construido: {
    sobretitulo: "Depois",
    titulo: "A conversa chega pronta para a equipe.",
    texto:
      "Uma triagem por menu, sem resposta jurídica automática, que registra cada pedido no sistema de atendimento com o setor e os dados que o servidor precisa para responder.",
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
          "Nome, parte ou advogado, número do processo no formato do CNJ e a situação: concluso com a magistrada ou em análise na serventia.",
      },
      {
        linha: "Encaminhamento por setor",
        titulo: "Cada conversa marcada com o setor",
        texto:
          "A conversa entra no sistema de atendimento já atribuída ao time do setor, com os dados e a urgência que a pessoa pediu, e quem atende já começa pela resposta.",
      },
      {
        linha: "Dúvida, intimação e gabinete",
        titulo: "Cada assunto no seu caminho",
        texto:
          "A dúvida segue para a área de análises gerais e a intimação, para um atendente. O assunto do gabinete recebe a orientação de contato com o gabinete da magistrada.",
      },
    ],
  },
  /**
   * Só contagens, lidas no sistema de atendimento (Chatwoot) em 14/10/2026, de
   * conversas criadas de 07/01 a 13/10/2026. Números em
   * `memory/projects/case-16-vara-civel.md`, conferidos pelo teste.
   */
  numeros: {
    sobretitulo: "Medido",
    titulo: "O que passou pela triagem.",
    itens: [
      { valor: 950, complemento: "", texto: "conversas no WhatsApp da serventia de 07/01 a 13/10/2026" },
      {
        valor: 345,
        complemento: "",
        texto: "pedidos com os dados completos do fluxo: 128 consultas de processo, 110 dúvidas, 59 intimações e 48 assuntos do gabinete",
      },
      {
        valor: 118,
        complemento: "",
        texto: "pedidos encaminhados direto a um de oito setores específicos, de petições e alvarás a audiências e decurso de prazo",
      },
    ],
    fonte: "Sistema de atendimento da serventia, lido em 14/10/2026. Conversas criadas de 07/01 a 13/10/2026; só contagens, sem dado pessoal.",
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
