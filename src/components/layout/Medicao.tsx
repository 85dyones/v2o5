"use client";

import LinkOuAncora from "@/components/LinkOuAncora";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  avisoVisto,
  carregarFerramentas,
  depoisDoConteudo,
  enviar,
  eventoDoClique,
  ferramentasAtivas,
  leadNestaSessao,
  marcarAvisoVisto,
  paginaVista,
  prepararFerramentas,
} from "@/lib/medicao";

/**
 * Liga a camada de dados (`lib/medicao.ts`) no layout: prepara as filas na
 * montagem, carrega as ferramentas depois do conteúdo, manda um `page_view`
 * por rota (o App Router navega sem recarregar) e ouve os cliques em
 * elementos com `data-evento`. Mostra o aviso informativo uma vez, só quando
 * alguma ferramenta está ativa neste navegador.
 *
 * Sem ID configurado ou com a oposição gravada, não carrega nada e não
 * renderiza nada: o site segue sem terceiro algum.
 */
export default function Medicao() {
  const pathname = usePathname();
  const [aviso, setAviso] = useState(false);

  useEffect(() => {
    const ativas = ferramentasAtivas();
    if (!ativas.ga4 && !ativas.pixel) return;
    prepararFerramentas(ativas);
    const aoClicar = (e: MouseEvent) => {
      const alvo = e.target instanceof Element ? e.target.closest("[data-evento]") : null;
      if (!alvo) return;
      const evento = eventoDoClique(alvo, leadNestaSessao());
      if (evento) enviar(evento);
    };
    document.addEventListener("click", aoClicar);
    const cancelar = depoisDoConteudo(() => {
      carregarFerramentas(ativas);
      if (!avisoVisto()) setAviso(true);
    });
    return () => {
      document.removeEventListener("click", aoClicar);
      cancelar();
    };
  }, []);

  useEffect(() => {
    const ativas = ferramentasAtivas();
    if (ativas.ga4 || ativas.pixel) paginaVista(pathname);
  }, [pathname]);

  if (!aviso) return null;

  const fechar = () => {
    marcarAvisoVisto();
    setAviso(false);
  };

  return (
    <aside
      aria-label="Aviso de medição"
      className="fixed inset-x-4 bottom-20 z-40 rounded-2xl bg-superficie p-4 text-[0.9375rem] leading-snug text-secundario contorno-forte shadow-[0_12px_40px_rgb(0_0_0/0.45)] md:inset-x-auto md:bottom-4 md:left-4 md:max-w-[22rem]"
    >
      <p>
        Este site mede visitas e o resultado dos anúncios com base no legítimo interesse. Você pode desligar a medição
        neste navegador na{" "}
        <LinkOuAncora href="/privacidade#medicao" className="link-sublinhado text-papel" onClick={fechar}>
          página de privacidade
        </LinkOuAncora>
        .
      </p>
      <button type="button" onClick={fechar} className="botao botao-secundario botao-compacto mt-3">
        Entendi
      </button>
    </aside>
  );
}
