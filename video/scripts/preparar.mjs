#!/usr/bin/env node
// Copia o GSAP e a fonte Geist para o modelo, para o render não depender de CDN.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(raiz, "modelos/reel/assets");
mkdirSync(assets, { recursive: true });
copyFileSync(join(raiz, "node_modules/gsap/dist/gsap.min.js"), join(assets, "gsap.min.js"));
copyFileSync(join(raiz, "../src/app/fonts/geist-latin.woff2"), join(assets, "geist-latin.woff2"));
console.log("assets prontos em", assets);
