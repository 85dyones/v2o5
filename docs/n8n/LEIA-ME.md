# Fluxos do n8n: atendimento da V2O5

Três fluxos para importar no n8n da V2O5 (n8n.v2o5.com.br). Juntos, fazem uma coisa: o lead que veio do site fica marcado no Chatwoot com o atributo de contato `origem = v2o5` e a etiqueta `origem-v2o5`, e só esse lead conversa com o agente de IA. Quem escreve para o WhatsApp da V2O5 por outro caminho cai na caixa como conversa aberta, sem resposta automática, para a equipe atender.

| Arquivo | Gatilho | O que faz |
|---|---|---|
| `lead-do-diagnostico.json` | `POST /webhook/v2o5-diagnostico`, chamado por `/api/leads` | normaliza o telefone pela Evolution, cria ou atualiza o contato já marcado, só então responde ao lead, etiqueta a conversa |
| `origem-do-lead.json` | `POST /webhook/v2o5-origem`, webhook da conta 1 no Chatwoot (caixa 12, `message_created`) | primeira mensagem da conversa com "site da V2O5" ou "Dyones. Vi o diagnóstico da" (link das páginas de diagnóstico) marca o contato; repassa toda mensagem recebida ao fluxo do agente; contato marcado ganha a etiqueta em cada conversa nova |
| `agente-da-v2o5.json` | `POST /webhook/v2o5-agente`, repassado pelo fluxo da origem (o agent bot "Agente da V2O5" da caixa 12 só deixa a conversa pendente; o evento direto dele é ignorado) | conversa pendente de lead marcado: responde com a IA da OpenAI; de contato sem marca: passa para aberta sem responder |

Endereços de produção:

```
https://n8n.v2o5.com.br/webhook/v2o5-diagnostico
https://n8n.v2o5.com.br/webhook/v2o5-origem
https://n8n.v2o5.com.br/webhook/v2o5-agente
```

A URL com `/webhook-test/` só responde com o editor aberto em "Listen for test event".

## O que já está no Chatwoot (conta 1, criado pela API em 15/10)

| Peça | Id | Situação |
|---|---|---|
| Atributo de contato `origem` (texto) | 34 | pronto |
| Etiqueta `origem-v2o5` (âmbar, na barra lateral) | 23 | pronta |
| Webhook "n8n · origem do lead (caixa 12)", evento `message_created`, para `/webhook/v2o5-origem` | 3 | ativo do lado do Chatwoot; até o fluxo ser ativado, o n8n responde 404 e nada acontece |
| Agent bot "Agente da V2O5", para `/webhook/v2o5-agente` | 1 | criado **sem** ligar à caixa 12 (passo 4) |

Por que o bot e não o Captain: decisão de 15/10 em `memory/decisoes.md`. Em resumo, no Chatwoot 4.17 a conversa já nasce "aberta" quando o contato não bate com o público do Captain, e o Captain só responde conversa pendente; o lead do botão é marcado segundos depois da primeira mensagem e ficaria sem IA.

## 1. Credenciais no n8n (Credentials, Add credential)

Os arquivos não trazem chave nenhuma, só o nome da credencial. Crie estas, com estes nomes:

| Nome da credencial | Tipo | Name (cabeçalho) | Value | Usada em |
|---|---|---|---|---|
| `V2O5 · segredo do site` | Header Auth | `X-V2O5-Segredo` | um segredo novo, por exemplo o resultado de `openssl rand -hex 32` | diagnóstico |
| `Evolution · apikey` | Header Auth | `apikey` | a chave da Evolution (a global `AUTHENTICATION_API_KEY` ou a da instância `v2o5`) | diagnóstico |
| `Chatwoot · api_access_token` | Header Auth | `api_access_token` | o token do seu perfil no Chatwoot (Perfil, Access Token) | os três |
| `Chatwoot · agent bot` | Header Auth | `api_access_token` | o token do bot: Settings, Bots, "Agente da V2O5", Access Token (copiar) | agente; diagnóstico (nota para o Dyones) |
| `OpenAi account` (já existe no n8n) | OpenAI | não se aplica | a chave da API da OpenAI (platform.openai.com), a mesma conta que já tem crédito | agente |
| `Hostinger · diagnostico@` | SMTP | `smtp.hostinger.com`, porta 465, SSL | usuário e senha da caixa principal; o remetente do nó é o alias | diagnóstico (nó desligado) |

Guarde o segredo do site: ele vai também na Vercel (passo 4). O token do bot responde e passa a conversa em nome do bot: com ele, a mensagem aparece como do "Agente da V2O5" e a passagem de pendente para aberta é a oficial do Chatwoot.

## 2. Importar

Pela tela: Workflows, menu de três pontos, "Import from File", um arquivo por vez. Abra cada nó que usa credencial e selecione a credencial de mesmo nome.

Pela API do n8n (`X-N8N-API-KEY`): `GET /api/v1/credentials` lista nome, tipo e id das credenciais, sem o segredo. Troque em cada nó `"credentials": {"httpHeaderAuth": {"name": "..."}}` pelo mesmo objeto com o `id` da credencial de mesmo nome e envie só `name`, `nodes`, `connections` e `settings` para `POST /api/v1/workflows`; depois, `POST /api/v1/workflows/{id}/activate`.

## 3. Configuração (nó "Configuração" de cada fluxo)

Já vêm preenchidos. Só mude se a caixa, a instância ou o Chatwoot forem recriados.

| Campo | Valor | Fluxos |
|---|---|---|
| `chatwootUrl` | `https://app.chat.v2o5.com.br` (o único Chatwoot; `chatwoot.v2o5.com.br` não existe mais desde 15/10) | os três |
| `chatwootConta` | `1`, confirmado em 13/10 | os três |
| `chatwootInbox` | `12`, a caixa do WhatsApp ligada à Evolution, confirmado em 13/10 | os três |
| `atributoOrigem`, `valorOrigem`, `etiquetaOrigem` | `origem`, `v2o5`, `origem-v2o5` | os três |
| `evolutionUrl`, `evolutionInstancia` | `https://evolution.v2o5.com.br`, `v2o5` (confirmado em 13/10) | diagnóstico |
| `agenteDyones`, `nomeDyones` | `1`, `Dyones Oliveira`: o usuário do Dyones na conta 1, mencionado na nota do lead | diagnóstico |
| `whatsappDyones` | o WhatsApp da V2O5; só recebe o aviso quando o lead fica sem conversa no Chatwoot (é o mesmo número da instância, então o aviso cai no chat "Você") | diagnóstico |
| `marcaDoSite` | `site da V2O5`, o trecho que toda mensagem pronta do site traz (`MARCA_DO_SITE` em `src/conteudo/home.ts`) | origem, agente |
| `marcaDoDiagnostico` | `Dyones. Vi o diagnóstico da`, o começo das mensagens prontas das páginas de diagnóstico (`cta_texto` e botões dos caminhos no modelo do diagnóstico de presença) | origem, agente |
| `agenteUrl` | `https://n8n.v2o5.com.br/webhook/v2o5-agente`, para onde a origem repassa as mensagens | origem |
| `modeloIA`, `esforcoIA` | `gpt-5-mini`, `low` (troque aqui se a conta da OpenAI usar outro modelo) | agente |
| `conhecimentoUrl` | `https://v2o5.vercel.app/llms.txt`, o `llms.txt` de produção do site: preços e serviços saem do mesmo conteúdo das páginas, e o agente nunca fala um preço diferente do publicado | agente |
| `mensagensNoHistorico` | `30` | agente |

Se a Evolution for da versão 1, o corpo do envio muda: em "Avisar pelo WhatsApp" e "Responder ao lead", troque `text: ...` por `textMessage: { text: ... }`.

## 4. Ativar e ligar

Nesta ordem:

1. Ative os três fluxos (Active).
2. **Site**: na Vercel, projeto `v2o5`, Settings, Environment Variables, para Production e Preview: `LEADS_WEBHOOK_URL` = `https://n8n.v2o5.com.br/webhook/v2o5-diagnostico` e `LEADS_WEBHOOK_SECRET` = o mesmo valor da credencial `V2O5 · segredo do site`. Depois, Deployments, Redeploy: variável nova só entra num deploy novo.
3. **Origem**: nada a fazer; o webhook 3 do Chatwoot já aponta para o fluxo.
4. **Agente**: só com o fluxo do agente ativo, ligue o bot à caixa: Settings, Inboxes, "Whats v2o5", Bot Configuration, "Agente da V2O5". (Pela API: `POST /api/v1/accounts/1/inboxes/12/set_agent_bot` com `{"agent_bot": 1}`.) Daí em diante, toda conversa nova da caixa 12 nasce pendente; o fluxo responde o lead marcado e passa as outras para aberta em cerca de 6 segundos. Se o n8n cair, o Chatwoot passa a conversa para aberta sozinho, com um aviso na conversa.

Para tirar o agente do ar: desligue o bot na mesma tela (a caixa volta a abrir toda conversa como aberta). As conversas abertas de antes não mudam.

## 5. Testar

Direto no n8n, com o segredo no lugar de `SEGREDO` e o seu número no lugar de `55DDNUMERO`:

```bash
curl -s -X POST https://n8n.v2o5.com.br/webhook/v2o5-diagnostico \
  -H 'Content-Type: application/json' \
  -H 'X-V2O5-Segredo: SEGREDO' \
  -d '{"event_id":"Lead.teste-1","recebido_em":"2026-10-15T12:00:00Z","fonte":"teste","lead":{"nome":"Teste da V2O5","whatsapp":"55DDNUMERO","email":"diagnostico@v2o5.com.br","empresa":"Teste","segmento":"automotivo","porte":"2-5","objetivos":["aparecer","responder"],"estoque":"31-80","sistema":"revenda-mais","mensagem":"Teste do fluxo.","pagina":"/diagnostico","origem":{"utm_source":"google","utm_medium":"cpc","gclid":"g123","entrada":"/?utm_source=google"}}}'
```

Esperado: `{"ok":true,"event_id":"Lead.teste-1"}` na hora; com o segredo errado, 403.

Os três testes antes do DNS (`docs/checagem-antes-do-dns.md`, seção 2):

| Teste | Como | Esperado |
|---|---|---|
| (a) formulário | envie `/diagnostico` no preview da Vercel com o seu número | resposta no seu WhatsApp; nota privada com menção ao Dyones na conversa (notificação no app do Chatwoot); no Chatwoot, o contato com `origem = v2o5`, a etiqueta e a conversa etiquetada; ao responder a mensagem, o agente responde |
| (b) sem marca | de um número que nunca usou o site, mande "bom dia" para o WhatsApp da V2O5 | nenhuma resposta; a conversa aparece aberta na caixa 12, sem etiqueta |
| (c) botão | de outro número, toque no botão de WhatsApp do site e envie a mensagem pronta | contato marcado, conversa etiquetada e resposta do agente em poucos segundos |

Onde olhar se algo falhar: Executions de cada fluxo no n8n; no Chatwoot, a ficha do contato (atributo e etiqueta) e as notas privadas do bot na conversa.

## O que chega do site

```json
{
  "event_id": "Lead.3f9c2a7e-...",
  "recebido_em": "2026-10-11T12:00:00.000Z",
  "fonte": "site",
  "lead": {
    "nome": "Marina Ribeiro",
    "whatsapp": "5541999990000",
    "email": "marina@exemplo.com.br",
    "empresa": "Auto Center Ribeiro",
    "segmento": "automotivo",
    "porte": "6-20",
    "objetivos": ["aparecer", "responder"],
    "estoque": "31-80",
    "sistema": "revenda-mais",
    "mensagem": "Quero sair do WhatsApp pessoal.",
    "pagina": "/diagnostico",
    "origem": { "utm_source": "google", "utm_medium": "cpc", "gclid": "g123", "entrada": "/?utm_source=google" }
  }
}
```

Os valores de `segmento`, `porte`, `objetivos`, `estoque` e `sistema` são os códigos de `src/conteudo/diagnostico.ts`; o nó "Lead" traduz para os rótulos que a pessoa viu no formulário. A campanha de onde a pessoa veio vai para o atributo `origem_da_visita` (antes de 15/10 ia para `origem`, que agora é só a marca `v2o5`).

## Como cada fluxo decide

**Telefone (diagnóstico).** O fluxo pergunta à Evolution (`/chat/whatsappNumbers`) como o WhatsApp grava o número. Em muitos celulares brasileiros, o WhatsApp não tem o nono dígito, e a Evolution grava o contato do Chatwoot como `+55DD` e 8 dígitos, com o identificador `número@s.whatsapp.net`. O fluxo procura o contato pelas duas grafias, no identificador e no telefone, como a Evolution faz, e grava a marca nesse contato. Se a Evolution não achar o número no WhatsApp, vale o número digitado.

**Primeira mensagem (origem e agente).** É o "cabeçalho" da conversa: a mensagem pronta de quem mandou a pessoa, do site ou da página de diagnóstico. Só essas duas entradas (e o contato do formulário) recebem o agente. Conta só mensagem recebida, não privada; a comparação ignora maiúscula, acento e espaço repetido. O agente faz a mesma conta por conta própria, para não depender de o fluxo da origem já ter gravado a marca quando o evento chega.

**Agente.** Espera 5 segundos (várias mensagens seguidas viram uma resposta), relê conversa, contato e mensagens pela API e só age em conversa pendente, sem pessoa atribuída, quando a última mensagem é a do evento. A IA devolve JSON (resposta, passar para a equipe, nota para a equipe). Recusa, erro da API ou resposta fora do formato: nada vai para o contato, o bot deixa uma nota privada e passa a conversa para aberta. Para assumir uma conversa que o agente está atendendo, abra-a (status aberta) ou atribua a você.

## Limites conhecidos

- O Chatwoot desta instalação não entrega `message_created` ao agent bot (só `message_updated`; conferido em 16/10 nas execuções do n8n). Por isso o fluxo da origem, que recebe o webhook da conta, repassa cada mensagem recebida da caixa 12 ao agente com `repasse: "origem"`, e o agente só aceita o repasse. Se o webhook 3 do Chatwoot parar, o agente também para; as conversas ficam pendentes com o bot até alguém abri-las.
- A instância `v2o5` é o WhatsApp pessoal do Dyones: toda conversa pessoal também entra na caixa 12. O agente passa as sem marca para aberta, sem responder.

- O aviso do lead é uma nota privada do bot na conversa, com menção ao Dyones (`mention://user/1/...`). A notificação depende de "menção" ligada em Perfil, Notificações, no app e no e-mail do Chatwoot. A instância `v2o5` e o WhatsApp do Dyones são o mesmo número (15/10), por isso o aviso não vai mais pelo WhatsApp, a não ser como reserva.

- O site recebe o 200 antes do resto. Se a Evolution ou o Chatwoot falharem, o erro fica em Executions; um "Error Workflow" com aviso no WhatsApp cobre isso, se quiser.
- Se o Chatwoot recusar o contato, o lead ainda recebe a resposta, mas sem marca o agente não atende a conversa dele: ela fica aberta para a equipe.
- Os webhooks do Chatwoot não levam cabeçalho de autenticação. Os fluxos da origem e do agente usam do evento só os números (conversa, contato, mensagem) e releem tudo pela API, então um evento forjado não faz o agente responder nada que não esteja na conversa real.
- Se a assinatura de mensagens estiver ligada na integração do Chatwoot na Evolution, a resposta do agente sai no WhatsApp com o nome do bot no topo.
- Os atributos do contato aparecem na ficha quando existem como atributos personalizados da conta (Settings, Custom Attributes). Só `origem` foi criado; os outros ficam gravados e saem na API.
