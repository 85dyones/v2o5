import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, LINHAS, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { ofertaDaCapacidade, precoDa } from "@/conteudo/precos";
import { SOLUCOES, solucaoDa } from "@/conteudo/solucoes";
import { grafoDaSolucao, servicoDaSolucao } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * As cinco páginas de solução: prontas e indexáveis, com preço só da
 * tabela, número só do case (por referência) ou da evidência citada com
 * fonte, resumo curto (o LCP é o H1), FAQ igual ao schema e texto sem
 * marcas de IA.
 */

const oferta = ler("memory/context/oferta.md");
const ROTAS = [
  "/criacao-de-sites",
  "/agente-de-ia-para-whatsapp",
  "/automacao-com-ia",
  "/crm-com-whatsapp",
  "/rastreamento-de-conversoes",
];
const numerosDoCase = [...CASE.numeros, ...CASE_MOTORS.numeros.itens];

describe("páginas de solução", () => {
  it("são as cinco da fase 1, prontas, indexáveis e montadas pelo molde", () => {
    expect(SOLUCOES.map((s) => s.rota).sort()).toEqual([...ROTAS].sort());
    for (const rota of ROTAS) {
      expect(paginaDa(rota).pronta, rota).toBe(true);
      expect(paginaDa(rota).atualizadaEm, rota).toBe("2026-10-13");
      const pagina = semComentarios(ler(`src/app${rota}/page.tsx`));
      expect(pagina, rota).toContain("<PaginaDeSolucao rota={ROTA}");
      expect(pagina, rota).not.toContain("PaginaProvisoria");
    }
    expect(semComentarios(ler("src/app/agente-de-ia-para-whatsapp/page.tsx"))).toContain("<Orquestrador />");
    expect(semComentarios(ler("src/app/automacao-com-ia/page.tsx"))).toContain("<ComoSeLiga />");
    expect(semComentarios(ler("src/app/rastreamento-de-conversoes/page.tsx"))).toContain("<OQueRegistramosSecao />");
  });

  it("o preço de cada página é o da tabela, e todo valor em real está em oferta.md", () => {
    for (const s of SOLUCOES) {
      expect(s.fatos[0].valor, s.rota).toBe(precoDa(s.linha));
      const valores = JSON.stringify(s).match(/R\$ \d{1,3}(?:\.\d{3})*/g) ?? [];
      expect(valores.length, s.rota).toBeGreaterThan(0);
      for (const v of valores) expect(oferta, `${s.rota}: ${v}`).toContain(v);
    }
  });

  it("número do case só por referência, e número de estudo só com fonte e link", () => {
    for (const s of SOLUCOES) {
      for (const n of s.naMotors?.numeros ?? []) expect(numerosDoCase, `${s.rota}: ${n.texto}`).toContain(n);
      if (/\d/.test(s.problema.texto)) {
        expect(s.problema.fonte, s.rota).toBe(VISAO_360.evidencia.fonte);
        expect(s.problema.href, s.rota).toBe(VISAO_360.evidencia.href);
      }
    }
    expect(solucaoDa("/agente-de-ia-para-whatsapp").naMotors).toBeUndefined();
    expect(JSON.stringify(solucaoDa("/agente-de-ia-para-whatsapp"))).not.toMatch(/Motors/);
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP, e o H1 é a busca-alvo em frase", () => {
    for (const s of SOLUCOES) {
      expect(s.resumo.length, s.rota).toBeLessThanOrEqual(140);
      expect(s.titulo, s.rota).toMatch(/\.$/);
      expect(s.titulo.length, s.rota).toBeGreaterThanOrEqual(30);
    }
  });

  it("cada página tem pelo menos quatro perguntas, e o schema traz serviço, ofertas e as mesmas perguntas", () => {
    for (const s of SOLUCOES) {
      expect(s.perguntas.length, s.rota).toBeGreaterThanOrEqual(4);
      const grafo = grafoDaSolucao(s.rota) as { "@graph": ({ "@type"?: string; mainEntity?: { name: string }[] })[] };
      expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Service", "FAQPage"]);
      expect(grafo["@graph"][3].mainEntity?.map((p) => p.name)).toEqual(s.perguntas.map((p) => p.pergunta));
      const l = ofertaDaCapacidade(s.linha);
      const servico = servicoDaSolucao(s.rota) as { offers: { price: number }[] };
      expect(servico.offers.map((o) => o.price)).toEqual([l.implantacao, l.mensalidade].filter(Boolean));
    }
  });

  it("as linhas relacionadas existem na home e não repetem a própria", () => {
    for (const s of SOLUCOES) {
      expect(s.relacionadas, s.rota).toHaveLength(3);
      for (const id of s.relacionadas) {
        expect(LINHAS.map((l) => l.linha), `${s.rota}: ${id}`).toContain(id);
        expect(id).not.toBe(s.linha);
      }
    }
  });

  it("sem travessão, sem tríade de efeito e sem promessa de resultado", () => {
    const texto = JSON.stringify(SOLUCOES);
    expect(texto).not.toMatch(/[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
    expect(texto).not.toMatch(/garantimos|dobra|triplica|\d+% (a mais|de aumento)|em breve/i);
  });
});
