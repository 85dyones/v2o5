import LinkOuAncora from "@/components/LinkOuAncora";
import { COR_DA_ROTA, ComMarcas, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { NOME_DA_ETAPA, SOLUCOES } from "@/conteudo/home";
import { BRL, mensalEmTexto } from "@/conteudo/precos";
import { continuidadeAPartirDe, OFERTAS, precoDeEntrada } from "@/conteudo/ofertas";
import type { Etapa } from "@/lib/tokens";

/** A etiqueta da etapa de um serviço, na cor dela (páginas de solução também usam). */
export function MarcaDeEtapa({ etapa }: { etapa: Etapa }) {
  return (
    <span className="rotulo" style={{ color: TEXTO_DA_ETAPA[etapa] }}>
      {NOME_DA_ETAPA[etapa]}
    </span>
  );
}

/**
 * A seção `#solucoes` da home desde 27/10/2026: as quatro soluções, cada uma
 * com o problema que resolve, o que o cliente recebe e o preço de entrada,
 * e a continuidade embaixo, opcional. A célula inteira é o link e leva a
 * faixa na cor da solução. Tudo de `ofertas.ts`; o âncora segue `#solucoes`
 * (404, `/gestao-de-trafego` e a vitrine apontam para ela).
 */
export default function Solucoes() {
  return (
    <Trecho id="solucoes" aria-labelledby="titulo-solucoes" etapa="violeta" etapaFim="ambar">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-solucoes" className="titulo-secao col-span-12 lg:col-span-9">
          {SOLUCOES.titulo} <span className="apagado">{SOLUCOES.apagado}</span>
        </h2>
        <p className="texto-guia col-span-12 mt-6 max-w-[40rem] lg:col-span-7">{SOLUCOES.texto}</p>
      </div>

      <ul className="mt-titulo-conteudo grid border-t-2 border-texto md:grid-cols-2">
        {OFERTAS.map((o, i) => {
          const preco = `A partir de ${BRL(precoDeEntrada(o))}`;
          return (
            <li key={o.id} className={`border-b border-linha ${i % 2 === 0 ? "md:border-r" : ""}`}>
              <LinkOuAncora href={o.rota} className="servico-celula flex h-full flex-col gap-4 p-6 md:p-8" data-evento="cta_click" data-local="solucoes">
                {/* A cor da solução numa faixa curta: o fio da rota (`.servico`) só serve a linhas de largura inteira. */}
                <span aria-hidden="true" className="block h-1 w-12" style={{ backgroundColor: COR_DA_ROTA[o.etapa] }} />
                <span className="flex items-baseline justify-between gap-4">
                  <span className="titulo-cartao" style={{ color: TEXTO_DA_ETAPA[o.etapa] }}>
                    {o.nome}
                  </span>
                  <span aria-hidden="true" className="servico-seta text-lg">
                    →
                  </span>
                </span>
                <span className="text-[0.9375rem] leading-relaxed">{o.resolve}</span>
                <span className="text-[0.9375rem] leading-relaxed text-texto-secundario">{o.recebe}</span>
                <span className="mt-auto pt-2 font-semibold tabular-nums">
                  <ComMarcas texto={preco} marcas={[preco]} etapa="ambar" />
                </span>
              </LinkOuAncora>
            </li>
          );
        })}
      </ul>
      <LinkOuAncora
        href="/continuidade"
        className="mt-6 grid grid-cols-12 gap-x-6 gap-y-2 border border-linha p-6 transition-colors hover:bg-fundo-cartao md:p-7"
        data-evento="cta_click"
        data-local="solucoes"
      >
        <span className="titulo-cartao col-span-12 md:col-span-3">{SOLUCOES.continuidade.titulo}</span>
        <span className="col-span-12 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-6">{SOLUCOES.continuidade.texto}</span>
        <span className="col-span-12 font-semibold tabular-nums md:col-span-3 md:text-right">
          <ComMarcas texto={`Planos a partir de ${mensalEmTexto(continuidadeAPartirDe())}`} marcas={[`a partir de ${mensalEmTexto(continuidadeAPartirDe())}`]} etapa="ambar" />
        </span>
      </LinkOuAncora>
    </Trecho>
  );
}
