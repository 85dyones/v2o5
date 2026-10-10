import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { SITE_URL } from "@/lib/site";

/**
 * Um grupo só, para todos os robôs (robôs de IA inclusive). Na Motors, o
 * grupo próprio de IA abriu o que o geral fechava: um robô obedece só ao
 * grupo mais específico que casa com ele.
 */
describe("robots.txt", () => {
  const r = robots();
  const regras = Array.isArray(r.rules) ? r.rules : [r.rules];

  it("tem um grupo só, para todos", () => {
    expect(regras).toHaveLength(1);
    expect(regras[0].userAgent).toBe("*");
  });

  it("fecha a API e aponta o sitemap", () => {
    expect(regras[0].disallow).toContain("/api/");
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
