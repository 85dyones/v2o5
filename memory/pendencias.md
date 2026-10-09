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
9. WhatsApp e e-mail públicos para o rodapé (hoje "a confirmar").
10. Proposta: "Pergunte ao agente" no hero, uma conversa real com o agente da V2O5 (a demonstração do próprio produto). Precisa de backend, custo de IA e aviso de privacidade; fase 2.
11. Foto do Dyones para a página Sobre, a Visão 360 e a assinatura dos guias. Confirmar que a Top Soluções Imobiliárias não se opõe a ser citada (o nome aparece na Visão 360 desde 09/10).
12. SEO contínuo e Perfil da Empresa avulsos (sem site da V2O5): publicar preço próprio? Hoje aparecem como inclusos em Sites e presença. Página própria para Branding (hoje o cartão leva a `/diagnostico`), e para SEO e Perfil se virarem linha (`/branding`, `/seo`, `/perfil-da-empresa-no-google`), depois do Planejador de Palavras-chave.

## Técnicas
- LCP da home: mediana 2,19 s no Lighthouse simulado (7 rodadas, igual antes e depois do refino visual), critério é 2,0 s. O que sobra antes do LCP é quase todo o JS do Next/React (138 KB gz). Medir no preview da Vercel antes de cortar mais.
- Próximas etapas da fase 1: conteúdo das páginas (5 soluções, hub automotivo + 2 recortes, case, preços, sobre, privacidade); formulário do diagnóstico + `/api/leads` (Supabase `v2o5-site`, Turnstile, rate limit, n8n, WhatsApp); camada de dados, GA4 e CAPI (os domínios entram na CSP); `sameAs` quando Perfil de Empresa, Instagram e LinkedIn existirem; IndexNow.
- Motors: respostas do Chatwoot pararam de contar como contato no funil desde 23/09 (detalhe em `memory/projects/case-motors.md`). Corrigir no repo da Motors antes de o case falar de atendimento.
- Validar o mapa de páginas no Planejador de Palavras-chave (precisa da conta Google Ads).
- No WordPress atual, até a troca: fechar `/wp-json/wp/v2/users` e o sitemap de autores.
