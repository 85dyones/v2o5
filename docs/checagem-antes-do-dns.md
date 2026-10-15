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

Dois caminhos levam ao Chatwoot, e os dois terminam no mesmo lugar: o contato marcado com `origem = v2o5` e a etiqueta `origem-v2o5`. Só contato marcado conversa com o agente de IA; o resto da caixa 12 abre para a equipe, sem resposta automática (decisão de 15/10). Os três fluxos estão em `docs/n8n/` (`LEIA-ME.md`).

**Botão de WhatsApp** (todas as páginas, mensagem pré-preenchida por página): abre `wa.me/5541998089550`. A conversa entra no número da V2O5 e a Evolution API a entrega à caixa 12. Toda mensagem pronta traz "site da V2O5" (`MARCA_DO_SITE`; `tests/n8n.test.ts` trava): o fluxo `origem-do-lead`, chamado pelo webhook do Chatwoot, marca o contato quando a primeira mensagem da conversa tem esse trecho.

**Formulário do diagnóstico**: `/api/leads` → fluxo `lead-do-diagnostico` → (1) aviso para você no WhatsApp, (2) telefone normalizado pela Evolution (com ou sem o nono dígito, como o WhatsApp grava), (3) contato criado ou atualizado já marcado, (4) só então a resposta ao lead no WhatsApp e (5) a etiqueta na conversa que a Evolution abre.

**Agente de IA**: agent bot "Agente da V2O5" na caixa 12 → fluxo `agente-da-v2o5`. Responde conversa pendente de lead marcado (Claude, com o `llms.txt` do site como conhecimento) e passa as outras para aberta. O Captain ficou de fora: a conta 1 não tem o recurso ligado e, pelo código do 4.17, ele não atenderia o lead do botão (detalhe em `memory/decisoes.md`, 15/10).

**Pronto no Chatwoot em 15/10** (pela API, conta 1): atributo de contato `origem` (id 34), etiqueta `origem-v2o5` (id 23), webhook da caixa 12 para o fluxo da origem (id 3) e o agent bot (id 1), **ainda não ligado à caixa 12**: liga depois de o fluxo do agente estar ativo (LEIA-ME, passo 4).

### Conferido daqui (13/10)

| Host | O que respondeu | Consequência |
|---|---|---|
| `app.chat.v2o5.com.br` (CNAME para `cwoot.v2o5.com.br`) | **Chatwoot 4.17.0**, `/api` com filas e dados "ok", tela de login no ar | é o Chatwoot de verdade; conta 1 (a URL que você passou) |
| `chatwoot.v2o5.com.br` | **erro 500** da aplicação | era o endereço do fluxo do n8n. **Corrigido em 13/10** para `app.chat`. Desligar este host ou apontar para o mesmo serviço, para não sobrar link quebrado |
| `chat.v2o5.com.br` | **Typebot** | a memória dizia Chatwoot; corrigida. Nada do site depende dele |
| `evolution.v2o5.com.br` | Evolution API 2.3.7 | instância usada pelo fluxo: `v2o5` (a confirmar) |
| `n8n.v2o5.com.br` | no ar | os três fluxos foram importados pela API em 15/10 e estão **desligados** (faltam credenciais); os webhooks `/webhook/v2o5-diagnostico`, `v2o5-origem` e `v2o5-agente` respondem 404 até a ativação |

### Você confere (com login)

1. ~~Chatwoot, Settings > Inboxes~~ **Feito em 13/10**: a inbox do WhatsApp é a 12 e a instância da Evolution é `v2o5`, ligada à inbox. Os dois já estão gravados no nó Configuração do fluxo.
2. ~~Evolution, manager~~ **Feito em 13/10**: a instância `v2o5` está conectada e entregando ao Chatwoot.
3. ~~Teste A, WhatsApp~~ **Feito em 13/10**: o "oi" chegou na inbox 12 e a resposta voltou ao celular. A linha do WhatsApp está pronta.
4. **Fluxos e credenciais**: os três fluxos já estão no n8n (importados pela API em 15/10, desligados, nó Configuração conferido: `app.chat.v2o5.com.br`, conta 1, caixa 12, instância `v2o5`):

   | Fluxo | Id no n8n | Credenciais que pede |
   |---|---|---|
   | V2O5 · Lead do diagnóstico | `cN2DdwdFUVBBK2zi` | `V2O5 · segredo do site`, `Evolution · apikey`, `Chatwoot · api_access_token` (e `Hostinger · diagnostico@` no nó de e-mail, desligado) |
   | V2O5 · Origem do lead (botão de WhatsApp) | `GkYbQIyXXYoGy37y` | `Chatwoot · api_access_token` |
   | V2O5 · Agente de IA (agent bot da caixa 12) | `E6dLwHlEcUQrW022` | `Chatwoot · api_access_token`, `Chatwoot · agent bot`, `Anthropic · x-api-key` |

   Nenhuma das cinco credenciais existia no n8n em 15/10. Crie-as com esses nomes exatos (tabela do LEIA-ME, passo 1); depois, em cada fluxo, abra os nós com credencial, selecione a de mesmo nome e ative (ou peça a uma sessão com a API que faça a troca e ative). Já existe uma `Evolution — apikey (v2o5)` (Header Auth): se for a chave da instância `v2o5` com o cabeçalho `apikey`, basta renomeá-la para `Evolution · apikey`. Em seguida, `LEADS_WEBHOOK_URL` e `LEADS_WEBHOOK_SECRET` na Vercel (produção e preview, com redeploy) e, por último, ligar o bot à caixa 12. Até as variáveis entrarem, o formulário responde "envio em configuração". Os testes sem WhatsApp (403 com segredo errado no diagnóstico; 200 e parada em "Mensagem recebida" na origem e no agente) ficam para depois da ativação.
5. **Os três testes** (tabela do LEIA-ME, passo 5): (a) formulário do preview com o seu número: aviso no WhatsApp da V2O5, resposta no seu, contato marcado e o agente respondendo; (b) mensagem de um número sem marca: nenhuma resposta, conversa aberta para você; (c) mensagem pronta do botão: contato marcado e atendido pelo agente. O DNS só vira com os três certos.
6. **Chatwoot, operação**: agente com notificações ligadas; Settings > Inbox > horário de atendimento e mensagem fora do horário, se quiser; respostas prontas para "diagnóstico" e "preços".
7. **`chatwoot.v2o5.com.br`**: em 15/10 o nome ainda resolvia para a VPS (168.231.100.245) e respondia 404. Conferido no n8n em 15/10 (só leitura): **nenhum fluxo ativo chama esse endereço**. O "16VC 3.0" (`kvu8YkUgxxwq7FNa`) está desligado e ainda tem 19 nós com ele ("Info Base" a "Info Base3", campo do valor da URL; "teams ID", "Ler atributos da conversa1", "CW-Cattributes-intimacao" a "…7" e "CW Status_Typebot" a "…4", campo URL); a versão no ar é o "16VC 3.1 (app.chat conta 4)" (`wbKYizAUofFiXTHz`), sem nenhuma chamada ao endereço antigo. Outros fluxos desligados também o citam (16VC 4.0 e 6.0, AENT, "16VC religa bot (sessoes Evolution)", "Chatwoot Handoff Universal", "manager evolution", "criador de empresa", "criador de instancias"). Pode tirar o registro do DNS; os fluxos desligados só voltam a funcionar se alguém trocar o endereço neles, e o 16VC só muda com o seu ok.

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

Zona hoje (Hostinger, `ns1`/`ns2.dns-parking.com`), lida em 13/10 e de novo em 15/10, sem mudança. O domínio e a hospedagem de sites ficam na Hostinger (hospedagem contratada até 2027); só o site muda de casa, e a hospedagem passa a servir o subdomínio dos painéis (seção 5).

| Registro | Valor hoje | TTL | Na troca |
|---|---|---|---|
| `v2o5.com.br` A | 147.93.37.158 (WordPress) | 1800 | **vira o A da Vercel** |
| `v2o5.com.br` AAAA | 2a02:4780:13:1994:0:2295:287f:2 (Hostinger) | 1800 | **apagar**: com ele no ar, quem navega por IPv6 continua caindo no WordPress |
| `www` CNAME | `v2o5.com.br` | 300 | **vira o CNAME da Vercel** |
| `ftp` A | 147.93.37.158 | 1800 | fica: é por onde se envia arquivo para a hospedagem |
| `painel` A | (novo) 147.93.37.158, criado pelo hPanel | | **novo**, seção 5 |
| MX, SPF, DKIM, DMARC, autodiscover | Hostinger | | **não mexer** |
| `app.chat`/`cwoot`, `chat`, `chatwoot`, `evolution`, `n8n` | 168.231.100.245 (VPS) | | **não mexer** |
| NS | dns-parking (Hostinger) | | não mexer: o DNS continua na Hostinger, só o site muda de casa |

### Ordem da troca

1. **Na Vercel**, projeto `v2o5`, Settings > Domains: adicionar `v2o5.com.br` e `www.v2o5.com.br`, com `www` redirecionando para o apex. A tela mostra os valores exatos a usar (hoje a documentação da Vercel indica um registro A para o apex e `cname.vercel-dns.com` para `www`; use o que a sua tela mostrar).
2. **Variáveis de produção** na Vercel antes da troca: `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` e `NEXT_PUBLIC_GA4_ID` (pendências 9a e 16).
3. **Um dia antes**: na zona da Hostinger, baixar o TTL do A e do AAAA do apex para 300. Isso faz a troca (e um eventual retorno) valer em minutos.
4. **Backup do WordPress**: exportar arquivos e banco pelo hPanel e guardar fora da Hostinger. Depois da troca, apagar o WordPress da hospedagem: mesmo sem o domínio apontando para ele, quem mandar o cabeçalho `Host: v2o5.com.br` para o IP da Hostinger ainda chega nele, e um WordPress sem manutenção na mesma conta dos painéis põe os arquivos dos painéis em risco.
5. **A troca**: apex A para o valor da Vercel; apagar o AAAA; `www` CNAME para o valor da Vercel. Nada mais.
6. **Conferência** (em até uma hora): a Vercel mostra "Valid Configuration" e emite o certificado; abrir `https://v2o5.com.br`, `https://www.v2o5.com.br` (tem de redirecionar), `/sitemap.xml`, `/robots.txt`, `/jornada` (301 para `/sobre`), `/blog` (301 para `/guias`), `/wp-json/wp/v2/users` (404 no site novo); mandar e receber um e-mail de teste em `diagnostico@`; abrir `app.chat`, `n8n` e `evolution` (continuam na VPS).
7. **Depois**: Search Console com propriedade de domínio (um TXT na Hostinger) e envio do sitemap; Bing Webmaster; Perfil da Empresa no Google com o site novo.

## 5. Subdomínio dos painéis de clientes (Hostinger)

Recomendação (15/10): um subdomínio só, `painel.v2o5.com.br`, com uma pasta por cliente (`/cliente-a/`, `/cliente-b/`). Subdomínio por cliente publica o nome do cliente nos registros públicos de certificados (Certificate Transparency); o caminho da pasta não aparece neles.

O que a hospedagem compartilhada faz bem aqui: páginas estáticas ou PHP atrás de senha. O dado não mora nela: o painel mensal é gerado a partir do banco do cliente (na VPS ou na Supabase) e enviado pronto, só com números agregados, sem dado pessoal. O banco nunca fica aberto para a internet. Painel ao vivo, que consulta o banco a cada acesso, vai para a Vercel ou para a VPS, não para a hospedagem compartilhada.

1. **Criar o subdomínio** no hPanel: Sites > `v2o5.com.br` > Domínios > Subdomínios > `painel`. Com o DNS na Hostinger, o hPanel cria o registro A sozinho; conferir na Zona DNS que `painel` aponta para 147.93.37.158.
2. **SSL**: em Segurança > SSL, conferir que `painel.v2o5.com.br` tem certificado (a Hostinger emite de graça; instalar se não aparecer).
3. **Arquivos da raiz** do subdomínio (pelo Gerenciador de Arquivos ou FTP):
   - `robots.txt` com `User-agent: *` e `Disallow: /`;
   - `index.html` vazio ou com uma frase neutra, para a raiz não listar as pastas;
   - `.htaccess` com o bloco abaixo. O `RewriteEngine On` próprio também impede que as regras do WordPress na pasta de cima valham aqui.
     ```apache
     RewriteEngine On
     RewriteCond %{HTTPS} !=on
     RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     Options -Indexes
     <IfModule mod_headers.c>
       Header always set X-Robots-Tag "noindex, nofollow"
       Header always set X-Frame-Options "DENY"
       Header always set Referrer-Policy "no-referrer"
       Header always set Strict-Transport-Security "max-age=31536000"
     </IfModule>
     ```
4. **Uma pasta por cliente** com senha própria: hPanel > Avançado > Proteger pastas com senha. Usuário e senha vão para o cliente por um canal à parte, nunca por e-mail junto com o link e nunca no repositório.
5. **Conferência**: `https://painel.v2o5.com.br/` abre sem listar pastas; `http://` vira `https://`; a pasta do cliente pede senha; `curl -I` mostra o `X-Robots-Tag`.

Os detalhes de cada cliente (o que o painel mostra, de onde vem o dado, como é gerado) ficam no repositório do cliente, não aqui.

## 6. Ordem recomendada do todo

1. Alias de e-mail (seção 3).
2. Os três fluxos do n8n, credenciais, variáveis na Vercel, o bot na caixa 12 e os testes (a), (b) e (c) (seção 2, itens 4 e 5).
3. Linha do WhatsApp: inbox, instância e teste A feitos em 13/10; falta `chatwoot.v2o5.com.br` (seção 2, item 7).
4. GA4 e `NEXT_PUBLIC_GA4_ID` (pendência 16).
5. Domínios na Vercel e TTL baixo (seção 4, passos 1 a 3).
6. Backup do WordPress (passo 4).
7. Troca e conferência (passos 5 a 7).
8. Apagar o WordPress da hospedagem, com o backup guardado (passo 4).

O subdomínio dos painéis (seção 5) não depende da troca e pode ser feito antes.
