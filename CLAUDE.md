# V2O5 · site novo

Memória de trabalho do projeto. Carrega em toda sessão: mantenha abaixo de ~100 linhas. Detalhe mora em `memory/`; leia só o arquivo que a tarefa pede.

## O que é
Novo site da **V2O5 Vendas e Tecnologia** (substitui o WordPress de v2o5.com.br). A V2O5 digitaliza e acelera negócios com IA: coloca a empresa no mapa (site, busca, presença, rastreamento) e multiplica a operação (agentes, automação, CRM). Automotivo é o primeiro segmento, com o case **Motors Store**. Fundador: **Dyones Oliveira**.

## Estado (19/10/2026)
- Plano fechado em `docs/2026-10-08-plano-novo-site.md` (v4, longo: use `grep -n "^##"` e leia só a seção).
- Home, `/precos`, `/diagnostico` (formulário → `/api/leads` → webhook do n8n), `/privacidade`, `/cases/motors-store`, o hub `/segmentos/revendas-de-veiculos`, as 5 páginas de solução (molde `PaginaDeSolucao` + `conteudo/solucoes.ts`) e `/sobre` prontas em `src/` (`npm run dev`); `/gestao-de-trafego` e `/guias` são provisórias. Camada de dados pronta em 13/10 (`lib/medicao.ts`: GA4 e Pixel por variável, CAPI em `lib/capi.ts`, oposição em `/privacidade`); falta o Dyones pôr os IDs na Vercel (`.env.example`). Preços internos em `src/conteudo/precos.ts` (não publicados desde 25/10; o único valor público é o do Sprint, em `src/conteudo/sprint.ts`): cardápio de 15/10 com três planos (Presença R$ 8.900 + R$ 990, Atendimento R$ 7.900 + R$ 1.590, Completo R$ 14.900 + R$ 2.290, a R$ 1.990 até 31/12/2026 com a implantação do painel de bônus), tráfego por plataforma, módulos para quem tem o sistema (painel, reativação e campanhas, funil sob medida; consulta veicular a R$ 49,90 por placa e área de repasse só no hub) e serviços (conteúdo e gestão de redes sociais a R$ 1.500 + R$ 1.699/mês, gestão de comentários e Direct por automação a R$ 1.900 + R$ 590/mês, branding sob consulta); fotógrafo parceiro a partir de R$ 890/mês. Atendimento em `docs/n8n/` (15/10): três fluxos (diagnóstico, origem do botão, agente de IA) marcam o lead do site com `origem = v2o5` e só ele fala com o agent bot "Agente da V2O5" (OpenAI, `gpt-5-mini`); no Chatwoot (`app.chat.v2o5.com.br`, conta 1, caixa 12, instância `v2o5`) atributo, etiqueta, webhook e bot prontos, os três fluxos ativos no n8n, variáveis na Vercel e bot ligado à caixa 12 (15/10); faltam os testes (a), (b) e (c) do LEIA-ME (pendência 17). **Site novo no ar em v2o5.com.br desde 16/10** (DNS na Hostinger, só apex e `www` na Vercel; o principal é `www.v2o5.com.br`, igual ao `SITE_URL`); roteiro em `docs/checagem-antes-do-dns.md`; a linha do WhatsApp foi provada em 13/10. Números e escolhas em `memory/decisoes.md`, pendências em `memory/pendencias.md`.
- **Redesign 2026 no ar desde 19/10** (PR #26 no `main`): direção B (mapa de linhas, rota na margem, marca em construção) na home e nas 11 rotas; texto travado em `content/`, contratos em `design/nao-pode-quebrar.md`. Subdomínio dos diagnósticos no mesmo visual (PR #1 de `v2o5-diagnosticos`); falta trocar a skill `diagnostico-presenca` (pendência 25). Abertos com o Dyones: objeto próprio por página de solução e a página /marca (pendência 24). Como continuar: `design/HANDOFF.md`.
- **Reposicionamento no ar desde 25/10** (PR #28 no `main`, Sprint de Eficiência como oferta principal; H1 "Do problema ao resultado, pelo caminho mais simples."; assinatura "V2O5 | Eficiência comercial e operacional com tecnologia."); em seguida só o Sprint e a recorrência ficaram com valor público (`/precos#titulo-sprint`), com a home, as soluções e o hub subordinados ao método. Mensagem congelada por 30 dias depois da publicação validada, salvo defeito ou evidência nova. Detalhe em `memory/decisoes.md`.
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
| **Start Digital** | Pacote antigo de presença; fora do cardápio público, vira fundação dos sites |
| **Diagnóstico** | Porta de entrada gratuita: 45 min + mapa em 24 h |
| **Modernist** | Design system da Motors; herdamos a engenharia, não a estética |
| **VPS** | Servidor da V2O5: n8n, Chatwoot, Evolution API (detalhe em `memory/context/infra.md`) |
→ Glossário completo: `memory/glossary.md`

## Decisões que mais pesam
- Logo C1d (molécula em V); H1 "Coloque sua empresa no mapa e multiplique a operação com IA." (09/10)
- Identidade geral (IA para negócios); automotivo como segmento com hub próprio. (09/10)
- ~~Visual escuro e tecnológico com motion (09/10).~~ Redesign 2026 em base clara, papel como fundo, sistema em `design/DESIGN.md`; branch `redesign-2026`, texto das rotas em `content/`, contratos em `design/nao-pode-quebrar.md`. (19/10)
- Nome fixo "V2O5 Vendas e Tecnologia"; assinatura "V2O5 | Eficiência comercial e operacional com tecnologia." (25/10; antes "Catalisador de vendas com IA").
- **Três Sprints, um guarda-chuva (25/10):** Essencial, Integrada e Avançada são os únicos entregáveis; todo serviço vem de dentro de um Sprint, o catálogo da home lista capacidades (operação primeiro, "Trazer mais gente" depois) e os módulos saíram de cena. Entrega-base do site em `src/conteudo/sitePadrao.ts`.
- Só o Sprint de Eficiência e a recorrência que o acompanha têm valor público: três Sprints "a partir de" (R$ 3.000, R$ 6.000 e R$ 12.000, sem teto público desde 26/10), preço fechado em proposta, e duas mensais pela gestão (R$ 1.200 a R$ 5.000); se a solução continua rodando há recorrência, com nuvem e IA por fora, pelo valor do provedor, gerenciadas pela V2O5, com teto mensal combinado e aviso; tráfego, módulos e serviços (cardápio de 15/10) viraram dado interno em `precos.ts`, e os três pacotes automotivos (Mapa, Operação com IA e Completo) são modelos de Sprint, com valor público só no hub automotivo (25/10), travado por `tests/precos-nao-publicados.test.ts`. (25/10; antes, preço "a partir de" em três planos)
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
| Linhas de serviço e preços | `memory/context/oferta.md` (e `src/conteudo/precos.ts`) |
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
