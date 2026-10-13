import { createHash } from "node:crypto";
import type { Lead } from "@/lib/leads";

/**
 * A API de Conversões da Meta, pelo servidor (plano, seção 7.2): o lead
 * aceito por `/api/leads` vira um evento `Lead` com o mesmo `event_id` que o
 * Pixel manda do navegador, e a Meta conta a conversão uma vez. Chega mesmo
 * quando o navegador bloqueia o Pixel.
 *
 * Dados pessoais vão só em hash SHA-256, como a Meta exige (e-mail,
 * telefone, nome, país); IP, navegador e os identificadores do Pixel
 * (`_fbp`, `_fbc`) vão em claro, que é o formato que a API aceita. O token
 * fica no corpo, nunca na URL. Só roda com `META_PIXEL_ID` e
 * `META_CAPI_TOKEN`; `META_CAPI_TEST_CODE` manda o evento à aba de teste.
 */

export const GRAPH_API = "https://graph.facebook.com/v22.0";
const TEMPO_LIMITE_MS = 4000;

export interface ConfigDoCapi {
  pixel: string;
  token: string;
  codigoDeTeste?: string;
}

export function configDoCapi(env: Record<string, string | undefined> = process.env): ConfigDoCapi | null {
  const pixel = env.META_PIXEL_ID?.trim() ?? "";
  const token = env.META_CAPI_TOKEN?.trim() ?? "";
  if (!/^\d{6,20}$/.test(pixel) || token.length < 20) return null;
  const codigoDeTeste = env.META_CAPI_TEST_CODE?.trim();
  return codigoDeTeste ? { pixel, token, codigoDeTeste } : { pixel, token };
}

export function sha256(valor: string): string {
  return createHash("sha256").update(valor, "utf8").digest("hex");
}

/** Normalização que a Meta pede antes do hash: minúsculas, sem espaços nas pontas. */
export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Só dígitos, com o código do país (o lead já vem como `55...`). */
export function normalizarTelefone(telefone: string): string {
  return telefone.replace(/\D/g, "");
}

/** Minúsculas, sem acentos nem pontuação, como a Meta normaliza nomes. */
export function normalizarNome(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim();
}

export interface UserData {
  em: string[];
  ph: string[];
  fn?: string[];
  ln?: string[];
  country: string[];
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
}

export interface EventoCapi {
  event_name: "Lead";
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: "website";
  user_data: UserData;
  custom_data: { content_name: string; content_category: string; lead_type: string };
}

export interface ContextoDoEvento {
  event_id: string;
  url: string;
  ip?: string;
  userAgent?: string;
  /** Em segundos (padrão: agora). */
  agora?: number;
}

export function eventoLead(lead: Lead, ctx: ContextoDoEvento): EventoCapi {
  const partes = normalizarNome(lead.nome).split(/\s+/).filter(Boolean);
  const user_data: UserData = {
    em: [sha256(normalizarEmail(lead.email))],
    ph: [sha256(normalizarTelefone(lead.whatsapp))],
    country: [sha256("br")],
  };
  if (partes[0]) user_data.fn = [sha256(partes[0])];
  if (partes.length > 1) user_data.ln = [sha256(partes[partes.length - 1])];
  if (ctx.ip) user_data.client_ip_address = ctx.ip;
  if (ctx.userAgent) user_data.client_user_agent = ctx.userAgent.slice(0, 500);
  if (lead.origem.fbp) user_data.fbp = lead.origem.fbp;
  const fbc = lead.origem.fbc ?? (lead.origem.fbclid ? fbcDoFbclid(lead.origem.fbclid, (ctx.agora ?? Math.floor(Date.now() / 1000)) * 1000) : undefined);
  if (fbc) user_data.fbc = fbc;
  return {
    event_name: "Lead",
    event_time: ctx.agora ?? Math.floor(Date.now() / 1000),
    event_id: ctx.event_id,
    event_source_url: ctx.url,
    action_source: "website",
    user_data,
    custom_data: { content_name: "diagnostico", content_category: lead.segmento, lead_type: "diagnostico" },
  };
}

/** O `_fbc` que o Pixel montaria a partir do `fbclid` da URL: `fb.1.<ms>.<fbclid>`. */
export function fbcDoFbclid(fbclid: string, agoraMs: number): string {
  return `fb.1.${agoraMs}.${fbclid}`;
}

export interface OpcoesDeEnvio {
  fetch?: typeof fetch;
  tempoLimiteMs?: number;
}

/** Envia o evento. Nunca lança: a conversão é secundária ao lead, que já foi aceito. */
export async function enviarAoCapi(evento: EventoCapi, config: ConfigDoCapi, opcoes: OpcoesDeEnvio = {}): Promise<boolean> {
  const buscar = opcoes.fetch ?? globalThis.fetch;
  const corpo: Record<string, unknown> = { data: [evento], access_token: config.token };
  if (config.codigoDeTeste) corpo.test_event_code = config.codigoDeTeste;
  const controle = new AbortController();
  const relogio = setTimeout(() => controle.abort(), opcoes.tempoLimiteMs ?? TEMPO_LIMITE_MS);
  try {
    const resposta = await buscar(`${GRAPH_API}/${config.pixel}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
      signal: controle.signal,
    });
    if (!resposta.ok) console.warn(`[capi] Meta respondeu ${resposta.status} ao evento ${evento.event_id}`);
    return resposta.ok;
  } catch {
    console.warn(`[capi] evento ${evento.event_id} não entregue`);
    return false;
  } finally {
    clearTimeout(relogio);
  }
}
