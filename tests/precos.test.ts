import { describe, expect, it } from "vitest";
import {
  BRL,
  CAPACIDADES,
  dataBR,
  DEGRAUS,
  economiaDoTrafegoJunto,
  FOTOGRAFIA_PARCEIRA,
  LINHAS_DE_PRECO,
  linhaDePreco,
  linhasDoGrupo,
  mensalidadeDoCompletoComTrafego,
  mensalidadeDoPlano,
  mesesQueUmaVendaPaga,
  OFERTA_DO_COMPLETO,
  ofertaDaCapacidade,
  PISO_DA_MENSALIDADE,
  plano,
  PLANOS,
  precoDa,
  precoDaLinha,
  REAJUSTE,
  somaDosPlanosSeparados,
  USUARIOS_NO_CRM,
} from "@/conteudo/precos";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { AUTOMOTIVO, LINHAS, PILARES } from "@/conteudo/home";
import { ler } from "./fonte";

/**
 * `precos.ts` é a fonte; `memory/context/oferta.md` repete os números. Aqui
 * os dois lados são comparados, e as decisões do cardápio de 15/10 ficam
 * travadas.
 */

const oferta = ler("memory/context/oferta.md");

describe("tabela de preços", () => {
  it("formata em real com ponto de milhar, e centavos só quando há", () => {
    expect(BRL(690)).toBe("R$ 690");
    expect(BRL(7900)).toBe("R$ 7.900");
    expect(BRL(14900)).toBe("R$ 14.900");
    expect(BRL(49.9)).toBe("R$ 49,90");
    expect(dataBR("2026-12-31")).toBe("31/12/2026");
  });

  it("três planos com preço fechado (Dyones, 15/10)", () => {
    expect(PLANOS.map((p) => [p.id, p.implantacao, p.mensalidade])).toEqual([
      ["presenca", 8900, 990],
      ["atendimento", 7900, 1590],
      ["completo", 14900, 2290],
    ]);
    expect(somaDosPlanosSeparados()).toEqual({ implantacao: 16800, mensalidade: 2580 });
    expect(plano("completo").rodape).toContain("R$ 16.800 + R$ 2.580/mês");
    expect(plano("completo").mensalidade).toBeLessThan(somaDosPlanosSeparados().mensalidade);
    expect(plano("atendimento").inclui.join(" ")).toContain(`${USUARIOS_NO_CRM} usuários`);
  });

  it("o Completo passou de 7 horas e foi a R$ 2.290, com R$ 1.990 por tempo limitado e o painel de bônus", () => {
    const c = plano("completo");
    expect(OFERTA_DO_COMPLETO.mensalidade).toBe(1990);
    expect(mensalidadeDoPlano(c)).toBe(1990);
    expect(c.bonus).toMatch(/Painel do dono/);
    expect(linhaDePreco("painel").bonus).toMatch(/Completo/);
    expect(oferta).toContain("R$ 1.990 por tempo limitado, até 31/12/2026");
    // A oferta não pode ficar no ar vencida: quando a data passar, este teste
    // falha e o preço temporário sai de `precos.ts` (ou ganha data nova).
    expect(new Date(`${OFERTA_DO_COMPLETO.ate}T23:59:59-03:00`).getTime()).toBeGreaterThan(Date.now());
  });

  it("nenhuma mensalidade que mantém sistema no ar fica abaixo do piso; módulos rodam em cima do plano", () => {
    expect(PISO_DA_MENSALIDADE).toBe(690);
    for (const p of PLANOS) expect(mensalidadeDoPlano(p), p.nome).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
    for (const l of LINHAS_DE_PRECO) {
      if (!l.mensalidade) continue;
      if (l.grupo === "modulo") expect(l.requisito, l.nome).toMatch(/Atendimento ou Completo/);
      else if (l.id !== "trafegoNoCompleto") expect(l.mensalidade, l.nome).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
    }
  });

  it("módulos: painel, reativação, funil, consulta e repasse, os dois últimos só no hub de revendas", () => {
    expect(linhasDoGrupo("modulo").map((l) => l.id)).toEqual(["painel", "reativacao", "funil"]);
    expect(linhasDoGrupo("modulo", "revendas").map((l) => l.id)).toEqual(["consulta", "repasse"]);
    const valores = (id: string) => [linhaDePreco(id).implantacao, linhaDePreco(id).mensalidade];
    expect(valores("painel")).toEqual([3900, 490]);
    expect(valores("reativacao")).toEqual([1900, 290]);
    expect(valores("funil")).toEqual([1900, undefined]);
    expect(valores("consulta")).toEqual([990, 190]);
    expect(valores("repasse")).toEqual([2900, 390]);
    expect(linhaDePreco("consulta").porUso).toEqual({ valor: 49.9, unidade: "por placa" });
    expect(precoDaLinha(linhaDePreco("consulta"))).toBe("a partir de R$ 990 + R$ 190/mês e R$ 49,90 por placa");
    expect(linhaDePreco("reativacao").degraus?.map((d) => d.valor)).toEqual([950, 2490]);
    expect(linhaDePreco("reativacao").cobre, "SMS testado e funcional (Dyones, 15/10)").toMatch(/SMS/);
  });

  it("branding sai da tabela e fica anunciado como serviço sob consulta", () => {
    const b = linhaDePreco("branding");
    expect(b.sobConsulta).toBe(true);
    expect(b.implantacao).toBeUndefined();
    expect(precoDa("branding")).toBe("sob consulta");
    expect(linhasDoGrupo("servico").map((l) => l.id)).toEqual(["redes", "automacao", "branding"]);
  });

  it("cada número do código está em oferta.md", () => {
    const valores = new Set<number>();
    for (const p of PLANOS) [p.implantacao, p.mensalidade].forEach((v) => valores.add(v));
    for (const l of LINHAS_DE_PRECO) {
      if (l.implantacao) valores.add(l.implantacao);
      if (l.mensalidade) valores.add(l.mensalidade);
      if (l.porUso) valores.add(l.porUso.valor);
      for (const d of l.degraus ?? []) valores.add(d.valor);
    }
    for (const v of [DEGRAUS.usuarioExtra, DEGRAUS.conversas.valor, DEGRAUS.dados.valor, OFERTA_DO_COMPLETO.mensalidade]) valores.add(v);
    valores.add(economiaDoTrafegoJunto());
    valores.add(mensalidadeDoCompletoComTrafego());
    valores.add(somaDosPlanosSeparados().implantacao);
    valores.add(somaDosPlanosSeparados().mensalidade);
    valores.add(FOTOGRAFIA_PARCEIRA.aPartirDe);
    for (const v of valores) expect(oferta, BRL(v)).toContain(BRL(v));
    for (const l of LINHAS_DE_PRECO) expect(oferta, l.nome).toContain(l.nome.replace(" (cada plataforma)", ""));
  });

  it("cada cartão da home mora num plano ou numa linha, e o preço sai de lá", () => {
    for (const l of LINHAS) {
      expect(CAPACIDADES[l.linha], l.titulo).toBeDefined();
      expect(l.preco, l.titulo).toBe(precoDa(l.linha));
      expect(oferta).toContain(`\`${l.href}\``);
    }
    for (const s of PILARES.flatMap((p) => p.servicos)) {
      if (s.linha) expect(s.preco, s.titulo).toBe(precoDa(s.linha));
    }
    expect(AUTOMOTIVO.preco).toContain(BRL(plano("completo").implantacao));
    expect(AUTOMOTIVO.preco).toContain(BRL(OFERTA_DO_COMPLETO.mensalidade));
  });

  it("os textos de preço seguem o formato dos cartões", () => {
    expect(precoDa("sites")).toBe("no plano Presença, a partir de R$ 8.900 + R$ 990/mês");
    expect(precoDa("agente")).toBe("no plano Atendimento, a partir de R$ 7.900 + R$ 1.590/mês");
    expect(precoDa("avaliacoes")).toBe("incluso no plano Presença");
    expect(precoDa("rastreamento")).toBe("a partir de R$ 2.900 + R$ 690/mês, ou no plano Presença");
    expect(precoDa("googleAds")).toBe("a partir de R$ 1.200/mês + verba, por plataforma");
    expect(precoDa("trafego")).toBe("a partir de R$ 1.990/mês + verba");
    expect(precoDa("catalogo")).toBe("incluso no Google Ads e Meta Ads juntos");
    expect(precoDa("redes")).toBe("a partir de R$ 1.500 + R$ 1.699/mês");
    expect(precoDa("automacao")).toBe("a partir de R$ 1.900 por fluxo");
    expect(precoDa("reativacao")).toBe("a partir de R$ 1.900 + R$ 290/mês");
    expect(precoDa("painel")).toBe("a partir de R$ 3.900 + R$ 490/mês; implantação de bônus no Completo");
  });

  it("a página de solução mostra o plano em que a peça mora, ou a linha própria", () => {
    expect(ofertaDaCapacidade("sites")).toMatchObject({ nome: "Plano Presença", implantacao: 8900, mensalidade: 990 });
    expect(ofertaDaCapacidade("crm")).toMatchObject({ nome: "Plano Atendimento", implantacao: 7900, mensalidade: 1590 });
    expect(ofertaDaCapacidade("rastreamento")).toMatchObject({ id: "rastreamento", implantacao: 2900, mensalidade: 690 });
    expect(ofertaDaCapacidade("automacao")).toMatchObject({ id: "automacao", implantacao: 1900 });
  });

  it("o que cresce com o cliente tem preço publicado", () => {
    expect(DEGRAUS.usuarioExtra).toBe(89);
    expect(oferta).toContain("Usuário extra R$ 89/mês");
    expect(linhaDePreco("painel").degraus?.map((d) => d.rotulo)).toContain("Usuário extra");
    expect(REAJUSTE).toEqual({ indice: "IPCA", gatilhoCambial: 10 });
    expect(oferta).toContain("IPCA ao ano");
    expect(oferta).toContain("acima de 10%");
  });

  it("tráfego por plataforma, as duas juntas com o feed, e o preço no Completo", () => {
    expect(precoDaLinha(linhaDePreco("googleAds"))).toBe(precoDaLinha(linhaDePreco("metaAds")));
    expect(economiaDoTrafegoJunto()).toBe(410);
    expect(linhaDePreco("trafego").bonus).toMatch(/Feed de catálogo incluso/);
    expect(linhaDePreco("metaAds").cobre, "Meta Ads abre conversa no WhatsApp (Dyones, 14/10)").toMatch(/WhatsApp/);
    expect(oferta).toMatch(/Meta Ads[^\n]*WhatsApp/);
    expect(linhaDePreco("trafegoNoCompleto").mensalidade).toBeLessThan(linhaDePreco("trafego").mensalidade!);
    expect(mensalidadeDoCompletoComTrafego()).toBe(3290);
  });

  it("a conta da margem por carro bate com oferta.md", () => {
    expect(mesesQueUmaVendaPaga()).toBe(3);
    expect(oferta).toContain("uma venda a mais a cada 3 meses");
  });

  it("fotógrafo parceiro: indicação a partir de R$ 890 por mês, no hub, em /precos e nas perguntas (Dyones, 13/10)", () => {
    expect(FOTOGRAFIA_PARCEIRA.aPartirDe).toBe(890);
    expect(FOTOGRAFIA_PARCEIRA.texto).toContain("a partir de R$ 890");
    expect(FOTOGRAFIA_PARCEIRA.texto).not.toMatch(/incr[ií]ve/);
    expect(ler("src/app/segmentos/revendas-de-veiculos/page.tsx")).toContain("<ParceiroDeFotografia />");
    expect(ler("src/app/precos/page.tsx")).toContain("<ParceiroDeFotografia />");
    expect(ler("src/components/precos/ParceiroDeFotografia.tsx")).toContain('data-evento="click_whatsapp"');
    expect(HUB_AUTOMOTIVO.perguntas.find((p) => p.pergunta === "Preciso de fotógrafo?")?.resposta).toContain("R$ 890");
    expect(ler("src/components/precos/TabelaDePrecos.tsx")).toContain("FOTOGRAFIA_PARCEIRA.aPartirDe");
  });

  it("piso e teto saem do site: o texto público não fala mais em teto", () => {
    const publico = [
      ler("src/app/precos/page.tsx"),
      ler("src/components/precos/TabelaDePrecos.tsx"),
      JSON.stringify(HUB_AUTOMOTIVO),
      ler("src/conteudo/home.ts"),
      ler("src/app/llms.txt/route.ts"),
    ].join(" ");
    expect(publico).not.toMatch(/\bteto\b/i);
  });
});
