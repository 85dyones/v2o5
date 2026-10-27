import { describe, expect, it } from "vitest";
import { CONDICOES, METODO, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { precoEmTexto } from "@/conteudo/precos";
import { CONTINUIDADE } from "@/conteudo/ofertas";
import { ESCADA, SPRINT } from "@/conteudo/home";
import { ler } from "./fonte";

/** `sprint.ts` é a fonte; `memory/context/oferta.md` repete os valores do handoff de 27/10/2026. */
const oferta = ler("memory/context/oferta.md");

describe("Sprint de Eficiência", () => {
  it("os três Sprints têm os valores e os nomes do handoff de 27/10/2026", () => {
    expect(SPRINT_DE_PRECOS.niveis.map((n) => [n.nome, precoEmTexto(n.preco)])).toEqual([
      ["Sprint Essencial", "R$ 3.900"],
      ["Sprint Integrado", "R$ 6.900"],
      ["Sprint Avançado", "a partir de R$ 12.900"],
    ]);
    for (const n of SPRINT_DE_PRECOS.niveis) {
      expect(oferta).toContain(`| ${n.nome} | ${precoEmTexto(n.preco)} | ${n.duracao} |`);
      expect(n.escopo.length, n.nome).toBeGreaterThan(30);
    }
    // Os nomes de 25/10 saíram do texto vigente.
    expect(JSON.stringify(SPRINT_DE_PRECOS)).not.toMatch(/Sprint Integrada|Sprint Avançada/);
  });

  it("o método tem os seis passos do handoff, na home e na página do Sprint", () => {
    expect(METODO.map((m) => m.titulo)).toEqual([
      "Mapear o processo real",
      "Simplificar antes de automatizar",
      "Escolher a intervenção proporcional",
      "Implementar a solução acordada",
      "Comparar antes e depois",
      "Registrar e decidir o próximo passo",
    ]);
    expect(SPRINT.etapas.map((e) => e.titulo)).toEqual(METODO.map((m) => m.titulo));
    for (const e of SPRINT.etapas) expect(e.entregas.length, e.titulo).toBeGreaterThan(0);
  });

  it("a oferta principal é uma só, a duração é referência e a descoberta paga não tem valor", () => {
    expect(SPRINT_DE_PRECOS.niveis.filter((n) => "principal" in n && n.principal)).toHaveLength(1);
    expect(SPRINT_DE_PRECOS.texto).toMatch(/não promessa/);
    expect(SPRINT_DE_PRECOS.descoberta).toMatch(/preço acordado antes da execução/);
    expect(SPRINT_DE_PRECOS.descoberta).not.toMatch(/R\$/);
  });

  it("sem promessa de resultado, percentual nem travessão", () => {
    const tudo = JSON.stringify({ SPRINT_DE_PRECOS, METODO, CONDICOES, ESCADA, CONTINUIDADE });
    expect(tudo).not.toMatch(/[—–]/);
    expect(tudo).not.toMatch(/ROI garantido|garantimos|aumento garantido/i);
    expect(JSON.stringify(SPRINT_DE_PRECOS)).not.toMatch(/\d+ ?%/);
  });

  it("o pagamento é o aprovado", () => {
    expect(CONDICOES.itens[1].texto).toContain("50% na contratação, 30% na validação intermediária e 20% no aceite final");
  });

  it("a página do Sprint, /precos e a home levam aos valores", () => {
    expect(ler("src/app/sprint-de-eficiencia/page.tsx")).toContain("<CondicoesDoSprint />");
    // `#titulo-sprint` segue pousando no Sprint em /precos (vitrine antiga, schema e links de fora).
    expect(ler("src/app/precos/page.tsx")).toContain('"titulo-sprint"');
    expect(ESCADA.degraus.map((d) => ("href" in d ? d.href : undefined))).toEqual([undefined, "/precos", "/continuidade"]);
    expect(ler("src/components/home/Sprint.tsx")).toContain('href="/sprint-de-eficiencia"');
  });
});
