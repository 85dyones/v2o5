import type { CSSProperties } from "react";
import LinkOuAncora from "@/components/LinkOuAncora";
import { COR_DA_ROTA, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { NOME_DA_ETAPA, PILARES, SOLUCOES, type Servico } from "@/conteudo/home";
import type { Etapa } from "@/lib/tokens";

/** A etiqueta da etapa de um serviço, na cor dela (páginas de solução também usam). */
export function MarcaDeEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <span className="rotulo" style={{ color: TEXTO_DA_ETAPA[etapa] }}>
      {NOME_DA_ETAPA[etapa]}
    </span>
  );
}

/** A cor do trecho no cabeçalho de cada metade: o mapa é atração, a operação começa no atendimento. */
const ETAPA_DO_PILAR: Etapa[] = ["violeta", "verde"];


/**
 * Uma linha do cardápio: a célula inteira é o link. A linha pinta o trecho
 * da rota na cor da etapa do serviço e leva a parada dele.
 */
function LinhaDoServico({ servico }: { servico: Servico }) {
  const estilo = { "--cor-da-rota": COR_DA_ROTA[servico.etapa] } as CSSProperties;
  return (
    <li className="servico" style={estilo}>
      <LinkOuAncora href={servico.href} className="servico-celula grid grid-cols-12 gap-x-6 gap-y-3 border-b border-linha py-6 md:py-7">
        <Parada />
        <span className="col-span-10 md:col-span-11">
          <MarcaDeEtapa etapa={servico.etapa} />
          <span className="titulo-cartao mt-2 block">{servico.titulo}</span>
          <span className="mt-2 block max-w-[38rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{servico.frase}</span>
        </span>
        <span aria-hidden="true" className="servico-seta col-span-2 self-center justify-self-end text-lg md:col-span-1">
          →
        </span>
      </LinkOuAncora>
    </li>
  );
}

/**
 * As intervenções que um Sprint costuma usar, em dois grupos. Cada uma é uma
 * linha, com a etapa e a seta, e leva à página dela (rota e SEO preservados).
 * Sem valor: só o Sprint tem preço público (decisão de 25/10/2026).
 */
export default function Solucoes() {
  return (
    <Trecho id="solucoes" aria-labelledby="titulo-solucoes" etapa="violeta" etapaFim="azul">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-solucoes" className="titulo-secao col-span-12 lg:col-span-9">
          {SOLUCOES.titulo} <span className="apagado">{SOLUCOES.apagado}</span>
        </h2>
        <p className="texto-guia col-span-12 mt-6 max-w-[40rem] lg:col-span-7">{SOLUCOES.texto}</p>
      </div>

      {PILARES.map((pilar, p) => (
        <section key={pilar.id} aria-label={pilar.sobretitulo} className="servico pt-16 md:pt-20" style={{ "--cor-da-rota": COR_DA_ROTA[ETAPA_DO_PILAR[p]] } as CSSProperties}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-b-2 border-texto pb-6">
            <h3 className="col-span-12 text-titulo-3 md:col-span-5">{pilar.titulo}</h3>
            <p className="texto-guia col-span-12 md:col-span-7">{pilar.frase}</p>
          </div>
          <ul>
            {pilar.servicos.map((servico) => (
              <LinhaDoServico key={servico.titulo} servico={servico} />
            ))}
          </ul>
        </section>
      ))}
    </Trecho>
  );
}
