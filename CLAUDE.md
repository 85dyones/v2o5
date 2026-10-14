# V2O5 · site novo

Memória de trabalho do projeto. Carrega em toda sessão: mantenha abaixo de ~100 linhas. Detalhe mora em `memory/`; leia só o arquivo que a tarefa pede.

## O que é
Novo site da **V2O5 Vendas e Tecnologia** (substitui o WordPress de v2o5.com.br). A V2O5 digitaliza e acelera negócios com IA: coloca a empresa no mapa (site, busca, presença, rastreamento) e multiplica a operação (agentes, automação, CRM). Automotivo é o primeiro segmento, com o case **Motors Store**. Fundador: **Dyones Oliveira**.

## Estado (14/10/2026)
- Plano fechado em `docs/2026-10-08-plano-novo-site.md` (v4, longo: use `grep -n "^##"` e leia só a seção).
- Home, `/precos`, `/diagnostico` (formulário → `/api/leads` → webhook do n8n), `/privacidade`, `/cases/motors-store`, o hub `/segmentos/revendas-de-veiculos`, as 5 páginas de solução (molde `PaginaDeSolucao` + `conteudo/solucoes.ts`) e `/sobre` prontas em `src/` (`npm run dev`); `/gestao-de-trafego` e `/guias` são provisórias. Camada de dados pronta em 13/10 (`lib/medicao.ts`: GA4 e Pixel por variável, CAPI em `lib/capi.ts`, oposição em `/privacidade`); falta o Dyones pôr os IDs na Vercel (`.env.example`). Preços em `src/conteudo/precos.ts` (15 linhas em dois pilares, piso de R$ 690/mês e teto de R$ 1.990 nas linhas de sistema, degraus de usuário, dados e infra, tráfego por plataforma, reativação com três canais, sem canal recomendado; indicação de fotógrafo parceiro a partir de R$ 890/mês; tabela confirmada em 12/10). Fluxo do n8n para o lead em `docs/n8n/` (o Dyones importa; Chatwoot em `app.chat.v2o5.com.br`, conta 1, inbox 12, instância `v2o5`). Roteiro da troca do DNS em `docs/checagem-antes-do-dns.md`; a linha do WhatsApp foi provada em 13/10. Números e escolhas em `memory/decisoes.md`, pendências em `memory/pendencias.md`.
- Tudo em `main` (PRs #1 a #11 mesclados; o #11, de teto e piso da mensalidade, reativação sem canal recomendado, hub com todos os sistemas, fotógrafo parceiro e âncoras corrigidas, em 14/10). Cada rodada nova sai de `main` numa branch `claude/...` com PR contra `main`; a Vercel publica o preview por branch e a produção pelo `main`.
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
- Visual escuro e tecnológico com motion (partículas da molécula, diagrama interativo, simuladores); formato editorial claro descartado. (09/10)
- Nome fixo "V2O5 Vendas e Tecnologia"; assinatura "Catalisador de vendas com IA" com "IA" em âmbar. (08–09/10)
- Preço publicado "a partir de", piso de R$ 690/mês (13/10; era 590) e teto de R$ 1.990 (13/10) com hospedagem e manutenção dentro; IA e WhatsApp repassados na fatura; cláusula de saída (loja leva código, dados e domínio). (08/10, piso em 10/10)
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
| Plugins instalados e como reinstalar | `memory/context/ferramentas.md` |

## Preferências do Dyones
- Quer franqueza ("seja sincero"); prefere recomendação a lista de opções.
- Afina o plano antes de implementar; decide rápido quando há proposta concreta.
- Gosta de ver visual (canvas, protótipo) para escolher.
