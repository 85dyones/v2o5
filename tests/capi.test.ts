import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import {
  GRAPH_API,
  configDoCapi,
  enviarAoCapi,
  eventoLead,
  fbcDoFbclid,
  normalizarNome,
  sha256,
} from "@/lib/capi";
import { validarLead, type Lead } from "@/lib/leads";

/**
 * A API de Conversões da Meta (plano, 7.2): o mesmo `event_id` do navegador,
 * dado pessoal só em hash, token fora da URL, e falha que nunca derruba o
 * lead. Sem `META_PIXEL_ID` e `META_CAPI_TOKEN`, nada é enviado.
 */

const hex = (v: string) => createHash("sha256").update(v).digest("hex");

function lead(extra: Partial<Lead["origem"]> = {}): Lead {
  const v = validarLead({
    nome: "Marina Ribeiro",
    whatsapp: "(41) 99999-1234",
    email: "Marina@Exemplo.com.br",
    empresa: "Loja Exemplo",
    segmento: "automotivo",
    objetivos: ["responder"],
    pagina: "/diagnostico",
    origem: { utm_source: "meta", ...extra },
  });
  if (!v.ok) throw new Error("lead de teste inválido");
  return v.lead;
}

describe("configuração", () => {
  it("sem as duas variáveis, não há CAPI", () => {
    expect(configDoCapi({})).toBeNull();
    expect(configDoCapi({ META_PIXEL_ID: "123456789012345" })).toBeNull();
    expect(configDoCapi({ META_CAPI_TOKEN: "x".repeat(40) })).toBeNull();
    expect(configDoCapi({ META_PIXEL_ID: "abc", META_CAPI_TOKEN: "x".repeat(40) })).toBeNull();
    expect(configDoCapi({ META_PIXEL_ID: "123456789012345", META_CAPI_TOKEN: "curto" })).toBeNull();
  });

  it("com as duas, lê pixel, token e o código de teste opcional", () => {
    const token = "EAAB".padEnd(60, "x");
    expect(configDoCapi({ META_PIXEL_ID: " 123456789012345 ", META_CAPI_TOKEN: token })).toEqual({
      pixel: "123456789012345",
      token,
    });
    expect(configDoCapi({ META_PIXEL_ID: "123456789012345", META_CAPI_TOKEN: token, META_CAPI_TEST_CODE: "TEST123" })).toEqual({
      pixel: "123456789012345",
      token,
      codigoDeTeste: "TEST123",
    });
  });
});

describe("o evento Lead", () => {
  const ctx = { event_id: "Lead.abc", url: "https://v2o5.com.br/diagnostico", ip: "203.0.113.9", userAgent: "Mozilla/5.0", agora: 1_760_000_000 };

  it("leva e-mail, telefone, nome e país só em hash, como a Meta exige", () => {
    const e = eventoLead(lead(), ctx);
    expect(e.user_data.em).toEqual([hex("marina@exemplo.com.br")]);
    expect(e.user_data.ph).toEqual([hex("5541999991234")]);
    expect(e.user_data.fn).toEqual([hex("marina")]);
    expect(e.user_data.ln).toEqual([hex("ribeiro")]);
    expect(e.user_data.country).toEqual([hex("br")]);
    const texto = JSON.stringify(e);
    for (const claro of ["marina", "Marina", "exemplo.com.br", "99999", "Ribeiro"]) expect(texto).not.toContain(claro);
  });

  it("identifica o evento como o mesmo do navegador e da página de origem", () => {
    const e = eventoLead(lead(), ctx);
    expect(e).toMatchObject({
      event_name: "Lead",
      event_id: "Lead.abc",
      event_time: 1_760_000_000,
      event_source_url: "https://v2o5.com.br/diagnostico",
      action_source: "website",
      custom_data: { content_name: "diagnostico", content_category: "automotivo", lead_type: "diagnostico" },
    });
    expect(e.user_data.client_ip_address).toBe("203.0.113.9");
    expect(e.user_data.client_user_agent).toBe("Mozilla/5.0");
  });

  it("repassa os identificadores do Pixel e monta o fbc a partir do fbclid quando não há cookie", () => {
    const com = eventoLead(lead({ fbp: "fb.1.1760000000000.123456", fbc: "fb.1.1760000000000.IwAR0abc" }), ctx);
    expect(com.user_data.fbp).toBe("fb.1.1760000000000.123456");
    expect(com.user_data.fbc).toBe("fb.1.1760000000000.IwAR0abc");
    const soClique = eventoLead(lead({ fbclid: "IwAR0xyz" }), ctx);
    expect(soClique.user_data.fbc).toBe(fbcDoFbclid("IwAR0xyz", 1_760_000_000_000));
    expect(soClique.user_data.fbp).toBeUndefined();
    const nenhum = eventoLead(lead(), ctx);
    expect(nenhum.user_data.fbc).toBeUndefined();
  });

  it("omite ip e navegador quando não há", () => {
    const e = eventoLead(lead(), { event_id: "Lead.x", url: "https://v2o5.com.br/" });
    expect(e.user_data.client_ip_address).toBeUndefined();
    expect(e.user_data.client_user_agent).toBeUndefined();
    expect(e.event_time).toBeGreaterThan(1_700_000_000);
  });

  it("normaliza o nome sem acento nem pontuação e um nome só não vira sobrenome", () => {
    expect(normalizarNome("  José da Silva-Neto ")).toBe("jose da silvaneto");
    expect(sha256("br")).toBe(hex("br"));
    const v = validarLead({ ...JSON.parse(JSON.stringify(lead())), nome: "Zé" });
    if (!v.ok) throw new Error("inválido");
    const e = eventoLead(v.lead, ctx);
    expect(e.user_data.fn).toEqual([hex("ze")]);
    expect(e.user_data.ln).toBeUndefined();
  });
});

describe("envio", () => {
  const config = { pixel: "123456789012345", token: "EAAB".padEnd(60, "x") };
  const evento = eventoLead(lead(), { event_id: "Lead.abc", url: "https://v2o5.com.br/diagnostico", agora: 1 });

  it("posta na Graph API com o token no corpo, nunca na URL", async () => {
    const fetchFalso = vi.fn(async () => new Response("{}", { status: 200 }));
    expect(await enviarAoCapi(evento, { ...config, codigoDeTeste: "TEST1" }, { fetch: fetchFalso as unknown as typeof fetch })).toBe(true);
    const [url, opcoes] = fetchFalso.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(`${GRAPH_API}/123456789012345/events`);
    expect(url).not.toContain(config.token);
    const corpo = JSON.parse(opcoes.body as string);
    expect(corpo.access_token).toBe(config.token);
    expect(corpo.test_event_code).toBe("TEST1");
    expect(corpo.data).toEqual([evento]);
  });

  it("resposta de erro ou rede fora não lançam: devolvem false", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const erro = vi.fn(async () => new Response("não", { status: 400 }));
    expect(await enviarAoCapi(evento, config, { fetch: erro as unknown as typeof fetch })).toBe(false);
    const fora = vi.fn(async () => {
      throw new Error("rede");
    });
    expect(await enviarAoCapi(evento, config, { fetch: fora as unknown as typeof fetch })).toBe(false);
    vi.restoreAllMocks();
  });
});
