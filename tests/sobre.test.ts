import { describe, expect, it } from "vitest";
import { VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { SOBRE } from "@/conteudo/sobre";
import { grafoDoSobre, ID_DO_FUNDADOR } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * Sobre: só fato registrado sobre o fundador (o mesmo texto da Visão 360),
 * relação com a Motors declarada como cliente e case, o `id="autor"` que o
 * schema do fundador aponta, resumo curto e texto sem marcas de IA.
 */

const texto = JSON.stringify(SOBRE);
const pagina = semComentarios(ler("src/app/sobre/page.tsx"));

describe("página Sobre", () => {
  it("está pronta e indexável, e é o destino do @id do fundador", () => {
    expect(paginaDa(SOBRE.rota).pronta).toBe(true);
    expect(ID_DO_FUNDADOR).toBe(`${new URL(ID_DO_FUNDADOR).origin}${SOBRE.rota}#autor`);
    expect(pagina).toMatch(/id="autor"/);
    const grafo = grafoDoSobre() as { "@graph": ({ "@type"?: string; "@id"?: string })[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Person", "AboutPage"]);
    expect(grafo["@graph"][2]["@id"]).toBe(ID_DO_FUNDADOR);
  });

  it("o fundador aparece com o mesmo texto e os mesmos fatos da Visão 360", () => {
    expect(SOBRE.fundador.texto).toBe(VISAO_360.fundador.texto);
    expect(SOBRE.fundador.nome).toBe(VISAO_360.fundador.nome);
    const fatos = SOBRE.fundador.fatos.map((f) => f.valor).join(" ");
    expect(fatos).toContain(VISAO_360.fundador.escola);
    expect(fatos).toMatch(/Top Imóveis para Top Soluções Imobiliárias/);
    expect(fatos).toMatch(/26 guias/);
    expect(SOBRE.fundador.origem).toMatch(/1992/);
    expect(ler("memory/projects/case-motors.md")).toMatch(/\| Guias publicados \| 26 \|/);
  });

  it("declara a relação com a Motors como cliente e case, com a autorização registrada", () => {
    expect(SOBRE.motors.texto).toMatch(/cliente da V2O5/);
    expect(SOBRE.motors.texto).toMatch(/case principal/);
    expect(SOBRE.motors.texto).toMatch(/autorizada/);
    expect(ler("memory/projects/case-motors.md")).toMatch(/Autorizado em 08\/10: nome, logo e números/);
    expect(SOBRE.motors.href).toBe("/cases/motors-store");
  });

  it("o nome vem do catalisador, e a assinatura é a da marca", () => {
    expect(SOBRE.nome.texto).toMatch(/pentóxido de vanádio/);
    expect(SOBRE.nome.assinatura).toBe("Catalisador de vendas com IA");
    expect(ler("memory/context/marca.md")).toContain("Catalisador de vendas com IA");
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP", () => {
    expect(SOBRE.resumo.length).toBeLessThanOrEqual(140);
  });

  it("sem travessão, sem tríade de efeito, sem número sem fonte e sem citação inventada", () => {
    expect(texto).not.toMatch(/[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
    expect(texto).not.toMatch(/\d+%|\d+x /);
    expect(texto).not.toMatch(/[“”]/);
  });
});
