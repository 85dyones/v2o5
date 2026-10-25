import LinkOuAncora from "@/components/LinkOuAncora";
import { Parada, Trecho } from "@/components/rota/Rota";
import { TRES_SPRINTS } from "@/conteudo/home";
import { faixaEmTexto, SPRINT_DE_PRECOS } from "@/conteudo/sprint";

/**
 * Os três Sprints como os únicos entregáveis: nome, faixa de referência,
 * duração de referência e para quem serve. A Integrada é a oferta principal.
 */
export default function TresSprints() {
  return (
    <Trecho id="tres-sprints" aria-labelledby="titulo-tres-sprints" etapa="azul">
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-tres-sprints" className="titulo-secao col-span-12 lg:col-span-7">
          {TRES_SPRINTS.titulo}
        </h2>
        <p className="texto-guia col-span-12 lg:col-span-5 lg:pt-2">{TRES_SPRINTS.texto}</p>
      </div>
      <ul className="mt-titulo-conteudo grid grid-cols-1 border-t-2 border-texto md:grid-cols-3">
        {SPRINT_DE_PRECOS.niveis.map((n, i) => (
          <li key={n.nome} className={`flex flex-col gap-3 border-b border-linha py-7 md:pr-6 ${i > 0 ? "md:border-l md:pl-6" : ""}`}>
            <p className="rotulo text-texto-secundario">{"principal" in n && n.principal ? "Oferta principal" : n.duracao}</p>
            <h3 className="titulo-cartao">{n.nome}</h3>
            <p className="numero text-[1.0625rem] font-semibold">{faixaEmTexto(n.faixa)}</p>
            <p className="text-[0.9375rem] leading-relaxed text-texto-secundario">{n.para}</p>
            <p className="text-sm text-texto-secundario">{n.duracao}, como referência.</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        <LinkOuAncora href="/precos#titulo-sprint" className="link-sublinhado inline-flex min-h-11 items-center text-[0.9375rem] font-medium" data-evento="cta_click" data-local="tres-sprints">
          {TRES_SPRINTS.link}
        </LinkOuAncora>
        <LinkOuAncora href="/#solucoes" className="link-sublinhado inline-flex min-h-11 items-center text-[0.9375rem] font-medium" data-evento="cta_click" data-local="tres-sprints">
          {TRES_SPRINTS.catalogo}
        </LinkOuAncora>
      </div>
    </Trecho>
  );
}
