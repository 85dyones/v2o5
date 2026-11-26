#!/usr/bin/env python3
"""Acha os melhores trechos de cada trilha para fundo de reel (janelas de ~28 s).
Uso: trechos.py <saida.json> <trilha1.mp3> [trilha2.mp3 ...]
Critérios: nível firme perto da parte forte da faixa, pouca variação (sem quebra nem silêncio),
começo colado numa batida estimada. Sem librosa: só numpy e ffmpeg."""
import json, subprocess, sys
import numpy as np

SR = 11025
JANELA = 28.0

def carregar(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)

def analisar(p):
    x = carregar(p)
    dur = len(x) / SR
    hop = SR // 20  # 50 ms
    n = len(x) // hop
    quad = x[: n * hop].reshape(n, hop)
    rms = np.sqrt((quad ** 2).mean(axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    # envelope de ataque (fluxo de energia) para achar o andamento
    env = np.maximum(np.diff(db, prepend=db[0]), 0)
    env = env - env.mean()
    ac = np.correlate(env, env, "full")[len(env) - 1:]
    lo, hi = int(0.375 / 0.05), int(0.857 / 0.05)  # 70 a 160 bpm
    lag = lo + int(np.argmax(ac[lo:hi]))
    periodo = lag * 0.05
    # fase: onde a soma de ataques cai melhor na grade
    fases = [env[k::lag].sum() for k in range(lag)]
    fase = int(np.argmax(fases)) * 0.05
    ref = np.percentile(db, 75)
    cands = []
    t = 4.0
    while t + JANELA <= dur - 6:
        # cola a janela na batida mais próxima (compasso de 4 tempos)
        compasso = periodo * 4
        k = round((t - fase) / compasso)
        ini = fase + k * compasso
        if ini >= 3 and ini + JANELA <= dur - 4:
            i0, i1 = int(ini / 0.05), int((ini + JANELA) / 0.05)
            seg = db[i0:i1]
            nivel = seg.mean()
            piso = np.percentile(seg, 5)
            var = seg.std()
            # nota: perto da parte forte, firme, sem buraco
            nota = -abs(nivel - ref) * 1.0 - var * 0.8 - max(0, (ref - piso) - 12) * 0.7
            cands.append((nota, float(ini)))
        t += 1.0
    cands.sort(reverse=True)
    esc = []
    for nota, ini in cands:
        if all(abs(ini - e["inicio"]) >= JANELA for e in esc):
            esc.append({"inicio": round(ini, 2), "nota": round(float(nota), 2)})
        if len(esc) == 5:
            break
    return {"arquivo": p, "duracao": round(dur, 1), "bpm": round(60 / periodo), "trechos": esc}

if __name__ == "__main__":
    saida, *trilhas = sys.argv[1:]
    res = [analisar(p) for p in trilhas]
    json.dump(res, open(saida, "w"), ensure_ascii=False, indent=1)
    for r in res:
        print(r["arquivo"].split("/")[-1][:60], r["duracao"], "s", r["bpm"], "bpm", [(e["inicio"], e["nota"]) for e in r["trechos"]])
