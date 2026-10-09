/**
 * A molécula V2O5 em partículas, desenhada em canvas 2D.
 *
 * Módulo sem React e sem dependência: o hero o importa com `import()` só
 * depois do `load` e de um momento ocioso, para o H1 continuar sendo o LCP e o
 * motor não pesar no JavaScript inicial. Quem chama já conferiu
 * `prefers-reduced-motion`; mesmo assim, `estatico: true` desenha um quadro
 * só e não agenda nenhum outro (aparelho fraco).
 *
 * Espaço de coordenadas: o mesmo viewBox do símbolo (`marca.ts`). O desenho
 * ocupa o retângulo interno do canvas com `MARGEM` de folga em cada lado, a
 * mesma do SVG estático, para a troca entre os dois não mexer no desenho.
 */
import { amostrarCaminho } from "./contorno";
import { MARGEM_DO_HERO as MARGEM, MOLECULA, RAIO, VIEWBOX, type No } from "./marca";

const CICLO_DO_SINAL = 4.8; // segundos, o mesmo ciclo do logo animado
const PERCURSO_DO_SINAL = 0.36; // fração do ciclo em que o sinal anda
const DISTANCIA_QUE_ACENDE = 24; // unidades do viewBox

const PAPEL = [242, 241, 236] as const;
const AMBAR = [242, 165, 22] as const;

export interface OpcoesDasParticulas {
  /** Quantas partículas ao todo (o hero escolhe pelo tamanho da tela). */
  quantidade: number;
  /** Um quadro só, sem laço: aparelho fraco. */
  estatico?: boolean;
  /** Sinal periódico sem precisar de cursor (tela de toque). */
  sinalAutomatico?: boolean;
  /** Chamado depois do primeiro quadro pintado. */
  aoPintar?: () => void;
}

export interface MotorDasParticulas {
  /** Liga ou desliga o estado aceso (cursor perto, foco ou hover no CTA). */
  acender(fonte: string, ligado: boolean): void;
  /** Posição do ponteiro em px relativos ao canvas, ou `null` ao sair. */
  ponteiro(x: number | null, y?: number): void;
  destruir(): void;
}

interface ParticulaDeNo {
  no: number;
  raio: number;
  angulo: number;
  velocidade: number;
  achatamento: number;
  inclinacao: number;
  tamanho: number;
  alfa: number;
}

interface ParticulaDeLigacao {
  ligacao: number;
  t: number;
  velocidade: number;
  desvio: number;
  tamanho: number;
}

interface ParticulaDaNuvem {
  u: number;
  velocidade: number;
  desvio: number;
  tamanho: number;
  alfa: number;
}

interface Entrada {
  x: number;
  y: number;
  atraso: number;
  duracao: number;
}

const aleatorio = (min: number, max: number) => min + Math.random() * (max - min);
const saidaCubica = (p: number) => 1 - Math.pow(1 - p, 3);
const limitar = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Distância de um ponto a um segmento, em unidades do viewBox. */
function distanciaAoSegmento(px: number, py: number, a: No, b: No): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = limitar(((px - a.x) * dx + (py - a.y) * dy) / (dx * dx + dy * dy));
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
}

/** Brilho radial pré-desenhado: desenhar imagem custa menos que `shadowBlur`. */
function criarBrilho([r, g, b]: readonly number[]): HTMLCanvasElement {
  const lado = 64;
  const c = document.createElement("canvas");
  c.width = c.height = lado;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.25)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, lado, lado);
  return c;
}

export function iniciarParticulas(
  canvas: HTMLCanvasElement,
  opcoes: OpcoesDasParticulas,
): MotorDasParticulas {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const nos = MOLECULA.nos;
  const indice = new Map(nos.map((n, i) => [n.id, i]));
  const ligacoes = MOLECULA.ligacoes.map(([a, b]) => [indice.get(a)!, indice.get(b)!] as const);
  const caminhoDoSinal = MOLECULA.sinal.map((id) => indice.get(id)!);
  const contorno = amostrarCaminho(MOLECULA.nuvem, 360);
  const brilhoPapel = criarBrilho(PAPEL);
  const brilhoAmbar = criarBrilho(AMBAR);

  // Partículas: 50% nos nós (proporcional à área), 20% nas ligações, 30% na nuvem.
  const total = Math.max(60, Math.round(opcoes.quantidade));
  const pesos = nos.map((n) => RAIO[n.tipo] ** 2);
  const somaDosPesos = pesos.reduce((a, b) => a + b, 0);
  const deNo: ParticulaDeNo[] = [];
  nos.forEach((n, i) => {
    const qtd = Math.round((total * 0.5 * pesos[i]) / somaDosPesos);
    for (let k = 0; k < qtd; k++) {
      deNo.push({
        no: i,
        raio: RAIO[n.tipo] * (0.15 + 1.05 * Math.sqrt(Math.random())),
        angulo: aleatorio(0, Math.PI * 2),
        velocidade: aleatorio(0.5, 1.5) * (Math.random() < 0.5 ? -1 : 1),
        achatamento: aleatorio(0.45, 1),
        inclinacao: aleatorio(0, Math.PI),
        tamanho: aleatorio(1, 2.2),
        alfa: aleatorio(0.6, 1),
      });
    }
  });
  const deLigacao: ParticulaDeLigacao[] = Array.from({ length: Math.round(total * 0.2) }, (_, k) => ({
    ligacao: k % ligacoes.length,
    t: Math.random(),
    velocidade: aleatorio(0.04, 0.1),
    desvio: aleatorio(-0.9, 0.9),
    tamanho: aleatorio(0.9, 1.6),
  }));
  const daNuvem: ParticulaDaNuvem[] = Array.from({ length: Math.round(total * 0.3) }, () => ({
    u: Math.random(),
    velocidade: aleatorio(0.004, 0.012),
    desvio: aleatorio(-1.6, 1.6) * Math.random(),
    tamanho: aleatorio(0.9, 2),
    alfa: aleatorio(0.3, 0.8),
  }));
  const tracoDaNuvem = new Path2D(MOLECULA.nuvem);

  // Ponto de partida de cada partícula: espalhada, depois se aglutina.
  const entradas: Entrada[] = Array.from({ length: deNo.length + deLigacao.length + daNuvem.length }, () => ({
    x: aleatorio(VIEWBOX.x - 10, VIEWBOX.x + VIEWBOX.largura + 10),
    y: aleatorio(VIEWBOX.y - 8, VIEWBOX.y + VIEWBOX.altura + 8),
    atraso: aleatorio(0, 0.5),
    duracao: aleatorio(1.2, 2),
  }));

  // Estado da interação.
  const intensidade = new Float32Array(ligacoes.length); // 0..1 por ligação
  const brilhoDoNo = new Float32Array(nos.length);
  const fontesAcesas = new Set<string>();
  let ponteiro: { x: number; y: number } | null = null;
  let energia = 0;
  let relogioDoSinal = -1; // < 0: parado
  let anel = -1; // idade do anel em Ot3, em segundos

  // Geometria da tela.
  let largura = 0;
  let altura = 0;
  let escala = 1;
  let origemX = 0;
  let origemY = 0;
  let dpr = 1;
  let pontoPx = 1; // tamanho das partículas acompanha a escala do desenho

  function medir() {
    const caixa = canvas.getBoundingClientRect();
    largura = caixa.width;
    altura = caixa.height;
    dpr = Math.min(window.devicePixelRatio || 1, largura < 640 ? 1.5 : 2);
    canvas.width = Math.round(largura * dpr);
    canvas.height = Math.round(altura * dpr);
    const internoL = largura * (1 - 2 * MARGEM);
    const internoA = altura * (1 - 2 * MARGEM);
    escala = Math.min(internoL / VIEWBOX.largura, internoA / VIEWBOX.altura);
    origemX = (largura - VIEWBOX.largura * escala) / 2 - VIEWBOX.x * escala;
    origemY = (altura - VIEWBOX.altura * escala) / 2 - VIEWBOX.y * escala;
    pontoPx = limitar(escala / 4, 0.75, 1.5);
  }

  const px = (x: number) => origemX + x * escala;
  const py = (y: number) => origemY + y * escala;

  function posicaoDoSinal(p: number): { x: number; y: number; segmento: number } {
    const segmentos = caminhoDoSinal.length - 1;
    const s = Math.min(segmentos - 1, Math.floor(p * segmentos));
    const local = p * segmentos - s;
    const a = nos[caminhoDoSinal[s]];
    const b = nos[caminhoDoSinal[s + 1]];
    return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local, segmento: s };
  }

  let ultimo = 0;
  let decorrido = 0;
  let quadro = 0;
  let rodando = false;
  let visivel = true;
  let pintou = false;
  let proximoSinalAutomatico = 2.5;

  function atualizar(dt: number) {
    decorrido += dt;
    const acesoPorFonte = fontesAcesas.size > 0;
    let pertoDoPonteiro = false;

    for (let i = 0; i < ligacoes.length; i++) {
      const [a, b] = ligacoes[i];
      let alvo = acesoPorFonte ? 1 : 0;
      if (ponteiro) {
        const d = distanciaAoSegmento(ponteiro.x, ponteiro.y, nos[a], nos[b]);
        alvo = Math.max(alvo, limitar(1 - d / DISTANCIA_QUE_ACENDE));
        if (d < DISTANCIA_QUE_ACENDE) pertoDoPonteiro = true;
      }
      intensidade[i] += (alvo - intensidade[i]) * (1 - Math.exp(-dt * 7));
    }

    const ativo = acesoPorFonte || pertoDoPonteiro;
    energia += ((ativo ? 1 : 0) - energia) * (1 - Math.exp(-dt * 4));

    if (opcoes.sinalAutomatico && !ativo) {
      proximoSinalAutomatico -= dt;
      if (proximoSinalAutomatico <= 0 && relogioDoSinal < 0) {
        relogioDoSinal = 0;
        proximoSinalAutomatico = 7;
      }
    }
    if (ativo && relogioDoSinal < 0) relogioDoSinal = 0;

    if (relogioDoSinal >= 0) {
      const antes = relogioDoSinal;
      relogioDoSinal += dt;
      const duracao = CICLO_DO_SINAL * PERCURSO_DO_SINAL;
      // Cada nó do caminho acende quando o sinal passa por ele.
      caminhoDoSinal.forEach((n, k) => {
        const instante = (k / (caminhoDoSinal.length - 1)) * duracao;
        if (antes < instante && relogioDoSinal >= instante) brilhoDoNo[n] = 1;
      });
      if (antes < duracao && relogioDoSinal >= duracao) anel = 0;
      if (relogioDoSinal >= CICLO_DO_SINAL) relogioDoSinal = ativo ? 0 : -1;
    }
    for (let i = 0; i < brilhoDoNo.length; i++) brilhoDoNo[i] *= Math.exp(-dt * 2.2);
    if (anel >= 0) {
      anel += dt;
      if (anel > 0.9) anel = -1;
    }

    const aceleracao = 1 + 1.6 * energia;
    for (const p of deNo) p.angulo += p.velocidade * aceleracao * dt;
    for (const p of deLigacao) {
      const lig = intensidade[p.ligacao];
      p.t = (p.t + p.velocidade * (1 + 7 * lig) * dt) % 1;
    }
    for (const p of daNuvem) p.u = (p.u + p.velocidade * dt) % 1;
  }

  /** Progresso da entrada de uma partícula, de 0 (espalhada) a 1 (no lugar). */
  function chegada(k: number): number {
    const e = entradas[k];
    return saidaCubica(limitar((decorrido - e.atraso) / e.duracao));
  }

  function pintar() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, largura, altura);
    ctx.lineCap = "round";

    // O contorno da nuvem, bem fraco: as partículas correm por cima dele.
    ctx.save();
    ctx.setTransform(dpr * escala, 0, 0, dpr * escala, dpr * origemX, dpr * origemY);
    ctx.globalAlpha = 0.09 * Math.min(1, decorrido / 1.5);
    ctx.strokeStyle = "rgb(242,241,236)";
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.stroke(tracoDaNuvem);
    ctx.restore();

    // Ligações: traço fino em papel, âmbar conforme a intensidade.
    for (let i = 0; i < ligacoes.length; i++) {
      const [a, b] = ligacoes[i];
      const na = nos[a];
      const nb = nos[b];
      const lig = intensidade[i];
      ctx.globalAlpha = 0.22 + 0.1 * energia;
      ctx.strokeStyle = "rgb(242,241,236)";
      ctx.lineWidth = Math.max(1, escala * 0.45);
      ctx.beginPath();
      ctx.moveTo(px(na.x), py(na.y));
      ctx.lineTo(px(nb.x), py(nb.y));
      ctx.stroke();
      if (lig > 0.02) {
        ctx.globalAlpha = 0.85 * lig;
        ctx.strokeStyle = "rgb(242,165,22)";
        ctx.lineWidth = Math.max(1.25, escala * 0.7);
        ctx.stroke();
      }
    }

    // Brilho dos nós.
    nos.forEach((n, i) => {
      const r = RAIO[n.tipo] * escala * (3.2 + 1.4 * brilhoDoNo[i]);
      const base = n.ambar ? 0.55 : 0.16;
      ctx.globalAlpha = Math.min(1, base + 0.15 * energia + 0.7 * brilhoDoNo[i]);
      ctx.drawImage(n.ambar || brilhoDoNo[i] > 0.05 ? brilhoAmbar : brilhoPapel, px(n.x) - r, py(n.y) - r, r * 2, r * 2);
    });

    let k = 0;
    // Partículas da nuvem.
    ctx.fillStyle = "rgb(242,241,236)";
    for (const p of daNuvem) {
      const pos = p.u * contorno.length;
      const i0 = Math.floor(pos) % contorno.length;
      const i1 = (i0 + 1) % contorno.length;
      const f = pos - Math.floor(pos);
      const a = contorno[i0];
      const b = contorno[i1];
      // Normal aproximada pelo segmento, para o desvio sair do contorno.
      const nx = -(b.y - a.y);
      const ny = b.x - a.x;
      const nl = Math.hypot(nx, ny) || 1;
      const alvoX = a.x + (b.x - a.x) * f + (nx / nl) * p.desvio;
      const alvoY = a.y + (b.y - a.y) * f + (ny / nl) * p.desvio;
      const c = chegada(k);
      const e = entradas[k++];
      ctx.globalAlpha = p.alfa * (0.4 + 0.6 * c);
      const t = p.tamanho * pontoPx;
      ctx.fillRect(px(e.x + (alvoX - e.x) * c) - t / 2, py(e.y + (alvoY - e.y) * c) - t / 2, t, t);
    }

    // Partículas das ligações: correm mais e ficam âmbar quando a ligação acende.
    for (const p of deLigacao) {
      const [a, b] = ligacoes[p.ligacao];
      const na = nos[a];
      const nb = nos[b];
      const dx = nb.x - na.x;
      const dy = nb.y - na.y;
      const l = Math.hypot(dx, dy);
      const alvoX = na.x + dx * p.t + (-dy / l) * p.desvio;
      const alvoY = na.y + dy * p.t + (dx / l) * p.desvio;
      const lig = intensidade[p.ligacao];
      const c = chegada(k);
      const e = entradas[k++];
      ctx.fillStyle = lig > 0.35 ? "rgb(242,165,22)" : "rgb(242,241,236)";
      ctx.globalAlpha = (0.35 + 0.6 * lig) * c;
      const t = p.tamanho * pontoPx;
      ctx.fillRect(px(e.x + (alvoX - e.x) * c) - t / 2, py(e.y + (alvoY - e.y) * c) - t / 2, t, t);
    }

    // Partículas que orbitam os nós.
    for (const p of deNo) {
      const n = nos[p.no];
      const cx = Math.cos(p.angulo) * p.raio;
      const cy = Math.sin(p.angulo) * p.raio * p.achatamento;
      const ci = Math.cos(p.inclinacao);
      const si = Math.sin(p.inclinacao);
      const alvoX = n.x + cx * ci - cy * si;
      const alvoY = n.y + cx * si + cy * ci;
      const c = chegada(k);
      const e = entradas[k++];
      ctx.fillStyle = n.ambar || brilhoDoNo[p.no] > 0.4 ? "rgb(242,165,22)" : "rgb(242,241,236)";
      ctx.globalAlpha = p.alfa * (0.35 + 0.65 * c);
      const t = p.tamanho * pontoPx * (n.tipo === "V" ? 1.15 : 1);
      ctx.fillRect(px(e.x + (alvoX - e.x) * c) - t / 2, py(e.y + (alvoY - e.y) * c) - t / 2, t, t);
    }

    // O sinal: ponto âmbar com rastro curto.
    if (relogioDoSinal >= 0) {
      const duracao = CICLO_DO_SINAL * PERCURSO_DO_SINAL;
      const p = relogioDoSinal / duracao;
      if (p <= 1) {
        ctx.fillStyle = "rgb(242,165,22)";
        for (let r = 0; r < 10; r++) {
          const q = p - r * 0.012;
          if (q < 0) break;
          const s = posicaoDoSinal(q);
          ctx.globalAlpha = 1 - r / 10;
          const t = Math.max(2, escala * (1.3 - r * 0.08));
          ctx.beginPath();
          ctx.arc(px(s.x), py(s.y), t, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Anel em Ot3 quando o sinal chega.
    if (anel >= 0) {
      const ot3 = nos[caminhoDoSinal[caminhoDoSinal.length - 1]];
      const f = anel / 0.9;
      ctx.globalAlpha = 1 - f;
      ctx.strokeStyle = "rgb(242,165,22)";
      ctx.lineWidth = Math.max(1, escala * 0.6);
      ctx.beginPath();
      ctx.arc(px(ot3.x), py(ot3.y), escala * (RAIO.O + 9 * saidaCubica(f)), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    if (!pintou) {
      pintou = true;
      opcoes.aoPintar?.();
    }
  }

  function laco(agora: number) {
    const dt = Math.min(0.05, (agora - ultimo) / 1000);
    ultimo = agora;
    atualizar(dt);
    pintar();
    quadro = requestAnimationFrame(laco);
  }

  function retomar() {
    if (rodando || opcoes.estatico || !visivel || document.hidden) return;
    rodando = true;
    ultimo = performance.now();
    quadro = requestAnimationFrame(laco);
  }

  function pausar() {
    rodando = false;
    cancelAnimationFrame(quadro);
  }

  medir();
  if (opcoes.estatico) {
    decorrido = 10; // todas as partículas já no lugar
    pintar();
  }

  const aoRedimensionar = new ResizeObserver(() => {
    medir();
    if (!rodando) pintar();
  });
  aoRedimensionar.observe(canvas);

  // Fora da tela, para; de volta, continua de onde estava.
  const observador = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    if (visivel) retomar();
    else pausar();
  });
  observador.observe(canvas);

  const aoMudarVisibilidade = () => (document.hidden ? pausar() : retomar());
  document.addEventListener("visibilitychange", aoMudarVisibilidade);

  retomar();

  return {
    acender(fonte, ligado) {
      if (ligado) fontesAcesas.add(fonte);
      else fontesAcesas.delete(fonte);
    },
    ponteiro(x, y) {
      ponteiro = x === null || y === undefined ? null : { x: (x - origemX) / escala, y: (y - origemY) / escala };
    },
    destruir() {
      pausar();
      aoRedimensionar.disconnect();
      observador.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    },
  };
}
