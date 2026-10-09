import DiagramaVisao from "./DiagramaVisao";
import DiagramaPreguicoso from "./DiagramaPreguicoso";

export default function ComoSeLiga() {
  return (
    <section id="como-se-liga" aria-labelledby="titulo-como-se-liga" className="adiada py-24 md:py-36">
      <div className="conteiner">
        <div className="max-w-[48rem]">
          <p className="sobretitulo">Arquitetura</p>
          <h2 id="titulo-como-se-liga" className="titulo-secao mt-5">
            Como tudo se liga.{" "}
            <span className="apagado">Cada peça passa o contato adiante, com a origem junto.</span>
          </h2>
          <p className="texto-guia mt-6 max-w-[36rem]">Escolha uma peça para ver o caminho que passa por ela.</p>
        </div>
        <div className="mt-12 md:mt-14">
          <DiagramaPreguicoso>
            <DiagramaVisao selecionada="site" />
          </DiagramaPreguicoso>
        </div>
      </div>
    </section>
  );
}
