"use client";

import { useEffect, useRef } from "react";
import LinkOuAncora from "@/components/LinkOuAncora";
import type { ItemDaNavegacao } from "@/conteudo/home";

/**
 * Um grupo do menu do topo (Soluções, Continuidade) num `<details>` nativo:
 * abre e fecha sem JavaScript. O script só fecha o painel com Esc (e devolve
 * o foco ao rótulo), com clique fora dele e ao seguir um link.
 */
export default function SubmenuDoTopo({ item }: { item: ItemDaNavegacao & { itens: { rotulo: string; href: string }[] } }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fechar = () => el.removeAttribute("open");
    const aoClicar = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) fechar();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !el.open) return;
      fechar();
      el.querySelector("summary")?.focus();
    };
    document.addEventListener("click", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("click", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, []);

  return (
    <details ref={ref} className="submenu relative flex">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 px-4 text-sm font-medium text-texto-secundario transition-colors hover:bg-fundo-cartao hover:text-texto lg:px-5">
        {item.rotulo}
        <svg viewBox="0 0 12 12" className="submenu-seta size-3" aria-hidden="true">
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className="absolute left-0 top-full z-40 min-w-[16rem] border-2 border-texto bg-fundo py-2">
        {item.itens.map((sub) => (
          <li key={sub.href}>
            <LinkOuAncora
              href={sub.href}
              onClick={() => ref.current?.removeAttribute("open")}
              className="flex min-h-11 items-center px-4 text-sm font-medium text-texto-secundario transition-colors hover:bg-fundo-cartao hover:text-texto"
            >
              {sub.rotulo}
            </LinkOuAncora>
          </li>
        ))}
        <li className="mt-1 border-t border-linha pt-1">
          <LinkOuAncora
            href={item.href}
            onClick={() => ref.current?.removeAttribute("open")}
            className="flex min-h-11 items-center px-4 text-sm font-semibold text-texto transition-colors hover:bg-fundo-cartao"
          >
            {item.todos ?? item.rotulo}
          </LinkOuAncora>
        </li>
      </ul>
    </details>
  );
}
