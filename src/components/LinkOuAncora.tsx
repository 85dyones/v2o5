import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * `Link` do Next para rotas; `<a>` nativo quando o destino tem fragmento.
 * O `Link` navega com `pushState` e rola por conta própria, sem marcar o
 * `:target` nem disparar `hashchange`: as seções adiadas ficam com a altura
 * provisória e o pouso erra. O `<a>` faz a navegação por fragmento do
 * navegador, que marca o `:target` (`globals.css`) e avisa `lib/ancora.ts`.
 */
export default function LinkOuAncora({ href, ...resto }: ComponentProps<typeof Link> & { href: string }) {
  if (href.includes("#")) return <a href={href} {...resto} />;
  return <Link href={href} {...resto} />;
}
