import Topo from "@/components/layout/Topo";
import Rodape from "@/components/layout/Rodape";
import BotaoWhatsAppFixo from "@/components/layout/BotaoWhatsAppFixo";
import Entradas from "@/components/layout/Entradas";
import Hero from "@/components/home/Hero";
import Solucoes from "@/components/home/Solucoes";
import Perguntas from "@/components/home/Perguntas";
import ComoSeLiga from "@/components/home/diagrama/ComoSeLiga";
import Automotivo from "@/components/home/Automotivo";
import Fechamento from "@/components/home/Fechamento";
import Dores from "@/components/home/Dores";
import Sprint from "@/components/home/Sprint";
import Indicadores from "@/components/home/Indicadores";
import ProjetoReal from "@/components/home/ProjetoReal";
import Escada from "@/components/home/Escada";
import Nome from "@/components/home/Nome";
import { FECHO } from "@/conteudo/home";

/**
 * A home inteira. O H1 vem de `TITULO_DA_HOME` (conteudo/home.ts). A ordem
 * (27/10/2026) responde em poucos segundos o que a V2O5 faz e como começar:
 * a abertura, as quatro soluções e a continuidade, o caminho de entrada
 * (diagnóstico, solução, continuidade), os problemas da operação e o método
 * do Sprint, um exemplo de como as peças se ligam, o que se mede, a prova (a
 * Motors Store) e o segmento automotivo.
 */
export default function Home({ titulo }: { titulo: string }) {
  return (
    <>
      <Topo />
      <main id="conteudo">
        <Hero titulo={titulo} />
        <Solucoes />
        <Escada />
        <Dores />
        <Sprint />
        <ComoSeLiga />
        <Indicadores />
        <ProjetoReal />
        <Automotivo />
        <Perguntas />
        <Nome />
        <Fechamento titulo={FECHO.titulo} texto={FECHO.texto} botao={FECHO.botao} />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo pagina="home" />
      <Entradas />
    </>
  );
}
