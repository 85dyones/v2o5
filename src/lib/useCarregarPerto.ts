"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Carrega um componente quando a seção chega perto da tela (`margem` antes
 * de aparecer). Até lá a seção mostra o HTML estático do servidor, com zero
 * JavaScript; o código interativo nem entra no pacote inicial.
 */
export function useCarregarPerto<P>(
  importar: () => Promise<{ default: ComponentType<P> }>,
  margem = "700px",
) {
  const ref = useRef<HTMLDivElement>(null);
  const [Componente, setComponente] = useState<ComponentType<P> | null>(null);
  // Se a seção ainda estava fora da tela quando o código chegou: o componente
  // pode começar zerado e tocar a demonstração quando aparecer.
  const [chegouForaDaTela, setChegouForaDaTela] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let vivo = true;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        importar().then((m) => {
          if (!vivo) return;
          const caixa = el.getBoundingClientRect();
          setChegouForaDaTela(caixa.top >= window.innerHeight || caixa.bottom <= 0);
          setComponente(() => m.default);
        });
      },
      { rootMargin: `${margem} 0px` },
    );
    observador.observe(el);
    return () => {
      vivo = false;
      observador.disconnect();
    };
    // `importar` é uma função literal estável por componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [margem]);

  return { ref, Componente, chegouForaDaTela };
}
