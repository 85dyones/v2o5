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
import { OFERTAS, PLANOS_DE_CONTINUIDADE } from "@/conteudo/ofertas";

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
    // A V2O5 é digital (Dyones, 19/10): sem endereço, só a área atendida.
    expect(o.address).toBeUndefined();
    expect(o.areaServed).toEqual({ "@type": "Country", name: "Brasil" });
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

  it("só os perfis oficiais no sameAs e sem nota própria", () => {
    const o = organizacao();
    expect(o.sameAs).toEqual([
      "https://www.instagram.com/v2o5_consultoria/",
      "https://www.linkedin.com/company/v2o5-consutoria/",
    ]);
    expect(o).not.toHaveProperty("aggregateRating");
  });
});

describe("página de preços", () => {
  it("tem a trilha, o catálogo das quatro soluções e da continuidade e as perguntas", () => {
    const [org, trilha, catalogo, faq] = nos(grafoDosPrecos());
    expect(org).toEqual({ "@id": ID_DA_ORGANIZACAO });
    expect(trilha["@type"]).toBe("BreadcrumbList");
    expect(catalogo["@type"]).toBe("OfferCatalog");
    expect(faq["@type"]).toBe("FAQPage");
    const grupos = catalogo.itemListElement as No[];
    expect(grupos.map((g) => g.name)).toEqual([...OFERTAS.map((o) => o.nome), "Continuidade"]);
    OFERTAS.forEach((o, i) => {
      const ofertas = (grupos[i].itemListElement as No[]).filter((x) => !String(x.name).includes("(por mês)"));
      expect(ofertas.map((x) => x.name)).toEqual(o.pacotes.map((p) => p.nome));
      ofertas.forEach((x, k) => {
        const p = o.pacotes[k];
        expect(x["@type"]).toBe("Offer");
        expect(x.priceSpecification).toEqual(
          p.preco.aPartirDe
            ? { "@type": "PriceSpecification", minPrice: p.preco.valor, priceCurrency: "BRL" }
            : { "@type": "PriceSpecification", price: p.preco.valor, priceCurrency: "BRL" },
        );
        expect(String(x.description)).toMatch(/valor fechado sai em proposta/);
      });
    });
    const mensais = grupos[OFERTAS.length].itemListElement as No[];
    mensais.forEach((x, i) => {
      expect(x.priceSpecification).toEqual({ "@type": "UnitPriceSpecification", price: PLANOS_DE_CONTINUIDADE[i].mensal, priceCurrency: "BRL", unitCode: "MON" });
      expect(String(x.name)).toMatch(/por mês/);
    });
    expect(JSON.stringify(catalogo)).not.toMatch(/Plano (Presença|Atendimento|Completo)/);
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
