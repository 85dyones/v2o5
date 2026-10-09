#!/usr/bin/env bash
# Gera os recortes latinos da Geist e da Geist Mono a partir das fontes
# variáveis do pacote npm `geist` (1.7.2). Precisa de `pip install fonttools brotli`.
#
# Por quê: a Geist inteira tem 68 KB e entra antes do LCP (é a fonte do H1).
# O recorte latino (mesma faixa que o Google Fonts chama de "latin") tem 32 KB
# e mantém o eixo de peso 100–900 e os números tabulares (tnum).
#
# Origem conferida em 09/10/2026 (md5):
#   Geist-Variable.woff2 ...... dfa48d5a853753289194436953e3f202
#   GeistMono-Variable.woff2 .. 308360d8a547331fd40bc09a7145d59a
set -euo pipefail
cd "$(dirname "$0")/.."
FAIXA="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
ORIGEM=node_modules/geist/dist/fonts
pyftsubset "$ORIGEM/geist-sans/Geist-Variable.woff2" --unicodes="$FAIXA" --layout-features='*' --flavor=woff2 --output-file=src/app/fonts/geist-latin.woff2
pyftsubset "$ORIGEM/geist-mono/GeistMono-Variable.woff2" --unicodes="$FAIXA" --layout-features='*' --flavor=woff2 --output-file=public/fonts/geist-mono-latin.woff2
cp node_modules/geist/LICENSE.txt src/app/fonts/OFL-Geist.txt
