import Link from "next/link";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";

/** Página vazia com título, para a navegação do protótipo não dar 404. */
export default function PaginaProvisoria({ titulo, resumo }: { titulo: string; resumo: string }) {
  return (
    <>
      <Topo />
      <main id="conteudo" className="conteiner min-h-[60vh] py-20 md:py-28">
        <p className="rotulo text-secundario">Em construção</p>
        <h1 className="titulo-secao mt-4 max-w-[40rem]">{titulo}</h1>
        <p className="mt-5 max-w-[36rem] text-lg text-secundario">{resumo}</p>
        <Link href="/" className="botao botao-secundario mt-10">
          Voltar para a página inicial
        </Link>
      </main>
      <Rodape />
    </>
  );
}
