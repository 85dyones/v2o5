import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { URL_DA_GEIST_MONO } from "@/components/layout/FonteMonoTardia";
import { arquivos, ler, RAIZ, semComentarios } from "./fonte";

/**
 * Duas famílias, as duas locais. A Geist (H1, LCP) é pré-carregada e vem de
 * next/font/local; a Geist Mono chega depois do load, por FontFace.
 */

const FONTES = "src/app/fontes.ts";

describe("fontes do site", () => {
  it("nada usa next/font/google", () => {
    for (const arquivo of arquivos("src")) {
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/next\/font\/google/);
    }
  });

  it("fontes.ts declara só a Geist, pré-carregada, de um arquivo do repositório", () => {
    const codigo = semComentarios(ler(FONTES));
    const chamadas = [...codigo.matchAll(/localFont\(\{([\s\S]*?)\}\);/g)].map((m) => m[1]);
    expect(chamadas).toHaveLength(1);
    expect(chamadas[0]).toMatch(/preload:\s*true/);
    expect(chamadas[0]).toMatch(/variable:\s*"--font-geist-sans"/);
    const src = /src:\s*"([^"]+)"/.exec(chamadas[0])![1];
    const arquivo = join(RAIZ, "src/app", src);
    expect(existsSync(arquivo), src).toBe(true);
    // O recorte latino: se voltar a fonte inteira (68 KB), isto fica vermelho.
    expect(statSync(arquivo).size).toBeLessThan(40 * 1024);
  });

  it("a Geist Mono existe em public e o CSS a chama pelo nome", () => {
    const arquivo = join(RAIZ, "public", URL_DA_GEIST_MONO);
    expect(existsSync(arquivo)).toBe(true);
    expect(statSync(arquivo).size).toBeLessThan(40 * 1024);
    expect(ler("src/app/globals.css")).toMatch(/--font-mono:\s*"Geist Mono"/);
  });

  it("o layout raiz aplica a variável da Geist e carrega a Mono tarde", () => {
    const layout = semComentarios(ler("src/app/layout.tsx"));
    expect(layout).toMatch(/className=\{Geist\.variable\}/);
    expect(layout).toMatch(/<FonteMonoTardia \/>/);
    expect(layout).toMatch(/lang="pt-BR"/);
  });

  it("no máximo duas famílias e a licença OFL vai junto", () => {
    const familias = new Set<string>(["Geist"]);
    for (const arquivo of arquivos("src")) {
      for (const m of semComentarios(ler(arquivo)).matchAll(/new FontFace\("([^"]+)"/g)) familias.add(m[1]);
    }
    expect([...familias].sort()).toEqual(["Geist", "Geist Mono"]);
    expect(existsSync(join(RAIZ, "src/app/fonts/OFL-Geist.txt"))).toBe(true);
  });
});
