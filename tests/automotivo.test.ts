import { describe, expect, it } from "vitest";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { CASE } from "@/conteudo/home";
import { paginaDa } from "@/conteudo/paginas";
import { grafoDoHubAutomotivo, servicoAutomotivo } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * O hub automotivo não publica valor (só o Sprint tem preço, desde
 * 25/10/2026) e só publica número de `CASE` (lido do banco da Motors, com
 * fonte e período). Sobre o agente, não afirma que roda na Motors
 * (pendência 13). A área de repasse não é produto da V2O5 (`V2O5_CORE.md`).
 */

const texto = JSON.stringify(HUB_AUTOMOTIVO);
const pagina = semComentarios(ler("src/app/segmentos/revendas-de-veiculos/page.tsx"));

describe("hub automotivo", () => {
  it("está pronto e indexável, com serviço (sem oferta de preço) e perguntas no schema", () => {
    expect(paginaDa(HUB_AUTOMOTIVO.rota).pronta).toBe(true);
    const grafo = grafoDoHubAutomotivo() as { "@graph": { "@type"?: string; "@id"?: string }[] };
    expect(grafo["@graph"][0]).toEqual({ "@id": expect.stringContaining("#organizacao") });
    expect(grafo["@graph"].slice(1).map((n) => n["@type"])).toEqual(["BreadcrumbList", "Service", "FAQPage"]);
    expect(servicoAutomotivo()).not.toHaveProperty("offers");
    const faq = grafo["@graph"][3] as { mainEntity: { name: string }[] };
    expect(faq.mainEntity.map((p) => p.name)).toEqual(HUB_AUTOMOTIVO.perguntas.map((p) => p.pergunta));
  });

  it("nenhum valor em real, nenhum módulo avulso e nada de repasse", () => {
    expect(texto).not.toMatch(/R\$|mensalidade|a partir de|plano |fidelidade/i);
    expect(texto).not.toMatch(/Completo/);
    expect(HUB_AUTOMOTIVO).not.toHaveProperty("extras");
    expect(texto).not.toMatch(/repasse|consulta veicular|por placa/i);
    expect(HUB_AUTOMOTIVO.fatos[0].rotulo).toBe("No Sprint");
    expect(pagina).not.toContain("ParceiroDeFotografia");
  });

  it("os números são os do case, com a mesma fonte e período", () => {
    expect(HUB_AUTOMOTIVO.case.numeros).toBe(CASE.numeros);
    expect(HUB_AUTOMOTIVO.case.fonte).toBe(CASE.fonte);
    expect(pagina).toContain("{h.case.fonte}");
    expect(pagina).not.toContain("CompletoParaRevendas");
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
