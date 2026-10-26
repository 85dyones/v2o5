import LinkOuAncora from "@/components/LinkOuAncora";
import { Parada, Trecho } from "@/components/rota/Rota";
import { ESCADA } from "@/conteudo/home";

/** Os três degraus da oferta, com o Sprint em destaque. Sem preço: o escopo vem depois da conversa. */
export default function Escada() {
  return (
    <Trecho id="como-trabalhamos" aria-labelledby="titulo-escada" etapa="ambar">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <div className="col-span-12 lg:col-span-7">
          <p className="rotulo text-texto-secundario">{ESCADA.sobretitulo}</p>
          <h2 id="titulo-escada" className="titulo-secao mt-3">
            {ESCADA.titulo}
          </h2>
        </div>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-8">{ESCADA.texto}</p>
      </div>
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {ESCADA.degraus.map((d) => (
          <li
            key={d.titulo}
            className={`flex flex-col p-6 ${d.destaque ? "border-2 border-texto" : "border border-linha"}`}
          >
            <p className="rotulo text-texto-secundario">{d.tipo}</p>
            <h3 className="titulo-cartao mt-3">{d.titulo}</h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-texto-secundario">{d.texto}</p>
            <p className="mt-6 border-t border-linha pt-4 text-[0.875rem] font-medium leading-relaxed">{d.saida}</p>
            {"href" in d && d.href ? (
              <LinkOuAncora href={d.href} className="link-sublinhado mt-4 text-[0.875rem] font-medium" data-evento="cta_click" data-local="escada">
                Ver valores e condições
              </LinkOuAncora>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[44rem] text-[0.9375rem] leading-relaxed text-texto-secundario">{ESCADA.nota}</p>
    </Trecho>
  );
}
