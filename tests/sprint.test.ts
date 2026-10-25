import { describe, expect, it } from "vitest";
import { CONDICOES, CONTINUIDADE, faixaEmTexto, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { ESCADA } from "@/conteudo/home";
import { ler } from "./fonte";

/** `sprint.ts` é a fonte; `memory/context/oferta.md` repete os números aprovados em 25/10/2026. */
const oferta = ler("memory/context/oferta.md");

describe("Sprint de Eficiência", () => {
  it("as faixas do site são as do apêndice aprovado e as da memória", () => {
    expect(SPRINT_DE_PRECOS.niveis.map((n) => faixaEmTexto(n.faixa))).toEqual([
      "R$ 3.000 a R$ 5.000",
      "R$ 6.000 a R$ 12.000",
      "R$ 12.000 a R$ 25.000 ou mais",
    ]);
    for (const n of SPRINT_DE_PRECOS.niveis) expect(oferta).toContain(`${n.nome}${n.principal ? " (oferta principal)" : ""}: ${faixaEmTexto(n.faixa)}`);
    expect(CONTINUIDADE.modalidades.map((m) => faixaEmTexto(m.faixa))).toEqual(["R$ 1.200 a R$ 2.500", "R$ 2.500 a R$ 5.000"]);
    for (const m of CONTINUIDADE.modalidades) expect(oferta).toContain(`${m.nome}: ${faixaEmTexto(m.faixa)} por mês`);
    expect(CONTINUIDADE.texto).toMatch(/Na maioria dos projetos há também uma parte recorrente, e pode haver em todos/);
  });

  it("a oferta principal é uma só e a duração é referência", () => {
    expect(SPRINT_DE_PRECOS.niveis.filter((n) => "principal" in n && n.principal)).toHaveLength(1);
    expect(SPRINT_DE_PRECOS.texto).toMatch(/não promessa/);
  });

  it("sem promessa de resultado, percentual nem travessão", () => {
    const tudo = JSON.stringify({ SPRINT_DE_PRECOS, CONTINUIDADE, CONDICOES, ESCADA });
    expect(tudo).not.toMatch(/[—–]/);
    expect(tudo).not.toMatch(/ROI garantido|garantimos|aumento garantido/i);
    expect(JSON.stringify(SPRINT_DE_PRECOS)).not.toMatch(/\d+ ?%/);
  });

  it("o pagamento é o aprovado", () => {
    expect(CONDICOES.itens[1].texto).toContain("50% na contratação, 30% na validação intermediária e 20% no aceite final");
  });

  it("a página de preços e a home levam à seção", () => {
    expect(ler("src/app/precos/page.tsx")).toContain("<SprintDeEficiencia />");
    expect(ESCADA.degraus.some((d) => "href" in d && d.href === "/precos#titulo-sprint")).toBe(true);
  });
});
