import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { CASE_MOTORS } from "@/conteudo/case";
import { SOBRE } from "@/conteudo/sobre";
import { solucaoDa } from "@/conteudo/solucoes";
import { ASSINATURA, EMPRESA, PERGUNTAS, PILARES, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { capacidade } from "@/conteudo/precos";
import { OFERTAS, ofertaDa, PERGUNTAS_DA_CONTINUIDADE, PLANOS_DE_CONTINUIDADE, type Oferta, type Pacote, type PlanoDeContinuidade } from "@/conteudo/ofertas";
import { SITE_URL } from "@/lib/site";
import { whatsappInternacional } from "@/lib/whatsapp";

/**
 * O grafo JSON-LD do site, montado por funções puras (molde da Motors) e
 * travado por `tests/schema.test.ts`. Seção 4.5 do plano e `marca.md`.
 *
 * `sameAs` com Instagram e LinkedIn (28/10); o Perfil de Empresa entra
 * quando o Google verificar, e perfil inventado é pior que nenhum. Sem
 * `AggregateRating` próprio. Endereço só com cidade e estado: a sede é residencial.
 */

type No = Record<string, unknown>;

export const ID_DA_ORGANIZACAO = `${SITE_URL}/#organizacao`;
export const ID_DO_SITE = `${SITE_URL}/#site`;
export const ID_DO_FUNDADOR = `${SITE_URL}/sobre#autor`;

const ref = (id: string) => ({ "@id": id });

export function organizacao(): No {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID_DA_ORGANIZACAO,
    name: EMPRESA.nome,
    legalName: EMPRESA.razaoSocial.replace(/\.$/, ""),
    alternateName: ["V2O5", "V2O5 ConsultorIA"],
    taxID: EMPRESA.cnpj,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon.svg`,
    slogan: ASSINATURA,
    foundingDate: EMPRESA.fundacao,
    founder: ref(ID_DO_FUNDADOR),
    telephone: whatsappInternacional(),
    email: EMPRESA.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: whatsappInternacional(),
      email: EMPRESA.email,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    },
    sameAs: [EMPRESA.redes.instagram, EMPRESA.redes.linkedin],
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [...OFERTAS.map((o) => o.nome), ...PILARES.flatMap((p) => p.servicos.map((s) => s.titulo))],
  };
}

export function fundador(): No {
  return {
    "@type": "Person",
    "@id": ID_DO_FUNDADOR,
    name: VISAO_360.fundador.nome,
    jobTitle: "Fundador",
    description: VISAO_360.fundador.texto,
    alumniOf: { "@type": "CollegeOrUniversity", name: VISAO_360.fundador.escola },
    knowsAbout: ["Administração de empresas", "Gestão de marca", "Branding", "Marketing digital", "Automação com IA"],
    worksFor: ref(ID_DA_ORGANIZACAO),
  };
}

export function site(): No {
  return {
    "@type": "WebSite",
    "@id": ID_DO_SITE,
    url: `${SITE_URL}/`,
    name: EMPRESA.nome,
    inLanguage: "pt-BR",
    publisher: ref(ID_DA_ORGANIZACAO),
  };
}

/** Trilha Início › página, para as páginas internas. */
export function trilha(rota: string): No {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${rota}#trilha`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: paginaDa(rota).titulo, item: `${SITE_URL}${rota}` },
    ],
  };
}
/** As perguntas da página (as da home e de `/precos` por padrão), com as mesmas respostas. */
export function perguntas(rota: string, lista: { pergunta: string; resposta: string }[] = PERGUNTAS): No {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${rota}#perguntas`,
    mainEntity: lista.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
}

const reais = (n: number) => `${n.toLocaleString("pt-BR")} reais`;

/** Um pacote como oferta: preço fixo (`price`) ou "a partir de" (`minPrice`). O valor fechado sai em proposta. */
const ofertaDoPacote = (o: Oferta, p: Pacote): No => ({
  "@type": "Offer",
  name: p.nome,
  description: `${p.para} ${p.preco.aPartirDe ? `A partir de ${reais(p.preco.valor)}` : `Preço de referência: ${reais(p.preco.valor)}`}${p.duracao ? `. Duração de referência: ${p.duracao}` : ""}. O valor fechado sai em proposta.`,
  priceSpecification: {
    "@type": "PriceSpecification",
    ...(p.preco.aPartirDe ? { minPrice: p.preco.valor } : { price: p.preco.valor }),
    priceCurrency: "BRL",
  },
  url: `${SITE_URL}${o.rota}#titulo-pacotes`,
  availability: "https://schema.org/InStock",
  areaServed: { "@type": "Country", name: "Brasil" },
  seller: ref(ID_DA_ORGANIZACAO),
});

/** Uma mensalidade (da Presença ou da continuidade) como oferta por mês. */
const ofertaMensal = (nome: string, descricao: string, valor: number, url: string): No => ({
  "@type": "Offer",
  name: `${nome} (por mês)`,
  description: `${descricao} Opcional. Preço de referência por mês: ${reais(valor)}.`,
  priceSpecification: { "@type": "UnitPriceSpecification", price: valor, priceCurrency: "BRL", unitCode: "MON" },
  url,
  availability: "https://schema.org/InStock",
  areaServed: { "@type": "Country", name: "Brasil" },
  seller: ref(ID_DA_ORGANIZACAO),
});

/** As ofertas de uma solução: os pacotes e, na Presença, as mensalidades opcionais. */
const ofertasDa = (o: Oferta): No[] => [
  ...o.pacotes.map((p) => ofertaDoPacote(o, p)),
  ...o.pacotes.flatMap((p) => (p.mensal ? [ofertaMensal(p.nome, p.mensal.cobre, p.mensal.valor, `${SITE_URL}${o.rota}#titulo-pacotes`)] : [])),
];

const ofertaDoPlano = (p: PlanoDeContinuidade): No =>
  ofertaMensal(p.nome, `${p.para} ${p.inclui.join("; ")}.`, p.mensal, `${SITE_URL}/continuidade#${p.frente}`);

/**
 * O catálogo de `/precos` desde 27/10/2026: os pacotes das quatro soluções
 * (`ofertas.ts` e `sprint.ts`) e os planos de continuidade, com os mesmos
 * valores da página.
 */
export function catalogo(): No {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/precos#catalogo`,
    name: "Soluções da V2O5",
    itemListElement: [
      ...OFERTAS.map((o) => ({
        "@type": "OfferCatalog",
        name: o.nome,
        url: `${SITE_URL}${o.rota}`,
        itemListElement: ofertasDa(o),
      })),
      {
        "@type": "OfferCatalog",
        name: "Continuidade",
        url: `${SITE_URL}/continuidade`,
        itemListElement: PLANOS_DE_CONTINUIDADE.map(ofertaDoPlano),
      },
    ],
  };
}

export function grafoDaHome(): No {
  return { "@context": "https://schema.org", "@graph": [organizacao(), site(), fundador(), perguntas("/")] };
}

export function grafoDaInterna(rota: string): No {
  return { "@context": "https://schema.org", "@graph": [ref(ID_DA_ORGANIZACAO), trilha(rota)] };
}

/** O case como artigo assinado pelo fundador, sobre a Motors Store. */
export function artigoDoCase(): No {
  const p = paginaDa(CASE_MOTORS.rota);
  return {
    "@type": "Article",
    "@id": `${SITE_URL}${CASE_MOTORS.rota}#artigo`,
    headline: CASE_MOTORS.titulo,
    description: p.descricao,
    inLanguage: "pt-BR",
    datePublished: "2026-10-11",
    dateModified: p.atualizadaEm,
    mainEntityOfPage: `${SITE_URL}${CASE_MOTORS.rota}`,
    author: ref(ID_DO_FUNDADOR),
    publisher: ref(ID_DA_ORGANIZACAO),
    about: {
      "@type": "Organization",
      name: CASE_MOTORS.cliente.nome,
      url: CASE_MOTORS.cliente.url,
      address: { "@type": "PostalAddress", addressLocality: CASE_MOTORS.cliente.cidade, addressRegion: CASE_MOTORS.cliente.estado, addressCountry: "BR" },
    },
  };
}

export function grafoDoCase(): No {
  return {
    "@context": "https://schema.org",
    "@graph": [ref(ID_DA_ORGANIZACAO), fundador(), trilha(CASE_MOTORS.rota), artigoDoCase()],
  };
}

/** O hub de revendas como serviço; os valores ficam na página e no catálogo de `/precos`. */
export function servicoAutomotivo(): No {
  const rota = HUB_AUTOMOTIVO.rota;
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: "Site Automotivo Integrado e Operação com IA para revendas de veículos",
    description: HUB_AUTOMOTIVO.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: "Site de estoque, agente de IA no WhatsApp, CRM e rastreamento até a venda",
    audience: { "@type": "BusinessAudience", name: "Revendas de veículos" },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}

/**
 * A página como serviço. Nas quatro soluções (`oferta`), com o catálogo dos
 * pacotes; nas páginas de recurso, sem oferta de preço.
 */
export function servicoDaSolucao(rota: string): No {
  const s = solucaoDa(rota);
  const o = s.oferta ? ofertaDa(s.oferta) : undefined;
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: capacidade(s.linha).nome,
    description: s.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: s.titulo.replace(/\.$/, ""),
    areaServed: { "@type": "Country", name: "Brasil" },
    ...(o
      ? { hasOfferCatalog: { "@type": "OfferCatalog", "@id": `${SITE_URL}${rota}#catalogo`, name: o.nome, itemListElement: ofertasDa(o) } }
      : {}),
  };
}

export function grafoDaSolucao(rota: string): No {
  const s = solucaoDa(rota);
  return {
    "@context": "https://schema.org",
    "@graph": [ref(ID_DA_ORGANIZACAO), trilha(rota), servicoDaSolucao(rota), perguntas(rota, s.perguntas)],
  };
}

export function grafoDoHubAutomotivo(): No {
  const rota = HUB_AUTOMOTIVO.rota;
  return {
    "@context": "https://schema.org",
    "@graph": [ref(ID_DA_ORGANIZACAO), trilha(rota), servicoAutomotivo(), perguntas(rota, HUB_AUTOMOTIVO.perguntas)],
  };
}

/** Sobre: a página que o `@id` do fundador aponta (`/sobre#autor`), com a organização como assunto. */
export function paginaSobre(): No {
  return {
    "@type": "AboutPage",
    "@id": `${SITE_URL}${SOBRE.rota}#pagina`,
    url: `${SITE_URL}${SOBRE.rota}`,
    name: paginaDa(SOBRE.rota).titulo,
    description: paginaDa(SOBRE.rota).descricao,
    inLanguage: "pt-BR",
    mainEntity: ref(ID_DA_ORGANIZACAO),
  };
}

export function grafoDoSobre(): No {
  return {
    "@context": "https://schema.org",
    "@graph": [ref(ID_DA_ORGANIZACAO), trilha(SOBRE.rota), fundador(), paginaSobre()],
  };
}

/** `/continuidade`: os três planos como serviço com catálogo mensal, e as perguntas da página. */
export function grafoDaContinuidade(): No {
  const rota = "/continuidade";
  return {
    "@context": "https://schema.org",
    "@graph": [
      ref(ID_DA_ORGANIZACAO),
      trilha(rota),
      {
        "@type": "Service",
        "@id": `${SITE_URL}${rota}#servico`,
        name: "Continuidade",
        description: paginaDa(rota).descricao,
        url: `${SITE_URL}${rota}`,
        provider: ref(ID_DA_ORGANIZACAO),
        areaServed: { "@type": "Country", name: "Brasil" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          "@id": `${SITE_URL}${rota}#catalogo`,
          name: "Planos de continuidade",
          itemListElement: PLANOS_DE_CONTINUIDADE.map(ofertaDoPlano),
        },
      },
      perguntas(rota, PERGUNTAS_DA_CONTINUIDADE),
    ],
  };
}

export function grafoDosPrecos(): No {
  return {
    "@context": "https://schema.org",
    "@graph": [ref(ID_DA_ORGANIZACAO), trilha("/precos"), catalogo(), perguntas("/precos")],
  };
}

/** JSON pronto para `<script type="application/ld+json">`, sem `<` cru. */
export function blocoJsonLd(grafo: No): string {
  return JSON.stringify(grafo).replace(/</g, "\\u003c");
}
