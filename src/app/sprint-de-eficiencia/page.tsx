import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import ComoSeLiga from "@/components/home/diagrama/ComoSeLiga";
import CondicoesDoSprint from "@/components/ofertas/CondicoesDoSprint";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/sprint-de-eficiencia";

export const metadata = metadataDa(ROTA);

/**
 * Página de solução do Sprint (27/10/2026): o método em seis passos, um
 * exemplo de como as peças se ligam, do que o preço é feito e como o projeto
 * é combinado. Conteúdo em `conteudo/solucoes.ts` e `conteudo/sprint.ts`.
 */
export default function Pagina() {
  const extras = (
    <>
      <ComoSeLiga />
      <CondicoesDoSprint />
    </>
  );
  return <PaginaDeSolucao rota={ROTA} demonstracao={extras} />;
}
