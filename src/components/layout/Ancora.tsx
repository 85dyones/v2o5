"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { corrigirPouso } from "@/lib/ancora";

/**
 * Confere o pouso das âncoras (`lib/ancora.ts`) na carga de uma URL com
 * fragmento, a cada troca de fragmento na mesma página e a cada rota nova
 * aberta com fragmento. Não desenha nada.
 */
export default function Ancora() {
  const pathname = usePathname();

  useEffect(() => corrigirPouso(), [pathname]);

  useEffect(() => {
    let cancelar = () => {};
    const aoMudar = () => {
      cancelar();
      cancelar = corrigirPouso();
    };
    window.addEventListener("hashchange", aoMudar);
    return () => {
      window.removeEventListener("hashchange", aoMudar);
      cancelar();
    };
  }, []);

  return null;
}
