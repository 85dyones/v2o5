import { describe, expect, it } from "vitest";
import { lerHex, razaoDeContraste } from "@/lib/contraste";
import { CORES, type NomeDaCor } from "@/lib/tokens";
import { ler } from "./fonte";

/**
 * As cores da marca valem em dois lugares (lib/tokens.ts e o @theme do
 * globals.css) e cada par de texto usado na home passa no AA (4,5:1).
 * Peça gráfica (ponto de etapa, traço do diagrama) passa em 3:1.
 */

const kebab = (nome: string) => nome.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
const css = ler("src/app/globals.css");

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

  it("confere os números da tabela de marca.md", () => {
    expect(razaoDeContraste(CORES.papel, CORES.tinta)).toBeCloseTo(16.3, 1);
    expect(razaoDeContraste(CORES.ambar, CORES.tinta)).toBeCloseTo(8.9, 1);
    expect(razaoDeContraste(CORES.secundarioEscuro, CORES.tinta)).toBeCloseTo(8.1, 1);
  });
});

describe("tokens.ts e globals.css dizem a mesma coisa", () => {
  const nomeNoCss: Partial<Record<NomeDaCor, string>> = { secundarioEscuro: "secundario" };

  it("cada cor de tokens.ts está no @theme com o mesmo valor", () => {
    for (const [nome, hex] of Object.entries(CORES) as [NomeDaCor, string][]) {
      const variavel = `--color-${nomeNoCss[nome] ?? kebab(nome)}`;
      const m = new RegExp(`${variavel}:\\s*(#[0-9a-fA-F]{6});`).exec(css);
      expect(m, `${variavel} ausente do globals.css`).not.toBeNull();
      expect(m![1].toUpperCase(), variavel).toBe(hex.toUpperCase());
    }
  });

  it("o @theme não tem cor hexadecimal fora de tokens.ts", () => {
    const noCss = [...css.matchAll(/--color-([a-z-]+):\s*#[0-9a-fA-F]{6};/g)].map((m) => m[1]);
    const conhecidas = new Set(
      (Object.keys(CORES) as NomeDaCor[]).map((n) => nomeNoCss[n] ?? kebab(n)),
    );
    for (const nome of noCss) expect(conhecidas.has(nome), `--color-${nome} sem par em tokens.ts`).toBe(true);
  });
});

describe("pares de uso passam no AA", () => {
  const texto: [string, NomeDaCor, NomeDaCor][] = [
    ["texto principal na tinta", "papel", "tinta"],
    ["texto principal no cartão", "papel", "superficie"],
    ["texto principal no grafite (balão, chip)", "papel", "grafite"],
    ["texto secundário na tinta", "secundarioEscuro", "tinta"],
    ["texto secundário no cartão", "secundarioEscuro", "superficie"],
    ["texto secundário no grafite", "secundarioEscuro", "grafite"],
    ["âmbar como texto na tinta (o IA da assinatura)", "ambar", "tinta"],
    ["botão primário", "tinta", "ambar"],
    ["botão primário sob o cursor", "tinta", "ambarForte"],
    ["etiqueta verde e balão do agente", "papel", "verde"],
    ["etiqueta violeta", "papel", "violeta"],
    ["etiqueta azul", "papel", "azul"],
  ];

  it.each(texto)("%s", (_, frente, fundo) => {
    expect(razaoDeContraste(CORES[frente], CORES[fundo])!).toBeGreaterThanOrEqual(4.5);
  });

  it("as versões claras das etapas servem de traço e ponto sobre a tinta (3:1)", () => {
    for (const cor of ["violetaClaro", "verdeClaro", "azulClaro", "ambar"] as const) {
      expect(razaoDeContraste(CORES[cor], CORES.tinta)!, cor).toBeGreaterThanOrEqual(3);
      expect(razaoDeContraste(CORES[cor], CORES.superficie)!, cor).toBeGreaterThanOrEqual(3);
    }
  });

  it("as cores de etapa puras não servem de texto sobre a tinta (por isso existem as claras)", () => {
    for (const cor of ["violeta", "verde", "azul"] as const) {
      expect(razaoDeContraste(CORES[cor], CORES.tinta)!, cor).toBeLessThan(4.5);
    }
  });
});
