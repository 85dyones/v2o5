"use client";

import { useState } from "react";
import DiagramaVisao from "./DiagramaVisao";
import type { IdDaPeca } from "@/conteudo/home";

/**
 * Clique (ou Enter) numa estação escolhe a peça: o caminho dela acende, as
 * outras apagam para 30% (200 ms, CSS) e o painel troca o texto. Passar o
 * mouse mostra o caminho da estação sem escolher. Nada corre sozinho.
 */
export default function DiagramaInterativo() {
  const [selecionada, setSelecionada] = useState<IdDaPeca>("site");
  const [foco, setFoco] = useState<IdDaPeca | null>(null);
  return <DiagramaVisao selecionada={selecionada} foco={foco} aoEscolher={setSelecionada} aoFocar={setFoco} />;
}
