import { describe, expect, it } from "vitest";
import config, { CABECALHOS_DE_SEGURANCA, CSP } from "../next.config";

/**
 * Cabeçalhos de segurança (lacuna da Motors, seção 8 do plano). A CSP é sem
 * nonce porque as páginas são estáticas; o resto fica fechado. Quando um
 * domínio de terceiro entrar (GA4, Meta, Turnstile), ele entra aqui junto.
 */

const diretivas = Object.fromEntries(
  CSP.split(";").map((d) => {
    const [nome, ...valores] = d.trim().split(/\s+/);
    return [nome, valores];
  }),
);

describe("Content-Security-Policy", () => {
  it("nada carrega de fora da origem", () => {
    for (const nome of ["default-src", "script-src", "style-src", "font-src", "connect-src"]) {
      expect(diretivas[nome], nome).toContain("'self'");
      expect(diretivas[nome].filter((v: string) => /^https?:/.test(v)), nome).toEqual([]);
    }
  });

  it("fecha iframe, object, base e formulário para fora", () => {
    expect(diretivas["frame-ancestors"]).toEqual(["'none'"]);
    expect(diretivas["object-src"]).toEqual(["'none'"]);
    expect(diretivas["base-uri"]).toEqual(["'self'"]);
    expect(diretivas["form-action"]).toEqual(["'self'"]);
  });

  it("fora do desenvolvimento não libera eval", () => {
    expect(process.env.NODE_ENV).not.toBe("development");
    expect(diretivas["script-src"]).not.toContain("'unsafe-eval'");
  });
});

describe("cabeçalhos em todas as rotas", () => {
  it("o conjunto completo vale para qualquer caminho", async () => {
    const regras = await config.headers!();
    expect(regras).toHaveLength(1);
    expect(regras[0].source).toBe("/(.*)");
    const nomes = regras[0].headers.map((h) => h.key);
    for (const nome of [
      "Content-Security-Policy",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "X-Frame-Options",
      "Permissions-Policy",
      "Strict-Transport-Security",
    ]) {
      expect(nomes, nome).toContain(nome);
    }
    expect(CABECALHOS_DE_SEGURANCA.find((h) => h.key === "Strict-Transport-Security")!.value).not.toMatch(/preload/);
  });

  it("não anuncia o framework", () => {
    expect(config.poweredByHeader).toBe(false);
  });
});
