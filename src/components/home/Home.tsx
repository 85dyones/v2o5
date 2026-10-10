import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import Hero from "@/components/home/Hero";
import Solucoes from "@/components/home/Solucoes";
import Garantias from "@/components/home/Garantias";
import ChamadaCurta from "@/components/home/ChamadaCurta";
import Perguntas from "@/components/home/Perguntas";
import VisaoAmpla from "@/components/home/VisaoAmpla";
import Orquestrador from "@/components/home/orquestrador/Orquestrador";
import ComoSeLiga from "@/components/home/diagrama/ComoSeLiga";
import CaseMotors from "@/components/home/CaseMotors";
import Automotivo from "@/components/home/Automotivo";
import Fechamento from "@/components/home/Fechamento";

/** A home inteira. O H1 vem de `TITULO_DA_HOME` (conteudo/home.ts). */
export default function Home({ titulo }: { titulo: string }) {
  return (
    <>
      <Topo />
      <main id="conteudo">
        <Hero titulo={titulo} />
        <Solucoes />
        <Garantias />
        <VisaoAmpla />
        <Orquestrador />
        <ComoSeLiga />
        <CaseMotors />
        <ChamadaCurta qual="depoisDoCase" />
        <Automotivo />
        <Perguntas />
        <Fechamento />
      </main>
      <Rodape />
    </>
  );
}
