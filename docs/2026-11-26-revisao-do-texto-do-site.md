# Revisão do texto do site no foco em pequenos negócios (26/11/2026)

Pedido do Dyones: "analise todos os locais do site e busque por resquícios do posicionamento anterior ou possibilidade de melhora no texto para melhor refletir nosso posicionamento".

**Como foi feito**
- **O que foi lido:** o texto de todas as 19 rotas, como o visitante vê (`content/*.md`), mais o que só o Google e as IAs leem: título e descrição de cada página, dados estruturados (`src/lib/schema.ts`) e `llms.txt`.
- **Conferência:** cada trecho foi conferido no código de origem.
- **Regras das propostas:** sem travessão, sem "não é X, é Y", sem tríade de efeito, nenhum número novo e nenhuma oferta nova.
- **O que já está no PR #64:** o fecho da home e o "Por que V2O5?".

**Como responder:** "aprovo tudo", "aprovo menos os itens X e Y" ou ajustes por número. As decisões da parte C pedem resposta própria.

---

## A. Resquícios e erros (prioridade alta)

Textos que ainda vendem o que saiu, prometem o que nenhum pacote entrega ou levam a um lugar que não existe mais.

**A1. Página de revendas, dados estruturados (o que o Google lê).** `schema.ts:245` e `:249`
- **Hoje:** "Site Conectado e Operação com IA para revendas de veículos" / "Site de estoque, agente de IA no WhatsApp, CRM e rastreamento até a venda"
- **Proposta:** "Site Conectado e Atendimento Integrado para revendas de veículos" / "Site ligado ao estoque, agente de IA no WhatsApp e integração com o CRM da loja". Junto, um teste que trava os termos que saíram nesse bloco.

**A2. Case Motors, chamada final: o botão leva a um lugar que não existe.** `case.ts:187-190`
- **Hoje:** "Quer o mesmo sistema na sua revenda?" / "Os caminhos da V2O5 para revendas partem deste sistema. O diagnóstico gratuito diz por onde começar." / botão "Ver os caminhos para revendas"
- **Proposta:** "Quer o mesmo atendimento no seu negócio?" / "Não precisa ser revenda. Em qualquer loja ou serviço que vende pelo WhatsApp, o agente responde na hora com as suas informações e passa cada cliente para a pessoa certa, com o resumo da conversa. O diagnóstico é gratuito: 45 minutos com o fundador para ver onde o seu negócio perde cliente." / botão "Ver os preços"

**A3. Cartão do diagnóstico (home, `llms.txt` e dados estruturados).** `home.ts:317-319`
- **Hoje:** "Diagnóstico e análise de operação" / "Como o cliente acha a empresa hoje, quanto espera pela resposta e onde desiste. O diagnóstico de presença vira o mapa que decide por onde começar."
- **Proposta:** "Diagnóstico gratuito" / "Como o cliente acha o seu negócio hoje, quanto espera pela resposta no WhatsApp e onde desiste. São 45 minutos com o fundador para ver por onde começar."

**A4. Diagnóstico com fala de consultoria (home, FAQ, /precos e /diagnostico).** `home.ts:122-123`, `:915`, `diagnostico.ts:30`
- **Hoje:**
  - "Sessão inicial gratuita de 45 minutos para entender o problema e escolher por onde começar. Avalia se existe um projeto viável."
  - "Não inclui mapeamento completo do processo, implementação nem acompanhamento."
  - No FAQ: "…identificar e priorizar o problema e avaliar se existe um projeto viável…"
  - Em /diagnostico: "…mensuração de resultados".
- **Proposta:**
  - "45 minutos com o fundador para ver onde o seu negócio perde cliente e por onde começar. Se não houver um bom caso, a conversa termina ali."
  - "Não inclui implementação nem acompanhamento de resultados."
  - FAQ: "São 45 minutos de conversa com o fundador sobre como o cliente acha o seu negócio, como ele é atendido no WhatsApp e os sistemas que você já usa, para ver onde você perde cliente e por onde começar. A sessão não inclui implementação nem acompanhamento de resultados. Havendo um bom caso, o próximo passo é a proposta da solução que cabe no problema, com escopo, entregáveis, prazo e investimento."
  - /diagnostico: "O diagnóstico é a sessão inicial, gratuita, de 45 minutos. Ele mostra o que pesa mais hoje (ser achado, responder ou fazer o cliente voltar) e por onde começar. Implementação e acompanhamento de resultados ficam para depois, na solução contratada e, se fizer sentido, na continuidade, com escopo, valor e prazo definidos em proposta."

**A5. /privacidade.** `privacidade/page.tsx:132-138`
- **Hoje:** "Marcar e fazer o diagnóstico, montar o mapa, enviar a proposta…" / "Ligar o pedido ao anúncio, à busca ou ao site que o trouxe, para investir onde dá resultado. É o mesmo serviço que oferecemos aos clientes, aplicado a nós."
- **Proposta:** "Marcar e fazer o diagnóstico, enviar a proposta e continuar a conversa pelo WhatsApp ou pelo e-mail." / "Ligar o pedido à busca, ao anúncio ou ao site que o trouxe, para saber quais canais trazem cliente."
- **Por quê:**
  - o diagnóstico não entrega mapa desde 25/10;
  - "o mesmo serviço que oferecemos" vende o rastreamento até o anúncio, que saiu;
  - a coleta descrita continua a mesma, então a política segue fiel.
- Junto, a data de atualização da página.

**A6. Cartão "Avaliações no Google": promete um painel que nenhum pacote tem.** `home.ts:276-277`
- **Hoje:** "Depois da venda, o cliente recebe no WhatsApp o pedido de avaliação com o link certo, e o painel mostra quem respondeu."
- **Proposta:** "Link direto e mensagem pronta para pedir a avaliação a quem comprou, na Presença Digital Local. Avaliação recente pesa na busca do bairro." O link passa a ir para /presenca-digital-local.

**A7. Cartão "Pós-venda e recorrência": promete trazer o cliente de volta.** `home.ts:310-311`
- **Hoje:** "Revisão, recompra ou retorno: a régua manda a mensagem na data certa e traz o cliente de volta."
- **Proposta:** "Contato de volta com quem já comprou, na hora da recompra ou do retorno, no Atendimento Integrado. Só para quem consentiu, dentro das regras do WhatsApp." O link passa a ir para os pacotes do Atendimento com IA.

**A8. Regras de preço (/precos e `llms.txt`).** `ofertas.ts:228`
- **Hoje:** "Custos de terceiros, como domínio, licenças, APIs, mídia paga, IA e mensagens…"
- **Proposta:** "Custos de terceiros, como domínio, licenças, APIs, IA e mensagens do WhatsApp, ficam por fora e aparecem discriminados na proposta."

**A9. Página de revendas.** `automotivo.ts:109`, `revendas-de-veiculos/page.tsx:98`
- **Hoje:** "…o caminho de um lead, do estoque à venda, estão no case." / botão "Ver o pacote"
- **Proposta:** "…o caminho de cada cliente, da primeira mensagem ao CRM da loja, estão no case." / "Ver como funciona" (a âncora continua a mesma).
- **Por quê:** o case não mostra venda nem anúncio, e o pacote de revenda saiu em 17/11.

**A10. Nomes dos dois recursos.** `precos.ts:44` e `:46`
- **Hoje:** "CRM e sistemas sob medida" e "Automação de processos". Esses nomes aparecem nos títulos, nos cartões, no FAQ e na mensagem do WhatsApp. Há também um erro: o título do FAQ sai "O que perguntam sobre crm e sistemas sob medida…", com "crm" minúsculo.
- **Proposta:** "CRM com WhatsApp" e "Automação de tarefas", e a correção da caixa no título do FAQ.

**A11. CRM com WhatsApp: a página ainda fala com equipe comercial de empresa média.** `solucoes.ts:370-442`, `home.ts:293`, `paginas.ts:61`
- **Problema:**
  - Hoje: "O funil vive no WhatsApp de cada vendedor." / "Quando o vendedor sai, os contatos vão junto. Ninguém sabe quantos leads chegaram no mês, de onde vieram nem quantos viraram venda. O CRM de prateleira resolve metade e cobra por cabeça."
  - Proposta: "Os clientes moram no celular de quem atende." / "Quem já comprou e quem pediu orçamento e sumiu ficam espalhados entre as conversas e uma planilha. Ninguém sabe de onde veio cada cliente nem quem está na hora de voltar, e quando a pessoa troca de celular ou sai, os contatos vão junto. O CRM de prateleira resolve metade e cobra por cabeça."
- **Resumo:**
  - Hoje: "Cada contato num funil, com a origem, a etapa e o próximo passo à vista…"
  - Proposta: "Seus clientes num lugar só, com a conversa do WhatsApp e a origem de cada um, para saber quem atender e quem chamar de volta."
- **Cartão:**
  - Hoje: "Nenhum contato esquecido numa conversa: cada um num funil…"
  - Proposta: "Nenhum cliente esquecido numa conversa: cada um com a origem e o histórico, e o aviso de quando chamar de novo."
- **Descrição (Google):**
  - Hoje: "CRM sob medida com WhatsApp dentro do funil…"
  - Proposta: "CRM simples com o WhatsApp dentro: cada cliente com a conversa e a origem num lugar só, e o aviso de quem chamar de volta. Recurso do Atendimento com IA."
- **Entregas, passos e FAQ:**
  - "Funil com origem" vira "Cada cliente com a origem" ("Cada cliente entra com a origem: Google, Instagram, site ou indicação. Você sabe de onde vem quem compra.").
  - "Régua de alertas / Lead parado, visita marcada, proposta sem resposta" vira "Aviso na hora certa / Cliente esperando resposta, horário marcado, orçamento sem retorno: quem cuida dele recebe o aviso.".
  - "Sob medida para o seu setor" vira "Do jeito do seu negócio" ("Os campos são os do seu ramo: o pet e o porte, o procedimento da clínica, o carro da oficina, o veículo de interesse na revenda.").
  - "Como a venda acontece hoje, da primeira mensagem ao fechamento" vira "Como o cliente é atendido hoje, da primeira mensagem à venda, e se ele volta a comprar".
  - "Funil e campos / …com a equipe de vendas" vira "Etapas e campos / Desenhamos as etapas e os campos com você e com quem atende.".
  - "Serve para qualquer setor?" vira "Serve para o meu tipo de negócio?".
  - "Como ficam os usuários e o volume de dados?" vira "Quantas pessoas podem usar?" e passa para o fim do FAQ.

**A12. Automação: a página ainda fala de "processos", n8n e ERP.** `solucoes.ts:278-341`, `paginas.ts:43-45`
- **Título da página (H1), título e descrição:**
  - Hoje: "Automação de processos com IA e n8n." / "Fluxos no n8n que ligam os sistemas que a empresa já usa…"
  - Proposta: "Automação com IA para as tarefas repetidas do seu negócio." / title "Automação com IA para pequenos negócios" / "O aviso e o pedido de avaliação que alguém manda à mão passam a sair sozinhos, ligados ao WhatsApp e ao sistema que você já usa. Recurso do Atendimento com IA."
- **Problema:**
  - Hoje: "O processo existe, mas mora na cabeça de uma pessoa." / "Atualizar o estoque no site, avisar o vendedor, mandar o obrigado, conferir a venda que ficou pela metade…"
  - Proposta: "A tarefa existe, mas mora na cabeça de uma pessoa." / "Avisar que o pedido está pronto, mandar o obrigado, pedir a avaliação no dia seguinte, lembrar quem comprou de voltar. Cada passo é feito à mão, quando dá tempo, e para quando a pessoa sai de férias."
- **Entregas, passos e FAQ:**
  - "Um fluxo por processo" vira "Um fluxo por tarefa".
  - "ERP, planilha, CRM…" vira "WhatsApp, planilha, agenda, e-mail, o CRM e o sistema de gestão que você já usa".
  - "O lead parado, a venda sem desfecho…" vira "O cliente sem resposta, o orçamento sem retorno, o catálogo que não atualizou".
  - "Mapa do processo / entradas, decisões e saídas" vira "A tarefa como é hoje / Anotamos com quem faz hoje cada passo da tarefa e onde ela costuma travar.".
  - "…em paralelo ao processo manual" vira "O fluxo roda junto com o jeito manual até os dois darem o mesmo resultado.".
  - O exemplo do FAQ passa a ser o do pet shop da home: o atendimento concluído na agenda que avisa a equipe, manda o horário de retirada e, no dia seguinte, pede a avaliação.

**A13. /sobre.** `sobre.ts:104`, `:159`, `:179-190`, `home.ts:455`
- **Ferramentas:**
  - "Eu escolho a combinação para cada operação…" vira "Eu escolho a combinação para cada negócio. A ferramenta vem do problema e do que você já usa, e cada projeto leva só o que precisa. Automação, atendimento e WhatsApp rodam no meu servidor."
  - "Automação, integrações e processos / …estruturar fluxos" vira "Automação e integrações / Ligar os sistemas que o negócio já usa e tirar da mão da equipe a tarefa que se repete."
  - "CRM, vendas e sistemas de gestão / Gestão comercial, funil de vendas, operação e relacionamento" vira "CRM e sistemas de gestão / A lista de clientes, com a origem e o histórico de cada um, ligada ao sistema que o negócio já usa."
- **Ficha do fundador:** "Prática: Funil e CRM da Motors Store" vira "Prática: Atendimento e CRM da Motors Store".
- **"O nome vem de um catalisador":** o fim do parágrafo, "…sem ocupar o centro da operação. Tecnologia, automação e IA entram quando resolvem parte relevante do problema melhor do que uma alternativa mais simples.", vira "…sem ocupar o centro do seu negócio. A IA e a automação só entram quando resolvem melhor do que um jeito mais simples."

**A14. Sites, pacotes.** `ofertas.ts:122`, `:126`, `:134`
- "Para uma oferta, campanha ou serviço…" vira "Para um serviço ou uma oferta que precisa de uma página que leve o cliente até a conversa."
- "Rastreamento básico: de onde veio cada contato" vira "A origem de cada contato gravada: Google, Instagram ou indicação".
- "Para a empresa que precisa de um site próprio, com estrutura comercial." vira "Para o negócio que precisa de um site próprio, com as páginas dos seus serviços e o WhatsApp à mão."

**A15. Atendimento com IA, entregas.** `solucoes.ts:194`, `:198`
- "Pergunta o que importa para o seu funil (interesse, prazo, forma de pagamento, região)…" vira "Faz as perguntas que o seu negócio precisa (o que a pessoa procura, para quando, como quer pagar, o bairro) e anota no CRM com a origem do contato."
- "Marca horário, visita ou reunião na agenda da equipe…" vira "Marca o horário ou a visita na agenda e avisa no WhatsApp quem vai atender."

---

## B. Melhoras para falar com o pequeno negócio

**B1. Home e /precos, Atendimento com IA.** `ofertas.ts:181`, `home.ts:888`, `:905`
- **Cartão:** "WhatsApp organizado, um agente de IA que responde na hora e passa a conversa à pessoa certa e, no Integrado, o contato de volta com quem já comprou."
- **FAQ:** "O WhatsApp organizado, um agente de IA que responde com as informações do seu negócio e passa a conversa à pessoa certa, e a lista de contatos com a origem. No Atendimento Integrado, o agente também faz as perguntas do seu negócio, agenda ou encaminha, leva cada contato ao sistema que você já usa e chama de volta quem já comprou, só para quem consentiu."
- **"A conversa fica registrada no CRM, com a origem do contato."** vira "A conversa fica registrada na lista de contatos, com a origem de cada um."
- **Por quê:** hoje nenhum cartão responde à dor "Cliente que não volta", que a home levanta. O texto de 25/11 dizia "responde e qualifica"; a proposta troca o jargão pelo que o dono vê.

**B2. Sites & Integrações, abertura (home, /precos, /criacao-de-sites, `llms.txt`).** `ofertas.ts:116-117`, `solucoes.ts:85-100`, `paginas.ts:53`
- **Quando:** "Quando o negócio depende só de rede social ou de portal, ou tem um site que não leva quem chega até a conversa."
- **O que recebe:** "Site próprio, rápido no celular e achado no Google, que leva o cliente até o WhatsApp e, quando precisa, se liga ao sistema que você já usa."
- **Título da página (H1):** "Criação de sites profissionais que levam o cliente até o seu WhatsApp." (hoje: "…ligados ao sistema que você já usa", que abre pelo pacote de R$ 9.900).
- **Resumo:** "Site próprio, achado no Google e rápido no celular, com a origem de cada contato gravada. Ligado ao seu sistema quando o escopo pede."
- **Problema:** "Carrega devagar no celular, junta todos os produtos ou serviços numa página só e deixa o WhatsApp escondido no rodapé. O Google só acha o que existe como página, e quem não acha o botão desiste antes de chamar."
- **Descrição (Google):** "Site próprio para pequeno negócio, achado no Google e com o WhatsApp a um toque. Da landing page ao site ligado ao sistema que você já usa."

**B3. Presença Digital Local.** `solucoes.ts:463`, `:468`
- "Padaria, oficina, distribuidora, comércio de bairro…" vira "Loja de bairro, pet shop, salão, clínica, oficina e outros negócios locais".
- "…e a empresa nem fica sabendo." vira "…e você nem fica sabendo.".

**B4. Home, indicadores.** `home.ts:62`, `:70`
- "O que acompanhar depende do problema do seu negócio. Antes de começar, a gente combina o que vai olhar e como."
- "Ninguém aqui promete um percentual de melhoria. A gente anota como está hoje e, depois da entrega, compara com o que os dados mostram."

**B5. FAQ "Preciso trocar o sistema de gestão que já uso?" (home, /precos, CRM e Automação).** `home.ts:899-900`, `solucoes.ts:341`, `:429`
- **Pergunta:** "Preciso trocar o sistema que já uso?"
- **Resposta:** começa pelos sistemas de qualquer negócio (agenda, catálogo, estoque ou CRM, depois de verificar a documentação e o acesso). Depois vem o que está em produção (Revenda Mais e o agente da Motors). Por último, a lista de sistemas de revenda, apresentada como "na revenda de veículos". Hoje a resposta só nomeia sistemas de revenda.

**B6. Home, case Motors.** `home.ts:79`, `:86`, `:87`
- "O site se liga ao estoque, o agente de IA atende e qualifica no WhatsApp, e o lead pronto chega ao CRM do Revenda Mais." vira "…o agente de IA atende no WhatsApp e cada cliente chega pronto, com a ficha preenchida, ao CRM do Revenda Mais."
- Pílula "Lead no CRM do Revenda Mais" vira "Cliente no CRM do Revenda Mais".
- Sobretítulo "Projetos em ambiente real" vira "Cases".

**B7. "Para empresas de todo o Brasil" vira "para pequenos negócios de todo o Brasil"** (FAQ da home e de /precos, /sobre e o topo do `llms.txt`).

**B8. Home, "Por que V2O5?".** Mesmo depois do PR #64, ainda tem a construção de contraste "não precisa ser X, precisa Y".
- **Proposta:** "O nome vem do pentóxido de vanádio, usado como catalisador em processos químicos: ele acelera a reação sem virar o produto final. É assim que a V2O5 usa a tecnologia no seu negócio, para a mudança acontecer com menos esforço."

**B9. /continuidade não cita o atendimento.** `ofertas.ts:278`, `:291`
- "Para o atendimento com IA ou o site ligado a outros sistemas." / "Para quem quer melhorar o que foi entregue mês a mês, como as respostas do agente de IA."

**B10. Página de revendas como exemplo, e não como produto.** `paginas.ts:67-69`, `automotivo.ts:27`, `:60-96`, `:141-143`
- **Título:** "Site e atendimento com IA para revendas de veículos" (hoje: "Sistema de vendas para revendas de veículos").
- **Resumo:** "As mesmas soluções de qualquer negócio, na revenda: site ligado ao estoque da loja e agente de IA que atende e passa o cliente ao CRM."
- **Texto que fala com o dono da loja:** "lead" vira "cliente".
- **Fecho:** "Descubra onde a sua revenda perde cliente." / "O diagnóstico é gratuito: 45 minutos com o fundador, que montou o site e o atendimento da Motors Store, para ver por onde começar na sua loja."

**B11. Cases.** `case.ts:56`, `:376-377`
- **Motors, "O que a V2O5 montou":** "Cada peça é uma linha do cardápio da V2O5…" vira "As peças que a V2O5 montou, ligadas pela mesma base de dados: o que entra por uma aparece nas outras.".
- **16ª Vara Cível, fecho:** "Seu WhatsApp recebe de tudo pelo mesmo número?" / "O que a serventia fez serve para qualquer negócio que atende pelo WhatsApp: perguntar o assunto logo na entrada e passar a conversa para quem resolve, com os dados já preenchidos. O diagnóstico é gratuito: 45 minutos com o fundador para ver onde o seu negócio perde cliente."

**B12. `llms.txt` (o resumo que as IAs leem).** `llms.txt/route.ts:27`, `:56-58`
- **Topo:** dizer para quem a V2O5 trabalha (o negócio local que vende pelo WhatsApp e vive de cliente que volta) e o que faz (Google, redes, site, agente de IA, lista de clientes, integração e contato de volta).
- **Case Motors:** contar o que foi montado e incluir os números do atendimento que já estão no case (125 clientes, 93 de 100 em até 1 minuto, 37 entregues ao CRM), com a fonte e o período.
- **Bio do fundador:** tirar o "Em branding," do começo, para a IA não ler como serviço.

**B13. Descrições no Google.**
- **/sobre:** "Dyones Oliveira, fundador da V2O5, ajuda pequenos negócios a serem achados no Google e a atenderem bem no WhatsApp. Como ele trabalha e os dois cases."
- **/guias:** "Guias práticos para quem vende pelo WhatsApp: como aparecer no Google e atender bem quem chega." Hoje promete "dados de operação real".
- **Case Motors:** a data de atualização ainda é 25/10, o que vale para o sitemap; ela passa a 25/11.

**B14. Formulário do diagnóstico.** `diagnostico.ts:49-57`, `Formulario.tsx`
- **Ordem dos segmentos:** Comércio, Serviços, Saúde, Revenda de veículos, Imobiliário, Indústria, Outro. Hoje a lista abre com "Revenda de veículos".
- **Rótulos:** "Nome do negócio" e "Quantas pessoas trabalham no negócio".
- **O que fica igual:** os códigos que o n8n e o banco recebem.

---

## C. Decisões suas (com recomendação)

**C1. As etiquetas de etapa "Atração, Atendimento, Gestão, Venda".**
- **Onde aparecem:** nos cartões, nas páginas de solução e na /sobre. São as quatro cores do vanádio, mas os nomes são do funil antigo.
- **O que está errado:** a etiqueta sai da cor, então a Presença aparece rotulada como "Atendimento" e o Atendimento com IA como "Venda".
- **Recomendo:** trocar para os nomes da pergunta do método, "Ser achado", "Responder", "Organizar" e "Voltar a comprar", com a etiqueta definida por página e não pela cor.
- **Por que é decisão sua:** mexe no sistema da marca.

**C2. O título (H1) da página do agente.** Hoje é "Agente de IA para WhatsApp que responde, qualifica e agenda.", que você decidiu em 12/11.
- **Proposta:** "Agente de IA para WhatsApp que responde na hora e chama a pessoa certa." Tira a tríade de verbos e põe a passagem para a pessoa certa, que é a promessa da solução. "Agente de IA para WhatsApp" continua no começo, para a busca.
- **Recomendo:** trocar. Só mude se concordar.

**C3. A lista dos problemas da Motors ("Antes: diagnosticado"), que você confirmou em 25/10.** Só a fala muda, o conteúdo fica:
- "Os problemas identificados antes da intervenção, na ordem da jornada do comprador." vira "O que a loja tinha de problema antes do projeto, na ordem do caminho do cliente: da busca ao atendimento.".
- "Baixa visibilidade nas buscas orgânicas, nos buscadores e nas IAs." vira "A loja aparecia pouco no Google e nas respostas das IAs.".
- "Falta de leads qualificados." vira "Chegava pouco contato pronto para comprar.".
- "Acompanhamento comercial inconsistente." vira "O retorno a quem chamava não seguia uma rotina.".
- **Recomendo:** trocar.

**C4. "V2O5 ConsultorIA" como nome alternativo nos dados estruturados.**
- **Situação:** é o nome antigo da página do LinkedIn.
- **Recomendo:** tirar quando você renomear o LinkedIn para "V2O5 Vendas e Tecnologia" (está no kit de perfis). Enquanto o LinkedIn tiver o nome antigo, ele ajuda o Google a ligar as duas contas.

---

## Fora do texto público
- **Contratos internos:** `design/nao-pode-quebrar.md` ainda descreve a página de revendas com "rastreamento até a venda, a partir de R$ 14.900" e âncoras de /precos que não existem mais. É documento interno; atualizo junto.
- **Mantidos de propósito:**
  - o FAQ "Vocês fazem tráfego pago?", que responde "não" e ajuda quem pergunta;
  - "processo" na página da 16ª Vara Cível, que é processo judicial;
  - "lead" nos números medidos do case da Motors.
