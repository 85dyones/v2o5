# Oferta e preços

> **Em 25/10/2026 o Dyones decidiu que só o Sprint de Eficiência e a recorrência que o acompanha têm valor público** ("preços só dos sprints", "manter apenas o descrito no plano atualizado no apêndice"). Os planos, o tráfego, os módulos, os serviços e o fotógrafo parceiro abaixo são **dado interno de referência: não aparecem no site, na vitrine, no `llms.txt`, no schema nem no agente do n8n**. `tests/precos-nao-publicados.test.ts` trava isso. A seção "Sprint de Eficiência e continuidade", no fim, é a única oferta pública.

> **Três Sprints, um guarda-chuva (25/10/2026, Dyones).** A partir de hoje a V2O5 vende três Sprints (Essencial, Integrada e Avançada, faixas em `sprint.ts`). Todo serviço vem de dentro deles, identificado a partir de um Sprint e costurado sob medida: os módulos (painel, reativação e campanhas, funil sob medida, consulta veicular, área de repasse) saem de cena como oferta, e os serviços (redes, comentários e Direct, branding, fotógrafo, tráfego) viram capacidades do catálogo da home. Os pacotes do segmento automotivo (Mapa = Presença, Operação com IA = Atendimento, Completo) são modelos de Sprint para revendas: Mapa e Operação com IA na Sprint Integrada, Completo na Sprint Avançada. A mensalidade da Presença subiu de R$ 990 para R$ 1.200, o piso da faixa de continuidade. O tráfego é capacidade dentro do Sprint e a gestão mensal é recorrência. A tabela abaixo segue como referência interna para compor propostas. Entrega-base do site em `src/conteudo/sitePadrao.ts`.

Fonte em código: `src/conteudo/precos.ts` (home, `/precos`, hub automotivo, páginas de solução, `llms.txt` e schema saem dela). Esta página repete os mesmos números e `tests/precos.test.ts` confere os dois lados.

**Cardápio de 15/10/2026 (Dyones).** Três planos com preço fechado no lugar das quinze linhas avulsas, o tráfego como serviço à parte, módulos para quem já tem o sistema e serviços. Quem chega escolhe pelo problema que tem; a venda adicional mora nos módulos. Proposta e margens no artefato "Cardápio enxuto" (https://claude.ai/artifact/HqR5Q1rwjJ7Enbx1JtpoxY). Respostas do Dyones em 15/10: planos "concordo"; painel do dono como extra e, no site, bônus de fechamento do Completo; módulos "concordo"; placa a R$ 49,90 ("precisamos de um lucro"); SMS "foi testado, está funcional"; branding fora da tabela, anunciado como serviço sob consulta; manutenção do Completo "passa de 7 horas, ajuste", com "bônus temporário pelo preço de R$ 1.990".

## Planos
| Plano | Para quê | Inclui | Implantação a partir de | Mensalidade a partir de |
|---|---|---|---|---|
| Presença | Ser encontrado no Google e saber de onde vem cada contato | site institucional ou de estoque, Perfil da Empresa no Google, SEO técnico, rastreamento até a venda, pedido de avaliação no WhatsApp, relatório mensal | R$ 8.900 | R$ 1.200 |
| Atendimento | Responder na hora, sem perder o contato | agente de IA no WhatsApp (500 conversas/mês), CRM com funil, aviso de lead parado e 5 usuários, passagem para a equipe, treinamento, banco próprio e backups | R$ 7.900 | R$ 1.590 |
| Completo | Do anúncio à venda, tudo ligado e medido (o sistema da Motors Store) | tudo da Presença e do Atendimento, integração com o sistema de gestão, um fluxo de automação, tráfego das duas plataformas por R$ 1.300/mês se quiser | R$ 14.900 | R$ 2.290 de tabela; **R$ 1.990 por tempo limitado, até 31/12/2026** |

- Separados, Presença e Atendimento somam R$ 16.800 + R$ 2.790/mês.
- **Bônus de fechamento do Completo:** a implantação do Painel do dono (R$ 3.900) fica por conta da V2O5; a mensalidade do painel (R$ 490) segue (confirmado pelo Dyones em 15/10).
- O preço temporário vale até 31/12/2026 (confirmado pelo Dyones em 15/10); `tests/precos.test.ts` falha quando a data passa, para a oferta não ficar no ar vencida.
- Piso da mensalidade: R$ 690 (rastreamento sozinho). Nenhuma mensalidade que mantém sistema no ar fica abaixo dele; os módulos rodam em cima da mensalidade do plano.

## Tráfego
| Linha | Implantação | Mensalidade a partir de |
|---|---|---|
| Google Ads ou Meta Ads (cada plataforma) | sem implantação, com o rastreamento ativo | R$ 1.200 + verba |
| Google Ads e Meta Ads juntos | sem implantação | R$ 1.990 + verba, feed de catálogo incluso (R$ 410 a menos que as duas separadas) |
| Google Ads e Meta Ads no Completo | sem implantação | R$ 1.300 + verba |
| Rastreamento sozinho (para quem já tem site) | R$ 2.900 | R$ 690 |

Meta Ads inclui anúncios de clique para o WhatsApp (Dyones, 14/10: "tráfego pago meta envolve WhatsApp também"). Completo com as duas plataformas: R$ 3.290/mês + verba durante a oferta.

## Módulos (para quem tem Atendimento ou Completo)
| Módulo | Onde aparece | Implantação a partir de | Mensalidade a partir de | Uso e degraus |
|---|---|---|---|---|
| Painel do dono | `/precos` | R$ 3.900 (bônus no Completo) | R$ 490 | 3 usuários e 3 fontes inclusos; usuário extra R$ 89/mês; fonte extra e infra acima do incluso na proposta comercial |
| Reativação e campanhas | `/precos` | R$ 1.900 | R$ 290 | base importada e segmentada, SMS com link rastreado e monitor; campanha de WhatsApp operada pela V2O5 R$ 950; 3 campanhas por R$ 2.490; SMS e mensagens pelo valor do provedor |
| Funil sob medida | `/precos` | R$ 1.900 por projeto | sem | etapas, motivos, aviso de lead parado e transferência ajustados ao processo |
| Consulta veicular completa | hub de revendas | R$ 990 | R$ 190 | R$ 49,90 por placa (custo do provedor perto de R$ 30, APIBrasil "Veículos Total"); FIPE do mês sem custo; placa repetida sem custo |
| Área de repasse | hub de revendas | R$ 2.900 | R$ 390 | vitrine às claras para lojistas e consumidores |

Antes de vender repasse e consulta para outra loja: tirar o que é da Motors (nome "Repasse Motors", assistente Ney, textos de Curitiba, fotos pelo feed do Revenda Mais). As tabelas novas já separam os dados por loja; as do funil ainda não.

## Serviços
| Serviço | Implantação a partir de | Mensalidade a partir de |
|---|---|---|
| Conteúdo e gestão de redes sociais | R$ 1.500 | R$ 1.699 (2 redes, 12 publicações por mês; produção de foto, vídeo e peças à parte; resposta a comentários e mensagens à parte) |
| Gestão de comentários e Direct | R$ 1.900 | R$ 590, somada ao conteúdo (automação no Instagram e no Facebook, 500 conversas por mês; R$ 190 a cada 500 a mais; uso do modelo de IA repassado; o que a automação não resolve vai para a equipe do cliente) |
| Fluxo de automação | R$ 1.900 por fluxo | sem (manutenção na mensalidade do plano) |
| Branding e gestão de marca | sob consulta | sob consulta |

## O que cresce e o que fica fora
- Usuário extra R$ 89/mês. Cada 500 conversas a mais do agente R$ 190/mês. Acima de 20 mil contatos ou 8 GB de dados no CRM, R$ 190/mês.
- Reajuste: IPCA ao ano e repasse de variação cambial acima de 10% só nos itens em dólar (Vercel, Supabase, modelos de IA).
- Fora da mensalidade, pelo valor real e na mesma fatura: uso do modelo de IA, mensagens da API oficial do WhatsApp e SMS. Verba de mídia paga direto ao Google e à Meta.
- Fotógrafo parceiro indicado, a partir de R$ 890 por mês (Dyones, 13/10). Preço do parceiro; sem nome no site.
- **Desconto fidelidade (interno, fora do site):** clientes antigos pagam a tabela com 27,5% de desconto, arredondado; R$ 690 vira R$ 500 por mês (Dyones, 14/10/2026, na renovação do atendimento da 16ª Vara Cível).

## Onde cada cartão da home aponta
O preço de cada cartão sai de `precoDa` (`CAPACIDADES` em `precos.ts`): o plano em que a peça mora ou a linha própria.

| Cartão | Mora em | Página |
|---|---|---|
| Sites e presença, Avaliações no Google | plano Presença | `/criacao-de-sites`, `/diagnostico` |
| Rastreamento até a venda | linha própria (sozinho) ou plano Presença | `/rastreamento-de-conversoes` |
| Tráfego no Google e na Meta, Anúncios de catálogo | tráfego | `/precos#titulo-trafego` (19/10; `/gestao-de-trafego` responde 307 para lá até ganhar texto) |
| Agente de IA no WhatsApp, CRM | plano Atendimento | `/agente-de-ia-para-whatsapp`, `/crm-com-whatsapp` |
| Painel do dono, Reativação de base | módulos | `/diagnostico` |
| Automação de processos, Pós-venda, Integrações | fluxo de automação | `/automacao-com-ia`, `/diagnostico` |
| Conteúdo e gestão de redes sociais, Branding (Gestão de comentários e Direct só na tabela) | serviços | `/diagnostico` |

## Segmento automotivo
O hub `/segmentos/revendas-de-veiculos` vende o plano Completo com o site de estoque (R$ 14.900 + R$ 1.990/mês até 31/12/2026; depois R$ 2.290), os módulos de revenda (consulta veicular, área de repasse) e o tráfego no Completo (R$ 1.300). Argumento: com margem de R$ 7.000 por carro (referência do plano de mídia da Motors), uma venda a mais a cada 3 meses paga a mensalidade do Completo. Revenda Mais em produção; Autoconf, BNDV, Boom, Altimus e Syonet integráveis por fluxo.

## Regras comerciais
- Sem fidelidade. Implantação 50% na assinatura + 50% na entrega, ou até 6x.
- A mensalidade inclui hospedagem, banco, manutenção, atualizações de segurança, monitoramento e relatório mensal.
- Cláusula de saída: código, dados e domínio entregues em até 15 dias.
- Diagnóstico gratuito: 45 min com o fundador + mapa em 24 h. Escassez "5 por semana" só se for verdade.
- Integração só é anunciada como "em produção" quando existe (hoje: Revenda Mais).
- Tráfego pago só com o rastreamento até a venda ligado.
- Reativação só com base própria, com registro de origem e saída fácil; lista comprada ou raspada não entra.

## Margem da mensalidade por plano (15/10/2026, estimativa)
Custo pela tabela de 12/10 (abaixo): infra por cliente e hora do fundador a R$ 150. A coluna integrada supõe um relatório e um suporte por cliente; horas estimadas, não medidas.

| Item | Mensalidade | Custo integrado | Margem |
|---|---|---|---|
| Presença | R$ 1.200 | R$ 510 (3 h) | 58% |
| Atendimento | R$ 1.590 | R$ 870 (5 h) | 45% |
| Completo de tabela | R$ 2.290 | acima de R$ 1.230 (mais de 7 h, Dyones 15/10) | abaixo de 46% |
| Completo na oferta | R$ 1.990 | acima de R$ 1.230 | abaixo de 38% |
| Painel do dono | R$ 490 | R$ 225 (1,5 h, banco do CRM) | 54% |
| Reativação e campanhas | R$ 290 | R$ 75 | 74% |
| Consulta veicular | R$ 190 | R$ 75 | 61% (e R$ 19,90 por placa, 40%) |
| Área de repasse | R$ 390 | R$ 160 | 59% |
| Conteúdo e gestão de redes sociais | R$ 1.699 | R$ 850 (4 h e ferramentas) | 50% |
| Gestão de comentários e Direct | R$ 590 | R$ 330 (2 h e VPS) | 44% |

## Histórico
- 15/10/2026: entra Gestão de comentários e Direct, R$ 1.900 + R$ 590/mês, separada do conteúdo (Dyones: "gestão é um valor a parte, vamos fazer com automação").
- 15/10/2026: "Conteúdo e redes com IA" (R$ 1.500 + R$ 1.290/mês) vira "Conteúdo e gestão de redes sociais" a R$ 1.500 + R$ 1.699/mês (sobe só a mensalidade), sem "IA" no nome; escopo igual (2 redes, 12 publicações, produção à parte). Referência de mercado: TagX Crescimento R$ 1.590 (até 2 redes, até 12 posts).
- 10/10 a 14/10/2026: tabela de quinze linhas em dois pilares (site R$ 7.900 + R$ 690, rastreamento R$ 2.900 + R$ 690, agente R$ 3.900 + R$ 790, CRM e painel R$ 4.900 + R$ 790, reativação R$ 950 por campanha, branding R$ 1.500), piso de R$ 690 e teto de R$ 1.990 para as linhas de sistema, pacote automotivo R$ 14.900 + R$ 1.990. Substituída pelo cardápio de 15/10.

## Custo da mensalidade e pisos revisados (12/10/2026; base da tabela de margem acima)
Custos de infra por cliente (páginas de preço lidas em 12/10/2026; dólar de referência R$ 5,40): Vercel Pro US$ 20/mês por assento de desenvolvedor, 1 TB de banda, compartilhado entre todos os clientes (vercel.com/pricing); Supabase Pro US$ 25/mês na organização e US$ 10/mês por projeto extra (Micro), 8 GB de disco por projeto, excedente US$ 0,125/GB (supabase.com/pricing); VPS Hostinger KVM 2 R$ 43,99 e KVM 4 R$ 59,99 por mês, compartilhada (n8n, Chatwoot, Evolution; hostinger.com/br). Hora do fundador valorada em R$ 150 (mercado de consultoria: R$ 70 a R$ 150).

| Linha | Infra/mês por cliente | Horas/mês | Custo | Piso atual | Margem | Piso proposto |
|---|---|---|---|---|---|---|
| Sites e presença (estático, sem banco) | ~R$ 40 | 1,5 | ~R$ 265 | R$ 590 | 55% | mantém R$ 590 |
| Rastreamento | ~R$ 20 | 2 | ~R$ 320 | R$ 590 | 46% | mantém R$ 590 |
| Agente de IA | ~R$ 40 (+ IA e WhatsApp repassados) | 3 | ~R$ 490 | R$ 790 | 38% | R$ 790 até 500 conversas/mês; +R$ 190 a cada 500 |
| CRM | ~R$ 80 (projeto Supabase + Chatwoot) | 3 | ~R$ 530 | R$ 590 | 10% | **R$ 790** com 5 usuários; usuário extra R$ 89/mês; acima de 20 mil contatos ou 8 GB: +R$ 190/mês |
| Painel do dono | ~R$ 80 (ou compartilha o projeto do CRM) | 3 | ~R$ 530 | (novo) | | **R$ 790** com 3 usuários e 3 fontes; usuário extra R$ 89/mês; fonte extra R$ 1.900 + R$ 190/mês; acima de 8 GB ou 1 milhão de linhas: compute do Supabase repassado + 20% |
| Conteúdo e redes com IA | ~R$ 250 (ferramentas e IA) | 4 | ~R$ 850 | (novo) | | R$ 1.500 de configuração + ~~R$ 1.290/mês~~ **R$ 1.699/mês** desde 15/10 (12 posts, 2 redes) |

Referências do usuário extra: Power BI Pro R$ 80,10/usuário/mês (beanalytic, jul/2026); Cubo Suite R$ 267/mês com 3 usuários e R$ 89 por usuário extra (blog.cubosuite.com.br, 2026).
Pacote automotivo: soma das mensalidades passou a R$ 2.760 (590 + 790 + 790 + 590) em 12/10 e a R$ 2.960 com o piso de R$ 690 em 13/10; pacote segue em R$ 1.990 (33% abaixo), com 5 usuários; usuário extra R$ 89.
Cláusula: reajuste anual pelo IPCA e repasse de variação cambial acima de 10% nos itens em dólar (Vercel, Supabase, modelos de IA).

**Tráfego, reestruturado**: Google Ads R$ 1.200/mês + verba (Pesquisa, Performance Max, feed de veículos ou Shopping quando couber); Meta Ads R$ 1.200/mês + verba (catálogo de veículos ou produtos como diferencial, anúncios de clique para o WhatsApp, públicos da base do CRM, CAPI); os dois juntos R$ 1.990/mês (bônus: feed de catálogo, que vale R$ 1.900, incluso). Substitui a linha única de R$ 1.800. No pacote automotivo os dois continuam a R$ 1.300. Sempre com rastreamento ligado.

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

**Gestão de comentários e Direct (pesquisa de 15/10/2026)**
- Feita por pessoa: pacotes de R$ 800 a R$ 1.500 não incluem; de R$ 1.500 a R$ 3.500 incluem, em horário comercial (jamilefernandes.com.br, atualizado em 19/08/2026). Pacotes com monitoramento ativo de comentários e mensagens passam de R$ 5.000 (agenciadbox.com.br, 25/08/2026).
- Robô de atendimento (WhatsApp, site, Instagram): implantação R$ 500 a R$ 3.000; mensalidade R$ 80 a R$ 250 com fluxo fixo, R$ 300 a R$ 600 com IA conversacional, R$ 600 a R$ 1.200 integrado ao CRM (spinmidia.com.br, 03/06/2026).
- Automação de Instagram com IA: MVP de um fluxo R$ 2.000 a R$ 3.000 + R$ 800/mês (gruponogueiramkt.com, 15/01/2025; vende o serviço e os números da página divergem entre seções).
- Ferramentas: ManyChat Pro a partir de US$ 15/mês por contatos ativos, IA US$ 29/mês (eesel.ai, 2026); WiiChat R$ 197 e R$ 297/mês; BotConversa R$ 189 e R$ 199/mês no anual, foco em WhatsApp.
- Meta: sem tarifa por mensagem na API do Instagram (fontes de terceiros: blotato, getphyllo, 2026). Resposta privada a comentário: uma mensagem, em até 7 dias; a conversa continua na janela de 24 h se a pessoa responder (developers.facebook.com, Private Replies).

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


## Sprint de Eficiência e continuidade (aprovado em 25/10/2026)
Fonte: apêndice de `CLAUDE_SITE_IMPLEMENTATION_AJUSTADO.md`, aprovado por inteiro pelo Dyones em 25/10. Código em `src/conteudo/sprint.ts`; página `/precos#titulo-sprint`. Preço fechado em proposta; as faixas são de referência e a duração não é promessa.
- Sprint Essencial: a partir de R$ 3.000, 1 a 2 semanas. Faixa interna de referência: R$ 3.000 a R$ 5.000.
- Sprint Integrada (oferta principal): a partir de R$ 6.000, 2 a 4 semanas. Faixa interna de referência: R$ 6.000 a R$ 12.000.
- Sprint Avançada: a partir de R$ 12.000, 4 a 8 semanas ou mais. Faixa interna de referência: R$ 12.000 a R$ 25.000 ou mais.
- Decisão de 26/10/2026 (Dyones): o público vê só o "a partir de" de cada Sprint, "o teto máximo pode afugentar"; as faixas com teto ficam como referência interna para montar proposta. A recorrência mensal segue em faixa (R$ 1.200 a R$ 2.500 e R$ 2.500 a R$ 5.000).
- Estabilidade e suporte: R$ 1.200 a R$ 2.500 por mês.
- Evolução contínua: R$ 2.500 a R$ 5.000 por mês.
- Recorrência: na maioria dos projetos há uma parte recorrente, e pode haver em todos; é contrato à parte, opcional, com limites de atendimento e escopo escritos. Faixas de referência, valor em contrato (Dyones, 25/10).
- Pagamento: 50% na contratação, 30% na validação intermediária e 20% no aceite final; Sprints pequenas, 50% e 50%.
- Fora da política pública: descontos (só com contrapartida), margem e horas internas. Período de correção de defeitos: definido na proposta, sem prazo publicado. Termos contratuais a validar com assessoria antes de contratar.
