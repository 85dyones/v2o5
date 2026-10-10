import OrquestradorVisao, { estadoFinal } from "./OrquestradorVisao";
import OrquestradorPreguicoso from "./OrquestradorPreguicoso";

export default function Orquestrador() {
  return (
    <section id="demonstracao" aria-labelledby="titulo-orquestrador" className="adiada relative py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[40rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(23_119_63/0.12),transparent)]"
      />
      <div className="conteiner">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-[46rem]">
            <p className="sobretitulo">Demonstração</p>
            <h2 id="titulo-orquestrador" className="titulo-secao mt-5">
              Veja o sistema trabalhando.{" "}
              <span className="apagado">Da mensagem ao card no CRM, etapa por etapa.</span>
            </h2>
          </div>
          <p className="rotulo flex items-center gap-2 rounded-full bg-vidro px-3 py-2 text-secundario contorno">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ambar" />
            Demonstração com dados fictícios
          </p>
        </div>
        <div className="mt-12 md:mt-14">
          <OrquestradorPreguicoso>
            <OrquestradorVisao estado={estadoFinal(0)} />
          </OrquestradorPreguicoso>
        </div>
      </div>
    </section>
  );
}
