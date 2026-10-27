import Estacoes, { Camadas } from "@/components/home/mapa/Estacoes";
import { TEXTO_DA_ETAPA } from "@/components/rota/Rota";
import { NOME_DA_ETAPA, PECAS, type IdDaPeca } from "@/conteudo/home";

/**
 * O diagrama sem estado: o servidor o desenha com a peça "Site" escolhida
 * (zero JavaScript); a versão interativa usa este mesmo componente e
 * acrescenta clique, teclado e o foco ao passar o mouse. É o mapa da
 * abertura em tamanho grande: as estações fora do caminho da peça apagam, e
 * o painel diz o que ela faz (o caminho, só para o leitor de tela).
 */

export interface PropsDoDiagrama {
  selecionada: IdDaPeca;
  foco?: IdDaPeca | null;
  aoEscolher?: (id: IdDaPeca) => void;
  aoFocar?: (id: IdDaPeca | null) => void;
}

export default function DiagramaVisao({ selecionada, foco, aoEscolher, aoFocar }: PropsDoDiagrama) {
  const peca = PECAS.find((p) => p.id === selecionada)!;
  const passos = peca.caminho.map((id) => PECAS.find((p) => p.id === id)!);

  return (
    <div className="border-y-2 border-texto">
      <div className="border-b border-linha">
        <Estacoes
          rotulo="Diagrama: como as peças do sistema se ligam"
          foco={foco ?? selecionada}
          escolhida={selecionada}
          aoEscolher={aoEscolher}
          aoFocar={aoFocar}
        />
      </div>
      <Camadas escolhida={selecionada} aoEscolher={aoEscolher} aoFocar={aoFocar} />

      <div aria-live="polite" className="py-8 md:py-10">
        <p className="rotulo" style={{ color: peca.camada ? undefined : TEXTO_DA_ETAPA[peca.etapa] }}>
          {peca.camada ? `Camada: ${peca.camada.toLowerCase()}` : NOME_DA_ETAPA[peca.etapa]}
        </p>
        <h3 className="mt-3 text-titulo-3">{peca.nome}</h3>
        <p className="mt-3 max-w-[36rem] text-texto-secundario">{peca.texto}</p>
        {/* O mapa acima já mostra o caminho apagando as outras estações; isso
            é só visual, então o caminho fica dito para o leitor de tela. */}
        <div className="sr-only">
          <p>{peca.camada ? "Paradas que ela toca" : "Caminho que passa por aqui"}</p>
          <ol>
            {passos.map((p, i) => (
              <li key={`${p.id}-${i}`}>{p.nome}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
