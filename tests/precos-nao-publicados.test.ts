import { describe, expect, it } from "vitest";
import { textoDoLlms } from "@/app/llms.txt/route";
import * as automotivo from "@/conteudo/automotivo";
import * as case_ from "@/conteudo/case";
import * as diagnostico from "@/conteudo/diagnostico";
import * as home from "@/conteudo/home";
import * as paginas from "@/conteudo/paginas";
import {
  BRL,
  DEGRAUS,
  economiaDoTrafegoJunto,
  FOTOGRAFIA_PARCEIRA,
  LINHAS_DE_PRECO,
  mensalidadeDoCompletoComTrafego,
  OFERTA_DO_COMPLETO,
  PISO_DA_MENSALIDADE,
  PLANOS,
  REGRAS,
  somaDosPlanosSeparados,
} from "@/conteudo/precos";
import * as sobre from "@/conteudo/sobre";
import * as solucoes from "@/conteudo/solucoes";
import { CONTINUIDADE, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { arquivos, ler } from "./fonte";

/**
 * Decisão do Dyones em 25/10/2026: só o Sprint de Eficiência e a recorrência
 * que o acompanha (continuidade mensal) têm valor público. Os planos, o tráfego, os módulos, os serviços e o fotógrafo
 * parceiro de `precos.ts` são dado interno. Este teste varre tudo que o
 * visitante, o Google, os assistentes de IA e o agente do n8n leem e falha se
 * algum desses valores aparecer.
 */

const permitidos = new Set([...SPRINT_DE_PRECOS.niveis, ...CONTINUIDADE.modalidades].flatMap((n) => [n.faixa.de, n.faixa.ate]));

const internos = (() => {
  const v = new Set<number>();
  for (const p of PLANOS) {
    v.add(p.implantacao);
    v.add(p.mensalidade);
  }
  for (const l of LINHAS_DE_PRECO) {
    for (const n of [l.implantacao, l.mensalidade, l.porUso?.valor, ...(l.degraus ?? []).map((d) => d.valor)]) if (n) v.add(n);
  }
  for (const n of [
    DEGRAUS.usuarioExtra,
    DEGRAUS.conversas.valor,
    DEGRAUS.dados.valor,
    OFERTA_DO_COMPLETO.mensalidade,
    PISO_DA_MENSALIDADE,
    REGRAS.margemPorCarro,
    FOTOGRAFIA_PARCEIRA.aPartirDe,
    economiaDoTrafegoJunto(),
    mensalidadeDoCompletoComTrafego(),
    somaDosPlanosSeparados().implantacao,
    somaDosPlanosSeparados().mensalidade,
  ])
    v.add(n);
  return [...v].filter((n) => !permitidos.has(n));
})();

/** `R$ 990` não casa com `R$ 9.900` nem com `R$ 99`: o número tem de acabar ali. */
const aparece = (texto: string, n: number) => new RegExp(`${BRL(n).replace(/[$.]/g, "\\$&")}(?![\\d]|[.,]\\d)`).test(texto.replace(/ /g, " "));

const publicos: Record<string, string> = {
  "conteudo/home": JSON.stringify(home),
  "conteudo/solucoes": JSON.stringify(solucoes),
  "conteudo/automotivo": JSON.stringify(automotivo),
  "conteudo/sobre": JSON.stringify(sobre),
  "conteudo/case": JSON.stringify(case_),
  "conteudo/diagnostico": JSON.stringify(diagnostico),
  "conteudo/paginas": JSON.stringify(paginas),
  "llms.txt": textoDoLlms(),
  "vitrine (subdominios/diagnostico/index.html)": ler("subdominios/diagnostico/index.html"),
  "n8n: lead do diagnóstico": ler("docs/n8n/lead-do-diagnostico.json"),
  "n8n: agente de IA": ler("docs/n8n/agente-da-v2o5.json"),
};
// O código que renderiza as páginas. TabelaDePrecos e ParceiroDeFotografia ficaram sem uso (nenhuma página os importa).
for (const f of [...arquivos("src/app"), ...arquivos("src/components"), ...arquivos("src/lib")]) {
  if (/TabelaDePrecos|ParceiroDeFotografia/.test(f)) continue;
  publicos[f] = ler(f);
}

describe("valores que não são publicados", () => {
  it("há valores internos a vigiar", () => {
    expect(internos.length).toBeGreaterThan(20);
    expect(internos).toContain(8900);
    expect(internos).toContain(990);
    expect(internos).not.toContain(3000);
  });

  it("nenhuma página, dado público, vitrine, llms.txt ou fluxo do n8n traz um valor de plano, tráfego, módulo ou serviço", () => {
    for (const [onde, texto] of Object.entries(publicos)) {
      for (const n of internos) expect(aparece(texto, n), `${onde} traz ${BRL(n)}`).toBe(false);
    }
  });

  it("nenhuma página importa os componentes de preço que ficaram sem uso", () => {
    const codigo = [...arquivos("src/app"), ...arquivos("src/components")].filter((f) => !/TabelaDePrecos|ParceiroDeFotografia/.test(f)).map(ler).join("\n");
    expect(codigo).not.toMatch(/from "@\/components\/precos\/(TabelaDePrecos|ParceiroDeFotografia)"/);
  });

  it("os únicos valores em real nos textos públicos são as faixas do Sprint e da continuidade", () => {
    const aceitos = [...permitidos].map((n) => BRL(n));
    for (const onde of ["conteudo/home", "conteudo/solucoes", "conteudo/automotivo", "conteudo/sobre", "conteudo/paginas", "llms.txt"]) {
      const valores = (publicos[onde].match(/R\$ \d{1,3}(?:\.\d{3})*(?:,\d{2})?/g) ?? []).map((v) => v.replace(/ /g, " "));
      for (const v of valores) expect(aceitos, `${onde}: ${v}`).toContain(v);
    }
  });
});
