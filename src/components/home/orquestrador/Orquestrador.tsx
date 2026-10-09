import OrquestradorVisao, { estadoFinal } from "./OrquestradorVisao";
import OrquestradorPreguicoso from "./OrquestradorPreguicoso";

export default function Orquestrador() {
  return (
    <section id="demonstracao" aria-labelledby="titulo-orquestrador" className="adiada py-24 md:py-32">
      <div className="conteiner">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44rem]">
            <h2 id="titulo-orquestrador" className="titulo-secao">
              Veja o sistema trabalhando
            </h2>
            <p className="mt-5 text-lg text-secundario">
              Escolha uma frente para ver o que acontece em cada etapa, da mensagem ao card no CRM.
            </p>
          </div>
          <p className="rotulo rounded-md bg-grafite px-2.5 py-1.5 text-papel">Demonstração com dados fictícios</p>
        </div>
        <div className="mt-12">
          <OrquestradorPreguicoso>
            <OrquestradorVisao estado={estadoFinal(0)} />
          </OrquestradorPreguicoso>
        </div>
      </div>
    </section>
  );
}
