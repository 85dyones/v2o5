import PaginaProvisoria from "@/components/PaginaProvisoria";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/rastreamento-de-conversoes";

export const metadata = metadataDa(ROTA);

export default function Pagina() {
  return <PaginaProvisoria rota={ROTA} />;
}
