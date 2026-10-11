import { ESTOQUES, OBJETIVOS, PORTES, SEGMENTOS, SISTEMAS } from "@/conteudo/diagnostico";

/**
 * O lead do diagnóstico: validação e normalização, em funções puras que o
 * formulário e a rota `/api/leads` compartilham (`tests/leads.test.ts`).
 * Guarda a origem da visita (primeiro toque), que é a promessa dos cartões:
 * "cada contato chega com a origem gravada".
 */

export const CHAVES_DE_ORIGEM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type Origem = Partial<Record<(typeof CHAVES_DE_ORIGEM)[number], string>> & {
  referrer?: string;
  /** Primeira página da visita (caminho e busca). */
  entrada?: string;
};

export interface Lead {
  nome: string;
  whatsapp: string;
  email: string;
  empresa: string;
  segmento: (typeof SEGMENTOS)[number]["valor"];
  porte?: (typeof PORTES)[number]["valor"];
  objetivos: (typeof OBJETIVOS)[number]["valor"][];
  estoque?: (typeof ESTOQUES)[number]["valor"];
  sistema?: (typeof SISTEMAS)[number]["valor"];
  mensagem?: string;
  /** Página em que o formulário foi enviado. */
  pagina?: string;
  origem: Origem;
}

const LIMITES = { nome: 120, email: 160, empresa: 120, mensagem: 1500, origem: 300 };

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Só dígitos, com o 55 na frente. Aceita (41) 99999-9999, 41999999999, +55... */
export function normalizarWhatsapp(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  let d = valor.replace(/\D/g, "");
  if (d.startsWith("55") && (d.length === 12 || d.length === 13)) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return null;
  if (d.length === 11 && d[2] !== "9") return null;
  if (/^(\d)\1+$/.test(d)) return null;
  return `55${d}`;
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor) && valor.length <= LIMITES.email;
}

/** Lê UTMs, click IDs e referrer de uma URL de entrada. */
export function lerOrigem(url: string, referrer = ""): Origem {
  const origem: Origem = {};
  try {
    const u = new URL(url, "https://v2o5.com.br");
    for (const chave of CHAVES_DE_ORIGEM) {
      const v = u.searchParams.get(chave);
      if (v) origem[chave] = v.slice(0, LIMITES.origem);
    }
    origem.entrada = `${u.pathname}${u.search}`.slice(0, LIMITES.origem);
  } catch {
    // URL inválida: fica sem entrada.
  }
  if (referrer) {
    try {
      const r = new URL(referrer);
      if (r.hostname !== "v2o5.com.br" && !r.hostname.endsWith(".v2o5.com.br")) origem.referrer = r.origin;
    } catch {
      // referrer inválido: ignora.
    }
  }
  return origem;
}

function origemValida(v: unknown): Origem {
  if (!v || typeof v !== "object") return {};
  const o = v as Record<string, unknown>;
  const origem: Origem = {};
  for (const chave of CHAVES_DE_ORIGEM) {
    const t = texto(o[chave], LIMITES.origem);
    if (t) origem[chave] = t;
  }
  const referrer = texto(o.referrer, LIMITES.origem);
  if (referrer) origem.referrer = referrer;
  const entrada = texto(o.entrada, LIMITES.origem);
  if (entrada) origem.entrada = entrada;
  return origem;
}

const entre = <T extends readonly { valor: string }[]>(lista: T, v: unknown): T[number]["valor"] | undefined =>
  lista.find((x) => x.valor === v)?.valor;

export type Validacao = { ok: true; lead: Lead } | { ok: false; erros: Partial<Record<keyof Lead, string>> };

/** Valida o que veio do formulário e devolve o lead limpo, ou os erros por campo. */
export function validarLead(dados: unknown): Validacao {
  const d = (dados && typeof dados === "object" ? dados : {}) as Record<string, unknown>;
  const erros: Partial<Record<keyof Lead, string>> = {};

  const nome = texto(d.nome, LIMITES.nome);
  if (nome.length < 2) erros.nome = "Diga como podemos te chamar.";

  const whatsapp = normalizarWhatsapp(d.whatsapp);
  if (!whatsapp) erros.whatsapp = "Informe o WhatsApp com DDD.";

  const email = texto(d.email, LIMITES.email).toLowerCase();
  if (!emailValido(email)) erros.email = "Informe um e-mail válido.";

  const empresa = texto(d.empresa, LIMITES.empresa);
  if (empresa.length < 2) erros.empresa = "Diga o nome da empresa.";

  const segmento = entre(SEGMENTOS, d.segmento);
  if (!segmento) erros.segmento = "Escolha o segmento.";

  const objetivosBrutos = Array.isArray(d.objetivos) ? d.objetivos : [];
  const objetivos = [...new Set(objetivosBrutos.map((o) => entre(OBJETIVOS, o)).filter((o): o is NonNullable<typeof o> => !!o))];
  if (objetivos.length === 0) erros.objetivos = "Marque pelo menos um objetivo.";

  if (Object.keys(erros).length) return { ok: false, erros };

  const lead: Lead = {
    nome,
    whatsapp: whatsapp!,
    email,
    empresa,
    segmento: segmento!,
    objetivos,
    origem: origemValida(d.origem),
  };
  const porte = entre(PORTES, d.porte);
  if (porte) lead.porte = porte;
  if (segmento === "automotivo") {
    const estoque = entre(ESTOQUES, d.estoque);
    if (estoque) lead.estoque = estoque;
    const sistema = entre(SISTEMAS, d.sistema);
    if (sistema) lead.sistema = sistema;
  }
  const mensagem = texto(d.mensagem, LIMITES.mensagem);
  if (mensagem) lead.mensagem = mensagem;
  const pagina = texto(d.pagina, LIMITES.origem);
  if (pagina) lead.pagina = pagina;
  return { ok: true, lead };
}
