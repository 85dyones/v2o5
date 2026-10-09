"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationPlaybackControls, AnimationSequence } from "motion";
import DiagramaVisao, { COR_CLARA } from "./DiagramaVisao";
import { ligacaoEntre } from "./geometria";
import { PECAS, type IdDaPeca } from "@/conteudo/home";
import { prefereMenosMovimento } from "@/lib/movimento";

/**
 * Clique (ou Enter) numa peça acende o caminho dela, e um pulso percorre as
 * ligações nas cores das etapas. O pulso usa Motion, importado só aqui, que
 * já é um pedaço carregado perto da tela. Com menos movimento, o caminho
 * acende e nada corre.
 */
export default function DiagramaInterativo({ comecarZerado = false }: { comecarZerado?: boolean }) {
  const [selecionada, setSelecionada] = useState<IdDaPeca>("site");
  const raiz = useRef<HTMLDivElement>(null);
  const animacao = useRef<AnimationPlaybackControls | null>(null);

  const pulsar = useCallback(async (id: IdDaPeca) => {
    if (prefereMenosMovimento() || !raiz.current) return;
    const { animate } = await import("motion");
    // O arranjo visível (horizontal ou vertical) é o que tem caixa na tela.
    const svg = Array.from(raiz.current.querySelectorAll<SVGSVGElement>("svg[data-diagrama]")).find(
      (s) => s.getClientRects().length > 0,
    );
    if (!svg) return;
    const caminho = PECAS.find((p) => p.id === id)!.caminho;
    const sequencia: AnimationSequence = [];
    for (let i = 0; i < caminho.length - 1; i++) {
      const ligacao = ligacaoEntre(caminho[i], caminho[i + 1]);
      const traco = ligacao && svg.querySelector<SVGPathElement>(`[data-pulso="${ligacao.chave}"]`);
      const nucleo = svg.querySelector<SVGCircleElement>(`[data-peca="${caminho[i + 1]}"] .nucleo`);
      if (!ligacao || !traco) continue;
      traco.style.stroke = COR_CLARA[PECAS.find((p) => p.id === caminho[i + 1])!.etapa];
      sequencia.push([
        traco,
        { strokeDashoffset: ligacao.invertida ? [-100, 14] : [14, -100] },
        { duration: 0.62, ease: [0.645, 0.045, 0.355, 1], at: i === 0 ? 0 : "-0.14" },
      ]);
      if (nucleo) sequencia.push([nucleo, { scale: [1, 1.6, 1] }, { duration: 0.42, at: "-0.12" }]);
    }
    animacao.current?.stop();
    animacao.current = animate(sequencia);
  }, []);

  const escolher = useCallback(
    (id: IdDaPeca) => {
      setSelecionada(id);
      void pulsar(id);
    },
    [pulsar],
  );

  // Chegou antes de a seção aparecer: o primeiro pulso toca quando aparecer.
  useEffect(() => {
    const el = raiz.current;
    if (!el || !comecarZerado) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        void pulsar("site");
      },
      { threshold: 0.45 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [comecarZerado, pulsar]);

  useEffect(() => () => animacao.current?.stop(), []);

  return (
    <div ref={raiz}>
      <DiagramaVisao selecionada={selecionada} aoEscolher={escolher} />
    </div>
  );
}
