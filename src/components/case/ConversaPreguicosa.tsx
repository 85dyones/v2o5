"use client";

import type { ReactNode } from "react";
import type { Mensagem } from "./ConversaVisao";
import { useCarregarPerto } from "@/lib/useCarregarPerto";

const importar = () => import("./ConversaInterativa");

/** Mostra a conversa inteira, do servidor, até a versão animada chegar perto da tela. */
export default function ConversaPreguicosa({
  legenda,
  mensagens,
  children,
}: {
  legenda: string;
  mensagens: Mensagem[];
  children: ReactNode;
}) {
  const { ref, Componente, chegouForaDaTela } = useCarregarPerto(importar);
  return (
    <div ref={ref}>
      {Componente ? <Componente legenda={legenda} mensagens={mensagens} comecarZerado={chegouForaDaTela} /> : children}
    </div>
  );
}
