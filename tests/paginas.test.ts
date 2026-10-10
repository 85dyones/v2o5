import { describe, expect, it } from "vitest";
import { metadataDa, PAGINAS } from "@/conteudo/paginas";
import { LINHAS, NAVEGACAO } from "@/conteudo/home";
import sitemap from "@/app/sitemap";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Seção 4.4 do plano: título e descrição únicos por página, canonical por
 * página (nunca no layout), página em construção fora do índice.
 */

const rotaDoArquivo = (arquivo: string) =>
  "/" + arquivo.replace(/^src\/app\/?/, "").replace(/\/?page\.tsx$/, "");

describe("mapa de páginas", () => {
  it("rotas, títulos e descrições únicos", () => {
    for (const campo of ["rota", "titulo", "descricao"] as const) {
      const valores = PAGINAS.map((p) => p[campo]);
      expect(new Set(valores).size, campo).toBe(valores.length);
    }
  });

  it("descrição entre 40 e 160 caracteres", () => {
    for (const p of PAGINAS) {
      expect(p.descricao.length, p.rota).toBeGreaterThanOrEqual(40);
      expect(p.descricao.length, p.rota).toBeLessThanOrEqual(160);
    }
  });

  it("cada page.tsx é uma rota do mapa e usa a metadata dele", () => {
    const paginas = arquivos("src/app", /^page\.tsx$/);
    const rotas = new Set(PAGINAS.map((p) => p.rota));
    for (const arquivo of paginas) {
      const rota = rotaDoArquivo(arquivo);
      expect(rotas.has(rota), `${arquivo} fora do mapa`).toBe(true);
      expect(semComentarios(ler(arquivo)), arquivo).toMatch(/metadataDa\(/);
    }
    expect(paginas.length).toBe(PAGINAS.length);
  });

  it("canonical igual à rota, e nunca no layout raiz", () => {
    for (const p of PAGINAS) expect(metadataDa(p.rota).alternates?.canonical).toBe(p.rota);
    expect(semComentarios(ler("src/app/layout.tsx"))).not.toMatch(/canonical/);
  });

  it("página em construção leva noindex e fica fora do sitemap", () => {
    const noSitemap = new Set(sitemap().map((u) => new URL(u.url).pathname));
    for (const p of PAGINAS) {
      expect(noSitemap.has(p.rota), p.rota).toBe(p.pronta);
      expect(metadataDa(p.rota).robots, p.rota).toEqual(p.pronta ? undefined : { index: false, follow: true });
    }
  });

  it("os links do topo e das linhas apontam para páginas do mapa", () => {
    const rotas = new Set(PAGINAS.map((p) => p.rota));
    for (const { href } of [...NAVEGACAO, ...LINHAS]) {
      const caminho = href.split("#")[0] || "/";
      expect(rotas.has(caminho), href).toBe(true);
    }
  });
});
