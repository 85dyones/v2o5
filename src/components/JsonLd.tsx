import { blocoJsonLd } from "@/lib/schema";

/** O grafo JSON-LD da página. Bloco de dados: a CSP não o trata como script. */
export default function JsonLd({ grafo }: { grafo: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blocoJsonLd(grafo) }} />;
}
