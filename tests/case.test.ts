import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { artigoDoCase, grafoDoCase } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * A página do case só publica número que está na memória do case, lido do
 * banco da Motors, e com fonte e período ao lado. O atendimento entra desde
 * 17/11/2026 só pelo Ney, com os números das mensagens gravadas por ele; o
 * Chatwoot saiu do caminho (`memory/projects/case-motors.md`).
 */

const memoria = ler("memory/projects/case-motors.md");
const pagina = semComentarios(ler("src/app/cases/motors-store/page.tsx"));
const textoDoCase = JSON.stringify(CASE_MOTORS);

describe("case Motors Store", () => {
  it("está pronto e indexável, com o artigo assinado pelo fundador no schema", () => {
    expect(paginaDa(CASE_MOTORS.rota).pronta).toBe(true);
    const artigo = artigoDoCase() as { headline: string; author: { "@id": string }; about: { name: string; url: string } };
    expect(artigo.headline).toBe(CASE_MOTORS.titulo);
    expect(artigo.author["@id"]).toContain("/sobre#autor");
    expect(artigo.about).toMatchObject({ name: "Motors Store", url: "https://motorsstore.com.br" });
    const grafo = grafoDoCase() as { "@graph": ({ "@type"?: string } & { "@id"?: string })[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["Person", "BreadcrumbList", "Article"]);
  });

  it("cada número da página existe na memória do case", () => {
    expect(memoria).toMatch(/\| Leads no funil \| 237 \(131 formulários do site, 106 WhatsApp/);
    expect(memoria).toMatch(/\| Leads do site com `event_id` \| 129 de 131 \(98%\)/);
    expect(memoria).toMatch(/ligados ao veículo \| 119 \/ 113 de 131/);
    expect(memoria).toMatch(/com gclid ou fbclid \| 103 \/ 96 de 131/);
    expect(memoria).toMatch(/\| Guias publicados \| 26 \|/);
    expect(memoria).toMatch(/\| Estoque sincronizado \| 148 veículos, 60 marcados como vendidos/);
    // Sem os números de anúncio (identificador da Meta, gclid ou fbclid) desde 25/11/2026.
    expect(CASE_MOTORS.numeros.itens.map((n) => `${n.valor}${n.complemento ? ` ${n.complemento}` : ""}`)).toEqual([
      "237",
      "113 de 131",
      "26",
      "148",
    ]);
    expect(CASE_MOTORS.construido.pecas.map((p) => p.titulo)).toContain("26 guias com método próprio");
  });

  it("a fonte e o período aparecem junto dos números, iguais aos da home", () => {
    expect(CASE_MOTORS.numeros.fonte).toBe(CASE.fonte);
    expect(pagina).toContain("{c.numeros.fonte}");
  });

  it("o Ney: cada número existe na memória do case, com a fonte ao lado (17/11)", () => {
    expect(memoria).toMatch(/\| Clientes atendidos pelo Ney \| 125 /);
    expect(memoria).toMatch(/\| Primeira resposta \| 93 de 100 em até 1 min; mediana 38 s/);
    expect(memoria).toMatch(/\| Leads entregues ao CRM do Revenda Mais \| 37 desde 04\/11/);
    expect(CASE_MOTORS.atendimento.numeros.map((n) => `${n.valor}${n.complemento ? ` ${n.complemento}` : ""}`)).toEqual([
      "125",
      "93 de 100",
      "37",
    ]);
    expect(CASE_MOTORS.atendimento.numeros[1].texto).toMatch(/38 segundos/);
    expect(CASE_MOTORS.atendimento.fonte).toMatch(/17\/11\/2026/);
    expect(pagina).toContain("{c.atendimento.fonte}");
    expect(CASE_MOTORS.atendimento.ficha.nota).toMatch(/ilustrativos/);
  });

  it("o atendimento é o do Ney: sem Chatwoot, sem nome de modelo e sem tempo fora da seção dele", () => {
    expect(textoDoCase).not.toMatch(/Chatwoot/);
    expect(textoDoCase).not.toMatch(/DeepSeek|Haiku|Claude|GPT|OpenAI/i);
    expect(textoDoCase).not.toMatch(/-70%|3\.4x|3,4x/);
    const { atendimento, ...resto } = CASE_MOTORS;
    expect(atendimento.titulo).toMatch(/Ney/);
    expect(JSON.stringify(resto)).not.toMatch(/segundos|tempo de resposta|primeira resposta/i);
  });

  it("só número medido: sem ressalva sobre o que não foi medido e sem promessa de dado futuro (Dyones, 11/10)", () => {
    expect(textoDoCase).not.toMatch(/ainda não|pouco para afirmar|90 dias|entra com|vendas registradas|em aberto|descartad|perdid/i);
    expect(pagina).not.toMatch(/leitura|proximos/);
  });

  it("só usa a marca da Motors com autorização registrada e com o logo do pacote da loja", () => {
    expect(memoria).toMatch(/Autorizado em 08\/10: nome, logo e números/);
    expect(ler("src/components/marca/MarcaMotors.tsx")).toContain('viewBox="0 0 362.849 60.93"');
    expect(pagina).toContain("<MarcaMotors");
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP", () => {
    expect(CASE_MOTORS.resumo.length).toBeLessThanOrEqual(140);
  });

  it("sem travessão e sem tríade de efeito", () => {
    expect(textoDoCase).not.toMatch(/[—–]/);
    expect(textoDoCase).not.toMatch(/não é [^.]{3,40}, é /);
  });
});
