import { describe, expect, it } from "vitest";
import { textoDoLlms } from "@/app/llms.txt/route";
import * as automotivo from "@/conteudo/automotivo";
import * as case_ from "@/conteudo/case";
import * as diagnostico from "@/conteudo/diagnostico";
import * as home from "@/conteudo/home";
import * as ofertas from "@/conteudo/ofertas";
import * as paginas from "@/conteudo/paginas";
import * as sobre from "@/conteudo/sobre";
import * as solucoes from "@/conteudo/solucoes";
import * as sprint from "@/conteudo/sprint";
import { BRL } from "@/conteudo/precos";
import { grafoDaContinuidade, grafoDaHome, grafoDaSolucao, grafoDoHubAutomotivo, grafoDosPrecos } from "@/lib/schema";
import { arquivos, ler } from "./fonte";

/**
 * Decisão de 27/10/2026: todo valor em real que o visitante, o Google, os
 * assistentes de IA e o agente do n8n leem sai de `ofertas.ts` ou de
 * `sprint.ts`. Este teste varre tudo isso e só aceita valores dessa lista
 * (antes, de 25/10 a 26/10, o teste proibia o cardápio interno; o cardápio
 * saiu do código). Vale para texto, schema, vitrine e fluxos do n8n.
 */

const { VALORES_PUBLICOS } = ofertas;
const aceitos = new Set(VALORES_PUBLICOS.map(BRL));

/** "R$ 2.900", "R$ 49,90": o que parece preço no texto. */
const valoresEm = (texto: string) => (texto.replace(/ /g, " ").match(/R\$ ?\d{1,3}(?:\.\d{3})*(?:,\d{2})?/g) ?? []).map((v) => v.replace(/R\$ ?/, "R$ "));

/** O texto visível de um HTML estático, sem script, estilo e marcação. */
const visivel = (html: string) =>
  html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

const publicos: Record<string, string> = {
  "conteudo/home": JSON.stringify(home),
  "conteudo/ofertas": JSON.stringify(ofertas),
  "conteudo/sprint": JSON.stringify(sprint),
  "conteudo/solucoes": JSON.stringify(solucoes),
  "conteudo/automotivo": JSON.stringify(automotivo),
  "conteudo/sobre": JSON.stringify(sobre),
  "conteudo/case": JSON.stringify(case_),
  "conteudo/diagnostico": JSON.stringify(diagnostico),
  "conteudo/paginas": JSON.stringify(paginas),
  "llms.txt": textoDoLlms(),
  "vitrine (subdominios/diagnostico/index.html)": visivel(ler("subdominios/diagnostico/index.html")),
  "n8n: lead do diagnóstico": ler("docs/n8n/lead-do-diagnostico.json"),
  "n8n: agente de IA": ler("docs/n8n/agente-da-v2o5.json"),
};
for (const f of [...arquivos("src/app"), ...arquivos("src/components"), ...arquivos("src/lib")]) publicos[f] = ler(f);

describe("preços públicos", () => {
  it("a lista de permitidos é a tabela de 27/10/2026", () => {
    expect(VALORES_PUBLICOS).toEqual([349, 390, 490, 590, 790, 890, 990, 1490, 1990, 2400, 2900, 3900, 4900, 5900, 6900, 7900, 9900, 11900, 12900]);
  });

  it("nenhum texto público, código de página, vitrine, llms.txt ou fluxo do n8n traz valor fora da tabela", () => {
    for (const [onde, texto] of Object.entries(publicos)) {
      for (const v of valoresEm(texto)) expect(aceitos.has(v), `${onde} traz ${v}`).toBe(true);
    }
  });

  it("o código das páginas não digita preço: os valores chegam de ofertas.ts e sprint.ts", () => {
    for (const f of [...arquivos("src/app"), ...arquivos("src/components"), ...arquivos("src/lib")]) {
      expect(valoresEm(ler(f)), f).toEqual([]);
    }
  });

  it("o schema publica só valores da tabela", () => {
    const grafos = [grafoDaHome(), grafoDosPrecos(), grafoDaContinuidade(), grafoDoHubAutomotivo(), ...solucoes.SOLUCOES.map((s) => grafoDaSolucao(s.rota))];
    const numeros = JSON.stringify(grafos).match(/"(?:price|minPrice|maxPrice)":\d+/g) ?? [];
    expect(numeros.length).toBeGreaterThan(20);
    for (const n of numeros) expect(VALORES_PUBLICOS, n).toContain(Number(n.split(":")[1]));
  });

  it("o cardápio de 15/10, as faixas de 25/10 e as mensalidades de entrada da manhã de 27/10 saíram de tudo que é público", () => {
    const todos = Object.values(publicos).join("\n");
    for (const velho of ["R$ 8.900", "R$ 14.900", "R$ 1.590", "R$ 2.290", "R$ 1.699", "R$ 3.000", "R$ 6.000", "R$ 12.000", "R$ 1.200", "R$ 5.000", "R$ 49,90", "R$ 690", "R$ 249", "R$ 290"]) {
      expect(todos, velho).not.toContain(velho);
    }
    expect(todos).not.toMatch(/sob consulta|por tempo limitado/i);
  });
});
