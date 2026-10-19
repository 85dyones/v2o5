"use client";

import { useState } from "react";
import Estacoes from "./Estacoes";
import type { IdDaPeca } from "@/conteudo/home";

/**
 * O mapa da abertura: passar o mouse numa estação apaga as que não estão no
 * caminho dela. O desenho da linha ao carregar é só CSS
 * (`.mapa-da-abertura`), que roda antes de este componente hidratar.
 */
export default function MapaDaAbertura() {
  const [foco, setFoco] = useState<IdDaPeca | null>(null);
  return <Estacoes rotulo="Como tudo se liga" foco={foco} aoFocar={setFoco} className="mapa-da-abertura" />;
}
