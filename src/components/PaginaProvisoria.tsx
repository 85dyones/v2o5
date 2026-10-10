import Link from "next/link";
import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import JsonLd from "@/components/JsonLd";
import { paginaDa } from "@/conteudo/paginas";
import { grafoDaInterna } from "@/lib/schema";

/**
 * Página do mapa que ainda não tem conteúdo: título, resumo e saída. Fica
 * com `noindex` (`pronta: false` em conteudo/paginas.ts) até ganhar texto.
 */
export default function PaginaProvisoria({ rota }: { rota: string }) {
  const { titulo, descricao } = paginaDa(rota);
  return (
    <>
      <Topo />
      <main id="conteudo" className="conteiner min-h-[60vh] py-20 md:py-28">
        <p className="sobretitulo">Em construção</p>
        <h1 className="titulo-secao mt-5 max-w-[40rem]">{titulo}</h1>
        <p className="texto-guia mt-6 max-w-[36rem]">{descricao}</p>
        <Link href="/" className="botao botao-secundario mt-10">
          Voltar para a página inicial
        </Link>
      </main>
      <Rodape />
      <JsonLd grafo={grafoDaInterna(rota)} />
    </>
  );
}
