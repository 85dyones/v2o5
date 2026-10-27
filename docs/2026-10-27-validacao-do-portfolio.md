# Validação do portfólio de 27/10/2026

Evidências da fase 4 do handoff e o checklist de publicação. Branch `claude/kind-tesla-eefroe` dos dois repositórios: PR 85dyones/v2o5#39 (site) e 85dyones/v2o5-diagnosticos#5 (vitrine e propostas). Nada foi publicado em produção.

## O que rodou (27/10/2026, nesta sessão)
| Checagem | Resultado |
|---|---|
| `npx vitest run` | 33 arquivos, 342 testes passando |
| `npm run lint` | sem erro |
| `npx tsc --noEmit` | sem erro |
| `npm run build` | concluído; 26 rotas, as quatro novas estáticas. O Next imprime na primeira tentativa um aviso de segurança e para (ver "Pendências"); a segunda roda até o fim |
| Varredura de preço no HTML do build (19 rotas, texto visível e JSON-LD) | nenhum "R$" fora da tabela de `ofertas.ts` e `sprint.ts` |
| Playwright a 390 px e 1440 px (12 rotas) | sem rolagem horizontal; sem erro no console |
| Links internos da navegação e das páginas (21) | todos 200; nenhuma âncora sem `id` de destino |
| Submenu do topo | abre com Enter; fecha com Esc (foco volta ao rótulo), com clique fora e ao seguir um link |
| Menu do celular | grupos Soluções e Continuidade com os links embaixo |
| Formulário de `/diagnostico` | envio leva a `/diagnostico/recebido`; o webhook (falso, local) recebeu o POST com o segredo e `event_id`. Nenhum lead foi enviado ao n8n de produção |
| Propostas dos diagnósticos (varredura independente) | só valores da tabela de 27/10; validade 11/11/2026; sem "sob consulta" |
| `content/` | reextraído do build da branch em todas as rotas |

Capturas e saídas dos scripts ficaram no scratchpad da sessão. Para refazer, rode o build, `next start` e os testes de `tests/` (`precos-publicos`, `ofertas`, `sprint`, `solucoes`, `subdominio-diagnostico`).

## Critérios de aceite do handoff
| Critério | Situação |
|---|---|
| Quatro soluções visíveis e coerentes | home `#solucoes`, menu, `/precos` e as quatro páginas |
| Continuidade opcional | `/continuidade`, com limites; "opcional" em todos os cartões |
| Preços sem conflito | `tests/precos-publicos.test.ts` e a varredura do build |
| Start Digital reposicionado | Presença Digital Local, com página e pacotes |
| Sprint com o método | seis passos na home e em `/sprint-de-eficiencia` |
| Fronteiras dos pacotes | "para quem", "inclui" e "fora dos pacotes" em cada solução; quantidades aprovadas pelo Dyones em 27/10 |
| CTAs com destino real | todos os links internos 200; diagnóstico como CTA principal |
| Formulário e contato | testado localmente com webhook falso |
| Sem resultado, garantia, preço ou escopo inventado | sem percentual ou ROI; as quantidades redigidas foram aprovadas pelo Dyones |
| Desktop e celular | capturas a 1440 e 390 px |
| Documentação atualizada | `memory/decisoes.md`, `memory/context/oferta.md`, `memory/pendencias.md`, `CLAUDE.md`, `docs/2026-10-27-portfolio-no-site.md`, `design/nao-pode-quebrar.md` |
| Preview e checklist | preview da Vercel do PR #39; checklist abaixo |

## Checklist antes de publicar (Dyones)
1. Abrir o preview do PR #39 (`v2o5-git-claude-kind-tesla-eefroe-dyones-projects-a2f07575.vercel.app`, atrás do login da Vercel) no celular e no computador.
2. ~~Aprovar ou corrigir os rascunhos de escopo.~~ Aprovados em 27/10 ("siga sua recomendação, faça o merge na ordem"), com a publicação autorizada.
3. Revisão independente (Antigravity): responsividade, links, fluxo de contato, coerência de preço entre páginas.
4. Merge do 85dyones/v2o5#39 (a Vercel publica a produção pelo `main`).
5. No mesmo dia: levar ao n8n ativo o nó `Montar pedido` de "V2O5 · Agente de IA" (`docs/n8n/agente-da-v2o5.json`; pendência 35) e fazer o merge do 85dyones/v2o5-diagnosticos#5.
6. Depois: trocar a skill `diagnostico-presenca` (pendência 34) antes do próximo diagnóstico.

## Rollback
- Site: revert do merge do PR #39 no GitHub, ou voltar o deployment de produção anterior na Vercel.
- Vitrine e propostas: revert do merge do PR #5 de `v2o5-diagnosticos`.
- Agente do n8n: o histórico de versões do fluxo no n8n guarda o texto anterior.
- Nenhuma etapa mexe em banco, leads, contratos ou propostas assinadas.

## Pendências e riscos
- A skill `diagnostico-presenca` ainda gera proposta pela tabela antiga e, se gerar de novo um diagnóstico, sobrescreve as propostas atualizadas.
- O agente do n8n só muda no n8n ativo na publicação; até lá, o conhecimento dele (`/llms.txt` de produção) continua com a tabela antiga, coerente com o site no ar.
- Next.js 16.4.0 tem três vulnerabilidades críticas (`npm audit`); a correção (16.4.3) fica num PR à parte (pendência 36).
- Os preços são de referência para testar comercialmente. Se as propostas reais passarem sempre do preço de entrada, ele sai da chamada (regra do handoff).

## Publicação (27/10/2026)
| Passo | Situação |
|---|---|
| Merge do 85dyones/v2o5#39 | feito (`ce1045b`); produção conferida: 18 rotas com 200, 120 preços visíveis, nenhum fora da tabela, JSON-LD com os mesmos valores; `/llms.txt` de `www.v2o5.com.br` e de `v2o5.vercel.app` com a tabela nova |
| Agente do n8n | rascunho `fd17c4fd` salvo e conferido pelo diff contra a versão ativa `d19489c3`; **falta publicar no editor do n8n** (pendência 35) |
| Merge do 85dyones/v2o5-diagnosticos#5 | feito (`9c66e92`); vitrine e nove propostas conferidas no ar, com validade 11/11/2026 |
