import { describe, expect, it } from "vitest";
import { CASE_MOTORS } from "@/conteudo/case";
import { CASE } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { artigoDoCase, grafoDoCase } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * A página do case só publica número que está na memória do case, lido do
 * banco da Motors, e com fonte e período ao lado. Nada de atendimento ou
 * tempo de resposta até o Chatwoot da Motors ser corrigido
 * (`memory/projects/case-motors.md`).
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
    expect(memoria).toMatch(/\| Leads no funil \| 56 \(44 formulários do site, 12 WhatsApp/);
    expect(memoria).toMatch(/\| Leads do site com `event_id` \| 42 de 44 \(95%\)/);
    expect(memoria).toMatch(/ligados ao veículo \| 38 \/ 37 de 44/);
    expect(memoria).toMatch(/com gclid ou fbclid \| 28 \/ 26 de 44/);
    expect(memoria).toMatch(/\| Desfechos \| 3 ganhos, 10 perdidos, 13 descartados, 30 abertos/);
    expect(memoria).toMatch(/\| Guias publicados \| 26 \|/);
    expect(memoria).toMatch(/\| Estoque sincronizado \| 132 veículos, 46 marcados como vendidos/);
    expect(CASE_MOTORS.numeros.itens.map((n) => `${n.valor}${n.complemento ? ` ${n.complemento}` : ""}`)).toEqual([
      "56",
      "42 de 44",
      "37 de 44",
      "26 de 44",
      "26",
      "132",
    ]);
    expect(CASE_MOTORS.leitura.paragrafos.join(" ")).toMatch(/3 vendas, 10 negócios perdidos, 13 descartados e 30 em aberto/);
    expect(CASE_MOTORS.leitura.paragrafos.join(" ")).toMatch(/95%/);
    expect(CASE_MOTORS.construido.pecas.map((p) => p.titulo)).toContain("26 guias com método próprio");
  });

  it("a fonte e o período aparecem junto dos números, iguais aos da home", () => {
    expect(CASE_MOTORS.numeros.fonte).toBe(CASE.fonte);
    expect(CASE_MOTORS.fatos.map((f) => f.valor).join(" ")).toMatch(/05\/09 a 08\/10\/2026/);
    expect(pagina).toContain("{c.numeros.fonte}");
  });

  it("não fala de atendimento nem de tempo de resposta como resultado", () => {
    const corpo = JSON.stringify({ ...CASE_MOTORS, proximos: undefined });
    expect(corpo).not.toMatch(/tempo de resposta|primeira resposta|respondido em|responde em/i);
    expect(corpo).not.toMatch(/-70%|3\.4x|3,4x/);
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
