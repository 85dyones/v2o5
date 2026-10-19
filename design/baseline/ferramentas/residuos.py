"""Lista os textos do código-fonte que não aparecem em nenhum arquivo de content/.

Saída: content/_fora-das-rotas.md, com arquivo:linha e o literal copiado do código.
"""
import glob, os, re, sys, urllib.parse

REPO, COMMIT = sys.argv[1], sys.argv[2]
import json
_ext = json.load(open(sys.argv[3], encoding="utf-8"))
JSONLD = json.dumps([r["head"]["jsonld"] for r in _ext["rotas"].values()], ensure_ascii=False).lower()
CONTENT = os.path.join(REPO, "content")


def norm(s):
    s = re.sub(r"<!--.*?-->", " ", s, flags=re.S)
    s = re.sub(r"\]\([^)]*\)", "", s)
    s = re.sub(r"[\[\]#>*|`_]", " ", s)
    return re.sub(r"\s+", " ", s).strip().lower()


_bruto = " \n ".join(
    open(f, encoding="utf-8").read()
    for f in glob.glob(os.path.join(CONTENT, "**/*.md"), recursive=True)
    if not f.endswith("_fora-das-rotas.md")
)
tudo = norm(_bruto)
# Segunda base: com comentários (aria-label) e links decodificados (mensagens prontas do WhatsApp, assuntos de e-mail).
tudo_amplo = re.sub(r"\s+", " ", urllib.parse.unquote(_bruto).replace("<!--", " ").replace("-->", " ")).lower()

arquivos = sorted(glob.glob(os.path.join(REPO, "src/conteudo/*.ts")))
arquivos += sorted(glob.glob(os.path.join(REPO, "src/components/**/*.tsx"), recursive=True))
arquivos += sorted(glob.glob(os.path.join(REPO, "src/app/**/*.tsx"), recursive=True))
arquivos += [os.path.join(REPO, "src/lib/leads.ts")]
lit = re.compile(r'"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`|>\s*([^<>{}\n][^<>{}]*?)\s*<', re.S)


def parece_texto(frag):
    if len(frag.split()) < 3:
        return False
    if re.search(r"[;{}=]|=>|\)\s*$|^\W|className|https?:|\bM\d|\d\s\d\s\d", frag):
        return False
    letras = sum(c.isalpha() for c in frag)
    if letras / max(1, len(frag.replace(" ", ""))) < 0.75:
        return False
    if re.fullmatch(r"[a-z0-9:\-\[\]_/.()%#!&>+, ]+", frag) and "-" in frag:
        return False
    return True


achados = []
for arq in arquivos:
    src = open(arq, encoding="utf-8").read()
    rel = os.path.relpath(arq, REPO).replace(os.sep, "/")
    for m in lit.finditer(src):
        bruto = m.group(1) if m.group(1) is not None else m.group(2) if m.group(2) is not None else m.group(3)
        if bruto is None or (m.group(3) is not None and arq.endswith(".ts")):
            continue
        linha = src.count("\n", 0, m.start()) + 1
        inicio_linha = src.rfind("\n", 0, m.start()) + 1
        antes = src[inicio_linha:m.start()]
        # Comentário de código e mensagem de erro de build não são texto de página.
        if antes.lstrip().startswith(("*", "//", "/*")) or "Error(" in antes:
            continue
        for frag in re.split(r"\$\{[^}]*\}", bruto):
            frag = frag.replace("\\n", " ").replace('\\"', '"').strip()
            if not parece_texto(frag):
                continue
            if norm(frag) in tudo or re.sub(r"\s+", " ", frag).lower() in tudo_amplo:
                continue
            achados.append((rel, linha, frag, "${" in bruto))

linhas = [
    "---",
    'conteudo: "Textos do código que não aparecem em nenhuma rota extraída"',
    f'fonte: "src/ em {COMMIT}, comparado com content/"',
    "---",
    "",
    "<!-- Não é texto de página. São literais do código que nenhuma rota mostrava em 19/10/2026: estados raros",
    "     (medição ligada ou desligada em /privacidade), dados do cardápio que nenhuma página exibe e rótulos de",
    "     depuração. Ficam aqui para o redesign decidir se mantém, e para nada sumir sem querer. Cada linha traz",
    "     arquivo:linha e o literal como está no código; \"montado com variável\" é pedaço de frase com valor no meio. -->",
]
atual = None
for rel, linha, frag, montado in achados:
    if rel != atual:
        linhas += ["", f"<!-- {rel} -->", ""]
        atual = rel
    notas = (["montado com variável"] if montado else []) + (["aparece só no JSON-LD"] if frag.lower() in JSONLD else [])
    nota = f" <!-- {'; '.join(notas)} -->" if notas else ""
    linhas.append(f"- `{rel}:{linha}` {frag}{nota}")
open(os.path.join(CONTENT, "_fora-das-rotas.md"), "w", encoding="utf-8").write("\n".join(linhas).rstrip() + "\n")
print(len(achados), "literais fora das rotas")
for a in achados:
    print(f"{a[0]}:{a[1]}  {a[2][:120]}")
