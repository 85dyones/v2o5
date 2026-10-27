import PaginaDeSolucao from "@/components/solucoes/PaginaDeSolucao";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/branding-e-identidade";

export const metadata = metadataDa(ROTA);

/** Página de solução (27/10/2026); conteúdo em `conteudo/solucoes.ts`, pacotes em `conteudo/ofertas.ts`, molde em `PaginaDeSolucao`. */
export default function Pagina() {
  return <PaginaDeSolucao rota={ROTA} />;
}
