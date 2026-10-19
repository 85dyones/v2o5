# Escala 1,25 a partir de 17 px e clamp() linear entre 375 e 1440 px de largura.
base, r = 17, 1.25
passos = {i: base * r**i for i in range(-2, 10)}
print("passos:", {i: round(v, 1) for i, v in passos.items()})
def clamp(mn, mx, a=375, b=1440):
    if mn == mx: return f"{mn/16:.4g}rem"
    s = (mx - mn) / (b - a); i = mn - s * a
    return f"clamp({mn/16:.4g}rem, {i/16:.4g}rem + {s*100:.4g}vw, {mx/16:.4g}rem)"
tokens = [("marca", 65, 127), ("numero", 52, 101), ("titulo-1", 42, 81), ("titulo-2", 33, 52),
          ("destaque", 27, 42), ("titulo-3", 27, 33), ("titulo-cartao", 21, 21), ("guia", 17, 21),
          ("corpo", 17, 17), ("legenda", 14, 14), ("rotulo", 12, 12)]
for n, a, b in tokens:
    print(f"{n:<14} {a:>4}->{b:<4} {clamp(a, b)}")
print("espaco secao:", clamp(64, 96), " titulo->conteudo:", clamp(32, 48), " gap grade:", clamp(24, 32))
