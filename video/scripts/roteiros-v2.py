#!/usr/bin/env python3
"""Gera docs/reels/lote-1-v2.md (roteiros do padrão v2 para leitura) a partir de video/v2.json e docs/reels/lote-1.csv."""
import csv, json, os, re

raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
v2 = json.load(open(os.path.join(raiz, "video/v2.json"), encoding="utf-8"))
cenas = json.load(open(os.path.join(raiz, "video/cenas.json"), encoding="utf-8"))
rows = {r["codigo"]: r for r in csv.DictReader(open(os.path.join(raiz, "docs/reels/lote-1.csv"), encoding="utf-8"))}
TELA = {"L1-06", "L1-08", "L1-10", "L1-17", "L1-21", "L1-25"}

def limpo(t):
    return re.sub(r"[\[\]]", "", t).replace("|", " / ")

linhas = ["# Roteiros do lote 1 no padrão v2 (para leitura, 24/11/2026; foco em pequenos negócios desde 25/11/2026)\n"]
linhas.append("Cada reel ganha: gancho escuro (digitado, com pausa entre as frases e o destaque âmbar depois), beats curtos com um destaque, frase de efeito em fundo escuro com a chamada de compartilhar e a logo no fim. As cenas e as gravações de tela continuam as mesmas do lote 1. Entre colchetes, o trecho que recebe o destaque; `/` é a quebra de linha. Fonte dos dados: `video/v2.json`.\n")
linhas.append("Legenda de leitura: *cena de exemplo* = a nota discreta no gancho porque o reel usa horários, números ou conversas ilustrativos.\n")
for c in sorted(v2, key=lambda k: int(k.split("-")[1])):
    d = v2[c]; r = rows[c]
    cena = (d.get("cfg") or cenas.get(c, {})).get("tipo") or ("tela" if c in TELA else "texto")
    linhas.append(f"## {c} · {r['angulo']} · cena: {cena}\n")
    linhas.append(f"- **Gancho (v1):** {r['gancho']}")
    linhas.append(f"- **Gancho v2:** {limpo(d['hook']['texto'])}" + (f"  \n  *nota na tela: {d['hook']['nota']}*" if d['hook'].get('nota') else ""))
    for i, b in enumerate(d["beats"], 1):
        linhas.append(f"- **Beat {i}:** {b}")
    if d.get("relogio"):
        linhas.append("- **Relógio:** " + " → ".join(x["t"] + (f" ({x['selo']})" if x.get("selo") else "") for x in d["relogio"]))
    linhas.append(f"- **Frase de efeito:** {limpo(d['punch']['linha1'])} / {limpo(d['punch']['linha2'])}")
    linhas.append(f"- **Compartilhar:** {d['compartilhar']}\n")
open(os.path.join(raiz, "docs/reels/lote-1-v2.md"), "w", encoding="utf-8").write("\n".join(linhas) + "\n")
print(len(v2), "reels")
