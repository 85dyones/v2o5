/**
 * Contraste WCAG 2.1 entre duas cores (mesma conta da Motors).
 *
 * Fica em `lib` porque é matemática pura: `tests/contraste.test.ts` usa esta
 * função para travar os pares de cor da marca no AA.
 */

/** Converte `#rgb` ou `#rrggbb` nos três canais 0–255; `null` se não for cor. */
export function lerHex(hex: string): [number, number, number] | null {
  const limpo = hex.trim().replace(/^#/, "");
  if (limpo.length === 3) {
    const [r, g, b] = limpo.split("");
    return lerHex(`#${r}${r}${g}${g}${b}${b}`);
  }
  if (!/^[0-9a-fA-F]{6}$/.test(limpo)) return null;
  return [
    parseInt(limpo.slice(0, 2), 16),
    parseInt(limpo.slice(2, 4), 16),
    parseInt(limpo.slice(4, 6), 16),
  ];
}

/** Luminância relativa: o canal é linearizado antes da soma ponderada. */
function luminancia([r, g, b]: [number, number, number]): number {
  const canal = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

/** Razão de 1 (iguais) a 21 (preto e branco); `null` se uma cor for inválida. */
export function razaoDeContraste(corA: string, corB: string): number | null {
  const a = lerHex(corA);
  const b = lerHex(corB);
  if (!a || !b) return null;
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
