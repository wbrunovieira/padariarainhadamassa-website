import { foraDoIndice, hosts } from "@/lib/hosts";

export const dynamic = "force-dynamic";

/**
 * O robots depende do endereço: o preview e a raiz em construção ficam
 * fechados, para o Google não indexar duas cópias e dividir a autoridade
 * entre o endereço provisório e o definitivo.
 */
export async function GET(request: Request) {
  const host = request.headers.get("host");
  const fechado = foraDoIndice(host);

  const corpo = fechado
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin",
        "Disallow: /api/",
        "",
        `Sitemap: https://${hosts.apex}/sitemap.xml`,
        "",
      ].join("\n");

  return new Response(corpo, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
