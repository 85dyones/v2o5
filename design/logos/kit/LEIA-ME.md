# Kit de logos da V2O5

Gerado em 28/10/2026 por `scripts/exportar-logos.py`, a partir do símbolo C1d oficial (`src/lib/marca-vetor.ts`) e da Geist SemiBold do pacote `geist`, convertida em contorno: os SVG não dependem de fonte instalada. As proporções do logotipo horizontal são as do topo do site.

## Pastas

- `svg/`: os vetores (use estes sempre que o destino aceitar SVG).
- `png/<largura>px/`: o mesmo desenho em PNG, pela largura em pixels. Os PNG transparentes têm fundo transparente de verdade.

## Peças

| Peça | Arquivo | Para quê |
|---|---|---|
| Símbolo (nuvem com a molécula) | `v2o5-simbolo-*` | Avatar, selo, onde o espaço é quadrado ou o nome já aparece ao lado |
| Horizontal (símbolo + V2O5) | `v2o5-horizontal-*` | Cabeçalho, assinatura de e-mail, apresentação, documento |
| Ícone âmbar | `v2o5-icone-ambar*` | Favicon, ícone de aplicativo e tamanhos pequenos (32 a 192 px) |
| Avatar de rede social | `v2o5-avatar-rede-*` | Foto de perfil do LinkedIn, do Instagram e do Facebook (1080 e 400 px, símbolo com folga para o recorte circular) |

## Cores e fundos

Cada peça sai em quatro versões de cor, só nas combinações com contraste bom:

| Versão | Cores | Fundos gerados |
|---|---|---|
| `positivo` | tinta `#121418` e átomo âmbar `#F2A516` | transparente, `fundo-papel` (`#F2F1EC`), `fundo-branco` |
| `negativo` | papel `#F2F1EC` e átomo âmbar `#F2A516` | transparente, `fundo-tinta` (`#121418`) |
| `preto` | preto `#000000`, uma cor só | transparente, `fundo-papel`, `fundo-branco` |
| `branco` | branco `#FFFFFF`, uma cor só | transparente, `fundo-tinta` |

`transparente` serve para pôr o logo sobre o seu próprio fundo; as versões `fundo-*` já trazem o fundo sólido. As versões `preto` e `branco` são para impressão em uma cor, carimbo, gravação e fundos que não permitem o âmbar.

## Tamanhos mínimos e cuidados

- O símbolo completo (nuvem e molécula inteira) funciona de 64 px de largura em diante. **Abaixo disso, use o ícone âmbar**, que tem o desenho óptico para tamanho pequeno (traço mais grosso, só a cadeia em V).
- Não distorcer, não girar, não trocar as cores por outras da paleta e não pôr o positivo sobre fundo escuro nem o negativo sobre fundo claro.
- O nome público da marca é **V2O5 Vendas e Tecnologia**; o logotipo mostra só "V2O5", como no topo do site.
