import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "CRM com WhatsApp",
  description: "Funil com origem, etapa e próximo passo de cada contato.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="CRM com WhatsApp" resumo="Funil com origem, etapa e próximo passo de cada contato." />;
}
