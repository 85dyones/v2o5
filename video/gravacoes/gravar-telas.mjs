#!/usr/bin/env node
// Captura as telas do site da V2O5 (dados fictícios, nada é enviado) para os reels de tela.
// Uso: SITE=http://localhost:3100 node gravacoes/gravar-telas.mjs   (o site precisa estar no ar)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const aqui = dirname(fileURLToPath(import.meta.url));
const saida = join(aqui, "telas");
mkdirSync(saida, { recursive: true });
const SITE = process.env.SITE ?? "http://localhost:3100";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1260, height: 750 }, deviceScaleFactor: 1.6, locale: "pt-BR" });
await ctx.addInitScript(() => { try { localStorage.setItem("v2o5.aviso", "visto"); } catch {} });
const p = await ctx.newPage();
const foto = (nome) => p.screenshot({ path: join(saida, `${nome}.png`) });
const livre = async () => { await p.waitForLoadState("networkidle"); await p.waitForTimeout(1200); };

// /diagnostico: topo (L1-21)
await p.goto(`${SITE}/diagnostico`); await livre();
await foto("diagnostico-topo");

// formulário em branco, parcial e completo (L1-25 e L1-08)
await p.locator('[name="nome"]').scrollIntoViewIfNeeded();
await p.evaluate(() => window.scrollBy(0, -140)); await p.waitForTimeout(500);
await p.fill('[name="nome"]', "Mariana Souza");
await p.fill('[name="empresa"]', "Loja Exemplo");
await foto("formulario-parcial");
await p.fill('[name="whatsapp"]', "(41) 90000-0000");
await p.fill('[name="email"]', "contato@exemplo.com.br");
await p.waitForTimeout(300);
await foto("formulario-completo");

// os três passos (L1-10)
await p.getByText("Você conta como vende hoje").first().scrollIntoViewIfNeeded();
await p.evaluate(() => window.scrollBy(0, 160)); await p.waitForTimeout(800);
await foto("diagnostico-passos");

// preços (L1-17)
await p.goto(`${SITE}/precos`); await livre();
await foto("precos-topo");
await p.evaluate(() => window.scrollBy(0, 560)); await p.waitForTimeout(800);
await foto("precos-valores");

// ficha de exemplo (L1-06)
await p.goto(pathToFileURL(join(aqui, "ficha-exemplo.html")).href); await p.waitForTimeout(600);
await foto("ficha-exemplo");
await browser.close();
console.log("telas em", saida);
