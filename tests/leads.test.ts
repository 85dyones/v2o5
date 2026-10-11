import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST, zerarLimite } from "@/app/api/leads/route";
import { lerOrigem, normalizarWhatsapp, validarLead } from "@/lib/leads";
import { DIAGNOSTICO, OBJETIVOS, SEGMENTOS } from "@/conteudo/diagnostico";

/**
 * O contrato do lead (plano, seção 6.1): o formulário e a API validam com
 * as mesmas regras, a origem da visita vai junto e o n8n recebe o pedido
 * assinado. Sem webhook configurado, a API diz que o canal não está pronto
 * em vez de fingir que enviou.
 */

const valido = {
  nome: "Marina Ribeiro",
  whatsapp: "(41) 99999-1234",
  email: "Marina@Exemplo.com.br",
  empresa: "Loja Exemplo",
  segmento: "automotivo",
  porte: "2-5",
  objetivos: ["responder", "funil"],
  estoque: "31-80",
  sistema: "revenda-mais",
  mensagem: "Quero responder mais rápido.",
  pagina: "/diagnostico",
  origem: { utm_source: "google", gclid: "abc", referrer: "https://www.google.com", entrada: "/?utm_source=google" },
};

describe("WhatsApp", () => {
  it("aceita os formatos comuns e devolve só dígitos com 55", () => {
    expect(normalizarWhatsapp("(41) 99999-1234")).toBe("5541999991234");
    expect(normalizarWhatsapp("41999991234")).toBe("5541999991234");
    expect(normalizarWhatsapp("+55 41 9 9999-1234")).toBe("5541999991234");
    expect(normalizarWhatsapp("41 3333-1234")).toBe("554133331234");
  });

  it("recusa número curto, repetido ou celular sem o 9", () => {
    expect(normalizarWhatsapp("9999")).toBeNull();
    expect(normalizarWhatsapp("11111111111")).toBeNull();
    expect(normalizarWhatsapp("41 8 9999-1234")).toBeNull();
    expect(normalizarWhatsapp(42)).toBeNull();
  });
});

describe("validação do lead", () => {
  it("normaliza o lead válido e guarda os campos do automotivo", () => {
    const r = validarLead(valido);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.email).toBe("marina@exemplo.com.br");
    expect(r.lead.whatsapp).toBe("5541999991234");
    expect(r.lead.objetivos).toEqual(["responder", "funil"]);
    expect(r.lead.estoque).toBe("31-80");
    expect(r.lead.sistema).toBe("revenda-mais");
    expect(r.lead.origem).toEqual(valido.origem);
  });

  it("aponta cada campo obrigatório que faltou", () => {
    const r = validarLead({ nome: "A", whatsapp: "12", email: "x", empresa: "", segmento: "nada", objetivos: [] });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(Object.keys(r.erros).sort()).toEqual(["email", "empresa", "nome", "objetivos", "segmento", "whatsapp"]);
  });

  it("ignora estoque e sistema fora do automotivo, e valores fora da lista", () => {
    const r = validarLead({ ...valido, segmento: "servicos", objetivos: ["responder", "inventado"], origem: { utm_source: "x", nada: 1 } });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.lead.estoque).toBeUndefined();
    expect(r.lead.sistema).toBeUndefined();
    expect(r.lead.objetivos).toEqual(["responder"]);
    expect(r.lead.origem).toEqual({ utm_source: "x" });
  });

  it("as opções do formulário são as que a validação aceita", () => {
    for (const s of SEGMENTOS) expect(validarLead({ ...valido, segmento: s.valor }).ok).toBe(true);
    for (const o of OBJETIVOS) expect(validarLead({ ...valido, objetivos: [o.valor] }).ok).toBe(true);
  });
});

describe("origem da visita", () => {
  it("lê UTM, click IDs, a página de entrada e o referrer de fora", () => {
    const o = lerOrigem("https://v2o5.com.br/precos?utm_source=meta&fbclid=f1&x=1", "https://l.instagram.com/x");
    expect(o).toEqual({ utm_source: "meta", fbclid: "f1", entrada: "/precos?utm_source=meta&fbclid=f1&x=1", referrer: "https://l.instagram.com" });
  });

  it("não guarda referrer do próprio site", () => {
    expect(lerOrigem("https://v2o5.com.br/", "https://v2o5.com.br/precos").referrer).toBeUndefined();
  });
});

describe("rota /api/leads", () => {
  const pedido = (corpo: unknown, cabecalhos: Record<string, string> = {}) =>
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.9", ...cabecalhos },
      body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
    });

  beforeEach(() => {
    zerarLimite();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sem webhook configurado, avisa que o canal não está pronto", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "");
    const r = await POST(pedido(valido));
    expect(r.status).toBe(503);
    expect(await r.json()).toEqual({ ok: false, erro: "canal" });
  });

  it("entrega o lead ao webhook com o segredo e devolve um event_id", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    vi.stubEnv("LEADS_WEBHOOK_SECRET", "segredo");
    const fetchFalso = vi.fn(async () => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchFalso);
    const r = await POST(pedido(valido));
    expect(r.status).toBe(200);
    const corpo = (await r.json()) as { ok: boolean; event_id: string };
    expect(corpo.ok).toBe(true);
    expect(corpo.event_id).toMatch(/^Lead\.[0-9a-f-]{36}$/);
    expect(fetchFalso).toHaveBeenCalledTimes(1);
    const [url, opcoes] = fetchFalso.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://n8n.v2o5.com.br/webhook/lead");
    expect((opcoes.headers as Record<string, string>)["X-V2O5-Segredo"]).toBe("segredo");
    const enviado = JSON.parse(opcoes.body as string);
    expect(enviado.event_id).toBe(corpo.event_id);
    expect(enviado.fonte).toBe("site");
    expect(enviado.lead.whatsapp).toBe("5541999991234");
    expect(enviado.lead.origem.gclid).toBe("abc");
  });

  it("devolve os erros por campo quando o lead não passa", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    const r = await POST(pedido({ nome: "" }));
    expect(r.status).toBe(400);
    const corpo = (await r.json()) as { erros: Record<string, string> };
    expect(corpo.erros.nome).toBeDefined();
  });

  it("robô que preenche a armadilha recebe ok sem nada ser enviado", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    const fetchFalso = vi.fn();
    vi.stubGlobal("fetch", fetchFalso);
    const r = await POST(pedido({ ...valido, site: "http://spam" }));
    expect(r.status).toBe(200);
    expect(fetchFalso).not.toHaveBeenCalled();
  });

  it("limita envios por IP", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("ok")));
    for (let i = 0; i < 5; i++) expect((await POST(pedido(valido))).status).toBe(200);
    expect((await POST(pedido(valido))).status).toBe(429);
    expect((await POST(pedido(valido, { "x-forwarded-for": "198.51.100.7" }))).status).toBe(200);
  });

  it("webhook fora do ar vira erro de entrega, não sucesso", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("erro", { status: 500 })));
    expect((await POST(pedido(valido))).status).toBe(502);
  });

  it("corpo que não é JSON é recusado", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "https://n8n.v2o5.com.br/webhook/lead");
    expect((await POST(pedido("{nada"))).status).toBe(400);
  });
});

describe("textos do diagnóstico", () => {
  it("sem travessão e com as promessas de 45 minutos e 24 horas", () => {
    const tudo = JSON.stringify(DIAGNOSTICO);
    expect(tudo).not.toMatch(/[—–]/);
    expect(tudo).toContain("45 minutos");
    expect(tudo).toContain("24 horas");
  });
});
