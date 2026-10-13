/**
 * Os únicos domínios de fora que o site carrega ou chama (plano, seção 7).
 * Daqui saem a Content-Security-Policy (`next.config.ts`), os scripts que
 * `lib/medicao.ts` injeta e a lista que `/privacidade` publica. Entrar um
 * domínio novo exige passar pelos três; `tests/medicao.test.ts` cobra.
 *
 * Sem dependência de ambiente, para o `next.config.ts` poder importar.
 */
export const TERCEIROS = {
  google: {
    nome: "Google Analytics 4",
    /** O gtag.js é servido pelo Google Tag Manager, mesmo sem contêiner do GTM. */
    script: "https://www.googletagmanager.com",
    coleta: ["https://*.google-analytics.com", "https://*.analytics.google.com"],
  },
  meta: {
    nome: "Pixel da Meta",
    script: "https://connect.facebook.net",
    coleta: ["https://www.facebook.com"],
  },
} as const;

/** Domínios com script: entram em `script-src`. */
export const SCRIPTS_DE_TERCEIROS = [TERCEIROS.google.script, TERCEIROS.meta.script];

/** Domínios que recebem os dados: entram em `connect-src` e `img-src`. */
export const COLETA_DE_TERCEIROS = [...TERCEIROS.google.coleta, ...TERCEIROS.meta.coleta];
