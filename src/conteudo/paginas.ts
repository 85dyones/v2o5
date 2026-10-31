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

export const TITULO_PADRAO = "V2O5 Vendas e Tecnologia | Menos atrito entre problema e resultado";

export const PAGINAS: Pagina[] = [
  {
    rota: "/",
    titulo: TITULO_PADRAO,
    descricao:
      "Branding, presença digital local, sites com integração e o Sprint de Eficiência: a V2O5 melhora marca, presença e operação, com preço de referência.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/agente-de-ia-para-whatsapp",
    titulo: "Chatbot com IA para WhatsApp: agente que atende",
    descricao:
      "Chatbot com IA no WhatsApp: um agente que responde na hora com as informações do negócio, qualifica, agenda e chama a equipe. Entra num Sprint de Eficiência.",
    atualizadaEm: "2026-10-31",
    pronta: true,
  },
  {
    rota: "/automacao-com-ia",
    titulo: "Automação de processos com IA e n8n",
    descricao:
      "Fluxos no n8n que ligam os sistemas que a sua empresa já usa, com IA validada contra invenção de dado e registro de cada execução. Entra num Sprint.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/criacao-de-sites",
    titulo: "Criação de sites profissionais e integrações",
    descricao:
      "Landing page, site personalizado, site conectado ao seu sistema e site automotivo com estoque integrado. Rápido no celular, achado no Google e medido.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/crm-com-whatsapp",
    titulo: "CRM com WhatsApp integrado",
    descricao:
      "CRM sob medida com WhatsApp dentro do funil: cada contato com origem, etapa e próximo passo. Intervenção de um Sprint de Eficiência.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/rastreamento-de-conversoes",
    titulo: "Rastreamento de conversões até a venda",
    descricao:
      "GA4, API de Conversões da Meta e conversões offline do Google Ads: cada lead e cada venda ligados ao anúncio que trouxe o cliente. Entra num Sprint.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/segmentos/revendas-de-veiculos",
    titulo: "Sistema de vendas para revendas de veículos",
    descricao:
      "Site de estoque ligado ao sistema da loja (Revenda Mais, Autoconf e outros), agente de IA no WhatsApp, CRM e rastreamento até a venda, num Sprint.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/cases/motors-store",
    titulo: "Case Motors Store",
    descricao:
      "O que a V2O5 montou para a Motors Store, revenda de seminovos em Curitiba, e os números do sistema rodando, lidos no banco de dados da loja.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/branding-e-identidade",
    titulo: "Branding e identidade visual",
    descricao:
      "Identidade visual com variações, cores, tipografia e guia de uso, aplicada no dia a dia comercial, e reposicionamento de marca. Preços de referência.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/presenca-digital-local",
    titulo: "Presença digital para negócios locais",
    descricao:
      "Perfil da Empresa no Google, redes sociais e WhatsApp Business organizados, com modelos de conteúdo, calendário e rotina mensal opcional.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/sprint-de-eficiencia",
    titulo: "Sprint de Eficiência: um gargalo resolvido e medido",
    descricao:
      "Projeto fechado para um gargalo da operação: mapear, simplificar, implementar e comparar os indicadores antes e depois. Três Sprints com preço de referência.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/continuidade",
    titulo: "Continuidade: manutenção, conteúdo e monitoramento",
    descricao:
      "Planos opcionais para manter e evoluir o que foi entregue: Cuidado Técnico, Integrações Monitoradas e Evolução Contínua, com horas e prazos escritos.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/precos",
    titulo: "Preços: quatro soluções e a continuidade",
    descricao:
      "Preços de referência de Branding, Presença Digital Local, Sites & Integrações, Sprint de Eficiência e dos planos de continuidade. Diagnóstico gratuito.",
    atualizadaEm: "2026-10-27",
    pronta: true,
  },
  {
    rota: "/sobre",
    titulo: "Sobre a V2O5: quem faz, o método e a promessa de saída",
    descricao:
      "Quem é a V2O5 Vendas e Tecnologia, o método em cinco perguntas, o fundador que conduz o diagnóstico, de onde vem o nome e a relação com a Motors Store.",
    atualizadaEm: "2026-10-26",
    pronta: true,
  },
  {
    rota: "/diagnostico",
    titulo: "Diagnóstico gratuito",
    descricao:
      "Sessão inicial gratuita de 45 minutos com o fundador para identificar e priorizar um gargalo. Sem mapeamento completo, implementação ou acompanhamento.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/diagnostico/recebido",
    titulo: "Pedido recebido",
    descricao: "Recebemos o seu pedido de diagnóstico. O que acontece agora e como a V2O5 entra em contato.",
    atualizadaEm: "2026-10-10",
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
    titulo: "Política de privacidade",
    descricao:
      "Quais dados a V2O5 Vendas e Tecnologia coleta neste site, para quê, com quem compartilha, por quanto tempo guarda e como pedir acesso, correção ou exclusão.",
    atualizadaEm: "2026-10-13",
    pronta: true,
  },
];

export function paginaDa(rota: string): Pagina {
  const pagina = PAGINAS.find((p) => p.rota === rota);
  if (!pagina) throw new Error(`Rota fora do mapa de páginas: ${rota}`);
  return pagina;
}

/** Bloco da marca (`design/marca/bloco-1080.png`), igual ao avatar das redes. */
const IMAGEM_SOCIAL = { url: "/opengraph-image.png", width: 1080, height: 1080, alt: "V2O5 Vendas e Tecnologia" };

/** `metadata` de uma página do mapa: título, descrição, canonical e robôs. */
export function metadataDa(rota: string): Metadata {
  const p = paginaDa(rota);
  return {
    // A home usa o título inteiro; as internas passam pelo modelo do layout.
    title: rota === "/" ? { absolute: p.titulo } : p.titulo,
    description: p.descricao,
    alternates: { canonical: rota },
    // O Next não herda `openGraph` do layout: cada página repete o bloco.
    openGraph: {
      type: "website",
      siteName: "V2O5 Vendas e Tecnologia",
      locale: "pt_BR",
      url: rota,
      title: p.titulo,
      description: p.descricao,
      images: [IMAGEM_SOCIAL],
    },
    twitter: { card: "summary", title: p.titulo, description: p.descricao, images: [IMAGEM_SOCIAL.url] },
    robots: p.pronta ? undefined : { index: false, follow: true },
  };
}
