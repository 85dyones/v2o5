# Case 16ª Vara Cível (triagem automatizada por WhatsApp)

Este repositório é público. O detalhe do cliente (propostas, contrato, leitura dos fluxos, números, pendências técnicas e de segurança) mora no repositório privado `85dyones/16V`, branch `claude/redesign-serventias`, em `docs/plano-redesign.md` e `docs/historico-e-case.md` (movido daqui em 14/10/2026). Não trazer esse detalhe de volta para cá.

## Para o site
- **O que é.** Triagem automatizada por WhatsApp para a 16ª Vara Cível de Curitiba, com Typebot, n8n e Chatwoot: o cidadão escolhe o assunto e o setor, e a conversa chega ao time certo da serventia. Sem IA na versão atual; o case conta triagem e encaminhamento, não agente de IA.
- **Desde quando.** Contrato desde 10/2025; renovação de 1 ano em 10/2026 (Dyones, 14/10/2026).
- **Números.** No site desde 17/11/2026: a vara autorizou e o Dyones confirmou resolvido o problema de atribuição ao time ("sim, foi solucionado o problema", 17/11). Só contagens absolutas, lidas no Chatwoot da serventia (conta 3) em 14/10/2026, de conversas criadas de 07/01 a 13/10/2026; o resto da leitura (urgência, conversas abertas, resposta humana) é melhoria interna e fica no repositório privado.

| Dado publicado | Valor |
|---|---|
| Conversas lidas no período | 950 |
| Encaminhamentos completos (com os atributos do fluxo) | 345: consulta 128, dúvida 110, intimação 59, magistrada 48 |
| Encaminhados direto a setores específicos | 118, em oito setores (petições 42, alvarás 19, editais 18, retorno de conclusão 14, audiências 7, desarquivamento 7, decurso de prazo 7, sistemas conveniados 4) |
- **No site desde 17/11/2026.** Case avulso em `/cases/16-vara-civel` (`CASE_16VC` em `src/conteudo/case.ts`, travado por `tests/case-16-vara-civel.test.ts`), com o nome autorizado pela vara (Dyones, 17/11). Sem número, sem IA, sem dado pessoal e sem detalhe interno; o texto diz que a conversa entra no sistema de atendimento com o setor e os dados, e não que chega atribuída ao time, porque isso depende do alerta registrado no plano (pendência 40). Sem hub de segmento: o segmento de serventias fica para quando houver produto para ele.
- **A plataforma própria (repo `85dyones/16V`, `main` em 03/11/2026).** Painel em vc16.v2o5.com.br implantado pelo dono em 27/10, com o canal simulado desligado; agente de IA na triagem, assistente interno, perguntas frequentes, andamento público (DataJud e Projudi), relatório de paralisados e intimação eletrônica (IN 73/2021, parte 1) estão no código, desligados e sem publicação. O WhatsApp da vara segue no Typebot e no Chatwoot. Nada disso entra no case até o número oficial passar pelo painel novo; aí o "depois" do case muda, com números do próprio painel (17/11).
- **Marca do TJPR (17/11).** Uso autorizado pela vara (Dyones: "temos a autorização"). Entra na ficha do cliente do case (`src/assets/tjpr/marca-tjpr.png`, tirada do manual público de marca do TJPR) e na capa do destaque do Instagram e na versão quadrada, com "16ª VARA CÍVEL" na D-DIN PRO (`design/ferramentas/gerar-16-vara.py`).
- **Storytelling (17/11).** O case passou a contar a história: um WhatsApp para os onze setores da serventia, o desenho de maio de 2025 com quatro regras, uma consulta de exemplo (dados fictícios, textos do Typebot) e o que muda para a equipe.
