# V2O5 · site novo

Memória de trabalho do projeto. Carrega em toda sessão: mantenha abaixo de ~100 linhas. Detalhe mora em `memory/`; leia só o arquivo que a tarefa pede.

## O que é
Novo site da **V2O5 Vendas e Tecnologia** (substitui o WordPress de v2o5.com.br). A V2O5 digitaliza e acelera negócios com IA: coloca a empresa no mapa (site, busca, presença, rastreamento) e multiplica a operação (agentes, automação, CRM). Automotivo é o primeiro segmento, com o case **Motors Store**. Fundador: **Dyones Oliveira**.

## Estado (27/10/2026)
- Plano fechado em `docs/2026-10-08-plano-novo-site.md` (v4, longo: use `grep -n "^##"` e leia só a seção).
- Home, `/precos`, `/diagnostico` (formulário → `/api/leads` → webhook do n8n), `/privacidade`, `/cases/motors-store`, o hub `/segmentos/revendas-de-veiculos`, as 5 páginas de solução (molde `PaginaDeSolucao` + `conteudo/solucoes.ts`) e `/sobre` prontas em `src/` (`npm run dev`); `/gestao-de-trafego` e `/guias` são provisórias. Camada de dados pronta em 13/10 (`lib/medicao.ts`: GA4 e Pixel por variável, CAPI em `lib/capi.ts`, oposição em `/privacidade`); falta o Dyones pôr os IDs na Vercel (`.env.example`). Preços desde 27/10 em `src/conteudo/ofertas.ts` e `src/conteudo/sprint.ts` (quatro soluções e a continuidade, todas com preço de referência público; o cardápio de 15/10 virou histórico em `memory/context/oferta.md`). Atendimento em `docs/n8n/` (15/10): três fluxos (diagnóstico, origem do botão, agente de IA) marcam o lead do site com `origem = v2o5` e só ele fala com o agent bot "Agente da V2O5" (OpenAI, `gpt-5-mini`); no Chatwoot (`app.chat.v2o5.com.br`, conta 1, caixa 12, instância `v2o5`) atributo, etiqueta, webhook e bot prontos, os três fluxos ativos no n8n, variáveis na Vercel e bot ligado à caixa 12 (15/10); faltam os testes (a), (b) e (c) do LEIA-ME (pendência 17). **Site novo no ar em v2o5.com.br desde 16/10** (DNS na Hostinger, só apex e `www` na Vercel; o principal é `www.v2o5.com.br`, igual ao `SITE_URL`); roteiro em `docs/checagem-antes-do-dns.md`; a linha do WhatsApp foi provada em 13/10. Números e escolhas em `memory/decisoes.md`, pendências em `memory/pendencias.md`.
- **Redesign 2026 no ar desde 19/10** (PR #26 no `main`): direção B (mapa de linhas, rota na margem, marca em construção) na home e nas 11 rotas; texto travado em `content/`, contratos em `design/nao-pode-quebrar.md`. Subdomínio dos diagnósticos no mesmo visual (PR #1 de `v2o5-diagnosticos`); a skill `diagnostico-presenca` com a tabela de 27/10 está pronta em zip e falta subir no claude.ai (pendência 34). Abertos com o Dyones: objeto próprio por página de solução e a página /marca (pendência 24). Como continuar: `design/HANDOFF.md`.
- **Reposicionamento no ar desde 25/10** (PR #28 no `main`; H1 "Do problema ao resultado, pelo caminho mais simples."; assinatura "V2O5 | Eficiência comercial e operacional com tecnologia."). **Portfólio de 27/10 no ar desde 27/10** (handoff mestre, PR #39; vitrine e propostas no PR #5 de `v2o5-diagnosticos`; agente do n8n com a regra nova publicado no mesmo dia): quatro soluções (Branding & Identidade, Presença Digital Local, Sites & Integrações, Sprint de Eficiência) e a Continuidade opcional, com preço de entrada público; rotas novas `/branding-e-identidade`, `/presenca-digital-local`, `/sprint-de-eficiencia` e `/continuidade`; escopos aprovados em 27/10. Arquitetura em `docs/2026-10-27-portfolio-no-site.md`.
- Em `main` os PRs #1 a #12, #14, #15 e #18 (16/10: atendimento do n8n e mensagens do WhatsApp com "site da V2O5"); o #13 foi fechado sem merge (desatualizado). Cada rodada nova sai de `main` numa branch `claude/...` com PR contra `main`; a Vercel publica o preview por branch e a produção pelo `main`.
- Canvas de marca (privado): https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3

## Termos
| Termo | Significado |
|---|---|
| **Motors** | Motors Store, revenda de seminovos em Curitiba; case principal; repo `85dyones/motors-site-oficial` (base técnica de referência) |
| **C1, C1a…C1d** | Família do logo: nuvem com a rede da molécula V2O5 (a = monograma V, b = cérebro, c = sólida, d = molécula virada em V). **Logo: C1d** (09/10) |
| **Direção B / A / C2** | Logos descartados (funil, fórmula, engrenagens) |
| **V²⁺ V³⁺ V⁴⁺ V⁵⁺** | Cores dos estados do vanádio: violeta, verde, azul, âmbar. Âmbar = ação/energia |
| **Catalisador** | Conceito da marca: V2O5 é catalisador industrial; o catalisador da V2O5 é a IA |
| **Start Digital** | Pacote antigo de presença; desde 27/10 é a Presença Digital Local |
| **Diagnóstico** | Porta de entrada gratuita: 45 min com o fundador (sem mapa em 24 h desde 25/10) |
| **Modernist** | Design system da Motors; herdamos a engenharia, não a estética |
| **VPS** | Servidor da V2O5: n8n, Chatwoot, Evolution API (detalhe em `memory/context/infra.md`) |
→ Glossário completo: `memory/glossary.md`

## Decisões que mais pesam
- Logo C1d (molécula em V); H1 "Coloque sua empresa no mapa e multiplique a operação com IA." (09/10)
- Identidade geral (IA para negócios); automotivo como segmento com hub próprio. (09/10)
- ~~Visual escuro e tecnológico com motion (09/10).~~ Redesign 2026 em base clara, papel como fundo, sistema em `design/DESIGN.md`; branch `redesign-2026`, texto das rotas em `content/`, contratos em `design/nao-pode-quebrar.md`. (19/10)
- Nome fixo "V2O5 Vendas e Tecnologia"; assinatura "V2O5 | Eficiência comercial e operacional com tecnologia." (25/10; antes "Catalisador de vendas com IA").
- **Quatro soluções e a continuidade (27/10):** Branding a partir de R$ 2.400, Presença a partir de R$ 790, Sites a partir de R$ 2.900 (Site Automotivo Integrado a partir de R$ 11.900, teto interno), Sprint a partir de R$ 3.900 (Essencial, Integrado, Avançado) e continuidade a partir de R$ 249/mês (Cuidado Técnico, Integrações Monitoradas, Evolução Contínua). Nenhuma obriga a seguinte; nenhum escopo ilimitado. Todo "R$" público sai de `ofertas.ts` e `sprint.ts`, travado por `tests/precos-publicos.test.ts`. Substitui o guarda-chuva dos três Sprints e o "só o Sprint tem preço" (25/10).
- Consentimento no modelo da Motors (interesse legítimo + oposição em /privacidade). (08/10)
→ Log completo e datado: `memory/decisoes.md` · Pendências: `memory/pendencias.md`

## Regras do projeto
- Código, tabelas, commits e textos em português, como na Motors.
- Texto público passa pelo humanizer: sem travessão, sem "não é X, é Y", sem tríades de efeito.
- Nunca publicar número sem fonte. Os do case estão em `memory/projects/case-motors.md`, com período. E só número medido: texto público não fala do que ainda não foi medido nem promete dado futuro; cliente compra resultado (Dyones, 11/10).
- Performance é promessa de venda: LCP é o título (nunca o canvas), motion carrega por seção, `prefers-reduced-motion` desliga tudo. Âncoras rolam sem suavidade; link com fragmento é `<a>` nativo (`LinkOuAncora`); `lib/ancora.ts` confere o pouso.
- Commit com rodapé de coautoria; push só na branch designada da sessão.

## Onde está cada coisa
| Preciso de | Arquivo |
|---|---|
| Marca, cores, fontes, geometria do logo | `memory/context/marca.md` |
| Soluções, pacotes e preços | `memory/context/oferta.md` (e `src/conteudo/ofertas.ts`, `src/conteudo/sprint.ts`) |
| Mapa de páginas, SEO, redirecionamentos, concorrência | `memory/context/seo.md` |
| Stack, infra, contas, tracking, orçamento de performance | `memory/context/infra.md` |
| Direção visual e avaliação do motion | `memory/context/motion.md` |
| Números do case Motors e problema do Chatwoot | `memory/projects/case-motors.md` |
| Case 16ª Vara Cível (triagem automatizada por WhatsApp: Typebot + n8n + Chatwoot) | `memory/projects/case-16-vara-civel.md` |
| Projeto do site (escopo, fases) | `memory/projects/site-v2o5.md` |
| Raiz de diagnostico.v2o5.com.br (vitrine e 404, publicadas no repo `v2o5-diagnosticos`) | `subdominios/diagnostico/LEIA-ME.md` |
| Plugins instalados e como reinstalar | `memory/context/ferramentas.md` |

## Preferências do Dyones
- Quer franqueza ("seja sincero"); prefere recomendação a lista de opções.
- Afina o plano antes de implementar; decide rápido quando há proposta concreta.
- Gosta de ver visual (canvas, protótipo) para escolher.
