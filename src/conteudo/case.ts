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
    texto: "Os modelos de Sprint da V2O5 para revendas partem deste sistema. O diagnóstico gratuito diz por onde começar.",
    botao: "Pedir diagnóstico gratuito",
    secundario: "Ver os modelos para revendas",
  },
};
