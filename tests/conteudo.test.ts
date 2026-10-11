import { describe, expect, it } from "vitest";
import {
  CASE,
  CHAMADA,
  FRENTES,
  GARANTIAS,
  HERO,
  LINHAS,
  PERGUNTAS,
  PILARES,
  SOLUCOES,
  TITULO_DA_HOME,
  VISAO_360,
} from "@/conteudo/home";
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
    expect(ler("memory/context/oferta.md")).toContain("Piso da mensalidade: R$ 590");
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

  it("o mapa traz branding, Perfil da Empresa no Google, SEO e tráfego no Google e na Meta", () => {
    const mapa = PILARES[0].servicos.map((s) => s.titulo).join(" | ");
    expect(mapa).toMatch(/Branding e gestão de marca/);
    expect(PILARES[0].servicos[0].preco).toBe("a partir de R$ 1.500 por projeto");
    expect(mapa).toMatch(/Perfil da Empresa no Google/);
    expect(mapa).toMatch(/SEO/);
    expect(mapa).toMatch(/Google e na Meta/);
  });

  // Medido no Lighthouse mobile: com 279 caracteres o subtítulo ocupava mais
  // tela que o H1 e virava o LCP. Com 174, fica em 72% a 81% da área do H1
  // entre 360 e 430 px de largura.
  it("o subtítulo do hero é curto o bastante para o H1 seguir como LCP no celular", () => {
    expect(HERO.subtitulo.length).toBeLessThanOrEqual(180);
  });

});

describe("Visão 360", () => {
  it("o fundador aparece com o que ele contou e publicou: FAE, a Top, 1992, os guias e o diagnóstico", () => {
    const { texto, escola } = VISAO_360.fundador;
    expect(escola).toBe("FAE Business School");
    expect(texto).toContain(`Administração pela ${escola}`);
    expect(texto).toMatch(/Top Imóveis para Top Soluções Imobiliárias/);
    expect(texto).toMatch(/desde 1992/);
    expect(texto).toMatch(/26 guias/);
    expect(texto).toMatch(/conduz o diagnóstico/);
    expect(ler("memory/projects/case-motors.md")).toMatch(/\| Guias publicados \| 26 \|/);
  });

  it("cada área traz a base do fundador, e a formação na FAE responde pela gestão", () => {
    expect(VISAO_360.areas.map((a) => a.nome)).toEqual(["Marca", "Marketing", "Vendas", "Gestão"]);
    for (const a of VISAO_360.areas) expect(["Formação", "Experiência", "Prática"]).toContain(a.base.tipo);
    expect(VISAO_360.areas[3].base).toEqual({ tipo: "Formação", texto: "Administração na FAE Business School" });
    expect(VISAO_360.costuras).toHaveLength(VISAO_360.areas.length - 1);
  });

  it("todo número da seção vem do estudo citado, com fonte e link", () => {
    const { evidencia } = VISAO_360;
    expect(evidencia.href).toBe("https://hbr.org/2011/03/the-short-life-of-online-sales-leads");
    expect(evidencia.fonte).toMatch(/Harvard Business Review, março de 2011/);
    for (const n of ["2.241", "23%", "42 horas", "sete vezes"]) expect(evidencia.texto).toContain(n);
    const numerosDasCosturas = VISAO_360.costuras.join(" ").match(/\d+/g) ?? [];
    expect(numerosDasCosturas).toEqual(["42"]);
    expect(ler("src/components/home/VisaoAmpla.tsx")).toMatch(/v\.evidencia\.fonte/);
  });
});

describe("garantias, perguntas e chamadas (regras de oferta.md)", () => {
  const oferta = ler("memory/context/oferta.md");

  it("as garantias repetem as regras comerciais", () => {
    expect(GARANTIAS.map((g) => g.titulo)).toEqual([
      "Sem fidelidade",
      "Implantação em até 6x",
      "O sistema é seu",
      "Mensalidade sem surpresa",
    ]);
    expect(oferta).toContain("Sem fidelidade");
    expect(oferta).toContain("até 6x");
    expect(oferta).toContain("em até 15 dias");
    expect(GARANTIAS[2].texto).toContain("15 dias");
  });

  it("todo valor em real das perguntas está na tabela de oferta.md", () => {
    const tudo = PERGUNTAS.map((p) => p.resposta).join(" ");
    const valores = tudo.match(/R\$ [\d.]+/g) ?? [];
    expect(valores.length).toBeGreaterThan(0);
    for (const v of valores) expect(oferta, v).toContain(v);
    expect(PERGUNTAS.length).toBeGreaterThanOrEqual(6);
  });

  it("as chamadas e o cabeçalho das soluções não prometem nada fora das regras", () => {
    const textos = [SOLUCOES.texto, CHAMADA.depoisDasSolucoes.texto, CHAMADA.depoisDoCase.texto].join(" ");
    expect(textos).not.toMatch(/\d+%|\d+x /);
    expect(SOLUCOES.texto).toContain("sem fidelidade");
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
