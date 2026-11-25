import { describe, expect, it } from "vitest";
import { PAGINAS } from "@/conteudo/paginas";
import { contextoDaPagina } from "@/lib/medicao";
import { ler } from "./fonte";

/**
 * As regras de "Modificar evento" do GA4 (docs/handoff-ga4.md, 17/11/2026).
 * O `page_view` da carga completa sai da própria tag, que ignora `config` e
 * `set` da página; quem põe `page_type`, `service_line` e `segment` nele são
 * estas regras, configuradas à mão no GA4. Aqui elas são conferidas contra o
 * mapa do site: toda rota cai em uma regra só, com os valores que o site manda
 * nas trocas de rota. Rota nova sem regra quebra este teste.
 */

interface Regra {
  nome: string;
  expressao: RegExp;
  page_type: string;
  service_line: string;
  segment: string;
}

function regrasDoHandoff(): Regra[] {
  const doc = ler("docs/handoff-ga4.md");
  const inicio = doc.indexOf("| Modificação |");
  expect(inicio, "tabela de regras no handoff").toBeGreaterThan(-1);
  const linhas = doc.slice(inicio).split("\n").slice(2);
  const regras: Regra[] = [];
  for (const linha of linhas) {
    if (!linha.startsWith("|")) break;
    const [nome, expressao, page_type, service_line, segment] = linha
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim().replace(/^`|`$/g, ""));
    regras.push({ nome, expressao: new RegExp(expressao), page_type, service_line, segment });
  }
  return regras;
}

const regras = regrasDoHandoff();
const rotas = PAGINAS.map((p) => p.rota);

function enderecos(rota: string): string[] {
  const caminho = rota === "/" ? "" : rota;
  return [
    `https://www.v2o5.com.br${caminho}`,
    `https://www.v2o5.com.br${caminho}/`,
    `https://v2o5.com.br${caminho}`,
    `https://www.v2o5.com.br${caminho}?utm_source=google&utm_medium=cpc&gclid=teste`,
    `https://www.v2o5.com.br${caminho}#topo`,
  ];
}

describe("regras de Modificar evento do GA4 (página de entrada)", () => {
  it("são 15, dentro do limite de 50 do GA4, com nomes únicos (25/11/2026: sem Sprint e sem rastreamento)", () => {
    expect(regras).toHaveLength(15);
    expect(new Set(regras.map((r) => r.nome)).size).toBe(regras.length);
  });

  it.each(rotas)("%s cai em uma regra só, com os valores que o site manda", (rota) => {
    const esperado = contextoDaPagina(rota);
    for (const endereco of enderecos(rota)) {
      const casadas = regras.filter((r) => r.expressao.test(endereco));
      expect(casadas.map((r) => r.nome), endereco).toHaveLength(1);
      const [regra] = casadas;
      expect({ page_type: regra.page_type, service_line: regra.service_line, segment: regra.segment }, endereco).toEqual({
        page_type: esperado.page_type,
        service_line: esperado.service_line ?? "",
        segment: esperado.segment ?? "",
      });
    }
  });

  it("toda regra serve a alguma rota do site", () => {
    for (const regra of regras) {
      expect(rotas.some((rota) => enderecos(rota).some((e) => regra.expressao.test(e))), regra.nome).toBe(true);
    }
  });

  it("não pega endereço de fora do site nem caminho parecido", () => {
    for (const endereco of [
      "https://outro.com.br/precos",
      "https://www.v2o5.com.br.exemplo.com/precos",
      "https://www.v2o5.com.br/precos-antigos",
      "https://www.v2o5.com.br/diagnostico-gratis",
      "https://www.v2o5.com.br/cases",
      "https://www.v2o5.com.br/pagina-que-nao-existe",
    ]) {
      expect(regras.filter((r) => r.expressao.test(endereco)).map((r) => r.nome), endereco).toEqual([]);
    }
  });
});
