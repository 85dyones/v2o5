import { describe, expect, it } from "vitest";
import { EMPRESA } from "@/conteudo/home";
import { PAGINAS } from "@/conteudo/paginas";
import {
  blocoJsonLd,
  grafoDaHome,
  grafoDaInterna,
  ID_DA_ORGANIZACAO,
  ID_DO_FUNDADOR,
  organizacao,
} from "@/lib/schema";

/** Seção 4.5 do plano e `marca.md`: um grafo por página, contado por teste. */

type No = Record<string, unknown>;
const nos = (g: No) => g["@graph"] as No[];

describe("grafo da home", () => {
  it("organização, site e fundador, ligados por @id", () => {
    const g = grafoDaHome();
    expect(nos(g).map((n) => n["@type"])).toEqual([["Organization", "ProfessionalService"], "WebSite", "Person"]);
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

  it("sem perfil inventado e sem nota própria", () => {
    const o = organizacao();
    expect(o).not.toHaveProperty("sameAs");
    expect(o).not.toHaveProperty("aggregateRating");
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
