import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Rastreamento de conversões",
  description: "Cada lead e cada venda ligados ao anúncio de origem.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Rastreamento de conversões" resumo="Cada lead e cada venda ligados ao anúncio de origem." />;
}
