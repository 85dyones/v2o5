#!/usr/bin/env python3
"""Gera a agenda da semana 1 (01/12 a 05/12/2026): 3 reels e 2 carrosséis por dia, com as legendas das três redes.
Saída: docs/reels/semana-1-agenda.md e docs/reels/semana-1-agenda.csv
"""
import csv, datetime, os, re

raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
BASE = "https://www.v2o5.com.br/diagnostico"
CTA_IG = "Descubra onde sua empresa pode funcionar melhor. Gratuitamente.\nLink na bio."

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
  "O diferencial da V2O5: antes de vender a solução, entender o problema.\n\nO diagnóstico gratuito de 45 minutos identifica o gargalo que mais pesa e recomenda por onde começar. Havendo um bom caso, a proposta vem por escrito, com escopo, entregáveis, prazo e investimento. Se não houver, a conversa termina ali.",
  "#v2o5 #diagnosticoempresarial #consultoriaempresarial #pequenasempresas #gestaoempresarial #eficiencia",
  "Antes de vender a solução, a V2O5 entende o problema.\n\nO diagnóstico gratuito de 45 minutos é a nossa porta de entrada: olhamos presença, atendimento, operação e funil com os números da empresa, identificamos o gargalo que mais pesa e recomendamos por onde começar. O diagnóstico não inclui mapeamento completo, implementação nem acompanhamento. Se houver um bom caso, a proposta vem por escrito, com escopo, prazo e investimento. Se não houver, a conversa termina ali.",
  "#Diagnóstico #PequenasEmpresas #Consultoria"),
 "presenca-por-dentro": ("Presença Digital Local, por dentro",
  "Presença Digital Local, por dentro: os três pacotes, o que o Essencial entrega, a mensalidade opcional e o que fica de fora.\n\nPara o cliente que procura a empresa e encontra a informação certa. Preço de referência a partir de R$ 790, com o valor fechado em proposta.",
  "#v2o5 #presencadigital #googlemeunegocio #whatsappbusiness #negocioslocais #pequenasempresas",
  "Presença Digital Local, por dentro.\n\nPerfil no Google, redes e WhatsApp organizados, com modelos de conteúdo e, se quiser, a rotina mensal. São três pacotes (R$ 790, R$ 1.490 e R$ 1.990), com mensalidade opcional e limites de escopo explícitos. Preço de referência; o valor fechado sai em proposta.",
  "#PresençaDigital #NegóciosLocais #PequenasEmpresas"),
 "sites-por-dentro": ("Sites & Integrações, por dentro",
  "Sites & Integrações, por dentro: Landing Page, Site Personalizado e Site Conectado.\n\nSite próprio, rápido e medido, ligado ao CRM, ao estoque ou ao sistema de gestão quando o escopo pede. A partir de R$ 2.900, com o valor fechado em proposta.",
  "#v2o5 #sitesprofissionais #landingpage #integracaodesistemas #crm #pequenasempresas",
  "Sites & Integrações, por dentro.\n\nTrês pacotes: Landing Page (R$ 2.900), Site Personalizado (R$ 5.900) e Site Conectado (a partir de R$ 9.900), este ligado a um sistema que a empresa já usa. Integração só entra na proposta depois de verificar documentação, credenciais, limites e custos do sistema. O site se liga ao que a empresa já usa e não substitui o CRM.",
  "#Sites #Integração #CRM"),
 "sprint-por-dentro": ("Sprint de Eficiência, por dentro",
  "Sprint de Eficiência, por dentro: um gargalo, um projeto fechado, preço em proposta.\n\nTrês níveis, com duração de referência (nunca promessa): Essencial, Integrado e Avançado. A partir de R$ 3.900.",
  "#v2o5 #automacaodeprocessos #produtividade #eficienciaoperacional #crm #pequenasempresas",
  "Sprint de Eficiência, por dentro.\n\nUm gargalo resolvido, com a solução implantada e os indicadores comparados antes e depois. Três níveis: Essencial (R$ 3.900), Integrado (R$ 6.900) e Avançado (a partir de R$ 12.900). A duração é referência, não promessa, e o preço é feito de execução, complexidade e custos diretos, discriminados na proposta. Sem percentual, ROI nem garantia de resultado.",
  "#Eficiência #Automação #Processos"),
 "dor-lead-esfria": ("Lead que esfria no WhatsApp",
  "Lead que esfria no WhatsApp: onde a conversa trava? Cinco sinais para conferir na sua empresa.\n\nMarcou dois ou mais? Vale um diagnóstico. A solução para esse tipo de gargalo é o Sprint de Eficiência, a partir de R$ 3.900.",
  "#v2o5 #atendimentoaocliente #whatsappbusiness #vendas #leads #pequenasempresas",
  "Lead que esfria no WhatsApp: onde a conversa trava?\n\nCinco sinais para conferir: a primeira resposta demora, ninguém sabe quem responde, conversas ficam paradas, o contato some sem retomada e a origem do cliente é desconhecida. Quem reconhece dois ou mais costuma ter um gargalo claro no atendimento. O diagnóstico gratuito de 45 minutos começa por aí.",
  "#Atendimento #WhatsAppBusiness #Vendas"),
 "dor-sistemas-separados": ("Sistemas que não conversam",
  "Sistemas que não conversam: onde você digita duas vezes? Cinco sinais para conferir na sua empresa.\n\nCada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. Integrar o sistema que você já usa com o site e o WhatsApp tira esse trabalho. Sprint de Eficiência, a partir de R$ 3.900.",
  "#v2o5 #automacao #integracaodesistemas #processos #produtividade #pme",
  "Sistemas que não conversam: onde você digita duas vezes?\n\nCinco sinais: o mesmo dado em dois lugares, planilha e sistema com números diferentes, site, WhatsApp e CRM sem troca de informação, processo guardado na cabeça de uma pessoa e processo que para quando ela falta. O diagnóstico gratuito de 45 minutos identifica o gargalo que mais pesa e recomenda por onde começar.",
  "#Integração #Processos #Automação"),
 "dor-site-sem-medicao": ("O site está no ar, mas ninguém sabe quem entrou",
  "O seu site está no ar. Você sabe quem entrou nele? Cinco sinais de site sem medição.\n\nSite sem medição é uma vitrine sem câmera: sem esse dado, decidir onde investir vira palpite. Sites & Integrações, a partir de R$ 2.900, com o rastreamento de onde veio cada contato.",
  "#v2o5 #marketingdigital #analytics #rastreamento #sitesprofissionais #pequenasempresas",
  "O seu site está no ar. Você sabe quem entrou nele?\n\nSite sem medição não mostra quem passou nem o que olhou, e sem esse dado decidir onde investir vira palpite. Cinco sinais para conferir na sua empresa, e o caminho: um site próprio, rápido e medido, com o rastreamento de onde veio cada contato.",
  "#Rastreamento #MarketingDigital #Sites"),
 "dor-formulario": ("Para onde vai o contato que chega pelo site",
  "Para onde vai o contato que chega pelo seu site? Cinco sinais para conferir na sua empresa.\n\nO caminho do formulário até uma pessoa precisa estar desenhado. No Site Conectado, os contatos são medidos até o sistema, com a origem gravada e aviso quando a integração falha. A partir de R$ 9.900.",
  "#v2o5 #leads #sitesprofissionais #atendimentoaocliente #crm #vendas",
  "Para onde vai o contato que chega pelo seu site?\n\nO formulário que envia para um e-mail que ninguém olha, a falta de dono para o contato e a pergunta repetida ao cliente são sinais de que o caminho até uma pessoa não está desenhado. No Site Conectado, os contatos são medidos até o sistema, com a origem gravada.",
  "#Leads #Sites #CRM"),
 "dor-google": ("O que o cliente encontra no Google",
  "O seu cliente procura a empresa no Google. O que ele encontra? Cinco sinais para conferir.\n\nHorário errado, telefone antigo, fotos velhas, perfil sem verificação e nenhum botão de WhatsApp. A Presença Digital Local organiza o perfil, uma rede e o WhatsApp Business, a partir de R$ 790.",
  "#v2o5 #googlemeunegocio #presencadigital #seolocal #negocioslocais #pequenasempresas",
  "O seu cliente procura a empresa no Google. O que ele encontra?\n\nHorário errado, telefone ou endereço desatualizados, fotos antigas, perfil nunca verificado e nenhum botão de WhatsApp: cinco sinais de presença digital local a corrigir. A Presença Digital Local começa a partir de R$ 790, com o valor fechado em proposta.",
  "#PresençaDigital #GoogleMeuNegócio #NegóciosLocais"),
 "dor-perfil-parado": ("Perfil parado",
  "Perfil parado: o cliente acha que a empresa fechou? Cinco sinais para conferir.\n\nUm perfil organizado e atualizado é o primeiro passo para o cliente chamar. No pacote Estruturada da Presença Digital Local: até duas redes, oito modelos de posts e stories, calendário de três meses e uma campanha de lançamento. R$ 1.490.",
  "#v2o5 #redessociais #presencadigital #marketingdigital #negocioslocais #pequenasempresas",
  "Perfil parado: o cliente acha que a empresa fechou?\n\nA última publicação com meses, perfil e site que dizem coisas diferentes, ninguém responsável pelas redes: sinais de presença digital sem rotina. O pacote Estruturada (R$ 1.490) traz até duas redes, oito modelos, calendário de três meses e uma campanha de lançamento.",
  "#RedesSociais #PresençaDigital #PequenasEmpresas"),
}

dias = [datetime.date(2026, 12, 1) + datetime.timedelta(d) for d in range(5)]
nomes = ["terça", "quarta", "quinta", "sexta", "sábado"]
# por dia: reel 08:30, carrossel 11:30, reel 14:00, carrossel 17:30, reel 20:00
plano = [
 ("L1-01", "diagnostico-diferencial", "L1-21", "presenca-por-dentro", "L1-17"),
 ("L1-11", "sites-por-dentro", "L1-08", "dor-lead-esfria", "L1-07"),
 ("L1-22", "sprint-por-dentro", "L1-02", "dor-site-sem-medicao", "L1-13"),
 ("L1-10", "dor-formulario", "L1-14", "dor-sistemas-separados", "L1-20"),
 ("L1-23", "dor-google", "L1-04", "dor-perfil-parado", "L1-24"),
]
horas = ["08:30", "11:30", "14:00", "17:30", "20:00"]
linkedin = {0: "diagnostico-diferencial", 1: "sites-por-dentro", 2: "sprint-por-dentro"}

# reels no LinkedIn (vídeo vertical, sem link na bio: o endereço vai no primeiro comentário)
linkedin_reels = {
    1: ("L1-13", "Muito site recebe o pedido e deixa ele parado numa caixa de entrada. O cliente esperou, ninguém respondeu e ele procurou outro. O caminho do formulário até uma pessoa precisa estar desenhado. É um dos pontos que olhamos no diagnóstico gratuito de 45 minutos.", "#Vendas #Atendimento #Sites"),
    2: ("L1-20", "Cada dado digitado à mão em mais de um lugar é um erro esperando para acontecer. Integrar o sistema que você já usa com o site e o WhatsApp tira esse trabalho. Isso entra no desenho de uma solução em Sites & Integrações.", "#Automação #Integração #Processos"),
}

def link(src, med, cont, dest=BASE):
    return f"{dest}?utm_source={src}&utm_medium={med}&utm_campaign=semana-1&utm_content={cont}"

linhas = []
md = ["# Semana 1: 3 reels e 2 carrosséis por dia (terça 01/12 a sábado 05/12/2026)\n"]
md.append("Horários de Brasília. Cada dia alterna reel, carrossel, reel, carrossel, reel. Dos 25 reels prontos, 15 entram nesta semana; os outros 10 (L1-03, 05, 06, 09, 12, 15, 16, 18, 19 e 25) seguem para a semana de 08/12. Arquivos: reels em `L1-XX-v2.mp4` (L1-01, 07, 20, 24 e 25 na revisão `-v2.1.mp4`) com capa `capas/L1-XX-v2.jpg`; carrosséis no zip `carrosseis-semana-1.zip`, em três pastas, porque a chamada muda por rede: `instagram/<nome>-01.png` a `-07.png` (chamada \"link na bio\"), `facebook/<nome>-01.png` a `-07.png` (\"link na legenda\") e `linkedin/<nome>.pdf` (documento, com o endereço na chamada e \"link no primeiro comentário\"). O link da bio muda por dia (`utm_content=L1-D1` a `L1-D5`, em `lote-1-agenda.md`).\n")
md.append("Facebook: o primeiro reel (08:30) e o primeiro carrossel (11:30) de cada dia, como reel e como álbum. LinkedIn: um carrossel em PDF por dia de terça a quinta, às 10:00, e dois reels (L1-13 na quarta e L1-20 na quinta, às 12:00), com o link no primeiro comentário.\n")
for k, d in enumerate(dias):
    md.append(f"## {nomes[k].capitalize()} {d.strftime('%d/%m')}\n")
    for i, item in enumerate(plano[k]):
        h = horas[i]
        if i % 2 == 0:
            c = item
            md.append(f"### {h} · Reel {c}{' (também no Facebook)' if i == 0 else ''}\nArquivo `{c}-v2.mp4` · Capa `capas/{c}-v2.jpg`\n\n```\n{legenda_reel(c)}\n```\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora=h, rede="Instagram" + (" + Facebook" if i == 0 else ""), tipo="reel", codigo=c, arquivos=f"{c}-v2.mp4", capa=f"capas/{c}-v2.jpg", legenda=legenda_reel(c)))
        else:
            n = item
            t, texto, tags, li, litags = C[n]
            salvar = "Salve este carrossel para conferir com a equipe e envie para quem cuida disso.\n\n" if n.startswith("dor-") else ""
            ig = f"{texto}\n\n{salvar}{CTA_IG}\n\n{tags}"
            fb = f"{texto}\n\nDescubra onde sua empresa pode funcionar melhor. Gratuitamente: {link('facebook', 'post', n)}"
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
            md.append(f"### 12:00 · LinkedIn: Reel {c}\nArquivo `{c}-v2.mp4` (vertical, o mesmo do Instagram) · Capa `capas/{c}-v2.jpg`\n\n```\n{leg}\n```\nPrimeiro comentário: `{link('linkedin', 'reel', c)}`\n")
            linhas.append(dict(data=d.isoformat(), dia=nomes[k], hora="12:00", rede="LinkedIn", tipo="reel", codigo=c, arquivos=f"{c}-v2.mp4", capa=f"capas/{c}-v2.jpg", legenda=leg, legenda_facebook="", comentario=link('linkedin', 'reel', c)))
campos = ["data", "dia", "hora", "rede", "tipo", "codigo", "arquivos", "capa", "legenda", "legenda_facebook", "comentario"]
with open(os.path.join(raiz, "docs/reels/semana-1-agenda.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=campos)
    w.writeheader()
    for l in linhas:
        w.writerow({c: l.get(c, "") for c in campos})
open(os.path.join(raiz, "docs/reels/semana-1-agenda.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print(len(linhas), "linhas")
