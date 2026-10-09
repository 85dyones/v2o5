import { describe, expect, it } from "vitest";
import { CASE, FRENTES, LINHAS, PILARES, TITULO_DA_HOME, VISAO_360 } from "@/conteudo/home";
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

describe("os dois pilares do H1", () => {
  const servicos = PILARES.flatMap((p) => p.servicos);

  it("cada metade do H1 é um pilar, e as seis linhas com preço estão neles", () => {
    expect(PILARES.map((p) => p.titulo.replace(/\.$/, "").toLowerCase())).toEqual([
      "coloque sua empresa no mapa",
      "multiplique a operação com ia",
    ]);
    for (const l of LINHAS) expect(servicos, l.titulo).toContainEqual(l);
  });

  it("serviço sem linha própria diz onde vem incluso ou traz preço da tabela", () => {
    const oferta = ler("memory/context/oferta.md");
    for (const s of servicos.filter((s) => !LINHAS.includes(s as (typeof LINHAS)[number]))) {
      if (/incluso em /.test(s.preco)) {
        const linha = s.preco.split("incluso em ")[1];
        expect(LINHAS.map((l) => l.titulo), s.titulo).toContain(linha);
      } else {
        expect(s.preco, s.titulo).toMatch(/^a partir de R\$ /);
        for (const [, v] of s.preco.matchAll(/R\$ ([\d.]+)/g)) expect(oferta).toContain(`R$ ${v}`);
      }
    }
  });

  it("o mapa traz Perfil da Empresa no Google, SEO e tráfego no Google e na Meta", () => {
    const mapa = PILARES[0].servicos.map((s) => s.titulo).join(" | ");
    expect(mapa).toMatch(/Perfil da Empresa no Google/);
    expect(mapa).toMatch(/SEO/);
    expect(mapa).toMatch(/Google e na Meta/);
  });

  it("a frase do fundador só usa o que está publicado (informática desde 1992)", () => {
    expect(VISAO_360.fundador).toMatch(/1992/);
    expect(VISAO_360.anel).toHaveLength(6);
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
