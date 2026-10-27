/**
 * Perfis da V2O5 fora do site, que entram no `sameAs` do schema da
 * organização (plano, seções 4.5 e 4.7). Só entra endereço confirmado pelo
 * Dyones: perfil inventado é pior que nenhum. Em 27/10/2026 o LinkedIn e o
 * Instagram/Facebook existem, mas estão desatualizados e sem gestão, e o
 * Perfil de Empresa no Google ainda será criado; os endereços chegam quando
 * o Dyones os passar (`docs/perfis-e-buscadores.md`).
 */
export const PERFIS: { rede: "LinkedIn" | "Instagram" | "Facebook" | "Google"; url: string | null }[] = [
  { rede: "LinkedIn", url: null },
  { rede: "Instagram", url: null },
  { rede: "Facebook", url: null },
  { rede: "Google", url: null },
];

/** As URLs confirmadas, prontas para o `sameAs`. */
export const perfisConfirmados = () => PERFIS.flatMap((p) => (p.url && /^https:\/\//.test(p.url) ? [p.url] : []));
