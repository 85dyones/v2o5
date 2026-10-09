/**
 * Pontos ao longo de um caminho SVG feito de `M`, `L`, `A` (arco de círculo)
 * e `Z`, igualmente espaçados pelo comprimento. É o que o canvas do hero usa
 * para pôr partículas no contorno da nuvem do símbolo.
 *
 * Conta pura, sem DOM: `SVGPathElement.getPointAtLength` fazia a mesma coisa,
 * mas 360 chamadas custavam uma tarefa de ~550 ms no celular simulado do
 * Lighthouse (TBT). `tests/contorno.test.ts` confere os pontos.
 */

export interface Ponto {
  x: number;
  y: number;
}

type Trecho =
  | { tipo: "reta"; de: Ponto; ate: Ponto; comprimento: number }
  | { tipo: "arco"; cx: number; cy: number; r: number; inicio: number; varredura: number; comprimento: number };

/** Ângulo com sinal de u para v. */
function angulo(ux: number, uy: number, vx: number, vy: number): number {
  return Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
}

/** Arco de círculo (rx = ry, sem rotação) da forma de pontas para a de centro (SVG, apêndice B.2.4). */
function arco(p1: Ponto, p2: Ponto, r: number, grande: boolean, horario: boolean): Trecho {
  const x1 = (p1.x - p2.x) / 2;
  const y1 = (p1.y - p2.y) / 2;
  const d2 = x1 * x1 + y1 * y1;
  // Raio pequeno demais para as pontas: o SVG o aumenta até caber.
  const raio = Math.max(r, Math.sqrt(d2));
  const coef = (grande !== horario ? 1 : -1) * Math.sqrt(Math.max(0, (raio * raio - d2) / d2));
  const cxl = coef * y1;
  const cyl = -coef * x1;
  const cx = cxl + (p1.x + p2.x) / 2;
  const cy = cyl + (p1.y + p2.y) / 2;
  const inicio = Math.atan2((y1 - cyl) / raio, (x1 - cxl) / raio);
  let varredura = angulo((x1 - cxl) / raio, (y1 - cyl) / raio, (-x1 - cxl) / raio, (-y1 - cyl) / raio);
  if (!horario && varredura > 0) varredura -= 2 * Math.PI;
  if (horario && varredura < 0) varredura += 2 * Math.PI;
  return { tipo: "arco", cx, cy, r: raio, inicio, varredura, comprimento: Math.abs(varredura) * raio };
}

function reta(de: Ponto, ate: Ponto): Trecho {
  return { tipo: "reta", de, ate, comprimento: Math.hypot(ate.x - de.x, ate.y - de.y) };
}

export function lerCaminho(d: string): Trecho[] {
  const fichas = d.match(/[MLAZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [];
  const trechos: Trecho[] = [];
  let i = 0;
  let atual: Ponto = { x: 0, y: 0 };
  let inicio: Ponto = { x: 0, y: 0 };
  const num = () => Number(fichas[i++]);
  while (i < fichas.length) {
    const cmd = fichas[i++].toUpperCase();
    if (cmd === "M") {
      atual = inicio = { x: num(), y: num() };
    } else if (cmd === "L") {
      const p = { x: num(), y: num() };
      trechos.push(reta(atual, p));
      atual = p;
    } else if (cmd === "A") {
      const r = num();
      num(); // ry: a família C1 só tem círculos
      num(); // rotação
      const grande = num() === 1;
      const horario = num() === 1;
      const p = { x: num(), y: num() };
      trechos.push(arco(atual, p, r, grande, horario));
      atual = p;
    } else if (cmd === "Z") {
      if (atual.x !== inicio.x || atual.y !== inicio.y) trechos.push(reta(atual, inicio));
      atual = inicio;
    } else {
      throw new Error(`Comando de caminho não suportado: ${cmd}`);
    }
  }
  return trechos;
}

function pontoNoTrecho(t: Trecho, f: number): Ponto {
  if (t.tipo === "reta") return { x: t.de.x + (t.ate.x - t.de.x) * f, y: t.de.y + (t.ate.y - t.de.y) * f };
  const a = t.inicio + t.varredura * f;
  return { x: t.cx + t.r * Math.cos(a), y: t.cy + t.r * Math.sin(a) };
}

/** `quantidade` pontos igualmente espaçados ao longo do caminho, a partir do início. */
export function amostrarCaminho(d: string, quantidade: number): Ponto[] {
  const trechos = lerCaminho(d);
  const total = trechos.reduce((s, t) => s + t.comprimento, 0);
  const pontos: Ponto[] = [];
  let k = 0;
  let acumulado = 0;
  for (let n = 0; n < quantidade; n++) {
    const alvo = (n / quantidade) * total;
    while (k < trechos.length - 1 && acumulado + trechos[k].comprimento < alvo) {
      acumulado += trechos[k].comprimento;
      k++;
    }
    const t = trechos[k];
    pontos.push(pontoNoTrecho(t, t.comprimento ? (alvo - acumulado) / t.comprimento : 0));
  }
  return pontos;
}
