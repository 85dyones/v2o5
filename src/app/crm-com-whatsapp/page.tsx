import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/crm-com-whatsapp";

export const metadata = metadataDa(ROTA);

/** Página de solução; conteúdo em `conteudo/solucoes.ts`, molde em `PaginaDeSolucao`. */
export default function Pagina() {
  return <PaginaDeSolucao rota={ROTA} />;
}
