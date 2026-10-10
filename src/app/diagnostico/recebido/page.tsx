import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Icone from "@/components/Icone";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import { DIAGNOSTICO } from "@/conteudo/diagnostico";
import { metadataDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";

const ROTA = "/diagnostico/recebido";

export const metadata = metadataDa(ROTA);

/** Depois do envio: o que acontece agora. Fora do índice (`pronta: false`). */
export default function Pagina() {
  const r = DIAGNOSTICO.recebido;
  return (
    <>
      <Topo />
      <main id="conteudo" className="conteiner min-h-[60vh] py-20 md:py-28">
        <p className="flex items-center gap-2 text-sm font-medium text-verde-claro">
          <Icone nome="check" className="size-4" />
          Pedido enviado
        </p>
        <h1 className="titulo-secao mt-5 max-w-[40rem]">{r.titulo}</h1>
        <p className="texto-guia mt-6 max-w-[36rem]">{r.texto}</p>
        <p className="mt-12 text-sm font-medium text-secundario">{r.enquantoIsso}</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link href="/precos" className="botao botao-secundario">
              Ver os preços
            </Link>
          </li>
          <li>
            <Link href="/cases/motors-store" className="botao botao-secundario">
              Ler o case Motors Store
            </Link>
          </li>
          <li>
            <Link href="/" className="botao botao-secundario">
              Voltar para a página inicial
            </Link>
          </li>
        </ul>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDaInterna(ROTA)} />
    </>
  );
}
