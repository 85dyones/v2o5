"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** Menu do celular: abaixo de 768 px a navegação vira este painel. */
export default function MenuCelular({ itens }: { itens: { rotulo: string; href: string }[] }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <div className="md:hidden">
      <button
        ref={botao}
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium contorno-forte"
      >
        <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden="true">
          {aberto ? (
            <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3.5 7.5h13M3.5 12.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
        Menu
      </button>
      <div
        id={id}
        hidden={!aberto}
        className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-linha bg-tinta px-5 pb-8 pt-3"
      >
        <nav aria-label="Principal no celular">
          <ul>
            {itens.map((item) => (
              <li key={item.href} className="border-b border-linha">
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-14 items-center text-xl font-semibold tracking-[-0.02em]"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/diagnostico" onClick={() => setAberto(false)} className="botao botao-primario mt-7 w-full">
          Pedir diagnóstico
        </Link>
      </div>
    </div>
  );
}
