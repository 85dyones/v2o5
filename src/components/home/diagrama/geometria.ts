import type { IdDaPeca } from "@/conteudo/home";

/**
 * Posições das peças e traçado das ligações, em dois arranjos: horizontal
 * (do `md` para cima) e vertical (celular, onde o horizontal ficaria com
 * letra de 6 px). As chaves das ligações seguem `LIGACOES_DO_DIAGRAMA`.
 */
export interface Arranjo {
  viewBox: string;
  raio: number;
  /** Corpo do rótulo, em unidades do viewBox (~15 px na largura comum). */
  fonte: number;
  nos: Record<IdDaPeca, { x: number; y: number; rotulo: "abaixo" | "direita" }>;
  ligacoes: Record<string, string>;
}

export const HORIZONTAL: Arranjo = {
  viewBox: "0 0 1000 410",
  raio: 28,
  fonte: 21,
  nos: {
    site: { x: 80, y: 160, rotulo: "abaixo" },
    whatsapp: { x: 280, y: 160, rotulo: "abaixo" },
    agente: { x: 480, y: 160, rotulo: "abaixo" },
    n8n: { x: 600, y: 52, rotulo: "direita" },
    crm: { x: 720, y: 160, rotulo: "abaixo" },
    venda: { x: 920, y: 160, rotulo: "abaixo" },
    rastreamento: { x: 480, y: 320, rotulo: "abaixo" },
  },
  ligacoes: {
    "site-whatsapp": "M80 160 L280 160",
    "whatsapp-agente": "M280 160 L480 160",
    "agente-crm": "M480 160 L720 160",
    "agente-n8n": "M480 160 C524 160 548 52 600 52",
    "n8n-crm": "M600 52 C652 52 676 160 720 160",
    "crm-venda": "M720 160 L920 160",
    "site-rastreamento": "M80 160 C80 280 300 320 480 320",
    "rastreamento-crm": "M480 320 C590 320 720 280 720 160",
    "venda-rastreamento": "M920 160 C920 330 700 372 480 320",
  },
};

export const VERTICAL: Arranjo = {
  viewBox: "0 0 340 590",
  raio: 22,
  fonte: 17,
  nos: {
    site: { x: 170, y: 40, rotulo: "direita" },
    whatsapp: { x: 170, y: 150, rotulo: "direita" },
    agente: { x: 170, y: 260, rotulo: "direita" },
    n8n: { x: 282, y: 330, rotulo: "abaixo" },
    crm: { x: 170, y: 400, rotulo: "direita" },
    venda: { x: 170, y: 530, rotulo: "direita" },
    rastreamento: { x: 72, y: 470, rotulo: "abaixo" },
  },
  ligacoes: {
    "site-whatsapp": "M170 40 L170 150",
    "whatsapp-agente": "M170 150 L170 260",
    "agente-crm": "M170 260 L170 400",
    "agente-n8n": "M170 260 C232 260 282 286 282 330",
    "n8n-crm": "M282 330 C282 376 232 400 170 400",
    "crm-venda": "M170 400 L170 530",
    "site-rastreamento": "M170 40 C86 40 72 160 72 470",
    "rastreamento-crm": "M72 470 C72 430 116 400 170 400",
    "venda-rastreamento": "M170 530 C116 530 72 512 72 470",
  },
};

/** A ligação entre duas peças e se o caminho a percorre ao contrário. */
export function ligacaoEntre(a: IdDaPeca, b: IdDaPeca): { chave: string; invertida: boolean } | null {
  if (`${a}-${b}` in HORIZONTAL.ligacoes) return { chave: `${a}-${b}`, invertida: false };
  if (`${b}-${a}` in HORIZONTAL.ligacoes) return { chave: `${b}-${a}`, invertida: true };
  return null;
}
