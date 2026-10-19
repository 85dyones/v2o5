// Captura de linha de base com as definições de aparelho do Responsively App
// (desktop-app/src/common/deviceList.ts, v2.0.0-beta.0).
// Uso: node telas.cjs <pasta-de-saida>
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const SAIDA = process.argv[2];
const BASE = process.env.BASE_URL || "https://www.v2o5.com.br";
const ROTAS = [
  { slug: "home", caminho: "/" },
  { slug: "precos", caminho: "/precos" },
];
const APARELHOS = [
  {
    slug: "iphone-se", nome: "iPhone SE", width: 375, height: 667, dpr: 2, movel: true,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
  },
  {
    slug: "iphone-15-pro-max", nome: "iPhone 15 Pro Max", width: 430, height: 932, dpr: 3, movel: true,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
  {
    slug: "ipad-mini", nome: "iPad Mini", width: 768, height: 1024, dpr: 2, movel: true,
    ua: "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
  },
  {
    // Preset "MacBook Pro" do Responsively (1440 x 900).
    slug: "desktop-1440", nome: "Desktop 1440 (MacBook Pro)", width: 1440, height: 900, dpr: 2, movel: false,
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  },
];

async function percorrer(page) {
  // Rola até o fim em passos para disparar o carregamento por seção e volta ao topo.
  await page.evaluate(async () => {
    const passo = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

(async () => {
  fs.mkdirSync(SAIDA, { recursive: true });
  const browser = await chromium.launch();
  const registro = [];
  for (const ap of APARELHOS) {
    for (const modo of ["dobra", "inteira"]) {
      // Dobra na densidade do aparelho; página inteira em 1x para não passar do limite de 16 mil px do Chromium.
      const dpr = modo === "dobra" ? ap.dpr : 1;
      const ctx = await browser.newContext({
        viewport: { width: ap.width, height: ap.height },
        deviceScaleFactor: dpr,
        isMobile: ap.movel,
        hasTouch: ap.movel,
        userAgent: ap.ua,
        locale: "pt-BR",
        timezoneId: "America/Sao_Paulo",
      });
      for (const rota of ROTAS) {
        const page = await ctx.newPage();
        await page.goto(BASE + rota.caminho, { waitUntil: "networkidle", timeout: 90000 });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        if (modo === "inteira") await percorrer(page);
        else await page.waitForTimeout(2500);
        const arquivo = `${rota.slug}-${ap.slug}-${modo}.png`;
        await page.screenshot({ path: path.join(SAIDA, arquivo), fullPage: modo === "inteira" });
        const altura = await page.evaluate(() => document.documentElement.scrollHeight);
        registro.push({ arquivo, rota: rota.caminho, aparelho: ap.nome, viewport: `${ap.width}x${ap.height}`, dpr, modo, alturaDaPaginaCss: altura });
        console.log("ok", arquivo, `altura=${altura}px`);
        await page.close();
      }
      await ctx.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(SAIDA, "telas.json"), JSON.stringify({ capturadoEm: new Date().toISOString(), base: BASE, telas: registro }, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
