import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import config, { REDIRECIONAMENTOS_DO_WORDPRESS } from "../next.config";
import { ler, RAIZ } from "./fonte";

/**
 * Os endereços do WordPress atual (`memory/context/seo.md`) continuam
 * levando a algum lugar: 301 para o destino novo, 410 para o que saiu de vez.
 */

const seo = ler("memory/context/seo.md");
const linha = seo.split("\n").find((l) => l.includes("`/jornada/`→`/sobre`"))!;
const pares = [...linha.matchAll(/`([^`]+)`→`([^`]+)`/g)].map((m) => [m[1], m[2]]);
const tira = (r: string) => (r.length > 1 ? r.replace(/\/$/, "") : r);

describe("redirecionamentos do WordPress", () => {
  it("leu a lista de seo.md", () => {
    expect(pares.length).toBeGreaterThanOrEqual(6);
  });

  it("cada par de seo.md tem um 301 igual", async () => {
    const regras = await config.redirects!();
    for (const regra of regras) expect(regra.statusCode, regra.source).toBe(301);
    const mapa = new Map(REDIRECIONAMENTOS_DO_WORDPRESS.map((r) => [r.source, r.destination]));
    // O curinga `/wp-sitemap*.xml` tem teste próprio, logo abaixo.
    for (const [de, para] of pares.filter(([de]) => !de.includes("*"))) {
      expect(mapa.get(tira(de)), `${de} → ${para}`).toBe(tira(para));
    }
  });

  it("os feeds e os sitemaps do WordPress vão para o sitemap novo", () => {
    const regra = REDIRECIONAMENTOS_DO_WORDPRESS.find((r) => r.source.includes("wp-sitemap"))!;
    const padrao = new RegExp(`^/${/\((.*)\)/.exec(regra.source)![1]}$`);
    for (const nome of ["/wp-sitemap.xml", "/wp-sitemap-posts-post-1.xml", "/wp-sitemap-users-1.xml"]) {
      expect(padrao.test(nome), nome).toBe(true);
    }
    expect(padrao.test("/sitemap.xml")).toBe(false);
    for (const de of ["/feed", "/comments/feed"]) {
      expect(REDIRECIONAMENTOS_DO_WORDPRESS.find((r) => r.source === de)?.destination).toBe("/sitemap.xml");
    }
  });

  it("os posts de exemplo respondem 410", async () => {
    for (const rota of ["hello-world", "test-post"]) {
      const arquivo = join(RAIZ, "src/app", rota, "route.ts");
      expect(existsSync(arquivo), rota).toBe(true);
      const { GET } = await import(`../src/app/${rota}/route`);
      expect((GET() as Response).status, rota).toBe(410);
    }
  });

  it("todo destino é uma página do mapa ou o sitemap", async () => {
    const { PAGINAS } = await import("@/conteudo/paginas");
    const rotas = new Set([...PAGINAS.map((p) => p.rota), "/sitemap.xml"]);
    for (const r of REDIRECIONAMENTOS_DO_WORDPRESS) expect(rotas.has(r.destination), r.destination).toBe(true);
  });
});
