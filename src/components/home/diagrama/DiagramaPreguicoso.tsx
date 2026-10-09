"use client";

import type { ReactNode } from "react";
import { useCarregarPerto } from "@/lib/useCarregarPerto";

const importar = () => import("./DiagramaInterativo");

/** Mostra o SVG do servidor até a versão interativa chegar, perto da tela. */
export default function DiagramaPreguicoso({ children }: { children: ReactNode }) {
  const { ref, Componente, chegouForaDaTela } = useCarregarPerto(importar);
  return <div ref={ref}>{Componente ? <Componente comecarZerado={chegouForaDaTela} /> : children}</div>;
}
