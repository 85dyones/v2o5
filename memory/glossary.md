# Glossário

Tudo que aparece abreviado nas conversas do projeto. O que é usado toda hora também está no `CLAUDE.md`.

## Empresa e pessoas
| Termo | Significado |
|---|---|
| V2O5 | V2O5 Vendas e Tecnologia (nome fantasia); razão social V2O5 Tecnologia da Informação Ltda.; CNPJ 68.490.470/0001-14 |
| ConsultorIA | Nome antigo/trocadilho; fica só como `alternateName` no schema |
| Dyones | Dyones Oliveira, fundador da V2O5; Administração pela FAE Business School; branding (caso: Top Imóveis → Top Soluções Imobiliárias); na informática desde 1992 (curso ganho num concurso da escola); assina os guias da Motors; conduz o diagnóstico |
| Top | Top Imóveis, hoje Top Soluções Imobiliárias: caso de rebranding do Dyones citado na Visão 360 |
| Motors | Motors Store, revenda de seminovos no Bacacheri, Curitiba; cliente e case |
| Costuras | Conceito da Visão 360: a venda se perde na passagem entre marca, marketing, vendas e gestão; o fio âmbar (tecnologia) costura as quatro |

## Marca
| Termo | Significado |
|---|---|
| Catalisador | V2O5 (pentóxido de vanádio) catalisa a produção de ácido sulfúrico; a IA é o catalisador da V2O5 |
| C1 | Logo: nuvem com rede neural no formato da molécula V2O5 (2 vanádios, 5 oxigênios) e sinal âmbar |
| C1a | C1 em que a molécula desenha um V (monograma) |
| C1b | C1 com nuvem simétrica e fenda de cérebro; oxigênio-ponte liga os hemisférios |
| C1c | C1 sólida: nuvem cheia, rede vazada |
| Direção B | Funil visto de cima (pirâmide); escolhida em 08/10, substituída pela família C1 em 09/10 |
| Direção A | Fórmula tipográfica V₂O₅; descartada |
| C2 | Nuvem de engrenagens; descartada |
| V⁵⁺ âmbar | #F2A516, cor de ação; texto âmbar sobre claro usa #8A5600 |
| Logo atual | Nuvem com 10 engrenagens + "ConsultorIA" (WordPress); só funciona em branco sobre escuro |

## Oferta
| Termo | Significado |
|---|---|
| Start Digital | Redes, Perfil de Empresa, domínio, e-mail; saiu do cardápio, é fundação dos sites |
| Diagnóstico | Gratuito; 45 min + mapa em 24 h com 3 mudanças de maior retorno |
| Pacote completo | Site de estoque + IA + CRM + rastreamento + integração Revenda Mais: R$ 14.900 + R$ 1.690/mês |
| Cláusula de saída | Loja que cancela recebe código, dados e domínio em até 15 dias |
| Camada | "A camada que gera e mede a venda é sua": frase para o segmento automotivo |

## Técnica
| Termo | Significado |
|---|---|
| CAPI | API de Conversões da Meta, enviada pelo servidor com `event_id` para deduplicar com o Pixel |
| event_id | Identificador da conversão compartilhado entre navegador e servidor |
| pos_lead | Clique no WhatsApp logo após o formulário; não conta como conversão (evita contagem dupla) |
| sGTM | GTM server-side; decisão adiada (fase 3 recomendada) |
| Evolution | Evolution API, ponte do WhatsApp na VPS |
| RevendaMais / Revenda Mais | Sistema de gestão de revendas; a Motors sincroniza estoque dele via n8n |
| Régua | Regras de alerta e transferência de leads no funil da Motors |
| Humanizer | Skill que tira marcas de texto de IA; obrigatória para texto público |
| Lighthouse de base | 08/10/2026, mobile: site atual 51, Motors 44, IAEO 66 |

## Concorrentes e mercado
| Termo | Significado |
|---|---|
| IAEO | Agência de IA de Curitiba; referência de execução (preço publicado, nichos) |
| Autoconf | Sistema de gestão de revendas de Curitiba; mesmo discurso "nasceu numa loja" |
| AutoSDR | SaaS de IA para revendas; forte em SEO comparativo |
| Motorleads | Plataforma de sites e mídia para revendas; a mais parecida com a V2O5 |
| Fenauto / Assovepar | Federação nacional e associação paranaense de revendas (alcance fora do site) |

## Repositórios da conta
| Repo | O que é |
|---|---|
| 85dyones/v2o5 | Este projeto |
| 85dyones/motors-site-oficial | Site e painel da Motors (Next.js); base técnica de referência |
| rede-auto, Motogestor-v3 | Produtos em estudo; Motogestor vai para a linha da Motors |
| 16V | Projeto jurídico (Supabase "16-vara-civel"), fora do setor |
| smart-parking-v2o5, freespot | Outros projetos; sem decisão de virar case |
