import { describe, expect, it } from "vitest";
import {
  CASE,
  CHAMADA,
  FRENTES,
  HERO,
  LINHAS,
  PERGUNTAS,
  PILARES,
  SOLUCOES,
  TRES_SPRINTS,
  TITULO_DA_HOME,
  VISAO_360,
} from "@/conteudo/home";
import { CONTINUIDADE, faixaEmTexto, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
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
    expect(ler("src/components/home/TerminalDeEventos.tsx")).toMatch(/>exemplo</);
    expect(ler("src/components/home/CaseMotors.tsx")).toMatch(/<TerminalDeEventos linhas=\{CASE\.terminal\}/);
  });
});

describe("oferta", () => {
  it("os cartões do catálogo da home não publicam valor nem falam de plano ou mensalidade", () => {
    expect(LINHAS).toHaveLength(13);
    for (const linha of LINHAS) {
      expect(linha, linha.titulo).not.toHaveProperty("preco");
      expect(`${linha.titulo} ${linha.frase}`, linha.titulo).not.toMatch(/R\$|mensalidade|plano |Completo|Presença/);
      expect(linha.href, linha.titulo).toMatch(/^\//);
    }
  });
});

describe("os dois grupos do catálogo (operação primeiro, \"Trazer mais gente\" depois)", () => {
  const servicos = PILARES.flatMap((p) => p.servicos);

  it("são dois grupos, e toda linha da home está num deles", () => {
    expect(PILARES.map((p) => p.sobretitulo)).toEqual(["Organizar a operação", "Trazer mais gente"]);
    for (const l of LINHAS) expect(servicos, l.titulo).toContainEqual(l);
  });

  it("nenhum serviço do catálogo publica valor", () => {
    for (const s of servicos) {
      expect(s, s.titulo).not.toHaveProperty("preco");
      expect(`${s.titulo} ${s.frase}`, s.titulo).not.toMatch(/R\$|mensalidade|plano |Completo|Presença/);
    }
  });

  it("o cabeçalho do catálogo subordina as peças ao Sprint e não fala de contratação avulsa", () => {
    const cabecalho = `${SOLUCOES.titulo} ${SOLUCOES.apagado} ${SOLUCOES.texto}`;
    expect(cabecalho).toMatch(/Sprint/);
    expect(cabecalho).not.toMatch(/avuls|em três planos|preço publicado/i);
  });

  it("o mapa traz branding, Perfil da Empresa no Google, SEO e tráfego no Google e na Meta", () => {
    const mapa = PILARES[1].servicos.map((s) => s.titulo).join(" | ");
    expect(mapa).toMatch(/Branding e gestão de marca/);
    expect(mapa).toMatch(/Perfil da Empresa no Google/);
    expect(mapa).toMatch(/SEO/);
    expect(mapa).toMatch(/Google e na Meta/);
    expect(PILARES[1].servicos).toHaveLength(9);
    expect(PILARES[1].titulo).toMatch(/De que adianta trazer mais gente se a operação não está pronta/);
  });

  it("a operação traz o agente no bloco grande, diagnóstico, consultoria, indicadores e pós-venda, e as integrações por último; sem módulos", () => {
    const operacao = PILARES[0].servicos.map((s) => s.titulo);
    expect(operacao[0]).toBe("Agente de IA no WhatsApp");
    expect(operacao).toContain("Diagnóstico e análise de operação");
    expect(operacao).toContain("Consultoria de processos");
    expect(operacao).toContain("Indicadores e painéis");
    expect(operacao).toContain("Pós-venda e recorrência");
    expect(operacao).not.toContain("Painel do dono");
    expect(operacao).not.toContain("Reativação de base");
    expect(operacao[operacao.length - 1]).toBe("Integrações entre sistemas");
    expect(PILARES[0].servicos).toHaveLength(8);
  });

  it("o cabeçalho do catálogo diz que tudo chega por um dos três Sprints", () => {
    expect(`${SOLUCOES.titulo} ${SOLUCOES.apagado}`).toMatch(/três Sprints/);
    expect(TRES_SPRINTS.titulo).toMatch(/três/);
  });

  it("as perguntas respondem preço do Sprint, pagamento, continuidade e lista comprada", () => {
    const perguntas = PERGUNTAS.map((p) => p.pergunta);
    expect(perguntas).toContain("Quanto custa?");
    expect(perguntas).toContain("Como funciona o pagamento?");
    expect(perguntas).toContain("E depois que o Sprint termina?");
    expect(perguntas).toContain("Vocês disparam para listas compradas?");
    expect(perguntas).not.toContain("Tem cobrança por usuário?");
    expect(perguntas).not.toContain("Os preços sobem com o dólar?");
    const custo = PERGUNTAS.find((p) => p.pergunta === "Quanto custa?")?.resposta ?? "";
    for (const n of SPRINT_DE_PRECOS.niveis) expect(custo).toContain(faixaEmTexto(n.faixa));
    expect(PERGUNTAS.find((p) => p.pergunta === "Vocês disparam para listas compradas?")?.resposta).toMatch(/^Não\./);
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

describe("perguntas e chamadas", () => {
  it("todo valor em real das perguntas é uma faixa do Sprint ou da recorrência", () => {
    const permitidos = [...SPRINT_DE_PRECOS.niveis, ...CONTINUIDADE.modalidades].flatMap((n) => [n.faixa.de, n.faixa.ate].map((v) => `R$ ${v.toLocaleString("pt-BR")}`));
    const tudo = PERGUNTAS.map((p) => p.resposta).join(" ");
    const valores = tudo.match(/R\$ \d{1,3}(?:\.\d{3})*/g) ?? [];
    expect(valores.length).toBeGreaterThan(0);
    for (const v of valores) expect(permitidos, v).toContain(v);
    expect(PERGUNTAS.length).toBeGreaterThanOrEqual(6);
  });

  it("as chamadas e o cabeçalho das soluções não prometem nada fora das regras", () => {
    const textos = [SOLUCOES.texto, CHAMADA.depoisDasSolucoes.texto, CHAMADA.depoisDoCase.texto].join(" ");
    expect(textos).not.toMatch(/\d+%|\d+x /);
    expect(textos).not.toMatch(/sem fidelidade/i);
  });
});

describe("texto público", () => {
  it("o H1 da home é o de 25/10 (Sprint de Eficiência) e a decisão está registrada", () => {
    expect(TITULO_DA_HOME).toBe("Do problema ao resultado, pelo caminho mais simples.");
    expect(ler("memory/decisoes.md")).toContain(TITULO_DA_HOME);
  });

  it("sem travessão nos textos da home", () => {
    const fontes = ["src/conteudo/home.ts", ...arquivos("src/components", /\.tsx$/), ...arquivos("src/app", /\.tsx$/)];
    for (const arquivo of fontes) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/[—–]/);
    }
  });
});

describe("Como tudo se liga (home)", () => {
  it("o diagrama é apresentado como exemplo de um Sprint, não como pacote fechado (25/10/2026)", () => {
    const fonte = ler("src/components/home/diagrama/ComoSeLiga.tsx");
    expect(fonte).toMatch(/Um exemplo: o caminho de um contato num Sprint Integrada/);
    expect(fonte).toMatch(/Cada Sprint liga só as peças que o gargalo pede/);
    expect(fonte).toMatch(/id="como-se-liga"/);
  });
});

describe("telas da Motors", () => {
  it("a galeria tem sete telas, cada uma com data de captura e texto alternativo, e entra em /criacao-de-sites e no case (26/10/2026)", () => {
    const fonte = ler("src/components/case/CapturasDaMotors.tsx");
    const lista = fonte.match(/TODAS_AS_CAPTURAS = \[([^\]]*)\]/)?.[1].match(/"[a-z]+"/g) ?? [];
    expect(lista).toHaveLength(7);
    expect((fonte.match(/alt: "/g) ?? []).length).toBe(7);
    expect((fonte.match(/em: "\d\d\/10\/2026"/g) ?? []).length).toBe(7);
    expect(ler("src/components/solucoes/PaginaDeSolucao.tsx")).toContain("TODAS_AS_CAPTURAS");
    expect(ler("src/app/cases/motors-store/page.tsx")).toContain("TODAS_AS_CAPTURAS");
  });
});
