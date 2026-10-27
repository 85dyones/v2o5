import { describe, expect, it } from "vitest";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { BRL } from "@/conteudo/precos";
import { ofertaDa, PLANOS_DE_CONTINUIDADE } from "@/conteudo/ofertas";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { paginaDa } from "@/conteudo/paginas";
import { grafoDoHubAutomotivo, servicoAutomotivo } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * O hub automotivo mostra os dois caminhos para revendas com os valores da
 * tabela de 27/10/2026; não repete os números nem o caminho do lead do case,
 * só aponta para ele. Sobre o agente, não afirma que roda na Motors (pendência 13). A
 * área de repasse não é produto da V2O5 (`V2O5_CORE.md`).
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

  it("mostra os dois caminhos de 27/10/2026 com os valores da tabela, sem plano antigo, módulo ou repasse", () => {
    expect(HUB_AUTOMOTIVO.planos.itens.map((p) => [p.nome, p.sprint])).toEqual([
      ["Site Automotivo Integrado", "Sites & Integrações"],
      ["Operação com IA", "Sprint Integrado"],
    ]);
    const site = ofertaDa("sites").pacotes.find((p) => p.nome === "Site Automotivo Integrado")!;
    expect(HUB_AUTOMOTIVO.planos.itens[0].preco).toBe(`A partir de ${BRL(site.preco.valor)}`);
    expect(HUB_AUTOMOTIVO.planos.itens[0].inclui).toEqual(site.inclui);
    const integrado = SPRINT_DE_PRECOS.niveis.find((n) => n.nome === "Sprint Integrado")!;
    expect(HUB_AUTOMOTIVO.planos.itens[1].preco).toBe(BRL(integrado.preco.valor));
    // A continuidade é opcional e sai da tabela.
    for (const p of HUB_AUTOMOTIVO.planos.itens) {
      expect(p.rotuloDaContinuidade).toMatch(/opcional/);
      expect(PLANOS_DE_CONTINUIDADE.some((c) => p.continuidade.includes(c.nome))).toBe(true);
    }
    // O teto interno do Site Automotivo Integrado (R$ 16.900) não aparece.
    expect(texto).not.toMatch(/16\.900/);
    expect(texto).not.toMatch(/Mapa|Completo|31\/12\/2026|Painel do dono|R\$ 1\.300/);
    expect(HUB_AUTOMOTIVO).not.toHaveProperty("extras");
    expect(texto).not.toMatch(/repasse|consulta veicular|por placa/i);
    expect(pagina).not.toContain("ParceiroDeFotografia");
  });

  it("os custos de nuvem, IA e mensagens ficam por fora, com teto combinado e aviso", () => {
    expect(HUB_AUTOMOTIVO.planos.rodape).toMatch(/por fora/);
    expect(HUB_AUTOMOTIVO.planos.rodape).toMatch(/teto mensal combinado e aviso antes de ultrapass/);
  });

  it("não repete o case: sem números, sem caminho do lead, só o link", () => {
    expect(HUB_AUTOMOTIVO).not.toHaveProperty("caminho");
    expect(HUB_AUTOMOTIVO.case.href).toBe("/cases/motors-store");
    expect(HUB_AUTOMOTIVO.case).not.toHaveProperty("numeros");
    expect(pagina).not.toContain("numero-grande");
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
