"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import OrquestradorVisao, { estadoFinal, type EstadoDoOrquestrador } from "./OrquestradorVisao";
import { FRENTES } from "@/conteudo/home";
import { prefereMenosMovimento } from "@/lib/movimento";

const PRIMEIRO_PASSO_MS = 350;
const ENTRE_PASSOS_MS = 1000;

/**
 * A demonstração tocando: os passos aparecem um a um e o card do CRM
 * atualiza no fim. Com menos movimento, a aba troca e tudo aparece de uma vez.
 */
export default function OrquestradorInterativo({ comecarZerado = false }: { comecarZerado?: boolean }) {
  const [estado, setEstado] = useState<EstadoDoOrquestrador>(() =>
    comecarZerado && !prefereMenosMovimento() ? { ativa: 0, visiveis: 0, crmPronto: false } : estadoFinal(0),
  );
  const raiz = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const limpar = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const tocar = useCallback((ativa: number) => {
    limpar();
    if (prefereMenosMovimento()) {
      setEstado(estadoFinal(ativa));
      return;
    }
    const total = FRENTES[ativa].passos.length;
    setEstado({ ativa, visiveis: 0, crmPronto: false });
    for (let i = 1; i <= total; i++) {
      timers.current.push(
        window.setTimeout(() => setEstado((e) => ({ ...e, visiveis: i })), PRIMEIRO_PASSO_MS + (i - 1) * ENTRE_PASSOS_MS),
      );
    }
    timers.current.push(
      window.setTimeout(() => setEstado((e) => ({ ...e, crmPronto: true })), PRIMEIRO_PASSO_MS + total * ENTRE_PASSOS_MS),
    );
  }, []);

  // Chegou zerado (fora da tela): toca quando a seção aparecer.
  useEffect(() => {
    const el = raiz.current;
    if (!el || !comecarZerado || prefereMenosMovimento()) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        tocar(0);
      },
      { threshold: 0.35 },
    );
    observador.observe(el);
    return () => {
      observador.disconnect();
      limpar();
    };
  }, [comecarZerado, tocar]);

  // Setas, Home e End trocam de aba (padrão de abas da WAI-ARIA).
  const aoTeclarAba = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = FRENTES.length;
    const mapa: Record<string, number> = {
      ArrowRight: (estado.ativa + 1) % n,
      ArrowLeft: (estado.ativa - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    const proxima = mapa[e.key];
    tocar(proxima);
    const abas = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    abas?.[proxima]?.focus();
  };

  return (
    <div ref={raiz}>
      <OrquestradorVisao estado={estado} aoEscolher={tocar} aoTeclarAba={aoTeclarAba} aoRepetir={() => tocar(estado.ativa)} />
    </div>
  );
}
