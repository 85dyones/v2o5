import { describe, expect, it } from "vitest";
import { BRL, dataBR, precoEmTexto } from "@/conteudo/precos";
import {
  continuidadeAPartirDe,
  CONTINUIDADE,
  mensalEmTexto,
  OFERTAS,
  ofertaDa,
  PLANOS_DE_CONTINUIDADE,
  planoDaFrente,
  precoDeEntrada,
} from "@/conteudo/ofertas";
import { SPRINT_DE_PRECOS } from "@/conteudo/sprint";
import { ler } from "./fonte";

/**
 * O portfólio de 27/10/2026: `ofertas.ts` e `sprint.ts` são a fonte, e
 * `memory/context/oferta.md` repete os números. Aqui os dois lados são
 * comparados e as regras do handoff ficam travadas: quatro soluções na
 * ordem, preço de entrada, "a partir de" só no pacote de topo, continuidade
 * opcional com limites, nenhum escopo ilimitado.
 */

const oferta = ler("memory/context/oferta.md");
/** A parte vigente de oferta.md: o histórico, no fim, guarda o cardápio antigo. */
const vigente = oferta.slice(0, oferta.indexOf("## Histórico"));

describe("formato do preço", () => {
  it("real com ponto de milhar, centavos só quando há, e 'a partir de' só quando pedido", () => {
    expect(BRL(349)).toBe("R$ 349");
    expect(BRL(11900)).toBe("R$ 11.900");
    expect(BRL(49.9)).toBe("R$ 49,90");
    expect(dataBR("2026-11-11")).toBe("11/11/2026");
    expect(precoEmTexto({ valor: 2400 })).toBe("R$ 2.400");
    expect(precoEmTexto({ valor: 7900, aPartirDe: true })).toBe("a partir de R$ 7.900");
    expect(mensalEmTexto(390)).toBe("R$ 390/mês");
  });
});

describe("as quatro soluções (27/10/2026)", () => {
  it("são Branding, Presença, Sites e Sprint, nessa ordem, cada uma com a sua rota", () => {
    expect(OFERTAS.map((o) => [o.nome, o.rota])).toEqual([
      ["Branding & Identidade", "/branding-e-identidade"],
      ["Presença Digital Local", "/presenca-digital-local"],
      ["Sites & Integrações", "/criacao-de-sites"],
      ["Sprint de Eficiência", "/sprint-de-eficiencia"],
    ]);
  });

  it("o preço de entrada é o da tabela do handoff", () => {
    expect(OFERTAS.map(precoDeEntrada)).toEqual([2400, 790, 2900, 3900]);
    expect(continuidadeAPartirDe()).toBe(349);
  });

  it("pacotes e preços batem com o handoff", () => {
    const tabela = Object.fromEntries(OFERTAS.map((o) => [o.id, o.pacotes.map((p) => [p.nome, p.preco.valor, !!p.preco.aPartirDe, p.mensal?.valor ?? null])]));
    expect(tabela).toEqual({
      branding: [
        ["Identidade Essencial", 2400, false, null],
        ["Marca em Uso", 4900, false, null],
        ["Reposicionamento", 7900, true, null],
      ],
      presenca: [
        ["Presença Essencial", 790, false, 390],
        ["Presença Estruturada", 1490, false, 490],
        ["Presença Assistida", 1990, false, 890],
      ],
      sites: [
        ["Landing Page", 2900, false, null],
        ["Site Personalizado", 5900, false, null],
        ["Site Conectado", 9900, true, null],
        ["Site Automotivo Integrado", 11900, true, null],
      ],
      sprint: [
        ["Sprint Essencial", 3900, false, null],
        ["Sprint Integrado", 6900, false, null],
        ["Sprint Avançado", 12900, true, null],
      ],
    });
    expect(SPRINT_DE_PRECOS.niveis.filter((n) => "principal" in n && n.principal).map((n) => n.nome)).toEqual(["Sprint Integrado"]);
  });

  it("cada pacote diz para quem é e o que inclui, e cada solução diz o que fica de fora", () => {
    for (const o of OFERTAS) {
      expect(o.resolve.length, o.nome).toBeGreaterThan(40);
      expect(o.recebe.length, o.nome).toBeGreaterThan(40);
      expect(o.fora.length, o.nome).toBeGreaterThanOrEqual(3);
      expect(o.regras.length, o.nome).toBeGreaterThanOrEqual(2);
      for (const p of o.pacotes) {
        expect(p.para.length, p.nome).toBeGreaterThan(30);
        expect(p.inclui.length, p.nome).toBeGreaterThanOrEqual(2);
        expect(p.inclui.join(" "), p.nome).not.toMatch(/ilimitad/i);
        if (p.mensal) expect(p.mensal.cobre.length, p.nome).toBeGreaterThan(30);
      }
    }
    // O handoff: publicação, gestão de mensagens e verba de anúncio nunca entram sem limite.
    expect(ofertaDa("presenca").fora.join(" ")).toMatch(/Publicações ilimitadas/);
    expect(ofertaDa("presenca").fora.join(" ")).toMatch(/Verba de anúncios/);
    expect(ofertaDa("presenca").pacotes[1].mensal?.cobre).toMatch(/quatro peças/);
    expect(ofertaDa("branding").regras.join(" ")).toMatch(/Logotipo sozinho não é vendido/);
    expect(ofertaDa("sites").regras.join(" ")).toMatch(/não substitui o CRM/);
  });

  it("o Site Automotivo Integrado mostra só o 'a partir de'; o teto fica em oferta.md", () => {
    const s = ofertaDa("sites").pacotes.find((p) => p.nome === "Site Automotivo Integrado")!;
    expect(precoEmTexto(s.preco)).toBe("a partir de R$ 11.900");
    expect(vigente).toContain("R$ 11.900 a R$ 16.900");
    expect(JSON.stringify(OFERTAS)).not.toContain("16.900");
  });
});

describe("continuidade", () => {
  it("três planos opcionais, nas três frentes do menu", () => {
    expect(PLANOS_DE_CONTINUIDADE.map((p) => [p.nome, p.mensal])).toEqual([
      ["Cuidado Técnico", 349],
      ["Integrações Monitoradas", 590],
      ["Evolução Contínua", 990],
    ]);
    expect(CONTINUIDADE.frentes.map((f) => f.id)).toEqual(["manutencao-tecnica", "conteudo-e-campanhas", "monitoramento-e-otimizacao"]);
    expect(planoDaFrente("manutencao-tecnica").map((p) => p.nome)).toEqual(["Cuidado Técnico"]);
    expect(planoDaFrente("monitoramento-e-otimizacao").map((p) => p.nome)).toEqual(["Integrações Monitoradas", "Evolução Contínua"]);
    expect(CONTINUIDADE.texto).toMatch(/Nenhum plano é obrigatório/);
  });

  it("cada plano escreve horas e prazo de resposta, e os limites cobrem o que o handoff pede", () => {
    for (const p of PLANOS_DE_CONTINUIDADE) {
      expect(p.inclui.join(" "), p.nome).toMatch(/hora/);
    }
    expect(PLANOS_DE_CONTINUIDADE[0].inclui.join(" ")).toMatch(/2 dias úteis/);
    expect(PLANOS_DE_CONTINUIDADE[1].inclui.join(" ")).toMatch(/1 dia útil/);
    const limites = CONTINUIDADE.limites.map((l) => `${l.titulo}: ${l.texto}`).join(" ");
    for (const exigido of [/não acumulam/, /Correção é/, /orçada à parte/, /horário comercial/, /valor do provedor/, /teto mensal/, /acessos e os pagamentos/, /aviso prévio/]) {
      expect(limites).toMatch(exigido);
    }
    expect(JSON.stringify(PLANOS_DE_CONTINUIDADE)).not.toMatch(/ilimitad/i);
  });
});

describe("oferta.md repete o código", () => {
  it("cada pacote e cada plano aparecem na parte vigente, com o mesmo preço", () => {
    for (const o of OFERTAS) {
      expect(vigente, o.nome).toContain(`## ${o.nome}`);
      for (const p of o.pacotes) {
        expect(vigente, p.nome).toMatch(new RegExp(`\\| ${p.nome} \\| ${precoEmTexto(p.preco).replace(/[$.]/g, "\\$&")} \\|`));
        if (p.mensal) expect(vigente, p.nome).toContain(`| ${mensalEmTexto(p.mensal.valor)} |`);
      }
    }
    for (const p of PLANOS_DE_CONTINUIDADE) expect(vigente, p.nome).toContain(`| ${p.nome} | ${mensalEmTexto(p.mensal)} |`);
    for (const o of OFERTAS) expect(vigente, o.nome).toContain(`| ${o.nome} | a partir de ${BRL(precoDeEntrada(o))} |`);
    expect(vigente).toContain(`| Continuidade | planos a partir de ${mensalEmTexto(continuidadeAPartirDe())} |`);
  });

  it("o cardápio de 15/10 ficou só no histórico", () => {
    expect(vigente).not.toMatch(/R\$ 8\.900|R\$ 14\.900|R\$ 1\.590|R\$ 2\.290/);
    expect(oferta.slice(oferta.indexOf("## Histórico"))).toContain("R$ 8.900");
  });
});
