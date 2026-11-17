# Case 16ª Vara Cível (triagem automatizada por WhatsApp)

Este repositório é público. O detalhe do cliente (propostas, contrato, leitura dos fluxos, números, pendências técnicas e de segurança) mora no repositório privado `85dyones/16V`, branch `claude/redesign-serventias`, em `docs/plano-redesign.md` e `docs/historico-e-case.md` (movido daqui em 14/10/2026). Não trazer esse detalhe de volta para cá.

## Para o site
- **O que é.** Triagem automatizada por WhatsApp para a 16ª Vara Cível de Curitiba, com Typebot, n8n e Chatwoot: o cidadão escolhe o assunto e o setor, e a conversa chega ao time certo da serventia. Sem IA na versão atual; o case conta triagem e encaminhamento, não agente de IA.
- **Desde quando.** Contrato desde 10/2025; renovação de 1 ano em 10/2026 (Dyones, 14/10/2026).
- **Números.** Há números medidos no Chatwoot (01 a 10/2026), guardados no repositório privado. Só vão para o site com autorização da vara e depois de resolvido o alerta registrado no plano.
- **No site desde 17/11/2026.** Case avulso em `/cases/16-vara-civel` (`CASE_16VC` em `src/conteudo/case.ts`, travado por `tests/case-16-vara-civel.test.ts`), com o nome autorizado pela vara (Dyones, 17/11). Sem número, sem IA, sem dado pessoal e sem detalhe interno; o texto diz que a conversa entra no sistema de atendimento com o setor e os dados, e não que chega atribuída ao time, porque isso depende do alerta registrado no plano (pendência 40). Sem hub de segmento: o segmento de serventias fica para quando houver produto para ele.
