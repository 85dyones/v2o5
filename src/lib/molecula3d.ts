/**
 * A molécula C1d em 3D, em WebGL 2, no palco do hero.
 *
 * Um fragment shader só, sem biblioteca e sem malha: a molécula é uma
 * função de distância (esferas e cápsulas unidas com junta suave, o que dá o
 * aspecto de metal líquido) e cada pixel caminha até ela (raymarching). A
 * câmera é ortográfica e, parada, desenha exatamente a silhueta do SVG de
 * `PalcoDoHero`, no mesmo espaço de coordenadas (`palco.ts`); por isso o
 * canvas entra por cima do SVG sem mexer no desenho, e as partículas de
 * `particulas.ts` continuam chegando nos átomos certos.
 *
 * O material é vidro escuro: a borda brilha nas cores dos estados do
 * vanádio (violeta, verde, azul, âmbar) e um filamento âmbar corre dentro do
 * V. O que se move: a molécula respira e inclina devagar; com o cursor ela
 * inclina na direção dele (mola) e a luz principal segue a mão; um pulso de
 * energia percorre o V e avisa (`aoSinal`) quando sai, para o motor de
 * partículas soltar o anel e a rajada em Ot4.
 *
 * Quem chama já conferiu `prefers-reduced-motion`. Sem WebGL 2, sem placa de
 * vídeo de verdade, com erro de shader ou com contexto perdido, devolve
 * `null` (ou chama `aoFalhar`) e o SVG fica. A qualidade se ajusta sozinha: se o quadro passa do tempo, a
 * resolução cai; se ainda assim não dá, a molécula para num quadro.
 */
import {
  ATOMOS,
  CENTRO_DA_MOLECULA,
  PALCO,
  RAIO_DA_LIGACAO,
  RESPIRO_DO_AMBAR,
  V_DO_SINAL,
  type IdDoAtomo,
} from "./palco";

export interface OpcoesDaMolecula3d {
  /** Um quadro só (aparelho fraco). */
  estatico?: boolean;
  /** Depois do primeiro quadro pintado. */
  aoPintar?: () => void;
  /** Quando o pulso começa a percorrer o V. */
  aoSinal?: () => void;
  /** Contexto perdido ou quadro impossível: volte ao SVG. */
  aoFalhar?: () => void;
}

export interface MotorDaMolecula3d {
  acender(fonte: string, ligado: boolean): void;
  /** Ponteiro em px relativos ao canvas, ou `null` ao sair. */
  ponteiro(x: number | null, y?: number): void;
  destruir(): void;
}

/** Ordem dos átomos nos uniforms do shader. */
export const ORDEM: IdDoAtomo[] = ["Ot1", "Ot2", "V1", "Ob", "V2", "Ot3", "Ot4"];

/** Átomo no espaço local do shader: centro da molécula na origem, y para cima. */
export function noEspacoLocal(id: IdDoAtomo): [number, number, number] {
  const a = ATOMOS[id];
  return [a.x - CENTRO_DA_MOLECULA.x, -(a.y - CENTRO_DA_MOLECULA.y), a.r];
}

/** O caminho do pulso (o V), com o comprimento acumulado de 0 a 1. */
export function cadeiaDoPulso(): [number, number, number][] {
  const pontos = V_DO_SINAL.map((id) => noEspacoLocal(id));
  const acumulado = [0];
  for (let i = 1; i < pontos.length; i++) {
    acumulado.push(acumulado[i - 1] + Math.hypot(pontos[i][0] - pontos[i - 1][0], pontos[i][1] - pontos[i - 1][1]));
  }
  const total = acumulado[acumulado.length - 1];
  return pontos.map((p, i) => [p[0], p[1], acumulado[i] / total]);
}

const VERTICE = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENTO = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTempo;
uniform mat3 uRot;
uniform vec4 uAtomos[7];
uniform vec3 uCadeia[5];
uniform vec3 uLuz;
uniform float uPulso;
uniform float uAceso;
out vec4 cor;

const vec2 PALCO = vec2(${PALCO.largura.toFixed(1)}, ${PALCO.altura.toFixed(1)});
const vec2 CENTRO = vec2(${CENTRO_DA_MOLECULA.x.toFixed(1)}, ${CENTRO_DA_MOLECULA.y.toFixed(1)});
const float RL = ${RAIO_DA_LIGACAO.toFixed(4)};
const float RESPIRO = ${RESPIRO_DO_AMBAR.toFixed(4)};
const float K = 1.7;
const vec3 CAIXA = vec3(49.0, 30.0, 12.0);
const vec3 PAPEL = vec3(0.949, 0.945, 0.925);
const vec3 AMBAR = vec3(0.949, 0.647, 0.086);

float smin(float a, float b) {
  float h = max(K - abs(a - b), 0.0) / K;
  return min(a, b) - h * h * K * 0.25;
}
float esfera(vec3 p, vec4 s) { return length(p - s.xyz) - s.w; }
float capsula(vec3 p, vec3 a, vec3 b) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - RL;
}
float rede(vec3 p) {
  float d = esfera(p, uAtomos[2]);
  d = smin(d, esfera(p, uAtomos[4]));
  d = smin(d, esfera(p, uAtomos[0]));
  d = smin(d, esfera(p, uAtomos[1]));
  d = smin(d, esfera(p, uAtomos[3]));
  d = smin(d, esfera(p, uAtomos[5]));
  d = smin(d, capsula(p, uAtomos[0].xyz, uAtomos[2].xyz));
  d = smin(d, capsula(p, uAtomos[1].xyz, uAtomos[2].xyz));
  d = smin(d, capsula(p, uAtomos[2].xyz, uAtomos[3].xyz));
  d = smin(d, capsula(p, uAtomos[3].xyz, uAtomos[4].xyz));
  d = smin(d, capsula(p, uAtomos[4].xyz, uAtomos[5].xyz));
  d = smin(d, capsula(p, uAtomos[4].xyz, uAtomos[6].xyz));
  // O respiro: um anel vazio em volta do átomo âmbar, como no logo.
  return max(d, -(esfera(p, uAtomos[6]) - RESPIRO));
}
vec2 mapa(vec3 p) {
  float a = rede(p);
  float b = esfera(p, uAtomos[6]);
  return a < b ? vec2(a, 0.0) : vec2(b, 1.0);
}
vec3 normal(vec3 p) {
  const vec2 e = vec2(0.02, -0.02);
  return normalize(e.xyy * mapa(p + e.xyy).x + e.yyx * mapa(p + e.yyx).x +
                   e.yxy * mapa(p + e.yxy).x + e.xxx * mapa(p + e.xxx).x);
}
// Os quatro estados do vanádio, em ciclo: violeta, verde, azul, âmbar.
vec3 vanadio(float h) {
  h = fract(h) * 4.0;
  vec3 c0 = vec3(0.608, 0.545, 0.878), c1 = vec3(0.361, 0.769, 0.541);
  vec3 c2 = vec3(0.498, 0.639, 0.941), c3 = AMBAR;
  if (h < 1.0) return mix(c0, c1, h);
  if (h < 2.0) return mix(c1, c2, h - 1.0);
  if (h < 3.0) return mix(c2, c3, h - 2.0);
  return mix(c3, c0, h - 3.0);
}
// Posição ao longo do V (0 em Ot2, 1 em Ot4) e distância até ele.
vec2 aoLongoDoV(vec2 p) {
  float melhor = 1e9, s = 0.0;
  for (int i = 0; i < 4; i++) {
    vec2 a = uCadeia[i].xy, b = uCadeia[i + 1].xy;
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float d = length(pa - ba * h);
    if (d < melhor) { melhor = d; s = mix(uCadeia[i].z, uCadeia[i + 1].z, h); }
  }
  return vec2(s, melhor);
}
vec3 sombrear(vec3 p, float material) {
  vec3 n = normal(p);
  vec3 nv = uRot * n;
  vec3 v = vec3(0.0, 0.0, 1.0);
  float envolve = clamp(dot(nv, uLuz) * 0.5 + 0.5, 0.0, 1.0);
  float brilho = pow(clamp(dot(nv, normalize(uLuz + v)), 0.0, 1.0), 64.0);
  float borda = pow(1.0 - clamp(nv.z, 0.0, 1.0), 2.4);
  vec3 iris = vanadio(0.55 * nv.x + 0.35 * nv.y + uTempo * 0.035);
  if (material > 0.5) {
    float miolo = pow(clamp(nv.z, 0.0, 1.0), 3.0);
    vec3 c = mix(AMBAR, vec3(1.0, 0.86, 0.52), miolo * 0.55) * (0.8 + 0.3 * envolve);
    c *= 1.0 + 0.12 * sin(uTempo * 2.1) + 0.25 * uAceso;
    return c + brilho * 0.9 + AMBAR * borda * 0.5;
  }
  vec2 v2 = aoLongoDoV(p.xy);
  float perto = exp(-pow(v2.y / 8.0, 2.0));
  float banda = uPulso < 0.0 ? 0.0 : exp(-pow((v2.x - uPulso) / 0.05, 2.0)) * perto;
  // Vidro escuro: corpo quase tinta, borda acesa nas cores do vanádio e um
  // filamento âmbar correndo dentro do V (o caminho do sinal do logo).
  vec3 c = vec3(0.075, 0.085, 0.105) + PAPEL * 0.06 * envolve;
  c += iris * pow(borda, 1.3) * (1.35 + 0.5 * uAceso) + brilho * 1.2;
  c += AMBAR * exp(-v2.y / 2.6) * (0.35 + 0.25 * uAceso);
  c = mix(c, vec3(1.0, 0.8, 0.4), banda * 0.6) + AMBAR * banda * 0.45;
  c += AMBAR * exp(-length(p - uAtomos[6].xyz) / 6.0) * (0.22 + 0.2 * uAceso);
  return c;
}
bool caixa(vec3 ro, vec3 rd, out float t0, out float t1) {
  vec3 inv = 1.0 / rd;
  vec3 a = (-CAIXA - ro) * inv, b = (CAIXA - ro) * inv;
  vec3 mn = min(a, b), mx = max(a, b);
  t0 = max(max(mn.x, mn.y), mn.z);
  t1 = min(min(mx.x, mx.y), mx.z);
  return t1 > max(t0, 0.0);
}
void main() {
  vec2 palco = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y) * PALCO;
  vec2 q = vec2(palco.x - CENTRO.x, -(palco.y - CENTRO.y));
  float px = PALCO.x / uRes.x;
  mat3 inv = transpose(uRot);
  vec3 ro = inv * vec3(q, 60.0);
  vec3 rd = inv * vec3(0.0, 0.0, -1.0);

  vec3 rgb = vec3(0.0);
  float alfa = 0.0;
  float t0, t1;
  if (caixa(ro, rd, t0, t1)) {
    float t = max(t0, 0.0), dMin = 1e9, tMin = t;
    bool acertou = false;
    for (int i = 0; i < 72; i++) {
      float d = mapa(ro + rd * t).x;
      if (d < dMin) { dMin = d; tMin = t; }
      if (d < 0.004 * px + 0.01) { acertou = true; break; }
      t += d;
      if (t > t1) break;
    }
    vec3 p = ro + rd * tMin;
    float cobertura = acertou ? 1.0 : 1.0 - smoothstep(0.0, 1.4 * px, dMin);
    if (cobertura > 0.0) {
      rgb = sombrear(p, mapa(p).y) * cobertura;
      alfa = cobertura;
    }
    // Aura fina em volta da molécula, nas cores do vanádio.
    float aura = (1.0 - alfa) * exp(-max(dMin, 0.0) * 0.75) * (0.18 + 0.14 * uAceso);
    rgb += vanadio(q.x * 0.008 + uTempo * 0.03) * aura;
    alfa += aura;
  }
  // Halo do átomo âmbar, na tela (luz que vaza do átomo).
  vec3 ot4 = uRot * uAtomos[6].xyz;
  float d4 = length(q - ot4.xy);
  float halo = (1.0 - alfa) * exp(-d4 * d4 / (2.0 * pow(8.0 + 3.0 * uAceso, 2.0))) * (0.42 + 0.25 * uAceso);
  rgb += AMBAR * halo;
  alfa += halo;
  cor = vec4(rgb, clamp(alfa, 0.0, 1.0));
}`;

const CICLO = 4.8;
const CICLO_ACESO = 2.4;
const PERCURSO = 1.5;
const suave = (p: number) => p * p * (3 - 2 * p);

function compilar(gl: WebGL2RenderingContext, tipo: number, fonte: string) {
  const s = gl.createShader(tipo)!;
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  return s;
}

/**
 * Placa de vídeo emulada por software (SwiftShader, llvmpipe): o raymarching
 * ocupa a CPU e trava a página. Nesses casos o hero fica com o SVG.
 */
function ehSoftware(gl: WebGL2RenderingContext): boolean {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const nome = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  return /swiftshader|llvmpipe|software|basic render/i.test(nome);
}

export function iniciarMolecula3d(canvas: HTMLCanvasElement, opcoes: OpcoesDaMolecula3d = {}): MotorDaMolecula3d | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    // Sem aceleração de verdade, o navegador nem cria o contexto.
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl || ehSoftware(gl)) return null;

  // Criar o contexto e compilar o shader ficam em tarefas separadas (a
  // compilação começa no próximo giro): juntas passavam do limite de tarefa
  // longa no celular simulado do Lighthouse.
  let vs: WebGLShader | null = null;
  let fs: WebGLShader | null = null;
  const programa = gl.createProgram()!;
  // Com a extensão, o link roda em paralelo e a gente só pergunta quando acabou.
  const paralelo = gl.getExtension("KHR_parallel_shader_compile");
  const comecarCompilacao = () => {
    vs = compilar(gl, gl.VERTEX_SHADER, VERTICE);
    fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO);
    gl.attachShader(programa, vs);
    gl.attachShader(programa, fs);
    gl.linkProgram(programa);
  };

  let escalaDeQualidade = window.matchMedia("(max-width: 640px)").matches ? 0.75 : 1;
  let largura = 0;
  let altura = 0;
  let quadro = 0;
  let ultimo = 0;
  let relogio = 0;
  let visivel = true;
  let destruido = false;
  let pronto = false;
  let pintou = false;
  let u: Record<string, WebGLUniformLocation | null> = {};

  // Estado físico: inclinação com mola, luz e brilho suavizados.
  const alvo = { guinada: 0, arfagem: 0, luzX: -0.45, luzY: 0.55 };
  const atual = { guinada: 0, arfagem: 0, vg: 0, va: 0, luzX: -0.45, luzY: 0.55, aceso: 0 };
  let comCursor = false;
  const acesos = new Set<string>();
  let proximoPulso = 0.8;
  let pulsoComecou = -10;

  // Medição de tempo de quadro para a qualidade adaptativa.
  let somaDosQuadros = 0;
  let quadrosMedidos = 0;
  let parado = false;

  const atomos = new Float32Array(7 * 4);
  const fases = ORDEM.map((_, i) => i * 1.7);
  const cadeia = new Float32Array(cadeiaDoPulso().flat());
  const rotacao = new Float32Array(9);

  function dimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75) * escalaDeQualidade;
    const w = Math.max(1, Math.round(largura * dpr));
    const h = Math.max(1, Math.round(altura * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl!.viewport(0, 0, w, h);
  }

  function passo(dt: number) {
    relogio += dt;
    // Sem cursor, a molécula respira sozinha; com cursor, segue a mão.
    if (!comCursor) {
      alvo.guinada = 0.12 * Math.sin(relogio * 0.45);
      alvo.arfagem = 0.07 * Math.sin(relogio * 0.33 + 1);
      alvo.luzX = -0.45 + 0.25 * Math.sin(relogio * 0.3);
      alvo.luzY = 0.55;
    }
    // Mola criticamente amortecida (rigidez 38, amortecimento 2·√38).
    const k = 38;
    const c = 2 * Math.sqrt(k) * 0.9;
    atual.vg += (k * (alvo.guinada - atual.guinada) - c * atual.vg) * dt;
    atual.va += (k * (alvo.arfagem - atual.arfagem) - c * atual.va) * dt;
    atual.guinada += atual.vg * dt;
    atual.arfagem += atual.va * dt;
    const f = Math.min(1, dt * 4);
    atual.luzX += (alvo.luzX - atual.luzX) * f;
    atual.luzY += (alvo.luzY - atual.luzY) * f;
    atual.aceso += ((acesos.size ? 1 : 0) - atual.aceso) * Math.min(1, dt * 3);

    if (relogio >= proximoPulso) {
      pulsoComecou = relogio;
      proximoPulso = relogio + (acesos.size ? CICLO_ACESO : CICLO);
      opcoes.aoSinal?.();
    }
  }

  function desenhar() {
    const g = gl!;
    ORDEM.forEach((id, i) => {
      const [x, y, r] = noEspacoLocal(id);
      // Cada átomo boia um pouco em profundidade: a silhueta não muda (câmera
      // ortográfica), mas a luz e as juntas se mexem.
      atomos.set([x, y, 1.3 * Math.sin(relogio * 0.9 + fases[i]), r], i * 4);
    });
    const cg = Math.cos(atual.guinada);
    const sg = Math.sin(atual.guinada);
    const ca = Math.cos(atual.arfagem);
    const sa = Math.sin(atual.arfagem);
    // Rx(arfagem) · Ry(guinada), em ordem de coluna.
    rotacao.set([cg, sa * sg, -ca * sg, 0, ca, sa, sg, -sa * cg, ca * cg]);
    const luz = [atual.luzX, atual.luzY, 0.9];
    const n = Math.hypot(luz[0], luz[1], luz[2]);
    const idade = relogio - pulsoComecou;
    const pulso = idade >= 0 && idade < PERCURSO ? suave(idade / PERCURSO) * 1.08 - 0.04 : -1;

    g.useProgram(programa);
    g.uniform2f(u.uRes, canvas.width, canvas.height);
    g.uniform1f(u.uTempo, relogio);
    g.uniformMatrix3fv(u.uRot, false, rotacao);
    g.uniform4fv(u.uAtomos, atomos);
    g.uniform3fv(u.uCadeia, cadeia);
    g.uniform3f(u.uLuz, luz[0] / n, luz[1] / n, luz[2] / n);
    g.uniform1f(u.uPulso, pulso);
    g.uniform1f(u.uAceso, atual.aceso);
    g.clearColor(0, 0, 0, 0);
    g.clear(g.COLOR_BUFFER_BIT);
    g.drawArrays(g.TRIANGLES, 0, 3);
    if (!pintou) {
      pintou = true;
      opcoes.aoPintar?.();
    }
  }

  function laco(agora: number) {
    quadro = 0;
    if (destruido || !visivel || parado) return;
    const dt = ultimo ? Math.min(0.05, (agora - ultimo) / 1000) : 0.016;
    if (ultimo) medirQuadro(agora - ultimo);
    ultimo = agora;
    passo(dt);
    desenhar();
    if (!parado) quadro = requestAnimationFrame(laco);
  }

  /**
   * Qualidade adaptativa: a cada 40 quadros, se a média passou de 24 ms, a
   * resolução cai um degrau; no último degrau, a molécula para no quadro
   * atual (continua desenhada, só não anima).
   */
  function medirQuadro(ms: number) {
    somaDosQuadros += ms;
    if (++quadrosMedidos < 40) return;
    const media = somaDosQuadros / quadrosMedidos;
    somaDosQuadros = 0;
    quadrosMedidos = 0;
    if (media <= 24) return;
    if (escalaDeQualidade > 0.5) {
      escalaDeQualidade = Math.max(0.5, escalaDeQualidade * 0.75);
      dimensionar();
    } else {
      parado = true;
    }
  }

  function retomar() {
    if (destruido || !pronto || opcoes.estatico || parado || quadro || !visivel) return;
    ultimo = 0;
    quadro = requestAnimationFrame(laco);
  }

  function aoFicarPronto() {
    if (destruido) return;
    if (!gl!.getProgramParameter(programa, gl!.LINK_STATUS)) {
      console.warn("molecula3d:", (fs && gl!.getShaderInfoLog(fs)) || gl!.getProgramInfoLog(programa));
      opcoes.aoFalhar?.();
      return;
    }
    u = Object.fromEntries(
      ["uRes", "uTempo", "uRot", "uAtomos", "uCadeia", "uLuz", "uPulso", "uAceso"].map((nome) => [
        nome,
        gl!.getUniformLocation(programa, nome),
      ]),
    );
    pronto = true;
    if (largura) {
      dimensionar();
      passo(0);
      desenhar();
      retomar();
    }
  }

  // Espera o link sem travar a página (a compilação pode levar centenas de ms).
  let esperaDoLink = 0;
  const conferirLink = () => {
    esperaDoLink = 0;
    if (destruido) return;
    if (paralelo && !gl.getProgramParameter(programa, paralelo.COMPLETION_STATUS_KHR)) {
      esperaDoLink = window.setTimeout(conferirLink, 50);
      return;
    }
    aoFicarPronto();
  };
  esperaDoLink = window.setTimeout(() => {
    if (destruido) return;
    comecarCompilacao();
    esperaDoLink = window.setTimeout(conferirLink, paralelo ? 0 : 60);
  }, 0);

  const aoRedimensionar = new ResizeObserver(([e]) => {
    largura = e.contentRect.width;
    altura = e.contentRect.height;
    if (!pronto) return;
    dimensionar();
    if (!pintou) {
      passo(0);
      desenhar();
      retomar();
    } else if (!quadro) desenhar();
  });
  aoRedimensionar.observe(canvas);

  const observador = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel) retomar();
  });
  observador.observe(canvas);

  const aoPerder = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(quadro);
    quadro = 0;
    pronto = false;
    opcoes.aoFalhar?.();
  };
  canvas.addEventListener("webglcontextlost", aoPerder);

  return {
    acender(fonte, ligado) {
      if (ligado) acesos.add(fonte);
      else acesos.delete(fonte);
      // Acendeu com o pulso parado: ele sai já.
      if (ligado && relogio - pulsoComecou > PERCURSO + 0.4 && proximoPulso - relogio > 0.3) proximoPulso = relogio;
    },
    ponteiro(x, y) {
      if (x === null || y === undefined || !largura) {
        comCursor = false;
        acesos.delete("ponteiro");
        return;
      }
      comCursor = true;
      const nx = Math.max(-1, Math.min(1, (x / largura) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, (y / altura) * 2 - 1));
      // Inclina até ~10° na direção do cursor; a luz vem de onde ele está.
      alvo.guinada = nx * 0.18;
      alvo.arfagem = ny * 0.12;
      alvo.luzX = nx * 1.1;
      alvo.luzY = -ny * 1.1;
      const perto = Math.hypot(x / largura - 0.54, y / altura - 0.5) < 0.3;
      if (perto) acesos.add("ponteiro");
      else acesos.delete("ponteiro");
    },
    destruir() {
      destruido = true;
      cancelAnimationFrame(quadro);
      window.clearTimeout(esperaDoLink);
      aoRedimensionar.disconnect();
      observador.disconnect();
      canvas.removeEventListener("webglcontextlost", aoPerder);
      gl.deleteProgram(programa);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
    },
  };
}
