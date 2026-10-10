import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Um grupo só, para todos os robôs, inclusive os de IA (GPTBot, OAI-SearchBot,
 * ClaudeBot, PerplexityBot, Google-Extended). Lição da Motors: o robô obedece
 * só ao grupo mais específico que casa com ele, então um grupo próprio para
 * IA abria o que o geral fechava. `tests/robots.test.ts` trava o grupo único.
 */
export const FORA_DO_RASTREIO = ["/api/", "/diagnostico/recebido"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: FORA_DO_RASTREIO }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
