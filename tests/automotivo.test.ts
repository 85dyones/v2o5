import { describe, expect, it } from "vitest";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { CASE } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { BRL, linhaDePreco, mensalidadeDoCompletoComTrafego, OFERTA_DO_COMPLETO, plano } from "@/conteudo/precos";
import { grafoDoHubAutomotivo, servicoAutomotivo } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * O hub automotivo só publica preço de `precos.ts` (o plano Completo e os
 * módulos de revenda) e número de `CASE` (lido
 * do banco da Motors, com fonte e período). Sobre o agente, não afirma que
 * roda na Motors (pendência 13).
 */

const oferta = ler("memory/context/oferta.md");
const texto = JSON.stringify(HUB_AUTOMOTIVO);
const pagina = semComentarios(ler("src/app/segmentos/revendas-de-veiculos/page.tsx"));

describe("hub automotivo", () => {
  it("está pronto e indexável, com serviço, ofertas e perguntas no schema", () => {
    expect(paginaDa(HUB_AUTOMOTIVO.rota).pronta).toBe(true);
    const grafo = grafoDoHubAutomotivo() as { "@graph": { "@type"?: string; "@id"?: string }[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Service", "FAQPage"]);
    const servico = servicoAutomotivo() as { offers: { price: number; description: string }[] };
    expect(servico.offers.map((o) => o.price)).toEqual([
      plano("completo").implantacao,
      OFERTA_DO_COMPLETO.mensalidade,
      plano("completo").mensalidade,
      mensalidadeDoCompletoComTrafego(),
    ]);
    for (const o of servico.offers) expect(o.description).toMatch(/a partir de/);
    const faq = grafo["@graph"][3] as { mainEntity: { name: string }[] };
    expect(faq.mainEntity.map((p) => p.name)).toEqual(HUB_AUTOMOTIVO.perguntas.map((p) => p.pergunta));
  });

  it("todo valor em real está na tabela de oferta.md", () => {
    const valores = texto.match(/R\$ \d{1,3}(?:\.\d{3})*/g) ?? [];
    expect(valores.length).toBeGreaterThan(3);
    for (const v of valores) expect(oferta, v).toContain(v);
    expect(HUB_AUTOMOTIVO.fatos[0].valor).toContain(BRL(plano("completo").implantacao));
    expect(HUB_AUTOMOTIVO.fatos[0].valor).toContain(BRL(OFERTA_DO_COMPLETO.mensalidade));
    const extras = HUB_AUTOMOTIVO.extras.itens.map((i) => i.nome);
    expect(extras.slice(0, 2), "consulta e repasse só no hub").toEqual([linhaDePreco("consulta").nome, linhaDePreco("repasse").nome]);
    expect(JSON.stringify(HUB_AUTOMOTIVO.extras)).toContain(BRL(linhaDePreco("trafegoNoCompleto").mensalidade!));
    expect(JSON.stringify(HUB_AUTOMOTIVO)).toContain("R$ 49,90 por placa");
  });

  it("os números são os do case, com a mesma fonte e período", () => {
    expect(HUB_AUTOMOTIVO.case.numeros).toBe(CASE.numeros);
    expect(HUB_AUTOMOTIVO.case.fonte).toBe(CASE.fonte);
    expect(pagina).toContain("{h.case.fonte}");
    expect(pagina).toContain("<CompletoParaRevendas />");
  });

  it("não afirma que o agente roda na Motors e não promete resultado sem medir", () => {
    expect(HUB_AUTOMOTIVO.pacote.texto).toMatch(/o agente de IA no WhatsApp completa o sistema/);
    expect(texto).not.toMatch(/agente (de IA )?(da|na) Motors/i);
    expect(texto).not.toMatch(/\d+%|\d+x /);
    expect(texto).not.toMatch(/ainda não|em breve|vai aumentar|garantimos/i);
  });

  it("o resumo fica curto para o H1 continuar sendo o LCP", () => {
    expect(HUB_AUTOMOTIVO.resumo.length).toBeLessThanOrEqual(140);
  });

  it("sem travessão e sem tríade de efeito", () => {
    expect(texto).not.toMatch(/[—–]/);
    expect(texto).not.toMatch(/não é [^.]{3,40}, é /);
  });
});
