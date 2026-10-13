import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import Orquestrador from "@/components/home/orquestrador/Orquestrador";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/agente-de-ia-para-whatsapp";

export const metadata = metadataDa(ROTA);

/** Página de solução; conteúdo em `conteudo/solucoes.ts`, molde em `PaginaDeSolucao`. */
export default function Pagina() {
  return <PaginaDeSolucao rota={ROTA} demonstracao={<Orquestrador />} />;
}
