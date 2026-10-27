import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { CASE_MOTORS } from "@/conteudo/case";
import { SOBRE } from "@/conteudo/sobre";
import { solucaoDa } from "@/conteudo/solucoes";
import { ASSINATURA, EMPRESA, PERGUNTAS, PILARES, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { ofertaDaCapacidade } from "@/conteudo/precos";
import { CONTINUIDADE, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { SITE_URL } from "@/lib/site";
import { perfisConfirmados } from "@/conteudo/perfis";
import { whatsappInternacional } from "@/lib/whatsapp";

/**
 * O grafo JSON-LD do site, montado por funções puras (molde da Motors) e
 * travado por `tests/schema.test.ts`. Seção 4.5 do plano e `marca.md`.
 *
 * O `sameAs` só aparece com perfil confirmado (`conteudo/perfis.ts`): perfil
 * inventado é pior que nenhum. Sem `AggregateRating`
 * próprio. Endereço só com cidade e estado: a sede é residencial.
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
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: PILARES.flatMap((p) => p.servicos.map((s) => s.titulo)),
    ...(perfisConfirmados().length ? { sameAs: perfisConfirmados() } : {}),
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

/** O valor de partida do Sprint como oferta: o preço fechado sai em proposta. */
const ofertaDoSprint = (n: (typeof SPRINT_DE_PRECOS.niveis)[number]): No => ({
  "@type": "Offer",
  name: n.nome,
  description: `A partir de ${n.faixa.de.toLocaleString("pt-BR")} reais, conforme a complexidade. Duração de referência: ${n.duracao}. O preço fechado sai em proposta.`,
  priceSpecification: {
    "@type": "PriceSpecification",
    minPrice: n.faixa.de,
    priceCurrency: "BRL",
  },
  availability: "https://schema.org/InStock",
  areaServed: { "@type": "Country", name: "Brasil" },
  seller: ref(ID_DA_ORGANIZACAO),
});

/**
 * O catálogo de `/precos` desde 25/10/2026: o Sprint de Eficiência, nas três
 * faixas de referência de `sprint.ts`, e as duas faixas mensais da
 * continuidade que o acompanha. Os planos de `precos.ts` não são
 * publicados, então não entram no schema.
 */
export function catalogo(): No {
  const servico = {
    "@type": "Service",
    name: "Sprint de Eficiência V2O5",
    url: `${SITE_URL}/precos#titulo-sprint`,
    provider: ref(ID_DA_ORGANIZACAO),
  };
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/precos#catalogo`,
    name: "Sprint de Eficiência V2O5",
    itemListElement: [
      ...SPRINT_DE_PRECOS.niveis.map((n) => ({ ...ofertaDoSprint(n), itemOffered: servico })),
      ...CONTINUIDADE.modalidades.map((m) => ({
        "@type": "Offer",
        name: `${m.nome} (por mês)`,
        description: `Faixa de referência por mês pela gestão continuada, depois do Sprint. ${m.texto} Nuvem e IA ficam por fora, pelo valor do provedor. Valor e limites em contrato.`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: m.faixa.de,
          maxPrice: m.faixa.ate,
          priceCurrency: "BRL",
          unitCode: "MON",
        },
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "Country", name: "Brasil" },
        seller: ref(ID_DA_ORGANIZACAO),
        itemOffered: servico,
      })),
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

/** O hub de revendas como serviço (sem valor público desde 25/10/2026). */
export function servicoAutomotivo(): No {
  const rota = HUB_AUTOMOTIVO.rota;
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: "Sprint de Eficiência para revendas de veículos",
    description: HUB_AUTOMOTIVO.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: "Site de estoque, agente de IA no WhatsApp, CRM e rastreamento até a venda",
    audience: { "@type": "BusinessAudience", name: "Revendas de veículos" },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}

/** A linha de uma página de solução como serviço, com as ofertas da tabela. */
export function servicoDaSolucao(rota: string): No {
  const s = solucaoDa(rota);
  const l = ofertaDaCapacidade(s.linha);
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: l.nome,
    description: s.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: s.titulo.replace(/\.$/, ""),
    areaServed: { "@type": "Country", name: "Brasil" },
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
