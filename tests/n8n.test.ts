import { describe, expect, it } from "vitest";
import { ESTOQUES, OBJETIVOS, PORTES, SEGMENTOS, SISTEMAS } from "@/conteudo/diagnostico";
import { EMPRESA, MARCA_DO_SITE, WHATSAPP } from "@/conteudo/home";
import { FOTOGRAFIA_PARCEIRA } from "@/conteudo/precos";
import { mensagemDaSolucao, SOLUCOES } from "@/conteudo/solucoes";
import { arquivos, ler, semComentarios } from "./fonte";

/**
 * Os fluxos do n8n (`docs/n8n/`) são o outro lado do site: o do diagnóstico
 * recebe `/api/leads`, o da origem reconhece o lead do botão de WhatsApp pela
 * mensagem pronta e o do agente só responde lead marcado. Este teste amarra os
 * três ao site e roda o JavaScript dos nós de código com entradas de exemplo,
 * sem precisar de um n8n rodando.
 */

type No = {
  name: string;
  type: string;
  parameters: Record<string, unknown>;
  credentials?: Record<string, { name: string; id?: string; data?: unknown }>;
  disabled?: boolean;
  onError?: string;
};
type Fluxo = { name: string; nodes: No[]; connections: Record<string, { main: { node: string }[][] }>; pinData?: unknown };
type Item = { json: Record<string, unknown> };

const abrir = (arquivo: string) => JSON.parse(ler(`docs/n8n/${arquivo}`)) as Fluxo;
const diagnostico = abrir("lead-do-diagnostico.json");
const origem = abrir("origem-do-lead.json");
const agente = abrir("agente-da-v2o5.json");
const fluxos = { diagnostico, origem, agente };
const leiaMe = ler("docs/n8n/LEIA-ME.md");

const no = (fluxo: Fluxo, nome: string) => {
  const achado = fluxo.nodes.find((n) => n.name === nome);
  if (!achado) throw new Error(`nó ${nome} não existe em ${fluxo.name}`);
  return achado;
};
const campo = (fluxo: Fluxo, nome: string) =>
  (no(fluxo, "Configuração").parameters as { assignments: { assignments: { name: string; value: string }[] } }).assignments.assignments.find(
    (a) => a.name === nome,
  )?.value;
const js = (fluxo: Fluxo, nome: string) => String(no(fluxo, nome).parameters.jsCode);

/** Roda um nó de código como o n8n roda: `$input` e `$("Nó")` com os dados dados aqui. */
function rodar(fluxo: Fluxo, nome: string, entrada: unknown[], anteriores: Record<string, unknown> = {}): Item[] {
  const $input = { first: () => ({ json: entrada[0] }), all: () => entrada.map((json) => ({ json })) };
  const $ = (n: string) => {
    if (!(n in anteriores)) throw new Error(`o teste não deu a saída do nó ${n}`);
    return { first: () => ({ json: anteriores[n] }) };
  };
  return new Function("$input", "$", js(fluxo, nome))($input, $) as Item[];
}
const configuracao = (fluxo: Fluxo) =>
  Object.fromEntries(
    (no(fluxo, "Configuração").parameters as { assignments: { assignments: { name: string; value: string }[] } }).assignments.assignments.map(
      (a) => [a.name, a.value],
    ),
  );

/** Todos os caminhos do gatilho até um nó (os fluxos não têm laço). */
function caminhos(fluxo: Fluxo, de: string, ate: string): string[][] {
  if (de === ate) return [[ate]];
  const saidas = (fluxo.connections[de]?.main ?? []).flat().map((s) => s.node);
  return saidas.flatMap((proximo) => caminhos(fluxo, proximo, ate).map((c) => [de, ...c]));
}

describe("os três fluxos", () => {
  it("toda conexão aponta para um nó que existe", () => {
    for (const fluxo of Object.values(fluxos)) {
      const nomes = new Set(fluxo.nodes.map((n) => n.name));
      for (const [de, saidas] of Object.entries(fluxo.connections)) {
        expect(nomes.has(de), `${fluxo.name}: ${de}`).toBe(true);
        for (const saida of saidas.main) for (const alvo of saida) expect(nomes.has(alvo.node), `${fluxo.name}: ${alvo.node}`).toBe(true);
      }
    }
  });

  it("saem saneados: credencial só pelo nome, sem pinData e sem chave no arquivo", () => {
    for (const fluxo of Object.values(fluxos)) {
      expect(fluxo.pinData, fluxo.name).toBeUndefined();
      for (const n of fluxo.nodes) {
        for (const cred of Object.values(n.credentials ?? {})) {
          expect(cred.id, `${fluxo.name}: ${n.name}`).toBeUndefined();
          expect(cred.data, `${fluxo.name}: ${n.name}`).toBeUndefined();
        }
      }
      const texto = JSON.stringify(fluxo);
      expect(texto).not.toMatch(/apikey"\s*:\s*"[^"]{8,}/);
      expect(texto).not.toMatch(/sk-ant-|api_access_token"\s*:\s*"[^"]{8,}/);
    }
  });

  it("falam do mesmo Chatwoot, da mesma conta, caixa, atributo e etiqueta", () => {
    for (const fluxo of Object.values(fluxos)) {
      expect(campo(fluxo, "chatwootUrl"), fluxo.name).toBe("https://app.chat.v2o5.com.br");
      // Conta, caixa e instância confirmadas pelo Dyones nos painéis (13/10).
      expect(campo(fluxo, "chatwootConta"), fluxo.name).toBe("1");
      expect(campo(fluxo, "chatwootInbox"), fluxo.name).toBe("12");
      expect(campo(fluxo, "atributoOrigem"), fluxo.name).toBe("origem");
      expect(campo(fluxo, "valorOrigem"), fluxo.name).toBe("v2o5");
      expect(campo(fluxo, "etiquetaOrigem"), fluxo.name).toBe("origem-v2o5");
    }
    expect(campo(origem, "marcaDoSite")).toBe(MARCA_DO_SITE);
    expect(campo(agente, "marcaDoSite")).toBe(MARCA_DO_SITE);
  });

  it("o reconhecimento do lead do botão é o mesmo no fluxo da origem e no do agente", () => {
    const semAcento = (codigo: string) => codigo.split("\n").find((l) => l.startsWith("const semAcento"));
    expect(semAcento(js(origem, "Decidir"))).toBeTruthy();
    expect(semAcento(js(origem, "Decidir"))).toBe(semAcento(js(agente, "Decidir")));
    expect(js(origem, "Mensagem recebida")).toBe(js(agente, "Mensagem recebida"));
  });

  it("o LEIA-ME documenta os três endereços e as credenciais pelo nome", () => {
    for (const caminho of ["v2o5-diagnostico", "v2o5-origem", "v2o5-agente"]) {
      expect(leiaMe).toContain(`https://n8n.v2o5.com.br/webhook/${caminho}`);
    }
    const credenciais = new Set(
      Object.values(fluxos).flatMap((f) => f.nodes.flatMap((n) => Object.values(n.credentials ?? {}).map((c) => c.name))),
    );
    for (const nome of credenciais) expect(leiaMe, nome).toContain(`\`${nome}\``);
  });
});

describe("mensagens prontas do WhatsApp", () => {
  it("toda mensagem pronta do site traz o trecho que o n8n reconhece", () => {
    const mensagens = [...Object.values(WHATSAPP.mensagens), ...SOLUCOES.map(mensagemDaSolucao), FOTOGRAFIA_PARCEIRA.mensagem];
    for (const m of mensagens) expect(m, m).toContain(MARCA_DO_SITE);
  });

  it("nenhum link de WhatsApp sai sem mensagem pronta", () => {
    for (const arquivo of arquivos("src", /\.tsx?$/)) {
      if (arquivo === "src/lib/whatsapp.ts") continue;
      expect(semComentarios(ler(arquivo)), arquivo).not.toMatch(/linkWhatsApp\(\s*\)/);
    }
  });
});

describe("fluxo do diagnóstico", () => {
  const cfg = configuracao(diagnostico);
  const lead = {
    nome: "Marina Ribeiro",
    whatsapp: "5541998089550",
    email: "marina@exemplo.com.br",
    empresa: "Auto Center Ribeiro",
    segmento: "Revenda de veículos",
    porte: "6 a 20 pessoas",
    objetivos: "Aparecer no Google e no Maps",
    estoque: "31 a 80",
    sistema: "Revenda Mais",
    pagina: "/diagnostico",
    origemResumo: "Google Ads · utm: google / cpc",
    event_id: "Lead.teste",
  };

  it("recebe no caminho documentado, exige o cabeçalho do segredo e responde pelo nó de resposta", () => {
    const webhook = no(diagnostico, "Pedido do site");
    expect(webhook.type).toBe("n8n-nodes-base.webhook");
    expect(webhook.parameters).toMatchObject({ httpMethod: "POST", path: "v2o5-diagnostico", authentication: "headerAuth", responseMode: "responseNode" });
    expect(diagnostico.nodes.some((n) => n.type === "n8n-nodes-base.respondToWebhook")).toBe(true);
    for (const nome of ["LEADS_WEBHOOK_URL", "LEADS_WEBHOOK_SECRET", "X-V2O5-Segredo"]) expect(leiaMe).toContain(nome);
  });

  it("traduz os códigos do formulário com os mesmos rótulos que a pessoa viu", () => {
    const mapa = (lista: readonly { valor: string; rotulo: string }[]) => Object.fromEntries(lista.map((o) => [o.valor, o.rotulo]));
    const rotulos = { segmento: mapa(SEGMENTOS), porte: mapa(PORTES), objetivos: mapa(OBJETIVOS), estoque: mapa(ESTOQUES), sistema: mapa(SISTEMAS) };
    expect(js(diagnostico, "Lead")).toContain(`const ROTULOS = ${JSON.stringify(rotulos)};`);
  });

  it("avisa o número público, usa a instância da Evolution e responde pelo e-mail público", () => {
    expect(campo(diagnostico, "whatsappDyones")).toBe(EMPRESA.whatsapp);
    expect(campo(diagnostico, "evolutionUrl")).toBe("https://evolution.v2o5.com.br");
    expect(campo(diagnostico, "evolutionInstancia")).toBe("v2o5");
    const email = no(diagnostico, "Responder por e-mail");
    expect(email.parameters.fromEmail).toBe(EMPRESA.email);
    expect(email.disabled).toBe(true);
  });

  it("marca o contato antes da primeira mensagem ao lead", () => {
    const todos = caminhos(diagnostico, "Pedido do site", "Responder ao lead");
    expect(todos.length).toBeGreaterThan(0);
    for (const c of todos) {
      // O atributo vai na gravação do contato; todo caminho passa por ela.
      expect(c, c.join(" → ")).toContain("Contato marcado");
      // Com o contato salvo, a etiqueta entra antes da resposta. Sem ele (o
      // Chatwoot recusou), o lead ainda recebe a resposta.
      if (c.includes("Etiquetas do contato")) expect(c, c.join(" → ")).toContain("Etiquetar contato");
    }
    expect(todos.some((c) => c.includes("Etiquetar contato"))).toBe(true);
  });

  it("usa o número que a Evolution conhece: sem o nono dígito quando o WhatsApp não tem", () => {
    const [saida] = rodar(diagnostico, "Telefone", [{ exists: true, jid: "554198089550@s.whatsapp.net", number: "5541998089550" }], { Lead: lead });
    expect(saida.json).toMatchObject({ numero: "554198089550", telefone: "+554198089550", identificador: "554198089550@s.whatsapp.net", temWhatsApp: true });
    expect(saida.json.variantes).toEqual(["554198089550", "5541998089550"]);
    const filtro = saida.json.filtro as { attribute_key: string; values: string[]; query_operator: string | null }[];
    expect(filtro.map((f) => f.values[0])).toEqual([
      "554198089550@s.whatsapp.net",
      "+554198089550",
      "5541998089550@s.whatsapp.net",
      "+5541998089550",
    ]);
    expect(filtro.slice(0, -1).every((f) => f.query_operator === "OR")).toBe(true);
    expect(filtro[filtro.length - 1].query_operator).toBeNull();
  });

  it("mantém o nono dígito quando o WhatsApp tem e cai no número digitado quando a Evolution não acha", () => {
    const [sp] = rodar(diagnostico, "Telefone", [{ exists: true, jid: "5511987654321@s.whatsapp.net" }], { Lead: { ...lead, whatsapp: "5511987654321" } });
    expect(sp.json).toMatchObject({ numero: "5511987654321", variantes: ["5511987654321", "551187654321"] });
    const [semZap] = rodar(diagnostico, "Telefone", [{ exists: false, jid: "5541998089550@s.whatsapp.net" }], { Lead: lead });
    expect(semZap.json).toMatchObject({ numero: "5541998089550", identificador: null, temWhatsApp: false });
    const [erro] = rodar(diagnostico, "Telefone", [{ error: { message: "ECONNREFUSED" } }], { Lead: lead });
    expect(erro.json).toMatchObject({ numero: "5541998089550", temWhatsApp: false });
  });

  it("grava origem = v2o5 no contato e guarda a campanha em outro atributo", () => {
    const tel = { numero: "554198089550", telefone: "+554198089550", identificador: "554198089550@s.whatsapp.net" };
    const achados = [
      { id: 7, phone_number: "+5541998089550", identifier: null, email: "antigo@exemplo.com.br" },
      { id: 9, phone_number: "+554198089550", identifier: "554198089550@s.whatsapp.net", email: null },
    ];
    const [existente] = rodar(diagnostico, "Contato existente", [{ payload: achados }], { Configuração: cfg, Lead: lead, Telefone: tel });
    expect(existente.json.contatoId).toBe(9);
    const atualizar = existente.json.corpoAtualizar as { email?: string; identifier?: string; custom_attributes: Record<string, string> };
    expect(atualizar.custom_attributes.origem).toBe("v2o5");
    expect(atualizar.custom_attributes.origem_da_visita).toBe(lead.origemResumo);
    expect(atualizar.email).toBe(lead.email);
    expect(atualizar.identifier).toBeUndefined();

    const [comEmail] = rodar(diagnostico, "Contato existente", [{ payload: [achados[0]] }], { Configuração: cfg, Lead: lead, Telefone: tel });
    const atualizarOutro = comEmail.json.corpoAtualizar as { email?: string; identifier?: string };
    expect(atualizarOutro.email).toBeUndefined();
    expect(atualizarOutro.identifier).toBe(tel.identificador);

    const [novo] = rodar(diagnostico, "Contato existente", [{ payload: [] }], { Configuração: cfg, Lead: lead, Telefone: tel });
    expect(novo.json.contatoId).toBeNull();
    expect(novo.json.corpoCriar).toMatchObject({ inbox_id: 12, phone_number: "+554198089550", identifier: tel.identificador, email: lead.email });
    expect(novo.json.corpoCriarSemEmail).not.toHaveProperty("email");
  });

  it("soma a etiqueta às que existem e só etiqueta conversa aberta da caixa 12", () => {
    const [somada] = rodar(diagnostico, "Somar etiqueta", [{ payload: ["cliente", "origem-v2o5"] }], { Configuração: cfg });
    expect(somada.json.labels).toEqual(["cliente", "origem-v2o5"]);
    const conversas = [
      { id: 1, inbox_id: 12, status: "pending", labels: [] },
      { id: 2, inbox_id: 12, status: "resolved", labels: [] },
      { id: 3, inbox_id: 5, status: "open", labels: [] },
      { id: 4, inbox_id: 12, status: "open", labels: ["origem-v2o5"] },
    ];
    const saida = rodar(diagnostico, "Conversas para etiquetar", [{ payload: conversas }], { Configuração: cfg, "Contato marcado": { contatoId: 9 } });
    expect(saida.map((i) => i.json)).toEqual([{ conversaId: 1, labels: ["origem-v2o5"] }]);
  });

  it("os textos para o lead e para o Dyones seguem as regras do site (sem travessão)", () => {
    const codigo = js(diagnostico, "Lead");
    expect(codigo).not.toMatch(/[—–]/);
    expect(codigo).toContain("45 minutos com o Dyones");
    expect(codigo).toContain("em até 24 horas");
  });
});

/** Evento `message_created` como o Chatwoot 4.17 manda (`Message#webhook_data`). */
const evento = (mudar: Record<string, unknown> = {}, conversa: Record<string, unknown> = {}) => ({
  body: {
    event: "message_created",
    id: 501,
    content: "Olá! Vi a página de preços no site da V2O5 e quero conversar sobre a minha empresa.",
    message_type: "incoming",
    private: false,
    account: { id: 1, name: "V2O5 ConsultorIA" },
    inbox: { id: 12, name: "Whats v2o5" },
    conversation: { id: 77, inbox_id: 12, status: "pending", labels: [], meta: { sender: { id: 300, type: "contact" } }, ...conversa },
    sender: { id: 300 },
    ...mudar,
  },
});

describe("fluxo da origem (botão de WhatsApp)", () => {
  const cfg = configuracao(origem);
  const recebida = { conversaId: 77, contatoId: 300, mensagemId: 501, texto: "(o texto do evento não decide nada)", rotulosDaConversa: [] };
  const botao = "Olá! Vim pelo SITE DA V2O5 e quero pedir o diagnóstico gratuito.";
  const msg = (id: number, tipo: number, content = "oi", privada = false) => ({ id, inbox_id: 12, message_type: tipo, private: privada, content });

  it("escuta o webhook documentado e só segue com mensagem recebida da caixa 12", () => {
    expect(no(origem, "Evento do Chatwoot").parameters).toMatchObject({ httpMethod: "POST", path: "v2o5-origem" });
    expect(rodar(origem, "Mensagem recebida", [evento()], { Configuração: cfg })[0].json).toMatchObject({ conversaId: 77, contatoId: 300, mensagemId: 501 });
    expect(rodar(origem, "Mensagem recebida", [evento({ message_type: "outgoing" })], { Configuração: cfg })).toEqual([]);
    expect(rodar(origem, "Mensagem recebida", [evento({ private: true })], { Configuração: cfg })).toEqual([]);
    expect(rodar(origem, "Mensagem recebida", [evento({}, { inbox_id: 5 })], { Configuração: cfg })).toEqual([]);
    expect(rodar(origem, "Mensagem recebida", [evento({ account: { id: 3 } })], { Configuração: cfg })).toEqual([]);
    expect(rodar(origem, "Mensagem recebida", [evento({ event: "conversation_created" })], { Configuração: cfg })).toEqual([]);
  });

  const decidir = (contato: Record<string, unknown>, mensagens: unknown[], ev = recebida, labels: string[] = [], dono = 300) =>
    rodar(origem, "Decidir", [{}], {
      Configuração: cfg,
      "Mensagem recebida": ev,
      Contato: { payload: contato },
      "Mensagens da conversa": { meta: { labels, contact: { id: dono } }, payload: mensagens },
    });

  it("marca o contato na primeira mensagem com o trecho, sem diferença de maiúscula ou acento", () => {
    const [saida] = decidir({ custom_attributes: {} }, [msg(501, 0, botao)]);
    expect(saida.json).toMatchObject({ marcarContato: true, etiquetarConversa: true, contatoId: 300, conversaId: 77 });
    expect(saida.json.atributos).toMatchObject({ origem: "v2o5", entrada: "botão de WhatsApp do site", primeira_mensagem: botao });
    expect(saida.json.rotulosDaConversa).toEqual(["origem-v2o5"]);
    const [acento] = decidir({ custom_attributes: {} }, [msg(501, 0, "vim pelo síte da   v2o5")]);
    expect(acento.json.marcarContato).toBe(true);
  });

  it("não marca sem o trecho nem fora da primeira mensagem", () => {
    expect(decidir({ custom_attributes: {} }, [msg(501, 0, "Oi, tudo bem?")])).toEqual([]);
    expect(decidir({ custom_attributes: {} }, [msg(480, 0), msg(490, 1), msg(501, 0, botao)])).toEqual([]);
    // Saída da V2O5 antes não conta: a primeira recebida ainda é esta.
    expect(decidir({ custom_attributes: {} }, [msg(490, 1), msg(501, 0, botao)])[0].json.marcarContato).toBe(true);
  });

  it("evento forjado não marca: o texto e o dono da conversa vêm da API", () => {
    // O evento diz que a mensagem tem o trecho, mas na conversa real ela não tem.
    expect(decidir({ custom_attributes: {} }, [msg(501, 0, "bom dia")], { ...recebida, texto: botao })).toEqual([]);
    // Mensagem que não existe na conversa.
    expect(decidir({ custom_attributes: {} }, [msg(499, 0, botao)])).toEqual([]);
    // Contato do evento não é o dono da conversa.
    expect(decidir({ custom_attributes: {} }, [msg(501, 0, botao)], recebida, [], 999)).toEqual([]);
    // Mensagem de outra caixa.
    expect(decidir({ custom_attributes: {} }, [{ ...msg(501, 0, botao), inbox_id: 5 }])).toEqual([]);
  });

  it("contato já marcado só ganha a etiqueta na conversa nova", () => {
    const [saida] = decidir({ custom_attributes: { origem: "v2o5" } }, [msg(480, 0), msg(501, 0, "oi de novo")]);
    expect(saida.json).toMatchObject({ marcarContato: false, etiquetarConversa: true });
    expect(decidir({ custom_attributes: { origem: "v2o5" } }, [msg(501, 0)], recebida, ["origem-v2o5"])).toEqual([]);
  });
});

describe("fluxo do agente", () => {
  const cfg = configuracao(agente);
  const ev = { conversaId: 77, contatoId: 300, mensagemId: 503, texto: "quanto custa?" };
  const msg = (id: number, tipo: number, content = "oi") => ({ id, message_type: tipo, private: false, content });
  const decidir = (conversa: Record<string, unknown>, contato: Record<string, unknown>, mensagens: unknown[]) =>
    rodar(agente, "Decidir", [{}], {
      Configuração: cfg,
      "Mensagem recebida": ev,
      Conversa: { status: "pending", inbox_id: 12, labels: [], meta: { sender: { id: 300 }, assignee_type: "AgentBot", assignee: { id: 1 } }, ...conversa },
      Contato: { payload: contato },
      "Mensagens da conversa": { payload: mensagens },
    });
  const marcado = { custom_attributes: { origem: "v2o5" } };
  const semMarca = { custom_attributes: {} };

  it("responde lead marcado e passa os outros para a equipe sem responder", () => {
    expect(decidir({}, marcado, [msg(501, 0), msg(502, 1), msg(503, 0)])[0].json).toMatchObject({ acao: "responder", conversaId: 77 });
    expect(decidir({}, semMarca, [msg(503, 0, "bom dia")])[0].json.acao).toBe("passar");
    expect(decidir({ labels: ["origem-v2o5"] }, semMarca, [msg(503, 0)])[0].json.acao).toBe("responder");
  });

  it("atende o lead do botão mesmo antes de o fluxo da origem gravar a marca", () => {
    const primeira = msg(503, 0, "Olá! Vim pelo site da V2O5 e quero pedir o diagnóstico gratuito.");
    expect(decidir({}, semMarca, [primeira])[0].json.acao).toBe("responder");
  });

  it("não mexe em conversa aberta, com gente atribuída, nem responde fora da última mensagem", () => {
    expect(decidir({ status: "open" }, marcado, [msg(503, 0)])).toEqual([]);
    expect(decidir({ meta: { sender: { id: 300 }, assignee_type: "User", assignee: { id: 2 } } }, marcado, [msg(503, 0)])).toEqual([]);
    expect(decidir({}, marcado, [msg(503, 0), msg(504, 0)])).toEqual([]);
    expect(decidir({}, marcado, [msg(503, 0), msg(504, 1)])).toEqual([]);
  });

  it("evento forjado não faz o agente responder em conversa de outro contato ou de outra caixa", () => {
    expect(decidir({ meta: { sender: { id: 999 } } }, marcado, [msg(503, 0)])).toEqual([]);
    expect(decidir({ inbox_id: 5 }, marcado, [msg(503, 0)])).toEqual([]);
  });

  it("monta o pedido à API com cache no system, saída estruturada e histórico que começa e termina no contato", () => {
    const [saida] = rodar(agente, "Montar pedido", [{ data: "# V2O5 Vendas e Tecnologia\nPlano Presença a partir de R$ 8.900." }], {
      Configuração: cfg,
      Contato: { payload: { name: "Marina", custom_attributes: { empresa: "Auto Center Ribeiro", entrada: "formulário do diagnóstico" } } },
      "Mensagens da conversa": {
        payload: [msg(504, 0, "quanto custa?"), msg(501, 1, "Olá, Marina! Recebemos seu pedido."), msg(502, 0, "oi"), msg(503, 0, "tudo bem?"), { id: 500, message_type: 2, content: "Conversa atribuída" }, { ...msg(505, 1, "nota"), private: true }],
      },
    });
    const corpo = saida.json.corpo as {
      model: string;
      fallbacks: string;
      output_config: { effort: string; format: { type: string; schema: { required: string[]; additionalProperties: boolean } } };
      system: { text: string; cache_control?: { type: string } }[];
      messages: { role: string; content: string }[];
    };
    expect(corpo.model).toBe("claude-opus-5-5");
    expect(corpo.fallbacks).toBe("default");
    expect(corpo.output_config.effort).toBe("low");
    expect(corpo.output_config.format.type).toBe("json_schema");
    expect(corpo.output_config.format.schema.required).toEqual(["resposta", "passar_para_humano", "nota_para_equipe"]);
    expect(corpo.output_config.format.schema.additionalProperties).toBe(false);
    expect(corpo.system[0].cache_control).toEqual({ type: "ephemeral" });
    expect(corpo.system[0].text).toContain("Plano Presença a partir de R$ 8.900.");
    expect(corpo.system[1].cache_control).toBeUndefined();
    expect(corpo.system[1].text).toContain("Empresa: Auto Center Ribeiro");
    expect(corpo.messages.map((m) => m.role)).toEqual(["user", "assistant", "user"]);
    expect(corpo.messages[2].content).toBe("oi\ntudo bem?\nquanto custa?");
  });

  it("as instruções do agente seguem as regras do texto público e levam ao diagnóstico", () => {
    const instrucoes = js(agente, "Montar pedido");
    expect(instrucoes).not.toMatch(/[—–]/);
    for (const trecho of ["45 minutos", "24 horas", "a partir de", "Não invente número"]) expect(instrucoes).toContain(trecho);
    expect(campo(agente, "conhecimentoUrl")).toBe("https://v2o5.vercel.app/llms.txt");
  });

  it("recusa, erro ou JSON fora do formato passam para a equipe sem mandar nada ao contato", () => {
    const ler = (r: unknown) => rodar(agente, "Ler resposta", [r])[0].json;
    expect(ler({ stop_reason: "refusal", content: [] })).toMatchObject({ resposta: "", passar: true });
    expect(ler({ error: { message: "overloaded" } })).toMatchObject({ resposta: "", passar: true });
    expect(ler({ stop_reason: "end_turn", content: [{ type: "text", text: "não é JSON" }] })).toMatchObject({ resposta: "", passar: true });
    const certo = ler({
      stop_reason: "end_turn",
      content: [{ type: "text", text: JSON.stringify({ resposta: "Oi, Marina — tudo certo!", passar_para_humano: false, nota_para_equipe: "" }) }],
    });
    expect(certo).toEqual({ resposta: "Oi, Marina, tudo certo!", passar: false, nota: "" });
  });

  it("responde e passa a conversa com o token do bot; lê com o token do perfil; chama a IA com a credencial própria", () => {
    for (const nome of ["Enviar resposta", "Nota para a equipe", "Passar para a equipe"]) {
      expect(no(agente, nome).credentials?.httpHeaderAuth.name, nome).toBe("Chatwoot · agent bot");
    }
    for (const nome of ["Conversa", "Contato", "Mensagens da conversa"]) {
      expect(no(agente, nome).credentials?.httpHeaderAuth.name, nome).toBe("Chatwoot · api_access_token");
    }
    const claude = no(agente, "Claude");
    expect(claude.credentials?.httpHeaderAuth.name).toBe("Anthropic · x-api-key");
    expect(claude.parameters.url).toBe("https://api.anthropic.com/v1/messages");
    expect(JSON.stringify(claude.parameters.headerParameters)).toContain("server-side-fallback-2026-07-01");
    expect(no(agente, "Passar para a equipe").parameters.jsonBody).toContain("status: 'open'");
    expect(no(agente, "Evento do bot").parameters).toMatchObject({ httpMethod: "POST", path: "v2o5-agente" });
  });
});
