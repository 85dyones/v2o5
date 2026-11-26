#!/usr/bin/env python3
"""Gera a agenda de 27/11 a 02/12/2026: os três fixos na sexta 27/11 e a semana 1 (3 reels e 2 carrosséis por dia), com a legenda de cada rede.
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
# à pergunta sobre os fixos, "Fixos no 1º dia"; depois, "vou soltar os 3 fixos hoje". Os três fixos saem na
# quinta 26/11, pelo Dyones; a semana de reels e carrosséis vai de sexta 27/11 a terça 01/12, sempre com o
# primeiro post às 09:00.
PROMESSA = "Descubra onde seu negócio perde cliente. Gratuitamente."
DIA_FIXOS = datetime.date(2026, 11, 26)
dias = [datetime.date(2026, 11, 27) + datetime.timedelta(d) for d in range(5)]
NOMES = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]
nome = lambda d: NOMES[d.weekday()]
plano = [  # por dia: reel 09:00, carrossel 11:30, reel 14:00, carrossel 17:30, reel 20:00
 ("L1-01", "diagnostico-diferencial", "L1-21", "presenca-por-dentro", "L1-17"),
 ("L1-11", "sites-por-dentro", "L1-08", "dor-lead-esfria", "L1-07"),
 ("L1-22", "atendimento-por-dentro", "L1-02", "dor-site-sem-whatsapp", "L1-13"),
 ("L1-10", "dor-formulario", "L1-14", "dor-sistemas-separados", "L1-20"),
 ("L1-09", "dor-google", "L1-12", "dor-avaliacoes", "L1-23"),
]
horas = ["09:00", "11:30", "14:00", "17:30", "20:00"]

# os três fixos: textos de docs/social/posts-fixos.md (fonte única), arquivos com o nome do pacote dos fixos
FIXOS_MD = open(os.path.join(raiz, "docs/social/posts-fixos.md"), encoding="utf-8").read()
FIXOS = [
    ("Fixo 1: O que fazemos", "fixo-1-o-que-fazemos", "1º", "V2O5: o que fazemos"),
    ("Fixo 2: Como trabalhamos", "fixo-2-como-trabalhamos", "2º", "V2O5: como trabalhamos"),
    ("Fixo 3: Case Motors Store", "fixo-3-case-motors", "3º", "V2O5: case Motors Store"),
]

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

# LinkedIn só em dia útil: o fixo 1 junto com os fixos; depois um documento em PDF às 10:00 e, em dois dias, um reel às 12:00
linkedin_docs = {0: "fixo-3", 3: "atendimento-por-dentro", 4: "fixo-2"}  # índice em `dias` (sex 27/11, seg 30/11, ter 01/12)
linkedin_reels = {
    3: ("L1-13", "Muito site recebe o pedido e deixa ele parado numa caixa de entrada. O cliente esperou, ninguém respondeu e ele procurou outro. O caminho do formulário até uma pessoa precisa estar desenhado. É um dos pontos que olhamos no diagnóstico gratuito de 45 minutos.", "#Atendimento #Sites #PequenosNegócios"),
    4: ("L1-20", "Cada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. No Atendimento Integrado, o contato que chega pelo WhatsApp vai direto para o sistema que você já usa.", "#Integração #WhatsAppBusiness #PequenosNegócios"),
}

def link(src, med, cont, dest=BASE, campanha="semana-1"):
    return f"{dest}?utm_source={src}&utm_medium={med}&utm_campaign={campanha}&utm_content={cont}"

def bio(dia_k):
    return f"{BASE}?utm_source=instagram&utm_medium=reel-bio&utm_campaign=100-reels&utm_content=L1-D{dia_k + 1}"

BIO_FIXOS = f"{BASE}?utm_source=instagram&utm_medium=bio&utm_campaign=posts-fixos&utm_content=fixos"

def fonte_da_nota(c):
    n = v2[c]["hook"].get("nota")
    return f"\nFonte do número: {n.replace(' · ', ', de ')}." if n and n != "Cena de exemplo" else ""

def legenda_facebook_reel(c):
    return f"{abertura_v2(c)}{fonte_da_nota(c)}\n\n{PROMESSA}: {link('facebook', 'reel', c)}"

linhas = []
md = ["# Agenda de 26/11 a 01/12/2026: os fixos e a semana 1 (3 reels e 2 carrosséis por dia)\n"]
md.append("Gerada por `social/carrosseis/agenda-semana1.py` (não edite à mão). Horários de Brasília. Decisão de 26/11: os três fixos saem hoje, quinta 26/11; de sexta 27/11 a terça 01/12, 3 reels e 2 carrosséis por dia, com o primeiro post sempre às 09:00 em ponto.\n")
md.append("""## Como ler

- **Instagram:** todos os posts. A legenda termina com "Link na bio." e até 5 hashtags. Troque o link da bio antes do primeiro post de cada dia (o endereço está no começo do dia).
- **Facebook:** os três fixos (hoje) e, em cada dia da semana, o reel das 09:00 e o carrossel das 11:30. A legenda do Facebook tem o link clicável no fim, porque lá não existe link na bio. O carrossel vai como publicação com várias fotos, na ordem 01 a 07 (no feed aparece em mosaico; quem clica vê cada slide inteiro).
- **LinkedIn:** só em dia útil. Os carrosséis vão como documento em PDF e os reels como vídeo; o link vai no primeiro comentário, logo depois de publicar.
- **"Cena de exemplo."** na legenda de um reel avisa que horários, números ou conversas do vídeo são ilustrativos. Não tire.
- **Arquivos:** fixos no pacote `V2O5-fixos-25-11.zip` (pastas `instagram/`, `facebook/`, `linkedin/`); carrosséis da semana em `carrosseis-semana-1.zip` (mesmas pastas); reels em `reels-lote-1-v3-com-musica.zip` (`L1-XX-v3.mp4` e `capas/L1-XX-v3.jpg`). Os arquivos `-v2` de 24/11 não devem ser publicados.
- **Ficam para a semana seguinte (a partir de 07/12):** os reels L1-03, 04, 05, 06, 15, 16, 18, 19, 24 e 25; os carrosséis `dor-perfil-parado` e `dor-recompra`; no LinkedIn, os documentos `diagnostico-diferencial` e `sites-por-dentro`.
""")

# ---- sexta 27/11: os fixos
md.append(f"## {nome(DIA_FIXOS).capitalize()} {DIA_FIXOS.strftime('%d/%m')} (hoje): os três fixos\n")
md.append(f"Publique na ordem fixo 1, fixo 2 e fixo 3, de preferência com algumas horas entre um e outro. Link da bio do dia (trocar antes do primeiro): `{BIO_FIXOS}`\n")
for titulo, arq, h, titulo_doc in FIXOS:
    sec = secao_fixo(titulo)
    ig, fb, li = bloco(sec, "**Instagram (legenda)**"), bloco(sec, "**Facebook (legenda)**"), bloco(sec, "**LinkedIn")
    com = comentario_fixo(sec)
    md.append(f"### {h} post · {titulo}\nArquivos: `instagram/{arq}-01.png` a `-07.png` · `facebook/{arq}-01.png` a `-07.png` · `linkedin/{arq}.pdf`\n")
    md.append(f"**Instagram** (carrossel)\n```\n{ig}\n```\n")
    md.append(f"**Facebook** (várias fotos)\n```\n{fb}\n```\n")
    if arq.startswith("fixo-1"):
        md.append(f"**LinkedIn** (documento `linkedin/{arq}.pdf`, junto com o Instagram; título do documento: \"{titulo_doc}\")\n```\n{li}\n```\nPrimeiro comentário: `{com}`\n")
    else:
        quando = "sexta 27/11, 10:00" if arq.startswith("fixo-3") else "terça 01/12, 10:00"
        md.append(f"**LinkedIn:** sai na {quando} (texto no dia).\n")
    d = DIA_FIXOS.isoformat()
    linhas.append(dict(data=d, dia=nome(DIA_FIXOS), hora=h, rede="Instagram", tipo="carrossel fixo", codigo=arq, arquivos=f"instagram/{arq}-01.png a -07.png", capa=f"instagram/{arq}-01.png", legenda=ig))
    linhas.append(dict(data=d, dia=nome(DIA_FIXOS), hora=h, rede="Facebook", tipo="carrossel fixo (várias fotos)", codigo=arq, arquivos=f"facebook/{arq}-01.png a -07.png", capa=f"facebook/{arq}-01.png", legenda=fb))
    if arq.startswith("fixo-1"):
        linhas.append(dict(data=d, dia=nome(DIA_FIXOS), hora=h, rede="LinkedIn", tipo="carrossel fixo (PDF)", codigo=arq, arquivos=f"linkedin/{arq}.pdf", legenda=li, comentario=com))
md.append("**Depois do terceiro:** fixe os três no Instagram, na ordem fixo 3, fixo 2 e fixo 1, e confira a grade (se a ordem sair invertida, desafixe e fixe de novo). No Facebook, fixe o fixo 1 no topo da página.\n")

# ---- sábado 28/11 a quarta 02/12
for k, d in enumerate(dias):
    md.append(f"## {nome(d).capitalize()} {d.strftime('%d/%m')}\n")
    md.append(f"Link da bio do dia (trocar antes das 09:00): `{bio(k)}`\n")
    itens = []  # (hora, texto)
    for i, item in enumerate(plano[k]):
        h = horas[i]
        if i % 2 == 0:
            c = item
            ig = legenda_reel(c)
            t = f"### {h} · Reel {c}\nArquivo `{c}-v3.mp4` · Capa `capas/{c}-v3.jpg`\n\n**Instagram** (reel)\n```\n{ig}\n```\n"
            linhas.append(dict(data=d.isoformat(), dia=nome(d), hora=h, rede="Instagram", tipo="reel", codigo=c, arquivos=f"{c}-v3.mp4", capa=f"capas/{c}-v3.jpg", legenda=ig))
            if i == 0:
                fb = legenda_facebook_reel(c)
                t += f"**Facebook** (reel, {h})\n```\n{fb}\n```\n"
                linhas.append(dict(data=d.isoformat(), dia=nome(d), hora=h, rede="Facebook", tipo="reel", codigo=c, arquivos=f"{c}-v3.mp4", capa=f"capas/{c}-v3.jpg", legenda=fb))
            itens.append((h, t))
        else:
            n = item
            titulo, texto, tags, li, litags = C[n]
            salvar = "Salve este carrossel para conferir com a equipe e envie para quem cuida disso.\n\n" if n.startswith("dor-") else ""
            ig = f"{texto}\n\n{salvar}{CTA_IG}\n\n{tags}"
            t = f"### {h} · Carrossel: {titulo}\nArquivos `instagram/{n}-01.png` a `-07.png`\n\n**Instagram** (carrossel)\n```\n{ig}\n```\n"
            linhas.append(dict(data=d.isoformat(), dia=nome(d), hora=h, rede="Instagram", tipo="carrossel", codigo=n, arquivos=f"instagram/{n}-01.png a -07.png", capa=f"instagram/{n}-01.png", legenda=ig))
            if i == 1:
                fb = f"{texto}\n\n{PROMESSA}: {link('facebook', 'post', n)}"
                t += f"**Facebook** (várias fotos, {h}; arquivos `facebook/{n}-01.png` a `-07.png`)\n```\n{fb}\n```\n"
                linhas.append(dict(data=d.isoformat(), dia=nome(d), hora=h, rede="Facebook", tipo="carrossel (várias fotos)", codigo=n, arquivos=f"facebook/{n}-01.png a -07.png", capa=f"facebook/{n}-01.png", legenda=fb))
            itens.append((h, t))
    if k in linkedin_docs:
        n = linkedin_docs[k]
        if n.startswith("fixo-"):
            titulo, arq, _, titulo_doc = FIXOS[2] if n == "fixo-3" else FIXOS[1]
            sec = secao_fixo(titulo)
            li, com = bloco(sec, "**LinkedIn"), comentario_fixo(sec)
            t = f"### 10:00 · LinkedIn: {titulo}\nDocumento `linkedin/{arq}.pdf` (do pacote dos fixos; título do documento: \"{titulo_doc}\")\n\n```\n{li}\n```\nPrimeiro comentário: `{com}`\n"
            linhas.append(dict(data=d.isoformat(), dia=nome(d), hora="10:00", rede="LinkedIn", tipo="carrossel fixo (PDF)", codigo=arq, arquivos=f"linkedin/{arq}.pdf", legenda=li, comentario=com))
        else:
            titulo, texto, tags, li, litags = C[n]
            com = link("linkedin", "post", n)
            t = f"### 10:00 · LinkedIn: {titulo}\nDocumento `linkedin/{n}.pdf` (título do documento: \"V2O5: {titulo.lower()}\")\n\n```\n{li}\n\n{litags}\n```\nPrimeiro comentário: `{com}`\n"
            linhas.append(dict(data=d.isoformat(), dia=nome(d), hora="10:00", rede="LinkedIn", tipo="carrossel (PDF)", codigo=n, arquivos=f"linkedin/{n}.pdf", legenda=f"{li}\n\n{litags}", comentario=com))
        itens.append(("10:00", t))
    if k in linkedin_reels:
        c, corpo, tags_li = linkedin_reels[k]
        leg = f"{abertura_v2(c)}\n\n{corpo}\n\nLink do diagnóstico gratuito no primeiro comentário.\n\n{tags_li}"
        com = link("linkedin", "reel", c)
        t = f"### 12:00 · LinkedIn: Reel {c}\nArquivo `{c}-v3.mp4` (vertical, o mesmo do Instagram)\n\n```\n{leg}\n```\nPrimeiro comentário: `{com}`\n"
        linhas.append(dict(data=d.isoformat(), dia=nome(d), hora="12:00", rede="LinkedIn", tipo="reel", codigo=c, arquivos=f"{c}-v3.mp4", capa=f"capas/{c}-v3.jpg", legenda=leg, comentario=com))
        itens.append(("12:00", t))
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
