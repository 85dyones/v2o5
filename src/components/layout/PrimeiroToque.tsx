"use client";

import { useEffect } from "react";
import { guardarPrimeiroToque } from "@/lib/origem";

/** Guarda a origem da visita na primeira página (ver `lib/origem.ts`). */
export default function PrimeiroToque() {
  useEffect(() => {
    guardarPrimeiroToque();
  }, []);
  return null;
}
