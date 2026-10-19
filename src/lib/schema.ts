import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { CASE_MOTORS } from "@/conteudo/case";
import { SOBRE } from "@/conteudo/sobre";
import { solucaoDa } from "@/conteudo/solucoes";
import { EMPRESA, PERGUNTAS, PILARES, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { dataBR, LINHAS_DE_PRECO, mensalidadeDoCompletoComTrafego, OFERTA_DO_COMPLETO, ofertaDaCapacidade, plano, PLANOS, USUARIOS_NO_CRM } from "@/conteudo/precos";
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

const oferta = (nome: string, preco: number, descricao: string, validaAte?: string): No => ({
  "@type": "Offer",
  name: nome,
  description: descricao,
  price: preco,
  priceCurrency: "BRL",
  ...(validaAte ? { priceValidUntil: validaAte } : {}),
  availability: "https://schema.org/InStock",
  areaServed: { "@type": "Country", name: "Brasil" },
  seller: ref(ID_DA_ORGANIZACAO),
});

/** A mensalidade do Completo por tempo limitado, como oferta com validade. */
const ofertaDoCompleto = (nome: string): No =>
  oferta(
    nome,
    OFERTA_DO_COMPLETO.mensalidade,
    `Mensalidade a partir de, por tempo limitado, até ${dataBR(OFERTA_DO_COMPLETO.ate)}`,
    OFERTA_DO_COMPLETO.ate,
  );

/**
 * O catálogo de `precos.ts` como ofertas: os planos (implantação e
 * mensalidade separadas, porque são preços diferentes, e a mensalidade do
 * Completo por tempo limitado com validade) e as linhas de tráfego, módulos
 * e serviços. O que é sob consulta fica fora. Preço "a partir de": a
 * descrição diz isso.
 */
export function catalogo(): No {
  const itens: No[] = [];
  for (const p of PLANOS) {
    const servico = { "@type": "Service", name: `Plano ${p.nome}`, url: `${SITE_URL}/precos`, provider: ref(ID_DA_ORGANIZACAO) };
    itens.push({ ...oferta(`Plano ${p.nome}`, p.implantacao, "Implantação a partir de"), itemOffered: servico });
    itens.push({ ...oferta(`Plano ${p.nome} (mensalidade)`, p.mensalidade, `Mensalidade a partir de. ${p.para}`), itemOffered: servico });
    if (p.id === "completo") itens.push({ ...ofertaDoCompleto(`Plano ${p.nome} (mensalidade por tempo limitado)`), itemOffered: servico });
  }
  for (const l of LINHAS_DE_PRECO.filter((x) => !x.sobConsulta)) {
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
    if (l.porUso) {
      itens.push({ ...oferta(`${l.nome} (${l.porUso.unidade})`, l.porUso.valor, `Preço a partir de, ${l.porUso.unidade}`), itemOffered: servico });
    }
  }
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

/** O plano Completo como serviço para revendas, com as ofertas da página. */
export function servicoAutomotivo(): No {
  const p = plano("completo");
  const rota = HUB_AUTOMOTIVO.rota;
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: "Plano Completo para revendas de veículos",
    description: HUB_AUTOMOTIVO.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: "Site de estoque, agente de IA no WhatsApp, CRM e rastreamento até a venda",
    audience: { "@type": "BusinessAudience", name: "Revendas de veículos" },
    areaServed: { "@type": "Country", name: "Brasil" },
    offers: [
      oferta("Plano Completo (implantação)", p.implantacao, "Implantação a partir de"),
      ofertaDoCompleto("Plano Completo (mensalidade por tempo limitado)"),
      oferta("Plano Completo (mensalidade)", p.mensalidade, `Mensalidade a partir de, com ${USUARIOS_NO_CRM} usuários`),
      oferta(
        "Plano Completo com Google Ads e Meta Ads (mensalidade)",
        mensalidadeDoCompletoComTrafego(),
        `Mensalidade a partir de, mais a verba, até ${dataBR(OFERTA_DO_COMPLETO.ate)}`,
        OFERTA_DO_COMPLETO.ate,
      ),
    ],
  };
}

/** A linha de uma página de solução como serviço, com as ofertas da tabela. */
export function servicoDaSolucao(rota: string): No {
  const s = solucaoDa(rota);
  const l = ofertaDaCapacidade(s.linha);
  const ofertas: No[] = [];
  if (l.implantacao) ofertas.push(oferta(`${l.nome} (implantação)`, l.implantacao, `Implantação a partir de${l.unidade ? `, ${l.unidade}` : ""}`));
  if (l.mensalidade) ofertas.push(oferta(`${l.nome} (mensalidade)`, l.mensalidade, `Mensalidade a partir de${l.maisVerba ? ", mais a verba" : ""}. ${l.cobre}`));
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${rota}#servico`,
    name: l.nome,
    description: s.resumo,
    url: `${SITE_URL}${rota}`,
    provider: ref(ID_DA_ORGANIZACAO),
    serviceType: s.titulo.replace(/\.$/, ""),
    areaServed: { "@type": "Country", name: "Brasil" },
    offers: ofertas,
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
