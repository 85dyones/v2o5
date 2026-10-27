import { describe, expect, it } from "vitest";
import { SITE_PADRAO } from "@/conteudo/sitePadrao";
import { solucaoDa } from "@/conteudo/solucoes";

/** A entrega-base do site é uma só e a página de criação de sites a mostra inteira. */
describe("entrega-base do site", () => {
  it("tem onze itens, sem valor, sem número solto e sem travessão", () => {
    expect(SITE_PADRAO.itens).toHaveLength(11);
    const texto = JSON.stringify(SITE_PADRAO);
    expect(texto).not.toMatch(/R\$|\d+%|[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
  });

  it("a página /criacao-de-sites usa exatamente esses itens", () => {
    expect(solucaoDa("/criacao-de-sites").entregas).toBe(SITE_PADRAO.itens);
  });

  it("não promete o que não depende de nós, e a privacidade e o código seguem o contrato (revisão de 26/10/2026)", () => {
    const por = (t: string) => SITE_PADRAO.itens.find((i) => i.titulo === t)!.texto;
    expect(por("SEO técnico")).not.toMatch(/conferidos/);
    expect(por("Perfil da Empresa no Google")).toMatch(/A verificação depende do Google/);
    expect(por("Privacidade e consentimento")).toMatch(/validar com o jurídico/);
    expect(por("Domínio, e-mail e hospedagem")).toMatch(/custos de terceiros/);
    expect(por("O código é seu")).toMatch(/nos termos do contrato/);
    expect(SITE_PADRAO.itens.map((i) => i.titulo)).toEqual(expect.arrayContaining(["Segurança básica", "Entrega documentada"]));
  });

  it("o que passa da base entra pelo pacote ou pela solução que cobre, em proposta (27/10/2026)", () => {
    expect(SITE_PADRAO.alem).toMatch(/pelo pacote ou pela solução que cobre, em proposta/);
  });
});
