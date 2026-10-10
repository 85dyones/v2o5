"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import Icone from "@/components/Icone";
import { DIAGNOSTICO, ESTOQUES, OBJETIVOS, PORTES, SEGMENTOS, SISTEMAS } from "@/conteudo/diagnostico";
import { validarLead, type Lead } from "@/lib/leads";
import { origemDaVisita } from "@/lib/origem";

type Erros = Partial<Record<keyof Lead, string>>;

function Campo({
  id,
  rotulo,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="rotulo-do-campo">
        {rotulo}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className="mt-1.5 text-sm text-[rgb(255_150_130)]">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

/**
 * O pedido de diagnóstico. Valida no navegador com as mesmas regras da API
 * (`lib/leads.ts`), manda a origem da visita junto e, no sucesso, vai para
 * `/diagnostico/recebido`. O campo `site` é a armadilha para robôs: fica
 * escondido e tem de ir vazio.
 */
export default function Formulario() {
  const f = DIAGNOSTICO.formulario;
  const id = useId();
  const router = useRouter();
  const [segmento, setSegmento] = useState("");
  const [objetivos, setObjetivos] = useState<string[]>([]);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"parado" | "enviando" | "erro" | "canal">("parado");

  const campo = (nome: string) => `${id}-${nome}`;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries()) as Record<string, unknown>;
    dados.objetivos = objetivos;
    dados.origem = origemDaVisita();
    dados.pagina = location.pathname;

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
    <form onSubmit={enviar} noValidate className="grid gap-5" aria-labelledby={campo("titulo")}>
      <h2 id={campo("titulo")} className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
        {f.titulo}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      {segmento === "automotivo" ? (
        <div className="grid gap-5 rounded-2xl bg-vidro p-4 contorno sm:grid-cols-2">
          <Campo id={campo("estoque")} rotulo="Tamanho do estoque">
            <select id={campo("estoque")} name="estoque" className="campo" defaultValue="">
              <option value="">Escolha</option>
              {ESTOQUES.map((e) => (
                <option key={e.valor} value={e.valor}>
                  {e.rotulo}
                </option>
              ))}
            </select>
          </Campo>
          <Campo id={campo("sistema")} rotulo="Sistema de gestão da loja">
            <select id={campo("sistema")} name="sistema" className="campo" defaultValue="">
              <option value="">Escolha</option>
              {SISTEMAS.map((s) => (
                <option key={s.valor} value={s.valor}>
                  {s.rotulo}
                </option>
              ))}
            </select>
          </Campo>
        </div>
      ) : null}

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
              {objetivos.includes(o.valor) ? <Icone nome="check" className="size-3.5 text-ambar" /> : null}
              {o.rotulo}
            </label>
          ))}
        </div>
        {erros.objetivos ? <p className="mt-1.5 text-sm text-[rgb(255_150_130)]">{erros.objetivos}</p> : null}
      </fieldset>

      <Campo id={campo("mensagem")} rotulo="Algo mais que a gente deva saber (opcional)">
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
        <p role="alert" className="rounded-xl bg-[rgb(255_120_100/0.1)] px-4 py-3 text-sm contorno">
          {estado === "canal" ? f.erroCanal : f.erroGeral}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="botao botao-primario" disabled={estado === "enviando"}>
          {estado === "enviando" ? f.enviando : f.enviar}
          <Icone nome="seta" className="seta size-4" />
        </button>
        <p className="text-sm leading-snug text-secundario">
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
