import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE, LINHAS, VISAO_360 } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { SOLUCOES, solucaoDa } from "@/conteudo/solucoes";
import { grafoDaSolucao, servicoDaSolucao } from "@/lib/schema";
import { ofertaDa, precoEmTexto } from "@/conteudo/ofertas";
import { ler, semComentarios } from "./fonte";

/**
 * As páginas montadas pelo molde (27/10/2026): as quatro soluções, com os
 * pacotes de `ofertas.ts`, e as quatro de recurso, sem valor público. Número
 * só do case (por referência) ou da evidência citada com fonte, resumo curto
 * (o LCP é o H1), FAQ igual ao schema e texto sem marcas de IA.
 */

const DAS_SOLUCOES = ["/branding-e-identidade", "/presenca-digital-local", "/criacao-de-sites", "/sprint-de-eficiencia"];
const DE_RECURSO = ["/agente-de-ia-para-whatsapp", "/automacao-com-ia", "/crm-com-whatsapp", "/rastreamento-de-conversoes"];
const ROTAS = [...DAS_SOLUCOES, ...DE_RECURSO];
const numerosDoCase = [...CASE.numeros, ...CASE_MOTORS.numeros.itens];

describe("páginas de solução", () => {
  it("são as quatro soluções e as quatro de recurso, prontas, indexáveis e montadas pelo molde", () => {
    expect(SOLUCOES.map((s) => s.rota).sort()).toEqual([...ROTAS].sort());
    for (const rota of ROTAS) {
      expect(paginaDa(rota).pronta, rota).toBe(true);
      // As de recurso mudaram em 25/10/2026 (sem mapa em 24 horas, sem valor); as soluções, em 27/10/2026;
      // o agente no WhatsApp ganhou "chatbot" no título em 31/10/2026.
      const data = DAS_SOLUCOES.includes(rota) ? "2026-10-27" : rota === "/agente-de-ia-para-whatsapp" ? "2026-10-31" : "2026-10-25";
      expect(paginaDa(rota).atualizadaEm, rota).toBe(data);
      const pagina = semComentarios(ler(`src/app${rota}/page.tsx`));
      expect(pagina, rota).toContain("<PaginaDeSolucao rota={ROTA}");
      expect(pagina, rota).not.toContain("PaginaProvisoria");
    }
    expect(semComentarios(ler("src/app/agente-de-ia-para-whatsapp/page.tsx"))).toContain("<Orquestrador />");
    expect(semComentarios(ler("src/app/automacao-com-ia/page.tsx"))).toContain("<ComoSeLiga />");
    expect(semComentarios(ler("src/app/rastreamento-de-conversoes/page.tsx"))).toContain("<OQueRegistramosSecao />");
    expect(semComentarios(ler("src/app/sprint-de-eficiencia/page.tsx"))).toContain("<ComoSeLiga />");
  });

  it("cada solução mostra os pacotes de ofertas.ts e cita preço só da tabela", () => {
    for (const rota of DAS_SOLUCOES) {
      const s = solucaoDa(rota);
      expect(s.oferta, rota).toBeDefined();
      const o = ofertaDa(s.oferta!);
      expect(o.rota, rota).toBe(rota);
      expect(s.noSprint, rota).toBeUndefined();
      // A resposta de preço do FAQ lista todos os pacotes com o preço da tabela.
      const custo = s.perguntas.find((p) => /Quanto custa/.test(p.pergunta))?.resposta ?? "";
      for (const p of o.pacotes) expect(custo, `${rota}: ${p.nome}`).toContain(`${p.nome}, ${precoEmTexto(p.preco)}`);
      expect(JSON.stringify(s), rota).not.toMatch(/fidelidade|plano Presença|plano Completo/i);
    }
  });

  it("nenhuma página de recurso publica valor: cada uma diz como a linha entra num Sprint", () => {
    for (const s of SOLUCOES.filter((x) => DE_RECURSO.includes(x.rota))) {
      const texto = JSON.stringify(s);
      expect(texto, s.rota).not.toMatch(/R\$|mensalidade|a partir de|fidelidade|plano /i);
      expect(s.fatos[0].rotulo, s.rota).toBe("No Sprint");
      expect(s.noSprint?.length ?? 0, s.rota).toBeGreaterThan(80);
      expect(s.noSprint, s.rota).toMatch(/Sprint/);
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
