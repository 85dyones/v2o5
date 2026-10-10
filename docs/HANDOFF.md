# Handoff: protótipo navegável da home

Escrito em 09/10/2026 para a próxima sessão, numa worktree nova. Objetivo: construir a home da V2O5 na direção visual nova, já como início do código real, para o Dyones ver e decidir em cima de algo navegável.

## Leitura mínima (economia de tokens)
1. `CLAUDE.md` (carrega sozinho).
2. `memory/context/motion.md`, `memory/context/marca.md`, `memory/projects/case-motors.md` (só a tabela de números).
3. Conforme precisar: `memory/context/oferta.md` (linhas de serviço), `memory/context/infra.md` (comando do Lighthouse e orçamento).
4. O plano completo (`docs/2026-10-08-plano-novo-site.md`) só por seção, via `grep -n "^##"`.

## Worktree e branch
- O plano e a memória estão na branch `claude/v2o5-website-redesign-6vx4i6` (PR rascunho https://github.com/85dyones/v2o5/pull/1, só documentos).
- Recomendado: o Dyones faz merge do PR #1 em `main` e a worktree nova parte de `main`.
- Se o PR #1 ainda estiver aberto, parta da branch do plano e abra o PR do protótipo contra ela.
- Se a sessão vier com branch designada, use essa branch partindo da base acima. Criando à mão:
  `git fetch origin claude/v2o5-website-redesign-6vx4i6 && git worktree add ../v2o5-prototipo -b <branch> origin/claude/v2o5-website-redesign-6vx4i6`

## Preparação
- `claude plugin list`: se faltar algum dos cinco plugins, reinstale com os comandos de `memory/context/ferramentas.md` e leia os `SKILL.md` direto do cache (eles só carregam na sessão seguinte).
- Antes de codar, leia: `frontend-design`; do `audit-suite`, `web-animation-design`, `emil-design-engineering`, `make-interfaces-feel-better` e `vercel-react-best-practices`.
- App Next.js 16 + React 19 + TypeScript + Tailwind 4 + Vitest na raiz do repo, como na Motors. O `create-next-app` recusa pasta com arquivos: gere num diretório temporário e mova para a raiz sem apagar `CLAUDE.md`, `memory/` e `docs/`.
- Fontes: pacote npm `geist` (Geist e Geist Mono locais). Nada de `next/font/google`.
- Motion: pacote `motion`; partículas em canvas 2D (ou `ogl` se precisar de GPU). Sem Three.js, React Flow, Lenis.
- Referências na Motors, se o repo `85dyones/motors-site-oficial` estiver no escopo da sessão: `src/app/globals.css` e `modernist.css` (arquitetura de tokens), `src/app/fontes.ts`, `src/components/modernist/NumeroQueConta.tsx` (contador com valor final renderizado no servidor), `tests/contraste.test.ts`, `tests/fontes-do-layout.test.ts`, `tests/capa-da-home.test.ts`.

## Escopo: a home, de cima para baixo
1. **Topo:** símbolo C1 (variação final ainda em aberto; deixe a troca fácil) + "V2O5"; navegação Soluções, Automotivo, Case, Preços, Sobre; CTA âmbar "Pedir diagnóstico".
2. **Hero:** H1 + subtítulo + dois CTAs. O H1 é o LCP. Atrás, canvas com a molécula V2O5 em partículas (os 7 nós e as 6 ligações do logo C1, escalados): partículas orbitam e se aglutinam nos nós; perto do cursor, ou com foco no CTA, as ligações acendem em âmbar e um sinal percorre Ot2 → V1 → Ob → V2 → Ot3. Carrega depois da primeira pintura, pausa fora da tela, cai para o SVG estático do logo com `prefers-reduced-motion` e sem JS.
3. **O que a V2O5 faz:** bento com as 6 linhas gerais (`oferta.md`), uma frase de benefício cada; borda de luz âmbar só no card em foco/hover; sem tilt 3D.
4. **Orquestrador:** abas Agente de IA, Automação, Site e rastreamento. Na aba Agente: mensagem de WhatsApp chega, agente consulta a base, responde, card do CRM atualiza com etiqueta e origem. Rótulo visível "demonstração".
5. **Como tudo se liga:** diagrama interativo (Site, WhatsApp, Agente de IA, n8n, CRM, Rastreamento, Venda). Clique num nó destaca o caminho; pulso nas cores das etapas (violeta, verde, azul, âmbar). SVG + Motion, carregado quando a seção chega perto da tela.
6. **Case Motors:** contadores só com números reais e período declarado (42 de 44 leads do site com identificador de deduplicação; 26 guias publicados; 132 veículos sincronizados; período 05/09 a 08/10/2026). Terminal pequeno com eventos no formato real, rotulado como exemplo.
7. **Segmento automotivo:** bloco curto levando ao hub `/segmentos/revendas-de-veiculos`.
8. **Fechamento:** CTA do diagnóstico; rodapé com "V2O5 Vendas e Tecnologia", CNPJ 68.490.470/0001-14, Almirante Tamandaré/PR, canais.

Textos: português, curtos, passando pelo humanizer (sem travessão, sem "não é X, é Y", sem tríades de efeito). Pilares: digitalizar e acelerar negócios com IA; colocar no mapa; multiplicar a operação; o catalisador é a IA. Assinatura "Catalisador de vendas com IA". Mostre ao Dyones duas opções de H1 no relatório.

Fora deste protótipo: formulário funcional, `/api/leads`, Supabase, rastreamento, demais páginas (links podem apontar para páginas vazias com título), SEO completo (mas com `lang="pt-BR"`, título e descrição).

## Critérios de aceite
- Lighthouse mobile (comando em `infra.md`): performance ≥ 90; acessibilidade, boas práticas e SEO ≥ 95. LCP é o H1, LCP ≤ 2,0 s, TBT ≤ 200 ms, CLS ≤ 0,05. JS inicial ≤ 150 KB comprimido.
- Com redução de movimento nada se move (teste Vitest cobrindo a regra).
- Navegável por teclado, foco visível, contraste AA com os tokens de `marca.md`.
- 360 px de largura sem rolagem horizontal; canvas leve ou estático no celular fraco.
- Nenhum número sem fonte; demonstrações rotuladas.
- `npm run lint`, `npm test` e `npm run build` limpos.

## Ordem sugerida
1. Scaffold, tokens de cor e fonte, layout, teste de contraste e de fontes.
2. Hero estático (H1, CTAs, SVG do logo) e primeira medição do Lighthouse (linha de base).
3. Canvas de partículas carregado depois do LCP; medir de novo.
4. Bento, case com contadores, segmento, rodapé.
5. Orquestrador e diagrama carregados por seção; medir.
6. Revisão com `audit-suite` (animação, acabamento, performance) e humanizer nos textos.
7. Commit, push, PR rascunho; relatório ao Dyones com os números do Lighthouse antes e depois de cada etapa de motion.

## Preview
Criar projeto na Vercel só com OK do Dyones (o MCP da Vercel está disponível; time em `infra.md`). Sem OK, entregue capturas de tela feitas com o Chromium do ambiente.

## Ao terminar
Atualize `memory/decisoes.md` e `memory/pendencias.md`, e o "Estado" do `CLAUDE.md` (uma linha).

## Prompt para abrir a sessão nova
> Leia `CLAUDE.md` e `docs/HANDOFF.md` do repositório 85dyones/v2o5 e execute o handoff: protótipo navegável da home da V2O5 na direção visual nova. Siga a leitura mínima indicada e não leia o plano inteiro.
