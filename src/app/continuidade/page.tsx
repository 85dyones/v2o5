import type { ReactNode } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import JsonLd from "@/components/JsonLd";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Perguntas from "@/components/home/Perguntas";
import Fechamento from "@/components/home/Fechamento";
import { ComMarcas, Parada, Trecho } from "@/components/rota/Rota";
import { metadataDa } from "@/conteudo/paginas";
import { CONTINUIDADE, mensalEmTexto, ofertaDa, PERGUNTAS_DA_CONTINUIDADE, planoDaFrente, type PlanoDeContinuidade } from "@/conteudo/ofertas";
import { grafoDaContinuidade } from "@/lib/schema";
import type { Etapa } from "@/lib/tokens";

const ROTA = "/continuidade";

export const metadata = metadataDa(ROTA);

/** Uma frente da continuidade: o id é a âncora do menu (`/continuidade#manutencao-tecnica`). */
function Frente({ id, etapa, titulo, texto, children }: { id: string; etapa: Etapa; titulo: string; texto: string; children: ReactNode }) {
  return (
    <Trecho id={id} aria-labelledby={`titulo-${id}`} etapa={etapa}>
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id={`titulo-${id}`} className="titulo-secao col-span-12 lg:col-span-9">
          {titulo}
        </h2>
        <p className="texto-guia col-span-12 mt-6 max-w-[40rem] lg:col-span-7">{texto}</p>
      </div>
      <div className="mt-titulo-conteudo">{children}</div>
    </Trecho>
  );
}

function CartaoDoPlano({ plano }: { plano: PlanoDeContinuidade }) {
  const preco = mensalEmTexto(plano.mensal);
  return (
    <li className="flex flex-col border border-linha p-6">
      <h3 className="titulo-cartao">{plano.nome}</h3>
      <p className="mt-4 text-[1.0625rem] font-semibold tabular-nums">
        <ComMarcas texto={preco} marcas={[preco]} etapa="ambar" />
      </p>
      <p className="mt-1 text-[0.8125rem] text-texto-secundario">Preço de referência. Opcional, sem obrigação de contratar.</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed">{plano.para}</p>
      <ul className="mt-4 grid flex-1 content-start gap-2 border-t border-linha pt-4">
        {plano.inclui.map((i) => (
          <li key={i} className="text-[0.9375rem] leading-relaxed text-texto-secundario">
            {i}
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * A continuidade (27/10/2026): à parte das quatro soluções e opcional. Três
 * frentes, que são o submenu "Continuidade" do topo: manutenção técnica (o
 * Cuidado Técnico), conteúdo e campanhas recorrentes (as mensalidades da
 * Presença) e monitoramento e otimização (Integrações Monitoradas e Evolução
 * Contínua). Os limites valem para todos os planos. Tudo de `ofertas.ts`.
 */
export default function Pagina() {
  const [manutencao, conteudo, monitoramento] = CONTINUIDADE.frentes;
  const presenca = ofertaDa("presenca");
  return (
    <>
      <Topo />
      <main id="conteudo">
        {/* Acima da dobra: sem `adiada`. */}
        <section aria-label="Continuidade" className="trecho border-b-2 border-texto" data-fino="">
          <div className="conteiner conteiner-rota grid grid-cols-12">
            <div className="col-span-12 pb-10 pt-12 md:pb-16 md:pt-20 lg:col-span-8 lg:pr-12">
              <div className="relative">
                <Parada />
                <h1 id="titulo-continuidade" className="titulo-hero max-w-[18ch]">
                  {CONTINUIDADE.titulo}
                </h1>
              </div>
            </div>
            <div className="col-span-12 border-t border-linha pb-12 pt-8 md:pb-16 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-20">
              {/* Curto de propósito: o LCP da página é o H1. */}
              <p className="text-[1.0625rem] leading-relaxed">{CONTINUIDADE.resumo}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="hero">
                  Pedir diagnóstico gratuito
                  <Icone nome="seta" className="seta size-4" />
                </Link>
                <a href="#titulo-limites" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="hero">
                  Ver os limites
                </a>
              </div>
            </div>
          </div>
          <div className="conteiner conteiner-rota">
            <p className="max-w-[48rem] border-t border-linha py-6 text-[0.9375rem] leading-relaxed text-texto-secundario">{CONTINUIDADE.texto}</p>
          </div>
        </section>

        <Frente id={manutencao.id} etapa="azul" titulo={manutencao.nome} texto={manutencao.texto}>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {planoDaFrente("manutencao-tecnica").map((p) => (
              <CartaoDoPlano key={p.nome} plano={p} />
            ))}
          </ul>
        </Frente>

        <Frente id={conteudo.id} etapa="verde" titulo={conteudo.nome} texto={conteudo.texto}>
          <ul className="border-t-2 border-texto">
            {presenca.pacotes.map((p) =>
              p.mensal ? (
                <li key={p.nome} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-linha py-6">
                  <h3 className="titulo-cartao col-span-12 md:col-span-4">{p.nome}</h3>
                  <p className="col-span-12 font-semibold tabular-nums md:col-span-3">
                    <ComMarcas texto={mensalEmTexto(p.mensal.valor)} marcas={[mensalEmTexto(p.mensal.valor)]} etapa="ambar" />
                  </p>
                  <p className="col-span-12 text-[0.9375rem] leading-relaxed text-texto-secundario md:col-span-5">{p.mensal.cobre}</p>
                </li>
              ) : null,
            )}
          </ul>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-texto-secundario">
            Cada mensalidade acompanha o pacote de implantação de mesmo nome.{" "}
            <Link href={presenca.rota} className="link-sublinhado font-medium text-texto" data-evento="cta_click" data-local="continuidade">
              Ver a Presença Digital Local
            </Link>
            .
          </p>
        </Frente>

        <Frente id={monitoramento.id} etapa="ambar" titulo={monitoramento.nome} texto={monitoramento.texto}>
          <ul className="grid gap-4 md:grid-cols-2">
            {planoDaFrente("monitoramento-e-otimizacao").map((p) => (
              <CartaoDoPlano key={p.nome} plano={p} />
            ))}
          </ul>
        </Frente>

        <Trecho aria-labelledby="titulo-limites">
          <div className="relative grid grid-cols-12 gap-x-6">
            <Parada />
            <h2 id="titulo-limites" className="titulo-secao col-span-12 lg:col-span-9">
              Os limites. <span className="apagado">Valem para todos os planos e vão no contrato.</span>
            </h2>
          </div>
          <dl className="mt-titulo-conteudo grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {CONTINUIDADE.limites.map((l) => (
              <div key={l.titulo} className="border-t border-linha pt-4">
                <dt className="font-semibold">{l.titulo}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-texto-secundario">{l.texto}</dd>
              </div>
            ))}
          </dl>
        </Trecho>

        <Perguntas
          lista={PERGUNTAS_DA_CONTINUIDADE}
          sobretitulo="Antes de contratar"
          titulo="O que perguntam sobre a continuidade"
          texto="Horas, prazos e o que fica de fora. O resto cabe no diagnóstico."
        />
        <Fechamento secundario={{ href: "/precos", texto: "Ver todos os preços" }} />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="precos" />
      <JsonLd grafo={grafoDaContinuidade()} />
      <Entradas />
    </>
  );
}
