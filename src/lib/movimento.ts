/**
 * A regra de movimento do site, num lugar só.
 *
 * Todo código que anima (Motion, sequência com timer, entrada ao rolar)
 * pergunta aqui antes de agendar qualquer quadro. Com
 * `prefers-reduced-motion: reduce` nada se move: o componente mostra o
 * estado final direto. `tests/movimento.test.ts` trava a regra, e
 * `globals.css` desliga as transições e animações de CSS na mesma condição.
 */

export const CONSULTA_MENOS_MOVIMENTO = "(prefers-reduced-motion: reduce)";

export function prefereMenosMovimento(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return window.matchMedia(CONSULTA_MENOS_MOVIMENTO).matches;
}
