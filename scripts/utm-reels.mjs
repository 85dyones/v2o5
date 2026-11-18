#!/usr/bin/env node
// Gera os links com UTM dos reels: node scripts/utm-reels.mjs <lote> <quantidade> [destino]
// Ex.: node scripts/utm-reels.mjs 1 25
// Padrão: utm_source=instagram, utm_medium=reel-teste, utm_campaign=100-reels,
// utm_content=L<lote>-<número com 2 dígitos>. A bio usa utm_medium=bio.
const [lote, quantidade, destino = "https://www.v2o5.com.br/diagnostico"] = process.argv.slice(2);
const l = Number(lote);
const q = Number(quantidade);
if (!Number.isInteger(l) || l < 1 || !Number.isInteger(q) || q < 1) {
  console.error("Uso: node scripts/utm-reels.mjs <lote> <quantidade> [destino]");
  process.exit(1);
}
console.log("codigo,link");
for (let n = 1; n <= q; n++) {
  const codigo = `L${l}-${String(n).padStart(2, "0")}`;
  const u = new URL(destino);
  u.searchParams.set("utm_source", "instagram");
  u.searchParams.set("utm_medium", "reel-teste");
  u.searchParams.set("utm_campaign", "100-reels");
  u.searchParams.set("utm_content", codigo);
  console.log(`${codigo},${u.toString()}`);
}
