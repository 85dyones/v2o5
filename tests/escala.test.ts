import { describe, expect, it } from "vitest";
import { ESPACOS, PASSOS_DE_ESPACO, TIPOGRAFIA } from "@/lib/tokens";
import { frenteDoDesign, kebab, variavelNoCss } from "./design";
import { ler } from "./fonte";

/**
 * A escala tipográfica e o ritmo de espaçamento de design/DESIGN.md valem em
 * três lugares: o front matter, lib/tokens.ts e o @theme do globals.css. As
 * classes de título que as páginas já usam apontam para a escala.
 */

const css = ler("src/app/globals.css");
const frente = frenteDoDesign();

/** Valor em px de `clamp(min, a rem + b vw, max)` numa largura de tela. */
function pxNaLargura(clamp: string, largura: number): { min: number; meio: number; max: number } {
  const m = /^clamp\(([\d.]+)rem,\s*([\d.]+)rem \+ ([\d.]+)vw,\s*([\d.]+)rem\)$/.exec(clamp);
  if (!m) throw new Error(`clamp fora do formato: ${clamp}`);
  const [min, base, vw, max] = m.slice(1).map(Number);
  return { min: min * 16, meio: base * 16 + (vw * largura) / 100, max: max * 16 };
}

describe("tipografia", () => {
  const doDesign = frente.typography as Record<string, Record<string, string>>;

  it("os estilos de tokens.ts são os do DESIGN.md, com os mesmos valores", () => {
    expect(Object.keys(TIPOGRAFIA).map(kebab).sort()).toEqual(Object.keys(doDesign).sort());
    for (const [nome, estilo] of Object.entries(TIPOGRAFIA)) {
      const d = doDesign[kebab(nome)];
      expect(estilo.tamanho, nome).toBe(d.fontSize);
      expect(String(estilo.peso), nome).toBe(d.fontWeight);
      expect(String(estilo.entrelinha), nome).toBe(d.lineHeight);
      expect("espacejamento" in estilo ? estilo.espacejamento : undefined, nome).toBe(d.letterSpacing);
      expect(d.fontFamily, nome).toBe(nome === "rotulo" ? "Geist Mono" : "Geist");
    }
  });

  it("cada estilo está no @theme com tamanho, peso, entrelinha e espacejamento", () => {
    for (const [nome, estilo] of Object.entries(TIPOGRAFIA)) {
      const v = `--text-${kebab(nome)}`;
      expect(variavelNoCss(css, v), v).toBe(estilo.tamanho);
      expect(variavelNoCss(css, `${v}--font-weight`), v).toBe(String(estilo.peso));
      expect(variavelNoCss(css, `${v}--line-height`), v).toBe(String(estilo.entrelinha));
      expect(variavelNoCss(css, `${v}--letter-spacing`) ?? undefined, v).toBe(
        "espacejamento" in estilo ? estilo.espacejamento : undefined,
      );
    }
  });

  it("os tamanhos fluidos vão do mínimo em 375 px ao máximo em 1440 px", () => {
    for (const [nome, { tamanho }] of Object.entries(TIPOGRAFIA)) {
      if (!tamanho.startsWith("clamp")) continue;
      expect(pxNaLargura(tamanho, 375).meio, `${nome} em 375`).toBeCloseTo(pxNaLargura(tamanho, 375).min, 0);
      expect(pxNaLargura(tamanho, 1440).meio, `${nome} em 1440`).toBeCloseTo(pxNaLargura(tamanho, 1440).max, 0);
    }
  });

  it("entrelinha nunca abaixo de 1, fora o V2O5 grande do rodapé (sem acento)", () => {
    for (const [nome, { entrelinha }] of Object.entries(TIPOGRAFIA)) {
      if (nome !== "marca") expect(entrelinha, nome).toBeGreaterThanOrEqual(1);
    }
  });

  it("as classes de sempre apontam para a escala", () => {
    const regra = (classe: string) => new RegExp(`\\.${classe}\\s*\\{([^}]*)\\}`).exec(css)![1];
    const pares: [string, string][] = [
      ["titulo-hero", "titulo-1"],
      ["titulo-secao", "titulo-2"],
      ["titulo-cartao", "titulo-cartao"],
      ["texto-guia", "guia"],
      ["rotulo", "rotulo"],
      ["numero-grande", "numero"],
    ];
    for (const [classe, estilo] of pares) {
      expect(regra(classe), classe).toContain(`font-size: var(--text-${estilo});`);
      expect(regra(classe), classe).toContain(`line-height: var(--text-${estilo}--line-height);`);
    }
    expect(regra("rotulo")).toMatch(/text-transform:\s*uppercase/);
    expect(regra("rotulo")).toMatch(/font-family:\s*var\(--font-mono\)/);
  });

  it("os números do case ficam em cor sólida, sem texto em degradê", () => {
    // A cor vem da célula (tinta no papel, papel na célula de tinta do
    // mosaico); o que não pode é degradê nem cor transparente.
    const numero = /\.numero-grande\s*\{([^}]*)\}/.exec(css)![1];
    expect(numero).not.toMatch(/color:\s*transparent/);
    expect(numero).not.toMatch(/background-clip|background-image|transparent/);
    expect(css).not.toMatch(/background-clip:\s*text/);
  });

  it("o corpo do site é o estilo corpo, sobre o papel", () => {
    const corpo = /body\s*\{([^}]*)\}/.exec(css)![1];
    expect(corpo).toContain("font-size: var(--text-corpo);");
    expect(corpo).toContain("background-color: var(--color-fundo);");
    const html = /html\s*\{([^}]*)\}/.exec(css)![1];
    expect(html).toMatch(/color-scheme:\s*light;/);
    expect(html).toContain("background-color: var(--color-fundo);");
    expect(html).toContain("color: var(--color-texto);");
  });
});

describe("espaçamento", () => {
  const doDesign = frente.spacing as Record<string, string>;

  it("os passos são múltiplos de 4 px e são os do DESIGN.md", () => {
    const numericos = Object.entries(doDesign).filter(([nome]) => /^\d+$/.test(nome));
    expect(numericos.map(([, px]) => px)).toEqual(PASSOS_DE_ESPACO.map((px) => `${px}px`));
    for (const [nome, px] of numericos) expect(Number(nome) * 4, nome).toBe(parseInt(px, 10));
  });

  it("o passo do Tailwind dá exatamente esses valores (p-1 = 4 px ... p-24 = 96 px)", () => {
    expect(variavelNoCss(css, "--spacing")).toBe("0.25rem");
  });

  it("os espaços nomeados são os do DESIGN.md e estão no @theme", () => {
    const nomeados = Object.fromEntries(Object.entries(doDesign).filter(([nome]) => !/^\d+$/.test(nome)));
    expect(Object.fromEntries(Object.entries(ESPACOS).map(([n, v]) => [kebab(n), v]))).toEqual(nomeados);
    for (const [nome, valor] of Object.entries(ESPACOS)) {
      expect(variavelNoCss(css, `--spacing-${kebab(nome)}`), nome).toBe(valor);
    }
  });

  it("os espaços fluidos vão do celular (375 px) ao desktop (1440 px) e caem na grade de 4 px", () => {
    for (const [nome, valor] of Object.entries(ESPACOS)) {
      const celular = pxNaLargura(valor, 375);
      const desktop = pxNaLargura(valor, 1440);
      expect(celular.meio, nome).toBeCloseTo(celular.min, 0);
      expect(desktop.meio, nome).toBeCloseTo(desktop.max, 0);
      expect(celular.min % 4, nome).toBe(0);
      expect(desktop.max % 4, nome).toBe(0);
    }
  });
});
