import { lerOrigem, type Origem } from "@/lib/leads";

/**
 * Primeiro toque da visita, guardado no navegador (sessionStorage) na
 * primeira página aberta, para o formulário mandar junto com o lead. Sem
 * cookie e sem identificar ninguém: só UTM, click ID, referrer e a página de
 * entrada. Fora do navegador (teste, servidor) não faz nada.
 */

export const CHAVE_DA_ORIGEM = "v2o5.origem";
const CHAVE = CHAVE_DA_ORIGEM;

export function guardarPrimeiroToque(): void {
  try {
    if (sessionStorage.getItem(CHAVE)) return;
    const origem = lerOrigem(location.href, document.referrer);
    sessionStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // sessionStorage indisponível (modo privado, bloqueio): segue sem origem.
  }
}

export function origemDaVisita(): Origem {
  try {
    const guardada = sessionStorage.getItem(CHAVE);
    if (guardada) return JSON.parse(guardada) as Origem;
  } catch {
    // cai para a leitura direta
  }
  return lerOrigem(location.href, document.referrer);
}
