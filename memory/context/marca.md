# Marca

## Nome e entidade
- Nome fixo em todo lugar: **V2O5 Vendas e Tecnologia** (algarismos normais no texto; é o que se digita na busca).
- Razão social V2O5 Tecnologia da Informação Ltda. · CNPJ 68.490.470/0001-14 · ME, Simples · ativa desde 10/08/2026.
- Sede residencial em Almirante Tamandaré/PR: publicar só cidade e estado. Perfil de Empresa como área de serviço.
- Schema: `name` nome fantasia, `legalName`, `taxID`, `alternateName` ["V2O5", "V2O5 ConsultorIA"], `founder` Person Dyones Oliveira.
- "V2O5" sozinho na busca é o composto químico: sempre usar a forma fixa e `sameAs` consistente.

## Conceito
V2O5 é catalisador industrial (ácido sulfúrico): acelera a reação e continua lá no fim. A V2O5 acelera o negócio, e o catalisador dela é a IA. O sistema fica com o cliente.
Assinatura: **Catalisador de vendas com IA** ("IA" em âmbar, herança do "ConsultorIA").

## Cores
| Token | Hex | Uso | Contraste |
|---|---|---|---|
| tinta | #121418 | fundo principal (direção escura) | 16,3:1 com papel |
| papel | #F2F1EC | texto sobre escuro, seções de leitura | |
| grafite | #2A2D34 | superfícies | 12,2:1 sobre papel |
| texto secundário | #5A5D66 (claro) / #A9ACB4 (escuro) | legendas | 5,8:1 / 8,1:1 |
| âmbar V⁵⁺ | #F2A516 | ação, sinal, ponto do logo | 8,9:1 com tinta; não usar como texto sobre claro |
| âmbar texto | #8A5600 | âmbar sobre fundo claro | 5,4:1 |
| violeta V²⁺ | #6B46C8 | etapa site/atração | branco 6,3:1 |
| verde V³⁺ | #17773F | etapa atendimento IA | branco 5,6:1 |
| azul V⁴⁺ | #2457C5 | etapa CRM | branco 6,5:1 |
| régua | #D6D4CC | linhas sobre claro | decorativo |
Ordem das etapas do lead: violeta → verde → azul → âmbar (venda). As três primeiras só em diagramas e etiquetas.

## Tipografia
Geist (display 800, títulos 700, texto 400) + Geist Mono (rótulos 500 caixa alta +0,12em, números 600). Máximo duas famílias. Carregar local (pacote npm `geist` ou woff2 próprios), nunca `next/font/google` (quebrou build na Motors).

## Logo: família C1 (geometria para implementar)
viewBox `8 14 112 70` (proporção 1,6).

**Nuvem C1 (assimétrica)** traço 6:
`M30.00 80.00 A18 18 0 0 1 28.09 44.10 A24 24 0 0 1 67.93 24.05 A20 20 0 0 1 99.58 44.07 A18 18 0 0 1 98.00 80.00 Z`

**Molécula C1** (V raio 6,5; O raio 4,5; ligações traço 3,5):
Ot1 (40,45) · Ot2 (42,68) · V1 (53,56) · Ob (64,42) · V2 (75,56) · Ot3 (88,45, âmbar) · Ot4 (86,68).
Ligações: Ot1–V1, Ot2–V1, V1–Ob, Ob–V2, V2–Ot3, V2–Ot4.
Sinal: caminho `M42 68 L53 56 L64 42 L75 56 L88 45`, `pathLength=100`, dasharray `16 120`, dashoffset 16 → −100 em 36% de um ciclo de 4,8 s; nós acendem com atraso 0 / .35 / .74 / 1.12 s; anel âmbar em Ot3 a 32–50% do ciclo.

**C1a (monograma)**: V principal `M42 38 L64 70 L86 38` traço 4,5; nós TL (42,38), V1 (53,54), BC (64,70), V2 (75,54), TR (86,38) âmbar; ramos finos V1–(40,62) e V2–(88,62) traço 2,5.

**C1b (cérebro)** nuvem simétrica:
`M30.00 80.00 A18 18 0 0 1 26.48 44.35 A20 20 0 0 1 64.00 31.28 A20 20 0 0 1 101.52 44.35 A18 18 0 0 1 98.00 80.00 Z` + fenda `M64 31.28 L64 40`.
Nós: Ot1 (38,48) · Ot2 (40,68) · V1 (51,58) · Ob (64,50) · V2 (77,58) · Ot3 (90,48, âmbar) · Ot4 (88,68).

**C1c (sólida)**: nuvem C1 preenchida, rede em papel (vazada), Ot3 âmbar. Em uma cor: Ot3 vira anel com ponto central.

**C1d (molécula em V): o logo, escolhido em 09/10 (proposta do Dyones)**: a molécula do C1 virada de cabeça para baixo, com a cadeia Ot2–V1–Ob–V2–Ot4 formando um V reto.
Ot1 (40,65) · Ot2 (42,42) · V1 (53,55) · Ob (64,68) · V2 (75,55) · Ot3 (88,65) · Ot4 (86,42, âmbar). Mesmas ligações do C1; sinal Ot2 → V1 → Ob → V2 → Ot4. Nuvem do C1.

Pequenos tamanhos: 32 px fica só nuvem + V1, V2 e Ot3; 16 px nuvem + ponto âmbar. Versões completas nos quadros do canvas (link no `CLAUDE.md`).
