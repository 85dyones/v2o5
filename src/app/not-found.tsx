import type { Metadata } from "next";
import Link from "next/link";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/** 404 com status 404 e saídas para o que a pessoa provavelmente procurava. */
export default function NaoEncontrada() {
  return (
    <>
      <Topo />
      <main id="conteudo" className="conteiner min-h-[60vh] py-20 md:py-28">
        <p className="rotulo text-secundario">Erro 404</p>
        <h1 className="titulo-secao mt-4 max-w-[40rem]">Esta página não existe</h1>
        <p className="mt-5 max-w-[36rem] text-lg text-secundario">
          O endereço pode ter mudado com o site novo. Estes caminhos levam ao que mais se procura por aqui.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <Link href="/diagnostico" className="botao botao-primario">
              Pedir diagnóstico
            </Link>
          </li>
          <li>
            <Link href="/#solucoes" className="botao botao-secundario">
              Ver as soluções
            </Link>
          </li>
          <li>
            <Link href="/cases/motors-store" className="botao botao-secundario">
              Ver o case Motors Store
            </Link>
          </li>
        </ul>
      </main>
      <Rodape />
    </>
  );
}
