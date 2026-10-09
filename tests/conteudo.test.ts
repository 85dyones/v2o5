import { describe, expect, it } from "vitest";
import { CASE, FRENTES, LINHAS, TITULO_DA_HOME } from "@/conteudo/home";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Regras de texto do CLAUDE.md: número só com fonte e período, demonstração
 * rotulada, preço "a partir de", sem travessão no texto público.
 */

describe("números do case", () => {
  const memoria = ler("memory/projects/case-motors.md");

  it("cada número existe na memória do case, lido do banco", () => {
    expect(memoria).toMatch(/\| Leads do site com `event_id` \| 42 de 44/);
    expect(memoria).toMatch(/\| Guias publicados \| 26 \|/);
    expect(memoria).toMatch(/\| Estoque sincronizado \| 132 veículos/);
    expect(CASE.numeros.map((n) => `${n.valor}${n.complemento ? ` ${n.complemento}` : ""}`)).toEqual([
      "42 de 44",
      "26",
      "132",
    ]);
  });

  it("a fonte e o período aparecem junto dos números", () => {
    expect(CASE.fonte).toMatch(/08\/10\/2026/);
    expect(CASE.fonte).toMatch(/05\/09/);
    expect(ler("src/components/home/CaseMotors.tsx")).toMatch(/\{CASE\.fonte\}/);
  });

  it("os exemplos proibidos do documento de motion não aparecem", () => {
    for (const arquivo of arquivos("src")) {
      const codigo = ler(arquivo);
      expect(codigo, arquivo).not.toMatch(/-70%|3\.4x|3,4x/);
    }
  });
});

describe("demonstrações rotuladas", () => {
  it("o orquestrador diz que é demonstração com dados fictícios", () => {
    expect(ler("src/components/home/orquestrador/Orquestrador.tsx")).toMatch(/Demonstração com dados fictícios/);
    expect(FRENTES.map((f) => f.aba)).toEqual(["Agente de IA", "Automação", "Site e rastreamento"]);
  });

  it("o terminal do case é rotulado como exemplo", () => {
    expect(ler("src/components/home/CaseMotors.tsx")).toMatch(/>exemplo</);
  });
});

describe("oferta", () => {
  const oferta = ler("memory/context/oferta.md");

  it("as seis linhas com preço a partir de, iguais à tabela de oferta.md", () => {
    expect(LINHAS).toHaveLength(6);
    for (const linha of LINHAS) {
      expect(linha.preco, linha.titulo).toMatch(/^a partir de R\$ /);
      const valores = [...linha.preco.matchAll(/R\$ ([\d.]+)/g)].map((m) => m[1]);
      for (const v of valores) expect(oferta, `${linha.titulo}: R$ ${v}`).toContain(`R$ ${v}`);
      expect(oferta).toContain(`\`${linha.href}\``);
    }
  });
});

describe("texto público", () => {
  it("o H1 da home é o escolhido em 09/10 e a decisão está registrada", () => {
    expect(TITULO_DA_HOME).toBe("Coloque sua empresa no mapa e multiplique a operação com IA.");
    expect(ler("memory/decisoes.md")).toContain(TITULO_DA_HOME);
  });

  it("sem travessão nos textos da home", () => {
    const fontes = ["src/conteudo/home.ts", ...arquivos("src/components", /\.tsx$/), ...arquivos("src/app", /\.tsx$/)];
    for (const arquivo of fontes) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/[—–]/);
    }
  });
});
