import { randomUUID } from "node:crypto";
import { validarLead } from "@/lib/leads";

/**
 * Recebe o pedido de diagnóstico, valida (`lib/leads.ts`) e entrega ao n8n
 * da V2O5 pelo webhook em `LEADS_WEBHOOK_URL`, assinado com
 * `LEADS_WEBHOOK_SECRET` no cabeçalho `X-V2O5-Segredo`. O n8n cuida do
 * resto (aviso no WhatsApp, Chatwoot, planilha ou Supabase).
 *
 * Proteções sem serviço de fora: campo armadilha (`site`, que só robô
 * preenche), limite por IP e tamanho máximo do corpo. Turnstile entra quando
 * a CSP ganhar o domínio dele (`next.config.ts`).
 */

const JANELA_MS = 10 * 60 * 1000;
const MAXIMO_NA_JANELA = 5;
const TAMANHO_MAXIMO = 16 * 1024;
const TEMPO_LIMITE_MS = 8000;

const envios = new Map<string, number[]>();

function passouDoLimite(ip: string, agora = Date.now()): boolean {
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= MAXIMO_NA_JANELA) {
    envios.set(ip, recentes);
    return true;
  }
  recentes.push(agora);
  envios.set(ip, recentes);
  return false;
}

/** Só para teste: zera o limite por IP. */
export function zerarLimite(): void {
  envios.clear();
}

const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

export async function POST(req: Request): Promise<Response> {
  const tamanho = Number(req.headers.get("content-length") ?? 0);
  if (tamanho > TAMANHO_MAXIMO) return json({ ok: false, erro: "tamanho" }, 413);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "desconhecido";
  if (passouDoLimite(ip)) return json({ ok: false, erro: "limite" }, 429);

  let dados: unknown;
  try {
    dados = await req.json();
  } catch {
    return json({ ok: false, erro: "json" }, 400);
  }

  // Armadilha: humano não vê o campo; robô preenche. Responde como se tivesse ido.
  if (dados && typeof dados === "object" && (dados as { site?: unknown }).site) {
    return json({ ok: true, event_id: `Lead.${randomUUID()}` });
  }

  const validacao = validarLead(dados);
  if (!validacao.ok) return json({ ok: false, erros: validacao.erros }, 400);

  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return json({ ok: false, erro: "canal" }, 503);

  const event_id = `Lead.${randomUUID()}`;
  const corpo = {
    event_id,
    recebido_em: new Date().toISOString(),
    fonte: "site",
    lead: validacao.lead,
  };

  const controle = new AbortController();
  const relogio = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-V2O5-Segredo": process.env.LEADS_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(corpo),
      signal: controle.signal,
    });
    if (!resposta.ok) return json({ ok: false, erro: "entrega" }, 502);
  } catch {
    return json({ ok: false, erro: "entrega" }, 502);
  } finally {
    clearTimeout(relogio);
  }

  return json({ ok: true, event_id });
}
