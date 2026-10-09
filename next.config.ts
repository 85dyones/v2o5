import type { NextConfig } from "next";

const emDesenvolvimento = process.env.NODE_ENV === "development";

/**
 * CSP sem nonce, no modelo "Without Nonces" do guia do Next 16.
 *
 * Nonce exige renderização dinâmica (um valor novo por requisição) e as
 * páginas do site são estáticas: o custo seria TTFB em toda visita. Por isso
 * `script-src` aceita inline (o Next escreve o payload RSC em scripts inline).
 * O resto fecha: nada de fora da origem, nada de `<object>`, nenhum site pode
 * pôr a página num iframe, formulário só posta para a própria origem.
 *
 * Quando entrarem GA4, Pixel da Meta ou Turnstile (fase 1), os domínios deles
 * entram aqui, um por um, e `tests/cabecalhos.test.ts` muda junto.
 */
export const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${emDesenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const CABECALHOS_DE_SEGURANCA = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Sem `preload`: entrar na lista dos navegadores é difícil de desfazer.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/**
 * Endereços do WordPress que têm para onde ir (`memory/context/seo.md`).
 * 301 porque é a migração de um site que já está indexado. `/hello-world/` e
 * `/test-post/` não têm destino: respondem 410 nos route handlers de mesmo
 * nome. `tests/redirecionamentos.test.ts` confere a lista.
 */
export const REDIRECIONAMENTOS_DO_WORDPRESS = [
  { source: "/jornada", destination: "/sobre" },
  { source: "/solucoes", destination: "/" },
  { source: "/contrate", destination: "/diagnostico" },
  { source: "/politica-privacidade", destination: "/privacidade" },
  { source: "/blog", destination: "/guias" },
  { source: "/author/dyones", destination: "/sobre" },
  { source: "/feed", destination: "/sitemap.xml" },
  { source: "/comments/feed", destination: "/sitemap.xml" },
  { source: "/:arquivo(wp-sitemap.*\\.xml)", destination: "/sitemap.xml" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: CABECALHOS_DE_SEGURANCA }];
  },
  async redirects() {
    return REDIRECIONAMENTOS_DO_WORDPRESS.map((r) => ({ ...r, statusCode: 301 as const }));
  },
};

export default nextConfig;
