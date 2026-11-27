#!/usr/bin/env node
// Grava a tela do site em vídeo (Playwright), com cursor visível, rolagem suave e digitação.
// Dados fictícios; nada é enviado. Uso: SITE=http://localhost:3100 node gravacoes/gravar-videos.mjs
import { createRequire } from "node:module";
import { mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const aqui = dirname(fileURLToPath(import.meta.url));
const saida = join(aqui, "telas");
mkdirSync(saida, { recursive: true });
const SITE = process.env.SITE ?? "http://localhost:3100";
const browser = await chromium.launch();

const CURSOR = `
  (() => { const c = document.createElement("div");
    c.style.cssText = "position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px);transition:none";
    c.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l16 9-7 2-3 7z" fill="#121418" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.addEventListener("DOMContentLoaded", () => document.body.appendChild(c));
    addEventListener("mousemove", (e) => { c.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"; }, true); })();`;

const SO = (process.env.SO ?? "").split(",").filter(Boolean);
async function gravar(nome, roteiro, { pagina = "/diagnostico", arquivo } = {}) {
  if (SO.length && !SO.includes(nome)) return;
  const dir = join(saida, `.rec-${nome}`);
  rmSync(dir, { recursive: true, force: true });
  const ctx = await browser.newContext({ viewport: { width: 1260, height: 750 }, deviceScaleFactor: 1, locale: "pt-BR", recordVideo: { dir, size: { width: 1260, height: 750 } } });
  await ctx.addInitScript(() => { try { localStorage.setItem("v2o5.aviso", "visto"); } catch {} });
  await ctx.addInitScript(CURSOR);
  const t0 = Date.now();
  const p = await ctx.newPage();
  await p.goto(arquivo ?? `${SITE}${pagina}`); await p.waitForLoadState("networkidle"); await p.waitForTimeout(800);
  await p.mouse.move(900, 400);
  const inicio = (Date.now() - t0) / 1000;
  await roteiro(p);
  await p.waitForTimeout(600);
  await ctx.close();
  const webm = readdirSync(dir).find((f) => f.endsWith(".webm"));
  const destino = join(saida, `${nome}.mp4`);
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-ss", String(inicio.toFixed(2)), "-i", join(dir, webm), "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-an", destino], { stdio: "inherit" });
  rmSync(dir, { recursive: true, force: true });
  if (r.status !== 0) throw new Error("ffmpeg falhou: " + nome);
  console.log("gravado", destino);
}

const rolar = (p, dy, ms) => p.evaluate(([dy, ms]) => new Promise((ok) => { const y0 = scrollY, t0 = performance.now();
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  const passo = (t) => { const x = Math.min(1, (t - t0) / ms); scrollTo(0, y0 + dy * ease(x)); x < 1 ? requestAnimationFrame(passo) : ok(); }; requestAnimationFrame(passo); }), [dy, ms]);
const ir = async (p, sel, ms = 700) => { const b = await p.locator(sel).first().boundingBox(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: Math.round(ms / 16) }); };
const digitar = async (p, sel, texto) => { await ir(p, sel); await p.click(sel); await p.keyboard.type(texto, { delay: 70 }); await p.waitForTimeout(250); };
const preparaForm = async (p) => { await p.locator('[name="nome"]').scrollIntoViewIfNeeded(); await p.evaluate(() => scrollBy(0, -140)); await p.waitForTimeout(500); };

await gravar("v-formulario-completo", async (p) => {
  await preparaForm(p);
  await digitar(p, '[name="nome"]', "Mariana Souza");
  await digitar(p, '[name="empresa"]', "Loja Exemplo");
  await digitar(p, '[name="whatsapp"]', "41900000000");
  await digitar(p, '[name="email"]', "contato@exemplo.com.br");
  await ir(p, 'button[type="submit"]', 800); await p.waitForTimeout(900);
});
await gravar("v-formulario-parcial", async (p) => {
  await preparaForm(p);
  await digitar(p, '[name="nome"]', "Mariana Souza");
  await digitar(p, '[name="empresa"]', "Loja Exemplo");
  await ir(p, '[name="whatsapp"]', 900); await p.waitForTimeout(1500);
});
await gravar("v-diagnostico-passos", async (p) => {
  await p.waitForTimeout(900);
  await rolar(p, 330, 1800); await p.waitForTimeout(900);
  await ir(p, "text=Você conta como vende hoje", 900); await p.waitForTimeout(900);
  await ir(p, "text=45 minutos com o fundador", 700); await p.waitForTimeout(900);
  await ir(p, "text=Uma proposta, se fizer sentido", 700); await p.waitForTimeout(1200);
});
await gravar("v-diagnostico-topo", async (p) => {
  await p.waitForTimeout(1500);
  await ir(p, "h1", 1100); await p.waitForTimeout(900);
  await rolar(p, 220, 1800); await p.waitForTimeout(1300);
});
await gravar("v-precos", async (p) => {
  await p.waitForTimeout(1200);
  await rolar(p, 560, 2600); await p.waitForTimeout(800);
  await ir(p, "text=Sites & Integrações", 1000); await p.waitForTimeout(900);
  await ir(p, "text=Atendimento com IA", 700); await p.waitForTimeout(1500);
}, { pagina: "/precos" });
await gravar("v-ficha-exemplo", async (p) => { await p.waitForTimeout(6800); }, { arquivo: pathToFileURL(join(aqui, "ficha-exemplo.html")).href });

// Passeios por outras páginas do site (a tela precisa ter a ver com o que o reel fala).
const para = async (p, rota, y = 0, ms = 1800, antes = 0) => {
  await p.goto(`${SITE}${rota}`); await p.waitForLoadState("networkidle"); await p.waitForTimeout(500);
  await p.mouse.move(820, 330, { steps: 6 });
  if (y) await rolar(p, y, ms);
  await p.waitForTimeout(antes);
};
const alvo = (y) => y - 120;

await gravar("v-08-sites", async (p) => {
  await preparaForm(p);
  await digitar(p, '[name="nome"]', "Mariana Souza");
  await para(p, "/criacao-de-sites", alvo(1285), 1700, 700);
  await rolar(p, alvo(3594) - alvo(1285), 1900); await p.waitForTimeout(800);
  await para(p, "/crm-com-whatsapp", alvo(3040), 2100, 900);
});
await gravar("v-10-diagnostico", async (p) => {
  await para(p, "/", alvo(1649), 2000, 1200);
  await para(p, "/diagnostico", 330, 1500);
  await ir(p, "text=Você conta como vende hoje", 800); await p.waitForTimeout(700);
  await ir(p, "text=45 minutos com o fundador", 600); await p.waitForTimeout(700);
  await ir(p, "text=Uma proposta, se fizer sentido", 600); await p.waitForTimeout(800);
  await para(p, "/criacao-de-sites", alvo(2693), 2200, 1200);
});
await gravar("v-21-fundador", async (p) => {
  // Sem a página /sobre: a foto do fundador não entra no primeiro lote.
  await para(p, "/", alvo(3333), 2300, 1100);
  await rolar(p, alvo(4205) - alvo(3333), 2100); await p.waitForTimeout(1100);
  await para(p, "/diagnostico", 330, 1500, 700);
  await ir(p, "text=45 minutos com o fundador", 900); await p.waitForTimeout(1500);
});
await gravar("v-25-passeio", async (p) => {
  await preparaForm(p);
  await digitar(p, '[name="nome"]', "Mariana Souza");
  await digitar(p, '[name="empresa"]', "Loja Exemplo");
  await para(p, "/presenca-digital-local", 0, 0, 1300);
  await rolar(p, alvo(1112), 1500); await p.waitForTimeout(500);
  await para(p, "/agente-de-ia-para-whatsapp", alvo(736), 1500, 700);
  await para(p, "/crm-com-whatsapp", alvo(641), 1500, 700);
});
await browser.close();
