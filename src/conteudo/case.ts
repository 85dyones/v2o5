import { CASE } from "@/conteudo/home";

/**
 * Página do case Motors Store. Tudo que é número vem de
 * `memory/projects/case-motors.md` (lido do banco da loja em 08/10/2026,
 * leads de 05/09 a 08/10) e `tests/case.test.ts` confere. Nada de tempo de
 * resposta nem de atendimento até o Chatwoot da Motors ser corrigido.
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
    "A V2O5 montou para a Motors Store, em Curitiba, o site de estoque, os guias, o rastreamento até a venda, o painel e as automações.",
  fatos: [
    { rotulo: "Cliente", valor: "Motors Store, revenda de seminovos em Curitiba" },
    { rotulo: "Entrega", valor: "site de estoque, guias, rastreamento, painel e automações" },
    { rotulo: "Fonte", valor: "banco de dados da Motors, lido em 08/10/2026" },
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
        linha: "CRM e sistemas sob medida",
        titulo: "Painel da loja",
        texto: "Funil de leads, estoque, clientes, investidores e mídia paga num painel só.",
      },
      {
        linha: "Automação de processos",
        titulo: "Rotinas no n8n",
        texto:
          "Sincronização do estoque com o Revenda Mais, vendas incompletas e alertas de estagnação do funil, com WhatsApp pela Evolution API e atribuição no Chatwoot.",
      },
      {
        linha: "Integrações entre sistemas",
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
        valor: 56,
        complemento: "",
        texto: "leads no funil em cinco semanas: 44 pelos formulários do site e 12 pelo WhatsApp direto, via Chatwoot",
      },
      {
        valor: 42,
        complemento: "de 44",
        texto: "leads do site com o identificador que impede a Meta de contar a mesma conversão duas vezes",
      },
      { valor: 37, complemento: "de 44", texto: "leads do site ligados ao veículo que motivou o contato" },
      {
        valor: 26,
        complemento: "de 44",
        texto: "leads do site com gclid ou fbclid: o anúncio exato que trouxe a pessoa",
      },
      { valor: 26, complemento: "", texto: "guias publicados, assinados pelo fundador da V2O5" },
      {
        valor: 132,
        complemento: "",
        texto: "veículos no estoque sincronizado com o Revenda Mais, 46 já marcados como vendidos",
      },
    ],
  },
  rastreio: {
    titulo: "Como a venda fica rastreável.",
    texto:
      "Cada lead do site sai com um identificador que o navegador e o servidor compartilham. A Meta e o Google recebem a mesma conversão pelos dois caminhos e contam uma vez só. O lead chega ao painel com a origem, o anúncio e o carro, e quando vira venda a verba sabe de onde veio.",
    exemplo: "Formato real dos eventos; os valores são ilustrativos.",
  },
  stack: {
    titulo: "Com o que foi feito",
    itens: ["Next.js", "Vercel", "Supabase", "n8n", "Evolution API", "Chatwoot", "Meta Pixel e API de Conversões", "GA4 e GTM", "Revenda Mais"],
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
