import type { MetadataRoute } from "next";
import { PAGINAS } from "@/conteudo/paginas";
import { SITE_URL } from "@/lib/site";

/** Só as páginas prontas, com a data real da última mudança de conteúdo. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS.filter((p) => p.pronta).map((p) => ({
    url: `${SITE_URL}${p.rota === "/" ? "/" : p.rota}`,
    lastModified: new Date(`${p.atualizadaEm}T12:00:00-03:00`),
  }));
}
