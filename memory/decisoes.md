# Decisões

Log datado. Decisão nova entra no topo do dia; decisão revogada fica riscada com a data da troca.

## 09/10/2026 (serviços nas duas metades do H1 e Visão 360, pelo Dyones)
- Soluções em dois pilares que repetem o H1. "Coloque sua empresa no mapa": Perfil da Empresa no Google (o antigo Google Meu Negócio), SEO e busca por IA, Sites e presença, Tráfego pago no Google e na Meta, Rastreamento até a venda. "Multiplique a operação com IA": Agente de IA no WhatsApp (bloco grande), Automação, CRM e sistemas, Integrações entre sistemas. Teste trava que os títulos dos pilares são as metades do H1 e que toda linha da tabela está num pilar.
- Perfil da Empresa e SEO técnico aparecem como cartões próprios, com preço "incluso em Sites e presença" (é o que a seção 3.2 do plano já põe na fundação dos sites). Sem preço avulso inventado.
- Integrações ganham cartão, mas só com o que roda em produção: "Em produção hoje: o estoque do Revenda Mais". Preço da automação (R$ 1.900 por fluxo), porque integração é fluxo no n8n.
- "Gestão de tráfego" vira "Tráfego pago no Google e na Meta" no cartão e no título da página `/gestao-de-trafego` (a URL fica).
- Subtítulo do hero e descrição da home listam os serviços do mapa (Perfil no Google, SEO, anúncios, site) antes dos da operação. O subtítulo tem teto de 180 caracteres: com 279, ele ocupava mais tela que o H1 no celular e virava o LCP (medido no Lighthouse). Com 174, fica entre 72% e 81% da área do H1 de 360 a 430 px. A lista completa mora nos pilares.
- Seção nova "Visão 360" depois das soluções: anel com as seis frentes (mapa, anúncios, site, atendimento, gestão, venda) nas cores das etapas, em volta do símbolo. Texto: uma equipe que enxerga o caminho inteiro do cliente, do anúncio ao sistema. Linha do fundador só com fato confirmado (informática desde 1992); as áreas da formação dele ficam para quando ele contar.
- Novas cenas de produto: ficha do Perfil da Empresa sobre um mapa, navegador com o botão de WhatsApp, Revenda Mais → n8n → site, CRM e agente.

## 09/10/2026 (3D que "não funcionava" na máquina do Dyones)
- Causa provável corrigida: a qualidade adaptativa media o intervalo entre quadros e, acima de 24 ms, baixava a resolução e depois parava a molécula. Notebook com economia de bateria (Chrome limita a 30 quadros, 33 ms) ou GPU integrada fazia a molécula congelar em segundos e parecer imagem. Agora a referência é o ritmo da própria tela, a resolução cai até a metade e, no limite, desenha um quadro sim, outro não. Nunca congela.
- Shader mais leve: atalho 2D (só caminha até a superfície quem está a menos de 3,5 unidades da molécula projetada), 44 passos em vez de 72 e teto de 480 mil pixels por quadro.
- `?diagnostico` na URL mostra um painel com o estado da 3D (rodando, meia velocidade, desligada e o motivo: menos movimento no sistema, sem WebGL 2, placa emulada por software, erro de shader) e a placa de vídeo.
- Vídeo do hero em `docs/prototipo/hero-3d.mp4`, gravado quadro a quadro com relógio controlado (o ambiente daqui não tem placa de vídeo).

## 09/10/2026 (motion do hero e botões, depois do guia de design futurista do Dyones)
- Hero: a molécula vira 3D em WebGL 2 (`src/lib/molecula3d.ts`), um fragment shader só, sem biblioteca: função de distância com juntas suaves (metal líquido), material de vidro escuro com borda nas cores dos estados do vanádio e um filamento âmbar dentro do V. Respira e inclina sozinha; com o cursor inclina até ~10° na direção dele (mola) e a luz segue a mão. O pulso percorre o V e dispara o anel e a rajada das partículas (sinal único). Câmera ortográfica: parada, a silhueta é a do SVG, e as partículas continuam chegando nos átomos.
- Sem placa de vídeo de verdade (SwiftShader, llvmpipe), sem WebGL 2 ou com erro de shader, o hero fica com o SVG, agora também em vidro escuro com o filamento. Medido: rodar o raymarching por software levava o TBT do Lighthouse a 4,2 s. Contexto e compilação em tarefas separadas; qualidade adaptativa (a resolução cai se o quadro passa de 24 ms; no limite, a molécula para).
- Botões em vidro âmbar escuro (o âmbar chapado ficou datado, pelo Dyones): borda e brilho âmbar, luz interna que segue o cursor e ímã de até 6 px com volta em mola (`--ease-mola`, `linear()` do CSS). `LuzDoCursor.tsx` substitui o `BentoLuz` para cartões e botões. Contraste do texto no ponto mais claro da luz travado em teste.
- Corrigido: o minificador descartava o `backdrop-filter` do topo (o padrão vinha antes do `-webkit-`); o vidro fosco do menu nunca tinha funcionado no Chrome. Teste trava a ordem.
- Botões sem `backdrop-filter` e com translação 2D: com o canvas animando, cada botão virava camada de composição.
- Medido na mesma sessão (Lighthouse 12.6, 7 rodadas, máquina mais lenta que de manhã): versão anterior TBT 218 ms e LCP 2,40 s; versão nova TBT 230 a 241 ms e LCP 2,18 a 2,27 s. Diferença dentro do ruído. O custo da 3D com placa de vídeo real precisa ser medido no preview.

## 09/10/2026 (refino visual, depois do "ainda está cru" do Dyones)
- Logo vetorizado: a rede da C1d é uma forma só (união por `paper`, `scripts/vetorizar-logo.mjs` → `src/lib/marca-vetor.ts`), com respiro em volta do átomo âmbar. Fim das peças sobrepostas aparecendo. Dois tamanhos ópticos: `grande` e `pequeno` (topo, rodapé, favicon; só a cadeia em V, traço mais grosso).
- Tipografia: títulos em Geist 600 com espaçamento fechado (display era 800, títulos 700). Título de seção em dois tons (a segunda frase em cinza). Rótulo em mono caixa alta só onde informa ("Demonstração com dados fictícios", "exemplo").
- H1 em cor sólida: com texto em degradê (`background-clip: text`) o Chrome atribui o LCP ao contêiner do hero, não ao H1.
- Superfícies com borda de luz em degradê (de cima para baixo) no lugar da linha cinza chapada; botões em pílula com brilho âmbar; topo transparente que vira vidro fosco ao rolar (CSS `animation-timeline: scroll()`).
- Hero "catalisador": a molécula C1d nítida (SVG do servidor) num palco com aros e trilhos; o canvas só desenha o fluxo: pó cinza lento entra por Ot1/Ot2, calor âmbar passa pela cadeia, rastros âmbar acelerados saem por Ot4 (78%) e Ot3; sinal periódico no V com anel e rajada em Ot4. Geometria única em `src/lib/palco.ts`.
- Faixa abaixo do hero: "Em produção na Motors Store" + WhatsApp, Meta Ads, GA4, n8n, Revenda Mais. Só integração que roda em produção (regra de `oferta.md`); Google Ads fica fora até a conversão offline existir.
- Bento de soluções com uma cena de produto por linha (chat do agente com ficha no CRM, busca com resposta de IA, funil, fluxo, jornada com `event_id`, campanhas otimizando por venda). Sem número de resultado; nomes de carro e campanha de exemplo.
- Orquestrador vira janela de aplicativo (abas em pílula, eventos como chamadas de ferramenta, ficha do CRM com a etapa do funil). Diagrama com peças em ícone. Automotivo com vinheta do estoque (rotulada "exemplo"). Fechamento centrado com o símbolo.
- Medido depois do refino (Lighthouse 12.6, 7 rodadas, mobile simulado): performance 96, a11y/BP/SEO 100, LCP 2,19 s (H1), TBT 158 ms, CLS 0, JS inicial 138 KB gz, DOM 936 elementos.

## 09/10/2026 (escolhas sobre o protótipo)
- Logo: **C1d**, a molécula do C1 virada em V (proposta do Dyones). Geometria em `memory/context/marca.md`; o hero desenha a mesma molécula em partículas. Comparação: https://claude.ai/artifact/8q5BRtPR4dUgcxsmm3nx6E
- H1 da home: "Coloque sua empresa no mapa e multiplique a operação com IA." (opção A). Descartada: "Vendas mais rápidas com IA, num sistema que fica com a sua empresa."

## 09/10/2026 (protótipo da home, decisões técnicas)
- Base da fase 1: CI no GitHub Actions (lint, testes, build); cabeçalhos de segurança no `next.config.ts` com CSP sem nonce (páginas estáticas; nonce exigiria renderização dinâmica); mapa de páginas único em `src/conteudo/paginas.ts` (título, descrição, canonical, `noindex` nas páginas em construção, sitemap só com as prontas); `robots.ts` com um grupo só; `llms.txt` gerado do conteúdo da home; redirecionamentos 301 do WordPress e 410 em `/hello-world` e `/test-post`; grafo JSON-LD (Organization + ProfessionalService, WebSite, Person; trilha nas internas), sem `sameAs` até os perfis existirem.
- Código na raiz em `src/` (Next 16.4, React 19.3, Tailwind 4, Vitest), como na Motors. `cacheComponents` ligado; páginas estáticas.
- Fontes: recorte latino da Geist variável do pacote `geist` (32 KB, `scripts/subsetar-fontes.sh`), pré-carregada. Geist Mono sai do caminho do LCP: carrega depois do `load` por `FontFace` (`FonteMonoTardia.tsx`). Medido: com as duas no início o LCP passava de 2,4 s.
- CSS em arquivo, sem `experimental.inlineCss`: inline, o CSS entrava 3 vezes no HTML (style + 2x no payload RSC) e o documento ia de 18 para 38 KB.
- Orquestrador e diagrama: o servidor entrega o HTML estático (zero JS); a versão interativa chega por `import()` a 700 px da tela. Motion só no pulso do diagrama. Canvas do hero por `import()` depois do `load` + ocioso.
- `content-visibility: auto` nas seções abaixo da dobra.
- Cores de etapa para texto e traço sobre a tinta: versões claras derivadas (violeta #9B8BE0, verde #5CC48A, azul #7FA3F0); as puras ficam para preenchimento com texto claro. Travado em `tests/contraste.test.ts`.
- ~~Partículas amostram a nuvem por conta de arco, não por `getPointAtLength` (que custava ~550 ms de tarefa longa no Lighthouse).~~ Motor trocado no refino de 09/10; `contorno.ts` ficou só para os testes do logo.

## 09/10/2026
- Identidade raiz geral: "digitalização e aceleração de negócios com IA" (colocar no mapa, multiplicar a operação). Automotivo vira o primeiro segmento, com hub `/segmentos/revendas-de-veiculos`. Substitui "revendas desde a home" de 08/10.
- Direção visual escura e tecnológica, com motion (seção 5 do plano e `memory/context/motion.md`). Formato editorial claro descartado.
- ~~Logo: família C1. Variação final em aberto (C1, C1a, C1b, C1c ou C1b+C1c).~~ Fechado em 09/10: C1d.
- Plugins instalados no ambiente: frontend-design, audit-suite, perf-profiler, parallax-threejs, axe-accessibility.
- Memória do projeto em `CLAUDE.md` + `memory/`; handoff da próxima etapa em `docs/HANDOFF.md`.

## 08/10/2026
- Case Motors: nome, logo e números podem ser publicados; o case declara que o fundador da V2O5 assina os guias da loja.
- ~~Público: Brasil inteiro com revendas desde a home~~ (trocado em 09/10). Atendimento nacional continua.
- Start Digital sai do cardápio público.
- Preço publicado "a partir de": tabela em `memory/context/oferta.md`. Site (estoque ou institucional) a partir de R$ 7.900. Pacote completo R$ 14.900 (24% sobre a soma das linhas). Sem fidelidade; implantação 50/50 ou até 6x.
- Infra de cliente por conta do cliente, na mesma fatura da V2O5, somada à mensalidade pelo valor real. Verba de mídia paga direto às plataformas.
- Cláusula de saída: loja recebe código, dados e domínio em até 15 dias.
- Nome fixo: "V2O5 Vendas e Tecnologia" (nome fantasia do CNPJ). ~~Direção B de logo~~ (trocada em 09/10).
- Assinatura: "Catalisador de vendas com IA", "IA" em âmbar.
- Consentimento: modelo da Motors (interesse legítimo, aviso informativo, oposição em /privacidade apagando `_fbp`, `_fbc` e chaves de campanha).
- Gestão de tráfego entra como linha de serviço. Outros setores continuam atendidos.
- rede-auto e Motogestor-v3 são produtos em estudo, fora do site; Motogestor vai para a linha da Motors.
- Fenauto 2026: não ir.
- Sede residencial: Perfil de Empresa como área de serviço, endereço oculto; site e schema só com cidade e estado (Almirante Tamandaré, PR).
- Dados do Chatwoot e do Search Console da Motors: esperar mais histórico; entram na atualização de 90 dias do case.
