import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Gestão de tráfego",
  description: "Google e Meta ajustados pelo que virou venda.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Gestão de tráfego" resumo="Google e Meta ajustados pelo que virou venda." />;
}
