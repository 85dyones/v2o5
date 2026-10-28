#!/usr/bin/env python3
"""Gera o kit de logos da V2O5 (SVG e PNG) em design/logos/kit.

Fontes da verdade, para o kit nunca divergir do site:
- o símbolo C1d vem de src/lib/marca-vetor.ts (gerado por scripts/vetorizar-logo.mjs);
- o logotipo "V2O5" é a Geist SemiBold do pacote npm `geist`, convertida em
  contorno (o SVG não depende de fonte instalada), com o espaçamento do topo
  do site: tamanho 17, entre letras -0,03 em, símbolo de 26 de altura, vão de 8.

Uso (fora do projeto, em um ambiente com as dependências):
    pip install fonttools brotli uharfbuzz cairosvg
    python3 scripts/exportar-logos.py

Cores (memory/context/marca.md): tinta #121418, papel #F2F1EC, âmbar #F2A516.
"""
import json
import re
import shutil
import sys
from pathlib import Path

import cairosvg
import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "design" / "logos" / "kit"
FONTE = RAIZ / "node_modules" / "geist" / "dist" / "fonts" / "geist-sans" / "Geist-SemiBold.ttf"

TINTA, PAPEL, AMBAR, BRANCO, PRETO, PAPEL_CLARO = "#121418", "#F2F1EC", "#F2A516", "#FFFFFF", "#000000", "#FAF9F5"
VB = (8, 14, 112, 70)  # viewBox do símbolo (src/lib/marca.ts)


def simbolo_vetor():
    texto = (RAIZ / "src" / "lib" / "marca-vetor.ts").read_text(encoding="utf-8")
    corpo = texto[texto.index("= {") + 2 :].strip().rstrip(";")
    return json.loads(corpo)


# Variantes de cor: (nome, tinta do símbolo e do texto, cor do átomo, fundo ou None)
POS = ("positivo", TINTA, AMBAR)
# Cores da marca em uma cor só (átomo da mesma cor do símbolo): para fundo âmbar, foto ou impressão em tinta.
MONO_TINTA = ("tinta", TINTA, TINTA)
MONO_PAPEL = ("papel", PAPEL, PAPEL)
NEG = ("negativo", PAPEL, AMBAR)
MONO_PRETO = ("preto", PRETO, PRETO)
MONO_BRANCO = ("branco", BRANCO, BRANCO)
FUNDOS = {"transparente": None, "fundo-papel": PAPEL, "fundo-branco": BRANCO, "fundo-tinta": TINTA, "fundo-ambar": AMBAR}
# Qual cor combina com qual fundo (a combinação ruim nem é gerada).
COMBINA = {
    "positivo": ["transparente", "fundo-papel", "fundo-branco"],
    "negativo": ["transparente", "fundo-tinta"],
    "preto": ["transparente", "fundo-papel", "fundo-branco"],
    "branco": ["transparente", "fundo-tinta"],
    # Átomo da cor do símbolo: sobre âmbar o átomo âmbar sumiria, então ele vai em tinta.
    "tinta": ["transparente", "fundo-papel", "fundo-branco", "fundo-ambar"],
    "papel": ["transparente", "fundo-tinta"],
}


def grupo_simbolo(v, tinta, atomo, tx=0.0, ty=0.0, escala=1.0):
    g = v["grande"]
    return (
        f'<g transform="translate({tx:.3f} {ty:.3f}) scale({escala:.5f})">'
        f'<path d="{g["nuvem"]}" fill="none" stroke="{tinta}" stroke-width="{g["tracoDaNuvem"]}" stroke-linejoin="round"/>'
        f'<path d="{g["rede"]}" fill="{tinta}"/>'
        f'<circle cx="{g["ambar"]["cx"]}" cy="{g["ambar"]["cy"]}" r="{g["ambar"]["r"]}" fill="{atomo}"/>'
        f"</g>"
    )


FONTE_MONO = RAIZ / "node_modules" / "geist" / "dist" / "fonts" / "geist-mono" / "GeistMono-Regular.ttf"


def contorno_do_texto(texto, tamanho, espaco_em, caminho=None):
    """Devolve (d do caminho com y para baixo, largura, altura das maiúsculas), origem na linha de base."""
    caminho = caminho or FONTE
    fonte = TTFont(str(caminho))
    gs = fonte.getGlyphSet()
    upem = fonte["head"].unitsPerEm
    cap = fonte["OS/2"].sCapHeight
    blob = hb.Blob.from_file_path(str(caminho))
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(texto)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": False})
    k = tamanho / upem
    x = 0.0
    pen = SVGPathPen(gs)
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        nome = fonte.getGlyphName(info.codepoint)
        tp = TransformPen(pen, (k, 0, 0, -k, x + pos.x_offset * k, -pos.y_offset * k))
        gs[nome].draw(tp)
        x += pos.x_advance * k + espaco_em * tamanho
    # o último espaçamento não conta na largura
    largura = x - espaco_em * tamanho
    return pen.getCommands(), largura, cap * k


def recorte_justo(v):
    """O retângulo mínimo do desenho (nuvem com o traço, rede e átomo), em unidades do viewBox do símbolo."""
    from io import BytesIO
    from PIL import Image

    k = 40  # pixels por unidade, para achar a borda com folga de 1/40
    corpo = grupo_simbolo(v, "#000000", "#000000")
    png = cairosvg.svg2png(bytestring=svg(VB, corpo).encode("utf-8"), output_width=VB[2] * k)
    caixa = Image.open(BytesIO(png)).getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    x0, y0, x1, y1 = caixa
    return (VB[0] + x0 / k, VB[1] + y0 / k, (x1 - x0) / k, (y1 - y0) / k)


CIRCULOS_DA_NUVEM = [(30, 62, 18), (52, 42, 24), (80, 40, 20), (98, 62, 18)]  # src/lib/construcao.ts
LIGACOES = [("Ot1", "V1"), ("Ot2", "V1"), ("V1", "Ob"), ("Ob", "V2"), ("V2", "Ot3"), ("V2", "Ot4")]  # src/lib/marca.ts
COTAS_DOS_ATOMOS = {"V": "6,8", "O": "4,8"}


def construcao(v, tinta, atomo):
    """O símbolo com a construção (src/components/marca/Construcao.tsx) em SVG estático.
    As hachuras usam a cor do símbolo com opacidade, então servem em qualquer fundo."""
    g = v["grande"]
    nos = g["nos"]
    xs = sorted({n["x"] for n in nos.values()} | {c[0] for c in CIRCULOS_DA_NUVEM})
    ys = sorted({n["y"] for n in nos.values()} | {c[1] for c in CIRCULOS_DA_NUVEM})
    ambar_id = next(i for i, n in nos.items() if n["x"] == g["ambar"]["cx"] and n["y"] == g["ambar"]["cy"])

    def texto(s, x, y):
        d, _, _ = contorno_do_texto(s, 2.4, 0, FONTE_MONO)
        return f'<g transform="translate({x:.3f} {y:.3f})"><path d="{d}"/></g>'

    o = [f'<g stroke="{tinta}" stroke-opacity="0.16" stroke-width="0.25">']
    o += [f'<line x1="{x}" y1="0" x2="{x}" y2="100"/>' for x in xs]
    o += [f'<line x1="-10" y1="{y}" x2="140" y2="{y}"/>' for y in ys]
    o.append("</g>")
    o.append(f'<g fill="none" stroke="{tinta}" stroke-opacity="0.45" stroke-width="0.35">')
    for cx, cy, r in CIRCULOS_DA_NUVEM:
        o.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke-dasharray="1.2 1.2"/>')
        o.append(f'<rect x="{cx - 0.9}" y="{cy - 0.9}" width="1.8" height="1.8" fill="{tinta}" fill-opacity="0.45" stroke="none"/>')
    for a, b in LIGACOES:
        o.append(f'<line x1="{nos[a]["x"]}" y1="{nos[a]["y"]}" x2="{nos[b]["x"]}" y2="{nos[b]["y"]}"/>')
    for i, n in nos.items():
        cor = f'stroke="{atomo}" stroke-opacity="1"' if i == ambar_id else ""
        o.append(f'<circle cx="{n["x"]}" cy="{n["y"]}" r="{n["r"] + 1.6}" stroke-width="0.4" {cor}/>')
    o.append("</g>")
    o.append(f'<g fill="{tinta}" fill-opacity="0.6">')
    for cx, cy, r in CIRCULOS_DA_NUVEM:
        o.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * 0.707:.3f}" y2="{cy - r * 0.707:.3f}" stroke="{tinta}" stroke-opacity="0.6" stroke-width="0.25"/>')
        o.append(texto(f"r {r}", cx + r * 0.36 + 1, cy - r * 0.36 - 1))
    o.append(texto(f"V · {COTAS_DOS_ATOMOS['V']}", nos["V1"]["x"] - 4, nos["V1"]["y"] + 11.5))
    o.append(texto(f"O · {COTAS_DOS_ATOMOS['O']}", nos["Ob"]["x"] + 6.5, nos["Ob"]["y"] + 1))
    o.append("</g>")
    return "".join(o)


def svg(vb, corpo, fundo=None):
    x, y, w, h = vb
    f = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fundo}"/>' if fundo else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:g} {y:g} {w:g} {h:g}" width="{w:g}" height="{h:g}">{f}{corpo}</svg>\n'


def gravar(nome, conteudo, larguras):
    (SAIDA / "svg").mkdir(parents=True, exist_ok=True)
    (SAIDA / "svg" / f"{nome}.svg").write_text(conteudo, encoding="utf-8")
    for L in larguras:
        pasta = SAIDA / "png" / f"{L}px"
        pasta.mkdir(parents=True, exist_ok=True)
        cairosvg.svg2png(bytestring=conteudo.encode("utf-8"), write_to=str(pasta / f"{nome}.png"), output_width=L)


def main():
    leia_me = SAIDA / "LEIA-ME.md"
    texto_leia_me = leia_me.read_text(encoding="utf-8") if leia_me.exists() else None
    if SAIDA.exists():
        shutil.rmtree(SAIDA)
    v = simbolo_vetor()
    x0, y0, w0, h0 = VB
    if texto_leia_me is not None:
        SAIDA.mkdir(parents=True, exist_ok=True)
        leia_me.write_text(texto_leia_me, encoding="utf-8")

    # --- 1. Símbolo isolado (viewBox do site, 112 x 70, com a margem de respiro) ---
    for cor, tinta, atomo in (POS, NEG, MONO_TINTA, MONO_PAPEL, MONO_PRETO, MONO_BRANCO):
        for fundo in COMBINA[cor]:
            corpo = grupo_simbolo(v, tinta, atomo)
            gravar(f"v2o5-simbolo-{cor}-{fundo}", svg(VB, corpo, FUNDOS[fundo]), [512, 1024, 2048])

    # --- 1b. Símbolo em recorte justo (sem margem), só transparente: o desenho encosta nas bordas do arquivo ---
    justo = recorte_justo(v)
    for cor, tinta, atomo in (POS, NEG, MONO_TINTA, MONO_PAPEL, MONO_PRETO, MONO_BRANCO):
        corpo = grupo_simbolo(v, tinta, atomo)
        gravar(f"v2o5-simbolo-recorte-justo-{cor}-transparente", svg(justo, corpo), [512, 1024, 2048])

    # --- 1c. Símbolo com a construção (grade, círculos da nuvem, cotas), viewBox 2 10 124 78 ---
    vb_c = (2, 10, 124, 78)
    for cor, tinta, atomo in (POS, NEG, MONO_TINTA, MONO_PAPEL, MONO_PRETO, MONO_BRANCO):
        for fundo in COMBINA[cor]:
            corpo = construcao(v, tinta, atomo) + grupo_simbolo(v, tinta, atomo)
            gravar(f"v2o5-simbolo-construcao-{cor}-{fundo}", svg(vb_c, corpo, FUNDOS[fundo]), [512, 1024, 2048])

    # --- 2. Horizontal: símbolo + "V2O5", nas proporções do topo do site ---
    # No site: símbolo 26 de altura (viewBox 70) => 1 unidade do site = 70/26 do viewBox.
    f = 70 / 26
    tam = 17 * f
    vao = 8 * f
    d, larg_t, cap = contorno_do_texto("V2O5", tam, -0.03)
    cy = y0 + h0 / 2  # a altura das maiúsculas fica centrada no símbolo
    base = cy + cap / 2
    lockup_w = w0 + vao + larg_t
    margem = 6
    vbh = (x0 - margem, y0, lockup_w + 2 * margem, h0)
    for cor, tinta, atomo in (POS, NEG, MONO_PRETO, MONO_BRANCO):
        for fundo in COMBINA[cor]:
            corpo = grupo_simbolo(v, tinta, atomo) + f'<g transform="translate({x0 + w0 + vao:.3f} {base:.3f})"><path d="{d}" fill="{tinta}"/></g>'
            gravar(f"v2o5-horizontal-{cor}-{fundo}", svg(vbh, corpo, FUNDOS[fundo]), [512, 1024, 2048])

    # --- 3. Ícone quadrado (o favicon do site): tile âmbar, símbolo em tinta, átomo em papel ---
    def icone(arredondado):
        raio = ' rx="14"' if arredondado else ""
        corpo = (
            f'<rect width="64" height="64" fill="{AMBAR}"{raio}/>'
            f'<g transform="translate(2.56 10.46) scale(0.46)">'
            f'<path d="{v["pequeno"]["nuvem"]}" fill="none" stroke="{TINTA}" stroke-width="{v["pequeno"]["tracoDaNuvem"]}" stroke-linejoin="round"/>'
            f'<path d="{v["pequeno"]["rede"]}" fill="{TINTA}"/>'
            f'<circle cx="{v["pequeno"]["ambar"]["cx"]}" cy="{v["pequeno"]["ambar"]["cy"]}" r="{v["pequeno"]["ambar"]["r"]}" fill="{PAPEL_CLARO}"/>'
            f"</g>"
        )
        return svg((0, 0, 64, 64), corpo)

    gravar("v2o5-icone-ambar", icone(False), [32, 64, 180, 192, 512, 1024])
    gravar("v2o5-icone-ambar-cantos-arredondados", icone(True), [180, 512, 1024])

    # --- 4. Avatares de rede social (1080 x 1080): o recorte é circular, então o símbolo ocupa 62% da largura ---
    for cor, tinta, atomo, fundo in (("positivo", TINTA, AMBAR, PAPEL), ("negativo", PAPEL, AMBAR, TINTA)):
        L = 1080
        alvo = L * 0.62
        s = alvo / w0
        tx = (L - w0 * s) / 2 - x0 * s
        ty = (L - h0 * s) / 2 - y0 * s
        corpo = f'<rect width="{L}" height="{L}" fill="{fundo}"/>' + grupo_simbolo(v, tinta, atomo, tx, ty, s)
        gravar(f"v2o5-avatar-rede-{cor}", svg((0, 0, L, L), corpo), [1080, 400])
    # avatar com o tile âmbar, em 1080
    gravar("v2o5-avatar-rede-ambar", icone(False), [1080, 400])

    print(f"{len(list((SAIDA / 'svg').glob('*.svg')))} SVG, {len(list((SAIDA / 'png').rglob('*.png')))} PNG em {SAIDA}")


if __name__ == "__main__":
    sys.exit(main())
