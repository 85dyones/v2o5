import { EMPRESA, PERGUNTAS, PILARES, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { AUTOMOTIVO_PRECO, LINHAS_DE_PRECO } from "@/conteudo/precos";
import { SITE_URL } from "@/lib/site";
import { whatsappInternacional } from "@/lib/whatsapp";

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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Almirante Tamandaré",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: PILARES.flatMap((p) => p.servicos.map((s) => s.titulo)),
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
/** As perguntas da home e de `/precos`, com as mesmas respostas da página. */
export function perguntas(rota: string): No {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${rota}#perguntas`,
    mainEntity: PERGUNTAS.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
}

const oferta = (nome: string, preco: number, descricao: string): No => ({
  "@type": "Offer",
  name: nome,
  description: descricao,
  price: preco,
  priceCurrency: "BRL",
  availability: "https://schema.org/InStock",
  areaServed: { "@type": "Country", name: "Brasil" },
  seller: ref(ID_DA_ORGANIZACAO),
});

/**
 * O catálogo de `precos.ts` como ofertas, uma por linha (implantação e
 * mensalidade separadas, porque são preços diferentes) e o pacote automotivo.
 * Preço "a partir de": a descrição diz isso.
 */
export function catalogo(): No {
  const itens: No[] = [];
  for (const l of LINHAS_DE_PRECO) {
    const servico = { "@type": "Service", name: l.nome, url: `${SITE_URL}${l.href}`, provider: ref(ID_DA_ORGANIZACAO) };
    if (l.implantacao) {
      itens.push({
        ...oferta(l.nome, l.implantacao, `Implantação a partir de${l.unidade ? `, ${l.unidade}` : ""}`),
        itemOffered: servico,
      });
    }
    if (l.mensalidade) {
      itens.push({
        ...oferta(`${l.nome} (mensalidade)`, l.mensalidade, `Mensalidade a partir de${l.maisVerba ? ", mais a verba" : ""}. ${l.cobre}`),
        itemOffered: servico,
      });
    }
  }
  const { pacote } = AUTOMOTIVO_PRECO;
  const pacoteServico = {
    "@type": "Service",
    name: "Pacote completo para revendas de veículos",
    url: `${SITE_URL}/segmentos/revendas-de-veiculos`,
    provider: ref(ID_DA_ORGANIZACAO),
  };
  itens.push({ ...oferta(pacoteServico.name, pacote.implantacao, "Implantação a partir de"), itemOffered: pacoteServico });
  itens.push({
    ...oferta(`${pacoteServico.name} (mensalidade)`, pacote.mensalidade, "Mensalidade a partir de"),
    itemOffered: pacoteServico,
  });
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/precos#catalogo`,
    name: "Preços da V2O5 Vendas e Tecnologia",
    itemListElement: itens,
  };
}

export function grafoDaHome(): No {
  return { "@context": "https://schema.org", "@graph": [organizacao(), site(), fundador(), perguntas("/")] };
}

export function grafoDaInterna(rota: string): No {
  return { "@context": "https://schema.org", "@graph": [ref(ID_DA_ORGANIZACAO), trilha(rota)] };
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
