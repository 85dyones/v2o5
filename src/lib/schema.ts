import { EMPRESA, LINHAS } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { SITE_URL } from "@/lib/site";

/**
 * O grafo JSON-LD do site, montado por funções puras (molde da Motors) e
 * travado por `tests/schema.test.ts`. Seção 4.5 do plano e `marca.md`.
 *
 * Sem `sameAs` por enquanto: Perfil de Empresa, Instagram e LinkedIn ainda
 * não existem, e perfil inventado é pior que nenhum. Sem `AggregateRating`
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
    slogan: "Catalisador de vendas com IA",
    founder: ref(ID_DO_FUNDADOR),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Almirante Tamandaré",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: LINHAS.map((l) => l.titulo),
  };
}

export function fundador(): No {
  return {
    "@type": "Person",
    "@id": ID_DO_FUNDADOR,
    name: "Dyones Oliveira",
    jobTitle: "Fundador",
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

export function grafoDaHome(): No {
  return { "@context": "https://schema.org", "@graph": [organizacao(), site(), fundador()] };
}

export function grafoDaInterna(rota: string): No {
  return { "@context": "https://schema.org", "@graph": [ref(ID_DA_ORGANIZACAO), trilha(rota)] };
}

/** JSON pronto para `<script type="application/ld+json">`, sem `<` cru. */
export function blocoJsonLd(grafo: No): string {
  return JSON.stringify(grafo).replace(/</g, "\\u003c");
}
