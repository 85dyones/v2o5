import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como a V2O5 trata os dados de quem visita o site.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Privacidade" resumo="Como a V2O5 trata os dados de quem visita o site." />;
}
