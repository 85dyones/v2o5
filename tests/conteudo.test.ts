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
  TITULO_DA_HOME,
  VISAO_360,
} from "@/conteudo/home";
import { continuidadeAPartirDe, mensalEmTexto, OFERTAS, precoDeEntrada, VALORES_PUBLICOS } from "@/conteudo/ofertas";
import { BRL } from "@/conteudo/precos";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Regras de texto do CLAUDE.md: número só com fonte e período, demonstração
 * rotulada, preço só da tabela (`ofertas.ts` e `sprint.ts`), sem travessão
 * no texto público.
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
  it("os cartões de recurso não publicam valor nem falam de plano ou mensalidade", () => {
    expect(LINHAS).toHaveLength(13);
    for (const linha of LINHAS) {
      expect(linha, linha.titulo).not.toHaveProperty("preco");
      expect(`${linha.titulo} ${linha.frase}`, linha.titulo).not.toMatch(/R\$|mensalidade|plano |Completo/);
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
      expect(`${s.titulo} ${s.frase}`, s.titulo).not.toMatch(/R\$|mensalidade|plano |Completo/);
    }
  });

  it("a seção #solucoes da home mostra as quatro soluções e a continuidade, sem obrigar a comprar a seguinte (27/10/2026)", () => {
    expect(`${SOLUCOES.titulo} ${SOLUCOES.apagado}`).toMatch(/Quatro soluções/);
    expect(SOLUCOES.texto).toMatch(/nenhuma obriga a comprar a seguinte/);
    const fonte = ler("src/components/home/Solucoes.tsx");
    expect(fonte).toContain('id="solucoes"');
    expect(fonte).toContain("OFERTAS.map");
    expect(fonte).toContain('href="/continuidade"');
    expect(fonte).not.toContain("PILARES");
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

  it("a operação traz o agente no bloco grande, diagnóstico, consultoria, indicadores e integrações, e o pós-venda por último; sem módulos", () => {
    const operacao = PILARES[0].servicos.map((s) => s.titulo);
    expect(operacao[0]).toBe("Agente de IA no WhatsApp");
    expect(operacao).toContain("Diagnóstico e análise de operação");
    expect(operacao).toContain("Consultoria de processos");
    expect(operacao).toContain("Indicadores e painéis");
    expect(operacao).toContain("Pós-venda e recorrência");
    expect(operacao).not.toContain("Painel do dono");
    expect(operacao).not.toContain("Reativação de base");
    expect(operacao[operacao.length - 1]).toBe("Pós-venda e recorrência");
    expect(operacao.indexOf("Integrações entre sistemas")).toBe(operacao.length - 2);
    expect(PILARES[0].servicos).toHaveLength(8);
  });

  it("a home não volta ao catálogo genérico: as capacidades ficam como recursos, fora da home", () => {
    const home = ler("src/components/home/Home.tsx");
    expect(home).not.toMatch(/TresSprints|PILARES|LINHAS/);
    expect(HERO.conectamos.itens).toEqual(OFERTAS.map((o) => o.nome));
  });

  it("as perguntas respondem preço das quatro soluções, se precisa contratar tudo, pagamento e continuidade", () => {
    const perguntas = PERGUNTAS.map((p) => p.pergunta);
    for (const p of ["Quanto custa?", "Preciso contratar tudo?", "Como funciona o pagamento?", "E depois da entrega?"]) expect(perguntas).toContain(p);
    expect(perguntas).not.toContain("Tem cobrança por usuário?");
    expect(perguntas).not.toContain("Os preços sobem com o dólar?");
    const custo = PERGUNTAS.find((p) => p.pergunta === "Quanto custa?")?.resposta ?? "";
    for (const o of OFERTAS) expect(custo).toContain(`${o.nome} a partir de ${BRL(precoDeEntrada(o))}`);
    expect(custo).toContain(mensalEmTexto(continuidadeAPartirDe()));
    expect(PERGUNTAS.find((p) => p.pergunta === "Preciso contratar tudo?")?.resposta).toMatch(/^Não\./);
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
  it("todo valor em real das perguntas é da tabela de 27/10/2026", () => {
    const permitidos = VALORES_PUBLICOS.map(BRL);
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
  it("o H1 da home é o de 25/10, mantido em 27/10, e a decisão está registrada", () => {
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
    expect(fonte).toMatch(/Um exemplo: o caminho de um contato num Sprint Integrado/);
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

describe("Como tudo se liga: a ordem do funil (26/10/2026)", () => {
  it("as paradas seguem atração, atendimento, gestão e venda, sem etapa fora de ordem", async () => {
    const { PARADAS, CAMADAS, PECAS } = await import("@/conteudo/home");
    expect(PARADAS.map((p) => p.id)).toEqual(["site", "whatsapp", "agente", "crm", "venda"]);
    const ordem = { violeta: 0, verde: 1, azul: 2, ambar: 3 } as const;
    const etapas = PARADAS.map((p) => ordem[p.etapa]);
    expect(etapas).toEqual([...etapas].sort((a, b) => a - b));
    expect(PARADAS[PARADAS.length - 1].etapa).toBe("ambar");
    expect(CAMADAS.map((c) => c.id)).toEqual(["n8n", "rastreamento"]);
    expect(PECAS).toHaveLength(7);
  });

  it("o rastreamento é camada (origem na entrada, venda de volta ao anúncio) e não uma parada; nenhum caminho de parada o contém", async () => {
    const { PARADAS, CAMADAS } = await import("@/conteudo/home");
    const rastreio = CAMADAS.find((c) => c.id === "rastreamento")!;
    expect(rastreio.camada).toMatch(/Origem na entrada, venda de volta ao anúncio/);
    expect(rastreio.texto).toMatch(/na entrada/);
    expect(rastreio.texto).toMatch(/devolve a conversão/);
    for (const p of PARADAS) expect(p.caminho, p.nome).not.toContain("rastreamento");
    for (const c of CAMADAS) for (const id of c.caminho) expect(PARADAS.map((p) => p.id)).toContain(id);
  });

  it("a home segue a lógica soluções, como começar, problema, método, exemplo, medição e prova (27/10/2026)", () => {
    const home = ler("src/components/home/Home.tsx");
    const ordem = ["<Hero ", "<Solucoes />", "<Escada />", "<Dores />", "<Sprint />", "<ComoSeLiga />", "<Indicadores />", "<ProjetoReal />", "<Automotivo />"];
    const posicoes = ordem.map((c) => home.indexOf(c));
    expect(posicoes.every((p) => p > 0)).toBe(true);
    expect(posicoes).toEqual([...posicoes].sort((a, b) => a - b));
  });
});

describe("a rota do catálogo só sobe de etapa (26/10/2026)", () => {
  it("em cada grupo, as etapas dos serviços aparecem em ordem: nenhuma volta atrás", () => {
    const ordem = { violeta: 0, verde: 1, azul: 2, ambar: 3 } as const;
    for (const g of PILARES) {
      const etapas = g.servicos.map((s) => ordem[s.etapa]);
      expect(etapas, g.sobretitulo).toEqual([...etapas].sort((a, b) => a - b));
    }
  });
});
