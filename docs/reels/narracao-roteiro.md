# Roteiro de narração do lote 1 (para gravar a própria voz)

> **Atenção (25/11).** O padrão v2 sai sem narração; este roteiro é da versão de 17/11 e não foi refeito no foco em pequenos negócios. Antes de gravar a voz, gerar o roteiro de novo a partir de `video/v2.json` (os reels L1-09, L1-12 e L1-23 mudaram de assunto e a promessa mudou).

Cada reel tem trechos numerados. Grave **um arquivo por trecho**, com o nome indicado, e deixe em `gravacoes-voz/<codigo>/`. O script de vídeo corta o silêncio do começo e do fim de cada arquivo e ajusta a digitação, as legendas e o final ao tempo da sua fala (`node scripts/renderizar-lote.mjs ../docs/reels/lote-1.csv --voz-pasta gravacoes-voz`).

## Como gravar
- Um ambiente silencioso e com pouco eco (um quarto com cortinas e roupa por perto ajuda). Microfone do celular a uns 15 cm da boca, ou o do computador com fone de lapela. Formato WAV (ou M4A convertido), sem música nem efeito.
- Fale como numa conversa com um dono de empresa: ritmo vivo, sem ler em tom de locutor. A V2O5 vende simplicidade; a voz também.
- Pausa de verdade entre os trechos (um respiro), não dentro deles. O vídeo coloca a pausa dramática do gancho sozinho.
- Se errar, regrave só o trecho.
- A chamada final (`cta` e `link`) é igual nos 25 reels: grave **uma vez** em `gravacoes-voz/_cta/cta.wav` e `gravacoes-voz/_cta/link.wav`, e deixe nas pastas dos reels só os trechos do gancho e do corpo.
- Se for clonar a voz: use só gravações suas e um serviço ou modelo com termo claro de uso; e avise na bio ou na legenda que a narração é sintetizada, se for o caso.

## Como ler os números e as siglas
| Está escrito | Diga |
|---|---|
| IA | "i á" |
| CRM | "cê érre ême" |
| WhatsApp | "uatsáp" |
| V2O5 | "vê dois ó cinco" |
| 45 minutos | "quarenta e cinco minutos" |
| 93 de 100 | "noventa e três de cem" |
| 21 de outubro de 2026 | "vinte e um de outubro de dois mil e vinte e seis" |
| R$ 790 / R$ 2.900 / R$ 3.900 | "setecentos e noventa reais" / "dois mil e novecentos reais" / "três mil e novecentos reais" |
| 1 dia, 5 h, 47 min (nas telas) | não são falados |

## Trechos por reel

### L1-01 · Dor do dia a dia

| Arquivo | Trecho |
|---|---|
| `L1-01/00-gancho.wav` | Seu cliente pediu preço e sumiu. |
| `L1-01/01-gancho.wav` | Sabe por quê? |
| `L1-01/02-corpo.wav` | Muita venda se perde no intervalo entre a pergunta do cliente e a sua resposta. |
| `L1-01/03-corpo.wav` | Enquanto você demora, ele já está falando com outra empresa. |
| `L1-01/04-corpo.wav` | Isso só aparece quando alguém olha o caminho inteiro, da primeira mensagem ao fechamento. |
| `L1-01/05-corpo.wav` | É esse ponto que o diagnóstico procura. |

### L1-02 · Dor do dia a dia

| Arquivo | Trecho |
|---|---|
| `L1-02/00-gancho.wav` | Mais anúncio não resolve venda que se perde no WhatsApp. |
| `L1-02/01-corpo.wav` | Se o cliente chega e fica sem resposta, mais gente chegando só aumenta o que se perde. |
| `L1-02/02-corpo.wav` | Antes de gastar mais para atrair, vale ver o que acontece com quem já chegou. |
| `L1-02/03-corpo.wav` | O diagnóstico olha exatamente isso. |

### L1-03 · Dor do dia a dia

| Arquivo | Trecho |
|---|---|
| `L1-03/00-gancho.wav` | Antes: lead esfriando. |
| `L1-03/01-gancho.wav` | Depois: 93 de 100 respondidos em um minuto. |
| `L1-03/02-corpo.wav` | Esse número é da Motors Store, revenda de seminovos de Curitiba. |
| `L1-03/03-corpo.wav` | O agente de IA da loja responde pelo WhatsApp desde 21 de outubro de 2026. |
| `L1-03/04-corpo.wav` | Das 100 conversas lidas até 17 de novembro, 93 receberam a primeira resposta em até um minuto, com mediana de 38 segundos. |
| `L1-03/05-corpo.wav` | Esse é o resultado da loja, medido nas mensagens do agente. |

### L1-04 · Dor do dia a dia

| Arquivo | Trecho |
|---|---|
| `L1-04/00-gancho.wav` | Você está deixando o cliente esperando e nem percebe. |
| `L1-04/01-corpo.wav` | Quem atende pelo WhatsApp no meio de outras tarefas deixa a conversa para depois. |
| `L1-04/02-corpo.wav` | O cliente sente a espera antes de você. |
| `L1-04/03-corpo.wav` | O primeiro passo é ver onde as conversas ficam paradas. |
| `L1-04/04-corpo.wav` | Só depois dá para decidir o que mudar. |

### L1-05 · Dor do dia a dia

| Arquivo | Trecho |
|---|---|
| `L1-05/00-gancho.wav` | Quantas conversas do seu WhatsApp ficaram sem resposta esta semana? |
| `L1-05/01-corpo.wav` | Se você não sabe esse número, já é um sinal. |
| `L1-05/02-corpo.wav` | Sem ele, não dá para saber quanta venda ficou pelo caminho. |
| `L1-05/03-corpo.wav` | Contar já mostra o problema, e problema que aparece dá para resolver. |
| `L1-05/04-corpo.wav` | No diagnóstico a gente olha isso com você. |

### L1-06 · Demonstração

| Arquivo | Trecho |
|---|---|
| `L1-06/00-gancho.wav` | Veja o caminho de um lead, do formulário ao atendimento. |
| `L1-06/01-corpo.wav` | Este é um pedido de diagnóstico de teste, com dados fictícios. |
| `L1-06/02-corpo.wav` | O lead entra com a origem registrada: de qual link e de qual página ele veio. |
| `L1-06/03-corpo.wav` | Quem atende já sabe de onde ele chegou. |
| `L1-06/04-corpo.wav` | Ninguém precisa perguntar de novo. |

### L1-07 · Demonstração

| Arquivo | Trecho |
|---|---|
| `L1-07/00-gancho.wav` | Este é um agente de IA respondendo um cliente no WhatsApp. |
| `L1-07/01-corpo.wav` | A conversa é um exemplo montado, sem dado de cliente. |
| `L1-07/02-corpo.wav` | O agente responde, pergunta o que falta e passa para uma pessoa quando o cliente pede algo que só a equipe decide. |
| `L1-07/03-corpo.wav` | Na Motors Store, ele atende desde 21 de outubro de 2026. |

### L1-08 · Demonstração

| Arquivo | Trecho |
|---|---|
| `L1-08/00-gancho.wav` | Um site que grava o lead no CRM. |
| `L1-08/01-gancho.wav` | Veja como. |
| `L1-08/02-corpo.wav` | O visitante preenche o formulário. |
| `L1-08/03-corpo.wav` | O dado chega ao CRM com a origem e a página. |
| `L1-08/04-corpo.wav` | A equipe vê o contato e segue a conversa pelo WhatsApp. |
| `L1-08/05-corpo.wav` | É esse tipo de ligação que a V2O5 faz em Sites e Integrações. |

### L1-09 · Demonstração

| Arquivo | Trecho |
|---|---|
| `L1-09/00-gancho.wav` | Qual link trouxe esse cliente? |
| `L1-09/01-gancho.wav` | Veja onde fica a resposta. |
| `L1-09/02-corpo.wav` | Todo link leva uma etiqueta de origem. |
| `L1-09/03-corpo.wav` | Quando o cliente pede o diagnóstico, a etiqueta vai junto com o contato. |
| `L1-09/04-corpo.wav` | Assim dá para saber qual post, anúncio ou página trouxe cada pessoa. |
| `L1-09/05-corpo.wav` | A V2O5 usa esse método nos próprios reels. |

### L1-10 · Demonstração

| Arquivo | Trecho |
|---|---|
| `L1-10/00-gancho.wav` | Veja o que acontece nos 45 minutos do diagnóstico. |
| `L1-10/01-corpo.wav` | Primeiro você conta como vende hoje, em um formulário de dois minutos. |
| `L1-10/02-corpo.wav` | Depois são 45 minutos com o fundador, por vídeo ou WhatsApp. |
| `L1-10/03-corpo.wav` | Se houver um bom caso, a V2O5 propõe a solução com escopo, prazo e investimento por escrito. |
| `L1-10/04-corpo.wav` | Se não houver, a conversa termina ali. |

### L1-11 · Erro comum

| Arquivo | Trecho |
|---|---|
| `L1-11/00-gancho.wav` | Seu site está no ar. |
| `L1-11/01-gancho.wav` | Você sabe quem entrou nele? |
| `L1-11/02-corpo.wav` | Site sem medição é uma vitrine sem câmera. |
| `L1-11/03-corpo.wav` | Você não vê quem passou nem o que olhou. |
| `L1-11/04-corpo.wav` | Sem esse dado, decidir onde investir vira palpite. |
| `L1-11/05-corpo.wav` | Medir é o primeiro passo. |

### L1-12 · Erro comum

| Arquivo | Trecho |
|---|---|
| `L1-12/00-gancho.wav` | Você sabe de qual anúncio veio o seu último cliente? |
| `L1-12/01-corpo.wav` | Sem a origem registrada, todo resultado vira palpite. |
| `L1-12/02-corpo.wav` | Com ela, dá para cortar o que não traz cliente e reforçar o que traz. |
| `L1-12/03-corpo.wav` | Mas só se o dado existir desde o primeiro contato. |
| `L1-12/04-corpo.wav` | No diagnóstico a gente confere se ele existe na sua empresa. |

### L1-13 · Erro comum

| Arquivo | Trecho |
|---|---|
| `L1-13/00-gancho.wav` | Formulário que cai num e-mail esquecido é lead perdido. |
| `L1-13/01-corpo.wav` | Muito site recebe o pedido e deixa ele parado numa caixa de entrada. |
| `L1-13/02-corpo.wav` | O cliente esperou, ninguém respondeu e ele procurou outro. |
| `L1-13/03-corpo.wav` | O caminho do formulário até uma pessoa precisa estar desenhado. |
| `L1-13/04-corpo.wav` | É um dos pontos que a gente confere. |

### L1-14 · Erro comum

| Arquivo | Trecho |
|---|---|
| `L1-14/00-gancho.wav` | WhatsApp sem dono vira conversa que ninguém responde. |
| `L1-14/01-corpo.wav` | Quando todo mundo pode responder, cada um acha que o outro já respondeu. |
| `L1-14/02-corpo.wav` | Defina quem atende, em que ordem e o que passa para a equipe. |
| `L1-14/03-corpo.wav` | É simples e evita conversa parada. |

### L1-15 · Erro comum

| Arquivo | Trecho |
|---|---|
| `L1-15/00-gancho.wav` | Você paga por um site novo, mas o problema era outro. |
| `L1-15/01-corpo.wav` | Site bonito não corrige atendimento lento. |
| `L1-15/02-corpo.wav` | Antes de trocar o site, vale achar onde o cliente realmente trava. Às vezes o gargalo está depois do clique. |
| `L1-15/03-corpo.wav` | É para isso que serve o diagnóstico. |

### L1-16 · Contra o jeito antigo

| Arquivo | Trecho |
|---|---|
| `L1-16/00-gancho.wav` | Planilha e WhatsApp manual: até quando isso funciona? |
| `L1-16/01-corpo.wav` | Funciona enquanto são poucos contatos. |
| `L1-16/02-corpo.wav` | Quando o volume cresce, alguém esquece de responder e ninguém sabe quem. |
| `L1-16/03-corpo.wav` | Um fluxo conectado guarda cada contato e mostra o que está parado. |
| `L1-16/04-corpo.wav` | A pergunta é se a sua operação já passou desse ponto. |

### L1-17 · Contra o jeito antigo

| Arquivo | Trecho |
|---|---|
| `L1-17/00-gancho.wav` | Orçamento escondido ou preço público? |
| `L1-17/01-gancho.wav` | Aqui o preço aparece. |
| `L1-17/02-corpo.wav` | Na V2O5, cada solução tem escopo fechado e preço de referência público. |
| `L1-17/03-corpo.wav` | Presença Digital Local, a partir de R$ 790. |
| `L1-17/04-corpo.wav` | Sites e Integrações, a partir de R$ 2.900. |
| `L1-17/05-corpo.wav` | Sprint de Eficiência, a partir de R$ 3.900. |
| `L1-17/06-corpo.wav` | Nenhuma obriga a seguinte. |

### L1-18 · Contra o jeito antigo

| Arquivo | Trecho |
|---|---|
| `L1-18/00-gancho.wav` | Seu CRM ainda é um caderno? |
| `L1-18/01-corpo.wav` | Anotação solta não mostra qual contato está esquecido. |
| `L1-18/02-corpo.wav` | Um CRM ligado ao WhatsApp mostra a fila, a origem e o que passou do prazo. |
| `L1-18/03-corpo.wav` | Para quem vende pelo WhatsApp, esse é o primeiro ganho de organização. |

### L1-19 · Contra o jeito antigo

| Arquivo | Trecho |
|---|---|
| `L1-19/00-gancho.wav` | Responder um por um, todo dia, ainda é o seu processo? |
| `L1-19/01-corpo.wav` | Parte das perguntas se repete todo dia: preço, horário, prazo. |
| `L1-19/02-corpo.wav` | Um agente de IA responde essas e passa para uma pessoa o que precisa de decisão. |
| `L1-19/03-corpo.wav` | A equipe fica com as conversas que importam. |

### L1-20 · Contra o jeito antigo

| Arquivo | Trecho |
|---|---|
| `L1-20/00-gancho.wav` | Sistema que não conversa com o resto: você digita duas vezes. |
| `L1-20/01-corpo.wav` | Cada dado digitado à mão em dois lugares é um erro esperando para acontecer. |
| `L1-20/02-corpo.wav` | Integrar o sistema que você já usa com o site e o WhatsApp tira esse trabalho. |
| `L1-20/03-corpo.wav` | Isso entra no desenho de uma solução em Sites e Integrações. |

### L1-21 · Bastidor do diagnóstico

| Arquivo | Trecho |
|---|---|
| `L1-21/00-gancho.wav` | 45 minutos para achar o que trava a sua venda. |
| `L1-21/01-corpo.wav` | O diagnóstico é uma conversa com o fundador sobre como a sua empresa aparece, atende e vende hoje. |
| `L1-21/02-corpo.wav` | O objetivo é identificar o gargalo que mais pesa e recomendar por onde começar. |
| `L1-21/03-corpo.wav` | É uma sessão inicial gratuita, sem compromisso de contratação. |

### L1-22 · Bastidor do diagnóstico

| Arquivo | Trecho |
|---|---|
| `L1-22/00-gancho.wav` | O que a V2O5 olha primeiro numa empresa. |
| `L1-22/01-corpo.wav` | Olhamos como o cliente chega, quem responde e para onde vai o contato. |
| `L1-22/02-corpo.wav` | Esse caminho mostra onde a venda esfria. |
| `L1-22/03-corpo.wav` | O resto vem depois, um problema de cada vez. |
| `L1-22/04-corpo.wav` | Quem decide o ritmo é você. |

### L1-23 · Bastidor do diagnóstico

| Arquivo | Trecho |
|---|---|
| `L1-23/00-gancho.wav` | Um problema por vez: é assim que a V2O5 começa. |
| `L1-23/01-corpo.wav` | O diagnóstico não é um mapeamento completo da empresa. |
| `L1-23/02-corpo.wav` | Ele identifica e prioriza um gargalo. |
| `L1-23/03-corpo.wav` | Depois, se fizer sentido, a V2O5 propõe a solução que cabe nesse problema, com escopo e preço por escrito. |

### L1-24 · Bastidor do diagnóstico

| Arquivo | Trecho |
|---|---|
| `L1-24/00-gancho.wav` | Como a V2O5 escolhe por onde começar. |
| `L1-24/01-corpo.wav` | Primeiro entendemos onde o cliente se perde. |
| `L1-24/02-corpo.wav` | Depois vemos o impacto desse ponto. |
| `L1-24/03-corpo.wav` | Só então indicamos a solução: presença digital, site integrado ou um sprint de eficiência. |
| `L1-24/04-corpo.wav` | Quem decide o próximo passo é você. |

### L1-25 · Bastidor do diagnóstico

| Arquivo | Trecho |
|---|---|
| `L1-25/00-gancho.wav` | Quer saber o que o diagnóstico vai olhar na sua empresa? |
| `L1-25/01-corpo.wav` | Você preenche um formulário de dois minutos com como vende hoje. |
| `L1-25/02-corpo.wav` | Na conversa, olhamos presença, atendimento, operação e funil, com os seus números. |
| `L1-25/03-corpo.wav` | Se você não tiver os números à mão, a gente conversa e descobre juntos o que falta medir. |

### Chamada final, gravada uma vez (`_cta`)
| Arquivo | Trecho |
|---|---|
| `_cta/cta.wav` | Descubra onde sua empresa pode funcionar melhor. Gratuitamente. |
| `_cta/link.wav` | Link na bio. |

