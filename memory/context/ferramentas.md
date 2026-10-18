# Ferramentas e habilidades

## Plugins (instalados em 09/10 no ambiente de nuvem, escopo usuário)
O contêiner é temporário: numa sessão nova, confira com `claude plugin list` e reinstale se faltar.
```
claude plugin install frontend-design@anthropic-plugin-directory
claude plugin install audit-suite@anthropic-plugin-directory
claude plugin install perf-profiler-lighthouse-and-core-web-vitals@anthropic-plugin-directory
claude plugin install parallax-threejs@anthropic-plugin-directory
claude plugin install axe-accessibility@anthropic-plugin-directory
```
Plugins carregam na sessão seguinte à instalação. Sem recarregar, leia o `SKILL.md` direto em `~/.claude/plugins/cache/anthropic-plugin-directory/<plugin>/<versão>/skills/<skill>/SKILL.md`.

| Plugin | Usar para |
|---|---|
| frontend-design | Direção e execução de UI sem cara de template |
| audit-suite | `web-animation-design`, `emil-design-engineering`, `make-interfaces-feel-better`, `vercel-react-best-practices`, auditorias de perf/a11y/design |
| perf-profiler | Lighthouse e Core Web Vitals explicados |
| parallax-threejs | Depuração de WebGL e regressão visual (MCPs de Chrome DevTools e Playwright) |
| axe-accessibility | Habilidades de a11y; o scanner MCP exige conta Deque (não temos). Alternativa: `@axe-core/playwright` |

## MCP do Awwwards (18/10, no repo)
Referência visual de sites premiados ([INSANE0777/Awwwards-mcp](https://github.com/INSANE0777/Awwwards-mcp), MIT): busca com screenshot, DNA de design, mapa de seções, censo de scroll e hover, `verify_build` contra a referência. 22 ferramentas.
- Servidor em `.mcp.json`, versão fixa: `npx -y -p awwwards-mcp@1.9.0 -p playwright@1.56.1 awwwards-mcp`. O Playwright 1.56.1 casa com o Chromium de `/opt/pw-browsers`; na máquina local, rode uma vez `npx playwright@1.56.1 install chromium`.
- Aprovação: servidor de `.mcp.json` só carrega aprovado. No terminal local o Claude pergunta na primeira vez. O `.claude/settings.json` do projeto é ignorado para isso; vale só `~/.claude/settings.json` com `{"enabledMcpjsonServers": ["awwwards"]}`. Na nuvem o contêiner zera, então essa linha vai no script de configuração do ambiente.
- Rede na nuvem: `www.awwwards.com` e `assets.awwwards.com` bloqueados em 18/10 (busca volta vazia, índice falha com 503). Para usar, liberar os dois em Allowed domains do ambiente; captura de site qualquer (`capture_live_site`, censos) pede o domínio do site também.
- `record_site_motion` precisa de `ffmpeg-static` (não instalado). O resto funciona sem ele; o censo de scroll e hover cobre a maior parte.
- Skills em `.claude/skills/` (cópia do commit `ef6b563`): `awwwards-setup`, `awwwards-inspiration`, `awwwards-motion-study`, `awwwards-section-loop`, `awwwards-doctor`, mais `_memory/techniques.json`. Os passos de "flywheel" (`scripts/skill-memory.mjs`) e o `npm run doctor` são do repo de origem e não existem aqui. Capturas ficam em `ref-motion/` ou `_qa/`, fora do git.
- Atualizar: trocar a versão no `.mcp.json` e copiar de novo a pasta `skills/` do repo de origem.

## Já disponíveis
Skills: humanizer (texto público), searchfit-seo (schema, on-page, auditoria), marketing, artifact-design (canvas). MCPs: Supabase, Vercel, GitHub. Chromium em `/opt/pw-browsers` (não rodar `playwright install`).

## Canvas de marca
https://claude.ai/artifact/TJi91r21pMCLXUxL3AEYT3 (tipo Design, privado). Quadros: B, A, C1, C2, comparações, C1a/b/c, cores, tipografia, aplicações. Logo atual subido como asset `/_blob/e084497a543a24bf8ac0eb879b0a566a`.
