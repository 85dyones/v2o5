# Pendências

Atualize ao resolver: mova a decisão para `decisoes.md` e apague daqui.

## Do Dyones
1. Variação final do logo (família C1). No código, troca em `SIMBOLO_ATUAL` (`src/lib/marca.ts`).
2. Foto para a página Sobre e a assinatura dos guias.
3. Agenda: recomendação Cal.com ligado ao Google Agenda (webhook dispara `schedule_call`).
4. GTM server-side: recomendação deixar para a fase 3.
5. Contas: recomendação projeto novo na Vercel (time atual); criar conta Google Ads da V2O5. O Supabase do site já existe (`v2o5-site`).
6. Crédito "Desenvolvido por V2O5" no rodapé da Motors (recomendado).
7. CNAE: conferir com o contador se cobre site, sistema e tráfego (principal hoje é 7490-1/04).
9. H1 da home: opção A (no ar em `/`) ou B (`/variantes/titulo-b`). Recomendação: A.
10. OK para criar o projeto na Vercel e medir o protótipo no preview (PageSpeed).
11. WhatsApp e e-mail públicos para o rodapé (hoje "a confirmar").
8. Persistência dos plugins: instalar pela conta do claude.ai ou registrar no `.claude/settings.json` do repo.

## Técnicas
- LCP da home: mediana 2,2 s no Lighthouse simulado (7 rodadas), critério é 2,0 s. O que sobra antes do LCP é quase todo o JS do Next/React (138 KB gz). Medir no preview da Vercel antes de cortar mais.
- Próximas etapas do site: formulário do diagnóstico + `/api/leads`, demais páginas da fase 1, SEO completo (schema, sitemap, redirecionamentos).
- Motors: respostas do Chatwoot pararam de contar como contato no funil desde 23/09 (detalhe em `memory/projects/case-motors.md`). Corrigir no repo da Motors antes de o case falar de atendimento.
- Validar o mapa de páginas no Planejador de Palavras-chave (precisa da conta Google Ads).
- No WordPress atual, até a troca: fechar `/wp-json/wp/v2/users` e o sitemap de autores.
