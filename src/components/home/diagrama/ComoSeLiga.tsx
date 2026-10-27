import { Parada, Trecho } from "@/components/rota/Rota";
import DiagramaVisao from "./DiagramaVisao";
import DiagramaPreguicoso from "./DiagramaPreguicoso";

export default function ComoSeLiga() {
  return (
    <Trecho id="como-se-liga" aria-labelledby="titulo-como-se-liga">
      <div className="relative grid grid-cols-12 gap-x-6">
        <Parada />
        <h2 id="titulo-como-se-liga" className="titulo-secao col-span-12 lg:col-span-9">
          Um exemplo: o caminho de um contato num Sprint Integrado. <span className="apagado">Cada Sprint liga só as peças que o gargalo pede.</span>
        </h2>
        <p className="texto-guia col-span-12 mt-6 lg:col-span-6">Cinco paradas, na ordem do funil: atração, atendimento, gestão e venda. Duas camadas acompanham o caminho inteiro: a automação, que liga as peças, e o rastreamento, que grava a origem na entrada e devolve a venda ao anúncio. Escolha uma peça para ver o caminho; outros Sprints ligam outras peças.</p>
      </div>
      <div className="mt-12 md:mt-14">
        <DiagramaPreguicoso>
          <DiagramaVisao selecionada="site" />
        </DiagramaPreguicoso>
      </div>
    </Trecho>
  );
}
