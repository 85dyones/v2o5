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
      "A V2O5 acha o gargalo, simplifica o processo e implementa tecnologia, automação e IA para a operação render mais e ser medida. Comece pelo Sprint de Eficiência.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/agente-de-ia-para-whatsapp",
    titulo: "Agente de IA para WhatsApp",
    descricao:
      "Agente de IA no WhatsApp que responde na hora com as informações do seu negócio, qualifica, agenda e passa para a equipe. A partir de R$ 3.900 + R$ 790/mês.",
    atualizadaEm: "2026-10-13",
    pronta: true,
  },
  {
    rota: "/automacao-com-ia",
    titulo: "Automação de processos com IA e n8n",
    descricao:
      "Fluxos no n8n que ligam os sistemas que a sua empresa já usa, com IA validada contra invenção de dado e registro de cada execução. R$ 1.900 por fluxo.",
    atualizadaEm: "2026-10-13",
    pronta: true,
  },
  {
    rota: "/criacao-de-sites",
    titulo: "Criação de site profissional com SEO",
    descricao:
      "Site rápido no celular, achado no Google e nas respostas das IAs, que grava de onde veio cada contato. Hospedagem e manutenção na mensalidade de R$ 690.",
    atualizadaEm: "2026-10-25",
    pronta: true,
  },
  {
    rota: "/crm-com-whatsapp",
    titulo: "CRM com WhatsApp integrado",
    descricao:
      "CRM sob medida com WhatsApp dentro do funil: cada contato com origem, etapa e próximo passo. 5 usuários inclusos, sem licença por pessoa, a partir de R$ 4.900.",
    atualizadaEm: "2026-10-13",
    pronta: true,
  },
  {
    rota: "/rastreamento-de-conversoes",
    titulo: "Rastreamento de conversões até a venda",
    descricao:
      "GA4, API de Conversões da Meta e conversões offline do Google Ads: cada lead e cada venda ligados ao anúncio que trouxe o cliente. A partir de R$ 2.900.",
    atualizadaEm: "2026-10-13",
    pronta: true,
  },
  {
    rota: "/segmentos/revendas-de-veiculos",
    titulo: "Sistema de vendas para revendas de veículos",
    descricao:
      "Site de estoque ligado ao sistema da loja (Revenda Mais, Autoconf e outros), agente de IA no WhatsApp, CRM e rastreamento até a venda, a partir de R$ 14.900.",
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
    rota: "/precos",
    titulo: "Preços e planos",
    descricao:
      "Três planos com preço fechado: Presença a partir de R$ 8.900 + R$ 990/mês, Atendimento com agente de IA e CRM, e o Completo. Sem fidelidade.",
    atualizadaEm: "2026-10-15",
    pronta: true,
  },
  {
    rota: "/sobre",
    titulo: "Sobre a V2O5: quem faz e como trabalha",
    descricao:
      "Quem é a V2O5 Vendas e Tecnologia, de onde vem o nome, o fundador que conduz o diagnóstico, a relação com a Motors Store e as regras de todo projeto.",
    atualizadaEm: "2026-10-25",
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
