/**
 * O fluxo do catalisador, em canvas 2D, por cima do palco do hero.
 *
 * Módulo sem React e sem dependência: o hero o importa com `import()` só
 * depois do `load` e de um momento ocioso, para o H1 continuar sendo o LCP e o
 * motor não pesar no JavaScript inicial. Quem chama já conferiu
 * `prefers-reduced-motion`; mesmo assim, `estatico: true` desenha um quadro
 * só e não agenda nenhum outro (aparelho fraco).
 *
 * A molécula não é desenhada aqui: ela é o SVG de `PalcoDoHero.tsx`, no
 * mesmo espaço de coordenadas (`lib/palco.ts`). O canvas só põe as
 * partículas: cinzas e lentas na entrada, âmbar dentro da cadeia, rastros
 * acelerados na saída. De tempos em tempos um sinal percorre o V (Ot2, V1,
 * Ob, V2, Ot4) e o átomo âmbar solta um anel e uma rajada.
 */
import {
  ATOMOS,
  CADEIA,
  CENTRO_DA_MOLECULA,
  FAIXAS,
  PALCO,
  PARTE_QUE_SAI_PELO_AMBAR,
  curvaDeEntrada,
  curvaDeSaida,
  pontoNaCurva,
  type Entrada,
  type IdDoAtomo,
  type Ponto,
  type Saida,
} from "./palco";

export interface OpcoesDasParticulas {
  /** Quantas partículas ao todo (o hero escolhe pelo tamanho da tela). */
  quantidade: number;
  /** Um quadro só, sem laço: aparelho fraco. */
  estatico?: boolean;
  /** Sem cursor (tela de toque): o sinal corre sozinho num ciclo mais curto. */
  sinalAutomatico?: boolean;
  /** Chamado depois do primeiro quadro pintado. */
  aoPintar?: () => void;
  /**
   * O sinal vem de fora (a molécula 3D desenha o pulso e chama `disparar`):
   * aqui ficam só o anel e a rajada em Ot4, no fim do percurso.
   */
  sinalExterno?: boolean;
}

export interface MotorDasParticulas {
  /** Liga ou desliga o estado aceso (cursor perto, foco ou hover no CTA). */
  acender(fonte: string, ligado: boolean): void;
  /** Posição do ponteiro em px relativos ao canvas, ou `null` ao sair. */
  ponteiro(x: number | null, y?: number): void;
  /** Começa um sinal agora (quando o sinal é externo). */
  disparar(): void;
  /** Volta a agendar o próprio sinal (a molécula 3D caiu). */
  usarSinalProprio(): void;
  destruir(): void;
}

// Velocidades em unidades do palco por segundo.
const VELOCIDADE_DE_ENTRADA = 9;
const VELOCIDADE_DENTRO = 30;
const VELOCIDADE_FINAL = 150;
const RASTRO_EM_SEGUNDOS = 0.1;
const CICLO_DO_SINAL = 4.8;
const CICLO_DO_SINAL_ACESO = 2.4;
const PERCURSO_DO_SINAL = 1.5; // segundos para o sinal ir de Ot2 a Ot4
const VIDA_DO_ANEL = 1.1;
const TRAJETOS = 48;
const RAJADA = 6;

const CINZA = [169, 172, 180] as const;
const AMBAR = [242, 165, 22] as const;
const AMBAR_CLARO = [255, 214, 140] as const;

interface Trajeto {
  saida: Saida;
  xs: Float32Array;
  ys: Float32Array;
  /** Normal de cada ponto (para espalhar as partículas em volta do trilho). */
  nx: Float32Array;
  ny: Float32Array;
  acumulado: Float32Array;
  inicioDentro: number;
  inicioSaida: number;
  total: number;
}

interface Particula {
  trajeto: number;
  s: number;
  i: number;
  fator: number;
  desvio: number;
  espalhamento: number;
  tamanho: number;
  alfa: number;
  ativa: boolean;
}

const aleatorio = (min: number, max: number) => min + Math.random() * (max - min);
const limitar = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const suave = (p: number) => p * p * (3 - 2 * p);

function montarTrajeto(entrada: Entrada, y0: number, saida: Saida, y1: number): Trajeto {
  const pontos: Ponto[] = [];
  const curvaEntrada = curvaDeEntrada(entrada, y0);
  for (let k = 0; k <= 30; k++) pontos.push(pontoNaCurva(curvaEntrada, k / 30));
  const indiceDentro = pontos.length - 1;
  for (const id of CADEIA) pontos.push(ATOMOS[id]);
  const indiceSaida = pontos.length;
  const curvaSaida = curvaDeSaida(saida, y1);
  for (let k = 0; k <= 26; k++) pontos.push(pontoNaCurva(curvaSaida, k / 26));

  const n = pontos.length;
  const t: Trajeto = {
    saida,
    xs: new Float32Array(n),
    ys: new Float32Array(n),
    nx: new Float32Array(n),
    ny: new Float32Array(n),
    acumulado: new Float32Array(n),
    inicioDentro: 0,
    inicioSaida: 0,
    total: 0,
  };
  for (let k = 0; k < n; k++) {
    t.xs[k] = pontos[k].x;
    t.ys[k] = pontos[k].y;
    if (k > 0) t.acumulado[k] = t.acumulado[k - 1] + Math.hypot(pontos[k].x - pontos[k - 1].x, pontos[k].y - pontos[k - 1].y);
    const a = pontos[Math.max(0, k - 1)];
    const b = pontos[Math.min(n - 1, k + 1)];
    const d = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    t.nx[k] = -(b.y - a.y) / d;
    t.ny[k] = (b.x - a.x) / d;
  }
  t.inicioDentro = t.acumulado[indiceDentro];
  t.inicioSaida = t.acumulado[indiceSaida];
  t.total = t.acumulado[n - 1];
  return t;
}

/** Velocidade no ponto `s` do trajeto: devagar, constante, acelerando. */
function velocidade(t: Trajeto, s: number): number {
  if (s < t.inicioDentro) return VELOCIDADE_DE_ENTRADA * (1 + 1.6 * (s / t.inicioDentro) ** 2);
  if (s < t.inicioSaida) return VELOCIDADE_DENTRO;
  const u = (s - t.inicioSaida) / (t.total - t.inicioSaida);
  return VELOCIDADE_DENTRO + (VELOCIDADE_FINAL - VELOCIDADE_DENTRO) * u ** 1.6;
}

/** Ponto de borda macia, mas com miolo cheio (o pó da entrada). */
function criarPonto([r, g, b]: readonly number[]): HTMLCanvasElement {
  const lado = 32;
  const c = document.createElement("canvas");
  c.width = c.height = lado;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.45, `rgba(${r},${g},${b},0.85)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, lado, lado);
  return c;
}

/** Brilho radial pré-desenhado: desenhar imagem custa menos que `shadowBlur`. */
function criarBrilho([r, g, b]: readonly number[], miolo = 0.9): HTMLCanvasElement {
  const lado = 64;
  const c = document.createElement("canvas");
  c.width = c.height = lado;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},${miolo})`);
  grad.addColorStop(0.3, `rgba(${r},${g},${b},${miolo * 0.3})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, lado, lado);
  return c;
}

export function iniciarParticulas(canvas: HTMLCanvasElement, opcoes: OpcoesDasParticulas): MotorDasParticulas {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const brilhoAmbar = criarBrilho(AMBAR);
  const brilhoClaro = criarBrilho(AMBAR_CLARO, 1);
  const pontoCinza = criarPonto(CINZA);

  const sortearTrajeto = (): Trajeto => {
    const entrada: Entrada = Math.random() < 0.5 ? "Ot2" : "Ot1";
    const saida: Saida = Math.random() < PARTE_QUE_SAI_PELO_AMBAR ? "Ot4" : "Ot3";
    const [a, b] = FAIXAS[entrada];
    const [c, d] = FAIXAS[saida];
    return montarTrajeto(entrada, aleatorio(a, b), saida, aleatorio(c, d));
  };
  const trajetos = Array.from({ length: TRAJETOS }, sortearTrajeto);
  // Trajetos que saem pelo âmbar, para a rajada do fim do sinal.
  const pelaPontaAmbar = trajetos.flatMap((t, i) => (t.saida === "Ot4" ? [i] : []));

  const nova = (p: Particula, inicio = 0) => {
    p.trajeto = Math.floor(Math.random() * trajetos.length);
    p.s = inicio;
    p.i = 0;
    p.fator = aleatorio(0.75, 1.3);
    p.desvio = aleatorio(-1, 1) * aleatorio(2, 9);
    p.espalhamento = aleatorio(-1, 1) * aleatorio(1, 7);
    p.tamanho = aleatorio(0.8, 1.6);
    p.alfa = aleatorio(0.35, 0.9);
    p.ativa = true;
    return p;
  };
  const total = Math.max(40, Math.round(opcoes.quantidade));
  const particulas: Particula[] = Array.from({ length: total }, () => nova({} as Particula));
  const rajada: Particula[] = Array.from({ length: RAJADA }, () => ({ ...nova({} as Particula), ativa: false }));

  // Sinal: o caminho do V, em pontos do palco.
  const sinal: IdDoAtomo[] = ["Ot2", "V1", "Ob", "V2", "Ot4"];
  const pontosDoSinal = sinal.map((id) => ATOMOS[id]);
  const trechos = pontosDoSinal.slice(1).map((p, k) => Math.hypot(p.x - pontosDoSinal[k].x, p.y - pontosDoSinal[k].y));
  const comprimentoDoSinal = trechos.reduce((a, b) => a + b, 0);

  let largura = 0;
  let altura = 0;
  let escala = 1; // px de CSS por unidade do palco
  let dpr = 1;
  let quadro = 0;
  let ultimo = 0;
  let relogio = 0;
  let proximoSinal = 1.2;
  let sinalComecou = -10;
  let anelComecou = -10;
  let intensidade = 1;
  let visivel = true;
  let destruido = false;
  let pintou = false;
  const acesos = new Set<string>();
  let sinalExterno = Boolean(opcoes.sinalExterno);

  function acender(fonte: string, ligado: boolean) {
    if (ligado) acesos.add(fonte);
    else acesos.delete(fonte);
    // Acendeu com o sinal parado: ele sai já, sem esperar o ciclo.
    if (ligado && relogio - sinalComecou > PERCURSO_DO_SINAL + 0.4 && proximoSinal - relogio > 0.3) {
      proximoSinal = relogio + 0.15;
    }
  }

  /**
   * Tamanho vindo do ResizeObserver, que mede depois do layout que o
   * navegador já ia fazer: `getBoundingClientRect` aqui forçava um layout da
   * página inteira dentro da tarefa do motor.
   */
  function definirTamanho(w: number, h: number) {
    const novoDpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w === largura && h === altura && novoDpr === dpr) return false;
    dpr = novoDpr;
    largura = w;
    altura = h;
    escala = largura / PALCO.largura || 1;
    // Reatribuir width limpa o canvas: só quando o tamanho muda de fato.
    canvas.width = Math.max(1, Math.round(largura * dpr));
    canvas.height = Math.max(1, Math.round(altura * dpr));
    return true;
  }

  function avancar(p: Particula, dt: number) {
    const t = trajetos[p.trajeto];
    p.s += velocidade(t, p.s) * p.fator * intensidade * dt;
    while (p.i < t.acumulado.length - 2 && t.acumulado[p.i + 1] < p.s) p.i++;
  }

  /** Posição no trajeto, com o espalhamento da entrada e da saída. */
  function posicao(p: Particula, s: number, i: number, saida: Ponto) {
    const t = trajetos[p.trajeto];
    while (i > 0 && t.acumulado[i] > s) i--;
    const a = t.acumulado[i];
    const b = t.acumulado[i + 1];
    const f = b > a ? limitar((s - a) / (b - a)) : 0;
    let x = t.xs[i] + (t.xs[i + 1] - t.xs[i]) * f;
    let y = t.ys[i] + (t.ys[i + 1] - t.ys[i]) * f;
    let afastamento = 0;
    if (s < t.inicioDentro) afastamento = p.desvio * (1 - suave(s / t.inicioDentro));
    else if (s > t.inicioSaida) afastamento = p.espalhamento * ((s - t.inicioSaida) / (t.total - t.inicioSaida));
    x += t.nx[i] * afastamento;
    y += t.ny[i] * afastamento;
    saida.x = x;
    saida.y = y;
  }

  function passo(dt: number) {
    relogio += dt;
    const alvo = acesos.size > 0 ? 1.7 : 1;
    intensidade += (alvo - intensidade) * Math.min(1, dt * 3);
    for (const p of particulas) {
      avancar(p, dt);
      if (p.s >= trajetos[p.trajeto].total) nova(p);
    }
    for (const p of rajada) {
      if (!p.ativa) continue;
      avancar(p, dt * 1.6);
      if (p.s >= trajetos[p.trajeto].total) p.ativa = false;
    }
    // Sinal periódico; a rajada sai quando ele chega ao átomo âmbar.
    if (!sinalExterno && relogio >= proximoSinal) {
      sinalComecou = relogio;
      const ciclo = acesos.size > 0 || opcoes.sinalAutomatico ? CICLO_DO_SINAL_ACESO : CICLO_DO_SINAL;
      proximoSinal = relogio + ciclo * (opcoes.sinalAutomatico && acesos.size === 0 ? 1.5 : 1);
    }
    if (sinalComecou > 0 && relogio - sinalComecou >= PERCURSO_DO_SINAL && anelComecou < sinalComecou) {
      anelComecou = relogio;
      for (const p of rajada) {
        if (!pelaPontaAmbar.length) break;
        nova(p);
        p.trajeto = pelaPontaAmbar[Math.floor(Math.random() * pelaPontaAmbar.length)];
        p.s = trajetos[p.trajeto].inicioSaida;
        p.i = 0;
        p.espalhamento = aleatorio(-1, 1) * 10;
        p.fator = aleatorio(0.9, 1.4);
      }
    }
  }

  const aqui: Ponto = { x: 0, y: 0 };
  const atras: Ponto = { x: 0, y: 0 };

  function desenhar() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const k = dpr * escala;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    const px = 1 / escala; // 1 px de CSS em unidades do palco

    // Entrada: pó cinza, mais nítido conforme chega perto.
    ctx.globalCompositeOperation = "source-over";
    for (const p of particulas) {
      const t = trajetos[p.trajeto];
      if (p.s >= t.inicioDentro) continue;
      posicao(p, p.s, p.i, aqui);
      const perto = p.s / t.inicioDentro;
      const lado = p.tamanho * (2 + 1.2 * perto) * px;
      // Some antes de tocar o átomo: o pó não suja a molécula.
      const antesDoAtomo = limitar((t.inicioDentro - p.s - 5) / 7);
      ctx.globalAlpha = p.alfa * (0.4 + 0.6 * perto) * antesDoAtomo;
      if (antesDoAtomo <= 0) continue;
      ctx.drawImage(pontoCinza, aqui.x - lado / 2, aqui.y - lado / 2, lado, lado);
    }

    ctx.globalCompositeOperation = "lighter";
    // Dentro da cadeia: só um calor âmbar macio passando pelas ligações.
    for (const p of particulas) {
      const t = trajetos[p.trajeto];
      if (p.s < t.inicioDentro || p.s >= t.inicioSaida) continue;
      posicao(p, p.s, p.i, aqui);
      const lado = (9 + 4 * p.tamanho) * px * (0.8 + 0.3 * intensidade);
      ctx.globalAlpha = 0.16 * p.alfa * intensidade;
      ctx.drawImage(brilhoAmbar, aqui.x - lado / 2, aqui.y - lado / 2, lado, lado);
    }

    // Saída: rastros que aceleram.
    ctx.lineCap = "round";
    const rastros = (lista: Particula[], forca: number) => {
      for (const p of lista) {
        const t = trajetos[p.trajeto];
        if (!p.ativa || p.s < t.inicioSaida) continue;
        const v = velocidade(t, p.s) * p.fator * intensidade;
        posicao(p, p.s, p.i, aqui);
        posicao(p, Math.max(t.inicioSaida, p.s - v * RASTRO_EM_SEGUNDOS), p.i, atras);
        // Nasce depois de sair do átomo, para o rastro não riscar a molécula.
        const fora = limitar((p.s - t.inicioSaida - 4) / 5);
        if (fora <= 0) continue;
        const g = ctx.createLinearGradient(atras.x, atras.y, aqui.x, aqui.y);
        g.addColorStop(0, "rgba(242,165,22,0)");
        g.addColorStop(1, `rgba(255,190,80,${0.85 * forca})`);
        ctx.globalAlpha = fora;
        ctx.strokeStyle = g;
        ctx.lineWidth = (0.9 + 0.5 * p.tamanho) * px;
        ctx.beginPath();
        ctx.moveTo(atras.x, atras.y);
        ctx.lineTo(aqui.x, aqui.y);
        ctx.stroke();
        const lado = (4 + 2 * p.tamanho) * px;
        ctx.globalAlpha = 0.8 * forca * fora;
        ctx.drawImage(brilhoClaro, aqui.x - lado / 2, aqui.y - lado / 2, lado, lado);
      }
    };
    rastros(particulas, 1);
    rastros(rajada, 1);

    // O sinal percorrendo o V.
    const idade = relogio - sinalComecou;
    if (!sinalExterno && idade >= 0 && idade < PERCURSO_DO_SINAL) {
      let d = suave(idade / PERCURSO_DO_SINAL) * comprimentoDoSinal;
      let k2 = 0;
      while (k2 < trechos.length - 1 && d > trechos[k2]) d -= trechos[k2++];
      const a = pontosDoSinal[k2];
      const b = pontosDoSinal[k2 + 1];
      const f = limitar(d / trechos[k2]);
      const x = a.x + (b.x - a.x) * f;
      const y = a.y + (b.y - a.y) * f;
      const lado = 22 * px;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(brilhoClaro, x - lado / 2, y - lado / 2, lado, lado);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(brilhoAmbar, x - lado, y - lado, lado * 2, lado * 2);
    }

    // Anel e clarão no átomo âmbar.
    const idadeDoAnel = relogio - anelComecou;
    if (idadeDoAnel >= 0 && idadeDoAnel < VIDA_DO_ANEL) {
      const p = idadeDoAnel / VIDA_DO_ANEL;
      const ot4 = ATOMOS.Ot4;
      const clarao = (1 - p) ** 2;
      const lado = ot4.r * 9 * (0.7 + 0.3 * p);
      ctx.globalAlpha = 0.7 * clarao;
      ctx.drawImage(brilhoAmbar, ot4.x - lado / 2, ot4.y - lado / 2, lado, lado);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.7 * (1 - p);
      ctx.strokeStyle = "rgb(242,165,22)";
      ctx.lineWidth = 1.2 * px;
      ctx.beginPath();
      ctx.arc(ot4.x, ot4.y, ot4.r * (1.2 + 2.6 * (1 - (1 - p) ** 3)), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    if (!pintou) {
      pintou = true;
      opcoes.aoPintar?.();
    }
  }

  function laco(agora: number) {
    quadro = 0;
    if (destruido || !visivel) return;
    const dt = Math.min(0.05, ultimo ? (agora - ultimo) / 1000 : 0.016);
    ultimo = agora;
    passo(dt);
    desenhar();
    quadro = requestAnimationFrame(laco);
  }

  function retomar() {
    if (destruido || opcoes.estatico || quadro || !visivel) return;
    ultimo = 0;
    quadro = requestAnimationFrame(laco);
  }

  // Aquece o fluxo antes do primeiro quadro: já entra no meio do caminho
  // (12 s simulados, em passos largos; só a distribuição importa).
  for (let k = 0; k < 80; k++) passo(0.15);
  relogio = 0;
  proximoSinal = 0.9;
  sinalComecou = -10;
  anelComecou = -10;

  // O primeiro aviso do ResizeObserver traz o tamanho e dispara o primeiro
  // quadro; os seguintes só redesenham se o tamanho mudou.
  const aoRedimensionar = new ResizeObserver(([e]) => {
    const mudou = definirTamanho(e.contentRect.width, e.contentRect.height);
    if (!pintou) {
      desenhar();
      retomar();
    } else if (mudou && (opcoes.estatico || !quadro)) desenhar();
  });
  aoRedimensionar.observe(canvas);

  // Fora da tela, o laço para.
  const observador = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel && pintou) retomar();
  });
  observador.observe(canvas);

  return {
    acender,
    disparar() {
      sinalComecou = relogio;
    },
    usarSinalProprio() {
      sinalExterno = false;
      proximoSinal = relogio + 0.5;
    },
    ponteiro(x, y) {
      if (x === null || y === undefined || !largura) {
        acesos.delete("ponteiro");
        return;
      }
      const perto = Math.hypot(x / escala - CENTRO_DA_MOLECULA.x, y / escala - CENTRO_DA_MOLECULA.y) < 46;
      if (perto && !acesos.has("ponteiro")) acender("ponteiro", true);
      else if (!perto) acesos.delete("ponteiro");
    },
    destruir() {
      destruido = true;
      cancelAnimationFrame(quadro);
      aoRedimensionar.disconnect();
      observador.disconnect();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}
