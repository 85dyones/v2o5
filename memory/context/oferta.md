# Oferta e preços

Fonte em código: `src/conteudo/precos.ts` (home, `/precos`, `llms.txt` e schema saem dela). Esta tabela repete os mesmos números e `tests/precos.test.ts` confere os dois lados.

## Linhas gerais (qualquer setor)
| Linha | Página | Implantação a partir de | Mensalidade a partir de |
|---|---|---|---|
| Sites e presença (institucional) | `/criacao-de-sites` | R$ 7.900 | R$ 590 |
| Agentes de IA no WhatsApp | `/agente-de-ia-para-whatsapp` | R$ 3.900 | R$ 790 |
| Automação de processos (n8n) | `/automacao-com-ia` | R$ 1.900 por fluxo | |
| CRM e sistemas sob medida | `/crm-com-whatsapp` | R$ 4.900 | R$ 590 |
| Rastreamento até a venda | `/rastreamento-de-conversoes` | R$ 2.900 | R$ 590 |
| Gestão de tráfego | `/gestao-de-trafego` | sem implantação com rastreamento ativo | R$ 1.800 + verba |
| Branding e gestão de marca | sem página ainda (cartão leva a `/diagnostico`) | R$ 1.500 por projeto | |

Piso da mensalidade: R$ 590 (Dyones, 10/10), porque ela cobre hospedagem e manutenção. Antes, site e rastreamento estavam em R$ 290.

Na home, as linhas se dividem nos dois pilares do H1 (mapa: branding, Perfil da Empresa, SEO, sites, tráfego, rastreamento; operação: agente, automação, CRM, integrações). Perfil da Empresa no Google e SEO técnico aparecem como cartões "incluso em Sites e presença"; Integrações entre sistemas, como cartão com o preço da automação por fluxo.

## Linhas novas (12/10, proposta de piso a confirmar pelo Dyones; ainda fora do site)
| Linha | Pilar | Implantação a partir de | Mensalidade a partir de | O que cobre |
|---|---|---|---|---|
| Painel do dono (BI e dashboards) | operação | R$ 3.900 | R$ 590 | funil, verba, custo por lead e vendas por origem; unificação de até 3 fontes (CRM, rastreamento, planilha ou ERP); fonte extra é um fluxo de automação |
| Reativação de base | operação | R$ 1.900 por campanha | | importação e higienização da base própria, segmentação, roteiro do agente, relatório de retorno; agente de IA e mensagens da API à parte |
| Conteúdo e redes com IA | mapa | R$ 1.500 (configuração) | R$ 990 | perfis configurados, calendário, 12 publicações/mês montadas do conteúdo existente com link rastreado, relatório; produção de foto, vídeo e peças pela parceira, vendida junto |
| Avaliações no Google | mapa | fluxo de automação (R$ 1.900) | | pedido de avaliação no WhatsApp depois da venda, com acompanhamento no painel |
| Anúncios de catálogo (automotivo) | mapa | R$ 1.900 | dentro do tráfego | feed do estoque para Vehicle Ads e catálogo da Meta |
| Pós-venda e recorrência | operação | fluxo de automação (R$ 1.900) | | régua de retorno (revisão, troca, seguro, recompra) no n8n |
Treinamento da equipe entra na implantação do CRM e do agente, sem preço próprio.

## Segmento automotivo
| Item | Implantação | Mensalidade |
|---|---|---|
| Site de estoque | R$ 7.900 | R$ 590 |
| Pacote completo (site, IA, CRM, rastreamento, integração Revenda Mais) | R$ 14.900 | R$ 1.990 |
| Pacote completo + tráfego | R$ 14.900 | R$ 3.290 + verba |
Pacote confirmado pelo Dyones em 10/10. Desconto do pacote: 24% sobre a soma das implantações (R$ 19.600) e 22% sobre a soma das mensalidades (R$ 2.560). O tráfego entra no pacote por R$ 1.300 (avulso é R$ 1.800). Argumento: com margem de R$ 7.000 por carro (referência do plano de mídia da Motors), uma venda a mais a cada 3 meses paga a mensalidade do pacote (3 × R$ 1.990 = R$ 5.970).

## Regras comerciais
- Sem fidelidade. Implantação 50% na assinatura + 50% na entrega, ou até 6x.
- A mensalidade inclui hospedagem, banco, manutenção, atualizações de segurança, monitoramento e relatório mensal (10/10; antes a hospedagem era repassada).
- Fora da mensalidade, pelo valor real e na mesma fatura, discriminados: uso do modelo de IA e mensagens da API oficial do WhatsApp.
- Verba de mídia paga direto ao Google e à Meta. Fotos e vídeos não incluídos.
- Cláusula de saída: código, dados e domínio entregues em até 15 dias.
- Diagnóstico gratuito: 45 min com o fundador + mapa em 24 h. Escassez "5 por semana" só se for verdade.
- Integração só é anunciada quando existe em produção (hoje: Revenda Mais).
- Tráfego pago só com o rastreamento até a venda ligado.

## Custo da mensalidade e pisos revisados (proposta de 12/10/2026, a confirmar pelo Dyones)
Custos de infra por cliente (páginas de preço lidas em 12/10/2026; dólar de referência R$ 5,40): Vercel Pro US$ 20/mês por assento de desenvolvedor, 1 TB de banda, compartilhado entre todos os clientes (vercel.com/pricing); Supabase Pro US$ 25/mês na organização e US$ 10/mês por projeto extra (Micro), 8 GB de disco por projeto, excedente US$ 0,125/GB (supabase.com/pricing); VPS Hostinger KVM 2 R$ 43,99 e KVM 4 R$ 59,99 por mês, compartilhada (n8n, Chatwoot, Evolution; hostinger.com/br). Hora do fundador valorada em R$ 150 (mercado de consultoria: R$ 70 a R$ 150).

| Linha | Infra/mês por cliente | Horas/mês | Custo | Piso atual | Margem | Piso proposto |
|---|---|---|---|---|---|---|
| Sites e presença (estático, sem banco) | ~R$ 40 | 1,5 | ~R$ 265 | R$ 590 | 55% | mantém R$ 590 |
| Rastreamento | ~R$ 20 | 2 | ~R$ 320 | R$ 590 | 46% | mantém R$ 590 |
| Agente de IA | ~R$ 40 (+ IA e WhatsApp repassados) | 3 | ~R$ 490 | R$ 790 | 38% | R$ 790 até 500 conversas/mês; +R$ 190 a cada 500 |
| CRM | ~R$ 80 (projeto Supabase + Chatwoot) | 3 | ~R$ 530 | R$ 590 | 10% | **R$ 790** com 5 usuários; usuário extra R$ 89/mês; acima de 20 mil contatos ou 8 GB: +R$ 190/mês |
| Painel do dono | ~R$ 80 (ou compartilha o projeto do CRM) | 3 | ~R$ 530 | (novo) | | **R$ 790** com 3 usuários e 3 fontes; usuário extra R$ 89/mês; fonte extra R$ 1.900 + R$ 190/mês; acima de 8 GB ou 1 milhão de linhas: compute do Supabase repassado + 20% |
| Conteúdo e redes com IA | ~R$ 250 (ferramentas e IA) | 4 | ~R$ 850 | (novo) | | R$ 1.500 de configuração + **R$ 1.290/mês** (12 posts, 2 redes) |

Referências do usuário extra: Power BI Pro R$ 80,10/usuário/mês (beanalytic, jul/2026); Cubo Suite R$ 267/mês com 3 usuários e R$ 89 por usuário extra (blog.cubosuite.com.br, 2026).
Pacote automotivo: soma das mensalidades passa a R$ 2.760 (590 + 790 + 790 + 590); pacote segue em R$ 1.990 (28% abaixo), com 5 usuários; usuário extra R$ 89.
Cláusula: reajuste anual pelo IPCA e repasse de variação cambial acima de 10% nos itens em dólar (Vercel, Supabase, modelos de IA).

**Tráfego, reestruturado**: Google Ads R$ 1.200/mês + verba (Pesquisa, Performance Max, feed de veículos ou Shopping quando couber); Meta Ads R$ 1.200/mês + verba (catálogo de veículos ou produtos como diferencial, públicos da base do CRM, CAPI); os dois juntos R$ 1.990/mês (bônus: feed de catálogo, que vale R$ 1.900, incluso). Substitui a linha única de R$ 1.800. No pacote automotivo os dois continuam a R$ 1.300. Sempre com rastreamento ligado.

**Reativação de base, estrutura**: R$ 1.900 por campanha inclui extração dos dados (ERP, planilha, CRM ou portal), formatação e higienização (deduplicação, DDD, validação do número, opt-out prévio), segmentação, roteiro em duas variantes, cadência e relatório de retorno (respostas, agendamentos, vendas no CRM). Até 5 mil contatos e um canal; canal extra R$ 490; cada 5 mil contatos a mais R$ 290; campanha recorrente depois da primeira R$ 990/mês. Custos do cliente, repassados pelo valor da operadora ou da Meta:
- WhatsApp oficial (Cloud API, sem BSP): R$ 0,3217 por mensagem de marketing (tabela de fornecedor vigente desde 07/2026; confirmar no painel da Meta). Limites por qualidade: 250/dia sem verificação, depois 1.000, 10.000 e 100.000 por dia conforme o tier; bloqueios acima de 2% reduzem o limite e acima de 5% suspendem; suspensão de 24 a 72 h na primeira infração (clickmassa.com.br, 2026). Opt-out em toda mensagem ("responda PARAR"), template aprovado, 1 a 2 mensagens promocionais por semana.
- WhatsApp não oficial (Evolution): sem tarifa por mensagem; custo do número dedicado (chip) e R$ 290 por número/mês de operação (instância, aquecimento de 7 a 14 dias com volume crescente, monitoramento). Risco: banimento do número, permanente na primeira ocorrência grave, e sem suporte da Meta; só com termo de aceite do cliente, número exclusivo da campanha (nunca o número principal da loja) e volume de centenas de mensagens por dia, no máximo.
- SMS: R$ 0,05 a R$ 0,10 por mensagem, pré-pago sem mensalidade (Comtele R$ 0,10 no pacote de 500; SMS Barato R$ 0,079 por 1.000; Zenvia de R$ 0,10 a R$ 0,052 por faixa de volume; páginas lidas em 12/10/2026).

## Referência de mercado das linhas novas (pesquisa de 12/10/2026, páginas públicas brasileiras)
Fontes comerciais (blogs de agências, tabelas de fornecedores); nenhuma é levantamento oficial. Cada número abaixo tem a fonte e a data ao lado.

**Gestão de redes sociais (fee mensal, sem verba de anúncio)**
- Freelancer: R$ 800 a R$ 1.500/mês por 8 a 12 posts (plusbusiness.com.br, jun/2026; post2go.com.br, guia 2026: R$ 800 a R$ 1.500 por 10 posts). Azz Agência (jun/2026): freelancer R$ 500 a R$ 1.200; pacote básico R$ 800 a R$ 1.200 (1 a 2 redes, 8 a 12 posts, relatório mensal); intermediário R$ 1.200 a R$ 2.500 (12 a 20 posts, stories, comentários); completo R$ 2.500 a R$ 5.000 (com vídeo e tráfego).
- Agência pequena: R$ 1.000 a R$ 3.500/mês (plusbusiness, jun/2026); post2go (2026) cita R$ 2.000 a R$ 4.000 por 1 rede e R$ 4.000 a R$ 8.000 por 3 redes.
- Tabela pública da TagX (Florianópolis, lida em 12/10/2026): Essencial R$ 1.090/mês (1 rede, até 8 posts), Crescimento R$ 1.590 (até 2 redes, até 12 posts, relatório), Domínio R$ 2.290 (até 3 redes, até 20 posts). Edição de vídeo só com material do cliente; produção de vídeo e resposta a mensagens fora de todos os planos; ciclo mínimo de 3 meses.
- Ferramentas de agendamento e IA: mLabs R$ 139 a R$ 739/mês, Etus R$ 99 a R$ 346, Post2GO R$ 297 a R$ 897 (post2go, 2026).

**BI e dashboards**
- Consultoria Power BI: hora de R$ 50 a mais de R$ 150 conforme senioridade; dashboard simples leva 40 a 80 horas; projeto pontual "parte de alguns milhares de reais" (beanalytic.com.br, 28/07/2026). Data Facts (nov/2025, revisado jan/2026): projetos pequenos R$ 5.000 a R$ 15.000 (dashboards pontuais, fontes simples), médios R$ 20.000 a R$ 50.000, enterprise acima de R$ 100.000; fee mensal de sustentação sem valor publicado.
- Licença à parte: Power BI Pro R$ 80,10 por usuário/mês (beanalytic, jul/2026). A V2O5 não precisa dela: o painel roda na própria base (Supabase) com visualização própria ou Looker Studio.

**Automação por fluxo (n8n)**
- Hora de Codar (24/07/2025): simples R$ 400 a R$ 900 (dois sistemas, 2 a 3 nós); intermediária R$ 900 a R$ 2.500 (várias integrações, condições, tratamento de erro); avançada R$ 2.500 a R$ 10.000 ou mais (APIs, WhatsApp, IA, banco). Manutenção mensal citada em blogs do setor entre R$ 200 e R$ 900 conforme o volume de fluxos (sem tabela oficial).

**Mensagens no WhatsApp (API oficial da Meta, Brasil)**
- A Meta publica as tarifas em BRL só em CSV/PDF (developers.facebook.com/docs/whatsapp/pricing, vigência 1º/07/2026). Tabelas de fornecedores (wizebot.com.br, 2026): marketing R$ 0,3217 por mensagem entregue, utilidade e autenticação R$ 0,035, com desconto por volume só nas duas últimas. Plataformas (BSP) cobram mensalidade à parte: R$ 97 a R$ 997 ou R$ 299 a R$ 5.299 conforme a fonte (socialhub.pro, clickmassa, 2026). Não achei agência cobrando "por campanha" de reativação: o preço de mercado é tarifa × volume + plataforma + operação.
- Para disparo de marketing, só a API oficial: número não oficial (Evolution) em broadcast é risco de banimento (clickmassa.com.br, 2026).

**Avaliações no Google**
- Ferramentas: Miora (brasileira, pedido de avaliação pelo WhatsApp) "sob consulta"; Birdeye a partir de US$ 299/mês por unidade; Yext/Birdeye citados a partir de R$ 1.800/mês em conteúdo patrocinado (jornaldebrasilia, 2026). Sites que vendem avaliação falsa (R$ 30 a R$ 550) violam as regras do Google: fora.

**Anúncios de catálogo (Vehicle Ads e catálogo da Meta)**
- Sem preço público de agência no Brasil. Setup básico de Merchant Center vendido como produto a R$ 189,90 (loja.midiamatic.com.br), sem feed de veículos. Provedores de feed citados pelo Google (Fullpath, Ansira) não publicam preço. Referência técnica: ativação em Configurações > Complementos do Merchant Center; preço da página tem de bater com o feed; clique cobrado por CPC (support.google.com, lido em 12/10/2026).

**Marketing automotivo (plataformas)**
- AutoForce (Autódromo CMS, NitroAds, AutoPilot CRM): mensalidades históricas de R$ 794,80 (Starter) a R$ 1.987 (Champion) por marca, mais setup por site (projetodraft.com, 2019 a 2021; sem tabela 2026 pública). Autoconf, AutoSDR e Revenda Mais: ver seção abaixo (08/10).

## Referência de mercado (páginas públicas, 08/10/2026)
Revenda Mais: gerencial R$ 600 + CRM R$ 500 + NF-e R$ 400 por mês. Autoconf: R$ 299 a 899; IA R$ 1.199. AutoSDR: R$ 387 / 777 / 1.297. IAEO: chatbot R$ 2 a 5 mil/mês, automação R$ 5 a 15 mil, sistema R$ 15 a 50 mil.
