"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import Icone from "@/components/Icone";
import { Parada } from "@/components/rota/Rota";
import { DIAGNOSTICO, ESTOQUES, OBJETIVOS, PORTES, SEGMENTOS, SISTEMAS } from "@/conteudo/diagnostico";
import { validarLead, type Lead } from "@/lib/leads";
import { formularioIniciado, identificadoresDaMeta, leadGerado, medicaoDesligada } from "@/lib/medicao";
import { origemDaVisita } from "@/lib/origem";

type Erros = Partial<Record<keyof Lead, string>>;

/**
 * Célula da ficha. O formulário é uma grade com 1 px de vão sobre o fio
 * (`bg-linha`): cada célula pinta o papel e o vão vira o fio entre elas,
 * mesmo quando os campos da revenda entram ou saem.
 */
const CELULA = "bg-fundo p-6";

function Campo({
  id,
  rotulo,
  erro,
  largo = false,
  className = "",
  children,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  largo?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${CELULA} ${largo ? "sm:col-span-2" : ""} ${className}`}>
      <label htmlFor={id} className="rotulo-do-campo">
        {rotulo}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className="mt-1.5 text-sm text-erro">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

const FORM_ID = "diagnostico";

/**
 * O pedido de diagnóstico, numa ficha em células. Valida no navegador com as
 * mesmas regras da API (`lib/leads.ts`), manda a origem da visita junto e,
 * no sucesso, vai para `/diagnostico/recebido`. O campo `site` é a
 * armadilha para robôs: fica escondido e tem de ir vazio.
 *
 * Medição (`lib/medicao.ts`): `form_start` no primeiro campo tocado e
 * `generate_lead` com o `event_id` que a API devolveu, o mesmo que ela
 * manda à Meta pelo servidor. Com a medição desligada em `/privacidade`, o
 * envio avisa a API para não mandar nada à Meta.
 *
 * Na rota: parada no título e a parada final, âmbar, no botão de envio. As
 * duas ficam na margem porque a ficha começa na primeira coluna da grade.
 */
export default function Formulario() {
  const f = DIAGNOSTICO.formulario;
  const id = useId();
  const router = useRouter();
  const [segmento, setSegmento] = useState("");
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"parado" | "enviando" | "erro" | "canal">("parado");
  const [iniciado, setIniciado] = useState(false);

  const campo = (nome: string) => `${id}-${nome}`;

  const aoTocar = () => {
    if (iniciado) return;
    setIniciado(true);
    formularioIniciado(FORM_ID);
  };

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries()) as Record<string, unknown>;
    dados.objetivos = objetivos;
    const desligada = medicaoDesligada();
    dados.origem = desligada ? origemDaVisita() : { ...origemDaVisita(), ...identificadoresDaMeta() };
    dados.pagina = location.pathname;
    if (desligada) dados.medicao = "desligada";

    const validacao = validarLead(dados);
    if (!validacao.ok) {
      setErros(validacao.erros);
      const primeiro = Object.keys(validacao.erros)[0];
      form.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    setErros({});
    setEstado("enviando");
    try {
      const resposta = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, site: dados.site ?? "" }),
      });
      if (resposta.ok) {
        const { event_id } = (await resposta.json().catch(() => ({}))) as { event_id?: string };
        if (event_id) leadGerado({ event_id, form_id: FORM_ID, lead_type: "diagnostico", segmento: validacao.lead.segmento });
        router.push("/diagnostico/recebido");
        return;
      }
      const corpo = (await resposta.json().catch(() => ({}))) as { erros?: Erros; erro?: string };
      if (corpo.erros) setErros(corpo.erros);
      setEstado(corpo.erro === "canal" ? "canal" : "erro");
    } catch {
      setEstado("erro");
    }
  }

  const alternarObjetivo = (valor: string) =>
    setObjetivos((atual) => (atual.includes(valor) ? atual.filter((v) => v !== valor) : [...atual, valor]));

  return (
    <form
      onSubmit={enviar}
      onInput={aoTocar}
      onChange={aoTocar}
      noValidate
      className="relative grid gap-px bg-linha sm:grid-cols-2"
      aria-labelledby="titulo-pedido"
    >
      {/* A parada desce 1,75rem para ficar no meio da primeira linha do título. */}
      <div className={`${CELULA} relative sm:col-span-2 [&>.parada]:top-7`}>
        <Parada />
        <h2 id="titulo-pedido" className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
          {f.titulo}
        </h2>
      </div>

      <Campo id={campo("nome")} rotulo="Seu nome" erro={erros.nome}>
        <input
          id={campo("nome")}
          name="nome"
          type="text"
          autoComplete="name"
          required
          className="campo"
          aria-invalid={!!erros.nome}
          aria-describedby={erros.nome ? `${campo("nome")}-erro` : undefined}
        />
      </Campo>
      <Campo id={campo("empresa")} rotulo="Empresa" erro={erros.empresa}>
        <input
          id={campo("empresa")}
          name="empresa"
          type="text"
          autoComplete="organization"
          required
          className="campo"
          aria-invalid={!!erros.empresa}
          aria-describedby={erros.empresa ? `${campo("empresa")}-erro` : undefined}
        />
      </Campo>
      <Campo id={campo("whatsapp")} rotulo="WhatsApp com DDD" erro={erros.whatsapp}>
        <input
          id={campo("whatsapp")}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(41) 99999-9999"
          required
          className="campo"
          aria-invalid={!!erros.whatsapp}
          aria-describedby={erros.whatsapp ? `${campo("whatsapp")}-erro` : undefined}
        />
      </Campo>
      <Campo id={campo("email")} rotulo="E-mail" erro={erros.email}>
        <input
          id={campo("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className="campo"
          aria-invalid={!!erros.email}
          aria-describedby={erros.email ? `${campo("email")}-erro` : undefined}
        />
      </Campo>
      <Campo id={campo("segmento")} rotulo="Segmento" erro={erros.segmento}>
        <select
          id={campo("segmento")}
          name="segmento"
          required
          className="campo"
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          aria-invalid={!!erros.segmento}
          aria-describedby={erros.segmento ? `${campo("segmento")}-erro` : undefined}
        >
          <option value="">Escolha</option>
          {SEGMENTOS.map((s) => (
            <option key={s.valor} value={s.valor}>
              {s.rotulo}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id={campo("porte")} rotulo="Quantas pessoas trabalham na empresa">
        <select id={campo("porte")} name="porte" className="campo" defaultValue="">
          <option value="">Prefiro não dizer</option>
          {PORTES.map((p) => (
            <option key={p.valor} value={p.valor}>
              {p.rotulo}
            </option>
          ))}
        </select>
      </Campo>

      {/* Só para revenda: duas células no tom do cartão, logo abaixo do segmento. */}
      {segmento === "automotivo" ? (
        <>
          <Campo id={campo("estoque")} rotulo="Tamanho do estoque" className="!bg-fundo-cartao">
            <select id={campo("estoque")} name="estoque" className="campo" defaultValue="">
              <option value="">Escolha</option>
              {ESTOQUES.map((e) => (
                <option key={e.valor} value={e.valor}>
                  {e.rotulo}
                </option>
              ))}
            </select>
          </Campo>
          <Campo id={campo("sistema")} rotulo="Sistema de gestão da loja" className="!bg-fundo-cartao">
            <select id={campo("sistema")} name="sistema" className="campo" defaultValue="">
              <option value="">Escolha</option>
              {SISTEMAS.map((s) => (
                <option key={s.valor} value={s.valor}>
                  {s.rotulo}
                </option>
              ))}
            </select>
          </Campo>
        </>
      ) : null}

      <div className={`${CELULA} sm:col-span-2`}>
        <fieldset>
          <legend className="rotulo-do-campo">O que você quer resolver primeiro</legend>
          <div className="flex flex-wrap gap-2">
            {OBJETIVOS.map((o) => (
              <label key={o.valor} className="opcao">
                <input
                  type="checkbox"
                  name="objetivo"
                  value={o.valor}
                  checked={objetivos.includes(o.valor)}
                  onChange={() => alternarObjetivo(o.valor)}
                />
                {objetivos.includes(o.valor) ? <Icone nome="check" className="size-3.5 text-acao-texto" /> : null}
                {o.rotulo}
              </label>
            ))}
          </div>
          {erros.objetivos ? <p className="mt-1.5 text-sm text-erro">{erros.objetivos}</p> : null}
        </fieldset>
      </div>

      <Campo id={campo("mensagem")} rotulo="Algo mais que a gente deva saber (opcional)" largo>
        <textarea id={campo("mensagem")} name="mensagem" className="campo" maxLength={1500} rows={3} />
      </Campo>

      {/* Armadilha para robôs: fora da tela e do tab; humano não preenche. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>
          Site
          <input type="text" name="site" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {estado === "erro" || estado === "canal" ? (
        <div className={`${CELULA} sm:col-span-2`}>
          <p role="alert" className="border-l-2 border-erro bg-erro/10 px-4 py-3 text-sm">
            {estado === "canal" ? f.erroCanal : f.erroGeral}
          </p>
        </div>
      ) : null}

      {/* A rota termina aqui: a parada final desce até o meio do botão (1,5rem de respiro + 0,6875rem). */}
      <div className={`${CELULA} relative flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-start [&>.parada]:top-[2.1875rem]`}>
        <Parada final />
        <button type="submit" className="botao botao-primario shrink-0 self-start disabled:cursor-wait" disabled={estado === "enviando"}>
          {estado === "enviando" ? f.enviando : f.enviar}
          <Icone nome="seta" className="seta size-4" />
        </button>
        <p className="text-sm leading-snug text-texto-secundario">
          {f.consentimento}{" "}
          <Link href="/privacidade" className="link-sublinhado">
            Como tratamos os dados
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
