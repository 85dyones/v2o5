# Auditoria do portfólio (fase 1 do handoff de 27/10/2026)

Fase 1 do "Handoff mestre: reposicionamento comercial, portfólio e política inicial de preços" (27/10/2026). Somente leitura: nada foi alterado no site, nos fluxos do n8n nem na vitrine. Base auditada: `main` em `9a110e7` (PR #37) nos dois repositórios e o site no ar em 27/10/2026.

## 1. Estado comprovado

| Item | Evidência |
|---|---|
| Repositório do site | `85dyones/v2o5`: Next 16.4.0, React 19.3, Tailwind 4, Vitest; páginas estáticas na Vercel; produção pelo `main` |
| Repositório da vitrine | `85dyones/v2o5-diagnosticos`: HTML estático; raiz (vitrine e 404), 9 diagnósticos de clientes e `teste-previa` |
| Branch da sessão | `claude/kind-tesla-eefroe`, igual a `origin/main` nos dois repositórios |
| Testes | `npx vitest run`: 345 de 345 passaram |
| Lint | `npm run lint`: sem erro |
| Build | `npm run build`: concluído. A primeira tentativa parou num aviso de segurança do próprio Next (ver seção 8) |
| Rotas no ar | as 13 rotas responderam 200; `/gestao-de-trafego` responde 307 para `/#solucoes` (provisório) |
| Formulário do diagnóstico | `/diagnostico` → `/api/leads` → webhook do n8n, como em `design/nao-pode-quebrar.md` §5. Não enviei lead de teste em produção (criaria contato no Chatwoot e aviso ao Dyones). Os testes (a), (b) e (c) do `docs/n8n/LEIA-ME.md` seguem abertos (pendência 17) |

### Os cinco documentos citados no handoff
Nenhum existe nos dois repositórios nem no Google Drive (busca por título em 27/10). Eles vivem na biblioteca do Claude Desktop. O `memory/decisoes.md` de 25/10 cita `V2O5_CORE.md` v1.0 e `CLAUDE_SITE_IMPLEMENTATION(_AJUSTADO).md` como "kit de refresh". Para não duplicar, proponho este mapeamento, com o repositório como fonte da verdade e a biblioteca do Desktop atualizada a partir dele:

| Documento do handoff | Equivalente no repositório |
|---|---|
| `V2O5_CORE.md` (portfólio, ofertas, preços, princípios) | `memory/context/oferta.md` |
| `BRIEF_V2O5.md` (posicionamento, público, objetivo do site) | `CLAUDE.md` ("O que é") e `memory/projects/site-v2o5.md` |
| `CLAUDE_SITE_IMPLEMENTATION.md` (arquitetura, regras, aceite) | novo `docs/2026-10-27-portfolio-no-site.md`, mais os contratos de `design/nao-pode-quebrar.md` |
| `00_TORRE_DE_CONTROLE.md` (decisões) | `memory/decisoes.md` |
| `02_ESTADO_ATUAL.md` (estado real) | `CLAUDE.md` ("Estado") e `memory/pendencias.md` |

## 2. Inventário de preços públicos (no ar em 27/10/2026)

| Onde | Hoje | No handoff |
|---|---|---|
| Home: escada, três Sprints, perguntas | Sprint Essencial a partir de R$ 3.000, Integrada R$ 6.000, Avançada R$ 12.000; recorrência "R$ 1.200 a R$ 5.000 por mês pela gestão" | Sprint R$ 3.900, R$ 6.900 e R$ 12.900; continuidade a partir de R$ 249; mais Branding R$ 2.400, Presença R$ 790, Sites R$ 2.900 |
| `/precos`: cartões, perguntas | os mesmos Sprints; Estabilidade e suporte R$ 1.200 a R$ 2.500; Evolução contínua R$ 2.500 a R$ 5.000; pagamento 50/30/20 | tabela resumida das quatro soluções e da continuidade |
| `/precos`: JSON-LD `OfferCatalog` | `minPrice` 3000, 6000, 12000; 1200 a 2500 e 2500 a 5000 por mês | idem acima |
| `/llms.txt` (também é o conhecimento do agente do n8n) | os mesmos valores e "A V2O5 vende três Sprints... não há módulos nem serviços vendidos soltos" | quatro soluções |
| `/segmentos/revendas-de-veiculos` | Mapa R$ 8.900 + R$ 1.200/mês; Operação com IA R$ 7.900 + R$ 1.590/mês; Completo R$ 14.900 + R$ 1.990/mês até 31/12/2026, depois R$ 2.290, com bônus do painel | Site Automotivo Integrado R$ 11.900 a R$ 16.900 |
| diagnostico.v2o5.com.br (vitrine, `index.html`) | Sprint a partir de R$ 3.000; recorrência R$ 1.200 a R$ 5.000 | atualizar |
| 9 diagnósticos de clientes (noindex, de 15 a 19/10) | cardápio de 15/10: Presença R$ 8.900 + R$ 990, Completo R$ 14.900 + R$ 1.990/2.290, rastreamento R$ 2.900 + R$ 690, tráfego R$ 1.300/1.990, redes R$ 1.500 + R$ 1.699, fotógrafo R$ 890 e outros. Cada um tem validade (31/10 a 04/11/2026) e aviso de que os valores podem mudar | não alterar: é proposta enviada |
| Agente do n8n (prompt no n8n ativo e `docs/n8n/agente-da-v2o5.json`) | "Só o Sprint de Eficiência e a recorrência... têm valor público... Nunca cite valor de plano, módulo ou serviço avulso" | regra nova |
| Soluções (5), `/sobre`, `/diagnostico`, case, `/privacidade`, `/guias` | nenhum valor | sem mudança de valor |

Preços internos que não aparecem no site (`src/conteudo/precos.ts` e `memory/context/oferta.md`): planos Presença, Atendimento e Completo; tráfego (R$ 1.200, R$ 1.990, R$ 1.300); rastreamento sozinho (R$ 2.900 + R$ 690); módulos (painel, reativação, funil, consulta veicular, repasse); serviços (redes R$ 1.500 + R$ 1.699, comentários e Direct R$ 1.900 + R$ 590, fluxo R$ 1.900, branding sob consulta); fotógrafo parceiro R$ 890; piso de mensalidade R$ 690; desconto fidelidade de 27,5%.

## 3. Decisões vigentes que o handoff substitui

Cada uma precisa entrar em `memory/decisoes.md` como decisão do Dyones de 27/10, para o histórico não ficar contraditório.

1. **Três Sprints, um guarda-chuva** (25/10): "todo serviço vem de dentro de um Sprint", módulos fora, branding só como capacidade (26/10). O handoff abre quatro portas, com Branding, Presença e Sites vendidos direto.
2. **Só o Sprint e a recorrência têm valor público** (25/10). Passam a ter preço de entrada as quatro soluções, e as páginas internas detalham os pacotes.
3. **Sprint "a partir de" R$ 3.000, R$ 6.000 e R$ 12.000** (26/10). Passa a R$ 3.900, R$ 6.900 e R$ 12.900.
4. **Recorrência de R$ 1.200 a R$ 5.000 pela gestão, com nuvem e IA por fora** (25/10). Passa a Cuidado Técnico R$ 249, Integrações Monitoradas R$ 490 e Evolução Contínua R$ 990. O Cuidado Técnico inclui hospedagem, o que bate de frente com "nuvem por fora": a regra nova precisa dizer o que fica dentro (hospedagem do site) e o que segue por fora (banco, servidor dedicado, IA, mensagens).
5. **Planos automotivos no hub e oferta do Completo a R$ 1.990 até 31/12/2026** (15/10 e 25/10). O handoff traz um só pacote, o Site Automotivo Integrado. O Atendimento (agente e CRM) deixa de ter pacote e vira Sprint.
6. **Sem teto público** (26/10: "o teto máximo pode afugentar"). O handoff publica uma faixa com teto no automotivo (R$ 11.900 a R$ 16.900).
7. **Mensagem congelada por 30 dias** (25/10). O H1 fica, mas a mensagem muda. Como em 25/10, é exceção por decisão do dono.
8. **Piso de mensalidade de R$ 690** (12/10 e 15/10). Entram mensalidades de R$ 249, R$ 290 e R$ 490.
9. **Nomes "Sprint Integrada" e "Sprint Avançada"**. O handoff escreve "Integrado" e "Avançado".
10. **Start Digital "saiu do cardápio, é fundação dos sites"** (glossário). Volta como Presença Digital Local, vendida sozinha.
11. **Conteúdo e gestão de redes sociais a R$ 1.500 + R$ 1.699/mês** (interno, 15/10). Concorre com a Presença Assistida (R$ 1.990 + R$ 890) e precisa ser aposentado ou reservado para volume maior.

## 4. O que ainda falta definir antes de publicar

O handoff manda não publicar detalhamento sem estas definições. Hoje nenhuma está escrita.

| Oferta | Falta |
|---|---|
| Branding (3 pacotes) | entregáveis e arquivos finais, número de revisões, prazo de referência |
| Presença Digital Local (3 pacotes) | canais, quantidade de peças (só a de R$ 490 tem referência: 4), revisões, frequência, responsabilidades do cliente, exclusões |
| Sites & Integrações | páginas do Site Personalizado, revisões, prazo; o que conta como integração padrão. A entrega-base de `src/conteudo/sitePadrao.ts` (11 itens, revisada em 26/10) serve de ponto de partida |
| Continuidade (3 planos) | limite de suporte, capacidade mensal, prazo de resposta e canal, correção contra nova funcionalidade, custos excluídos, responsabilidades do cliente, backup, recuperação e encerramento. Pelo handoff, a Evolução Contínua fica interna até a capacidade estar definida |
| Descoberta paga | sem preço; só pode ser citada sem valor |
| Tráfego pago | fora do handoff. Hoje é dado interno e capacidade do catálogo |

Leitura de viabilidade, com a hora do fundador a R$ 150 e a infra por cliente da tabela de 12/10 (estimativa, não medida): R$ 249 e R$ 290 por mês cabem com até cerca de 1 hora de atendimento por mês num site estático; R$ 490 com 4 peças cabe com produção padronizada; R$ 790 de implantação equivale a cerca de 5 horas. Fica viável se a entrega for padronizada e o limite estiver escrito no contrato.

## 5. Riscos

**SEO**
- Trocar a URL de `/criacao-de-sites` perde a página que hoje responde por "criação de site". Melhor manter a URL e mudar só o título e o conteúdo.
- `/#solucoes` recebe links da 404, do redirecionamento de `/gestao-de-trafego` e da vitrine. A âncora precisa continuar existindo e apontar para as quatro soluções.
- `/precos#titulo-sprint` é destino da home, das cinco soluções, do hub, do rodapé da vitrine e do schema (`schema.ts`). A âncora precisa continuar pousando no Sprint.
- O JSON-LD com valores precisa mudar junto do texto, senão o Google mostra preço antigo.

**Conversão**
- Quatro portas com preço podem desviar a atenção do diagnóstico. O CTA principal continua sendo o diagnóstico em todas as páginas.
- Presença a R$ 790 e Sprint a R$ 3.900 na mesma tabela podem puxar o cliente para o mais barato. Cada cartão precisa dizer qual problema resolve.

**Técnico**
- `tests/precos-nao-publicados.test.ts` proíbe todo valor do cardápio interno. Vários preços novos coincidem com esses valores (R$ 2.900, R$ 490, R$ 990, R$ 890, R$ 1.990, R$ 290, R$ 7.900), então o teste quebra no primeiro commit. A solução é trocar a lista de proibidos por uma lista de permitidos: todo "R$" público precisa sair de uma fonte única de ofertas.
- Nove arquivos de teste dependem dos valores atuais (`automotivo`, `conteudo`, `llms`, `precos-nao-publicados`, `precos`, `schema`, `solucoes`, `sprint`, `subdominio-diagnostico`).
- O agente do n8n lê `/llms.txt` como conhecimento: o texto muda sozinho com o site, mas a regra de preço do prompt precisa mudar no n8n ativo no mesmo dia, senão ele se recusa a falar dos preços novos.

**Comercial**
- Há diagnósticos com proposta válida até 31/10, 01/11, 02/11 e 04/11. Eles ficam como estão e as condições enviadas são honradas até a validade.
- A oferta do Completo "até 31/12/2026" está publicada. Retirá-la vale para novas contratações; quem recebeu a proposta mantém a condição.

## 6. Arquitetura proposta

**Rotas**

| Solução | Rota | Situação |
|---|---|---|
| Branding & Identidade | `/branding-e-identidade` | nova |
| Presença Digital Local | `/presenca-digital-local` | nova |
| Sites & Integrações | `/criacao-de-sites` | mantém a URL, muda título e conteúdo (4 pacotes) |
| Sprint de Eficiência | `/sprint-de-eficiencia` | nova; recebe método, níveis e condições que hoje estão em `/precos` |
| Continuidade | `/continuidade` (`#manutencao-tecnica`, `#conteudo-e-campanhas`, `#monitoramento-e-otimizacao`) | nova |
| Tabela resumida | `/precos` | vira o resumo das quatro soluções e da continuidade; `#titulo-sprint` continua pousando no Sprint |
| Agente, CRM, automação, rastreamento | rotas atuais | ficam como páginas de capacidade, sem preço, ligadas a partir do Sprint e de Sites; saem do menu |
| Hub automotivo | `/segmentos/revendas-de-veiculos` | Site Automotivo Integrado, Sprint para o atendimento e Integrações Monitoradas |

**Navegação:** Soluções (as quatro mais "Revendas de veículos"), Continuidade (as três frentes), Preços, Case, Sobre, e o botão do diagnóstico. No desktop, submenu em `<details>` nativo (zero JavaScript, coerente com a regra de performance); no celular, grupos no menu atual.

**Home:** H1 mantido ("Do problema ao resultado, pelo caminho mais simples."); subtítulo com a mensagem central do handoff; `#solucoes` passa a ser as quatro soluções (problema que resolve, o que o cliente recebe, "a partir de"); método do Sprint; continuidade opcional; o que se mede; prova (Motors, só o que o case publica); automotivo; perguntas; fecho. Saem da home a seção "Três Sprints" e o catálogo de 16 capacidades por etapa do funil (o handoff pede para não voltar a catálogo genérico); o diagrama "Como tudo se liga" vai para a página do Sprint.

**Método do Sprint:** a home tem 4 etapas e o handoff exige 6. A página do Sprint mostra as 6; a home resume sem contradizer.

## 7. Plano incremental

Cada etapa é um PR contra `main`, com preview da Vercel. Nada vai para produção sem autorização explícita.

| PR | Conteúdo | Aceite |
|---|---|---|
| 1. Documentos | `decisoes.md` (27/10, com as substituições da seção 3), `oferta.md` reescrito (cardápio de 15/10 e Sprint antigo em "Histórico"), `pendencias.md`, `CLAUDE.md`, `docs/2026-10-27-portfolio-no-site.md` | nenhuma mudança no site; os 345 testes passam |
| 2. Dados e testes | `src/conteudo/ofertas.ts` como fonte única das quatro soluções, dos pacotes e da continuidade; `sprint.ts` com os valores novos; teste de lista de permitidos no lugar da de proibidos; cardápio interno de `precos.ts` aposentado | testes verdes; nenhum "R$" público fora de `ofertas.ts` |
| 3. Páginas | `/sprint-de-eficiencia`, `/branding-e-identidade`, `/presenca-digital-local`, `/continuidade`, `/criacao-de-sites` como Sites & Integrações, `/precos` resumido; `paginas.ts`, sitemap, JSON-LD | rotas 200, títulos e canônicos, âncoras pousando (`lib/ancora.ts`) |
| 4. Navegação e home | topo, menu do celular, rodapé, home | `/#solucoes` aponta para as quatro soluções; teclado e leitor de tela no submenu |
| 5. Automotivo e textos derivados | hub, `/llms.txt`, perguntas, páginas de capacidade que citam "três Sprints" | nenhum valor antigo no build |
| 6. Fora do site | vitrine (`v2o5-diagnosticos/index.html`), prompt do agente no n8n (arquivo e n8n ativo, com sua autorização), skill `diagnostico-presenca` (pendência 25) | agente cita os preços novos; vitrine coerente |

**Validação (fase 4):** testes, lint e build; varredura dos preços no HTML do build e do preview; capturas em 390 px e 1440 px de todas as rotas (Playwright); checagem de links internos e âncoras; formulário com webhook simulado no local e com um lead marcado como teste no preview, se autorizado; LCP dentro do orçamento de `memory/context/infra.md`; `content/` regerado e `git diff content/` revisado; checklist para a revisão independente.

**Rollback:** cada PR se desfaz com revert no GitHub; a Vercel volta ao deployment anterior de produção na hora. Nenhuma etapa mexe em banco, dados de leads ou contratos.

## 8. Achado fora do escopo

`npm audit --omit=dev` acusa severidade crítica no `next` 16.4.0 (GHSA-2464-fhr4-w9xw e GHSA-673q-mjm6-r5xr, execução remota de código; GHSA-p3m5-59mp-jv5r, negação de serviço). A correção indicada é a 16.4.3. Fica como tarefa separada, para não misturar com o reposicionamento. O `next build` também imprime um aviso pedindo para rodar `next upgrade --agent=security`; não rodei.
