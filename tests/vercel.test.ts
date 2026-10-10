import { describe, expect, it } from "vitest";
import { ler } from "./fonte";

/**
 * O projeto `v2o5` da Vercel nasceu quando o repo ainda não tinha código, e
 * o preview publicava os arquivos sem compilar o Next (a página inicial dava
 * 404). O `vercel.json` fixa o framework no repositório, sem depender do
 * que estiver no painel.
 */
describe("vercel.json", () => {
  const config = JSON.parse(ler("vercel.json"));

  it("declara Next.js com os comandos do projeto", () => {
    expect(config.framework).toBe("nextjs");
    expect(config.installCommand).toBe("npm ci");
    expect(config.buildCommand).toBe("npm run build");
    expect(config.outputDirectory).toBe(".next");
  });
});
