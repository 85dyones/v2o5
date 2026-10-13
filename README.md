# v2o5

Site novo da V2O5 Vendas e Tecnologia.

- Contexto rápido do projeto: `CLAUDE.md`
- Memória detalhada: `memory/` (decisões, pendências, marca, oferta, SEO, infra, motion, case Motors)
- Plano completo: `docs/2026-10-08-plano-novo-site.md`
- Próxima etapa: `docs/HANDOFF.md`

## Rodar

```
npm install
npm run dev      # http://localhost:3000
npm test         # Vitest
npm run lint
npm run build
```

Código em `src/` (Next.js 16, React 19, Tailwind 4). Textos e números da home em `src/conteudo/home.ts`; cores em `src/lib/tokens.ts`; geometria do logo em `src/lib/marca.ts`.

## Variáveis de ambiente

Modelo em `.env.example` (copie para `.env.local`; na Vercel, Settings > Environment Variables, produção e preview). Nenhum valor real entra no repositório.

| Variável | Para quê |
|---|---|
| `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` | Entrega do lead do diagnóstico ao n8n (`docs/n8n/LEIA-ME.md`) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 no navegador (`src/lib/medicao.ts`); sem ela, não carrega |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel da Meta no navegador; só com campanha ativa |
| `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_CAPI_TEST_CODE` | API de Conversões da Meta pelo servidor (`src/lib/capi.ts`); o código de teste só enquanto se confere |

A medição carrega depois do conteúdo e respeita a oposição gravada em `/privacidade`. A camada de dados, os eventos e a CSP estão em `src/lib/medicao.ts`, `src/lib/terceiros.ts` e `next.config.ts`.
