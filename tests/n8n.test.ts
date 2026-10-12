import { describe, expect, it } from "vitest";
import { ESTOQUES, OBJETIVOS, PORTES, SEGMENTOS, SISTEMAS } from "@/conteudo/diagnostico";
import { EMPRESA } from "@/conteudo/home";
import { ler } from "./fonte";

/**
 * O fluxo do n8n (`docs/n8n/lead-do-diagnostico.json`) é o outro lado de
 * `/api/leads`: precisa aceitar o que a rota manda e falar a língua do
 * formulário. Este teste amarra os dois sem precisar de um n8n rodando.
 */

type No = {
  name: string;
  type: string;
  parameters: Record<string, unknown>;
  credentials?: Record<string, { name: string; id?: string; data?: unknown }>;
  disabled?: boolean;
};
type Fluxo = { nodes: No[]; connections: Record<string, { main: { node: string }[][] }> };

const fluxo = JSON.parse(ler("docs/n8n/lead-do-diagnostico.json")) as Fluxo;
const no = (nome: string) => {
  const achado = fluxo.nodes.find((n) => n.name === nome);
  if (!achado) throw new Error(`nó ${nome} não existe`);
  return achado;
};
const leiaMe = ler("docs/n8n/LEIA-ME.md");

describe("fluxo do n8n", () => {
  it("recebe no caminho documentado, exige o cabeçalho do segredo e responde pelo nó de resposta", () => {
    const webhook = no("Pedido do site");
    expect(webhook.type).toBe("n8n-nodes-base.webhook");
    expect(webhook.parameters).toMatchObject({ httpMethod: "POST", path: "v2o5-diagnostico", authentication: "headerAuth", responseMode: "responseNode" });
    expect(fluxo.nodes.some((n) => n.type === "n8n-nodes-base.respondToWebhook")).toBe(true);
    expect(leiaMe).toContain("https://n8n.v2o5.com.br/webhook/v2o5-diagnostico");
    for (const nome of ["LEADS_WEBHOOK_URL", "LEADS_WEBHOOK_SECRET", "X-V2O5-Segredo"]) expect(leiaMe).toContain(nome);
  });

  it("toda conexão aponta para um nó que existe", () => {
    const nomes = new Set(fluxo.nodes.map((n) => n.name));
    for (const [origem, saidas] of Object.entries(fluxo.connections)) {
      expect(nomes.has(origem), origem).toBe(true);
      for (const saida of saidas.main) for (const alvo of saida) expect(nomes.has(alvo.node), alvo.node).toBe(true);
    }
  });

  it("traduz os códigos do formulário com os mesmos rótulos que a pessoa viu", () => {
    const codigo = String(no("Lead").parameters.jsCode);
    const mapa = (lista: readonly { valor: string; rotulo: string }[]) => Object.fromEntries(lista.map((o) => [o.valor, o.rotulo]));
    const rotulos = { segmento: mapa(SEGMENTOS), porte: mapa(PORTES), objetivos: mapa(OBJETIVOS), estoque: mapa(ESTOQUES), sistema: mapa(SISTEMAS) };
    expect(codigo).toContain(`const ROTULOS = ${JSON.stringify(rotulos)};`);
  });

  it("avisa o número público e responde pelo e-mail público, sem chave nenhuma no arquivo", () => {
    const configuracao = no("Configuração").parameters as { assignments: { assignments: { name: string; value: string }[] } };
    const campo = (nome: string) => configuracao.assignments.assignments.find((a) => a.name === nome)?.value;
    expect(campo("whatsappDyones")).toBe(EMPRESA.whatsapp);
    expect(campo("evolutionUrl")).toBe("https://evolution.v2o5.com.br");
    expect(campo("chatwootUrl")).toBe("https://chatwoot.v2o5.com.br");
    const email = no("Responder por e-mail");
    expect(email.parameters.fromEmail).toBe(EMPRESA.email);
    expect(email.disabled).toBe(true);
    for (const n of fluxo.nodes) {
      for (const cred of Object.values(n.credentials ?? {})) {
        expect(cred.id, n.name).toBeUndefined();
        expect(cred.data, n.name).toBeUndefined();
      }
    }
    expect(JSON.stringify(fluxo)).not.toMatch(/apikey"\s*:\s*"[^"]{8,}/);
  });

  it("os textos para o lead e para o Dyones seguem as regras do site (sem travessão)", () => {
    const codigo = String(no("Lead").parameters.jsCode);
    expect(codigo).not.toMatch(/[—–]/);
    expect(codigo).toContain("45 minutos com o Dyones");
    expect(codigo).toContain("em até 24 horas");
  });
});
