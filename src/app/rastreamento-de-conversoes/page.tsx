import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import { OQueRegistramosSecao } from "@/components/solucoes/OQueRegistramosSecao";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/rastreamento-de-conversoes";

export const metadata = metadataDa(ROTA);

/** Página de solução; conteúdo em `conteudo/solucoes.ts`, molde em `PaginaDeSolucao`. */
export default function Pagina() {
  return <PaginaDeSolucao rota={ROTA} demonstracao={<OQueRegistramosSecao />} />;
}
