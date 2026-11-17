# Promessa, gancho e CTA: seis opções para escolher (17/11/2026)

> **Decisão do Dyones (17/11):** o texto da landing e dos reels é o dele, não uma das seis opções. Título "Descubra onde sua empresa pode funcionar melhor. Gratuitamente."; subtítulo "Em 45 minutos, analisamos como sua empresa funciona, identificamos gargalos e oportunidades e recomendamos por onde começar."; botão "Agendar diagnóstico gratuito"; microtexto "Sem custo e sem compromisso de contratação." Já aplicado em `/diagnostico` (`src/conteudo/diagnostico.ts`). O CTA dos reels repete a promessa: "Descubra onde sua empresa pode funcionar melhor. Gratuitamente. O link está na bio." Os ganchos específicos das opções abaixo carregam a força do reel; a promessa só fecha o vídeo e abre a landing. Abaixo, a análise original.

A promessa é uma só para todos os reels e para o título do `/diagnostico`, palavra por palavra. O gancho muda de reel para reel. O CTA leva sempre ao mesmo destino (o link na bio). Por isso a escolha mais pesada é a promessa; os ganchos das outras opções viram ângulos do lote 1.

Regras que todas cumprem: até 10 palavras na promessa, até 12 no gancho, sem número que não esteja na ficha, sem travessão. A opção B depende de um número do case Motors e traz o período.

## As seis opções

### A. A promessa do diagnóstico
- **Promessa:** Em 45 minutos, descubra onde sua empresa perde venda.
- **Gancho:** Seu cliente pediu preço e sumiu. Sabe por quê?
- **CTA:** Quer saber o seu? O diagnóstico é gratuito. O link está na bio.

### B. A prova da Motors
- **Promessa:** Seu WhatsApp respondendo cliente em menos de um minuto.
- **Gancho:** A Motors responde 93 de cada 100 clientes em até 1 minuto.
- **CTA:** Quer isso na sua empresa? Peça o diagnóstico gratuito pelo link na bio.
- **Fonte e período:** `memory/projects/case-motors.md`, 100 conversas lidas do banco até 17/11/2026, mediana de 38 segundos, medida nas mensagens do Ney. Fala da Motors, nunca vira promessa de resultado para outra empresa. Por isso é bom gancho e é fraca como promessa.

### C. O gargalo com nome
- **Promessa:** Em 45 minutos, o gargalo da sua venda ganha nome.
- **Gancho:** 45 minutos para achar o que trava a sua venda.
- **CTA:** Gratuito. Peça o seu pelo link na bio.

### D. De onde vem a venda
- **Promessa:** Saiba de onde vem cada cliente da sua empresa.
- **Gancho:** Você sabe de qual anúncio veio o seu último cliente?
- **CTA:** Eu mostro no diagnóstico gratuito. O link está na bio.

### E. Preço aberto
- **Promessa:** Um problema por vez, com escopo e preço fechados.
- **Gancho:** Quanto custa resolver o que trava a sua venda? Aqui o preço é público.
- **CTA:** Veja os preços e peça o diagnóstico gratuito. O link está na bio.

### F. A frase do site
- **Promessa:** Do problema ao resultado, pelo caminho mais simples.
- **Gancho:** Seu processo tem 7 passos onde precisava de 2?
- **CTA:** Peça o diagnóstico gratuito pelo link na bio.
- Observação: é o H1 do site, mas não diz o que a pessoa ganha. O "7 passos onde precisava de 2" é só uma forma de gancho; não é número da ficha e sairia antes de gravar.

## Avaliação (0 a 2 por critério)

| Critério | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| Diz o que a pessoa ganha | 2 | 2 | 1 | 2 | 1 | 0 |
| Específica o bastante para parar o dedo | 2 | 2 | 2 | 2 | 1 | 0 |
| Dá para cumprir hoje, sem prova que falta | 2 | 1 | 2 | 2 | 2 | 2 |
| Baixo atrito (gratuito, curto, uma ação) | 2 | 1 | 2 | 1 | 1 | 1 |
| Serve para qualquer segmento (não só revenda) | 2 | 0 | 2 | 2 | 2 | 2 |
| Combina com o `/diagnostico` que já existe | 2 | 1 | 2 | 1 | 1 | 1 |
| **Total (máx. 12)** | **12** | **7** | **11** | **10** | **8** | **6** |

A nota é minha leitura e vale como argumento, não como medida. Quem decide é o dado do lote 1.

## Minha recomendação

**Promessa A**, com um ajuste: no CTA, "gratuito" aparece uma vez e o verbo vem antes ("Peça o seu"). Motivos: diz o ganho, vale para qualquer segmento, cumpre-se no diagnóstico que já existe e é a mais fácil de provar no `/diagnostico` (a landing já pede o diagnóstico gratuito de 45 minutos).

Distribuição dos ganchos no lote 1:
- Ângulo da dor: gancho de A ("pediu preço e sumiu").
- Ângulo da demonstração: gancho de B (o Ney da Motors, com a tela mascarada).
- Ângulo do erro comum: gancho de D (de onde vem a venda).
- Ângulo do jeito antigo: gancho de F ajustado e de E (preço aberto).
- Ângulo do bastidor: gancho de C ("45 minutos para achar o que trava a sua venda").

Assim a promessa é uma só, e as outras cinco ideias entram como ângulos que os números do lote 1 vão ranquear. A promessa também pode ser A/B testada na landing depois do lote 2, trocando o título pelo texto da opção C. Hoje, o `/diagnostico` e os reels usam a mesma frase.

## Para você decidir
Responda com a letra (A a F) ou diga "A, com tal troca". Com isso eu:
1. Travo a promessa na ficha e nos prompts.
2. Gero os 25 ganchos e roteiros do lote 1 (prompts 3 e 4).
3. Proponho o novo título do `/diagnostico` num PR separado, para você ver no preview antes de ir ao ar.
