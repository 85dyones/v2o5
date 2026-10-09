import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Revendas de veículos",
  description: "Site de estoque, agente de IA, CRM e rastreamento para revendas, com integração ao Revenda Mais.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Revendas de veículos" resumo="Site de estoque, agente de IA, CRM e rastreamento para revendas, com integração ao Revenda Mais." />;
}
