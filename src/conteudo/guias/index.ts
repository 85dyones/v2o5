import { GUIA_SIMPLIFICAR_ANTES_DE_AUTOMATIZAR } from "@/conteudo/guias/simplificar-antes-de-automatizar";
import { CLUSTERS, type Guia, type IdDoCluster } from "@/conteudo/guias/tipos";

export { CLUSTERS, SAIDAS_PERMITIDAS } from "@/conteudo/guias/tipos";
export type { Guia, IdDoCluster } from "@/conteudo/guias/tipos";

/** Todos os guias, de qualquer estado. Um guia novo entra aqui como rascunho. */
export const GUIAS: Guia[] = [GUIA_SIMPLIFICAR_ANTES_DE_AUTOMATIZAR];

/** Só os publicados: o que vai para o sitemap, o índice e o `llms.txt`. */
export const guiasPublicados = () => GUIAS.filter((g) => g.estado === "publicado");

/**
 * Os guias que as rotas servem. Em produção, só os publicados; na prévia
 * (`PREVIA_DE_GUIAS=1`, só em preview da Vercel ou local), também os
 * rascunhos, sempre com `noindex`.
 */
export const emPrevia = () => process.env.PREVIA_DE_GUIAS === "1";
export const guiasServidos = () => (emPrevia() ? GUIAS : guiasPublicados());

export const guiaDo = (slug: string) => guiasServidos().find((g) => g.slug === slug);

export const guiasDoCluster = (id: IdDoCluster) => guiasServidos().filter((g) => g.cluster === id);

export const clustersComGuia = () => (Object.keys(CLUSTERS) as IdDoCluster[]).filter((id) => guiasDoCluster(id).length > 0);
