import { describe, expect, it } from "vitest";
import config, { CABECALHOS_DE_SEGURANCA, CSP } from "../next.config";
import { COLETA_DE_TERCEIROS, SCRIPTS_DE_TERCEIROS } from "@/lib/terceiros";

/**
 * Cabeçalhos de segurança (lacuna da Motors, seção 8 do plano). A CSP é sem
 * nonce porque as páginas são estáticas; o resto fica fechado. Os únicos
 * domínios de fora são os de `lib/terceiros.ts` (GA4 e Pixel da Meta);
 * Turnstile entra ali quando chegar.
 */

const diretivas = Object.fromEntries(
  CSP.split(";").map((d) => {
    const [nome, ...valores] = d.trim().split(/\s+/);
    return [nome, valores];
  }),
);

describe("Content-Security-Policy", () => {
  it("só os terceiros nomeados carregam de fora da origem", () => {
    const deFora = (nome: string) => diretivas[nome].filter((v: string) => /^https?:/.test(v));
    for (const nome of ["default-src", "script-src", "style-src", "font-src", "connect-src", "img-src"]) {
      expect(diretivas[nome], nome).toContain("'self'");
    }
    for (const nome of ["default-src", "style-src", "font-src"]) expect(deFora(nome), nome).toEqual([]);
    expect(deFora("script-src")).toEqual(SCRIPTS_DE_TERCEIROS);
    expect(deFora("connect-src")).toEqual(COLETA_DE_TERCEIROS);
    expect(deFora("img-src")).toEqual(COLETA_DE_TERCEIROS);
    for (const dominio of [...SCRIPTS_DE_TERCEIROS, ...COLETA_DE_TERCEIROS]) {
      expect(dominio).toMatch(/^https:\/\/[\w*.-]+$/);
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
