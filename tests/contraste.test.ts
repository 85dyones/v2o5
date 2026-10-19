import { describe, expect, it } from "vitest";
import { lerHex, razaoDeContraste, sobrepor } from "@/lib/contraste";
import { CORES, type NomeDaCor } from "@/lib/tokens";
import { frenteDoDesign, kebab, variavelNoCss } from "./design";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * As cores do sistema valem em três lugares (o front matter de
 * design/DESIGN.md, lib/tokens.ts e o @theme do globals.css) e cada par da
 * tabela de cores do DESIGN.md passa no que promete: texto no AA (4,5:1),
 * borda de controle e peça gráfica em 3:1. Os números esperados são os que o
 * DESIGN.md registra como medidos.
 */

const css = ler("src/app/globals.css");
const contraste = (a: NomeDaCor, b: NomeDaCor) => razaoDeContraste(CORES[a], CORES[b])!;

describe("a conta da WCAG", () => {
  it("bate nos extremos e não depende da ordem", () => {
    expect(razaoDeContraste("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(razaoDeContraste("#777", "#777")).toBeCloseTo(1, 5);
    expect(razaoDeContraste("#121418", "#F2F1EC")).toBeCloseTo(razaoDeContraste("#F2F1EC", "#121418")!, 10);
  });

  it("devolve null para o que não é cor", () => {
    expect(lerHex("vermelho")).toBeNull();
    expect(razaoDeContraste("#12345", "#000")).toBeNull();
  });
});

describe("DESIGN.md, tokens.ts e globals.css dizem a mesma coisa", () => {
  const doDesign = frenteDoDesign().colors as Record<string, string>;

  it("cada cor do DESIGN.md está em tokens.ts com o mesmo valor, e só elas", () => {
    const deTokens = Object.fromEntries(Object.entries(CORES).map(([n, hex]) => [kebab(n), hex.toUpperCase()]));
    const doArquivo = Object.fromEntries(Object.entries(doDesign).map(([n, hex]) => [n, hex.toUpperCase()]));
    expect(deTokens).toEqual(doArquivo);
  });

  it("cada cor de tokens.ts está no @theme com o mesmo valor", () => {
    for (const [nome, hex] of Object.entries(CORES)) {
      const variavel = `--color-${kebab(nome)}`;
      const noCss = variavelNoCss(css, variavel);
      expect(noCss, `${variavel} ausente do globals.css`).not.toBeNull();
      expect(noCss!.toUpperCase(), variavel).toBe(hex.toUpperCase());
    }
  });

  it("o @theme não tem cor fora de tokens.ts", () => {
    const tema = /@theme\s*\{([\s\S]*?)\n\}/.exec(css)![1];
    const noCss = [...tema.matchAll(/--color-([a-z-]+):\s*([^;]+);/g)];
    const conhecidas = new Set(Object.keys(CORES).map(kebab));
    for (const [, nome, valor] of noCss) {
      if (nome === "*") continue;
      expect(conhecidas.has(nome), `--color-${nome} sem par em tokens.ts`).toBe(true);
      expect(valor, `--color-${nome}`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("os pares da tabela de cores do DESIGN.md", () => {
  // [uso, frente, fundo, contraste medido no DESIGN.md, mínimo]
  const AA = 4.5;
  const PECA = 3;
  const pares: [string, NomeDaCor, NomeDaCor, number, number][] = [
    ["texto no fundo", "texto", "fundo", 16.3, AA],
    ["texto no cartão", "texto", "fundoCartao", 17.5, AA],
    ["texto na seção alternada", "texto", "fundoAlternado", 14.76, AA],
    ["texto secundário no fundo", "textoSecundario", "fundo", 5.82, AA],
    ["texto secundário no cartão", "textoSecundario", "fundoCartao", 6.24, AA],
    ["texto secundário na seção alternada", "textoSecundario", "fundoAlternado", 5.27, AA],
    ["âmbar de texto no fundo (link, o IA da assinatura)", "acaoTexto", "fundo", 5.44, AA],
    ["âmbar de texto no cartão", "acaoTexto", "fundoCartao", 5.84, AA],
    ["âmbar de texto na seção alternada", "acaoTexto", "fundoAlternado", 4.93, AA],
    ["tinta sobre o botão âmbar", "texto", "acao", 8.93, AA],
    ["etapa atração como texto, e o papel sobre ela", "etapaAtracao", "fundo", 5.57, AA],
    ["etapa atendimento (botão de WhatsApp, balão)", "etapaAtendimento", "fundo", 4.96, AA],
    ["etapa CRM", "etapaCrm", "fundo", 5.72, AA],
    ["erro de formulário no fundo", "erro", "fundo", 5.78, AA],
    ["erro de formulário no cartão", "erro", "fundoCartao", 6.2, AA],
    ["faixa escura: papel", "faixaEscuraTexto", "faixaEscura", 16.3, AA],
    ["faixa escura: âmbar", "acao", "faixaEscura", 8.93, AA],
    ["faixa escura: secundário", "faixaEscuraSecundario", "faixaEscura", 8.12, AA],
    ["borda de campo no fundo", "linhaCampo", "fundo", 3.86, PECA],
    ["borda de campo no cartão", "linhaCampo", "fundoCartao", 4.15, PECA],
    ["borda do botão âmbar contra o fundo", "acaoBorda", "fundo", 5.44, PECA],
  ];

  it.each(pares)("%s", (_, frente, fundo, medido, minimo) => {
    expect(contraste(frente, fundo)).toBeCloseTo(medido, 1);
    expect(contraste(frente, fundo)).toBeGreaterThanOrEqual(minimo);
  });

  it("a linha é só decoração: não chega a 3:1 e nunca é a única borda de um controle", () => {
    expect(contraste("linha", "fundo")).toBeCloseTo(1.31, 1);
    expect(contraste("linha", "fundo")).toBeLessThan(PECA);
    for (const classe of ["campo", "opcao", "botao-secundario"]) {
      const regra = new RegExp(`\\.${classe}\\s*\\{([^}]*)\\}`).exec(css)![1];
      expect(regra, classe).toMatch(/inset 0 0 0 1px var\(--color-linha-campo\)/);
    }
  });

  it("o âmbar some no papel (1,83:1): nunca é texto no claro e o botão leva a borda", () => {
    expect(contraste("acao", "fundo")).toBeCloseTo(1.83, 1);
    expect(contraste("acao", "fundo")).toBeLessThan(PECA);
    const primario = /\.botao-primario\s*\{([^}]*)\}/.exec(css)![1];
    expect(primario).toMatch(/background-color:\s*var\(--color-acao\);/);
    expect(primario).toMatch(/box-shadow:\s*inset 0 0 0 1px var\(--color-acao-borda\);/);
    for (const arquivo of arquivos("src", /\.tsx$/)) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/(?<![\w-])text-acao(?![\w-])/);
    }
  });

  it("o botão âmbar sob o cursor escurece e a tinta continua passando", () => {
    expect(css).toMatch(/background-color:\s*color-mix\(in srgb, var\(--color-acao\) 88%, var\(--color-acao-borda\)\);/);
    const sobOCursor = sobrepor(CORES.acaoBorda, 0.12, CORES.acao);
    expect(razaoDeContraste(CORES.texto, sobOCursor)!).toBeGreaterThanOrEqual(AA);
  });

  it("o contorno de foco usa o âmbar de texto, que passa em 3:1 em todos os fundos", () => {
    expect(css).toMatch(/:focus-visible\s*\{\s*outline:\s*2px solid var\(--color-acao-texto\);/);
    for (const fundo of ["fundo", "fundoCartao", "fundoAlternado"] as const) {
      expect(contraste("acaoTexto", fundo), fundo).toBeGreaterThanOrEqual(PECA);
    }
  });

  it("o papel por cima das etapas passa no AA (balão, etiqueta, botão de WhatsApp)", () => {
    for (const cor of ["etapaAtracao", "etapaAtendimento", "etapaCrm"] as const) {
      expect(contraste("fundo", cor), cor).toBeGreaterThanOrEqual(AA);
    }
  });
});

describe("os componentes só usam as cores do sistema", () => {
  // Com `--color-*: initial`, uma classe com nome de cor que não existe não
  // gera CSS nenhum: o texto herda a cor de cima e ninguém percebe. Os
  // nomes da base escura não podem voltar.
  const daBaseEscura = [
    "tinta", "papel", "grafite", "superficie", "secundario", "secundario-claro", "ambar", "ambar-forte",
    "ambar-texto", "violeta", "verde", "azul", "violeta-claro", "verde-claro", "azul-claro", "regua",
    "linha-forte", "vidro", "vidro-forte",
  ];
  const utilidade =
    /(?<![\w-])(?:[\w-]+:)*(?:bg|text|border|from|to|via|fill|stroke|divide|decoration|ring|outline|placeholder)-([a-z][a-z-]*)/g;
  const conhecidas = new Set(Object.keys(CORES).map(kebab));
  const fontes = [...arquivos("src", /\.tsx?$/), "src/app/globals.css"];

  it("nenhuma classe usa um nome de cor da base escura", () => {
    for (const arquivo of fontes) {
      const usados = [...semComentarios(ler(arquivo)).matchAll(utilidade)].map((m) => m[1]);
      for (const nome of usados) expect(daBaseEscura, `${arquivo}: ${nome}`).not.toContain(nome);
    }
  });

  it("toda var(--color-...) aponta para uma cor que existe", () => {
    for (const arquivo of fontes) {
      for (const [, nome] of semComentarios(ler(arquivo)).matchAll(/var\(--color-([a-z-]+)\)/g)) {
        expect(conhecidas.has(nome), `${arquivo}: --color-${nome}`).toBe(true);
      }
    }
  });

  it("a mensagem de erro do formulário usa o vermelho do sistema", () => {
    const formulario = ler("src/components/diagnostico/Formulario.tsx");
    expect(formulario).toContain("text-erro");
    expect(formulario).not.toMatch(/rgb\(255_150_130\)/);
  });
});
