# Handoff: GA4 do site v2o5.com.br

Escrito em 17/11/2026 para quem for ligar o Google Analytics 4 do site (um agente com acesso ao GA4 e à Vercel, ou o Dyones). É a pendência 16 de `memory/pendencias.md`. O código está pronto desde 13/10/2026; falta a conta.

## Estado depois da configuração (17/11/2026, fim do dia)

- Propriedade criada e `NEXT_PUBLIC_GA4_ID=G-053C2SG991` publicado em produção pelo Dyones.
- Conferido em produção: o `gtag` carrega sem erro de política de segurança. Chegam ao GA4:
  - `page_view` com `page_type`, inclusive na navegação sem recarregar;
  - `cta_click` com `cta_location` e `cta_label`;
  - `click_whatsapp` com `whatsapp_location` e `pos_lead`.
- **Corrigido no código (17/11, noite): o `page_view` dobrado na primeira carga.**
  - A tag do Google manda um `page_view` sozinho uns 0,5 s depois de carregar. Ela ignora o `send_page_view: false` e todo parâmetro definido pela página, no `config` ou no `set`. Testado em produção e numa página isolada só com o trecho do Google.
  - Agora o site deixa esse `page_view` da primeira carga com a tag e manda o dele só nas trocas de rota. O `config` saiu sem `send_page_view: false`.
  - Efeito: um `page_view` por página vista. O da página de entrada traz endereço e título, mas fica sem `page_type`, porque nenhum parâmetro da página chega nele. Nas trocas de rota, o `page_view` traz `page_type`, `page_title` e `page_location`.
  - Para o `page_view` de entrada ganhar `page_type`, `service_line` e `segment`, o caminho é o GA4, não o código: as regras de "Modificar evento" da seção seguinte.
- **Corrigido no código: o `form_start` dobrado.** Uma tecla dispara `onInput` e `onChange` no mesmo instante. A trava era um estado do React, que só muda depois, e agora é uma referência. Sai uma vez por visita à página.
- **Corrigido no código: o título vazio nas trocas de rota.** O `page_view` saía às vezes antes de o Next trocar o `<title>`, como em `/diagnostico/recebido`. Agora leva `page_title`, montado do mapa de páginas igual ao `<title>`, e `page_location`.
- Conferido com o build local e a tag real, com as coletas bloqueadas para não sujar o GA4:
  - carga completa de `/diagnostico`: um `page_view`;
  - três teclas no formulário: um `form_start`;
  - troca para `/precos`: um `page_view` com `page_type=precos` e o título de Preços.
- O `generate_lead` só se confere com um lead de teste avisado.

## Página de entrada com `page_type`: regras de "Modificar evento"

O `page_view` de entrada sai da própria tag do GA4 e chega sem `page_type`, `service_line` e `segment`. Nos relatórios, a primeira página de cada visita aparece como "(not set)" nessas dimensões. Até a pergunta "de onde vêm os leads" tem resposta sem isso: a dimensão "Página de destino + string de consulta" do GA4 já mostra a página de entrada pelo endereço. O `page_type` serve para agrupar.

**Por que não pelo código (testado em 17/11/2026, à noite).** Numa página isolada só com o trecho do Google e esta tag, com as coletas respondidas no próprio navegador, sem chegar ao GA4:
- `gtag('config', ID, { page_type, service_line })`: o `page_view` automático e os eventos seguintes saem sem os dois;
- `gtag('set', {...})` antes ou depois do `config`, e até antes do `gtag('js')`: o mesmo;
- `config` antes do `gtag('js')`: o mesmo; sem o `gtag('js')`, a tag não manda nada;
- `send_page_view: false`: ignorado, sai o automático e o do site;
- a mesma bateria com a opção "Ignorar instâncias duplicadas da configuração na página" desligada (a tag traz a opção como `vtp_ignoreDupeGtagConfigCalls`): o mesmo.

A tag manda o `page_view` automático quando processa o `gtag('js')` e não aplica parâmetro de `config` nem de `set`. Só chega o que vai no próprio evento. Por isso não vale mandar as três chaves vazias nas trocas de rota: nenhum parâmetro da entrada fica guardado para vazar no evento seguinte.

**O que fazer no GA4.** Admin → Exibição de dados → Eventos → Modificar evento → Criar. O Google aplica as modificações no navegador, antes do envio. Elas valem para o `page_view` automático, levam cerca de uma hora para entrar e não mudam o passado. O limite é 50 modificações por propriedade; aqui são 17.

Em cada linha da tabela, crie uma modificação:
- condição 1: `event_name` é igual a `page_view`;
- condição 2: `page_location` corresponde à expressão regular da tabela;
- parâmetros: acrescente `page_type` e, quando houver valor na linha, `service_line` ou `segment`.

O valor que a regra põe é o mesmo que o site já manda nas trocas de rota (`contextoDaPagina` em `src/lib/medicao.ts`). O `tests/ga4-regras.test.ts` confere esta tabela contra o mapa de páginas: cada rota do site cai em uma regra só, com os mesmos valores. Rota nova no site exige regra nova aqui e no GA4.

| Modificação | `page_location` corresponde a | `page_type` | `service_line` | `segment` |
|---|---|---|---|---|
| Entrada home | `^https://(www\.)?v2o5\.com\.br/?([?#].*)?$` | `home` | | |
| Entrada Presença Digital Local | `^https://(www\.)?v2o5\.com\.br/presenca-digital-local/?([?#].*)?$` | `solucao` | `presenca` | |
| Entrada Sprint de Eficiência | `^https://(www\.)?v2o5\.com\.br/sprint-de-eficiencia/?([?#].*)?$` | `solucao` | `sprint` | |
| Entrada Criação de sites | `^https://(www\.)?v2o5\.com\.br/criacao-de-sites/?([?#].*)?$` | `solucao` | `sites` | |
| Entrada Agente de IA | `^https://(www\.)?v2o5\.com\.br/agente-de-ia-para-whatsapp/?([?#].*)?$` | `solucao` | `agente` | |
| Entrada Automação com IA | `^https://(www\.)?v2o5\.com\.br/automacao-com-ia/?([?#].*)?$` | `solucao` | `automacao` | |
| Entrada CRM com WhatsApp | `^https://(www\.)?v2o5\.com\.br/crm-com-whatsapp/?([?#].*)?$` | `solucao` | `crm` | |
| Entrada Rastreamento | `^https://(www\.)?v2o5\.com\.br/rastreamento-de-conversoes/?([?#].*)?$` | `solucao` | `rastreamento` | |
| Entrada Revendas de veículos | `^https://(www\.)?v2o5\.com\.br/segmentos/revendas-de-veiculos/?([?#].*)?$` | `segmento` | | `revendas-de-veiculos` |
| Entrada cases | `^https://(www\.)?v2o5\.com\.br/cases/[^/?#]+/?([?#].*)?$` | `case` | | |
| Entrada Preços | `^https://(www\.)?v2o5\.com\.br/precos/?([?#].*)?$` | `precos` | | |
| Entrada Continuidade | `^https://(www\.)?v2o5\.com\.br/continuidade/?([?#].*)?$` | `continuidade` | | |
| Entrada Diagnóstico | `^https://(www\.)?v2o5\.com\.br/diagnostico/?([?#].*)?$` | `diagnostico` | | |
| Entrada Diagnóstico recebido | `^https://(www\.)?v2o5\.com\.br/diagnostico/recebido/?([?#].*)?$` | `recebido` | | |
| Entrada Sobre | `^https://(www\.)?v2o5\.com\.br/sobre/?([?#].*)?$` | `sobre` | | |
| Entrada Guias | `^https://(www\.)?v2o5\.com\.br/guias(/[^?#]*)?([?#].*)?$` | `guia` | | |
| Entrada Privacidade | `^https://(www\.)?v2o5\.com\.br/privacidade/?([?#].*)?$` | `privacidade` | | |

A página de erro (`nao-encontrada`) fica sem regra: ela não tem endereço próprio, aparece no endereço que não existe. Endereço sem regra segue com "(not set)" na entrada.

Ao terminar, avise: a sessão confere em produção com o navegador automático (as modificações rodam na tag, então aparecem no envio), entrando direto por uma página de solução para ver o `service_line`.

## Ponto de partida (conferido em 17/11/2026)

- O site em produção (https://www.v2o5.com.br) **não manda nada ao GA4**: nenhum script de produção traz um ID `G-…`. Ou a variável `NEXT_PUBLIC_GA4_ID` não existe na Vercel, ou foi criada e o site não foi publicado de novo depois disso.
- O código de medição já está no ar: `src/lib/medicao.ts` e `src/components/layout/Medicao.tsx`. Sem o ID, ele não carrega nada.
- Não há GTM. O site chama o `gtag.js` direto, só depois de a página carregar e de um momento ocioso (até 2 s), e só para quem não se opôs à medição em `/privacidade`.

## O que o site já manda

| Evento | Quando | Parâmetros |
|---|---|---|
| `page_view` | Na carga completa, a própria tag do GA4 manda (sem `page_type` até as regras de "Modificar evento" entrarem); a cada troca de rota sem recarregar, o site manda, também com `page_title` e `page_location` | `page_type` (home, solucao, segmento, case, precos, continuidade, diagnostico, recebido, sobre, guia, privacidade, nao-encontrada, outra), `service_line` (nas páginas de solução), `segment` (nas de segmento) |
| `cta_click` | Clique num botão ou link marcado como CTA | `cta_location`, `cta_label` |
| `click_whatsapp` | Clique num link de WhatsApp | `whatsapp_location`, `pos_lead` = `nao` |
| `click_whatsapp_pos_lead` | O mesmo, depois de um lead na mesma sessão (fica fora da conta de conversão) | `whatsapp_location`, `pos_lead` = `sim` |
| `click_email` | Clique no e-mail | `email_location` |
| `form_start` | Primeira interação com o formulário do diagnóstico, uma vez por visita à página (corrigido em 17/11: saía duas vezes) | `form_id` |
| `generate_lead` | Lead enviado com sucesso em `/diagnostico` | `event_id` (o mesmo da API de Conversões da Meta), `form_id`, `lead_type`, `segmento` |

O `gtag` é configurado sem parâmetros: a tag desta propriedade ignora o `send_page_view: false` e manda o `page_view` da carga completa sozinha. O site manda o das trocas de rota (17/11/2026). Os parâmetros do `page_view` de entrada vêm das regras de "Modificar evento" do GA4 (seção acima).

## Passo a passo

1. **Propriedade.** No GA4, crie a propriedade "V2O5 · site" com fuso de São Paulo e moeda real (BRL). Crie o fluxo da Web para `https://www.v2o5.com.br`.
2. **Medição otimizada do fluxo** (Admin → Fluxos de dados → o fluxo → Medição otimizada):
   - em "Visualizações de página" → configurações avançadas, **desligue** "Mudanças de página com base em eventos do histórico do navegador". O site já manda um `page_view` por rota, e com isso ligado cada navegação conta duas vezes;
   - **desligue** "Interações com formulários": ela gera um `form_start` próprio, com o mesmo nome do evento do site;
   - o resto (rolagens, cliques de saída, downloads) pode ficar como está.
3. **ID.** Copie o ID de métricas (`G-` e letras e números).
4. **Vercel.** No projeto do site, crie `NEXT_PUBLIC_GA4_ID` com esse ID, no ambiente **Production**. Recomendo não pôr em Preview, para os testes de rascunho não sujarem os dados; se quiser medir os previews, use outra propriedade.
5. **Publicar de novo.** A variável entra no código na hora do build, então só vale depois de um novo deploy de produção (Vercel → Deployments → o último de produção → Redeploy). Alterar ações em produção exige o "pode" do Dyones.
6. **Evento principal.** Marque `generate_lead` como evento-chave (Admin → Eventos-chave → Novo evento-chave → `generate_lead`). Dá para criar antes de o primeiro lead chegar.
7. **Dimensões personalizadas.** Crie em Admin → Definições personalizadas, todas no escopo de evento, com o nome do parâmetro igual ao da tabela acima:
   - primeiro, as quatro da pendência: `page_type`, `service_line`, `cta_location` e `whatsapp_location`;
   - depois, se quiser o detalhe: `cta_label`, `email_location`, `form_id`, `lead_type`, `segmento` e `segment`.

   Sem a dimensão criada, o parâmetro chega mas não aparece nos relatórios.
8. **Retenção.** Admin → Retenção de dados → eventos em **14 meses**.
9. **Deixe desligados por enquanto:**
   - os Google Signals;
   - o vínculo com o Google Ads.

   Os dois fazem o `gtag` chamar outros domínios (`googleads.g.doubleclick.net`, `www.google.com.br`), que a política de segurança do site bloqueia. Ligar exige antes acrescentá-los em `src/lib/terceiros.ts` e citá-los em `/privacidade`.
10. **Opcional:** filtro de tráfego interno com o IP da V2O5, e vínculo com o Search Console de v2o5.com.br, se a propriedade do Search Console já estiver verificada.

## Como conferir

1. Use um navegador sem bloqueador de anúncios e sem ter desligado a medição em `/privacidade`. Quem desligou fica com `v2o5.medicao=desligada` no armazenamento do navegador, e nada carrega.
2. Abra o relatório **Tempo real** do GA4, ou o DebugView com a extensão Tag Assistant.
3. No site, faça o caminho e confira:
   - home → `/precos` → `/sobre`: um `page_view` por página, sem duplicar. O da home, carga completa, vem da tag, com `page_type=home` depois das regras de "Modificar evento"; os de `/precos` e `/sobre`, com o `page_type` e o título certos;
   - entrada direta em `/presenca-digital-local`: `page_view` com `page_type=solucao` e `service_line=presenca` (depois das regras);
   - clique em "Pedir diagnóstico": `cta_click` com o `cta_location`;
   - clique no botão do WhatsApp: `click_whatsapp` com o `whatsapp_location`;
   - envie um lead de teste em `/diagnostico`, com "TESTE" no nome: `form_start` e depois `generate_lead`. Avise no grupo, porque o lead de teste também chega ao n8n e ao Chatwoot.
4. No console do navegador, não pode haver erro de política de segurança (CSP) com `google-analytics.com` ou `googletagmanager.com`.

## O que não fazer

- Não instalar o GTM nem colar o snippet do GA no HTML: o site já carrega o `gtag` do jeito certo, depois da primeira pintura. Na Motors, o GTM com o Pixel custou cerca de 2,4 s de bloqueio no celular.
- Não mandar o `generate_lead` pelo Measurement Protocol: o GA4 não deduplica por `event_id`, e o hit sem o cookie do navegador perde a origem.
- Não ligar o Pixel da Meta só porque o GA4 entrou. A regra é GA4 em produção e Pixel só quando houver campanha na Meta. Quando houver, siga a segunda parte da pendência 16: conjunto de dados, `NEXT_PUBLIC_META_PIXEL_ID`, `META_PIXEL_ID`, `META_CAPI_TOKEN` e o teste com `META_CAPI_TEST_CODE`.

## Ao terminar

Devolva:
- o ID de métricas;
- o print do Tempo real com `page_view` e `generate_lead`;
- a lista do que ficou ligado e desligado na medição otimizada.

Depois, atualize a pendência 16 em `memory/pendencias.md` e a seção "Rastreamento" de `memory/context/infra.md`.
