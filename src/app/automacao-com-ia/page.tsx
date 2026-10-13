import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import ComoSeLiga from "@/components/home/diagrama/ComoSeLiga";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/automacao-com-ia";

export const metadata = metadataDa(ROTA);

/** Página de solução; conteúdo em `conteudo/solucoes.ts`, molde em `PaginaDeSolucao`. */
export default function Pagina() {
  return <PaginaDeSolucao rota={ROTA} demonstracao={<ComoSeLiga />} />;
}
