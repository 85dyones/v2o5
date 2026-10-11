import { describe, expect, it } from "vitest";
import {
  AUTOMOTIVO_PRECO,
  BRL,
  descontoDoPacote,
  LINHAS_DE_PRECO,
  mensalidadeDoPacoteComTrafego,
  mesesQueUmaVendaPaga,
  PISO_DA_MENSALIDADE,
  precoDa,
  somaDoPacote,
} from "@/conteudo/precos";
import { AUTOMOTIVO, LINHAS, PILARES } from "@/conteudo/home";
import { ler } from "./fonte";

/**
 * `precos.ts` é a fonte; `memory/context/oferta.md` repete os números. Aqui
 * os dois lados são comparados, e a regra do piso de R$ 590 fica travada.
 */

const oferta = ler("memory/context/oferta.md");

describe("tabela de preços", () => {
  it("formata em real com ponto de milhar", () => {
    expect(BRL(590)).toBe("R$ 590");
    expect(BRL(7900)).toBe("R$ 7.900");
    expect(BRL(14900)).toBe("R$ 14.900");
  });

  it("nenhuma mensalidade fica abaixo do piso de hospedagem e manutenção", () => {
    expect(PISO_DA_MENSALIDADE).toBe(590);
    for (const l of LINHAS_DE_PRECO) {
      if (l.mensalidade) expect(l.mensalidade, l.nome).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
    }
    expect(AUTOMOTIVO_PRECO.siteDeEstoque.mensalidade).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
  });

  it("cada número do código está em oferta.md", () => {
    const valores = new Set<number>();
    for (const l of LINHAS_DE_PRECO) {
      if (l.implantacao) valores.add(l.implantacao);
      if (l.mensalidade) valores.add(l.mensalidade);
    }
    const { siteDeEstoque, pacote, trafegoNoPacote } = AUTOMOTIVO_PRECO;
    for (const v of [siteDeEstoque.implantacao, siteDeEstoque.mensalidade, pacote.implantacao, pacote.mensalidade, trafegoNoPacote]) {
      valores.add(v);
    }
    valores.add(mensalidadeDoPacoteComTrafego());
    valores.add(somaDoPacote().implantacao);
    valores.add(somaDoPacote().mensalidade);
    for (const v of valores) expect(oferta, BRL(v)).toContain(BRL(v));
  });

  it("os cartões da home e o pacote usam o texto da tabela", () => {
    for (const l of LINHAS) {
      const daTabela = LINHAS_DE_PRECO.find((x) => x.href === l.href);
      expect(daTabela, l.titulo).toBeDefined();
      expect(l.preco).toBe(precoDa(daTabela!.id));
    }
    expect(PILARES[0].servicos[0].preco).toBe(precoDa("branding"));
    expect(AUTOMOTIVO.preco).toContain(BRL(AUTOMOTIVO_PRECO.pacote.implantacao));
    expect(AUTOMOTIVO.preco).toContain(BRL(AUTOMOTIVO_PRECO.pacote.mensalidade));
  });

  it("o desconto do pacote e a conta da margem batem com oferta.md", () => {
    const d = descontoDoPacote();
    expect(d.implantacao).toBe(24);
    expect(d.mensalidade).toBe(22);
    expect(oferta).toContain(`${d.implantacao}% sobre a soma das implantações`);
    expect(oferta).toContain(`${d.mensalidade}% sobre a soma das mensalidades`);
    expect(mesesQueUmaVendaPaga()).toBe(3);
    expect(oferta).toContain("uma venda a mais a cada 3 meses");
  });

  it("os textos de preço seguem o formato dos cartões", () => {
    expect(precoDa("sites")).toBe("a partir de R$ 7.900 + R$ 590/mês");
    expect(precoDa("trafego")).toBe("a partir de R$ 1.800/mês + verba");
    expect(precoDa("automacao")).toBe("a partir de R$ 1.900 por fluxo");
    expect(precoDa("branding")).toBe("a partir de R$ 1.500 por projeto");
  });
});
