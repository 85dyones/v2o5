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
    <div className="ml-auto sm:ml-2 md:hidden">
      <button
        ref={botao}
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 text-[0.9375rem]"
      >
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
          {aberto ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          )}
        </svg>
        Menu
      </button>
      <div
        id={id}
        hidden={!aberto}
        className="absolute inset-x-0 top-16 border-b border-linha bg-tinta px-5 pb-6 pt-2"
      >
        <nav aria-label="Principal no celular">
          <ul>
            {itens.map((item) => (
              <li key={item.href} className="border-b border-linha">
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-12 items-center text-lg font-semibold"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/diagnostico" onClick={() => setAberto(false)} className="botao botao-primario mt-5 w-full">
          Pedir diagnóstico
        </Link>
      </div>
    </div>
  );
}
