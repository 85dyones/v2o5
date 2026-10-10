/**
 * Post de exemplo do WordPress antigo, que nunca devia ter ido ao ar. 410
 * diz ao buscador que saiu de vez (`memory/context/seo.md`).
 */
export function GET() {
  return new Response("Esta página foi removida.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
