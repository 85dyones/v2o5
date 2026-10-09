import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Sobre a V2O5",
  description: "Quem é a V2O5 Vendas e Tecnologia e como trabalha.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Sobre a V2O5" resumo="Quem é a V2O5 Vendas e Tecnologia e como trabalha." />;
}
