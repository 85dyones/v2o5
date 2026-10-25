import { describe, expect, it } from "vitest";
import { SITE_PADRAO } from "@/conteudo/sitePadrao";
import { solucaoDa } from "@/conteudo/solucoes";

/** A entrega-base do site é uma só e a página de criação de sites a mostra inteira. */
describe("entrega-base do site", () => {
  it("tem nove itens, sem valor, sem número solto e sem travessão", () => {
    expect(SITE_PADRAO.itens).toHaveLength(9);
    const texto = JSON.stringify(SITE_PADRAO);
    expect(texto).not.toMatch(/R\$|\d+%|[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
  });

  it("a página /criacao-de-sites usa exatamente esses itens", () => {
    expect(solucaoDa("/criacao-de-sites").entregas).toBe(SITE_PADRAO.itens);
  });

  it("o que passa da base é capacidade do catálogo, em proposta", () => {
    expect(SITE_PADRAO.alem).toMatch(/capacidade do catálogo/);
  });
});
