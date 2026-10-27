import { describe, expect, it } from "vitest";
import { textoDoLlms } from "@/app/llms.txt/route";
import { CASE, LINHAS } from "@/conteudo/home";
import { mensalEmTexto, OFERTAS, PLANOS_DE_CONTINUIDADE, precoEmTexto, VALORES_PUBLICOS } from "@/conteudo/ofertas";
import { BRL } from "@/conteudo/precos";
import { METODO } from "@/conteudo/sprint";

/** O `llms.txt` sai do mesmo conteúdo do site: número nunca diverge, e o preço é o da tabela de 27/10/2026. */
describe("llms.txt", () => {
  const texto = textoDoLlms();

  it("traz as quatro soluções com cada pacote e preço, a continuidade e os recursos sem valor", () => {
    for (const o of OFERTAS) {
      expect(texto).toContain(`### [${o.nome}](`);
      for (const p of o.pacotes) expect(texto).toContain(`- ${p.nome}: ${precoEmTexto(p.preco)}`);
    }
    for (const p of PLANOS_DE_CONTINUIDADE) expect(texto).toContain(`- ${p.nome}: ${mensalEmTexto(p.mensal)}`);
    for (const m of METODO) expect(texto).toContain(m.titulo);
    for (const l of LINHAS) expect(texto).toContain(`[${l.titulo}]`);
    const permitidos = VALORES_PUBLICOS.map(BRL);
    for (const v of texto.match(/R\$ \d{1,3}(?:\.\d{3})*/g) ?? []) expect(permitidos, v).toContain(v);
    expect(texto).not.toMatch(/Plano (Presença|Atendimento|Completo)|três Sprints|Sprint Integrada/);
    expect(texto).toContain("Nenhuma solução obriga a comprar outra");
  });

  it("os números do case vêm com a fonte e o período", () => {
    expect(texto).toContain(CASE.fonte);
    for (const n of CASE.numeros) expect(texto).toContain(n.texto);
  });

  it("sem travessão", () => {
    expect(texto).not.toMatch(/[—–]/);
  });
});
