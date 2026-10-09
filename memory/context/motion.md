# Direção visual e motion

## Direção (09/10)
Escura e tecnológica, acabamento de produto de IA de ponta, raiz da marca mantida: fundo tinta com ruído fino; seções claras só para leitura longa; âmbar como energia; violeta/verde/azul nas etapas dos diagramas; Geist + Geist Mono; o símbolo C1 é o mesmo desenho das partículas do hero. Da Motors fica a engenharia (tokens, contraste testado, fontes locais), não a estética.

## O que entra (avaliação da proposta de motion recebida em 09/10)
| Peça | Como |
|---|---|
| Hero catalisador | Molécula V2O5 em partículas que se aglutinam e aceleram em linhas de energia perto do cursor ou com foco no CTA. Canvas 2D ou OGL, nada de Three.js. Carrega depois do H1; pausa fora da tela; estático com redução de movimento e em aparelho fraco |
| Diagrama interativo de arquitetura | Clique em WhatsApp, agente, CRM, rastreamento; pulso percorre o fluxo. SVG + Motion, carregado ao entrar na tela. Sem React Flow |
| Orquestrador de soluções | Simulação: mensagem chega, agente consulta base (RAG), responde, CRM atualiza. Rótulo "demonstração" |
| Terminal | Pequeno, no case e em "como funciona", com formato real de eventos anonimizados. Fora do hero |
| Bento grid | Sim, para soluções e números. Borda de luz âmbar só no card em foco; sem tilt 3D (cara de template) |
| Contadores / decodificação | Só número real do case (ver `memory/projects/case-motors.md`). Proibidos os exemplos do documento ("-70%", "3.4x") |
| Narrativa por rolagem | Etapas problema → fluxo → resultado ligadas ao scroll, sem travar a tela; no celular vira sequência |
| Simulador de impacto | Régua (time, volume); conta e premissas visíveis; resultado como estimativa; leva ao diagnóstico (fase 2) |

## Pilha
Motion (ex-Framer Motion) por seção · CSS `animation-timeline` onde houver suporte · GSAP ScrollTrigger só se precisar · canvas 2D/OGL nas partículas · sem Lenis/rolagem sequestrada · `prefers-reduced-motion` desliga tudo, com teste.

## Referências de acabamento
sierra.ai, decagon.ai, morningside.ai (acabamento, não peso de JS).
