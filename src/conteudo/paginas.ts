import type { Metadata } from "next";

/**
 * O mapa de páginas do site (`memory/context/seo.md`), num lugar só.
 *
 * Daqui saem o `<title>`, a descrição e o canonical de cada página, o
 * `sitemap.xml` e as travas de `tests/paginas.test.ts` (título e descrição
 * únicos, canonical igual à rota). Página que ainda é só "em construção" fica
 * com `pronta: false`: sai do sitemap e leva `noindex` até ganhar conteúdo.
 *
 * `atualizadaEm` é a data da última mudança de conteúdo da página, à mão:
 * é o `lastModified` do sitemap e precisa dizer a verdade.
 */
export interface Pagina {
  rota: string;
  titulo: string;
  descricao: string;
  atualizadaEm: string;
  pronta: boolean;
}

export const TITULO_PADRAO = "V2O5 Vendas e Tecnologia | Catalisador de vendas com IA";

export const PAGINAS: Pagina[] = [
  {
    rota: "/",
    titulo: TITULO_PADRAO,
    descricao:
      "Perfil no Google, SEO, tráfego pago, site, agente de IA no WhatsApp, automação e CRM num sistema que fica com a sua empresa. Diagnóstico gratuito.",
    atualizadaEm: "2026-10-09",
    pronta: true,
  },
  {
    rota: "/agente-de-ia-para-whatsapp",
    titulo: "Agente de IA para WhatsApp",
    descricao: "Atendimento na hora, com as informações do seu negócio e passagem para a equipe.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/automacao-com-ia",
    titulo: "Automação com IA",
    descricao: "Fluxos no n8n ligando os sistemas que a sua empresa já usa.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/criacao-de-sites",
    titulo: "Criação de sites",
    descricao: "Sites rápidos, achados no Google e nas respostas das IAs de busca.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/crm-com-whatsapp",
    titulo: "CRM com WhatsApp",
    descricao: "Funil com origem, etapa e próximo passo de cada contato.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/rastreamento-de-conversoes",
    titulo: "Rastreamento de conversões",
    descricao: "Cada lead e cada venda ligados ao anúncio de origem.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/gestao-de-trafego",
    titulo: "Tráfego pago no Google e na Meta",
    descricao: "Campanhas no Google Ads e na Meta (Instagram e Facebook), ajustadas pelo que virou venda.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/segmentos/revendas-de-veiculos",
    titulo: "Revendas de veículos",
    descricao:
      "Site de estoque, agente de IA, CRM e rastreamento para revendas, com integração ao Revenda Mais.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/cases/motors-store",
    titulo: "Case Motors Store",
    descricao: "Como o sistema da V2O5 roda numa revenda de seminovos em Curitiba.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/precos",
    titulo: "Preços",
    descricao: "Valores de implantação e mensalidade de cada linha, sempre a partir de.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/sobre",
    titulo: "Sobre a V2O5",
    descricao: "Quem é a V2O5 Vendas e Tecnologia e como trabalha.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/diagnostico",
    titulo: "Pedir diagnóstico",
    descricao:
      "45 minutos de conversa com o fundador e um mapa do que fazer, em até 24 horas. O formulário entra na próxima etapa.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/guias",
    titulo: "Guias",
    descricao: "Guias com dados de operação real para quem vende pelo WhatsApp e pela internet.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
  {
    rota: "/privacidade",
    titulo: "Privacidade",
    descricao: "Como a V2O5 trata os dados de quem visita o site.",
    atualizadaEm: "2026-10-09",
    pronta: false,
  },
];

export function paginaDa(rota: string): Pagina {
  const pagina = PAGINAS.find((p) => p.rota === rota);
  if (!pagina) throw new Error(`Rota fora do mapa de páginas: ${rota}`);
  return pagina;
}

/** `metadata` de uma página do mapa: título, descrição, canonical e robôs. */
export function metadataDa(rota: string): Metadata {
  const p = paginaDa(rota);
  return {
    // A home usa o título inteiro; as internas passam pelo modelo do layout.
    title: rota === "/" ? { absolute: p.titulo } : p.titulo,
    description: p.descricao,
    alternates: { canonical: rota },
    robots: p.pronta ? undefined : { index: false, follow: true },
  };
}
