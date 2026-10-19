import { Parada, Trecho } from "@/components/rota/Rota";
import OrquestradorVisao, { estadoFinal } from "./OrquestradorVisao";
import OrquestradorPreguicoso from "./OrquestradorPreguicoso";

export default function Orquestrador() {
  return (
    <Trecho id="demonstracao" aria-label="Demonstração" etapa="verde">
      <div className="relative grid grid-cols-12 items-end gap-x-6 gap-y-6">
        <Parada />
        <h2 id="titulo-orquestrador" className="titulo-secao col-span-12 lg:col-span-8">
          Veja o sistema trabalhando. <span className="apagado">Da mensagem ao card no CRM, etapa por etapa.</span>
        </h2>
        <p className="rotulo col-span-12 text-texto-secundario lg:col-span-4 lg:justify-self-end">Demonstração com dados fictícios</p>
      </div>
      <div className="mt-12 md:mt-14">
        <OrquestradorPreguicoso>
          <OrquestradorVisao estado={estadoFinal(0)} />
        </OrquestradorPreguicoso>
      </div>
    </Trecho>
  );
}
