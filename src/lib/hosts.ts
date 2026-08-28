/**
 * Roteamento por hostname.
 *
 * Enquanto o cliente não aprova, a raiz mostra "em construção" e o site
 * de verdade fica no subdomínio de preview, fora do índice. A virada é
 * `SITE_LIVE=true` no ambiente — virar e voltar leva segundos, sem deploy
 * de código.
 */
export const hosts = {
  apex: process.env.SITE_HOST ?? "padariarainhadamassa.com.br",
  preview: process.env.PREVIEW_HOST ?? "preview.padariarainhadamassa.com.br",
} as const;

export const siteNoAr = () => process.env.SITE_LIVE === "true";

/** Descarta porta e www, para comparar hostname com hostname. */
export function normalizar(host: string | null) {
  return (host ?? "").toLowerCase().split(":")[0];
}

export const ehPreview = (host: string | null) => normalizar(host) === hosts.preview;
export const ehWww = (host: string | null) => normalizar(host) === `www.${hosts.apex}`;
export const ehApex = (host: string | null) => normalizar(host) === hosts.apex;

/** Local e *.vercel.app seguem servindo o site direto, sem "em construção". */
export function ehAmbienteDeTrabalho(host: string | null) {
  const h = normalizar(host);
  return h === "localhost" || h.endsWith(".vercel.app") || h.startsWith("127.0.0.1");
}
