/**
 * A regra de movimento do site, num lugar só.
 *
 * Todo código que anima (canvas, Motion, contador, sequência com timer)
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

interface NavegadorComDicas extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Aparelho em que o canvas fica parado num quadro só: pouca memória, poucos
 * núcleos ou economia de dados ligada.
 */
export function aparelhoFraco(): boolean {
  if (typeof navigator === "undefined") return true;
  const n = navigator as NavegadorComDicas;
  if (n.connection?.saveData) return true;
  if (typeof n.deviceMemory === "number" && n.deviceMemory <= 2) return true;
  if (typeof n.hardwareConcurrency === "number" && n.hardwareConcurrency <= 2) return true;
  return false;
}

/** Tela de toque (sem cursor para acender a molécula). */
export function semCursor(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
