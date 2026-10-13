"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  EVENTO_DA_MEDICAO,
  cookiesDeMedicaoPresentes,
  desligarMedicao,
  ferramentas,
  medicaoDesligada,
  religarMedicao,
} from "@/lib/medicao";
import { CHAVE_DA_ORIGEM } from "@/lib/origem";

/**
 * O controle de oposição da página de privacidade (LGPD, art. 18, § 2º), no
 * modelo da Motors: diz quais ferramentas esta versão do site carrega, se a
 * medição está ligada neste navegador, o que há guardado (cookies das
 * ferramentas e origem da visita) e liga ou desliga na hora.
 *
 * Lê o armazenamento por `useSyncExternalStore`: no servidor e na hidratação
 * responde "carregando", e só no navegador diz o que há.
 */

interface Estado {
  desligada: boolean;
  cookies: string[];
  comOrigem: boolean;
}

let ultimo: Estado | null = null;

function lerEstado(): Estado {
  const desligada = medicaoDesligada();
  const cookies = cookiesDeMedicaoPresentes();
  let comOrigem = false;
  try {
    const guardada = sessionStorage.getItem(CHAVE_DA_ORIGEM);
    const origem = guardada ? (JSON.parse(guardada) as Record<string, string>) : {};
    comOrigem = Object.keys(origem).some((k) => k !== "entrada");
  } catch {
    comOrigem = false;
  }
  if (
    ultimo &&
    ultimo.desligada === desligada &&
    ultimo.comOrigem === comOrigem &&
    ultimo.cookies.join() === cookies.join()
  ) {
    return ultimo;
  }
  ultimo = { desligada, cookies, comOrigem };
  return ultimo;
}

function assinar(aoMudar: () => void) {
  window.addEventListener(EVENTO_DA_MEDICAO, aoMudar);
  window.addEventListener("storage", aoMudar);
  return () => {
    window.removeEventListener(EVENTO_DA_MEDICAO, aoMudar);
    window.removeEventListener("storage", aoMudar);
  };
}

const CONFIGURADAS = ferramentas();

export default function ControleDeMedicao() {
  const estado = useSyncExternalStore(assinar, lerEstado, () => null);

  const desligar = useCallback(() => desligarMedicao(), []);
  const religar = useCallback(() => religarMedicao(), []);

  if (!estado) return null;

  const nenhuma = !CONFIGURADAS.ga4 && !CONFIGURADAS.pixel;
  const guardado = [
    estado.cookies.length ? `cookies de medição (${estado.cookies.join(", ")})` : null,
    estado.comOrigem ? "a origem desta visita (utm, gclid, fbclid ou referrer)" : null,
  ].filter(Boolean);

  return (
    <div className="rounded-2xl bg-vidro p-5 contorno">
      <p className="font-semibold tracking-[-0.01em]">
        {estado.desligada
          ? "A medição está desligada neste navegador"
          : nenhuma
            ? "Nenhuma ferramenta de medição está ligada nesta versão do site"
            : "A medição está ligada neste navegador"}
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-secundario">
        Ferramentas desta versão: Google Analytics 4 {CONFIGURADAS.ga4 ? "ligado" : "desligado"}; Pixel da Meta{" "}
        {CONFIGURADAS.pixel ? "ligado" : "desligado"}.{" "}
        {guardado.length
          ? `Guardado neste navegador agora: ${guardado.join(" e ")}.`
          : "Nada guardado neste navegador agora."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {estado.desligada ? (
          <button type="button" onClick={religar} className="botao botao-secundario botao-compacto">
            Religar a medição
          </button>
        ) : (
          <button type="button" onClick={desligar} className="botao botao-secundario botao-compacto">
            {nenhuma ? "Desligar a medição e apagar a origem guardada" : "Desligar a medição neste navegador"}
          </button>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-secundario">
        Desligar grava a escolha neste navegador, apaga os cookies das ferramentas e a origem da visita, e impede o
        envio do seu pedido à Meta pelo servidor. Religar vale a partir da próxima página aberta.
      </p>
    </div>
  );
}
