/**
 * Pouso das âncoras (plano: "o topo da informação pedida, nunca o rodapé").
 *
 * O navegador rola até o fragmento assim que calcula o layout. Se depois
 * disso algo acima do alvo muda de altura (hidratação de um componente,
 * seção adiada que ganha o tamanho real, fonte que chega), o alvo sai do
 * lugar. Com rolagem instantânea o navegador ainda reancora; com rolagem
 * suave, não. Por isso o site rola as âncoras sem suavidade e, depois de
 * uma navegação por fragmento, confere o pouso algumas vezes nos primeiros
 * instantes e corrige se a pessoa ainda não mexeu na rolagem.
 */

/** Momentos, em ms depois da navegação, em que o pouso é conferido. */
export const MOMENTOS_DE_CORRECAO = [0, 250, 800, 1600];

export function alvoDaAncora(hash: string, doc: Document): HTMLElement | null {
  if (!hash || hash.length < 2) return null;
  try {
    return doc.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/**
 * Confere o pouso do alvo do fragmento nos próximos instantes e corrige com
 * rolagem instantânea; para na primeira interação da pessoa com a rolagem.
 * Devolve o cancelamento.
 */
export function corrigirPouso(win: Window = window): () => void {
  const doc = win.document;
  const alvo = alvoDaAncora(win.location.hash, doc);
  if (!alvo) return () => {};

  let parado = false;
  const parar = () => {
    parado = true;
    for (const t of temporizadores) clearTimeout(t);
  };
  const gestos = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  for (const g of gestos) win.addEventListener(g, parar, { once: true, passive: true });

  const conferir = () => {
    if (parado || !doc.contains(alvo)) return;
    alvo.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
  };
  const temporizadores = MOMENTOS_DE_CORRECAO.map((ms) => setTimeout(conferir, ms));
  if (doc.readyState !== "complete") win.addEventListener("load", conferir, { once: true });
  doc.fonts?.ready.then(() => setTimeout(conferir, 50)).catch(() => {});

  return () => {
    parar();
    for (const g of gestos) win.removeEventListener(g, parar);
    win.removeEventListener("load", conferir);
  };
}
