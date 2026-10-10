import PaginaProvisoria from "@/components/PaginaProvisoria";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/privacidade";

export const metadata = metadataDa(ROTA);

export default function Pagina() {
  return <PaginaProvisoria rota={ROTA} />;
}
