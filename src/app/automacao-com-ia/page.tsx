import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Automação com IA",
  description: "Fluxos no n8n ligando os sistemas que a sua empresa já usa.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Automação com IA" resumo="Fluxos no n8n ligando os sistemas que a sua empresa já usa." />;
}
