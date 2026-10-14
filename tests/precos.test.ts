import { describe, expect, it } from "vitest";
import {
  AUTOMOTIVO_PRECO,
  BRL,
  CANAIS_DA_REATIVACAO,
  DEGRAUS,
  descontoDoPacote,
  economiaDoTrafegoJunto,
  FOTOGRAFIA_PARCEIRA,
  LINHAS_DE_PRECO,
  linhasDoPilar,
  mensalidadeDoPacoteComTrafego,
  mesesQueUmaVendaPaga,
  LINHAS_NO_TETO,
  mensalidadeComTeto,
  PISO_DA_MENSALIDADE,
  precoDa,
  REAJUSTE,
  somaDoPacote,
  TETO_DA_MENSALIDADE,
} from "@/conteudo/precos";
import { HUB_AUTOMOTIVO } from "@/conteudo/automotivo";
import { AUTOMOTIVO, LINHAS, PILARES } from "@/conteudo/home";
import { ler } from "./fonte";

/**
 * `precos.ts` é a fonte; `memory/context/oferta.md` repete os números. Aqui
 * os dois lados são comparados, e a regra do piso de R$ 690 fica travada.
 */

const oferta = ler("memory/context/oferta.md");

describe("tabela de preços", () => {
  it("formata em real com ponto de milhar", () => {
    expect(BRL(690)).toBe("R$ 690");
    expect(BRL(7900)).toBe("R$ 7.900");
    expect(BRL(14900)).toBe("R$ 14.900");
  });

  it("nenhuma mensalidade fica abaixo do piso de hospedagem e manutenção", () => {
    expect(PISO_DA_MENSALIDADE).toBe(690);
    for (const l of LINHAS_DE_PRECO) {
      if (l.mensalidade) expect(l.mensalidade, l.nome).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
    }
    expect(AUTOMOTIVO_PRECO.siteDeEstoque.mensalidade).toBeGreaterThanOrEqual(PISO_DA_MENSALIDADE);
  });

  it("a mensalidade tem teto para as linhas de sistema (Dyones, 13/10)", () => {
    expect(TETO_DA_MENSALIDADE).toBe(1990);
    expect(TETO_DA_MENSALIDADE).toBeGreaterThan(PISO_DA_MENSALIDADE);
    expect([...LINHAS_NO_TETO]).toEqual(["sites", "rastreamento", "agente", "crm", "painel"]);
    for (const id of LINHAS_NO_TETO) expect(LINHAS_DE_PRECO.find((l) => l.id === id)?.mensalidade, id).toBeGreaterThan(0);
    expect(mensalidadeComTeto(["sites"])).toEqual({ soma: 690, cobrada: 690 });
    expect(mensalidadeComTeto(["sites", "agente", "crm", "rastreamento"])).toEqual({ soma: 2960, cobrada: 1990 });
    expect(mensalidadeComTeto([...LINHAS_NO_TETO])).toEqual({ soma: 3750, cobrada: 1990 });
    // Tráfego e conteúdo não entram no teto.
    expect(mensalidadeComTeto(["sites", "trafego", "redes"])).toEqual({ soma: 690, cobrada: 690 });
    expect(AUTOMOTIVO_PRECO.pacote.mensalidade).toBe(TETO_DA_MENSALIDADE);
    const oferta = ler("memory/context/oferta.md");
    expect(oferta).toContain("Teto da mensalidade: R$ 1.990");
  });

  it("a reativação custa metade por campanha e tem pacote para mais de uma (Dyones, 13/10)", () => {
    const r = LINHAS_DE_PRECO.find((l) => l.id === "reativacao")!;
    expect(r.implantacao).toBe(950);
    expect(r.degraus?.map((d) => [d.rotulo, d.valor])).toEqual([
      ["Canal extra", 490],
      ["Cada 5 mil contatos a mais", 290],
      ["Pacote de 3 campanhas", 2490],
      ["Campanha todo mês", 790],
      ["Número dedicado no WhatsApp não oficial", 290],
    ]);
    expect(2490 / 3).toBeLessThan(950);
  });

  it("cada número do código está em oferta.md", () => {
    const valores = new Set<number>();
    for (const l of LINHAS_DE_PRECO) {
      if (l.implantacao) valores.add(l.implantacao);
      if (l.mensalidade) valores.add(l.mensalidade);
      for (const d of l.degraus ?? []) valores.add(d.valor);
    }
    for (const v of [DEGRAUS.usuarioExtra, DEGRAUS.conversas.valor, DEGRAUS.dados.valor, DEGRAUS.fonteExtra.implantacao, DEGRAUS.fonteExtra.mensalidade]) {
      valores.add(v);
    }
    valores.add(economiaDoTrafegoJunto());
    const { siteDeEstoque, pacote, trafegoNoPacote } = AUTOMOTIVO_PRECO;
    for (const v of [siteDeEstoque.implantacao, siteDeEstoque.mensalidade, pacote.implantacao, pacote.mensalidade, trafegoNoPacote]) {
      valores.add(v);
    }
    valores.add(mensalidadeDoPacoteComTrafego());
    valores.add(somaDoPacote().implantacao);
    valores.add(somaDoPacote().mensalidade);
    for (const v of valores) expect(oferta, BRL(v)).toContain(BRL(v));
  });

  it("os cartões da home e o pacote usam o texto da tabela", () => {
    for (const l of LINHAS) {
      const daTabela = LINHAS_DE_PRECO.find((x) => x.id === l.linha);
      expect(daTabela, l.titulo).toBeDefined();
      expect(daTabela!.href, l.titulo).toBe(l.href);
      expect(l.preco).toBe(precoDa(daTabela!.id));
    }
    for (const s of PILARES.flatMap((p) => p.servicos)) {
      if (s.linha) expect(s.preco, s.titulo).toBe(precoDa(s.linha));
    }
    expect(PILARES[0].servicos[0].preco).toBe(precoDa("branding"));
    expect(AUTOMOTIVO.preco).toContain(BRL(AUTOMOTIVO_PRECO.pacote.implantacao));
    expect(AUTOMOTIVO.preco).toContain(BRL(AUTOMOTIVO_PRECO.pacote.mensalidade));
  });

  it("o desconto do pacote e a conta da margem batem com oferta.md", () => {
    const d = descontoDoPacote();
    expect(d.implantacao).toBe(24);
    expect(d.mensalidade).toBe(33);
    expect(oferta).toContain(`${d.implantacao}% sobre a soma das implantações`);
    expect(oferta).toContain(`${d.mensalidade}% sobre a soma das mensalidades`);
    expect(mesesQueUmaVendaPaga()).toBe(3);
    expect(oferta).toContain("uma venda a mais a cada 3 meses");
  });

  it("os textos de preço seguem o formato dos cartões", () => {
    expect(precoDa("sites")).toBe("a partir de R$ 7.900 + R$ 690/mês");
    expect(precoDa("googleAds")).toBe("a partir de R$ 1.200/mês + verba");
    expect(precoDa("trafego")).toBe("a partir de R$ 1.990/mês + verba");
    expect(precoDa("catalogo")).toBe("a partir de R$ 1.900 por feed");
    expect(precoDa("redes")).toBe("a partir de R$ 1.500 + R$ 1.290/mês");
    expect(precoDa("automacao")).toBe("a partir de R$ 1.900 por fluxo");
    expect(precoDa("reativacao")).toBe("a partir de R$ 950 por campanha");
    expect(precoDa("branding")).toBe("a partir de R$ 1.500 por projeto");
  });

  it("o que cresce com o cliente tem preço publicado, e CRM e painel sobem para 790 (Dyones, 12/10)", () => {
    expect(DEGRAUS.usuarioExtra).toBe(89);
    expect(oferta).toContain("usuário extra R$ 89/mês");
    for (const id of ["crm", "painel"]) {
      const l = LINHAS_DE_PRECO.find((x) => x.id === id)!;
      expect(l.mensalidade, id).toBe(790);
      expect(l.inclui?.join(" "), id).toMatch(/usuários/);
      expect(l.degraus?.map((d) => d.rotulo), id).toContain("Usuário extra");
    }
    const agente = LINHAS_DE_PRECO.find((x) => x.id === "agente")!;
    expect(agente.degraus?.[0]).toEqual({ rotulo: "Cada 500 conversas a mais", valor: 190, unidade: "/mês" });
    expect(REAJUSTE).toEqual({ indice: "IPCA", gatilhoCambial: 10 });
    expect(oferta).toContain("IPCA ao ano");
    expect(oferta).toContain("acima de 10%");
  });

  it("tráfego por plataforma, os dois juntos com o feed de bônus, e a soma do pacote com as duas plataformas", () => {
    expect(precoDa("googleAds")).toBe(precoDa("metaAds"));
    expect(economiaDoTrafegoJunto()).toBe(410);
    expect(LINHAS_DE_PRECO.find((x) => x.id === "trafego")?.bonus).toMatch(/Feed de catálogo incluso/);
    expect(LINHAS_DE_PRECO.find((x) => x.id === "metaAds")?.cobre, "Meta Ads abre conversa no WhatsApp (Dyones, 14/10)").toMatch(/WhatsApp/);
    expect(oferta).toMatch(/Meta Ads[^\n]*WhatsApp/);
    expect(AUTOMOTIVO_PRECO.trafegoNoPacote).toBeLessThan(LINHAS_DE_PRECO.find((x) => x.id === "trafego")!.mensalidade!);
    expect(mensalidadeDoPacoteComTrafego()).toBe(3290);
  });

  it("a reativação de base tem três canais, nenhum recomendado, e sem tarifa de terceiro em número (Dyones, 13/10)", () => {
    for (const c of CANAIS_DA_REATIVACAO) expect(c).not.toHaveProperty("recomendado");
    expect(CANAIS_DA_REATIVACAO.map((c) => c.nome)).toEqual(["WhatsApp pela API oficial", "WhatsApp por número não oficial", "SMS"]);
    expect(CANAIS_DA_REATIVACAO[0].regras).toMatch(/bases grandes/);
    expect(CANAIS_DA_REATIVACAO[1].risco).not.toMatch(/^Alto/);
    expect(CANAIS_DA_REATIVACAO[1].risco).toMatch(/método da V2O5/);
    expect(CANAIS_DA_REATIVACAO[1].regras).toMatch(/termo de aceite/);
    const tabela = ler("src/components/precos/TabelaDePrecos.tsx");
    const reativacao = tabela.slice(tabela.indexOf("export function Reativacao"), tabela.indexOf("export function Pacote"));
    expect(reativacao).not.toMatch(/recomendado|text-ambar/);
    for (const c of CANAIS_DA_REATIVACAO) {
      for (const v of c.paga.match(/R\$ [\d.,]+/g) ?? []) expect(v, c.nome).toBe("R$ 290");
    }
  });

  it("fotógrafo parceiro: indicação a partir de R$ 890 por mês, no hub, em /precos e nas perguntas (Dyones, 13/10)", () => {
    expect(FOTOGRAFIA_PARCEIRA.aPartirDe).toBe(890);
    expect(FOTOGRAFIA_PARCEIRA.texto).toContain("a partir de R$ 890");
    expect(FOTOGRAFIA_PARCEIRA.texto).not.toMatch(/incr[ií]ve/);
    expect(oferta).toContain("R$ 890");
    expect(ler("src/app/segmentos/revendas-de-veiculos/page.tsx")).toContain("<ParceiroDeFotografia />");
    expect(ler("src/app/precos/page.tsx")).toContain("<ParceiroDeFotografia />");
    expect(ler("src/components/precos/ParceiroDeFotografia.tsx")).toContain('data-evento="click_whatsapp"');
    expect(HUB_AUTOMOTIVO.perguntas.find((p) => p.pergunta === "Preciso de fotógrafo?")?.resposta).toContain("R$ 890");
    expect(ler("src/components/precos/TabelaDePrecos.tsx")).toContain("FOTOGRAFIA_PARCEIRA.aPartirDe");
  });

  it("cada linha está num pilar do H1, e os dois pilares cobrem a tabela inteira", () => {
    expect(linhasDoPilar("mapa").length + linhasDoPilar("operacao").length).toBe(LINHAS_DE_PRECO.length);
    for (const l of LINHAS_DE_PRECO) expect(oferta, l.nome).toContain(l.nome.replace(" (BI e dashboards)", ""));
  });
});
