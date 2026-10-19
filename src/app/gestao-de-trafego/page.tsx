import PaginaProvisoria from "@/components/PaginaProvisoria";
import { metadataDa } from "@/conteudo/paginas";

const ROTA = "/gestao-de-trafego";

export const metadata = metadataDa(ROTA);

export default function Pagina() {
  // Tráfego é a etapa de atração: a rota desce em violeta.
  return <PaginaProvisoria rota={ROTA} etapa="violeta" />;
}
