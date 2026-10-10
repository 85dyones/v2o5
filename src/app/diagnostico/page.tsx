import PaginaProvisoria from "@/components/PaginaProvisoria";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/diagnostico";

export const metadata = metadataDa(ROTA);

export default function Pagina() {
  return <PaginaProvisoria rota={ROTA} />;
}
