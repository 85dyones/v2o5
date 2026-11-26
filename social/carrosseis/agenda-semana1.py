#!/usr/bin/env python3
"""Gera a agenda completa de 26/11 a 07/12/2026: os 3 fixos, os 25 reels e os 12 carrosséis, com a legenda de cada rede.
Saída: docs/reels/semana-1-agenda.md e docs/reels/semana-1-agenda.csv
"""
import csv, datetime, os, re

raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
BASE = "https://www.v2o5.com.br/diagnostico"
CTA_IG = "Descubra onde seu negócio perde cliente. Gratuitamente.\nLink na bio."  # promessa de 25/11/2026, igual ao título do /diagnostico

# legendas dos reels, já escritas em lote-1-agenda.csv (uma por código)
reels = {}
with open(os.path.join(raiz, "docs/reels/lote-1-agenda.csv"), encoding="utf-8") as f:
    for r in csv.DictReader(f):
        reels[r["codigo"]] = r
with open(os.path.join(raiz, "docs/reels/lote-1.csv"), encoding="utf-8") as f:
    ganchos = {r["codigo"]: r["gancho"] for r in csv.DictReader(f)}

import json
v2 = json.load(open(os.path.join(raiz, "video/v2.json"), encoding="utf-8"))

def abertura_v2(c):
    # primeira linha da legenda = gancho do reel v2 (colchetes e barras saem)
    t = v2[c]["hook"]["texto"].replace("[", "").replace("]", "").replace("|", " ")
    t = re.sub(r"\s+", " ", t).strip()
    return t + ("\nCena de exemplo." if v2[c]["hook"].get("nota") == "Cena de exemplo" else "")

def legenda_reel(c):
    if c in reels:
        resto = reels[c]["legenda"].split("\n\n", 1)
        return abertura_v2(c) + fonte_da_nota(c) + ("\n\n" + resto[1] if len(resto) > 1 else "")
    extra = "\nFonte do número: Motors Store, de 21/10 a 17/11/2026." if c == "L1-03" else ""
    return f"{abertura_v2(c)}{extra}\n\n{CTA_IG}\n\n#v2o5"

# carrosséis: (título, texto da legenda, hashtags do Instagram, texto do LinkedIn, hashtags do LinkedIn)
C = {
 "diagnostico-diferencial": ("O diagnóstico como diferencial",
  "Antes de vender a solução, a V2O5 entende o problema.\n\nO diagnóstico gratuito de 45 minutos vê como o cliente acha o seu negócio e como ele é atendido, mostra o que pesa mais hoje e recomenda por onde começar. Havendo um bom caso, a proposta vem por escrito, com escopo, entregáveis, prazo e investimento. Se não houver, a conversa termina ali.",
  "#pequenosnegocios #negociolocal #atendimentoaocliente #empreendedorismo #v2o5",
  "Antes de vender a solução, a V2O5 entende o problema.\n\nO diagnóstico gratuito de 45 minutos é a nossa porta de entrada: vemos como o cliente acha o negócio e como ele é atendido no WhatsApp, o que pesa mais hoje (ser achado, responder ou fazer o cliente voltar) e por onde começar. O diagnóstico não inclui mapeamento completo, implementação nem acompanhamento. Se houver um bom caso, a proposta vem por escrito; se não houver, a conversa termina ali.\n\nLink no primeiro comentário.",
  "#Diagnóstico #PequenosNegócios #Atendimento"),
 "presenca-por-dentro": ("Presença Digital Local, por dentro",
  "Presença Digital Local, por dentro: os dois pacotes, o que o Essencial entrega, a mensalidade opcional e o que fica de fora.\n\nPara o cliente procurar o seu negócio e achar a informação certa, com o pedido de avaliação para quem comprou. A partir de R$ 790, com o valor fechado em proposta.",
  "#googlemeunegocio #negociolocal #pequenosnegocios #whatsappbusiness #v2o5",
  "Presença Digital Local, por dentro.\n\nPerfil no Google, redes e WhatsApp organizados, com o pedido de avaliação para quem comprou e, se quiser, a rotina mensal. São dois pacotes, Essencial (R$ 790) e Estruturada (R$ 1.490), com mensalidade opcional e limites de escopo escritos. Preço de referência; o valor fechado sai em proposta.\n\nLink no primeiro comentário.",
  "#PresençaDigital #NegóciosLocais #PequenosNegócios"),
 "sites-por-dentro": ("Sites & Integrações, por dentro",
  "Sites & Integrações, por dentro: Landing Page, Site Personalizado e Site Conectado.\n\nSite próprio, rápido no celular, que leva o cliente até o WhatsApp e se liga à agenda, ao estoque ou ao sistema que você já usa quando o escopo pede. A partir de R$ 2.900, com o valor fechado em proposta.",
  "#sitesprofissionais #whatsappbusiness #pequenosnegocios #negociolocal #v2o5",
  "Sites & Integrações, por dentro.\n\nTrês pacotes: Landing Page (R$ 2.900), Site Personalizado (R$ 5.900) e Site Conectado (a partir de R$ 9.900), este ligado a um sistema que a empresa já usa. Integração só entra na proposta depois de verificar documentação, credenciais, limites e custos do sistema. O site se liga ao que a empresa já usa e não substitui o CRM nem o sistema de gestão.\n\nLink no primeiro comentário.",
  "#Sites #Integração #PequenosNegócios"),
 "atendimento-por-dentro": ("Atendimento com IA, por dentro",
  "Atendimento com IA, por dentro: os dois pacotes, o que o Essencial entrega, as regras do agente e o que fica de fora.\n\nWhatsApp organizado e um agente de IA que responde só com o que a empresa aprovou e passa cada conversa para a pessoa certa. A partir de R$ 3.900, com o valor fechado em proposta. IA e mensagens ficam pelo valor do provedor.",
  "#whatsappbusiness #atendimentoaocliente #inteligenciaartificial #pequenosnegocios #v2o5",
  "Atendimento com IA, por dentro.\n\nPara o negócio que atende pelo WhatsApp e perde cliente na demora ou na confusão das conversas. Dois pacotes: Atendimento Essencial (a partir de R$ 3.900), com a caixa organizada e um agente que responde as dúvidas frequentes, e Atendimento Integrado (a partir de R$ 6.900), que qualifica, agenda ou encaminha e leva o contato ao sistema que a empresa já usa. O agente responde só com o que a empresa aprovou e chama uma pessoa quando não sabe. IA e mensagens vêm pelo valor do provedor, com teto mensal combinado.\n\nLink no primeiro comentário.",
  "#Atendimento #WhatsAppBusiness #InteligênciaArtificial"),
 "dor-lead-esfria": ("Cliente que espera no WhatsApp",
  "O cliente perguntou o preço às 19h. Quando você respondeu? Cinco sinais para conferir no seu negócio.\n\nMarcou dois ou mais? Vale um diagnóstico. O Atendimento com IA organiza o WhatsApp e responde na hora, a partir de R$ 3.900.",
  "#whatsappbusiness #atendimentoaocliente #pequenosnegocios #negociolocal #v2o5",
  "O cliente perguntou o preço às 19h. Quando você respondeu?\n\nCinco sinais para conferir: a primeira resposta demora, ninguém sabe quem responde, conversas ficam paradas, o contato some sem retomada e ninguém sabe de onde veio cada cliente. Quem reconhece dois ou mais já perde cliente na espera. O diagnóstico gratuito de 45 minutos mostra onde.",
  "#Atendimento #WhatsAppBusiness #PequenosNegócios"),
 "dor-sistemas-separados": ("Sistemas que não conversam",
  "Quantas vezes você digita o mesmo dado esta semana? Cinco sinais para conferir no seu negócio.\n\nCada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. No Atendimento Integrado, o contato que chega pelo WhatsApp vai direto para o sistema que você já usa. A partir de R$ 6.900.",
  "#whatsappbusiness #integracao #pequenosnegocios #negociolocal #v2o5",
  "Quantas vezes você digita o mesmo dado esta semana?\n\nCinco sinais: o mesmo dado em dois lugares, planilha e sistema com números diferentes, site, WhatsApp e sistema sem troca de informação, uma pessoa que sabe onde está cada coisa e o trabalho que para quando ela falta. O diagnóstico gratuito de 45 minutos mostra por onde começar.",
  "#Integração #WhatsAppBusiness #PequenosNegócios"),
 "dor-site-sem-whatsapp": ("Site que não leva ao WhatsApp",
  "Seu site está no ar. O cliente acha como chamar você? Cinco sinais para conferir.\n\nSite bonito que esconde o WhatsApp é vitrine fechada. Sites & Integrações, a partir de R$ 2.900: site próprio, rápido no celular, com o WhatsApp à vista.",
  "#sitesprofissionais #whatsappbusiness #pequenosnegocios #negociolocal #v2o5",
  "Seu site está no ar. O cliente acha como chamar você?\n\nWhatsApp escondido no rodapé, horário e endereço que não aparecem no celular, site lento, nenhuma palavra sobre o que você vende e formulário sem prazo de resposta: cinco sinais de um site que não leva à conversa. O diagnóstico gratuito de 45 minutos mostra o que mudar primeiro.",
  "#Sites #WhatsAppBusiness #PequenosNegócios"),
 "dor-formulario": ("Para onde vai o contato que chega pelo site",
  "Para onde vai o contato que chega pelo seu site? Cinco sinais para conferir no seu negócio.\n\nO caminho do formulário até uma pessoa precisa estar desenhado. No Site Conectado, o contato chega ao sistema com a origem anotada e aviso quando a integração falha. A partir de R$ 9.900.",
  "#sitesprofissionais #atendimentoaocliente #pequenosnegocios #negociolocal #v2o5",
  "Para onde vai o contato que chega pelo seu site?\n\nO formulário que envia para um e-mail que ninguém olha, a falta de dono para o contato e a pergunta repetida ao cliente são sinais de que o caminho até uma pessoa não está desenhado. No Site Conectado, o contato chega ao sistema com a origem anotada.",
  "#Sites #Atendimento #PequenosNegócios"),
 "dor-google": ("O que o cliente encontra no Google",
  "O seu cliente procura o seu negócio no Google. O que ele encontra? Cinco sinais para conferir.\n\nHorário errado, telefone antigo, fotos velhas, perfil sem verificação e nenhum botão de WhatsApp. A Presença Digital Local organiza o perfil, uma rede e o WhatsApp Business, com o pedido de avaliação, a partir de R$ 790.",
  "#googlemeunegocio #negociolocal #pequenosnegocios #comerciolocal #v2o5",
  "O seu cliente procura o seu negócio no Google. O que ele encontra?\n\nHorário errado, telefone ou endereço desatualizados, fotos antigas, perfil nunca verificado e nenhum botão de WhatsApp: cinco sinais de presença local a corrigir. A Presença Digital Local começa a partir de R$ 790, com o valor fechado em proposta.",
  "#PresençaDigital #NegóciosLocais #PequenosNegócios"),
 "dor-perfil-parado": ("Perfil parado",
  "Perfil parado: o cliente acha que o seu negócio fechou? Cinco sinais para conferir.\n\nUm perfil organizado e atualizado é o primeiro passo para o cliente chamar. No pacote Estruturada da Presença Digital Local: até duas redes, oito modelos de posts e stories, calendário de três meses e uma campanha de lançamento. R$ 1.490.",
  "#redessociais #negociolocal #pequenosnegocios #comerciolocal #v2o5",
  "Perfil parado: o cliente acha que o negócio fechou?\n\nA última publicação com meses, perfil e site que dizem coisas diferentes, ninguém responsável pelas redes: sinais de presença sem rotina. O pacote Estruturada (R$ 1.490) traz até duas redes, oito modelos, calendário de três meses e uma campanha de lançamento.",
  "#RedesSociais #PresençaDigital #PequenosNegócios"),
 "dor-recompra": ("Cliente que não volta",
  "Quem comprou em março voltou a comprar? Cinco sinais para conferir no seu negócio.\n\nCliente que ninguém chama compra de outro. No Atendimento Integrado, o contato de volta com quem já comprou, só para quem consentiu e dentro das regras do WhatsApp. A partir de R$ 6.900.",
  "#fidelizacao #atendimentoaocliente #whatsappbusiness #pequenosnegocios #v2o5",
  "Quem comprou em março voltou a comprar?\n\nSem lista de quem já comprou, sem saber quando o cliente costuma voltar e com o contato perdido no WhatsApp, o cliente satisfeito compra do concorrente que lembrou dele. O contato de volta só vale para quem consentiu e dentro das regras do WhatsApp. O diagnóstico gratuito de 45 minutos mostra por onde começar.",
  "#Fidelização #WhatsAppBusiness #PequenosNegócios"),
 "dor-avaliacoes": ("Avaliações no Google",
  "Quantas avaliações você pediu este mês? Cinco sinais para conferir no seu negócio.\n\nCliente satisfeito quase nunca avalia sozinho. Na Presença Essencial, o pedido de avaliação vem pronto: link direto e mensagem para mandar a quem comprou. A partir de R$ 790.",
  "#googlemeunegocio #avaliacoes #negociolocal #pequenosnegocios #v2o5",
  "Quantas avaliações você pediu este mês?\n\nNunca pedir avaliação a quem comprou, não ter o link direto, avaliações antigas, avaliação ruim sem resposta e não saber a própria nota: cinco sinais de que o Google não mostra o que o cliente acha do seu negócio. A Presença Essencial traz o pedido de avaliação pronto.",
  "#Avaliações #NegóciosLocais #PequenosNegócios"),
}

# ---------------------------------------------------------------- calendário (26/11/2026)
# Dyones, 26/11: "ajuste a data para começarmos amanhã, o horário do primeiro sendo às 09h em ponto";
# "vou soltar os 3 fixos hoje"; "a agenda não programou os posts do linkedin que já haviam sido
# desenvolvidos, preciso da agenda completa, com os materiais que já atualizamos", e, sobre os PDFs do
# LinkedIn, "são estes": atendimento-por-dentro, diagnostico-diferencial, dor-avaliacoes, dor-formulario e
# dor-google. A agenda cobre todo o material de 25/11: os 3 fixos (26/11), os 25 reels e os 12 carrosséis.
PROMESSA = "Descubra onde seu negócio perde cliente. Gratuitamente."
DIA_FIXOS = datetime.date(2026, 11, 26)
NOMES = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]
nome = lambda d: NOMES[d.weekday()]
D = lambda dia, mes: datetime.date(2026, mes, dia)

# Instagram, dia a dia: (hora, código). Código "L1-.." é reel; o resto é carrossel. O primeiro de cada dia às 09:00.
# Bloco 1 (27/11 a 01/12): 3 reels e 2 carrosséis por dia. Bloco 2 (02/12 a 06/12): os 10 reels e os 2 carrosséis restantes.
INSTAGRAM = {
    D(27, 11): [("09:00", "L1-01"), ("11:30", "diagnostico-diferencial"), ("14:00", "L1-21"), ("17:30", "presenca-por-dentro"), ("20:00", "L1-17")],
    D(28, 11): [("09:00", "L1-11"), ("11:30", "sites-por-dentro"), ("14:00", "L1-08"), ("17:30", "dor-lead-esfria"), ("20:00", "L1-07")],
    D(29, 11): [("09:00", "L1-22"), ("11:30", "atendimento-por-dentro"), ("14:00", "L1-02"), ("17:30", "dor-site-sem-whatsapp"), ("20:00", "L1-13")],
    D(30, 11): [("09:00", "L1-10"), ("11:30", "dor-formulario"), ("14:00", "L1-14"), ("17:30", "dor-sistemas-separados"), ("20:00", "L1-20")],
    D(1, 12): [("09:00", "L1-09"), ("11:30", "dor-google"), ("14:00", "L1-12"), ("17:30", "dor-avaliacoes"), ("20:00", "L1-23")],
    D(2, 12): [("09:00", "L1-18"), ("11:30", "dor-recompra"), ("20:00", "L1-16")],
    D(3, 12): [("09:00", "L1-03"), ("20:00", "L1-19")],
    D(4, 12): [("09:00", "L1-06"), ("11:30", "dor-perfil-parado"), ("20:00", "L1-15")],
    D(5, 12): [("09:00", "L1-04"), ("20:00", "L1-05")],
    D(6, 12): [("09:00", "L1-24"), ("20:00", "L1-25")],
}
# Facebook: o reel das 09:00 e o carrossel das 11:30 de cada dia (os fixos, no dia deles)
FACEBOOK_HORAS = {"09:00", "11:30"}
# LinkedIn, só em dia útil, um documento por dia às 10:00 (os fixos e os 5 PDFs que o Dyones indicou) e dois reels às 12:00
LINKEDIN = {
    D(27, 11): [("10:00", "fixo-3")],
    D(30, 11): [("10:00", "atendimento-por-dentro"), ("12:00", "L1-13")],
    D(1, 12): [("10:00", "fixo-2"), ("12:00", "L1-20")],
    D(2, 12): [("10:00", "diagnostico-diferencial")],
    D(3, 12): [("10:00", "dor-google")],
    D(4, 12): [("10:00", "dor-avaliacoes")],
    D(7, 12): [("10:00", "dor-formulario")],
}
DIAS = sorted(set(INSTAGRAM) | set(LINKEDIN))

# os três fixos: textos de docs/social/posts-fixos.md (fonte única), arquivos com o nome do pacote dos fixos
FIXOS_MD = open(os.path.join(raiz, "docs/social/posts-fixos.md"), encoding="utf-8").read()
FIXOS = {
    "fixo-1": ("Fixo 1: O que fazemos", "fixo-1-o-que-fazemos", "1º", "V2O5: o que fazemos"),
    "fixo-2": ("Fixo 2: Como trabalhamos", "fixo-2-como-trabalhamos", "2º", "V2O5: como trabalhamos"),
    "fixo-3": ("Fixo 3: Case Motors Store", "fixo-3-case-motors", "3º", "V2O5: case Motors Store"),
}

def secao_fixo(titulo):
    i = FIXOS_MD.index(f"## {titulo}")
    j = FIXOS_MD.find("\n## ", i + 1)
    return FIXOS_MD[i:j if j > 0 else None]

def bloco(sec, rotulo):
    k = sec.index(rotulo)
    a = sec.index("```\n", k) + 4
    return sec[a:sec.index("\n```", a)]

def comentario_fixo(sec):
    return re.search(r"Primeiro comentário: `([^`]+)`", sec).group(1)

LINKEDIN_REELS = {
    "L1-13": ("Muito site recebe o pedido e deixa ele parado numa caixa de entrada. O cliente esperou, ninguém respondeu e ele procurou outro. O caminho do formulário até uma pessoa precisa estar desenhado. É um dos pontos que olhamos no diagnóstico gratuito de 45 minutos.", "#Atendimento #Sites #PequenosNegócios"),
    "L1-20": ("Cada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. No Atendimento Integrado, o contato que chega pelo WhatsApp vai direto para o sistema que você já usa.", "#Integração #WhatsAppBusiness #PequenosNegócios"),
}

def link(src, med, cont, dest=BASE, campanha="semana-1"):
    return f"{dest}?utm_source={src}&utm_medium={med}&utm_campaign={campanha}&utm_content={cont}"

BIO_FIXOS = f"{BASE}?utm_source=instagram&utm_medium=bio&utm_campaign=posts-fixos&utm_content=fixos"
DIAS_IG = sorted(INSTAGRAM)

def bio(d):
    return f"{BASE}?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D{DIAS_IG.index(d) + 1}"

def fonte_da_nota(c):
    n = v2[c]["hook"].get("nota")
    return f"\nFonte do número: {n.replace(' · ', ', de ')}." if n and n != "Cena de exemplo" else ""

def legenda_facebook_reel(c):
    return f"{abertura_v2(c)}{fonte_da_nota(c)}\n\n{PROMESSA}: {link('facebook', 'reel', c)}"

def texto_linkedin_doc(li):
    return li if "primeiro comentário" in li.lower() else f"{li}\n\nLink no primeiro comentário."

linhas = []
def add(d, hora, rede, tipo, codigo, arquivos, capa="", legenda="", comentario=""):
    linhas.append(dict(data=d.isoformat(), dia=nome(d), hora=hora, rede=rede, tipo=tipo, codigo=codigo, arquivos=arquivos, capa=capa, legenda=legenda, comentario=comentario))

md = ["# Agenda completa de 26/11 a 07/12/2026: fixos, 25 reels e 12 carrosséis\n"]
md.append("Gerada por `social/carrosseis/agenda-semana1.py` (não edite à mão). Horários de Brasília. Cobre todo o material atualizado em 25/11: os 3 fixos (hoje, 26/11), os 25 reels e os 12 carrosséis. De 27/11 a 01/12 saem 3 reels e 2 carrosséis por dia; de 02/12 a 06/12, os 10 reels e os 2 carrosséis restantes. O primeiro post de cada dia é sempre às 09:00 em ponto.\n")
md.append("""## Como ler

- **Instagram:** todos os posts. A legenda termina com "Link na bio." e até 5 hashtags. Troque o link da bio antes do primeiro post de cada dia (o endereço está no começo do dia).
- **Facebook:** os três fixos e, em cada dia, o reel das 09:00 e o carrossel das 11:30 (quando houver). A legenda tem o link clicável no fim, porque lá não existe link na bio. O carrossel vai como publicação com várias fotos, na ordem 01 a 07 (no feed aparece em mosaico; quem clica vê cada slide inteiro).
- **LinkedIn:** só em dia útil, um documento por dia às 10:00: os três fixos e os cinco PDFs `atendimento-por-dentro`, `diagnostico-diferencial`, `dor-google`, `dor-avaliacoes` e `dor-formulario`; mais os reels L1-13 e L1-20 às 12:00. O link vai no primeiro comentário, logo depois de publicar.
- **"Cena de exemplo."** na legenda de um reel avisa que horários, números ou conversas do vídeo são ilustrativos. Não tire.
- **Arquivos:** fixos em `V2O5-fixos-26-11.zip` (pastas `instagram/`, `facebook/`, `linkedin/`); carrosséis em `carrosseis-semana-1.zip` (mesmas pastas); reels em `reels-lote-1-v3-com-musica.zip` (`L1-XX-v3.mp4` e `capas/L1-XX-v3.jpg`). Não publique arquivos de pacotes anteriores (`-v2`, fixos de 18/11 ou de 25/11).
""")
md.append("## Resumo\n\n| Dia | Instagram | Facebook | LinkedIn |\n|---|---|---|---|")
for d in [DIA_FIXOS] + DIAS:
    if d == DIA_FIXOS:
        md.append(f"| {nome(d)[:3]} {d.strftime('%d/%m')} | 3 fixos | 3 fixos | fixo 1 |")
        continue
    ig = INSTAGRAM.get(d, [])
    nr = sum(1 for _, c in ig if c.startswith("L1-")); nc = len(ig) - nr
    fb = [c for h, c in ig if h in FACEBOOK_HORAS]
    li = ", ".join(c for _, c in LINKEDIN.get(d, [])) or "-"
    igt = f"{nr} reels" + (f" e {nc} carrosséis" if nc > 1 else " e 1 carrossel" if nc == 1 else "") if ig else "-"
    md.append(f"| {nome(d)[:3]} {d.strftime('%d/%m')} | {igt} | {', '.join(fb) or '-'} | {li} |")
md.append("")

# ---- hoje: os fixos
md.append(f"## {nome(DIA_FIXOS).capitalize()} {DIA_FIXOS.strftime('%d/%m')} (hoje): os três fixos\n")
md.append(f"Publique na ordem fixo 1, fixo 2 e fixo 3, de preferência com algumas horas entre um e outro. Link da bio do dia (trocar antes do primeiro): `{BIO_FIXOS}`\n")
for chave in ["fixo-1", "fixo-2", "fixo-3"]:
    titulo, arq, ordem, titulo_doc = FIXOS[chave]
    sec = secao_fixo(titulo)
    ig, fb, li = bloco(sec, "**Instagram (legenda)**"), bloco(sec, "**Facebook (legenda)**"), bloco(sec, "**LinkedIn")
    com = comentario_fixo(sec)
    md.append(f"### {ordem} post · {titulo}\nArquivos: `instagram/{arq}-01.png` a `-07.png` · `facebook/{arq}-01.png` a `-07.png` · `linkedin/{arq}.pdf`\n")
    md.append(f"**Instagram** (carrossel)\n```\n{ig}\n```\n")
    md.append(f"**Facebook** (várias fotos)\n```\n{fb}\n```\n")
    add(DIA_FIXOS, ordem, "Instagram", "carrossel fixo", arq, f"instagram/{arq}-01.png a -07.png", f"instagram/{arq}-01.png", ig)
    add(DIA_FIXOS, ordem, "Facebook", "carrossel fixo (várias fotos)", arq, f"facebook/{arq}-01.png a -07.png", f"facebook/{arq}-01.png", fb)
    if chave == "fixo-1":
        md.append(f"**LinkedIn** (documento `linkedin/{arq}.pdf`, junto com o Instagram; título do documento: \"{titulo_doc}\")\n```\n{li}\n```\nPrimeiro comentário: `{com}`\n")
        add(DIA_FIXOS, ordem, "LinkedIn", "carrossel fixo (PDF)", arq, f"linkedin/{arq}.pdf", legenda=li, comentario=com)
    else:
        quando = next(f"{nome(d)} {d.strftime('%d/%m')}, {h}" for d, its in LINKEDIN.items() for h, c in its if c == chave)
        md.append(f"**LinkedIn:** sai na {quando} (texto no dia).\n")
md.append("**Depois do terceiro:** fixe os três no Instagram, na ordem fixo 3, fixo 2 e fixo 1, e confira a grade (se a ordem sair invertida, desafixe e fixe de novo). No Facebook, fixe o fixo 1 no topo da página.\n")

# ---- os outros dias
for d in DIAS:
    md.append(f"## {nome(d).capitalize()} {d.strftime('%d/%m')}\n")
    if d in INSTAGRAM:
        md.append(f"Link da bio do dia (trocar antes das 09:00): `{bio(d)}`\n")
    itens = []
    for h, c in INSTAGRAM.get(d, []):
        if c.startswith("L1-"):
            ig = legenda_reel(c)
            t = f"### {h} · Reel {c}\nArquivo `{c}-v3.mp4` · Capa `capas/{c}-v3.jpg`\n\n**Instagram** (reel)\n```\n{ig}\n```\n"
            add(d, h, "Instagram", "reel", c, f"{c}-v3.mp4", f"capas/{c}-v3.jpg", ig)
            if h in FACEBOOK_HORAS:
                fb = legenda_facebook_reel(c)
                t += f"**Facebook** (reel, {h})\n```\n{fb}\n```\n"
                add(d, h, "Facebook", "reel", c, f"{c}-v3.mp4", f"capas/{c}-v3.jpg", fb)
        else:
            titulo, texto, tags, li, litags = C[c]
            salvar = "Salve este carrossel para conferir com a equipe e envie para quem cuida disso.\n\n" if c.startswith("dor-") else ""
            ig = f"{texto}\n\n{salvar}{CTA_IG}\n\n{tags}"
            t = f"### {h} · Carrossel: {titulo}\nArquivos `instagram/{c}-01.png` a `-07.png`\n\n**Instagram** (carrossel)\n```\n{ig}\n```\n"
            add(d, h, "Instagram", "carrossel", c, f"instagram/{c}-01.png a -07.png", f"instagram/{c}-01.png", ig)
            if h in FACEBOOK_HORAS:
                fb = f"{texto}\n\n{PROMESSA}: {link('facebook', 'post', c)}"
                t += f"**Facebook** (várias fotos, {h}; arquivos `facebook/{c}-01.png` a `-07.png`)\n```\n{fb}\n```\n"
                add(d, h, "Facebook", "carrossel (várias fotos)", c, f"facebook/{c}-01.png a -07.png", f"facebook/{c}-01.png", fb)
        itens.append((h, t))
    for h, c in LINKEDIN.get(d, []):
        if c in FIXOS:
            titulo, arq, _, titulo_doc = FIXOS[c]
            sec = secao_fixo(titulo)
            li, com = bloco(sec, "**LinkedIn"), comentario_fixo(sec)
            t = f"### {h} · LinkedIn: {titulo}\nDocumento `linkedin/{arq}.pdf` (do pacote dos fixos; título do documento: \"{titulo_doc}\")\n\n```\n{li}\n```\nPrimeiro comentário: `{com}`\n"
            add(d, h, "LinkedIn", "carrossel fixo (PDF)", arq, f"linkedin/{arq}.pdf", legenda=li, comentario=com)
        elif c.startswith("L1-"):
            corpo, tags_li = LINKEDIN_REELS[c]
            leg = f"{abertura_v2(c)}\n\n{corpo}\n\nLink do diagnóstico gratuito no primeiro comentário.\n\n{tags_li}"
            com = link("linkedin", "reel", c)
            t = f"### {h} · LinkedIn: Reel {c}\nArquivo `{c}-v3.mp4` (vertical, o mesmo do Instagram)\n\n```\n{leg}\n```\nPrimeiro comentário: `{com}`\n"
            add(d, h, "LinkedIn", "reel", c, f"{c}-v3.mp4", f"capas/{c}-v3.jpg", leg, com)
        else:
            titulo, texto, tags, li, litags = C[c]
            leg = f"{texto_linkedin_doc(li)}\n\n{litags}"
            com = link("linkedin", "post", c)
            t = f"### {h} · LinkedIn: {titulo}\nDocumento `linkedin/{c}.pdf` (do pacote dos carrosséis; título do documento: \"V2O5: {titulo.lower()}\")\n\n```\n{leg}\n```\nPrimeiro comentário: `{com}`\n"
            add(d, h, "LinkedIn", "carrossel (PDF)", c, f"linkedin/{c}.pdf", legenda=leg, comentario=com)
        itens.append((h, t))
    for _, t in sorted(itens, key=lambda x: x[0]):
        md.append(t)

linhas.sort(key=lambda l: (l["data"], l["hora"]))
campos = ["data", "dia", "hora", "rede", "tipo", "codigo", "arquivos", "capa", "legenda", "comentario"]
with open(os.path.join(raiz, "docs/reels/semana-1-agenda.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=campos)
    w.writeheader()
    for l in linhas:
        w.writerow({c: l.get(c, "") for c in campos})
open(os.path.join(raiz, "docs/reels/semana-1-agenda.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
from collections import Counter
print(len(linhas), "posts", dict(Counter(l["rede"] for l in linhas)))
reels = {l["codigo"] for l in linhas if l["codigo"].startswith("L1-")}
carr = {l["codigo"] for l in linhas if l["rede"] == "Instagram" and l["tipo"] == "carrossel"}
print("reels:", len(reels), "| carrosséis no Instagram:", len(carr), "| sem data:", sorted(set(C) - carr))
