# Revisão de português, ganchos e conversão (27/11/2026)

Pedido do Dyones: "revise o português, concordância... os ganchos e o poder de conversão de cada texto elaborado".

Quatro revisões em paralelo leram todo o texto:
- **Site:** as 19 rotas.
- **Redes:** os 15 carrosséis, as legendas dos fixos, os perfis e os serviços do LinkedIn.
- **Reels:** os 25 reels (tela, capa e legenda).
- **Agenda:** de 26/11 a 07/12.

## Já aplicado (PR #64 e PR #15 de `v2o5-diagnosticos`)

O que era erro objetivo ou quebrava regra do projeto já foi corrigido, sem mudar a mensagem.

**Português**
- **Concordância:** "pacote Estruturada" virou "Presença Estruturada", e "continuarem" virou "continuar".
- **Regência e crase:** "responde às dúvidas", "respondeu à mesma pergunta", "quem chamou teve resposta?" e "de que o servidor precisa".
- **Frases truncadas ou ambíguas:** "Nenhuma obriga a comprar a seguinte" e "quem procura perto" (que, do jeito que estava, aparecia no Maps no lugar do negócio).
- **Tratamento:** "podemos te chamar" virou "podemos chamar você".
- **Pontuação:** "Gratuitamente.:" no Facebook.

**Regras do projeto**
- "Lead" e "funil" saíram do fixo 3 e do carrossel do case.
- CRM e anúncio saíram dos carrosséis.
- As notas "X, não Y" foram reescritas sem a oposição.
- O L1-03 deixou de afirmar um "antes" que nunca foi medido.

**O fixo 3 de hoje no LinkedIn** saiu com o PDF e a legenda corrigidos. A legenda agora pede o diagnóstico, e o primeiro comentário leva dois links.

**O que ainda falta fazer**
- As legendas do Instagram e do Facebook que já foram ao ar se editam no próprio post. O arquivo de cada uma está em `docs/social/posts-fixos.md`.
- Os reels corrigidos só mudam no vídeo depois de renderizar de novo. Para isso preciso das cinco músicas outra vez (item 31).

## Como responder

"Aprovo tudo", "aprovo menos 4 e 12" ou ajuste por número. Os itens 32 a 37 pedem uma decisão sua sobre um fato. Recomendo tudo o que está nas partes 1 a 3.

---

## 1. Site

### Regra do projeto que ainda escapava (prioridade)

1. **Case Motors, chamada final.** A frase começa com "Não precisa ser revenda", que é a construção "não precisa ser X" que o projeto evita.
   - Proposta: "Vale para qualquer loja ou serviço que vende pelo WhatsApp: o agente responde na hora com o que você aprovou e passa cada cliente para a pessoa certa, com o resumo da conversa." O resto da chamada fica como está.
2. **/sobre, propósito.** Hoje: "Pequeno negócio não precisa de sistema grande. Precisa ser achado por quem procura perto, responder rápido e lembrar de quem já comprou." A frase junta duas coisas que o projeto evita: a construção "não precisa de X, precisa de Y" e uma tríade.
   - Proposta: "O pequeno negócio vive de quem procura perto e de quem volta a comprar. Para cuidar disso, quase nunca precisa de sistema grande. Eu escolho o caminho mais simples."
   - Os três "Às vezes..." logo abaixo passam a "Às vezes basta arrumar o perfil no Google." / "Em outros casos, um agente que responde na hora no WhatsApp." / "Ou ligar o site ao sistema que você já usa."
3. **Home, provas do bloco de cases.** "Começamos pelo cliente que precisa ser atendido, não por uma lista de funcionalidades." usa a construção "X, não Y" e repete o princípio do topo.
   - Proposta: tirar a frase. A lista fica com duas provas e deixa de ser tríade.

### O fecho de todas as páginas (maior ganho)

4. **Fecho padrão** (soluções, preços, continuidade e Sobre). Hoje: "Comece pelo diagnóstico, que é gratuito." / "... A sessão é gratuita e sem compromisso." / botão "Pedir diagnóstico".
   - Proposta: título "Descubra onde seu negócio perde cliente."; texto "Em 45 minutos de conversa, o fundador vê com você como o cliente acha o seu negócio e como ele é atendido, e mostra por onde começar. Sem custo e sem compromisso."; botão "Pedir diagnóstico gratuito".
   - O fecho passa a terminar na promessa, sem o "gratuito" repetido duas vezes.
5. **Em /precos**, título próprio: "Não sabe qual escolher? Comece pelo diagnóstico gratuito." Ele responde a quem acabou de ver três preços.
6. **Botão do topo e do rodapé:** "Pedir diagnóstico" vira "Pedir diagnóstico gratuito". "Gratuito" é a palavra que mais pesa para esse público. Confiro a largura do topo antes.
7. **/guias:** hoje o único botão volta para a home, então a página não leva a lugar nenhum.
   - Proposta: botão principal "Pedir diagnóstico gratuito" e "Voltar" como secundário.

### Home

8. **Ordem das seções:** Hero, Dores, Soluções, Escada, no lugar de Hero, Soluções, Escada, Dores. O dono se reconhece em "Quem procura perto de casa acaba no vizinho" antes de ver preço.
9. **Degrau do diagnóstico na escada:** hoje é o único sem botão.
   - Proposta: o degrau ganha o botão "Pedir diagnóstico gratuito" e "Sem custo e sem compromisso." no lugar de "Não inclui implementação nem acompanhamento de resultados.". Essa ressalva continua no FAQ.
10. **"Se não houver um bom caso" / "Havendo um bom caso"** (home e /diagnostico) viram "Se não fizer sentido contratar" / "Se fizer sentido seguir". "Bom caso" é fala de consultor.
11. **Sobretítulos e títulos de seção**
    - Indicadores: "Resultado antes de vaidade técnica" vira "Como saber se funcionou".
    - Cases: "Dois atendimentos no ar." vira "Funcionando hoje em dois clientes."
12. **"Ver valores e condições"** aparece duas vezes, levando a lugares diferentes. Os dois links passam a ser "Ver os preços das soluções" e "Ver os planos de continuidade".
13. **FAQ "O agente de IA atende sozinho?"** passa a começar por "Em parte.": "Em parte. Responde sozinho na hora, com as informações do seu negócio, e chama alguém da equipe quando a conversa pede uma pessoa."

### /precos, /diagnostico e /sobre

14. **H1 de /precos:** "Três soluções, com preço de referência." vira "O preço de cada solução, antes de qualquer conversa."
    - Texto ao lado: "Cada pacote diz o que entra e o que fica de fora. Na dúvida, o diagnóstico gratuito ajuda a escolher."
15. **/diagnostico**
    - O passo 3 passa a "Uma proposta, se fizer sentido": "Se fizer sentido seguir, você recebe por escrito o que entra, o prazo e o valor. Se não fizer, a conversa termina ali, sem custo."
    - O erro de envio oferece o WhatsApp: "Não deu para enviar agora. Tente de novo ou chame no WhatsApp."
    - "Segmento" vira "Ramo do negócio".
16. **/sobre**
    - Saem as duas notas técnicas das ferramentas: "VPS é uma modalidade..." e "Modelos de linguagem... não são a mesma coisa".
    - A chamada final passa a "Vamos ver onde o seu negócio perde cliente?" / "São 45 minutos comigo, sem custo: como o cliente acha o seu negócio, como é atendido e se volta a comprar."
17. **/continuidade**
    - A garantia de saída vira prova de que o cliente não fica preso: "Se quiser sair, é só avisar antes: a V2O5 entrega o código, os dados e os acessos, nos termos do contrato."
    - "Pequenas intervenções" vira "pequenas melhorias".
    - No menu, "Continuidade" vira link simples, sem submenu.
18. **/privacidade:** quem chama pelo WhatsApp a partir dessa página recebe uma mensagem pronta própria, "Olá! Vim pelo site da V2O5 e quero falar sobre os meus dados.". O trecho que o n8n reconhece continua igual.

### Páginas de solução

19. **Em todas**
    - "O que a V2O5 entrega nesta linha." vira "O que você recebe."
    - "Em produção" vira "Funcionando hoje".
    - "Começa pelo diagnóstico gratuito, com o escopo fechado antes da implantação." vira "Começa pelo diagnóstico gratuito. O que entra e o preço ficam por escrito antes de começar."
20. **Presença Digital Local**
    - H1: "Presença digital para negócios locais: o cliente acha você no Google e chama no WhatsApp."
    - Problema: "Perfil no Google com o horário antigo e sem foto", para combinar com o título "horário errado".
21. **Sites**
    - Título do problema: "Quem procura no Google acha o concorrente."
    - Resumo: "Site próprio, achado no Google e rápido no celular, que mostra de onde veio cada cliente. Se precisar, ele se liga ao seu sistema."
22. **Atendimento com IA**
    - Resumo: "O cliente tem resposta à noite e no fim de semana, com as informações do seu negócio. A equipe entra quando a conversa pede."
    - Seção do case: "O Ney atende o WhatsApp da Motors Store."
    - "Oferta principal" vira "Mais completo".
    - FAQ "Preciso de um CRM?": "Não precisa ter um antes. O agente registra cada conversa na lista de contatos que a V2O5 entrega ou no sistema que você já usa."
23. **CRM com WhatsApp**
    - H1: "CRM com WhatsApp para saber quem atender e quem chamar de volta."
    - Sai a entrega "Quantas pessoas usam", que repete o FAQ.
24. **Automação:** o resumo passa a usar exemplos que o dono reconhece: "O aviso de pedido pronto e o convite para avaliar passam a sair sozinhos, pelo WhatsApp e pelo sistema que você já usa."
25. **Case Motors**
    - H1: "Motors Store: o caminho do cliente, do Google ao vendedor."
    - Resumo sem "lead": "... a passagem do cliente ao CRM ...".
    - Fora dos números medidos, "qualifica" vira "atende" e "dá a nota".
    - A ficha de exemplo do CRM fica como está, porque reproduz o formato real.

## 2. Redes: carrosséis e legendas

26. **Capas dos carrosséis "por dentro"** (Presença hoje às 17:30, Sites 28/11, Atendimento 29/11). A capa atual traz o nome do produto, que não faz ninguém parar. A dor vai para o título e o nome desce para o subtítulo:

    | Carrossel | Título | Subtítulo |
    |---|---|---|
    | Presença | "O cliente procura no Google e acha horário errado?" | "Presença Digital Local, por dentro: o que entra e quanto custa." |
    | Sites | "Seu site leva o cliente até o WhatsApp?" | "Sites & Integrações, por dentro: o que entra e quanto custa." |
    | Atendimento | "Quem atende o seu WhatsApp fora do horário?" | "Atendimento com IA, por dentro: o que entra e quanto custa." |

    A primeira linha da legenda acompanha, como pergunta de preço: "Quanto custa o cliente achar seu negócio no Google?" e o equivalente para Sites e para Atendimento.
27. **"Diagnóstico como diferencial"** (nota 2 de 5).
    - Capa: "Antes de gastar com tecnologia, saiba onde você perde cliente."
    - No slide 5 sai "Comprar, integrar, automatizar ou desenvolver:".
28. **Carrosséis de dor**
    - **dor-lead-esfria, slide 4:** "Ninguém respondeu ainda." vira "Você responde: 'Bom dia!'". Assim a cena mostra a resposta chegando 14 h depois.
    - **"Quando" do slide 6:** cada carrossel passa a falar da própria dor.
      - Recompra: "Quando quem já comprou some e ninguém chama de volta."
      - Avaliações: "Quando quem comprou sai satisfeito e ninguém pede a avaliação."
      - Site sem WhatsApp: "Quando o site não leva quem chega até a conversa."
    - **dor-perfil-parado, slide 3:** "não seguem a identidade da empresa" vira "mudam de uma rede para outra". "Identidade" puxa para o Branding, que saiu.
    - **dor-sistemas-separados, capa:** "Quantas vezes você anotou a mesma venda esta semana?"
29. **Fixos**
    - **Como atuamos, capa:** "Pedir o diagnóstico não obriga você a nada. Veja o que vem depois." Ela tira o medo de ser empurrado para um pacote. Mesma linha na legenda do fixo 2, que no LinkedIn ganha a promessa antes do "Link no primeiro comentário".
    - **Case Motors, slide 4:** a etiqueta "O site e o estoque" vira "O site e o WhatsApp", porque os dois números são de contatos.
    - **Bio do Instagram:** "Descubra onde seu negócio perde cliente. Gratuitamente." / "Diagnóstico de 45 minutos, on-line, em todo o Brasil." / "Agende pelo link." Assim a bio repete a promessa de todos os botões.

## 3. Reels

30. **Ganchos a trocar** (texto na tela, capa e primeira linha da legenda):

    | Reel | Nota hoje | Proposta | Por quê |
    |---|---|---|---|
    | L1-22 | 2 | "Onde olhar primeiro\|[no seu negócio]?" | Hoje abre com uma marca que ninguém conhece. |
    | L1-24 | 2 | "Google ou WhatsApp?\|[Por onde começar?]" | Hoje é abstrato. |
    | L1-21 | 3 | "Você perde cliente.\|[Em 45 minutos, vemos onde.]" | Sai hoje às 14:00; se não der tempo, vale para o lote 2. |
    | L1-10 | 3 | "Como são os 45 minutos\|do [diagnóstico gratuito]?" | Os passos passam a "Se fizer sentido: proposta [por escrito]." e "Se não: a conversa [termina ali]." |
    | L1-06 | 3 | "Como o último cliente\|[achou você]?" | — |
    | L1-08 | 3 | "Pedido no site,\|[resposta no WhatsApp]." | Hoje repete o gancho do L1-13, que sai no dia seguinte. |
    | L1-07 | — | Capa: "O cliente pediu desconto. Quem respondeu?" | Hoje a capa só descreve a cena. |

    **Frases de efeito:**
    - L1-03: "E o seu cliente / espera [quanto tempo]?"
    - L1-18: "Caderno não avisa / [quem chamar]."

    **Passos:**
    - L1-11 e L1-13: o passo 1 deixa de repetir o gancho.
    - L1-25: o passo 4 passa a "Sem custo e sem [compromisso]."

    **Legendas:**
    - Antes da promessa, entra a linha "Diagnóstico gratuito de 45 minutos com o fundador.".
    - No LinkedIn, "Link do diagnóstico gratuito no primeiro comentário.".
    - No L1-17, os três preços de entrada.
31. **Para os reels mudarem no vídeo** preciso que você mande de novo as cinco músicas. O contêiner reiniciou e apagou as músicas e os vídeos gerados. As gravações de tela eu refaço a partir do site.
    - Sem as músicas, consigo entregar os reels corrigidos sem trilha, para você pôr a música da biblioteca no app.
    - Corrigido só na fonte até agora: L1-02, L1-07, L1-09, L1-13, L1-15, L1-19, L1-20, L1-22 e L1-23.

## 4. Fatos para você confirmar

32. **Sites, FAQ "O site fica no meu nome?".** A resposta diz que o código é entregue "nos termos do contrato", e a entrega-base diz "O código é seu". Qual vale?
33. **Atendimento Integrado, item "Uma rodada de ajustes com as conversas reais".** É a mesma rodada do Essencial (aí sai) ou uma a mais (vira "Mais uma rodada de ajustes")?
34. **CRM.** A página promete o aviso na hora certa e o banco de dados com backup diário. Em qual pacote do Atendimento com IA isso entra?
35. **Carrossel dor-formulario.** Ancorar em "Landing Page, a partir de R$ 2.900", que já inclui o formulário chegando a quem atende, em vez de "Site Conectado, a partir de R$ 9.900"? Para o pequeno negócio, R$ 9.900 assusta.
36. **16ª Vara Cível.** O resumo fala em "onze setores e o gabinete", mas a lista "Os onze caminhos" já inclui o despacho com a magistrada. São onze ou doze?
37. **LinkedIn, Especialidades.** "CRM com WhatsApp" é o nome do recurso no site e palavra de busca, mas nas redes a regra troca CRM por "lista de clientes". Mantenho?

## Notas por peça (1 a 5, poder de conversão)

| Peça | Nota | Peça | Nota |
|---|---|---|---|
| Home | 4 | Case Motors | 3 |
| /precos | 3 | Case 16ª Vara | 4 |
| /diagnostico | 4 | Carrosséis de dor | 4 a 5 |
| /sobre | 3 | Carrosséis "por dentro" | 2 |
| Presença | 3 | Fixos | 3 a 4 |
| Sites | 4 | Reels L1-01, L1-09, L1-23 | 5 |
| Atendimento com IA | 4 | Reels L1-22, L1-24 | 2 |
| CRM e Automação | 3 | /guias | 1 |

**O que está forte e fica**
- **Dores da home:** "Quem procura perto de casa acaba no vizinho." e "Quando a resposta sai, o cliente já comprou em outro lugar."
- **Problemas das páginas de solução:** "O contato chega às 21h e é respondido no dia seguinte.", com a fonte da HBR, "Os clientes moram no celular de quem atende." e "A tarefa existe, mas mora na cabeça de uma pessoa."
- **/sobre:** "Pôr IA onde um perfil arrumado bastaria só gasta dinheiro."
- **Ganchos dos reels:** L1-01 ("14h02"), L1-09 ("Pesquise o nome do seu negócio") e L1-23 ("Ele comprou em março").
- **Formato de autoteste dos carrosséis de dor:** "Marcou dois ou mais?".
