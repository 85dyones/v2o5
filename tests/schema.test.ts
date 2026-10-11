import { describe, expect, it } from "vitest";
import { EMPRESA } from "@/conteudo/home";
import { PAGINAS } from "@/conteudo/paginas";
import {
  blocoJsonLd,
  grafoDaHome,
  grafoDaInterna,
  grafoDosPrecos,
  ID_DA_ORGANIZACAO,
  ID_DO_FUNDADOR,
  organizacao,
} from "@/lib/schema";
import { PERGUNTAS } from "@/conteudo/home";
import { LINHAS_DE_PRECO } from "@/conteudo/precos";

/** Seção 4.5 do plano e `marca.md`: um grafo por página, contado por teste. */

type No = Record<string, unknown>;
const nos = (g: No) => g["@graph"] as No[];

describe("grafo da home", () => {
  it("organização, site, fundador e perguntas, ligados por @id", () => {
    const g = grafoDaHome();
    expect(nos(g).map((n) => n["@type"])).toEqual([
      ["Organization", "ProfessionalService"],
      "WebSite",
      "Person",
      "FAQPage",
    ]);
    const faq = nos(g)[3];
    const perguntas = faq.mainEntity as No[];
    expect(perguntas.map((p) => p.name)).toEqual(PERGUNTAS.map((p) => p.pergunta));
    const pessoa = nos(g)[2];
    expect(pessoa["@id"]).toBe(ID_DO_FUNDADOR);
    expect(pessoa.worksFor).toEqual({ "@id": ID_DA_ORGANIZACAO });
  });

  it("a organização tem os dados do CNPJ e só cidade e estado no endereço", () => {
    const o = organizacao();
    expect(o.name).toBe("V2O5 Vendas e Tecnologia");
    expect(o.taxID).toBe(EMPRESA.cnpj);
    expect(o.legalName).toBe("V2O5 Tecnologia da Informação Ltda");
    expect(o.alternateName).toEqual(["V2O5", "V2O5 ConsultorIA"]);
    expect(o.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Almirante Tamandaré",
      addressRegion: "PR",
      addressCountry: "BR",
    });
  });

  it("WhatsApp e e-mail entram como telefone, e-mail e ponto de contato", () => {
    const o = organizacao();
    expect(o.telephone).toBe("+55 41 99808-9550");
    expect(o.email).toBe("diagnostico@v2o5.com.br");
    expect(o.contactPoint).toMatchObject({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+55 41 99808-9550",
      email: "diagnostico@v2o5.com.br",
    });
  });

  it("sem perfil inventado e sem nota própria", () => {
    const o = organizacao();
    expect(o).not.toHaveProperty("sameAs");
    expect(o).not.toHaveProperty("aggregateRating");
  });
});

describe("página de preços", () => {
  it("tem a trilha, o catálogo de ofertas e as perguntas", () => {
    const [org, trilha, catalogo, faq] = nos(grafoDosPrecos());
    expect(org).toEqual({ "@id": ID_DA_ORGANIZACAO });
    expect(trilha["@type"]).toBe("BreadcrumbList");
    expect(catalogo["@type"]).toBe("OfferCatalog");
    expect(faq["@type"]).toBe("FAQPage");
    const ofertas = catalogo.itemListElement as No[];
    const esperadas = LINHAS_DE_PRECO.reduce((n, l) => n + (l.implantacao ? 1 : 0) + (l.mensalidade ? 1 : 0), 0) + 2;
    expect(ofertas).toHaveLength(esperadas);
    for (const o of ofertas) {
      expect(o["@type"]).toBe("Offer");
      expect(o.priceCurrency).toBe("BRL");
      expect(typeof o.price).toBe("number");
      expect(String(o.description)).toMatch(/a partir de/);
    }
  });
});

describe("páginas internas", () => {
  it("cada interna tem a trilha Início › página", () => {
    for (const p of PAGINAS.filter((x) => x.rota !== "/")) {
      const [org, trilha] = nos(grafoDaInterna(p.rota));
      expect(org).toEqual({ "@id": ID_DA_ORGANIZACAO });
      const itens = trilha.itemListElement as No[];
      expect(itens.map((i) => i.name)).toEqual(["Início", p.titulo]);
    }
  });
});

describe("bloco de JSON-LD", () => {
  it("não deixa < cru (não fecha o script por acidente)", () => {
    expect(blocoJsonLd({ texto: "</script><b>" })).not.toContain("<");
    expect(JSON.parse(blocoJsonLd({ texto: "</script>" }))).toEqual({ texto: "</script>" });
  });
});
