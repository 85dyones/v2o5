import DiagramaVisao from "./DiagramaVisao";
import DiagramaPreguicoso from "./DiagramaPreguicoso";

export default function ComoSeLiga() {
  return (
    <section id="como-se-liga" aria-labelledby="titulo-como-se-liga" className="adiada py-24 md:py-32">
      <div className="conteiner">
        <div className="max-w-[44rem]">
          <h2 id="titulo-como-se-liga" className="titulo-secao">
            Como tudo se liga
          </h2>
          <p className="mt-5 text-lg text-secundario">
            Cada peça passa o contato adiante com a origem junto. Escolha uma peça para ver o caminho que passa
            por ela.
          </p>
        </div>
        <div className="mt-12">
          <DiagramaPreguicoso>
            <DiagramaVisao selecionada="site" />
          </DiagramaPreguicoso>
        </div>
      </div>
    </section>
  );
}
