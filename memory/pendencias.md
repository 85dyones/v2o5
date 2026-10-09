# Pendências

Atualize ao resolver: mova a decisão para `decisoes.md` e apague daqui.

## Do Dyones
1. Foto para a página Sobre e a assinatura dos guias.
2. Agenda: recomendação Cal.com ligado ao Google Agenda (webhook dispara `schedule_call`).
3. GTM server-side: recomendação deixar para a fase 3.
4. Contas: recomendação projeto novo na Vercel (time atual); criar conta Google Ads da V2O5. O Supabase do site já existe (`v2o5-site`).
5. Crédito "Desenvolvido por V2O5" no rodapé da Motors (recomendado).
6. CNAE: conferir com o contador se cobre site, sistema e tráfego (principal hoje é 7490-1/04).
7. Persistência dos plugins: instalar pela conta do claude.ai ou registrar no `.claude/settings.json` do repo.
8. OK para criar o projeto na Vercel e medir o protótipo no preview (PageSpeed).
9. WhatsApp e e-mail públicos para o rodapé (hoje "a confirmar").

## Técnicas
- LCP da home: mediana 2,2 s no Lighthouse simulado (7 rodadas), critério é 2,0 s. O que sobra antes do LCP é quase todo o JS do Next/React (138 KB gz). Medir no preview da Vercel antes de cortar mais.
- Próximas etapas da fase 1: conteúdo das páginas (5 soluções, hub automotivo + 2 recortes, case, preços, sobre, privacidade); formulário do diagnóstico + `/api/leads` (Supabase `v2o5-site`, Turnstile, rate limit, n8n, WhatsApp); camada de dados, GA4 e CAPI (os domínios entram na CSP); `sameAs` quando Perfil de Empresa, Instagram e LinkedIn existirem; IndexNow.
- Motors: respostas do Chatwoot pararam de contar como contato no funil desde 23/09 (detalhe em `memory/projects/case-motors.md`). Corrigir no repo da Motors antes de o case falar de atendimento.
- Validar o mapa de páginas no Planejador de Palavras-chave (precisa da conta Google Ads).
- No WordPress atual, até a troca: fechar `/wp-json/wp/v2/users` e o sitemap de autores.
