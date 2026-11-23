#!/usr/bin/env node
// Renderiza os reels de um lote, um a um, a partir do CSV de roteiros.
// Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,L1-02]
//        [--print L1-06=img.png] [--cena L1-01=conversa] [--sem-som]
// O HyperFrames não tem --batch: este script faz o laço com --variables.
// O som do final (efeito curto, sem música) é sintetizado aqui e juntado ao vídeo com o ffmpeg.
import { readFileSync, mkdirSync, writeFileSync, rmSync, existsSync, copyFileSync, renameSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const [csv, ...flags] = process.argv.slice(2);
if (!csv) { console.error("Uso: node scripts/renderizar-lote.mjs <lote.csv> [--draft] [--so L1-01,...] [--print L1-06=img.png] [--cena L1-01=conversa] [--sem-som]"); process.exit(1); }
const draft = flags.includes("--draft");
const semSom = flags.includes("--sem-som");
const so = (flags[flags.indexOf("--so") + 1] ?? "").split(",").filter(Boolean);
const pares = (nome) => Object.fromEntries(flags.flatMap((f, i) => (f === nome ? [flags[i + 1].split("=")] : [])));
const prints = pares("--print");
const cenas = pares("--cena");
const cenasCfg = existsSync(join(raiz, "cenas.json")) ? JSON.parse(readFileSync(join(raiz, "cenas.json"), "utf8")) : {};
const v2Flag = flags.includes("--v2"); // padrão do reel dos 4 minutos, com os dados de video/v2.json
const v2Cfg = existsSync(join(raiz, "v2.json")) ? JSON.parse(readFileSync(join(raiz, "v2.json"), "utf8")) : {};
const telas = pares("--tela");
const vozPasta = flags.includes("--voz-pasta") ? resolve(flags[flags.indexOf("--voz-pasta") + 1]) : null; // gravações próprias: <pasta>/<codigo>/NN-tipo.wav
const narrar = vozPasta ? "propria" : flags.includes("--narrar") ? flags[flags.indexOf("--narrar") + 1] : null; // voz do Kokoro: pm_alex, pm_santa, pf_dora // gravação em vídeo da tela: --tela L1-08=gravacoes/telas/v-formulario-completo.mp4

function lerCsv(texto) {
  const linhas = []; let campo = ""; let linha = []; let aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) { if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; } else if (c === '"') aspas = false; else campo += c; }
    else if (c === '"') aspas = true;
    else if (c === ",") { linha.push(campo); campo = ""; }
    else if (c === "\n") { linha.push(campo); linhas.push(linha); linha = []; campo = ""; }
    else if (c !== "\r") campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...resto] = linhas;
  return resto.filter((l) => l.length === cab.length).map((l) => Object.fromEntries(cab.map((k, i) => [k, l[i]])));
}

// O símbolo da marca vem do vetor do site (src/lib/marca-vetor.ts, versão grande).
function simbolo() {
  const ts = readFileSync(join(raiz, "../src/lib/marca-vetor.ts"), "utf8");
  const bloco = ts.slice(ts.indexOf('"grande": {'), ts.indexOf('"pequeno": {'));
  const pega = (re) => bloco.match(re)[1];
  const marca = readFileSync(join(raiz, "../src/lib/marca.ts"), "utf8");
  const vb = marca.match(/VIEWBOX = \{ x: (\d+), y: (\d+), largura: (\d+), altura: (\d+) \}/);
  return {
    VIEWBOX: `${vb[1]} ${vb[2]} ${vb[3]} ${vb[4]}`,
    NUVEM: pega(/"nuvem": "([^"]+)"/), TRACO: pega(/"tracoDaNuvem": ([\d.]+)/),
    REDE: pega(/"rede": "([^"]+)"/),
    AMBAR_CX: pega(/"ambar": \{\s*"cx": ([\d.]+)/), AMBAR_CY: pega(/"cy": ([\d.]+),\s*"r": [\d.]+\s*\},\s*"nos"/), AMBAR_R: pega(/"ambar": \{[^}]*"r": ([\d.]+)/),
  };
}

// Efeito sonoro do final: subida suave, batida do logo, toque do átomo âmbar e saída. Sem música.
function efeito(arquivo, inicioDoFim, total) {
  const ms = (s) => Math.round(s * 1000);
  const f = [
    { src: "anoisesrc=d=1.1:c=pink:a=0.5", filtro: "highpass=f=700,lowpass=f=5200,afade=t=in:d=0.9,afade=t=out:st=0.9:d=0.2,volume=0.45", t: inicioDoFim + 0.1 },
    { src: "sine=f=88:d=0.45", filtro: "afade=t=out:st=0.05:d=0.4,volume=0.9", t: inicioDoFim + 1.15 },
    { src: "sine=f=1318:d=0.7", filtro: "afade=t=in:d=0.01,afade=t=out:st=0.05:d=0.65,volume=0.22", t: inicioDoFim + 1.18 },
    { src: "anoisesrc=d=0.5:c=pink:a=0.5", filtro: "highpass=f=900,lowpass=f=4200,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.25,volume=0.28", t: total - 0.55 },
  ];
  const args = ["-v", "error", "-y"];
  f.forEach((x) => args.push("-f", "lavfi", "-i", x.src));
  const grafo = f.map((x, i) => `[${i}:a]${x.filtro},adelay=${ms(x.t)}|${ms(x.t)}[a${i}]`).join(";") + `;${f.map((_, i) => `[a${i}]`).join("")}amix=inputs=${f.length}:normalize=0,atrim=0:${total},volume=5,alimiter=limit=0.7,apad=whole_dur=${total}[o]`;
  args.push("-filter_complex", grafo, "-map", "[o]", "-ar", "48000", "-ac", "2", arquivo);
  const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error("falhou ao gerar o efeito sonoro");
}


// ---- narração e efeitos (modo --narrar) ----
const ms = (s) => Math.round(s * 1000);
const frasesDe = (t) => t.trim().split(/(?<=[.?!])\s+(?=[A-ZÁÉÍÓÚ0-9])/);

// Narração gravada pelo próprio autor: <pasta>/<codigo>/NN-tipo.wav, na mesma ordem dos trechos de docs/reels/narracao-roteiro.md.
function narracaoPropria(reel) {
  const origem = join(vozPasta, reel.codigo);
  const destino = join(raiz, "saida/narracao/propria", reel.codigo);
  mkdirSync(destino, { recursive: true });
  const cta = reel.cta.split(":");
  const unidades = [
    ...frasesDe(reel.gancho).map((t) => ["gancho", t]),
    ...frasesDe(reel.corpo).map((t) => ["corpo", t]),
    ["cta", cta[0].trim()],
    ["link", (cta[1] ?? "link na bio").trim().replace(/^./, (c) => c.toUpperCase())],
  ];
  const arquivos = readdirSync(origem).filter((f) => f.endsWith(".wav")).sort().map((f) => join(origem, f));
  // A chamada final é a mesma em todos os reels: pode ser gravada uma vez só em <pasta>/_cta/cta.wav e _cta/link.wav.
  if (arquivos.length === unidades.length - 2 && existsSync(join(vozPasta, "_cta/cta.wav")) && existsSync(join(vozPasta, "_cta/link.wav"))) arquivos.push(join(vozPasta, "_cta/cta.wav"), join(vozPasta, "_cta/link.wav"));
  if (arquivos.length !== unidades.length) throw new Error(`${reel.codigo}: esperava ${unidades.length} gravações em ${origem} (ou ${unidades.length - 2} mais a pasta _cta), achei ${arquivos.length}`);
  const out = unidades.map(([tipo, texto], i) => {
    const alvo = join(destino, `${String(i).padStart(2, "0")}-${tipo}.wav`);
    // tira o silêncio do começo e do fim de cada gravação
    const filtro = "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.12,areverse";
    const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", arquivos[i], "-af", filtro, "-ar", "48000", "-ac", "1", alvo]);
    if (r.status !== 0) throw new Error("falhou ao aparar " + arquivos[i]);
    const dur = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", alvo]).stdout.toString());
    return { tipo, texto, arquivo: alvo, dur: +dur.toFixed(3) };
  });
  return { voz: "propria", unidades: out };
}

function gerarNarracao(codigo, voz) {
  if (vozPasta) return narracaoPropria(reels.find((x) => x.codigo === codigo));
  const pasta = join(raiz, "saida/narracao", voz);
  const arq = join(pasta, codigo, "manifest.json");
  if (!existsSync(arq)) {
    const py = process.env.TTS_PY ?? "python3";
    const r = spawnSync(py, [join(raiz, "scripts/narrar.py"), codigo, voz, pasta], { stdio: "inherit", env: process.env });
    if (r.status !== 0) throw new Error("falhou ao gerar a narração (KOKORO_MODEL, KOKORO_VOICES e TTS_PY configurados?)");
  }
  return JSON.parse(readFileSync(arq, "utf8"));
}

// Planeja os tempos do vídeo a partir da duração de cada trecho falado.
function planejar(man, ctaPrincipal) {
  const u = man.unidades;
  const g = u.filter((x) => x.tipo === "gancho"), c = u.filter((x) => x.tipo === "corpo");
  const cta = u.find((x) => x.tipo === "cta"), link = u.find((x) => x.tipo === "link");
  const falas = []; // { arquivo, t }
  let t = 0.35;
  const gInicio = [];
  g.forEach((x, i) => { if (i) t += 0.7; gInicio.push(t); falas.push({ arquivo: x.arquivo, t }); t += x.dur; });
  const chG = g.map((x) => x.texto.length), durG = g.reduce((a, x) => a + x.dur, 0);
  const ganchoVel = +(0.9 * durG / chG.reduce((a, b) => a + b, 0)).toFixed(4);
  const ganchoPausa = g.length > 1 ? Math.max(0.1, gInicio[1] - (0.3 + ganchoVel * chG[0])) : 0.7;
  const G = +(t + 0.7).toFixed(2);
  const tempos = [];
  t = G + 0.35;
  c.forEach((x) => { tempos.push({ t: +t.toFixed(3), d: x.dur }); falas.push({ arquivo: x.arquivo, t }); t += x.dur + 0.3; });
  const E = +(t + 0.6).toFixed(2);
  const chamada = ctaPrincipal.replace(/\.$/, "");
  const fimVel = +(0.9 * cta.dur / chamada.length).toFixed(4);
  const fimTexto0 = +(E + 1.85).toFixed(2);
  falas.push({ arquivo: cta.arquivo, t: fimTexto0 });
  const pilula = fimTexto0 + fimVel * chamada.length + 0.3 + 0.15;
  falas.push({ arquivo: link.arquivo, t: pilula });
  const D = Math.ceil(pilula + link.dur + 0.9);
  return { G, E, D, falas, pilula, plano: { ganchoStart: 0.3, ganchoVel, ganchoPausa: +ganchoPausa.toFixed(3), tempos, fimVel, fimTexto0 } };
}

// Efeitos sonoros do reel de conversa (L1-01): entrada das mensagens, relógio, passagem para o final e logo.
function efeitosConversa(pl) {
  const ts = pl.plano.tempos.map((x) => x.t);
  const { E, D, G } = pl;
  const marcos = [ts[0] + 1.6, ts[1] + 0.2, ts[1] + 1.9, ts[2] + 0.3];
  const sfx = [];
  const ruido = (d, f, t, vol) => sfx.push({ src: `anoisesrc=d=${d}:c=pink:a=0.5`, filtro: f, t, vol });
  const tom = (f, d, filtro, t, vol) => sfx.push({ src: `sine=f=${f}:d=${d}`, filtro, t, vol });
  ruido(0.5, "highpass=f=700,lowpass=f=4500,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.25", G + 0.05, 0.22);
  tom(620, 0.16, "afade=t=out:st=0.02:d=0.14", ts[0] + 0.3, 0.5);
  marcos.forEach((m, i) => tom(i === 3 ? 330 : 440, 0.12, "afade=t=out:st=0.02:d=0.1", m, 0.35));
  for (let k = marcos[0]; k < E - 0.7; k += 0.5) ruido(0.04, "highpass=f=2600,afade=t=out:st=0.01:d=0.03", k, 0.3);
  tom(520, 0.2, "afade=t=out:st=0.02:d=0.18", marcos[3] + 0.15, 0.5);
  ruido(0.6, "highpass=f=600,lowpass=f=5000,afade=t=in:d=0.3,afade=t=out:st=0.3:d=0.3", E - 0.55, 0.3);
  ruido(1.1, "highpass=f=700,lowpass=f=5200,afade=t=in:d=0.9,afade=t=out:st=0.9:d=0.2", E + 0.1, 0.4);
  tom(88, 0.45, "afade=t=out:st=0.05:d=0.4", E + 1.15, 0.9);
  tom(1318, 0.7, "afade=t=in:d=0.01,afade=t=out:st=0.05:d=0.65", E + 1.18, 0.2);
  tom(740, 0.15, "afade=t=out:st=0.02:d=0.13", pl.pilula, 0.4);
  ruido(0.5, "highpass=f=900,lowpass=f=4200,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.25", D - 0.55, 0.28);
  return sfx;
}

// ---- padrão v2 (reel dos 4 minutos): gancho escuro, beats curtos, frase de efeito, compartilhar e logo ----
// Dados por reel em video/v2.json. Os beats substituem as frases do corpo, na mesma quantidade (as âncoras da cena seguem os beats).
function planejarV2(d, ctaPrincipal) {
  const HK = 2.4, BEAT = 2.6, GAP = 0.1, PUNCH = 4.4;
  const tempos = d.beats.map((_, i) => ({ t: +(HK + 0.2 + i * (BEAT + GAP)).toFixed(2), d: BEAT }));
  const E = +(tempos[tempos.length - 1].t + BEAT + 0.5).toFixed(2);
  const EL = +(E + PUNCH).toFixed(2);
  const chamada = ctaPrincipal.replace(/\.$/, "");
  const fimVel = 0.022;
  const fimTexto0 = +(EL + 1.85).toFixed(2);
  const pilula = fimTexto0 + fimVel * chamada.length + 0.3 + 0.15;
  const D = Math.ceil(pilula + 1.2);
  return { G: HK, E, D, falas: [], pilula, EL, plano: { v2: true, hook: d.hook, beats: d.beats, punch: d.punch, compart: d.compartilhar, relogio: d.relogio ?? null, EL, tempos, fimVel, fimTexto0 } };
}

// Efeitos do padrão v2: grave contínuo baixo, toque em cada beat, passagem para o escuro, batida da frase de efeito e da logo.
function efeitosV2(pl) {
  const { E, EL, D } = pl;
  const tempos = pl.plano.tempos;
  const sfx = [];
  const ruido = (dur, f, t, vol) => sfx.push({ src: `anoisesrc=d=${dur}:c=pink:a=0.5`, filtro: f, t, vol });
  const tom = (f, dur, filtro, t, vol) => sfx.push({ src: `sine=f=${f}:d=${dur}`, filtro, t, vol });
  tom(140, D, `afade=t=in:d=1.2,afade=t=out:st=${D - 1.5}:d=1.5`, 0, 0.05); // grave contínuo
  tom(90, 0.4, "afade=t=out:st=0.05:d=0.35", 0.12, 0.7); // golpe do gancho
  tempos.forEach((x, i) => tom(i % 2 ? 480 : 600, 0.12, "afade=t=out:st=0.02:d=0.1", x.t, 0.4)); // toque de cada beat
  ruido(0.6, "highpass=f=600,lowpass=f=5000,afade=t=in:d=0.3,afade=t=out:st=0.3:d=0.3", E - 0.55, 0.3); // passagem para o escuro
  tom(80, 0.5, "afade=t=out:st=0.05:d=0.45", E + 0.25, 0.9); // batida da frase de efeito
  tom(700, 0.15, "afade=t=out:st=0.02:d=0.13", E + 2.3, 0.35); // pílula de compartilhar
  ruido(1.1, "highpass=f=700,lowpass=f=5200,afade=t=in:d=0.9,afade=t=out:st=0.9:d=0.2", EL + 0.1, 0.4); // subida da logo
  tom(88, 0.45, "afade=t=out:st=0.05:d=0.4", EL + 1.15, 0.9); // batida da logo
  tom(1318, 0.7, "afade=t=in:d=0.01,afade=t=out:st=0.05:d=0.65", EL + 1.18, 0.2); // átomo âmbar
  tom(740, 0.15, "afade=t=out:st=0.02:d=0.13", pl.pilula, 0.4); // botão final
  ruido(0.5, "highpass=f=900,lowpass=f=4200,afade=t=in:d=0.2,afade=t=out:st=0.25:d=0.25", D - 0.55, 0.28);
  return sfx;
}

function mixar(falas, sfx, total, saidaWav) {
  const args = ["-v", "error", "-y"];
  const nodes = [];
  falas.forEach((f) => args.push("-i", f.arquivo));
  sfx.forEach((x) => args.push("-f", "lavfi", "-i", x.src));
  falas.forEach((f, i) => nodes.push(`[${i}:a]aresample=48000,aformat=channel_layouts=mono,adelay=${ms(f.t)}:all=1[v${i}]`));
  sfx.forEach((x, j) => { const i = falas.length + j; nodes.push(`[${i}:a]aresample=48000,aformat=channel_layouts=mono,${x.filtro},volume=${x.vol},adelay=${ms(x.t)}:all=1[e${j}]`); });
  const fl = falas.map((_, i) => `[v${i}]`).join(""), ef = sfx.map((_, j) => `[e${j}]`).join("");
  if (falas.length) {
    nodes.push(`${fl}amix=inputs=${falas.length}:normalize=0,volume=1.0[fala]`);
    nodes.push(`${ef}amix=inputs=${sfx.length}:normalize=0,volume=0.8[efeitos]`);
    nodes.push(`[fala][efeitos]amix=inputs=2:normalize=0,loudnorm=I=-15:TP=-2:LRA=7,apad=whole_dur=${total},atrim=0:${total}[o]`);
  } else {
    // sem narração: só os efeitos, normalizados para o celular
    nodes.push(`${ef}amix=inputs=${sfx.length}:normalize=0,volume=1.0,loudnorm=I=-16:TP=-2:LRA=9,apad=whole_dur=${total},atrim=0:${total}[o]`);
  }
  args.push("-filter_complex", nodes.join(";"), "-map", "[o]", "-ar", "48000", "-ac", "2", saidaWav);
  const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error("falhou ao misturar a narração e os efeitos");
}

const reels = lerCsv(readFileSync(resolve(csv), "utf8")).filter((r) => !so.length || so.includes(r.codigo));
const saida = join(raiz, "saida");
mkdirSync(saida, { recursive: true });
const modelo = readFileSync(join(raiz, "modelos/reel/index.html"), "utf8");
const sim = simbolo();

for (const r of reels) {
  let dur = Math.max(14, Number(r.duracao_s));
  let G = 4.2, E = +(dur - 5.5).toFixed(1);
  let pl = null;
  const dv2 = v2Flag ? v2Cfg[r.codigo] : null;
  if (dv2) {
    pl = planejarV2(dv2, r.cta.split(":")[0].trim());
    ({ G, E, D: dur } = pl);
  } else if (narrar) {
    pl = planejar(gerarNarracao(r.codigo, narrar), r.cta.split(":")[0].trim());
    ({ G, E, D: dur } = pl);
  }
  let html = modelo.replaceAll("{{DURACAO}}", String(dur)).replaceAll("{{GANCHO_DUR}}", String(G)).replaceAll("{{FIM_INICIO}}", String(E));
  for (const [k, val] of Object.entries(sim)) html = html.replaceAll(`{{${k}}}`, val);
  const tmp = join(saida, `.tmp-${r.codigo}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  spawnSync("cp", ["-r", join(raiz, "modelos/reel") + "/.", tmp]);
  const cfg = (dv2 && dv2.cfg) ? dv2.cfg : (cenasCfg[r.codigo] ?? {});
  const cena = cenas[r.codigo] ?? cfg.tipo ?? (telas[r.codigo] || prints[r.codigo] ? "tela" : "texto");
  let videoTag = "";
  if (telas[r.codigo] && existsSync(telas[r.codigo])) {
    // O clipe é estendido (último quadro parado) até cobrir toda a cena do meio.
    mkdirSync(join(tmp, "assets"), { recursive: true });
    const janela = +(E - 0.55 - G - 0.1).toFixed(2);
    // Se a gravação for mais longa que a cena, acelera até caber (no máximo 1,3x); se for mais curta, segura o último quadro.
    const durClipe = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", resolve(telas[r.codigo])]).stdout.toString());
    const fator = durClipe > janela ? Math.max(janela / durClipe, 1 / 1.3) : 1;
    const p2 = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", resolve(telas[r.codigo]), "-vf", `setpts=PTS*${fator.toFixed(4)},tpad=stop_mode=clone:stop_duration=60,trim=duration=${janela},setpts=PTS-STARTPTS,fps=30,format=yuv420p`, "-c:v", "libx264", "-crf", "16", "-an", join(tmp, "assets/tela.mp4")], { stdio: "inherit" });
    if (p2.status !== 0) throw new Error("falhou ao preparar a gravação da tela");
    videoTag = `<video class="clip" src="assets/tela.mp4" muted playsinline data-start="${+(G + 0.1).toFixed(2)}" data-duration="${janela}" data-track-index="2"></video>`;
  }
  let print = "";
  if (prints[r.codigo] && existsSync(prints[r.codigo])) {
    mkdirSync(join(tmp, "assets"), { recursive: true });
    copyFileSync(resolve(prints[r.codigo]), join(tmp, "assets/print.png"));
    print = "assets/print.png";
  }
  writeFileSync(join(tmp, "index.html"), html.replaceAll("{{VIDEO_TAG}}", videoTag));
  const legendas = dv2 ? dv2.beats : cena !== "texto" ? r.corpo.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚ])/) : [];
  const vars = { gancho: r.gancho, prova: r.texto_tela, print, cta: r.cta, cena, legendas: JSON.stringify(legendas), cfg: JSON.stringify(cfg), narr: pl ? JSON.stringify(pl.plano) : "null" };
  const sufixo = dv2 ? ".v2" : narrar ? `.narrado-${narrar}` : "";
  const mudo = join(saida, `${r.codigo}${sufixo}.mudo.mp4`);
  const arq = join(saida, `${r.codigo}${sufixo}.mp4`);
  const res = spawnSync("npx", ["hyperframes", "render", tmp, "-o", mudo, "-q", draft ? "draft" : "delivery", "--variables", JSON.stringify(vars), "--quiet"], { cwd: raiz, stdio: "inherit" });
  rmSync(tmp, { recursive: true, force: true });
  if (res.status !== 0) { console.error(`falhou: ${r.codigo}`); process.exit(res.status ?? 1); }
  if (semSom) { renameSync(mudo, arq); }
  else if (pl) {
    const wav = join(saida, `${r.codigo}${sufixo}.mix.wav`);
    mixar(pl.falas, dv2 ? efeitosV2(pl) : cena === "conversa" ? efeitosConversa(pl) : [], dur, wav);
    const m = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", mudo, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", arq], { stdio: "inherit" });
    if (m.status !== 0) { console.error(`falhou ao juntar o som: ${r.codigo}`); process.exit(m.status ?? 1); }
    rmSync(mudo, { force: true }); rmSync(wav, { force: true });
  }
  else {
    const wav = join(saida, `${r.codigo}.efeito.wav`);
    efeito(wav, E, dur);
    const m = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", mudo, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", arq], { stdio: "inherit" });
    if (m.status !== 0) { console.error(`falhou ao juntar o som: ${r.codigo}`); process.exit(m.status ?? 1); }
    rmSync(mudo, { force: true }); rmSync(wav, { force: true });
  }
  console.log(`${r.codigo} -> ${arq} (${dur} s, ${draft ? "draft" : "final"})`);
}
