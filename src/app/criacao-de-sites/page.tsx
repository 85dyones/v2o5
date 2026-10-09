import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Criação de sites",
  description: "Sites rápidos, achados no Google e nas respostas das IAs de busca.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Criação de sites" resumo="Sites rápidos, achados no Google e nas respostas das IAs de busca." />;
}
