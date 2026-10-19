/**
 * O número de um case, parado no valor. Até 19/10 ele contava de zero ao
 * entrar na tela; a direção B proíbe contador que parte de zero (o robô e
 * quem não roda JavaScript liam "0" em outros sites), então o número é só
 * texto do servidor. O nome ficou para as páginas que ainda o importam.
 */
export default function NumeroQueConta({ valor }: { valor: number }) {
  return <span className="tabular-nums">{valor}</span>;
}
