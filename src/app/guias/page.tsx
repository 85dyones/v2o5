import type { CSSProperties } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import PaginaProvisoria from "@/components/PaginaProvisoria";
import Fechamento from "@/components/home/Fechamento";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Rodape from "@/components/layout/Rodape";
import Topo from "@/components/layout/Topo";
import { COR_DA_ROTA, Parada, Trecho } from "@/components/rota/Rota";
import { CLUSTERS, clustersComGuia, emPrevia, guiasDoCluster } from "@/conteudo/guias";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDoIndiceDeGuias } from "@/lib/schema";

const ROTA = "/guias";

export const metadata = metadataDa(ROTA);

/**
 * O índice de guias. Sem nenhum guia publicado (e fora da prévia) continua a
 * página provisória com `noindex`. Com guias, lista por tema, do mais novo
 * para o mais antigo, e fecha no diagnóstico. Em prévia (`PREVIA_DE_GUIAS=1`)
 * mostra também os rascunhos, e a página segue `noindex` enquanto não houver
 * publicado (`conteudo/paginas.ts`).
 */
export default function Pagina() {
  const temas = clustersComGuia();
  if (!temas.length) return <PaginaProvisoria rota={ROTA} />;
  return (
    <>
      <Topo />
      <main id="conteudo">
        <Trecho aria-label="Guias" adiada={false} className="!border-b-2 !border-texto" miolo="!py-0">
          <div className="grid grid-cols-12">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-guias" className="titulo-hero max-w-[12ch]">
                  Guias
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              <p className="text-[1.0625rem] leading-relaxed">
                Respostas de quem implanta e mede, para quem vende pelo WhatsApp e pela internet. Cada guia termina numa única próxima etapa.
              </p>
              {emPrevia() ? <p className="rotulo mt-4 text-texto-secundario">Prévia: rascunhos visíveis, fora do Google</p> : null}
            </div>
          </div>
        </Trecho>

        {temas.map((id) => (
          <Trecho key={id} aria-label={CLUSTERS[id]}>
            <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
              <Parada />
              <h2 className="titulo-secao col-span-12 lg:col-span-5">{CLUSTERS[id]}</h2>
              <ul className="col-span-12 border-t-2 border-texto lg:col-span-7">
                {guiasDoCluster(id).map((g) => (
                  <li key={g.slug} className="servico border-b border-linha" style={{ "--cor-da-rota": COR_DA_ROTA.azul } as CSSProperties}>
                    <Link href={`/guias/${g.slug}`} className="servico-celula grid grid-cols-12 gap-x-6 gap-y-2 py-6" data-evento="cta_click" data-local="indice-de-guias">
                      <span className="col-span-10">
                        <span className="titulo-cartao block">{g.titulo}</span>
                        <span className="mt-2 block max-w-[38rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{g.descricao}</span>
                        {g.estado === "rascunho" ? <span className="rotulo mt-2 block text-texto-secundario">Rascunho</span> : null}
                      </span>
                      <span aria-hidden="true" className="servico-seta col-span-2 self-center justify-self-end">
                        <Icone nome="seta" className="size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Trecho>
        ))}
        <Fechamento />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="guias" />
      <JsonLd grafo={grafoDoIndiceDeGuias()} />
      <Entradas />
    </>
  );
}
