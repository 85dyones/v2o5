import type { Metadata } from "next";
import PaginaProvisoria from "@/components/PaginaProvisoria";

export const metadata: Metadata = {
  title: "Agente de IA para WhatsApp",
  description: "Atendimento na hora, com as informações do seu negócio e passagem para a equipe.",
};

export default function Pagina() {
  return <PaginaProvisoria titulo="Agente de IA para WhatsApp" resumo="Atendimento na hora, com as informações do seu negócio e passagem para a equipe." />;
}
