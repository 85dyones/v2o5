# LinkedIn: Service Page da V2O5 (31/10/2026; revisada em 12/11 e em 25/11/2026)

A Service Page lista o que a empresa vende, com descrição e exemplos de trabalho. Todo preço vem de `src/conteudo/ofertas.ts` (travado por `tests/precos-publicos.test.ts`) e é "preço de referência", como no site. Desde 12/11/2026 não há Branding nem tráfego pago; desde 25/11/2026 a V2O5 digitaliza pequenos negócios (`docs/2026-11-25-foco-pequenos-negocios.md`): sai o Sprint de Eficiência, sai a Presença Assistida, e o agente de IA vira a solução "Atendimento com IA" ("chatbot" fica só no título da página do site, para a busca). Antes de colar, confira no LinkedIn o limite de caracteres de cada campo e escolha, na lista do LinkedIn, a categoria mais próxima de cada serviço.

Imagens de exemplo (1200 x 627) em `design/marca/redes/`, uma por serviço. As capturas da Motors Store são de 26/10/2026, com a autorização do case.

## Serviços, na ordem sugerida (a do site: colocar no mapa, ter o site, cuidar de quem chega)

### 1. Presença Digital Local
- **Categoria sugerida:** marketing digital
- **Descrição:** Para o negócio que o cliente procura e encontra informação errada, perfil parado ou nenhum jeito fácil de chamar. Organizamos o perfil no Google, as redes e o WhatsApp, com link e mensagem prontos para pedir avaliação a quem comprou e, se quiser, a rotina mensal. Presença Essencial (R$ 790; mensalidade opcional de R$ 390) e Presença Estruturada (R$ 1.490; mensalidade opcional de R$ 490).
- **Link:** https://www.v2o5.com.br/presenca-digital-local
- **Exemplo:** `linkedin-servico-presenca-1200x627.png`

### 2. Sites & Integrações
- **Categoria sugerida:** desenvolvimento web
- **Descrição:** Site próprio, rápido e medido, ligado ao CRM, ao estoque ou ao sistema de gestão quando o escopo pede. Landing Page (R$ 2.900), Site Personalizado (R$ 5.900) e Site Conectado (a partir de R$ 9.900). Para revendas de veículos, o Site Conectado liga o estoque do sistema da loja ao site, o mesmo método que roda na Motors Store.
- **Link:** https://www.v2o5.com.br/criacao-de-sites
- **Exemplo:** `linkedin-servico-sites-1200x627.png` (capturas da Motors Store)

### 3. Atendimento com IA
- **Categoria sugerida:** atendimento ao cliente / automação
- **Descrição:** Para o negócio que atende pelo WhatsApp e perde cliente na demora ou na confusão das conversas. Organizamos o WhatsApp numa caixa de atendimento e colocamos um agente de IA que responde só com o que a empresa aprovou, qualifica o contato e passa a conversa para a pessoa certa da equipe. Na Motors Store, o agente responde 93 de 100 primeiras mensagens em até um minuto, com mediana de 38 segundos (21/10 a 17/11/2026). Atendimento Essencial a partir de R$ 3.900 e Atendimento Integrado, ligado ao sistema que a empresa já usa, a partir de R$ 6.900. IA e mensagens ficam pelo valor do provedor.
- **Link:** https://www.v2o5.com.br/agente-de-ia-para-whatsapp
- **Exemplos:** `linkedin-servico-atendimento-1200x627.png` (pacotes) e `linkedin-servico-agente-whatsapp-1200x627.png` (os quatro passos do agente)

### 4. Continuidade (opcional)
- **Categoria sugerida:** suporte e manutenção de TI
- **Descrição:** Depois da entrega, planos opcionais para manter e evoluir o que foi entregue, com limites escritos: Cuidado Técnico (R$ 349/mês), Integrações Monitoradas (R$ 590/mês) e Evolução Contínua (R$ 990/mês). Nenhuma solução obriga a contratar outra.
- **Link:** https://www.v2o5.com.br/continuidade
- **Exemplo:** `linkedin-servico-continuidade-1200x627.png`

### Se a página já tem os serviços de 12/11

Apague o "Sprint de Eficiência" e a imagem dele, troque o serviço "Agente de IA para WhatsApp" pelo "Atendimento com IA" acima e tire a Presença Assistida da descrição da Presença.

## Cuidados

- **Nenhum resultado prometido.** A Service Page não diz "aumente suas vendas": o que se mede é combinado antes, com linha de base (regra do site).
- **Case Motors:** só os números de `memory/projects/case-motors.md`, com período. Esta página usa um só, o do Ney no Atendimento com IA (aprovado pelo Dyones em 17/11); se o case for relido, o número e o período mudam juntos.
- **Avaliações e recomendações:** LinkedIn permite pedir a clientes; só de clientes reais e autorizados.
- **Atualização:** se um preço mudar em `ofertas.ts`, regere os cartões (`node design/ferramentas/gerar-redes.mjs`) e troque a descrição aqui.
