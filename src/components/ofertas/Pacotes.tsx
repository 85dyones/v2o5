import Link from "next/link";
import Icone from "@/components/Icone";
import { ComMarcas, Parada, TEXTO_DA_ETAPA, Trecho } from "@/components/rota/Rota";
import { mensalEmTexto, precoEmTexto, type Oferta, type Pacote } from "@/conteudo/ofertas";

/**
 * Os pacotes de uma solução (27/10/2026): cada cartão diz o preço de
 * referência, para quem é, o que inclui e, na Presença, a mensalidade
 * opcional. Embaixo, o que nenhum pacote cobre e como o preço funciona. O
 * `id="titulo-pacotes"` é a âncora do botão "Ver os pacotes" da abertura.
 * Preço só de `ofertas.ts` e `sprint.ts`, no marca-texto âmbar.
 */
export default function Pacotes({ oferta }: { oferta: Oferta }) {
  const colunas = oferta.pacotes.length === 4 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <Trecho aria-labelledby="titulo-pacotes" etapa={oferta.etapa}>
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-pacotes" className="titulo-secao col-span-12 lg:col-span-9">
          Os pacotes. <span className="apagado">Preço de referência, com o valor fechado em proposta.</span>
        </h2>
      </div>
      <ol className={`mt-titulo-conteudo grid gap-4 ${colunas}`}>
        {oferta.pacotes.map((p) => (
          <CartaoDoPacote key={p.nome} pacote={p} oferta={oferta} />
        ))}
      </ol>

      <div className="mt-10 grid gap-x-6 gap-y-8 border-t-2 border-texto pt-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="titulo-cartao">Fora dos pacotes</h3>
          <ul className="mt-4 grid gap-2">
            {oferta.fora.map((f) => (
              <li key={f} className="border-l-2 border-linha pl-4 text-[0.9375rem] leading-relaxed text-texto-secundario">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <h3 className="titulo-cartao">Como o preço funciona</h3>
          <ul className="mt-4 grid gap-3">
            {oferta.regras.map((r) => (
              <li key={r} className="border-l-2 border-texto pl-4 text-[0.9375rem] leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
          {oferta.continuidade ? (
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-texto-secundario">
              {oferta.continuidade}{" "}
              <Link href="/continuidade" className="link-sublinhado font-medium text-texto" data-evento="cta_click" data-local="pacotes">
                Ver a continuidade
              </Link>
              .
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="pacotes">
          Pedir diagnóstico gratuito
          <Icone nome="seta" className="seta size-4" />
        </Link>
        <Link href="/precos" className="link-sublinhado text-[0.9375rem] font-medium" data-evento="cta_click" data-local="pacotes">
          Ver todos os preços
        </Link>
      </div>
    </Trecho>
  );
}

function CartaoDoPacote({ pacote: p, oferta }: { pacote: Pacote; oferta: Oferta }) {
  const preco = precoEmTexto(p.preco);
  return (
    <li className={`flex flex-col p-6 ${p.principal ? "border-2 border-texto" : "border border-linha"}`}>
      <p className="rotulo" style={{ color: TEXTO_DA_ETAPA[oferta.etapa] }}>
        {p.principal ? "Oferta principal" : oferta.nome}
      </p>
      <h3 className="titulo-cartao mt-3">{p.nome}</h3>
      <p className="mt-4 text-[1.0625rem] font-semibold tabular-nums">
        <ComMarcas texto={preco.replace(/^a/, "A")} marcas={[preco.replace(/^a/, "A")]} etapa="ambar" />
      </p>
      <p className="mt-1 text-[0.8125rem] text-texto-secundario">
        {p.duracao ? `Preço de referência. Duração de referência: ${p.duracao}.` : "Preço de referência da implantação."}
      </p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed">{p.para}</p>
      <ul className="mt-4 grid flex-1 content-start gap-2 border-t border-linha pt-4">
        {p.inclui.map((i) => (
          <li key={i} className="text-[0.9375rem] leading-relaxed text-texto-secundario">
            {i}
          </li>
        ))}
      </ul>
      {p.mensal ? (
        <div className="mt-5 border-t border-linha pt-4">
          <p className="rotulo text-texto-secundario">Continuidade opcional</p>
          <p className="mt-2 font-semibold tabular-nums">
            <ComMarcas texto={mensalEmTexto(p.mensal.valor)} marcas={[mensalEmTexto(p.mensal.valor)]} etapa="ambar" />
          </p>
          <p className="mt-1 text-[0.875rem] leading-relaxed text-texto-secundario">{p.mensal.cobre}</p>
        </div>
      ) : null}
    </li>
  );
}
