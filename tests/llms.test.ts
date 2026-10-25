import { describe, expect, it } from "vitest";
import { textoDoLlms } from "@/app/llms.txt/route";
import { CASE, LINHAS } from "@/conteudo/home";
import { faixaEmTexto, SPRINT_DE_PRECOS } from "@/conteudo/sprint";

/** O `llms.txt` sai do mesmo conteúdo da home: número nunca diverge, e só o Sprint tem preço (25/10/2026). */
describe("llms.txt", () => {
  const texto = textoDoLlms();

  it("tem cada linha do catálogo, sem valor, e só o Sprint com preço", () => {
    for (const l of LINHAS) expect(texto).toContain(`[${l.titulo}]`);
    for (const n of SPRINT_DE_PRECOS.niveis) expect(texto).toContain(`${n.nome} ${faixaEmTexto(n.faixa)}`);
    const valores = texto.match(/R\$ \d{1,3}(?:\.\d{3})*/g) ?? [];
    const permitidos = SPRINT_DE_PRECOS.niveis.flatMap((n) => [n.faixa.de, n.faixa.ate].map((v) => `R$ ${v.toLocaleString("pt-BR")}`));
    for (const v of valores) expect(permitidos, v).toContain(v);
    expect(texto).not.toMatch(/a partir de R\$|\/mês|Plano (Presença|Atendimento|Completo)/);
    expect(texto).toContain("Só o Sprint tem valor público");
  });

  it("os números do case vêm com a fonte e o período", () => {
    expect(texto).toContain(CASE.fonte);
    for (const n of CASE.numeros) expect(texto).toContain(n.texto);
  });

  it("sem travessão", () => {
    expect(texto).not.toMatch(/[—–]/);
  });
});
