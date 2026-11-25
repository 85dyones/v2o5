import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, LINHAS, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { SOLUCOES, solucaoDa } from "@/conteudo/solucoes";
import { grafoDaSolucao, servicoDaSolucao } from "@/lib/schema";
import { ofertaDa, precoEmTexto } from "@/conteudo/ofertas";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ler, RAIZ, semComentarios } from "./fonte";

/**
 * As páginas montadas pelo molde (27/10/2026; desde 25/11/2026, as três
 * soluções, com o Atendimento com IA na página do agente, e as duas de
 * recurso): as soluções com os pacotes de `ofertas.ts`, as de recurso sem
 * valor público. Número
 * só do case (por referência) ou da evidência citada com fonte, resumo curto
 * (o LCP é o H1), FAQ igual ao schema e texto sem marcas de IA.
 */

const DAS_SOLUCOES = ["/presenca-digital-local", "/criacao-de-sites", "/agente-de-ia-para-whatsapp"];
const DE_RECURSO = ["/automacao-com-ia", "/crm-com-whatsapp"];
const ROTAS = [...DAS_SOLUCOES, ...DE_RECURSO];
const numerosDoCase = [...CASE.numeros, ...CASE_MOTORS.numeros.itens, ...CASE_MOTORS.atendimento.numeros];

describe("páginas de solução", () => {
  it("são as três soluções e as duas de recurso, prontas, indexáveis e montadas pelo molde; Sprint e rastreamento não existem mais", () => {
    expect(SOLUCOES.map((s) => s.rota).sort()).toEqual([...ROTAS].sort());
    for (const rota of ROTAS) {
      expect(paginaDa(rota).pronta, rota).toBe(true);
      // A de sites perdeu o Site Automotivo Integrado em 17/11/2026; as outras mudaram com o foco em pequenos negócios, em 25/11/2026.
      const data = rota === "/criacao-de-sites" ? "2026-11-17" : "2026-11-25";
      expect(paginaDa(rota).atualizadaEm, rota).toBe(data);
      const pagina = semComentarios(ler(`src/app${rota}/page.tsx`));
      expect(pagina, rota).toContain("<PaginaDeSolucao rota={ROTA}");
      expect(pagina, rota).not.toContain("PaginaProvisoria");
    }
    expect(semComentarios(ler("src/app/agente-de-ia-para-whatsapp/page.tsx"))).toContain("<Orquestrador />");
    expect(semComentarios(ler("src/app/automacao-com-ia/page.tsx"))).not.toContain("ComoSeLiga");
    for (const saiu of ["sprint-de-eficiencia", "rastreamento-de-conversoes"]) expect(existsSync(join(RAIZ, "src/app", saiu)), saiu).toBe(false);
  });

  it("cada solução mostra os pacotes de ofertas.ts e cita preço só da tabela", () => {
    for (const rota of DAS_SOLUCOES) {
      const s = solucaoDa(rota);
      expect(s.oferta, rota).toBeDefined();
      const o = ofertaDa(s.oferta!);
      expect(o.rota, rota).toBe(rota);
      expect(s.naSolucao, rota).toBeUndefined();
      // A resposta de preço do FAQ lista todos os pacotes com o preço da tabela.
      const custo = s.perguntas.find((p) => /Quanto custa/.test(p.pergunta))?.resposta ?? "";
      for (const p of o.pacotes) expect(custo, `${rota}: ${p.nome}`).toContain(`${p.nome}, ${precoEmTexto(p.preco)}`);
      expect(JSON.stringify(s), rota).not.toMatch(/fidelidade|plano Presença|plano Completo/i);
    }
  });

  it("nenhuma página de recurso publica valor: cada uma diz como a linha entra no Atendimento com IA", () => {
    for (const s of SOLUCOES.filter((x) => DE_RECURSO.includes(x.rota))) {
      const texto = JSON.stringify(s);
      expect(texto, s.rota).not.toMatch(/R\$|mensalidade|a partir de|fidelidade|plano |Sprint/i);
      expect(s.fatos[0].rotulo, s.rota).toBe("Na solução");
      expect(s.naSolucao?.length ?? 0, s.rota).toBeGreaterThan(80);
      expect(s.naSolucao, s.rota).toMatch(/Atendimento com IA/);
      expect(s.oferta, s.rota).toBeUndefined();
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
    // O Ney roda na Motors desde 21/10/2026: a página do agente cita a loja só com os números dele (17/11/2026).
    expect(solucaoDa("/agente-de-ia-para-whatsapp").naMotors?.numeros).toEqual([
      CASE_MOTORS.atendimento.numeros[1],
      CASE_MOTORS.atendimento.numeros[2],
    ]);
    expect(JSON.stringify(solucaoDa("/agente-de-ia-para-whatsapp"))).not.toMatch(/Chatwoot|DeepSeek|Haiku|Claude/);
    expect(solucaoDa("/agente-de-ia-para-whatsapp").naMotors?.fonte).toBe(CASE_MOTORS.atendimento.fonte);
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP, e o H1 é a busca-alvo em frase", () => {
    for (const s of SOLUCOES) {
      expect(s.resumo.length, s.rota).toBeLessThanOrEqual(140);
      expect(s.titulo, s.rota).toMatch(/\.$/);
      expect(s.titulo.length, s.rota).toBeGreaterThanOrEqual(30);
    }
  });

  it("cada página tem pelo menos quatro perguntas, e o schema traz serviço (com o catálogo só nas soluções) e as mesmas perguntas", () => {
    for (const s of SOLUCOES) {
      expect(s.perguntas.length, s.rota).toBeGreaterThanOrEqual(4);
      const grafo = grafoDaSolucao(s.rota) as { "@graph": ({ "@type"?: string; mainEntity?: { name: string }[] })[] };
      expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Service", "FAQPage"]);
      expect(grafo["@graph"][3].mainEntity?.map((p) => p.name)).toEqual(s.perguntas.map((p) => p.pergunta));
      expect(servicoDaSolucao(s.rota)).not.toHaveProperty("offers");
      if (s.oferta) expect(servicoDaSolucao(s.rota)).toHaveProperty("hasOfferCatalog");
      else expect(servicoDaSolucao(s.rota)).not.toHaveProperty("hasOfferCatalog");
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
