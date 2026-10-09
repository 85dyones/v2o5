# Decisões

Log datado. Decisão nova entra no topo do dia; decisão revogada fica riscada com a data da troca.

## 09/10/2026 (protótipo da home, decisões técnicas)
- Código na raiz em `src/` (Next 16.4, React 19.3, Tailwind 4, Vitest), como na Motors. `cacheComponents` ligado; páginas estáticas.
- Fontes: recorte latino da Geist variável do pacote `geist` (32 KB, `scripts/subsetar-fontes.sh`), pré-carregada. Geist Mono sai do caminho do LCP: carrega depois do `load` por `FontFace` (`FonteMonoTardia.tsx`). Medido: com as duas no início o LCP passava de 2,4 s.
- CSS em arquivo, sem `experimental.inlineCss`: inline, o CSS entrava 3 vezes no HTML (style + 2x no payload RSC) e o documento ia de 18 para 38 KB.
- Orquestrador e diagrama: o servidor entrega o HTML estático (zero JS); a versão interativa chega por `import()` a 700 px da tela. Motion só no pulso do diagrama. Canvas do hero por `import()` depois do `load` + ocioso.
- `content-visibility: auto` nas seções abaixo da dobra.
- Cores de etapa para texto e traço sobre a tinta: versões claras derivadas (violeta #9B8BE0, verde #5CC48A, azul #7FA3F0); as puras ficam para preenchimento com texto claro. Travado em `tests/contraste.test.ts`.
- Partículas amostram a nuvem por conta de arco, não por `getPointAtLength` (que custava ~550 ms de tarefa longa no Lighthouse).

## 09/10/2026
- Identidade raiz geral: "digitalização e aceleração de negócios com IA" (colocar no mapa, multiplicar a operação). Automotivo vira o primeiro segmento, com hub `/segmentos/revendas-de-veiculos`. Substitui "revendas desde a home" de 08/10.
- Direção visual escura e tecnológica, com motion (seção 5 do plano e `memory/context/motion.md`). Formato editorial claro descartado.
- Logo: família C1. Variação final em aberto (C1, C1a, C1b, C1c ou C1b+C1c).
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
