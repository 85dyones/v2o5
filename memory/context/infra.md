# Stack, infra e contas

## Stack do site
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Vitest · ESLint · Vercel. Supabase (leads) num projeto novo. Conteúdo (guias, cases) em MDX no repo. Turnstile + rate limit Upstash ligado desde o início. CSP e cabeçalhos de segurança no `next.config.ts` (lacuna da Motors). Motion: ver `motion.md`.

## Orçamento de performance (critério de aceite)
Home com hero animado: Lighthouse mobile ≥ 90; demais ≥ 95; a11y/boas práticas/SEO ≥ 95. LCP ≤ 2,0 s (LCP é o H1), TBT ≤ 200 ms, CLS ≤ 0,05. JS inicial da home ≤ 150 KB gz; peso ≤ 900 KB. Terceiros ≤ 50 ms de bloqueio.
Comando local (Chromium do ambiente):
`CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx -y lighthouse@12.6.0 <url> --output=json --output-path=./lh.json --chrome-flags="--headless=new --no-sandbox"`
A API do PageSpeed estava sem cota em 08/10.

## Rastreamento
Conversões pelo servidor: `/api/leads` grava no Supabase, envia `Lead` ao CAPI e `generate_lead` ao GA4 (Measurement Protocol) com o mesmo `event_id`, avisa o n8n. Navegador: camada de dados em código (molde `src/lib/dataLayer.ts` da Motors), tags depois do conteúdo. Primeiro e último toque no lead (UTM, gclid, gbraid, wbraid, fbclid, _fbc, _fbp, entrada, referrer). Eventos: `page_context`, `cta_click`, `click_whatsapp` (`pos_lead` fora da conta), `form_start`, `generate_lead`, `schedule_call`, `tool_use`. Consentimento: modelo da Motors.
Lição: na Motors, Pixel + GTM somam ~2,4 s de TBT no mobile.

## Infra existente da V2O5
| Item | Onde |
|---|---|
| DNS | Hostinger (ns1/ns2.dns-parking.com) |
| Site atual | WordPress na Hostinger, A 147.93.37.158 |
| E-mail | Hostinger (MX mx1/mx2.hostinger.com, SPF, DKIM hostingermail-a, DMARC p=none) |
| VPS 168.231.100.245 | n8n.v2o5.com.br, chat.v2o5.com.br e chatwoot.v2o5.com.br (Chatwoot), evolution.v2o5.com.br (Evolution API) |
Na migração: trocar só apex e `www` para a Vercel; conferir MX, SPF, DKIM, DMARC e os A da VPS antes e depois. WordPress fica 30 dias em subdomínio de backup.

## Contas
| Serviço | Identificação |
|---|---|
| Vercel | time "Dyones' projects" `team_AKoHgpGHOfOR0YOGxDOQIgod` (único time da conta); projeto da Motors `prj_SpfjeogVS4vUwcYiYXUB6Tlty81I`. Projeto da V2O5 ainda não existe, conferido em 09/10 (criar só com OK) |
| Supabase | org `cibdewzwvofchjqkoxyj`: v2o5-site `xqrmijjkotyoucueyypu` (sa-east-1, criado 09/10, só do site; vazio, sem migrações, conferido em 09/10), motors-oficial `zwbqmzgnagfeqinqkolp`, rede-auto `ztzhsthqetgajharcxhx`, 16-vara-civel (inativo) |
| GitHub | `85dyones/v2o5` (este), `85dyones/motors-site-oficial` |
| Google tag atual | `GT-PBNTV3FG` (Site Kit, WordPress) |
Credenciais nunca vão para o repo nem para o chat; o acesso a variáveis da Vercel foi bloqueado pela política de permissões e não deve ser contornado.
