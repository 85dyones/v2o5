# Cronograma dos reels e da frequência nas redes (17/11/2026)

Decisões do Dyones em 17/11: lote 1 sem aparecer em vídeo; começar pelos lotes 1 e 2 (lotes 3 e 4 só depois do portão); frequência de posts nas três redes (Instagram, Facebook, LinkedIn); o Instagram tem 7 seguidores hoje.

## O efeito dos 7 seguidores
O PDF diz que o reel de teste exige 200 seguidores na conta profissional (conferir no app). Com 7, o reel comum já alcança quem não segue (o Instagram recomenda reel na aba Reels), então o método de lotes, leitura e repetição roda igual. O reel de teste entra quando o botão Teste aparecer. Até lá: reel comum, um arquivo por post, nunca o mesmo vídeo duas vezes.

Por isso o plano tem duas frentes: a **Fase A**, que monta a base (perfis alinhados e posts de fundação), e os **lotes 1 e 2**, que já são conteúdo e já crescem a base.

## Quadro geral

| Fase | Datas | O que acontece |
|---|---|---|
| A. Base e fundação | qua 18/11 a dom 29/11 | Perfis alinhados, GA4, convite à rede de contatos, 12 dias de posts de fundação, ficha e prompts prontos |
| Lote 1 (25 testes novos) | seg 30/11 a dom 06/12 | Produção seg 30/11, posts ter 01/12 a sáb 05/12, leitura dom 06/12 |
| Lote 2 (15 variações + 10 testes) | seg 07/12 a dom 13/12 | Mesma mecânica, a partir dos 3 vencedores |
| Portão | seg 14/12 | Decide lotes 3 e 4 (datas depois do Natal, a combinar) |

Se o ritmo se mostrar pesado na primeira semana, o lote 2 cai para 15 reels (10 variações e 5 testes) e o resto segue.

## Fase A em detalhes (18 a 29/11)

| Dia | Dyones | Claude |
|---|---|---|
| qua 18 e qui 19 | Confere se a opção Teste aparece no Instagram; cria a página do Facebook; corrige nome, site e sobre do LinkedIn; bio e link do Instagram (`docs/social/perfis.md`) | Fecha `docs/reels/` (ficha, prompts, planilha) e abre o PR |
| sex 20 | Liga o GA4 na Vercel (pendência 16) e marca `generate_lead` como evento-chave | Testa o caminho do `utm_content` ponta a ponta com um lead de teste |
| sáb 21 a dom 29 | Posta a sequência de fundação (abaixo); convida contatos a seguir | Roteiros e legendas dos posts de fundação, adaptados por rede |
| até sex 27 | Aprova a promessa única (texto abaixo) e a ficha do produto | Roteiros dos 25 ganchos do lote 1 (prompts 3 e 4) |

**Sequência de fundação, 12 dias (sáb 21 a qui 26/11 e sex 27 a dom 29/11, sem reel de teste):**
apresentação da V2O5; como funciona o diagnóstico de 45 minutos; o case Motors (números só com período); Sites e Integrações; Presença Digital Local; Sprint de Eficiência; o agente de IA no WhatsApp; as perguntas mais comuns; bastidor do método; carrossel com os 3 erros mais comuns; depoimento ou print, só com autorização; convite para o diagnóstico. Visual: os modelos de `design/marca/redes/`.

**Como crescer de 7 para 200 sem prometer um número:** convite pessoal por WhatsApp a clientes, parceiros e à rede do Dyones (os primeiros seguidores têm que ser gente real do setor); link do perfil na assinatura de e-mail e no WhatsApp Business; página do Facebook vinculada ao Instagram; perfil pessoal do Dyones no LinkedIn apontando para a página; o `sameAs` do site já aponta para o Instagram e o LinkedIn. Quando o botão Teste aparecer, os lotes passam a sair como teste.

## Frequência por rede

| Rede | Fase A | Lotes 1 e 2 | Origem do conteúdo |
|---|---|---|---|
| Instagram (@v2o5_consultoria) | 1 post por dia (reel simples ou carrossel) | 5 reels por dia, ter a sáb (25 por semana, o ritmo do PDF) | Lote produzido na segunda |
| Facebook (página a criar) | 3 posts por semana | 1 reel por dia, o melhor do dia no Instagram, compartilhado como Reels | O mesmo reel, publicado como Reels no Facebook |
| LinkedIn (página + perfil do Dyones) | 3 posts por semana (ter, qua, qui) | 3 posts por semana, adaptados do que o lote testa | Texto novo por post, tom de negócio, o vídeo quando o assunto pedir |

Regras: o vídeo repetido vale entre redes diferentes; no Instagram nunca se repete o arquivo. Cada post leva o link com UTM da rede (`utm_source=instagram|facebook|linkedin`, `utm_content` com o código do lote). O LinkedIn usa `utm_medium=post`.

## Rotina da semana nos lotes

| Dia | O que acontece |
|---|---|
| seg | Roteiros e produção do lote (o Dyones grava a tela com o Claude e o motion sai no Claude Code) |
| ter a sáb | 5 reels por dia no Instagram; 1 reel por dia no Facebook; LinkedIn em ter, qua e qui |
| dom | Leitura do lote: insights do Instagram, GA4 e leads por `utm_content`, no prompt 6; escolha dos 3 vencedores |

## O que falta de decisão do Dyones
- Aprovar a promessa única (rascunho: "Em 45 minutos, sem custo, a V2O5 mostra onde sua empresa perde venda e o que resolver primeiro."). Os roteiros e o título do `/diagnostico` usam a frase, palavra por palavra.
- Autorizar telas e conversas da Motors nos vídeos (nome, logo e números já estão autorizados desde 08/10; telas do painel e do Ney exigem dados mascarados).
