import localFont from "next/font/local";

/*
 * As duas famílias da marca, Geist e Geist Mono, locais. Nunca
 * `next/font/google`: busca na hora da build e derrubou deploy da Motors.
 *
 * Os arquivos são recortes latinos das fontes variáveis do pacote npm `geist`
 * (`scripts/subsetar-fontes.sh`, licença OFL em `fonts/OFL-Geist.txt`):
 * 32 KB em vez de 68 KB na Geist, que é a fonte do H1 e entra antes do LCP.
 * O eixo de peso 100–900 e os números tabulares continuam.
 *
 * A Geist Mono não passa por aqui: ela só aparece em rótulos e números
 * abaixo da dobra, e mesmo sem preload o navegador a pedia antes do LCP (o
 * bento já cai na margem que ele renderiza). `FonteMonoTardia.tsx` a carrega
 * depois do `load`; até lá vale a monoespaçada do sistema.
 *
 * `tests/fontes.test.ts` trava as duas famílias e o pré-carregamento.
 */

export const Geist = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
