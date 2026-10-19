"""Gera content/<rota>.md a partir da extração de produção (extracao.json).

Nenhuma palavra é digitada aqui: o texto vem do DOM de produção ou, para os
estados que só aparecem com interação, de literais lidos do código-fonte.
Anotações vão em comentários HTML, que não aparecem no Markdown renderizado.
"""
import json, os, re, sys

EXT, REPO, COMMIT = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(EXT, encoding="utf-8"))
CONTENT = os.path.join(REPO, "content")
os.makedirs(CONTENT, exist_ok=True)
FONTE = f"produção (www.v2o5.com.br), main em {COMMIT}"
ROTA_404 = "/esta-rota-nao-existe-baseline"


def arquivo_da(rota):
    if rota == "/":
        return "home.md"
    if rota == ROTA_404:
        return "nao-encontrada.md"
    return rota.strip("/") + ".md"


def yaml(v):
    return json.dumps(v, ensure_ascii=False)


def frontmatter(rota, r, extra=None):
    h = r["head"]
    campos = {
        "rota": rota if rota != ROTA_404 else "(qualquer rota inexistente; 404)",
        "url": r["urlFinal"],
        "status": r["status"],
        "title": h["title"],
        "description": h["description"],
        "canonical": h["canonical"],
        "robots": h["robots"],
        "h1": h["h1"][0] if len(h["h1"]) == 1 else h["h1"],
        "extraido_em": d["extraidoEm"],
        "fonte": FONTE,
    }
    if extra:
        campos.update(extra)
    linhas = ["---"] + [f"{k}: {yaml(v)}" for k, v in campos.items()] + ["---", ""]
    return "\n".join(linhas)


def bloco_de_rotulos(rotulos, regioes, titulo):
    vistos, itens = set(), []
    for x in rotulos:
        if x["regiao"] not in regioes:
            continue
        chave = (x["rotulo"], x["tag"], x["role"])
        if chave in vistos:
            continue
        vistos.add(chave)
        papel = f" role={x['role']}" if x["role"] else ""
        itens.append(f"- \"{x['rotulo']}\" ({x['tag']}{papel})")
    if not itens:
        return ""
    corpo = "\n".join(itens).replace("--", "- -")
    return f"\n<!-- {titulo}:\n{corpo}\n-->\n"


def literal(caminho, padrao):
    src = open(os.path.join(REPO, caminho), encoding="utf-8").read()
    m = re.search(padrao, src)
    if not m:
        raise SystemExit(f"literal não achado em {caminho}: {padrao}")
    return m.group(1)


rotas = d["rotas"]
home = rotas["/"]
gerados = []

# ---- Comum: topo, rodapé, link de pular, botão fixo, aviso de medição ----
for rota, r in rotas.items():
    assert r["md"]["header"] == home["md"]["header"], f"topo difere em {rota}"
    assert r["md"]["footer"] == home["md"]["footer"], f"rodapé difere em {rota}"

aviso_src = open(os.path.join(REPO, "src/components/layout/Medicao.tsx"), encoding="utf-8").read()
aviso = (
    "Este site mede visitas e o resultado dos anúncios com base no legítimo interesse. Você pode desligar a medição"
    " neste navegador na [página de privacidade](/privacidade#medicao)."
)
norm = lambda s: re.sub(r"\s+", " ", re.sub(r"\{\" \"\}|<[^>]+>|\[|\]\([^)]*\)", " ", s)).replace(" .", ".").strip()
assert norm(aviso) in norm(aviso_src), "aviso de medição não confere com Medicao.tsx"

comum = [
    "---",
    f"conteudo: {yaml('Topo, rodapé e peças presentes em todas as rotas')}",
    f"extraido_em: {yaml(d['extraidoEm'])}",
    f"fonte: {yaml(FONTE)}",
    "---",
    "",
    "<!-- Topo e rodapé são idênticos nas 16 rotas extraídas (conferido no script). -->",
    "",
    "<!-- link de pular, primeiro elemento do body (aparece no foco do teclado) -->",
    "",
    f"[{home['md']['skip']}](#conteudo)",
    "",
    "<!-- ===== topo (header) ===== -->",
    "",
    home["md"]["header"].strip(),
    "",
    "<!-- ===== rodapé (footer) ===== -->",
    "",
    home["md"]["footer"].strip(),
    "",
    "<!-- ===== botão fixo do WhatsApp (fora do main, só abaixo de 768 px). O texto é o mesmo em toda rota que o tem;",
    "     a mensagem pronta muda por rota e está em design/nao-pode-quebrar.md ===== -->",
    "",
    home["md"]["foraDoMain"][0].strip(),
    "",
    "<!-- ===== aviso de medição (só aparece com GA4 ou Pixel ligados e uma vez por navegador; em 19/10/2026 não",
    "     aparecia em produção porque nenhuma ferramenta carrega). Texto de src/components/layout/Medicao.tsx ===== -->",
    "",
    aviso,
    "",
    "Entendi",
    bloco_de_rotulos(home["extras"]["rotulos"], {"topo", "rodape"}, "rótulos de acessibilidade (aria-label) no topo e no rodapé"),
]
open(os.path.join(CONTENT, "_comum.md"), "w", encoding="utf-8").write("\n".join(comum).rstrip() + "\n")
gerados.append("_comum.md")

# ---- Uma página por rota ----
for rota, r in rotas.items():
    nome = arquivo_da(rota)
    destino = os.path.join(CONTENT, nome)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    partes = [frontmatter(rota, r)]
    partes.append("<!-- Texto do <main>, na ordem do DOM de produção. Topo e rodapé: content/_comum.md. -->\n")
    partes.append(r["md"]["main"].strip() + "\n")
    for extra in r["md"]["foraDoMain"]:
        if "wa.me" in extra:
            partes.append("\n<!-- fora do <main>: botão fixo do WhatsApp (só abaixo de 768 px) -->\n")
        else:
            partes.append("\n<!-- fora do <main> -->\n")
        partes.append(extra.strip() + "\n")

    if rota == "/":
        i = d["interacoesDaHome"]
        partes.append("\n<!-- ===== Estados que só aparecem com clique. Capturados com \"menos movimento\", em que cada aba aparece completa de uma vez. ===== -->\n")
        partes.append("\n<!-- demonstração: painel de cada aba (role=tabpanel). Com movimento, os passos aparecem um a um e a aba \"Agente de IA\" já vem aberta. -->\n")
        for aba in i["abas"]:
            partes.append(f"\n<!-- aba: {aba['aba']} -->\n\n{aba['md'].strip()}\n")
        partes.append("\n<!-- diagrama \"como tudo se liga\": painel de cada peça (a peça \"site\" é a que vem escolhida no HTML) -->\n")
        for p in i["pecas"]:
            partes.append(f"\n<!-- peça: {p['peca']} -->\n\n{p['mdFormatado'].strip()}\n")

    if rota == "/diagnostico":
        auto = r["extras"]["mdAutomotivo"]
        ini = auto.index("Tamanho do estoque")
        fim = auto.index("O que você quer resolver primeiro")
        partes.append("\n<!-- ===== Campos que aparecem quando o segmento escolhido é \"Revenda de veículos\" (entram depois de \"Quantas pessoas trabalham na empresa\") ===== -->\n\n")
        partes.append(auto[ini:fim].strip() + "\n")
        partes.append("\n<!-- ===== Mensagens do formulário, só com interação. Copiadas de src/conteudo/diagnostico.ts (botão e envio) e src/lib/leads.ts (validação, mostradas embaixo de cada campo) ===== -->\n")
        msgs = [
            ("botão enquanto envia", literal("src/conteudo/diagnostico.ts", r'enviando: "([^"]+)"')),
            ("falha no envio", literal("src/conteudo/diagnostico.ts", r'erroGeral: "([^"]+)"')),
            ("canal de entrega sem configuração (503)", literal("src/conteudo/diagnostico.ts", r'erroCanal: "([^"]+)"')),
        ]
        leads = open(os.path.join(REPO, "src/lib/leads.ts"), encoding="utf-8").read()
        for campo, texto in re.findall(r'erros\.(\w+) = "([^"]+)"', leads):
            msgs.append((f"erro do campo {campo}", texto))
        for rotulo, texto in msgs:
            partes.append(f"\n<!-- {rotulo} -->\n\n{texto}\n")
        partes.append("\n<!-- campo armadilha \"site\": rótulo \"Site\" fora da tela e do tab, para robôs; não é texto para pessoas -->\n")

    partes.append(bloco_de_rotulos(r["extras"]["rotulos"], {"main", "fora"}, "rótulos de acessibilidade (aria-label) desta rota, fora topo e rodapé"))
    texto = "\n".join(p.rstrip("\n") for p in partes if p) + "\n"
    texto = texto.replace("Site <!-- decorativo, aria-hidden -->\n\nPedir diagnóstico gratuito", "Site <!-- armadilha para robôs (campo site), aria-hidden -->\n\nPedir diagnóstico gratuito")
    open(destino, "w", encoding="utf-8").write(texto)
    gerados.append(nome)

# ---- llms.txt, como servido ----
llms = d["cru"]["/llms.txt"]
open(os.path.join(CONTENT, "llms.txt.md"), "w", encoding="utf-8").write(
    "\n".join(["---", 'rota: "/llms.txt"', f"url: {yaml(d['base'] + '/llms.txt')}", f"status: {llms['status']}",
               f"content_type: {yaml(llms['tipo'])}", f"extraido_em: {yaml(d['extraidoEm'])}", f"fonte: {yaml(FONTE)}",
               "---", "", "<!-- Corpo de /llms.txt exatamente como servido (gerado por src/app/llms.txt/route.ts). -->", "", llms["corpo"].rstrip(), ""])
)
gerados.append("llms.txt.md")
print("\n".join(gerados))
