#!/usr/bin/env python3
"""Gera a narração de um reel com o Kokoro (local, offline depois de baixar o modelo).

Uso: narrar.py <codigo> <voz> <saida_dir> [velocidade]
Ambiente: KOKORO_MODEL (kokoro-v1.0.int8.onnx), KOKORO_VOICES (voices-v1.0.bin).
Vozes em português do Brasil: pm_alex e pm_santa (masculinas), pf_dora (feminina).
Saída: <saida_dir>/<codigo>/NN-nome.wav e manifest.json com texto e duração de cada trecho.
"""
import csv, json, os, re, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

codigo, voz, saida = sys.argv[1], sys.argv[2], sys.argv[3]
vel = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
linha = next(r for r in csv.DictReader(open(os.path.join(raiz, "../docs/reels/lote-1.csv"), encoding="utf-8")) if r["codigo"] == codigo)

def frases(t):
    return re.split(r"(?<=[.?!])\s+(?=[A-ZÁÉÍÓÚ0-9])", t.strip())

unidades = []
g = frases(linha["gancho"])
for i, f in enumerate(g):
    unidades.append(("gancho", f))
for f in frases(linha["corpo"]):
    unidades.append(("corpo", f))
cta = linha["cta"].split(":")
unidades.append(("cta", cta[0].strip()))
unidades.append(("link", (cta[1] if len(cta) > 1 else "link na bio").strip().capitalize()))

k = Kokoro(os.environ["KOKORO_MODEL"], os.environ["KOKORO_VOICES"])
pasta = os.path.join(saida, codigo)
os.makedirs(pasta, exist_ok=True)

def aparar(x, sr, limiar=0.012):
    idx = np.where(np.abs(x) > limiar)[0]
    if len(idx) == 0:
        return x
    ini = max(0, idx[0] - int(0.03 * sr)); fim = min(len(x), idx[-1] + int(0.08 * sr))
    return x[ini:fim]

manifesto = []
for n, (tipo, texto) in enumerate(unidades):
    amostras, sr = k.create(texto, voice=voz, speed=vel, lang="pt-br")
    amostras = aparar(np.asarray(amostras, dtype=np.float32), sr)
    arq = os.path.join(pasta, f"{n:02d}-{tipo}.wav")
    sf.write(arq, amostras, sr)
    manifesto.append({"tipo": tipo, "texto": texto, "arquivo": arq, "dur": round(len(amostras) / sr, 3)})
json.dump({"voz": voz, "velocidade": vel, "unidades": manifesto}, open(os.path.join(pasta, "manifest.json"), "w"), ensure_ascii=False, indent=1)
print(codigo, voz, [(u["tipo"], u["dur"]) for u in manifesto])
