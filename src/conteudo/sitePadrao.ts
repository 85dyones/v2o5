/**
 * A entrega-base do site: o que todo site da V2O5 leva, em qualquer pacote
 * de Sites & Integrações ou projeto que inclua um site (Dyones, 25/10/2026: "vamos padronizar a entrega do
 * site e desenvolver valor percebido"). Montada a partir do que o site da
 * V2O5 e o da Motors Store já entregam; sem número, só o que existe.
 * `tests/site-padrao.test.ts` confere. Revisada em 26/10/2026 (onze itens; privacidade para o cliente validar com o jurídico; código nos termos do contrato).
 */
export const SITE_PADRAO = {
  titulo: "O que todo site da V2O5 entrega.",
  texto:
    "A base é a mesma em qualquer pacote. O que muda de um projeto para outro é o que o diagnóstico encontrou: quais páginas, que integrações, que conteúdo.",
  itens: [
    {
      titulo: "Páginas que o Google entende",
      texto:
        "Uma página por serviço, produto ou modelo, com título, descrição e dados estruturados. É o que faz a empresa aparecer na busca e nas respostas das IAs.",
    },
    {
      titulo: "Rápido no celular",
      texto:
        "Next.js com o mínimo de JavaScript, imagens no tamanho certo e o título carregando antes de tudo. O site é medido no celular antes de ir ao ar.",
    },
    {
      titulo: "SEO técnico",
      texto: "Mapa do site, redirecionamentos do endereço antigo, robots e arquivo para assistentes de IA, enviados ao Search Console.",
    },
    {
      titulo: "Perfil da Empresa no Google",
      texto: "O antigo Google Meu Negócio, criado ou ajustado e ligado ao site, para quem busca perto aparecer no Maps. A verificação depende do Google.",
    },
    {
      titulo: "Origem de cada contato",
      texto:
        "Cada botão de WhatsApp e cada formulário gravam a campanha, o anúncio e a página de entrada, com GA4, Pixel e API de Conversões prontos para ligar.",
    },
    {
      titulo: "Contato que chega à equipe",
      texto: "O formulário e o WhatsApp levam a mensagem e a origem para quem atende: no CRM, quando o projeto o inclui, ou no canal que a empresa já usa.",
    },
    {
      titulo: "Privacidade e consentimento",
      texto: "Página de privacidade e consentimento no modelo da V2O5, com a oposição do visitante descrita, para o cliente validar com o jurídico dele.",
    },
    {
      titulo: "Domínio, e-mail e hospedagem",
      texto: "Entram na fundação do projeto. O registro do domínio e a caixa de e-mail são custos de terceiros, na proposta. Hospedagem, atualizações de segurança e monitoramento são definidos na proposta ou na recorrência.",
    },
    {
      titulo: "O código é seu",
      texto: "Domínio, hospedagem e código ficam no nome da sua empresa, nos termos do contrato.",
    },
    {
      titulo: "Segurança básica",
      texto: "HTTPS, cabeçalhos de segurança e limite de envios no formulário.",
    },
    {
      titulo: "Entrega documentada",
      texto: "O que foi feito, onde está e como mudar, em linguagem de quem vai operar.",
    },
  ],
  alem:
    "O que passa da base (estoque integrado ao sistema da loja, integração com outro sistema, conteúdo, branding) entra pelo pacote ou pela solução que cobre, em proposta.",
};
