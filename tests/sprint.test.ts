import { describe, expect, it } from "vitest";
import { CONDICOES, CONTINUIDADE, faixaEmTexto, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { ESCADA } from "@/conteudo/home";
import { ler } from "./fonte";

/** `sprint.ts` é a fonte; `memory/context/oferta.md` repete os números aprovados em 25/10/2026. */
const oferta = ler("memory/context/oferta.md");

describe("Sprint de Eficiência", () => {
  it("os Sprints mostram só o valor de partida, sem teto (Dyones, 26/10/2026), e a recorrência segue em faixa", () => {
    expect(SPRINT_DE_PRECOS.niveis.map((n) => faixaEmTexto(n.faixa))).toEqual([
      "a partir de R$ 3.000",
      "a partir de R$ 6.000",
      "a partir de R$ 12.000",
    ]);
    for (const n of SPRINT_DE_PRECOS.niveis) expect(n.faixa, n.nome).not.toHaveProperty("ate");
    // Os tetos de referência ficam só na memória interna.
    for (const teto of ["R$ 3.000 a R$ 5.000", "R$ 6.000 a R$ 12.000", "R$ 12.000 a R$ 25.000 ou mais"]) expect(oferta).toContain(teto);
    for (const n of SPRINT_DE_PRECOS.niveis) expect(oferta).toContain(`${n.nome}${n.principal ? " (oferta principal)" : ""}: ${faixaEmTexto(n.faixa)}`);
    expect(CONTINUIDADE.modalidades.map((m) => faixaEmTexto(m.faixa))).toEqual(["R$ 1.200 a R$ 2.500", "R$ 2.500 a R$ 5.000"]);
    for (const m of CONTINUIDADE.modalidades) expect(oferta).toContain(`${m.nome}: ${faixaEmTexto(m.faixa)} por mês`);
    expect(CONTINUIDADE.texto).toMatch(/Se a solução continua rodando, há uma parte recorrente/);
    expect(CONTINUIDADE.recorrencia.map((r) => r.titulo)).toEqual(["Gestão continuada", "Nuvem", "IA e mensagens"]);
    expect(JSON.stringify(CONTINUIDADE)).toMatch(/A V2O5 gerencia/);
    // Repasse pelo valor do provedor, sem margem anunciada, com teto mensal combinado e aviso (Dyones, 25/10).
    expect(CONTINUIDADE.recorrencia[2].texto).toMatch(/teto mensal combinado e aviso antes de ultrapassá-lo/);
    expect(JSON.stringify(CONTINUIDADE)).not.toMatch(/margem|markup/i);
    // Não detalha de quem são as contas de nuvem e de IA: só fala em recorrência (Dyones, 25/10).
    expect(JSON.stringify(CONTINUIDADE)).not.toMatch(/suas contas|conta do cliente|paga os provedores/i);
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
