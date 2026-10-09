import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Pedir diagnóstico",
  description: "45 minutos de conversa e um mapa do que fazer, em até 24 horas. O formulário entra na próxima etapa.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Pedir diagnóstico" resumo="45 minutos de conversa e um mapa do que fazer, em até 24 horas. O formulário entra na próxima etapa." />;
}
