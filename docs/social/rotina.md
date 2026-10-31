# Rotina social da V2O5 (Instagram e Facebook)

Criada em 28/10/2026. Perfis: Instagram https://www.instagram.com/v2o5_consultoria/ e LinkedIn da empresa (fora desta rotina). A página do Facebook não foi informada: **pendência de URL** (sem ela a rotina entrega o texto, e o Dyones publica nos dois).

## Como funciona

1. **Domingo, 19h43 (Brasília):** uma sessão automática lê esta rotina, a memória do projeto e o calendário da semana anterior, e prepara o pacote da semana em `docs/social/calendario/AAAA-Wnn.md`.
2. **Abre um PR em rascunho** com o pacote. O Dyones lê, ajusta e aprova no PR.
3. **Nada é publicado sozinho.** Publicar é decisão do Dyones, direto no Meta ou pelo Windsor.ai (skill `social-media-create`, que mostra o rascunho e só cria depois de confirmação). Resposta a comentário e Direct é a pendência 21, fora desta rotina.

## Cadência inicial (ajustável)

- **2 posts no feed por semana** (imagem, carrossel ou roteiro de Reels), com a mesma legenda no Instagram e no Facebook.
- **4 stories por semana**, cada um com 3 a 5 quadros e um adesivo (enquete, pergunta ou caixa de perguntas).
- Total pequeno de propósito: o gargalo é a aprovação do Dyones. Subir só depois de quatro semanas seguidas sem atraso.

## Pilares (rodízio)

| Pilar | O que entra | Fonte permitida |
|---|---|---|
| Bastidor do método | Como o diagnóstico de 45 minutos funciona, o Sprint de Eficiência por dentro, o que fica de fora do escopo | `src/conteudo/` |
| Caso real | Motors Store, com número e período | só `memory/projects/case-motors.md` |
| Erro comum | Sintoma que o dono da loja reconhece (lead que esfria, venda que some no balcão) | experiência do fundador; sem dado inventado |
| Guia | Um trecho de guia já publicado, com link | `/guias`, quando houver |
| Preço e escopo | Preço de referência de uma solução, com "a partir de" | só `src/conteudo/ofertas.ts` e `sprint.ts` |
| Marca | Construção do símbolo, as quatro cores do vanádio, o nome | `memory/context/marca.md` |

Cada semana usa pelo menos três pilares diferentes e não repete o da semana anterior.

## Regras de texto (não negociáveis)

- Português do Brasil. Passa pelo humanizer: sem travessão, sem "não é X, é Y", sem tríades de efeito, sem emoji de enfeite.
- Nenhum número sem fonte e sem período. Nada de resultado prometido ("aumente suas vendas em X%"); o que se mede é combinado antes (CLAUDE.md).
- Nada de dado de cliente sem autorização; Motors Store já autorizada para nome, logo e números.
- Assinatura quando couber: "V2O5 | Eficiência comercial e operacional com tecnologia."
- Uma chamada por peça: diagnóstico gratuito (`https://www.v2o5.com.br/diagnostico`) ou WhatsApp. Link vai no story (adesivo) ou na bio, não na legenda do feed.
- Hashtags: até 5, em português, ligadas ao tema. Sem hashtag genérica de viral.

## Formato do pacote semanal

Para cada peça: tipo (feed, carrossel, Reels, story), pilar, **objetivo**, **texto na imagem** (por quadro), **legenda** completa, **texto alternativo**, **briefing visual** (usar papel #F2F1EC e tinta #121418, âmbar #F2A516 só como acento, as quatro cores do vanádio por etapa; símbolo C1d; fonte Geist, conforme `memory/context/marca.md` e `design/DESIGN.md`), melhor dia e horário sugeridos e a fonte de cada afirmação. No fim, uma lista "o que conferir antes de publicar" e o que a semana anterior ensinou (se o Dyones registrou métricas).

## Medição

Sem métricas por enquanto: o Windsor.ai não está autenticado. Quando estiver, a rotina passa a abrir o calendário com alcance, salvamentos e cliques da semana anterior (skills `instagram` e `social-media-insights`) e a ajustar os pilares por isso. Até lá, o Dyones anota no PR o que rendeu.
