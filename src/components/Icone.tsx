/**
 * Ícones de traço do site, desenhados à mão num quadro de 20 × 20 com
 * traço de 1,5 px. Server Component; sempre decorativos (`aria-hidden`): o
 * texto ao lado diz o que o ícone mostra.
 */
export const DESENHOS_DOS_ICONES = {
  seta: <path d="M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5" />,
  setaDiagonal: <path d="M6 14l8-8M7.5 6H14v6.5" />,
  check: <path d="M4.5 10.5l3.5 3.5 7.5-8" />,
  relogio: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6.5V10l2.5 1.75" />
    </>
  ),
  conversa: <path d="M10 3.5c3.87 0 7 2.6 7 5.8s-3.13 5.8-7 5.8c-.83 0-1.63-.12-2.37-.34L4 16.5l.95-3.2C3.73 12.27 3 10.85 3 9.3c0-3.2 3.13-5.8 7-5.8z" />,
  busca: (
    <>
      <circle cx="9" cy="9" r="5.25" />
      <path d="M13 13l3.5 3.5" />
    </>
  ),
  janela: (
    <>
      <rect x="3" y="4" width="14" height="12" rx="2.5" />
      <path d="M3 7.75h14M5.75 6h.01M7.75 6h.01" />
    </>
  ),
  colunas: (
    <>
      <rect x="3" y="3.5" width="4" height="13" rx="1.25" />
      <rect x="8.5" y="3.5" width="4" height="9" rx="1.25" />
      <rect x="14" y="3.5" width="3" height="6" rx="1.25" />
    </>
  ),
  fluxo: (
    <>
      <rect x="2.75" y="3.5" width="5.5" height="4.5" rx="1.25" />
      <rect x="11.75" y="12" width="5.5" height="4.5" rx="1.25" />
      <path d="M8.25 5.75h2.5a2 2 0 012 2v4.25" />
    </>
  ),
  alvo: (
    <>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 10h.01" />
    </>
  ),
  sinal: <path d="M3 15.5l4.25-4.75 3.25 2.75L17 6M12.75 6H17v4.25" />,
  etiqueta: (
    <>
      <path d="M3.5 4.75v4.4c0 .4.16.78.44 1.06l6.35 6.35a1.5 1.5 0 002.12 0l4.4-4.4a1.5 1.5 0 000-2.12L10.46 3.69a1.5 1.5 0 00-1.06-.44H5a1.5 1.5 0 00-1.5 1.5z" />
      <path d="M7 7h.01" />
    </>
  ),
  brilho: (
    <path d="M10 3c.4 2.9 1.9 4.6 5 5-3.1.4-4.6 2.1-5 5-.4-2.9-1.9-4.6-5-5 3.1-.4 4.6-2.1 5-5zM15.5 13.5c.17 1.15.73 1.75 1.75 2-1.02.25-1.58.85-1.75 2-.17-1.15-.73-1.75-1.75-2 1.02-.25 1.58-.85 1.75-2z" />
  ),
  carro: (
    <>
      <path d="M3.5 13.5v-2.6c0-.4.1-.79.3-1.14L5.4 7a2 2 0 011.74-1h5.72a2 2 0 011.74 1l1.6 2.76c.2.35.3.74.3 1.14v2.6" />
      <path d="M2.75 13.5h14.5M6 13.5V15M14 13.5V15M6.5 11h.01M13.5 11h.01" />
    </>
  ),
  raio: <path d="M11 2.75L4.75 11h5l-1 6.25L15.25 9h-5l.75-6.25z" />,
} as const;

export type NomeDoIcone = keyof typeof DESENHOS_DOS_ICONES;

export default function Icone({ nome, className = "size-5" }: { nome: NomeDoIcone; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {DESENHOS_DOS_ICONES[nome]}
    </svg>
  );
}
