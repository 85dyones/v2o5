# Pendências

Atualize ao resolver: mova a decisão para `decisoes.md` e apague daqui.

## Do Dyones
1. Foto para a página Sobre e a assinatura dos guias.
2. Agenda: recomendação Cal.com ligado ao Google Agenda (webhook dispara `schedule_call`).
3. GTM server-side: recomendação deixar para a fase 3.
4. Contas: criar conta Google Ads da V2O5. Vercel (`v2o5`) e Supabase (`v2o5-site`) do site já existem.
5. Crédito "Desenvolvido por V2O5" no rodapé da Motors (recomendado).
6. CNAE: conferir com o contador se cobre site, sistema e tráfego (principal hoje é 7490-1/04).
7. Persistência dos plugins: instalar pela conta do claude.ai ou registrar no `.claude/settings.json` do repo.
8. Medir o preview da Vercel (PageSpeed): ele está atrás do login da Vercel. Liberar um bypass de proteção para automação ou dar ao conector acesso ao projeto `v2o5`. Ver também a molécula 3D num celular e num notebook comuns (o ambiente daqui só tem WebGL por software); com `?diagnostico` no fim da URL aparece o motivo se ela não rodar.
9. Criar na Hostinger os alias `diagnostico@v2o5.com.br` (público) e `privacidade@v2o5.com.br` (encarregado), os dois apontando para a caixa principal. O site já publica os dois desde 10/10. Quando a resposta automática ao lead passar a sair por e-mail, subir o DMARC de `p=none` para `p=quarantine`.
9a. Ligar o formulário do diagnóstico: importar `docs/n8n/lead-do-diagnostico.json` no n8n seguindo `docs/n8n/LEIA-ME.md` (quatro credenciais por nome, nó Configuração, ativar), definir `LEADS_WEBHOOK_URL` e `LEADS_WEBHOOK_SECRET` no projeto `v2o5` da Vercel (produção e preview) e testar com o curl do LEIA-ME e com o formulário. Até lá, o formulário responde "envio em configuração". Depois: Supabase e Turnstile.
10. Proposta: "Pergunte ao agente" no hero, uma conversa real com o agente da V2O5 (a demonstração do próprio produto). Precisa de backend, custo de IA e aviso de privacidade; fase 2.
11. Foto do Dyones para a página Sobre, a Visão 360 e a assinatura dos guias.
13. A home diz que o sistema da Motors tem "agente de IA no WhatsApp" (`AUTOMOTIVO.texto` e o pacote em `/precos`): a memória do case registra n8n, Evolution e Chatwoot, não um agente de IA na loja. Confirmar com o Dyones se o agente roda na Motors; se não, o texto do pacote passa a prometer o agente como parte do pacote, sem dizer que a Motors já usa. O hub automotivo (12/10) já diz "o agente de IA no WhatsApp completa o pacote", sem afirmar que roda na loja; a página do case não cita agente.
14. Tarifa da Meta por mensagem de marketing no WhatsApp: o site não publica número (muda e é repassada pelo valor cobrado), mas a proposta comercial precisa do valor vigente; conferir no painel da Meta antes da primeira campanha de reativação. Termo de aceite do número não oficial: redigir antes de vender o canal.
15. Linhas novas sem página própria (cartão leva a `/diagnostico`): Painel do dono, Reativação de base, Conteúdo e redes com IA, Avaliações no Google, Pós-venda e recorrência, Anúncios de catálogo (vai para `/gestao-de-trafego`). Decidir quais ganham página depois das cinco páginas de solução.
12. SEO contínuo e Perfil da Empresa avulsos (sem site da V2O5): publicar preço próprio? Hoje aparecem como inclusos em Sites e presença. Página própria para Branding (hoje o cartão leva a `/diagnostico`), e para SEO e Perfil se virarem linha (`/branding`, `/seo`, `/perfil-da-empresa-no-google`), depois do Planejador de Palavras-chave.

## Técnicas
- `/precos`, `/diagnostico` e `/privacidade` ficaram prontas em 10/10, `/cases/motors-store` em 11/10, o hub `/segmentos/revendas-de-veiculos` em 12/10 e as cinco páginas de solução em 13/10; faltam `/sobre`, `/gestao-de-trafego` (fase 2; o molde `PaginaDeSolucao` serve) e `/guias` (com `noindex` até terem texto). Ordem combinada: sobre; em seguida camada de dados (GA4, CAPI) e a troca do DNS. Depois: formulário do diagnóstico embutido nas páginas de solução (plano 6.1) e as páginas de recorte automotivo. `/privacidade` escrita em 10/10 (modelo da Motors, só com o que o código faz hoje): quando GA4, Pixel ou Turnstile entrarem, a página muda na mesma rodada (`tests/privacidade.test.ts` cobra).
- LCP da home: mediana 2,19 s no Lighthouse simulado (7 rodadas, igual antes e depois do refino visual), critério é 2,0 s. O que sobra antes do LCP é quase todo o JS do Next/React (138 KB gz). Medir no preview da Vercel antes de cortar mais.
- Próximas etapas da fase 1: conteúdo das páginas (5 soluções, hub automotivo + 2 recortes, case, preços, sobre, privacidade); formulário do diagnóstico + `/api/leads` (Supabase `v2o5-site`, Turnstile, rate limit, n8n, WhatsApp); camada de dados, GA4 e CAPI (os domínios entram na CSP); `sameAs` quando Perfil de Empresa, Instagram e LinkedIn existirem; IndexNow.
- Motors: respostas do Chatwoot pararam de contar como contato no funil desde 23/09 (detalhe em `memory/projects/case-motors.md`). Corrigir no repo da Motors antes de o case falar de atendimento.
- Validar o mapa de páginas no Planejador de Palavras-chave (precisa da conta Google Ads).
- No WordPress atual, até a troca: fechar `/wp-json/wp/v2/users` e o sitemap de autores.
