import { describe, expect, it } from "vitest";
import { textoDoLlms } from "@/app/llms.txt/route";
import { CASE, LINHAS } from "@/conteudo/home";

/** O `llms.txt` sai do mesmo conteúdo da home: preço e número nunca divergem. */
describe("llms.txt", () => {
  const texto = textoDoLlms();

  it("tem cada linha com o preço do site", () => {
    for (const l of LINHAS) expect(texto).toContain(l.preco);
  });

  it("os números do case vêm com a fonte e o período", () => {
    expect(texto).toContain(CASE.fonte);
    for (const n of CASE.numeros) expect(texto).toContain(n.texto);
  });

  it("sem travessão", () => {
    expect(texto).not.toMatch(/[—–]/);
  });
});
