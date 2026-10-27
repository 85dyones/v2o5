import type { CSSProperties } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import LinkOuAncora from "@/components/LinkOuAncora";
import Construcao from "@/components/marca/Construcao";
import { COR_DA_ROTA, Parada } from "@/components/rota/Rota";

/**
 * O fecho, na única faixa escura da página: a rota chega em âmbar e termina
 * no botão principal, que é a Venda. À direita, o símbolo em papel.
 */
export default function Fechamento({
  titulo = "Comece pelo diagnóstico, que é gratuito.",
  texto = "Em 45 minutos de conversa com o fundador, a gente entende como a sua empresa vende hoje e identifica o gargalo que vale priorizar. A sessão é gratuita e sem compromisso.",
  botao = "Pedir diagnóstico",
  secundario = { href: "/precos", texto: "Ver os preços" },
}: {
  titulo?: string;
  texto?: string;
  botao?: string;
  /** O segundo botão do fecho; `null` quando a própria página já é o destino. */
  secundario?: { href: string; texto: string } | null;
}) {
  return (
    <section
      aria-labelledby="titulo-fechamento"
      className="trecho adiada overflow-hidden bg-faixa-escura text-faixa-escura-texto"
      style={{ "--cor-da-rota": COR_DA_ROTA.ambar } as CSSProperties}
      data-entra=""
    >
      <div className="conteiner conteiner-rota fecho-miolo grid grid-cols-12 gap-x-6 gap-y-12 py-24 md:py-32">
        <div className="relative col-span-12 lg:col-span-7">
          <h2 id="titulo-fechamento" className="titulo-secao max-w-[40rem]">
            {titulo}
          </h2>
          <p className="mt-6 max-w-[36rem] text-guia text-faixa-escura-secundario">
            {texto}
          </p>
          <div className="fecho-acoes relative mt-10 flex flex-wrap gap-3">
            <Parada final />
            <Link href="/diagnostico" className="botao botao-primario botao-claro" data-evento="cta_click" data-local="fechamento">
              {botao}
              <Icone nome="seta" className="seta size-4" />
            </Link>
            {secundario ? (
              <LinkOuAncora href={secundario.href} className="botao botao-secundario botao-claro" data-evento="cta_click" data-local="fechamento">
                {secundario.texto}
              </LinkOuAncora>
            ) : null}
          </div>
        </div>
        <div aria-hidden="true" className="col-span-12 flex items-end lg:col-span-5 lg:justify-end lg:border-l lg:border-faixa-escura-linha">
          <Construcao className="h-40 w-auto max-w-full md:h-52" />
        </div>
      </div>
    </section>
  );
}
