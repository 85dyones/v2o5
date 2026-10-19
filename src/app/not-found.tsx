import type { Metadata } from "next";
import Link from "next/link";
import LinkOuAncora from "@/components/LinkOuAncora";
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
        <p className="sobretitulo">Erro 404</p>
        <h1 className="titulo-secao mt-5 max-w-[40rem]">Esta página não existe</h1>
        <p className="mt-5 max-w-[36rem] text-lg text-texto-secundario">
          O endereço pode ter mudado com o site novo. Estes caminhos levam ao que mais se procura por aqui.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <Link href="/diagnostico" className="botao botao-primario" data-evento="cta_click" data-local="nao-encontrada">
              Pedir diagnóstico
            </Link>
          </li>
          <li>
            <LinkOuAncora href="/#solucoes" className="botao botao-secundario">
              Ver as soluções
            </LinkOuAncora>
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
