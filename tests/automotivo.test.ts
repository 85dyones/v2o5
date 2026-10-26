import { describe, expect, it } from "vitest";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { BRL, OFERTA_DO_COMPLETO, plano, PLANOS } from "@/conteudo/precos";
import { CONTINUIDADE, SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { paginaDa } from "@/conteudo/paginas";
import { grafoDoHubAutomotivo, servicoAutomotivo } from "@/lib/schema";
import { ler, semComentarios } from "./fonte";

/**
 * O hub automotivo é o único lugar com o valor dos três planos (Dyones,
 * 25/10/2026); não repete os números nem o caminho do lead do case, só aponta
 * para ele. Sobre o agente, não afirma que roda na Motors (pendência 13). A
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

  it("mostra os três planos com o valor de plano e nenhum módulo avulso, tráfego ou repasse", () => {
    expect(HUB_AUTOMOTIVO.planos.itens.map((p) => p.nome)).toEqual(["Mapa", "Operação com IA", "Completo"]);
    for (const p of HUB_AUTOMOTIVO.planos.itens) {
      expect(p.implantacao).toBe(BRL(plano(p.id).implantacao));
      expect(texto).toContain(p.implantacao);
    }
    expect(HUB_AUTOMOTIVO.planos.itens.map((p) => p.sprint)).toEqual(["Sprint Integrada", "Sprint Integrada", "Sprint Avançada"]);
    expect(HUB_AUTOMOTIVO.planos.titulo).toMatch(/modelos de Sprint/);
    // A implantação de cada modelo parte do valor do Sprint a que ele pertence (sem teto público, 26/10/2026).
    for (const p of HUB_AUTOMOTIVO.planos.itens) {
      const faixa = SPRINT_DE_PRECOS.niveis.find((n) => n.nome === p.sprint.replace("Sprint ", "Sprint "))!.faixa;
      const valor = plano(p.id).implantacao;
      expect(valor, p.nome).toBeGreaterThanOrEqual(faixa.de);
    }
    // A recorrência de cada modelo cabe na faixa de continuidade pública.
    const minimo = Math.min(...CONTINUIDADE.modalidades.map((m) => m.faixa.de));
    const maximo = Math.max(...CONTINUIDADE.modalidades.map((m) => m.faixa.ate ?? m.faixa.de));
    for (const p of PLANOS) {
      expect(p.mensalidade, p.nome).toBeGreaterThanOrEqual(minimo);
      expect(p.mensalidade, p.nome).toBeLessThanOrEqual(maximo);
    }
    const completo = HUB_AUTOMOTIVO.planos.itens[2];
    expect(completo.mensalidade).toBe(BRL(OFERTA_DO_COMPLETO.mensalidade));
    expect(completo.condicao).toContain(BRL(plano("completo").mensalidade));
    expect(texto).not.toMatch(/Google Ads|Meta Ads|R\$ 1\.300/);
    expect(HUB_AUTOMOTIVO).not.toHaveProperty("extras");
    expect(texto).not.toMatch(/repasse|consulta veicular|por placa/i);
    expect(HUB_AUTOMOTIVO.fatos[0].rotulo).toBe("No Sprint");
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
