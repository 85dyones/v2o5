# Checagem antes de trocar o DNS

Data: 13/10/2026. Objetivo: tudo que o site publica e todo o caminho do contato (botão de WhatsApp, formulário, n8n, Evolution, Chatwoot) precisam estar certos antes de `v2o5.com.br` apontar para a Vercel.

Legenda: **conferido** = resposta pública verificada daqui em 13/10, sem login; **você confere** = precisa de login no painel. Nenhuma credencial entra neste arquivo nem no chat.

## 1. Dados que o site publica

Fonte única: `EMPRESA` em `src/conteudo/home.ts`. Os testes travam que link, rótulo, schema e `llms.txt` saiam do mesmo campo.

| Dado | Valor no site | Onde aparece | Situação |
|---|---|---|---|
| Nome fantasia | V2O5 Vendas e Tecnologia | todas as páginas, schema `Organization` | você confirma |
| Razão social | V2O5 Tecnologia da Informação Ltda. | `/sobre`, `/privacidade`, schema, `llms.txt` | conferir com o cartão CNPJ |
| CNPJ | 68.490.470/0001-14 | `/sobre`, `/privacidade`, `llms.txt` | conferir com o cartão CNPJ |
| Sede | Almirante Tamandaré/PR (só cidade e UF; sem logradouro) | `/sobre`, `/privacidade`, schema `address` | decidir se publica endereço completo |
| Fundação | dezembro de 2019 | `/sobre`, schema `foundingDate` | confirmado por você em 13/10 |
| WhatsApp | +55 41 99808-9550 | todos os botões, rodapé, `/sobre`, schema `telephone`, `llms.txt`; o n8n avisa este número | é o número ligado à Evolution? (seção 2) |
| E-mail público | diagnostico@v2o5.com.br | rodapé, `/diagnostico`, `/sobre`, schema `email`, `llms.txt`, remetente da resposta automática | **alias ainda não existe** (pendência 9) |
| E-mail do encarregado | privacidade@v2o5.com.br | `/privacidade` | **alias ainda não existe** (pendência 9) |
| Fundador e encarregado LGPD | Dyones Oliveira | `/sobre`, `/privacidade`, schema `Person` | ok |
| Horário de atendimento | não publicado (schema sem `openingHours`) | | decidir se publica |
| Preços | tabela confirmada em 12/10 | `/precos`, cartões, FAQ | ok |
| Números do case | `memory/projects/case-motors.md`, com período | `/cases/motors-store`, home, hub | ok |

Os dois e-mails são a única pendência de dado: o site já os publica em produção e eles não recebem nada até os alias existirem na Hostinger.

## 2. Linha de atendimento

Dois caminhos levam ao Chatwoot.

**Botão de WhatsApp** (todas as páginas, mensagem pré-preenchida por página): abre `wa.me/5541998089550`. A conversa entra no número da V2O5, a Evolution API a entrega ao Chatwoot e alguém responde de lá. As mensagens pré-preenchidas dizem de onde a pessoa veio ("Vim pelo site", "Vi a página de preços", "Vi a página de revendas", "Acabei de pedir o diagnóstico pelo site"): dá para criar uma regra de automação no Chatwoot que etiqueta a conversa por esse texto.

**Formulário do diagnóstico**: `/api/leads` → webhook do n8n → (1) aviso para você no WhatsApp, (2) resposta ao lead no WhatsApp, (3) contato criado ou atualizado no Chatwoot. Tudo via Evolution e API do Chatwoot (`docs/n8n/LEIA-ME.md`).

### Conferido daqui (13/10)

| Host | O que respondeu | Consequência |
|---|---|---|
| `app.chat.v2o5.com.br` (CNAME para `cwoot.v2o5.com.br`) | **Chatwoot 4.17.0**, `/api` com filas e dados "ok", tela de login no ar | é o Chatwoot de verdade; conta 1 (a URL que você passou) |
| `chatwoot.v2o5.com.br` | **erro 500** da aplicação | era o endereço do fluxo do n8n. **Corrigido em 13/10** para `app.chat`. Desligar este host ou apontar para o mesmo serviço, para não sobrar link quebrado |
| `chat.v2o5.com.br` | **Typebot** | a memória dizia Chatwoot; corrigida. Nada do site depende dele |
| `evolution.v2o5.com.br` | Evolution API 2.3.7 | instância usada pelo fluxo: `v2o5` (a confirmar) |
| `n8n.v2o5.com.br` | no ar | webhook `/webhook/v2o5-diagnostico` entra quando o fluxo for importado e ativado |

### Você confere (com login)

1. ~~Chatwoot, Settings > Inboxes~~ **Feito em 13/10**: a inbox do WhatsApp é a 12 e a instância da Evolution é `v2o5`, ligada à inbox. Os dois já estão gravados no nó Configuração do fluxo.
2. ~~Evolution, manager~~ **Feito em 13/10**: a instância `v2o5` está conectada e entregando ao Chatwoot.
3. ~~Teste A, WhatsApp~~ **Feito em 13/10**: o "oi" chegou na inbox 12 e a resposta voltou ao celular. A linha do WhatsApp está pronta.
4. **Teste B, formulário**: siga `docs/n8n/LEIA-ME.md` (quatro credenciais, importar o fluxo, nó Configuração, ativar), defina `LEADS_WEBHOOK_URL` e `LEADS_WEBHOOK_SECRET` na Vercel (produção e preview) e rode o `curl` do LEIA-ME. Esperado: aviso no seu WhatsApp, resposta no WhatsApp informado, contato no Chatwoot com os atributos. Depois, um envio real pelo formulário do preview. Até isso, o formulário responde "envio em configuração".
5. **Chatwoot, operação**: agente com notificações ligadas; Settings > Inbox > horário de atendimento e mensagem fora do horário, se quiser; respostas prontas para "diagnóstico" e "preços"; atributos personalizados da conta para os campos do lead aparecerem na ficha (item do LEIA-ME).
6. **`chatwoot.v2o5.com.br`**: desligar o host no proxy da VPS ou redirecionar para `app.chat`.

## 3. E-mail (nada disso muda na troca do DNS)

Conferido daqui em 13/10:

| Registro | Valor | Situação |
|---|---|---|
| MX | 5 mx1.hostinger.com, 10 mx2.hostinger.com | ok |
| SPF (TXT no apex) | `v=spf1 include:_spf.mail.hostinger.com ~all` | ok |
| DKIM | `hostingermail-a._domainkey` presente | ok |
| DMARC | `v=DMARC1; p=none` | ok por ora; subir para `p=quarantine` quando a resposta automática por e-mail estiver no ar (pendência 9) |
| autodiscover | CNAME para `autodiscover.mail.hostinger.com` | ok |

Falta: criar os alias `diagnostico@` e `privacidade@` na Hostinger, os dois para a caixa principal, e mandar um e-mail de teste para cada um.

## 4. DNS: o que existe e o que muda

Zona hoje (Hostinger, `ns1`/`ns2.dns-parking.com`), lida em 13/10:

| Registro | Valor hoje | TTL | Na troca |
|---|---|---|---|
| `v2o5.com.br` A | 147.93.37.158 (WordPress) | 1800 | **vira o A da Vercel** |
| `v2o5.com.br` AAAA | 2a02:4780:13:1994:0:2295:287f:2 (Hostinger) | 1800 | **apagar**: com ele no ar, quem navega por IPv6 continua caindo no WordPress |
| `www` CNAME | `v2o5.com.br` | 300 | **vira o CNAME da Vercel** |
| `ftp` A | 147.93.37.158 | 1800 | pode ficar enquanto o WordPress existir |
| MX, SPF, DKIM, DMARC, autodiscover | Hostinger | | **não mexer** |
| `app.chat`/`cwoot`, `chat`, `chatwoot`, `evolution`, `n8n` | 168.231.100.245 (VPS) | | **não mexer** |
| NS | dns-parking (Hostinger) | | não mexer: o DNS continua na Hostinger, só o site muda de casa |

### Ordem da troca

1. **Na Vercel**, projeto `v2o5`, Settings > Domains: adicionar `v2o5.com.br` e `www.v2o5.com.br`, com `www` redirecionando para o apex. A tela mostra os valores exatos a usar (hoje a documentação da Vercel indica um registro A para o apex e `cname.vercel-dns.com` para `www`; use o que a sua tela mostrar).
2. **Variáveis de produção** na Vercel antes da troca: `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` e `NEXT_PUBLIC_GA4_ID` (pendências 9a e 16).
3. **Um dia antes**: na zona da Hostinger, baixar o TTL do A e do AAAA do apex para 300. Isso faz a troca (e um eventual retorno) valer em minutos.
4. **Backup do WordPress**: exportar arquivos e banco pelo hPanel. Se quiser o antigo navegável por 30 dias, criar o subdomínio `antigo.v2o5.com.br` apontando para o mesmo WordPress e ajustar a URL do site no WordPress para ele; se não, o backup basta.
5. **A troca**: apex A para o valor da Vercel; apagar o AAAA; `www` CNAME para o valor da Vercel. Nada mais.
6. **Conferência** (em até uma hora): a Vercel mostra "Valid Configuration" e emite o certificado; abrir `https://v2o5.com.br`, `https://www.v2o5.com.br` (tem de redirecionar), `/sitemap.xml`, `/robots.txt`, `/jornada` (301 para `/sobre`), `/blog` (301 para `/guias`), `/wp-json/wp/v2/users` (404 no site novo); mandar e receber um e-mail de teste em `diagnostico@`; abrir `app.chat`, `n8n` e `evolution` (continuam na VPS).
7. **Depois**: Search Console com propriedade de domínio (um TXT na Hostinger) e envio do sitemap; Bing Webmaster; Perfil da Empresa no Google com o site novo.

## 5. Ordem recomendada do todo

1. Alias de e-mail (seção 3).
2. Fluxo do n8n, credenciais, variáveis na Vercel e teste do formulário (seção 2, teste B).
3. Linha do WhatsApp: inbox, instância, teste A, `chatwoot.v2o5.com.br` (seção 2).
4. GA4 e `NEXT_PUBLIC_GA4_ID` (pendência 16).
5. Domínios na Vercel e TTL baixo (seção 4, passos 1 a 3).
6. Backup do WordPress (passo 4).
7. Troca e conferência (passos 5 a 7).
