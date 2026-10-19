"""Gera design/nao-pode-quebrar.md e os JSON de referência em design/baseline/.

Tabelas (rotas, title, description, JSON-LD, eventos, mensagens do WhatsApp,
campos do formulário) saem da extração de produção; nada é redigitado.
"""
import json, os, re, sys, urllib.parse

EXT, REPO, COMMIT = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(EXT, encoding="utf-8"))
BASE = d["base"]
ROTA_404 = "/esta-rota-nao-existe-baseline"
rotas = d["rotas"]
paginas = {k: v for k, v in rotas.items() if k != ROTA_404}

# ---------- JSON de referência ----------
base_dir = os.path.join(REPO, "design", "baseline")
os.makedirs(base_dir, exist_ok=True)
json.dump({r: v["head"]["jsonld"] for r, v in paginas.items()}, open(os.path.join(base_dir, "jsonld.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(d, open(os.path.join(base_dir, "extracao-producao.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)

def cel(s):
    return "" if s is None else str(s).replace("|", "\\|").replace("\n", " ")

def arquivo_de_texto(rota):
    if rota == "/":
        return "content/home.md"
    if rota == ROTA_404:
        return "content/nao-encontrada.md"
    return f"content{rota}.md"

sitemap = d["cru"]["/sitemap.xml"]["corpo"]
no_sitemap = set(re.findall(r"<loc>(.*?)</loc>", sitemap))

# page_type da camada de medição, mesmo mapa de src/lib/medicao.ts
LINHA = {"/criacao-de-sites": "sites", "/agente-de-ia-para-whatsapp": "agente", "/automacao-com-ia": "automacao", "/crm-com-whatsapp": "crm", "/rastreamento-de-conversoes": "rastreamento", "/gestao-de-trafego": "trafego"}
def page_type(r):
    if r == "/": return "home"
    if r in LINHA: return f"solucao · service_line={LINHA[r]}"
    if r.startswith("/segmentos/"): return f"segmento · segment={r.split('/')[-1]}"
    if r.startswith("/cases/"): return "case"
    return {"/precos": "precos", "/diagnostico": "diagnostico", "/diagnostico/recebido": "recebido", "/sobre": "sobre", "/guias": "guia", "/privacidade": "privacidade"}.get(r, "outra")

L = []
w = L.append

w("# O que não pode quebrar no redesign")
w("")
w(f"Linha de base de **19/10/2026**, lida em produção ({BASE}) com o `main` em `{COMMIT}`. Tudo o que está aqui funciona hoje e tem gente, robô ou sistema dependendo disso: o Google (rotas, title, description, JSON-LD), o GA4 e a Meta (eventos), o n8n e o Chatwoot (formulário e WhatsApp). O redesign pode mudar a cara de tudo; isto aqui fica igual, ou muda de propósito e com o lado de lá avisado.")
w("")
w("Fontes: `design/baseline/extracao-producao.json` (o que o site serviu), `design/baseline/jsonld.json` (grafos completos), o código em `src/` e `docs/n8n/LEIA-ME.md`. O texto de cada rota está em `content/`. Os scripts que geraram tudo estão em `design/baseline/ferramentas/` e podem rodar de novo contra o preview do redesign.")
w("")
w("Já existem testes que travam boa parte disto (`npm test`): `paginas`, `schema`, `medicao`, `capi`, `leads`, `n8n`, `cabecalhos`, `redirecionamentos`, `robots`, `llms`, `ancoras`. Teste que quebrar no redesign é aviso, não detalhe para ajustar o teste.")
w("")

# ---------- 1. Rotas ----------
w("## 1. Rotas")
w("")
w("| Rota | Status | Indexa | No sitemap | `page_type` na medição | Texto |")
w("|---|---|---|---|---|---|")
for r, v in rotas.items():
    rotulo = "qualquer rota inexistente" if r == ROTA_404 else f"`{r}`"
    robots = v["head"]["robots"]
    indexa = "não (`" + robots + "`)" if robots else "sim"
    url = f"{BASE}{'/' if r == '/' else r}"
    sm = "sim" if url in no_sitemap else "não"
    pt = "nao-encontrada" if r == ROTA_404 else page_type(r)
    w(f"| {rotulo} | {v['status']} | {indexa} | {sm} | `{pt}` | `{arquivo_de_texto(r)}` |")
w("")
w("Provisórias hoje: `/gestao-de-trafego` e `/guias` (`pronta: false` em `src/conteudo/paginas.ts`, com `noindex, follow` e fora do sitemap). Ganham conteúdo antes de entrar no sitemap, nunca o contrário.")
w("")
w("### Domínio, canônico e respostas que não são página")
w("")
w("- Endereço principal: `https://www.v2o5.com.br` (`SITE_URL` em `src/lib/site.ts`). O apex e o `http` respondem **308** para o `www`:")
for u in ["https://v2o5.com.br/", "http://www.v2o5.com.br/"]:
    x = d["redirecionamentos"][u]
    w(f"  - `{u}` → {x['status']} `{x['location']}`")
w("- Canonical de cada página = `SITE_URL` + rota (`alternates.canonical` em `metadataDa`). O da home sai sem barra final: `" + str(rotas['/']['head']['canonical']) + "`; o sitemap usa `" + BASE + "/`. É o comportamento atual; se mudar, que seja de propósito.")
w("- Endereços do WordPress antigo, **301** (`REDIRECIONAMENTOS_DO_WORDPRESS` em `next.config.ts`; já indexados no Google):")
for u, x in d["redirecionamentos"].items():
    if x["status"] == 301:
        w(f"  - `{u.replace(BASE, '')}` → `{x['location']}`")
w("- **410** (não existem mais e não têm destino): " + ", ".join(f"`{u.replace(BASE, '')}`" for u, x in d["redirecionamentos"].items() if x["status"] == 410) + " (route handlers em `src/app/hello-world` e `src/app/test-post`).")
w(f"- Rota inexistente: status **404**, `robots: noindex`, título \"{rotas[ROTA_404]['head']['title']}\" e saídas para `/diagnostico`, `/#solucoes` e o case (`src/app/not-found.tsx`).")
w(f"- `/api/leads` aceita só `POST` (um `GET` dá {d['redirecionamentos'][BASE + '/api/leads']['status']}).")
w("- `/robots.txt`, como servido hoje (`src/app/robots.ts`, um grupo só para todos os robôs, inclusive os de IA):")
w("")
w("```")
w(d["cru"]["/robots.txt"]["corpo"].rstrip())
w("```")
w("")
w(f"- `/sitemap.xml`: {len(no_sitemap)} URLs, só as páginas com `pronta: true`, com `lastmod` = `atualizadaEm` às 12h de Brasília (data real da última mudança de conteúdo; mudar texto de uma página no redesign pede atualizar a data dela).")
w("- `/llms.txt`: gerado de `src/conteudo/home.ts` e `precos.ts` (`src/app/llms.txt/route.ts`); cópia em `content/llms.txt.md`.")
icone = rotas["/"]["head"]["icones"]
w(f"- Ícone: `src/app/icon.svg`, servido como `{icone[0]['href'] if icone else '?'}`; é também o `logo` da organização no JSON-LD (`{BASE}/icon.svg`).")
w("- `<html lang=\"pt-BR\">`, `theme-color` `#121418`, `color-scheme: dark` (`src/app/layout.tsx`).")
w("- Cabeçalhos de segurança em toda resposta (`CABECALHOS_DE_SEGURANCA` em `next.config.ts`): CSP sem nonce, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` sem câmera, microfone, geolocalização e `browsing-topics`, HSTS de 2 anos sem `preload`. A CSP só libera o Google Analytics e a Meta (`src/lib/terceiros.ts`); fonte, imagem ou script novo de fora no redesign tem de entrar ali, na CSP e em `/privacidade`.")
w("")

# âncoras
w("### Âncoras que os links usam")
w("")
w("Links com fragmento são `<a>` nativos (`LinkOuAncora`) e rolam sem suavidade; `src/lib/ancora.ts` confere o pouso. O redesign mantém estes `id`:")
w("")
usados = {}
for r, v in paginas.items():
    for h in v["head"]["linksInternos"]:
        if "#" not in h:
            continue
        alvo, frag = h.split("#", 1)
        if not frag:
            continue
        alvo = alvo.replace(BASE, "") or r
        if frag == "conteudo":
            continue
        usados.setdefault((alvo, frag), set()).add(r)
w("| Âncora | Existe na rota | Linkada de |")
w("|---|---|---|")
for (alvo, frag), de in sorted(usados.items()):
    ok = alvo in rotas and frag in rotas[alvo]["head"]["ancoras"]
    origem = ", ".join(sorted(f"`{x}`" for x in de)) if len(de) <= 4 else f"{len(de)} rotas (topo/rodapé)"
    w(f"| `{alvo}#{frag}` | {'sim' if ok else '**não achada**'} | {origem} |")
w("")
conteudo_ok = all("conteudo" in v["head"]["ancoras"] for v in rotas.values())
w(f"Fora da tabela: `#conteudo`, alvo do link \"Pular para o conteúdo\" e `id` do `<main>`, {'presente nas 16 rotas' if conteudo_ok else '**faltando em alguma rota**'}.")
w("")
w("### Quem aponta para o site de fora")
w("")
w("A vitrine de `diagnostico.v2o5.com.br` (`subdominios/diagnostico/`, publicada pelo projeto `v2o5-diagnosticos` na Vercel) linka para `/`, `/diagnostico`, `/precos`, `/sobre`, `/privacidade`, `/cases/motors-store`, `/gestao-de-trafego` e as cinco páginas de solução prontas, com `utm_source=diagnostico.v2o5.com.br`. Renomear ou tirar qualquer uma dessas rotas quebra links publicados; se precisar, entra um 301 em `next.config.ts`.")
w("")

# ---------- 2. Title e description ----------
w("## 2. Title e description de cada rota")
w("")
w("Como o site serve hoje. Saem de `PAGINAS` em `src/conteudo/paginas.ts` (`metadataDa`); o layout aplica o modelo `%s | V2O5 Vendas e Tecnologia` às internas, e a home usa o título inteiro. `tests/paginas.test.ts` cobra título e descrição únicos e canonical igual à rota.")
w("")
w("| Rota | `<title>` | `meta description` |")
w("|---|---|---|")
for r, v in rotas.items():
    rotulo = "404" if r == ROTA_404 else f"`{r}`"
    w(f"| {rotulo} | {cel(v['head']['title'])} | {cel(v['head']['description'])} |")
w("")
w("Não há Open Graph nem Twitter Card em nenhuma rota hoje (nenhuma `og:*` ou `twitter:*` no HTML). Acrescentar não quebra nada; só registro para ninguém procurar o que não existe.")
w("")
w("O H1 de cada rota está no `frontmatter` do arquivo correspondente em `content/`.")
w("")

# ---------- 3. JSON-LD ----------
w("## 3. JSON-LD")
w("")
w("Um `<script type=\"application/ld+json\">` por página, montado por funções puras em `src/lib/schema.ts` (componente `JsonLd`) e travado por `tests/schema.test.ts`. Grafos completos, como servidos, em `design/baseline/jsonld.json`.")
w("")
w("| Rota | Nós do `@graph` (`@type` e `@id`) |")
w("|---|---|")
for r, v in paginas.items():
    nos = []
    for g in v["head"]["jsonld"]:
        for n in g.get("@graph", [g]):
            t = n.get("@type")
            t = "+".join(t) if isinstance(t, list) else (t or "referência")
            i = n.get("@id", "").replace(BASE, "")
            nos.append(f"{t} `{i}`" if i else t)
    w(f"| `{r}` | {'; '.join(nos) or 'nenhum'} |")
w("")
w("Regras que o redesign mantém:")
w("")
w(f"- Os três `@id` fixos: organização `{BASE}/#organizacao`, site `{BASE}/#site`, fundador `{BASE}/sobre#autor` (a página `/sobre` tem de continuar com o `id=\"autor\"`). As internas referenciam a organização só pelo `@id`.")
w("- `FAQPage` com as mesmas perguntas e respostas que a página mostra (home, `/precos`, as cinco páginas de solução prontas e o hub de revendas). O Google pede que o dado estruturado bata com o texto visível: mudar uma resposta em `content/` sem mudar o `@graph` (ou o contrário) é erro. Hoje os dois saem do mesmo array em `src/conteudo/`.")
w("- Preços do `OfferCatalog` (`/precos#catalogo`) e dos `Service` saem de `src/conteudo/precos.ts`, os mesmos números da tabela visível; o Completo por tempo limitado leva `priceValidUntil`.")
w("- Decisões registradas no código: sem `sameAs` (perfis ainda não existem), sem `AggregateRating` próprio, endereço só com cidade e estado (sede residencial), telefone no formato `+55 41 99808-9550`.")
w("")

# ---------- 4. Rastreamento ----------
w("## 4. Rastreamento: eventos, `event_id`, Meta CAPI e GA4")
w("")
w("### Estado em produção em 19/10/2026")
w("")
med = d["medicaoNaHome"]
w(f"- Nenhum script de terceiro carregou na home (rede vazia fora do próprio domínio; `window.gtag` {'existe' if med['gtag'] else 'não existe'}, `window.fbq` {'existe' if med['fbq'] else 'não existe'}). Ou seja: `NEXT_PUBLIC_GA4_ID` e `NEXT_PUBLIC_META_PIXEL_ID` não estão no build de produção, como o `CLAUDE.md` já anotava (falta pôr os IDs na Vercel). O aviso de medição não aparece.")
w("- A API de Conversões roda no servidor e só com `META_PIXEL_ID` e `META_CAPI_TOKEN`; isso não dá para ver de fora, e a listagem de variáveis da Vercel respondeu 404 nesta sessão. **Não verificado.**")
w("- Consequência para o redesign: o contrato abaixo está todo no código e testado, mas ninguém está olhando os números ainda. Quebrar um `data-evento` hoje não aparece em relatório nenhum; aparece no dia em que os IDs entrarem. Por isso a conferência é pelo DOM e pelos testes, não pelo GA4.")
w("")
w("### O contrato do clique")
w("")
w("Os CTAs e os links de WhatsApp e e-mail não têm JavaScript próprio: levam `data-evento` e `data-local`, e `components/layout/Medicao.tsx` ouve os cliques no documento (`eventoDoClique` em `src/lib/medicao.ts`). O rótulo enviado é o **texto visível do botão** (até 60 caracteres). Mudar o texto de um botão no redesign muda o `cta_label` nos relatórios; mudar ou perder o `data-local` quebra a série histórica do local.")
w("")
w("| Evento GA4 | Parâmetros | Evento na Meta | Quando |")
w("|---|---|---|---|")
w("| `page_view` | `page_type`, e `service_line` ou `segment` quando houver (tabela da seção 1) | `PageView` | a cada rota, inclusive na navegação do App Router; o `gtag` é configurado com `send_page_view: false` |")
w("| `cta_click` | `cta_location` (= `data-local`), `cta_label` (texto) | nenhum | clique em `[data-evento=\"cta_click\"]` |")
w("| `click_whatsapp` | `whatsapp_location` (= `data-local`), `pos_lead: \"nao\"` | `Contact` (padrão), `content_name` = local | clique em link de WhatsApp sem lead nesta sessão |")
w("| `click_whatsapp_pos_lead` | `whatsapp_location`, `pos_lead: \"sim\"` | nenhum | o mesmo clique depois de um lead na sessão (não conta como conversão) |")
w("| `click_email` | `email_location` | nenhum | clique em `[data-evento=\"click_email\"]` |")
w("| `form_start` | `form_id: \"diagnostico\"` | nenhum | primeiro `input` ou `change` no formulário |")
w("| `generate_lead` | `event_id`, `form_id`, `lead_type: \"diagnostico\"`, `segmento` | `Lead` com `{content_name: form_id, content_category: segmento}` e `{eventID: event_id}` | `/api/leads` aceitou o envio |")
w("")
w("`data-local` em uso, por rota (topo, menu do celular e rodapé são iguais em todas):")
w("")
comuns = sorted({(e["evento"], e["local"]) for e in rotas["/"]["head"]["eventos"] if e["emHeader"] or e["emFooter"]})
w("- Comuns: " + ", ".join(f"`{ev}` → `{lo}`" for ev, lo in comuns) + ". O `menu` só existe no celular.")
w("")
w("| Rota | `cta_click` | `click_whatsapp` | `click_email` |")
w("|---|---|---|---|")
for r, v in rotas.items():
    ev = [(e["evento"], e["local"]) for e in v["head"]["eventos"] if not e["emHeader"] and not e["emFooter"]]
    def locais(nome):
        vistos = []
        for a, b in ev:
            if a == nome and b not in vistos:
                vistos.append(b)
        return ", ".join(f"`{x}`" for x in vistos) or "·"
    rotulo = "404" if r == ROTA_404 else f"`{r}`"
    w(f"| {rotulo} | {locais('cta_click')} | {locais('click_whatsapp')} | {locais('click_email')} |")
w("")
w("### `event_id` e a deduplicação Pixel + CAPI")
w("")
w("O mesmo identificador sai do servidor e volta para o navegador, para a Meta contar o lead uma vez só:")
w("")
w("1. `POST /api/leads` valida o lead e gera `event_id = \"Lead.\" + randomUUID()` (`src/app/api/leads/route.ts`).")
w("2. Entrega ao n8n com esse `event_id` no corpo (seção 5). Se a entrega falhar, responde 502 e **não** há evento.")
w("3. Depois de responder (`after()`), manda o evento `Lead` à API de Conversões com o mesmo `event_id`, se houver configuração e a pessoa não tiver desligado a medição (`medicao: \"desligada\"` no corpo).")
w("4. Responde `{ ok: true, event_id }`. O navegador dispara `generate_lead` (GA4) e `fbq('track', 'Lead', ..., { eventID: event_id })`, grava `v2o5.lead` no `sessionStorage` e vai para `/diagnostico/recebido`.")
w("5. Daí em diante, clique no WhatsApp nesta sessão vira `click_whatsapp_pos_lead`, sem `Contact` na Meta.")
w("")
w("A armadilha de robô (campo `site` preenchido) responde `{ ok: true, event_id }` com um id falso e não entrega nada ao n8n nem à Meta. O redesign mantém o campo escondido do jeito que está (fora da tela, `tabindex=-1`, `aria-hidden`).")
w("")
w("### Meta CAPI (servidor)")
w("")
w("- `src/lib/capi.ts`: `POST https://graph.facebook.com/v22.0/{META_PIXEL_ID}/events`, token no corpo (nunca na URL), tempo limite de 4 s, nunca lança erro (o lead já foi aceito).")
w("- Evento: `event_name: \"Lead\"`, `action_source: \"website\"`, `event_source_url` = `SITE_URL` + página do envio (padrão `/diagnostico`), `custom_data: { content_name: \"diagnostico\", content_category: <segmento>, lead_type: \"diagnostico\" }`.")
w("- `user_data`: e-mail, telefone, primeiro e último nome e país (`br`) em SHA-256 depois de normalizar; IP, user agent e `fbp`/`fbc` em claro. O `fbc` vem do cookie `_fbc` ou é montado do `fbclid` da entrada (`fb.1.<ms>.<fbclid>`).")
w("- Variáveis: `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_CAPI_TEST_CODE` (só durante conferência). O formulário só manda `fbp` e `fbc` se a medição não estiver desligada.")
w("")
w("### GA4 e Pixel (navegador)")
w("")
w("- Só carregam com `NEXT_PUBLIC_GA4_ID` (formato `G-...`) e `NEXT_PUBLIC_META_PIXEL_ID` (só dígitos) e sem oposição gravada; ID com formato errado não carrega nada.")
w("- Carregam depois do `load`, no primeiro momento ocioso ou em até 2 s (`depoisDoConteudo`). Lição da Motors: Pixel e GTM custavam 2,4 s de TBT. O redesign não puxa as tags para o `<head>`.")
w("- Filas preparadas antes dos scripts (`dataLayer`/`gtag` e `fbq`), Pixel com `autoConfig: false` (sem coleta automática de cliques e formulários), sem GTM.")
w("")
w("### O que fica guardado no navegador")
w("")
w("| Chave | Onde | Para quê |")
w("|---|---|---|")
w("| `v2o5.medicao` = `desligada` | `localStorage` | oposição feita em `/privacidade#medicao`; nenhuma tag carrega e o servidor não manda nada à Meta |")
w("| `v2o5.aviso` = `visto` | `localStorage` | o aviso de medição já foi fechado |")
w("| `v2o5.origem` | `sessionStorage` | primeiro toque da visita: UTMs, `gclid`, `gbraid`, `wbraid`, `fbclid`, `referrer` de fora e página de entrada (`components/layout/PrimeiroToque.tsx`) |")
w("| `v2o5.lead` | `sessionStorage` | `event_id` do lead desta sessão (separa `click_whatsapp_pos_lead`) |")
w("| `_ga`, `_gid`, `_ga_<id>`, `_fbp`, `_fbc` | cookies | das ferramentas; a oposição apaga todos, no host e no domínio pai |")
w("")
w("O evento de janela `v2o5-medicao-mudou` avisa os componentes quando a oposição muda.")
w("")

# ---------- 5. Formulário ----------
w("## 5. O formulário de `/diagnostico`")
w("")
w("Componente `src/components/diagnostico/Formulario.tsx`; opções em `src/conteudo/diagnostico.ts`; validação em `src/lib/leads.ts`, a **mesma** no navegador e na API. Textos visíveis, inclusive mensagens de erro, em `content/diagnostico.md`.")
w("")
w("### Campos, como servidos")
w("")
form = rotas["/diagnostico"]["extras"]["formularioAutomotivo"][0]
w(f"`<form>` sem `action` (envio por `fetch`), `noValidate` = {str(form['novalidate']).lower()}, rotulado pelo próprio título.")
w("")
w("| `name` | Tipo | Rótulo | Obrigatório | `autocomplete` | Valores enviados |")
w("|---|---|---|---|---|---|")
obrig = {"nome", "empresa", "whatsapp", "email", "segmento"}
objetivos = [c for c in form["campos"] if c["name"] == "objetivo"]
vistos = set()
for c in form["campos"]:
    nome = c["name"]
    if nome in vistos or c["tag"] == "button":
        continue
    vistos.add(nome)
    if nome == "objetivo":
        valores = ", ".join(f"`{o['value']}` ({o['rotulo']})" for o in objetivos)
        w(f"| `objetivo` (caixas; vai no corpo como `objetivos: []`) | checkbox × {len(objetivos)} | O que você quer resolver primeiro | pelo menos um | · | {valores} |")
        continue
    if nome == "site":
        w("| `site` | text, fora da tela, `tabindex=-1` | Site (armadilha) | tem de ir vazio | `off` | · |")
        continue
    tipo = c.get("type") or c["tag"]
    if c["tag"] == "select":
        tipo = "select"
    elif c["tag"] == "textarea":
        tipo = f"textarea (máx. {c['maxlength']})"
    valores = ", ".join(f"`{o['valor']}` ({o['rotulo']})" for o in (c.get("opcoes") or []) if o["valor"]) or "texto livre"
    if nome == "whatsapp":
        valores = "normalizado para só dígitos com `55` (10 ou 11 dígitos; celular com 9)"
    if nome == "email":
        valores = "minúsculas"
    cond = " (só com segmento `automotivo`)" if nome in {"estoque", "sistema"} else ""
    w(f"| `{nome}`{cond} | {tipo} | {cel(c['rotulo'])} | {'sim' if nome in obrig else 'não'} | {'`' + c['autocomplete'] + '`' if c['autocomplete'] else '·'} | {valores} |")
w("")
w("Os códigos (`automotivo`, `2-5`, `aparecer`, `31-80`, `revenda-mais`...) são contrato com o n8n: o nó \"Lead\" do fluxo `lead-do-diagnostico.json` traduz cada código para o rótulo. Trocar um rótulo é livre; trocar um código exige mudar `leads.ts`, `diagnostico.ts` e o fluxo do n8n juntos.")
w("")
w("### Envio e respostas")
w("")
w("- `POST /api/leads`, `Content-Type: application/json`, com os campos acima e mais: `objetivos` (array), `origem` (`v2o5.origem` + `fbp`/`fbc` se a medição estiver ligada), `pagina` (`location.pathname`), `medicao: \"desligada\"` quando houver oposição, `site` (armadilha).")
w("- Respostas: **200** `{ok, event_id}` → `router.push(\"/diagnostico/recebido\")`; **400** `{ok:false, erros}` por campo (o foco vai ao primeiro campo com erro) ou `json`; **413** acima de 16 KB; **429** acima de 5 envios por IP em 10 min; **503** `canal` sem `LEADS_WEBHOOK_URL` (mostra a mensagem de configuração); **502** `entrega` quando o n8n não aceita.")
w("- `/diagnostico/recebido` é `noindex`, fora do sitemap e bloqueada no `robots.txt`; tem o próprio link de WhatsApp (`recebido`).")
w("")
w("### Entrega ao n8n")
w("")
w("- `POST` em `LEADS_WEBHOOK_URL` (fluxo `lead-do-diagnostico.json`), cabeçalho `X-V2O5-Segredo: <LEADS_WEBHOOK_SECRET>`, tempo limite de 8 s.")
w("- Corpo: `{ event_id, recebido_em, fonte: \"site\", lead }`, com `lead` = `{ nome, whatsapp, email, empresa, segmento, porte?, objetivos[], estoque?, sistema?, mensagem?, pagina?, origem{...} }`. Exemplo completo em `docs/n8n/LEIA-ME.md`. O n8n marca o contato no Chatwoot com `origem = v2o5`, grava a campanha em `origem_da_visita`, avisa o Dyones e manda a primeira mensagem pelo WhatsApp.")
w("")
w("### Medição e acessibilidade do formulário")
w("")
w("- `form_start` no primeiro toque e `generate_lead` no sucesso (seção 4). Com a medição desligada, o corpo leva `medicao: \"desligada\"` e o servidor não chama a Meta.")
w("- Cada campo tem `<label for>`; erro com `aria-invalid` e `aria-describedby` apontando a mensagem; mensagem geral com `role=\"alert\"`; botão desabilitado enquanto envia; consentimento e link para `/privacidade` embaixo do botão.")
w("")

# ---------- 6. WhatsApp ----------
w("## 6. O link de WhatsApp")
w("")
w("- Número: `5541998089550` (`EMPRESA.whatsapp` em `src/conteudo/home.ts`). Link e número escrito saem do mesmo campo (`src/lib/whatsapp.ts`): `(41) 99808-9550` no rodapé e `+55 41 99808-9550` no JSON-LD.")
w("- Formato: `https://wa.me/5541998089550?text=<mensagem com encodeURIComponent>`, `target=\"_blank\"`, `rel=\"noopener\"`, `data-evento=\"click_whatsapp\"` e o `data-local` do lugar.")
w("- **Toda mensagem pronta tem o trecho `site da V2O5`** (`MARCA_DO_SITE`). É por ele que o fluxo `origem-do-lead.json` do n8n reconhece a primeira mensagem, marca o contato com `origem = v2o5` e libera o agente de IA. Mensagem sem esse trecho cai na caixa como conversa comum, sem agente. A comparação ignora maiúscula, acento e espaço repetido, mas não ignora outra redação.")
w("- Botão fixo: canto inferior direito, só abaixo de 768 px (`md:hidden`), Server Component sem JavaScript (`BotaoWhatsAppFixo`). Não aparece em `/gestao-de-trafego`, `/guias`, `/cases/motors-store`, `/diagnostico`, `/diagnostico/recebido`, `/privacidade` nem na 404.")
w("")
w("As mensagens moram em `WHATSAPP.mensagens` (`src/conteudo/home.ts`), na frase das páginas de solução (`src/conteudo/solucoes.ts`, com o nome da linha no meio) e na do fotógrafo parceiro (`src/conteudo/precos.ts`). Como servidas hoje, decodificadas do `href`:")
w("")
w("| Rota | `data-local` | Mensagem |")
w("|---|---|---|")
for r, v in rotas.items():
    vistos = set()
    for a in v["head"]["whatsapp"]:
        if "wa.me" not in (a["href"] or "") or a["local"] == "rodape":
            continue
        chave = (a["local"], a["mensagem"])
        if chave in vistos:
            continue
        vistos.add(chave)
        rotulo = "404" if r == ROTA_404 else f"`{r}`"
        w(f"| {rotulo} | `{a['local']}` | {cel(a['mensagem'])} |")
rod = next(a for a in rotas["/"]["head"]["whatsapp"] if a["local"] == "rodape")
w(f"| todas (rodapé) | `rodape` | {cel(rod['mensagem'])} |")
w("")
emails = {}
for r, v in rotas.items():
    for e in v["head"]["emails"]:
        emails.setdefault(urllib.parse.unquote(e["href"]), set()).add((e["evento"], e["local"], "404" if r == ROTA_404 else r))
w("E-mail, com o mesmo contrato (`data-evento=\"click_email\"`, link de `src/lib/email.ts`):")
w("")
for href, usos in emails.items():
    com = sorted({lo for ev, lo, _ in usos if ev})
    sem = sorted({r for ev, lo, r in usos if not ev})
    partes = []
    if com:
        partes.append("`data-local` " + ", ".join(f"`{x}`" for x in com))
    if sem:
        partes.append("sem `data-evento` em " + ", ".join(f"`{x}`" for x in sem) + " (o contato do encarregado, LGPD art. 41; não é medido)")
    w(f"- `{href}`: " + "; ".join(partes))
w("")

# ---------- 7. Conferência ----------
w("## 7. Como conferir antes de publicar o redesign")
w("")
w("1. `npm test`, `npm run lint` e `npm run build` limpos.")
w("2. Rodar `design/baseline/ferramentas/extrair.cjs` contra o preview da branch e comparar com `extracao-producao.json`: mesmas rotas e status, mesmos `title`, `description`, `canonical` e `robots`, mesmo JSON-LD, mesmos pares `data-evento`/`data-local`, mesmas mensagens de WhatsApp e os mesmos campos do formulário.")
w("3. Gerar o `content/` de novo a partir do preview e fazer `git diff content/`: a diferença tem de ser zero palavra, ou só o que foi decidido mudar.")
w("4. Enviar um pedido de diagnóstico no preview (teste (a) do `docs/n8n/LEIA-ME.md`) e ver o lead chegar ao n8n e ao Chatwoot com `origem = v2o5`; clicar no WhatsApp de uma página e ver o agente responder.")
w("5. Rodar o Dembrandt com `--compare design/baseline/dembrandt-2026-10-19.json` para ver o que mudou no visual (no redesign, mudar é o esperado; serve para registrar o quê).")
w("")

open(os.path.join(REPO, "design", "nao-pode-quebrar.md"), "w", encoding="utf-8").write("\n".join(L).rstrip() + "\n")
print("ok", len(L), "linhas")
