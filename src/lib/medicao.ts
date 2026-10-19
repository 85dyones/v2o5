import { CHAVE_DA_ORIGEM } from "@/lib/origem";
import { TERCEIROS } from "@/lib/terceiros";

/**
 * A camada de dados do site, em código (plano, seção 7): o que o navegador
 * mede, com quais ferramentas e sob qual regra. Nada aqui toca o DOM na
 * importação; quem liga tudo é `components/layout/Medicao.tsx`.
 *
 * As ferramentas vêm de variáveis de ambiente públicas, resolvidas no build:
 * sem `NEXT_PUBLIC_GA4_ID` o Google Analytics não carrega; sem
 * `NEXT_PUBLIC_META_PIXEL_ID` o Pixel da Meta não carrega. As duas só entram
 * depois de a página carregar, num momento ocioso, para nunca disputarem a
 * thread com o conteúdo (lição da Motors: Pixel e GTM custavam 2,4 s de TBT).
 *
 * Base legal: legítimo interesse, com oposição em `/privacidade` (modelo da
 * Motors). A oposição fica em `localStorage` (`CHAVE_DA_MEDICAO`) e vale para
 * este navegador: com ela, nenhuma tag carrega e o servidor não envia o lead
 * à Meta. Nenhum dado pessoal passa por aqui.
 */

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push?: Fbq;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** IDs públicos, lidos no build. Vazios no preview enquanto o Dyones não os definir na Vercel. */
export const IDS = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  pixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
};

export const FORMATO = {
  ga4: /^G-[A-Z0-9]{4,20}$/,
  pixel: /^\d{6,20}$/,
};

export interface Ferramentas {
  ga4: string | null;
  pixel: string | null;
}

/** Só ID com o formato certo liga a ferramenta; lixo na variável não carrega nada. */
export function ferramentas(ids: { ga4: string; pixel: string } = IDS): Ferramentas {
  return {
    ga4: FORMATO.ga4.test(ids.ga4) ? ids.ga4 : null,
    pixel: FORMATO.pixel.test(ids.pixel) ? ids.pixel : null,
  };
}

export const CHAVE_DA_MEDICAO = "v2o5.medicao";
export const CHAVE_DO_AVISO = "v2o5.aviso";
export const CHAVE_DO_LEAD = "v2o5.lead";
export const EVENTO_DA_MEDICAO = "v2o5-medicao-mudou";

/** Cookies que as ferramentas gravam; a oposição apaga estes e os `_ga_<id>`. */
export const COOKIES_DE_MEDICAO = ["_ga", "_gid", "_fbp", "_fbc"];

/** Depois do `load`, quanto esperar no máximo por um momento ocioso antes de carregar as tags. */
export const ESPERA_MAXIMA_MS = 2000;

type Armazem = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function armazemLocal(): Armazem | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function armazemDaSessao(): Armazem | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function medicaoDesligada(armazem: Armazem | null = armazemLocal()): boolean {
  try {
    return armazem?.getItem(CHAVE_DA_MEDICAO) === "desligada";
  } catch {
    return false;
  }
}

/** Ferramentas que vão carregar neste navegador: ID configurado e sem oposição. */
export function ferramentasAtivas(ids = ferramentas(), desligada = medicaoDesligada()): Ferramentas {
  if (desligada) return { ga4: null, pixel: null };
  return ids;
}

export function lerCookie(nome: string, cookies = typeof document === "undefined" ? "" : document.cookie): string | null {
  for (const parte of cookies.split(";")) {
    const [chave, ...resto] = parte.trim().split("=");
    if (chave === nome) return resto.join("=") || null;
  }
  return null;
}

/** Nomes dos cookies de medição presentes, inclusive os `_ga_<id>` do GA4. */
export function cookiesDeMedicaoPresentes(cookies = typeof document === "undefined" ? "" : document.cookie): string[] {
  return cookies
    .split(";")
    .map((p) => p.trim().split("=")[0])
    .filter((nome) => nome && (COOKIES_DE_MEDICAO.includes(nome) || nome.startsWith("_ga_")));
}

/** Apaga um cookie no caminho raiz, no host atual e no domínio pai (onde o GA e a Meta gravam). */
export function apagarCookie(nome: string, hostname = location.hostname): void {
  const dominios = [undefined, hostname, `.${hostname}`];
  const partes = hostname.split(".");
  if (partes.length > 2) dominios.push(`.${partes.slice(-2).join(".")}`);
  for (const dominio of dominios) {
    document.cookie = `${nome}=; Max-Age=0; path=/${dominio ? `; domain=${dominio}` : ""}`;
  }
}

/**
 * A oposição (LGPD, art. 18, § 2º): grava a escolha, apaga os cookies das
 * ferramentas e a origem da visita. Vale a partir da próxima página; nesta,
 * nada mais é enviado porque o componente deixa de chamar as ferramentas.
 */
export function desligarMedicao(): void {
  try {
    armazemLocal()?.setItem(CHAVE_DA_MEDICAO, "desligada");
  } catch {
    // Sem armazenamento a escolha não persiste; os cookies ainda são apagados.
  }
  for (const nome of cookiesDeMedicaoPresentes()) apagarCookie(nome);
  try {
    armazemDaSessao()?.removeItem(CHAVE_DA_ORIGEM);
  } catch {
    // Sem armazenamento não há origem guardada.
  }
  window.dispatchEvent(new Event(EVENTO_DA_MEDICAO));
}

export function religarMedicao(): void {
  try {
    armazemLocal()?.removeItem(CHAVE_DA_MEDICAO);
  } catch {
    // Nada a desfazer.
  }
  window.dispatchEvent(new Event(EVENTO_DA_MEDICAO));
}

export function avisoVisto(armazem: Armazem | null = armazemLocal()): boolean {
  try {
    return armazem?.getItem(CHAVE_DO_AVISO) === "visto";
  } catch {
    return true;
  }
}

export function marcarAvisoVisto(armazem: Armazem | null = armazemLocal()): void {
  try {
    armazem?.setItem(CHAVE_DO_AVISO, "visto");
  } catch {
    // Sem armazenamento o aviso volta na próxima visita; aceitável.
  }
}

/** Tipos de página do evento `page_view` (plano, 7.3: `page_type` e `service_line`). */
export type TipoDePagina =
  | "home"
  | "solucao"
  | "segmento"
  | "case"
  | "precos"
  | "diagnostico"
  | "recebido"
  | "sobre"
  | "guia"
  | "privacidade"
  | "nao-encontrada"
  | "outra";

/** Linha de preço (`conteudo/precos.ts`) de cada página de solução. `tests/medicao.test.ts` confere com `conteudo/solucoes.ts`. */
export const LINHA_DA_ROTA: Record<string, string> = {
  "/criacao-de-sites": "sites",
  "/agente-de-ia-para-whatsapp": "agente",
  "/automacao-com-ia": "automacao",
  "/crm-com-whatsapp": "crm",
  "/rastreamento-de-conversoes": "rastreamento",
};

export interface ContextoDaPagina {
  page_type: TipoDePagina;
  service_line?: string;
  segment?: string;
}

export function contextoDaPagina(pathname: string): ContextoDaPagina {
  const rota = pathname.replace(/\/+$/, "") || "/";
  if (rota === "/") return { page_type: "home" };
  if (rota in LINHA_DA_ROTA) return { page_type: "solucao", service_line: LINHA_DA_ROTA[rota] };
  if (rota.startsWith("/segmentos/")) return { page_type: "segmento", segment: rota.slice("/segmentos/".length) };
  if (rota.startsWith("/cases/")) return { page_type: "case" };
  if (rota === "/precos") return { page_type: "precos" };
  if (rota === "/diagnostico") return { page_type: "diagnostico" };
  if (rota === "/diagnostico/recebido") return { page_type: "recebido" };
  if (rota === "/sobre") return { page_type: "sobre" };
  if (rota.startsWith("/guias")) return { page_type: "guia" };
  if (rota === "/privacidade") return { page_type: "privacidade" };
  if (rota === "/nao-encontrada") return { page_type: "nao-encontrada" };
  return { page_type: "outra" };
}

type Parametros = Record<string, string | number | boolean | undefined>;

export interface EventoMedido {
  nome: string;
  parametros: Parametros;
  /** O evento correspondente no Pixel, quando há um. `padrao` diz se é evento padrão da Meta (`track`) ou custom (`trackCustom`). */
  meta?: { nome: string; padrao: boolean; parametros: Parametros };
}

/**
 * O evento de um clique em elemento com `data-evento` (os CTAs e os links de
 * WhatsApp e e-mail marcam-se assim nos Server Components, sem JavaScript
 * próprio). `data-local` diz onde o botão está; o rótulo é o texto visível.
 *
 * `click_whatsapp` depois de um lead nesta sessão vira
 * `click_whatsapp_pos_lead`: sem GTM para filtrar por parâmetro, o nome
 * separa o que conta como conversão do que é a mesma pessoa adiantando a
 * conversa (plano, 7.3).
 */
export function eventoDoClique(el: Element, posLead: boolean): EventoMedido | null {
  const nome = el.getAttribute("data-evento");
  if (!nome) return null;
  const local = el.getAttribute("data-local") ?? "";
  const rotulo = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
  switch (nome) {
    case "cta_click":
      return { nome, parametros: { cta_location: local, cta_label: rotulo } };
    case "click_whatsapp":
      return {
        nome: posLead ? "click_whatsapp_pos_lead" : "click_whatsapp",
        parametros: { whatsapp_location: local, pos_lead: posLead ? "sim" : "nao" },
        meta: posLead ? undefined : { nome: "Contact", padrao: true, parametros: { content_name: local } },
      };
    case "click_email":
      return { nome, parametros: { email_location: local } };
    default:
      return { nome, parametros: { location: local, label: rotulo } };
  }
}

export function leadNestaSessao(armazem: Armazem | null = armazemDaSessao()): boolean {
  try {
    return !!armazem?.getItem(CHAVE_DO_LEAD);
  } catch {
    return false;
  }
}

/** Manda um evento às ferramentas que estiverem preparadas; sem elas, não faz nada. */
export function enviar(evento: EventoMedido): void {
  window.gtag?.("event", evento.nome, evento.parametros);
  if (evento.meta) window.fbq?.(evento.meta.padrao ? "track" : "trackCustom", evento.meta.nome, evento.meta.parametros);
}

export function paginaVista(pathname: string): void {
  window.gtag?.("event", "page_view", { ...contextoDaPagina(pathname) });
  window.fbq?.("track", "PageView");
}

export function formularioIniciado(form_id: string): void {
  window.gtag?.("event", "form_start", { form_id });
}

/**
 * O envio aceito pelo servidor. O `event_id` é o mesmo que `/api/leads`
 * manda à Meta pelo servidor: o Pixel e a API de Conversões contam a mesma
 * conversão uma vez. Depois dele, os cliques no WhatsApp desta sessão são
 * `pos_lead`.
 */
export function leadGerado(dados: { event_id: string; form_id: string; lead_type: string; segmento?: string }): void {
  window.gtag?.("event", "generate_lead", { ...dados });
  window.fbq?.("track", "Lead", { content_name: dados.form_id, content_category: dados.segmento }, { eventID: dados.event_id });
  try {
    armazemDaSessao()?.setItem(CHAVE_DO_LEAD, dados.event_id);
  } catch {
    // Sem armazenamento, o clique seguinte no WhatsApp conta como novo; aceitável.
  }
}

/** Identificadores que o Pixel grava e a API de Conversões usa para casar o evento. */
export function identificadoresDaMeta(cookies?: string): { fbp?: string; fbc?: string } {
  const ids: { fbp?: string; fbc?: string } = {};
  const fbp = lerCookie("_fbp", cookies);
  const fbc = lerCookie("_fbc", cookies);
  if (fbp) ids.fbp = fbp;
  if (fbc) ids.fbc = fbc;
  return ids;
}

/**
 * Prepara as filas (`dataLayer`/`gtag` e `fbq`) antes de os scripts
 * existirem, no formato que o gtag.js e o fbevents.js esperam: o que for
 * enviado antes da carga fica guardado e sai quando o script chegar.
 */
export function prepararFerramentas({ ga4, pixel }: Ferramentas, win: Window = window): void {
  if (ga4 && !win.gtag) {
    win.dataLayer = win.dataLayer ?? [];
    win.gtag = function gtag() {
      // O gtag.js reconhece o objeto `arguments`, não um array.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    win.gtag("js", new Date());
    win.gtag("config", ga4, { send_page_view: false });
  }
  if (pixel && !win.fbq) {
    const fila: Fbq = function fbq(...args: unknown[]) {
      if (fila.callMethod) fila.callMethod(...args);
      else fila.queue.push(args);
    } as Fbq;
    fila.queue = [];
    fila.loaded = true;
    fila.version = "2.0";
    fila.push = fila;
    win.fbq = fila;
    win._fbq = win._fbq ?? fila;
    // Sem a coleta automática de cliques e formulários do Pixel: só o que este código envia.
    win.fbq("set", "autoConfig", false, pixel);
    win.fbq("init", pixel);
  }
}

export function urlDoScript(ferramenta: "ga4" | "pixel", id: string): string {
  return ferramenta === "ga4"
    ? `${TERCEIROS.google.script}/gtag/js?id=${encodeURIComponent(id)}`
    : `${TERCEIROS.meta.script}/en_US/fbevents.js`;
}

/** Injeta os scripts das ferramentas preparadas. Idempotente por URL. */
export function carregarFerramentas({ ga4, pixel }: Ferramentas, doc: Document = document): void {
  const urls: string[] = [];
  if (ga4) urls.push(urlDoScript("ga4", ga4));
  if (pixel) urls.push(urlDoScript("pixel", pixel));
  for (const src of urls) {
    if (doc.querySelector(`script[src="${src}"]`)) continue;
    const script = doc.createElement("script");
    script.src = src;
    script.async = true;
    doc.head.appendChild(script);
  }
}

/**
 * Chama `tarefa` depois do `load` da página, no primeiro momento ocioso
 * (ou em `ESPERA_MAXIMA_MS`, o que vier antes). Devolve o cancelamento.
 */
export function depoisDoConteudo(tarefa: () => void, win: Window = window): () => void {
  let cancelado = false;
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  let ocioso: number | undefined;
  const executar = () => {
    if (!cancelado) tarefa();
  };
  const quandoOcioso = () => {
    if (cancelado) return;
    if (typeof win.requestIdleCallback === "function") ocioso = win.requestIdleCallback(executar, { timeout: ESPERA_MAXIMA_MS });
    else temporizador = setTimeout(executar, ESPERA_MAXIMA_MS);
  };
  if (win.document.readyState === "complete") quandoOcioso();
  else win.addEventListener("load", quandoOcioso, { once: true });
  return () => {
    cancelado = true;
    win.removeEventListener("load", quandoOcioso);
    if (temporizador) clearTimeout(temporizador);
    if (ocioso !== undefined && typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(ocioso);
  };
}
