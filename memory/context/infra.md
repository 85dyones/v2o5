# Stack, infra e contas

## Stack do site
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Vitest · ESLint · Vercel. Supabase (leads) num projeto novo. Conteúdo (guias, cases) em MDX no repo. Turnstile + rate limit Upstash ligado desde o início. CSP e cabeçalhos de segurança no `next.config.ts` (lacuna da Motors). Motion: ver `motion.md`.

## Orçamento de performance (critério de aceite)
Home com hero animado: Lighthouse mobile ≥ 90; demais ≥ 95; a11y/boas práticas/SEO ≥ 95. LCP ≤ 2,0 s (LCP é o H1), TBT ≤ 200 ms, CLS ≤ 0,05. JS inicial da home ≤ 150 KB gz; peso ≤ 900 KB. Terceiros ≤ 50 ms de bloqueio.
Comando local (Chromium do ambiente):
`CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx -y lighthouse@12.6.0 <url> --output=json --output-path=./lh.json --chrome-flags="--headless=new --no-sandbox"`
A API do PageSpeed estava sem cota em 08/10.

## Rastreamento
Feito em 10/10: `/api/leads` valida (`src/lib/leads.ts`), gera `event_id` (`Lead.<uuid>`) e entrega ao n8n (`LEADS_WEBHOOK_URL`, segredo `LEADS_WEBHOOK_SECRET` no cabeçalho `X-V2O5-Segredo`); primeiro toque em sessionStorage (`src/lib/origem.ts`) vai junto com o lead.
Feito em 13/10 (camada de dados, PR #8): `src/lib/medicao.ts` + `components/layout/Medicao.tsx` no layout. GA4 (`NEXT_PUBLIC_GA4_ID`) e Pixel da Meta (`NEXT_PUBLIC_META_PIXEL_ID`) só carregam com ID no formato certo e sem oposição, depois do `load` num momento ocioso (`requestIdleCallback`, teto de 2 s); as filas `dataLayer`/`fbq` são preparadas na montagem, então o que acontece antes da carga sai depois. Pixel com `autoConfig` desligado. Eventos: `page_view` por rota com `page_type`, `service_line`, `segment` (o `page_context` do plano virou parâmetro do `page_view`: sem GTM, é assim que vira dimensão no GA4), `cta_click` (`cta_location`, `cta_label`), `click_whatsapp` (`whatsapp_location`; depois de um lead na sessão vira `click_whatsapp_pos_lead`, fora da conta, sem o `Contact` da Meta), `click_email`, `form_start`, `generate_lead` (`event_id`, `form_id`, `lead_type`, `segmento`; no Pixel, `Lead` com `eventID`). Marcação por `data-evento`/`data-local` nos Server Components e delegação de clique no documento (`tests/medicao.test.ts` cobra todo CTA e link de WhatsApp). CAPI pelo servidor (`src/lib/capi.ts`; `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_CAPI_TEST_CODE` opcional) em `after()` da rota, com o mesmo `event_id`, hash SHA-256 de e-mail, telefone, nome e país, IP, user agent, `fbp`/`fbc` (o formulário manda os cookies dentro da `origem`; sem cookie, o `fbc` sai do `fbclid`). Oposição em `/privacidade` (`ControleDeMedicao`): `localStorage` `v2o5.medicao=desligada`, apaga `_ga*`, `_gid`, `_fbp`, `_fbc` e a origem; o formulário manda `medicao: "desligada"` e a rota pula o CAPI. Aviso informativo uma vez (`v2o5.aviso`), só com ferramenta ativa. CSP só com `src/lib/terceiros.ts` (googletagmanager.com, *.google-analytics.com, *.analytics.google.com, www.google.com, connect.facebook.net, www.facebook.com). Se o Google Ads ou os Google Signals forem ligados no GA4, o gtag passa a chamar também googleads.g.doubleclick.net e www.google.com.br: entram em `terceiros.ts` e na privacidade nessa hora. Variáveis em `.env.example` e no README.
Fora, com motivo: GA4 pelo Measurement Protocol (o GA4 não deduplica por `event_id`; sem o cookie do navegador o hit não teria atribuição; o navegador manda o `generate_lead`). Google Ads: quando a conta existir, importar `generate_lead` do GA4 como conversão ou pôr a tag própria em `terceiros.ts`. Ainda não: Supabase, Turnstile, `schedule_call`, GTM server-side (fase 3).
Lição: na Motors, Pixel + GTM somam ~2,4 s de TBT no mobile. Aqui a carga é depois do `load`: só GA4 custa cerca de 150 ms de bloqueio (home 97 → 93, TBT 90 → 310 ms); o Pixel, cerca de 235 ms e a nota de boas práticas (cookie de terceiro, 100 → 79); os dois, home 85. Medidas completas em `decisoes.md` (13/10). Regra: produção só com GA4 até haver campanha na Meta; com campanha, preferir a API de Conversões ao Pixel no navegador, salvo remarketing.

## Infra existente da V2O5
| Item | Onde |
|---|---|
| DNS | Hostinger (ns1/ns2.dns-parking.com) |
| Site atual | WordPress na Hostinger, A 147.93.37.158 |
| E-mail | Hostinger (MX mx1/mx2.hostinger.com, SPF, DKIM hostingermail-a, DMARC p=none). Endereços públicos: `diagnostico@` e `privacidade@` (alias da caixa principal; o Dyones cria, 10/10) |
| VPS 168.231.100.245 | Conferido em 13/10 (sem login, só respostas públicas): **Chatwoot 4.17.0 em `app.chat.v2o5.com.br`** (CNAME para `cwoot.v2o5.com.br`; painel `/app/accounts/1/`, conta 1); `chat.v2o5.com.br` é o **Typebot**, não o Chatwoot; `chatwoot.v2o5.com.br` é uma instalação separada do Chatwoot que atende um cliente (detalhe no repositório privado `85dyones/16V`): não desligar, monitorar; `evolution.v2o5.com.br` é a Evolution API 2.3.7 (instância `v2o5` no fluxo do n8n, a confirmar no manager); `n8n.v2o5.com.br`. O fluxo do n8n usava `chatwoot.v2o5.com.br` e passou a usar `app.chat` em 13/10 |
Na migração: trocar só apex e `www` para a Vercel; conferir MX, SPF, DKIM, DMARC e os A da VPS antes e depois. Domínio e DNS ficam na Hostinger; a hospedagem de sites (contratada até 2027) passa a servir `painel.v2o5.com.br`, uma pasta com senha por cliente, só com painéis estáticos de números agregados (roteiro na seção 5 de `docs/checagem-antes-do-dns.md`). WordPress: backup guardado fora e apagado da hospedagem depois da troca.

## Contas
| Serviço | Identificação |
|---|---|
| Vercel | time "Dyones' projects" `team_AKoHgpGHOfOR0YOGxDOQIgod` (slug `dyones-projects-a2f07575`); projeto da Motors `prj_SpfjeogVS4vUwcYiYXUB6Tlty81I`; projeto do site `v2o5` `prj_ko8HAaRvhwn03GJxFAsYJEYy4V7I`, ligado ao repo: cada push gera preview (`v2o5-git-<branch>-dyones-projects-a2f07575.vercel.app`), protegido por login da Vercel. O conector da Vercel das sessões não enxerga esse projeto (404 no projeto, 403 nos deploys; conferido em 09/10): a listagem dele não serve para dizer que um projeto não existe |
| Supabase | org `cibdewzwvofchjqkoxyj`: v2o5-site `xqrmijjkotyoucueyypu` (sa-east-1, criado 09/10, só do site; vazio, sem migrações, conferido em 09/10), motors-oficial `zwbqmzgnagfeqinqkolp`, rede-auto `ztzhsthqetgajharcxhx`, 16-vara-civel (inativo) |
| GitHub | `85dyones/v2o5` (este), `85dyones/motors-site-oficial` |
| Google tag atual | `GT-PBNTV3FG` (Site Kit, WordPress) |
Credenciais nunca vão para o repo nem para o chat; o acesso a variáveis da Vercel foi bloqueado pela política de permissões e não deve ser contornado.
