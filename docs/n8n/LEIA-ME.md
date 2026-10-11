# Fluxo do n8n: lead do diagnóstico

Arquivo: `lead-do-diagnostico.json`, pronto para importar no n8n da V2O5 (n8n.v2o5.com.br).

O que o fluxo faz, nesta ordem:

1. Recebe o POST que `/api/leads` envia e confere o segredo do cabeçalho `X-V2O5-Segredo`.
2. Responde 200 ao site na hora, para a pessoa ver a página "Pedido recebido" mesmo que um passo seguinte falhe.
3. Avisa o Dyones no WhatsApp com o lead inteiro (nome, empresa, contato, objetivos, origem da visita, evento).
4. Responde ao lead no WhatsApp em menos de um minuto, convidando a marcar os 45 minutos.
5. Busca o contato no Chatwoot pelo telefone: se existe, atualiza; se não, cria, com os dados do lead nos atributos.

O nó "Responder por e-mail" vem desligado. Ligue quando o alias `diagnostico@v2o5.com.br` existir e a credencial SMTP estiver criada.

## 1. Credenciais no n8n (Credentials, Add credential)

O arquivo não traz chave nenhuma. Crie estas quatro, com estes nomes, antes de importar:

| Nome da credencial | Tipo | Name (cabeçalho) | Value |
|---|---|---|---|
| `V2O5 · segredo do site` | Header Auth | `X-V2O5-Segredo` | um segredo novo, por exemplo o resultado de `openssl rand -hex 32` |
| `Evolution · apikey` | Header Auth | `apikey` | a chave da Evolution (a global `AUTHENTICATION_API_KEY` ou a da instância) |
| `Chatwoot · api_access_token` | Header Auth | `api_access_token` | o token do seu perfil no Chatwoot (Perfil, Access Token) |
| `Hostinger · diagnostico@` | SMTP | `smtp.hostinger.com`, porta 465, SSL | usuário e senha da caixa principal; o remetente do nó é o alias |

Guarde o segredo do site: ele vai também na Vercel (passo 4).

## 2. Importar

Workflows, menu de três pontos, "Import from File", escolha `lead-do-diagnostico.json`. Abra cada nó que usa credencial (Pedido do site, Avisar o Dyones, Responder ao lead, Buscar contato, Atualizar contato, Criar contato, Responder por e-mail) e selecione a credencial de mesmo nome.

## 3. Configurar o nó "Configuração"

| Campo | O que colocar |
|---|---|
| `evolutionInstancia` | nome da instância da Evolution ligada ao número da V2O5 |
| `chatwootConta` | id da conta no Chatwoot (o número depois de `/app/accounts/` na URL) |
| `chatwootInbox` | id da caixa de entrada onde o contato entra (Settings, Inboxes, o id está na URL) |

`evolutionUrl`, `chatwootUrl` e `whatsappDyones` já vêm preenchidos.

Se a Evolution for da versão 1, o corpo do envio muda: em "Avisar o Dyones" e "Responder ao lead", troque `text: ...` por `textMessage: { text: ... }`.

## 4. Ativar e ligar ao site

Ligue o fluxo (Active). A URL de produção fica:

```
https://n8n.v2o5.com.br/webhook/v2o5-diagnostico
```

A URL com `/webhook-test/` só responde com o editor aberto em "Listen for test event".

Na Vercel, projeto `v2o5`, Settings, Environment Variables:

| Variável | Valor | Ambientes |
|---|---|---|
| `LEADS_WEBHOOK_URL` | a URL acima | Production e Preview |
| `LEADS_WEBHOOK_SECRET` | o mesmo valor da credencial `V2O5 · segredo do site` | Production e Preview |

Depois, Deployments, menu do último deploy, Redeploy: variável nova só entra num deploy novo.

## 5. Testar

Direto no n8n, com o segredo no lugar de `SEGREDO`:

```bash
curl -s -X POST https://n8n.v2o5.com.br/webhook/v2o5-diagnostico \
  -H 'Content-Type: application/json' \
  -H 'X-V2O5-Segredo: SEGREDO' \
  -d '{"event_id":"Lead.teste-1","recebido_em":"2026-10-11T12:00:00Z","fonte":"teste","lead":{"nome":"Teste da V2O5","whatsapp":"5541998089550","email":"diagnostico@v2o5.com.br","empresa":"Teste","segmento":"automotivo","porte":"2-5","objetivos":["aparecer","responder"],"estoque":"31-80","sistema":"revenda-mais","mensagem":"Teste do fluxo.","pagina":"/diagnostico","origem":{"utm_source":"google","utm_medium":"cpc","gclid":"g123","entrada":"/?utm_source=google"}}}'
```

Esperado: `{"ok":true,"event_id":"Lead.teste-1"}` na hora, o aviso no seu WhatsApp, a resposta no WhatsApp informado e o contato no Chatwoot. Com o segredo errado o n8n responde 403.

Depois, no site (preview ou produção): envie o formulário em `/diagnostico` com dados de teste. Se aparecer "O envio está em configuração", a variável não chegou ao deploy. Se o n8n recusar, o site responde "entrega" (502) e o formulário pede para tentar de novo.

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

Os valores de `segmento`, `porte`, `objetivos`, `estoque` e `sistema` são os códigos de `src/conteudo/diagnostico.ts`; o nó "Lead" traduz para os rótulos que a pessoa viu no formulário (`tests/n8n.test.ts` confere que os dois lados batem).

## Limites conhecidos

- Se a Evolution ou o Chatwoot falharem, o site já recebeu o 200. O erro fica em Executions, no n8n. Um "Error Workflow" com aviso no WhatsApp cobre isso, se quiser.
- O telefone é o que o lead digitou. Se não tiver WhatsApp ativo, a Evolution devolve erro nesse passo e o resto segue.
- Os atributos do contato no Chatwoot aparecem na ficha quando existem como atributos personalizados da conta (Settings, Custom Attributes). Sem isso, ficam gravados e saem na API.
