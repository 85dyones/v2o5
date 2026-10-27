import type { MetadataRoute } from "next";
import { guiasPublicados } from "@/conteudo/guias";
import { PAGINAS } from "@/conteudo/paginas";
import { SITE_URL } from "@/lib/site";

/** Só as páginas prontas e os guias publicados, com a data real da última mudança de conteúdo. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = PAGINAS.filter((p) => p.pronta).map((p) => ({
    url: `${SITE_URL}${p.rota === "/" ? "/" : p.rota}`,
    lastModified: new Date(`${p.atualizadaEm}T12:00:00-03:00`),
  }));
  const guias = guiasPublicados().map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(`${g.atualizadaEm}T12:00:00-03:00`),
  }));
  return [...paginas, ...guias];
}
