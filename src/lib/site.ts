/**
 * Endereço público do site. Base do canonical, do sitemap e do JSON-LD.
 * É o `www` porque é o domínio principal na Vercel (o apex redireciona para
 * ele com 308 desde a troca do DNS, 16/10): canônico e endereço servido têm
 * de ser o mesmo.
 */
export const SITE_URL = "https://www.v2o5.com.br";
