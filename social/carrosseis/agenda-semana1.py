#!/usr/bin/env python3
"""Gera a agenda da semana 1 (01/12 a 05/12/2026): 3 reels e 2 carrosséis por dia, com as legendas das três redes.
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
        return abertura_v2(c) + ("\n\n" + resto[1] if len(resto) > 1 else "")
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

dias = [datetime.date(2026, 12, 1) + datetime.timedelta(d) for d in range(5)]
nomes = ["terça", "quarta", "quinta", "sexta", "sábado"]
# por dia: reel 08:30, carrossel 11:30, reel 14:00, carrossel 17:30, reel 20:00
plano = [  # 25/11: o sábado de Presença ganha os reels novos do Google (L1-09) e das avaliações (L1-12)
 ("L1-01", "diagnostico-diferencial", "L1-21", "presenca-por-dentro", "L1-17"),
 ("L1-11", "sites-por-dentro", "L1-08", "dor-lead-esfria", "L1-07"),
 ("L1-22", "atendimento-por-dentro", "L1-02", "dor-site-sem-whatsapp", "L1-13"),
 ("L1-10", "dor-formulario", "L1-14", "dor-sistemas-separados", "L1-20"),
 ("L1-09", "dor-google", "L1-12", "dor-avaliacoes", "L1-23"),
]
horas = ["08:30", "11:30", "14:00", "17:30", "20:00"]
linkedin = {0: "diagnostico-diferencial", 1: "sites-por-dentro", 2: "atendimento-por-dentro"}

# reels no LinkedIn (vídeo vertical, sem link na bio: o endereço vai no primeiro comentário)
linkedin_reels = {
    1: ("L1-13", "Muito site recebe o pedido e deixa ele parado numa caixa de entrada. O cliente esperou, ninguém respondeu e ele procurou outro. O caminho do formulário até uma pessoa precisa estar desenhado. É um dos pontos que olhamos no diagnóstico gratuito de 45 minutos.", "#Atendimento #Sites #PequenosNegócios"),
    2: ("L1-20", "Cada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. No Atendimento Integrado, o contato que chega pelo WhatsApp vai direto para o sistema que você já usa.", "#Integração #WhatsAppBusiness #PequenosNegócios"),
}

def link(src, med, cont, dest=BASE):
    return f"{dest}?utm_source={src}&utm_medium={med}&utm_campaign=semana-1&utm_content={cont}"

linhas = []
md = ["# Semana 1: 3 reels e 2 carrosséis por dia (terça 01/12 a sábado 05/12/2026)\n"]
md.append("Horários de Brasília. Cada dia alterna reel, carrossel, reel, carrossel, reel. Dos 25 reels prontos, 15 entram nesta semana; os outros 10 (L1-03, 04, 05, 06, 15, 16, 18, 19, 24 e 25) seguem para a semana de 08/12. Versão de 25/11 (foco em pequenos negócios; promessa \"Descubra onde seu negócio perde cliente. Gratuitamente.\"): reels em `L1-XX-v3.mp4` com capa `capas/L1-XX-v3.jpg`; os arquivos `-v2` anteriores não devem ser publicados; carrosséis no zip `carrosseis-semana-1.zip`, em três pastas, porque a chamada muda por rede: `instagram/<nome>-01.png` a `-07.png` (chamada \"link na bio\"), `facebook/<nome>-01.png` a `-07.png` (\"link na legenda\") e `linkedin/<nome>.pdf` (documento, com o endereço na chamada e \"link no primeiro comentário\"). O link da bio muda por dia (`utm_content=L1-D1` a `L1-D5`, em `lote-1-agenda.md`).\n")
md.append("Facebook: o primeiro reel (08:30) e o primeiro carrossel (11:30) de cada dia, como reel e como álbum. LinkedIn: um carrossel em PDF por dia de terça a quinta, às 10:00, e dois reels (L1-13 na quarta e L1-20 na quinta, às 12:00), com o link no primeiro comentário.\n")
for k, d in enumerate(dias):
    md.append(f"## {nomes[k].capitalize()} {d.strftime('%d/%m')}\n")
    for i, item in enumerate(plano[k]):
        h = horas[i]
        if i % 2 == 0:
            c = item
            md.append(f"### {h} · Reel {c}{' (também no Facebook)' if i == 0 else ''}\nArquivo `{c}-v3.mp4` · Capa `capas/{c}-v3.jpg`\n\n```\n{legenda_reel(c)}\n```\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora=h, rede="Instagram" + (" + Facebook" if i == 0 else ""), tipo="reel", codigo=c, arquivos=f"{c}-v3.mp4", capa=f"capas/{c}-v3.jpg", legenda=legenda_reel(c)))
        else:
            n = item
            t, texto, tags, li, litags = C[n]
            salvar = "Salve este carrossel para conferir com a equipe e envie para quem cuida disso.\n\n" if n.startswith("dor-") else ""
            ig = f"{texto}\n\n{salvar}{CTA_IG}\n\n{tags}"
            fb = f"{texto}\n\nDescubra onde seu negócio perde cliente. Gratuitamente: {link('facebook', 'post', n)}"
            md.append(f"### {h} · Carrossel: {t}\nArquivos `{n}-01.png` a `{n}-07.png` · Instagram\n\n```\n{ig}\n```\n")
            if i == 1:
                md.append(f"Facebook (álbum, às {h}; arquivos `facebook/{n}-01.png` a `-07.png`):\n```\n{fb}\n```\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora=h, rede="Instagram" + (" + Facebook" if i == 1 else ""), tipo="carrossel", codigo=n, arquivos=f"{n}-01.png a {n}-07.png", capa=f"{n}-01.png", legenda=ig))
            if i == 1:
                linhas[-1]["legenda_facebook"] = fb
        if i == 1 and k in linkedin:
            n = linkedin[k]
            t, texto, tags, li, litags = C[n]
            md.append(f"### 10:00 · LinkedIn: {t}\nDocumento `linkedin/{n}.pdf` (título do documento: \"V2O5: {t.lower()}\")\n\n```\n{li}\n\n{litags}\n```\nPrimeiro comentário: `{link('linkedin', 'post', n)}`\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora="10:00", rede="LinkedIn", tipo="carrossel (PDF)", codigo=n, arquivos=f"linkedin/{n}.pdf", capa="", legenda=f"{li}\n\n{litags}", legenda_facebook="", comentario=link('linkedin', 'post', n)))
        if i == 1 and k in linkedin_reels:
            c, corpo, tags_li = linkedin_reels[k]
            leg = f"{abertura_v2(c)}\n\n{corpo}\n\nLink do diagnóstico gratuito no primeiro comentário.\n\n{tags_li}"
            md.append(f"### 12:00 · LinkedIn: Reel {c}\nArquivo `{c}-v3.mp4` (vertical, o mesmo do Instagram) · Capa `capas/{c}-v3.jpg`\n\n```\n{leg}\n```\nPrimeiro comentário: `{link('linkedin', 'reel', c)}`\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora="12:00", rede="LinkedIn", tipo="reel", codigo=c, arquivos=f"{c}-v3.mp4", capa=f"capas/{c}-v3.jpg", legenda=leg, legenda_facebook="", comentario=link('linkedin', 'reel', c)))
campos = ["data", "dia", "hora", "rede", "tipo", "codigo", "arquivos", "capa", "legenda", "legenda_facebook", "comentario"]
with open(os.path.join(raiz, "docs/reels/semana-1-agenda.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=campos)
    w.writeheader()
    for l in linhas:
        w.writerow({c: l.get(c, "") for c in campos})
open(os.path.join(raiz, "docs/reels/semana-1-agenda.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print(len(linhas), "linhas")
