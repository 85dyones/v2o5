"""Capa do destaque "16ª Vara" e a versão quadrada: marca do TJPR e o nome da vara.

Pedido do Dyones (17/11/2026), com o uso da marca do TJPR autorizado pela vara: usar a imagem da vara (marca do TJPR com "16ª Vara
Cível" embaixo), com o nome numa fonte da linha do TJPR. O manual de marca do TJPR
manda a URW DIN, que é paga; aqui vai a D-DIN PRO (Datto, licença OFL), da mesma
família. A composição segue a assinatura setorial do manual: a marca, um fio curto
e o nome em caixa-alta.

Entradas (fora do repositório):
  - o manual público da marca, de https://www.tjpr.jus.br/identidade-visual
    (página 8, a marca horizontal, renderizada a 600 dpi com
    `pdftoppm -f 8 -l 8 -r 600 -png manual.pdf alta`), de onde sai a marca em branco;
  - D-DIN-PRO-700-Bold.otf, do pacote npm @fontpkg/d-din-pro (OFL).

Uso: python3 design/ferramentas/gerar-16-vara.py <alta-08.png> <D-DIN-PRO-700-Bold.otf>
Saída: design/marca/redes/instagram-destaque-16-vara-1080x1920.png e
       design/marca/redes/16-vara-civel-1080.png
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "design" / "marca" / "redes"
AZUL_TJPR = (17, 48, 66)  # o fundo da imagem da vara
BRANCO = (255, 255, 255)
NOME = "16ª VARA CÍVEL"


def marca_em_branco(pagina: Path) -> Image.Image:
    """Recorta a marca horizontal da página 8 e troca a tinta por branco com transparência."""
    im = Image.open(pagina).convert("RGB").crop((3450, 2300, 5900, 3700))
    fundo = sum(im.getpixel((5, 5))) / 3
    tinta = (16 + 46 + 64) / 3
    px = im.load()
    xs, ys = [], []
    for y in range(0, im.height, 2):
        for x in range(0, im.width, 2):
            if sum(px[x, y]) < 300:
                xs.append(x)
                ys.append(y)
    im = im.crop((min(xs) - 10, min(ys) - 10, max(xs) + 10, max(ys) + 10))
    alfa = im.convert("L").point(lambda v: max(0, min(255, int((fundo - v) / (fundo - tinta) * 255))))
    branca = Image.new("RGBA", im.size, BRANCO + (0,))
    branca.putalpha(alfa)
    return branca


def compor(marca: Image.Image, fonte_path: str, w: int, h: int, largura: int, cy: int) -> Image.Image:
    im = Image.new("RGB", (w, h), AZUL_TJPR)
    m = marca.resize((largura, round(marca.height * largura / marca.width)), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    tam = 200
    while True:
        fonte = ImageFont.truetype(fonte_path, tam)
        bb = d.textbbox((0, 0), NOME, font=fonte)
        if bb[2] - bb[0] <= largura:
            break
        tam -= 2
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    vao = round(largura * 0.11)
    y0 = cy - (m.height + vao + th) // 2
    im.paste(m, ((w - m.width) // 2, y0), m)
    fio = y0 + m.height + vao // 2
    d.line(((w - largura * 0.18) / 2, fio, (w + largura * 0.18) / 2, fio), fill=BRANCO, width=max(2, largura // 220))
    d.text(((w - tw) / 2 - bb[0], y0 + m.height + vao - bb[1]), NOME, font=fonte, fill=BRANCO)
    return im


if __name__ == "__main__":
    pagina, fonte = Path(sys.argv[1]), sys.argv[2]
    marca = marca_em_branco(pagina)
    # O Instagram mostra só o círculo central do destaque (raio ~430 px): o bloco cabe nele.
    compor(marca, fonte, 1080, 1920, 640, 960).save(SAIDA / "instagram-destaque-16-vara-1080x1920.png")
    compor(marca, fonte, 1080, 1080, 880, 540).save(SAIDA / "16-vara-civel-1080.png")
    print("ok")
