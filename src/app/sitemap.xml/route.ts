import { hosts, siteNoAr } from "@/lib/hosts";

export const dynamic = "force-dynamic";

/**
 * Sitemap.
 *
 * Enquanto o site não está no ar, devolve um sitemap vazio em vez de 404:
 * o robots.txt já anuncia esta URL, e um 404 vira erro registrado no
 * Search Console logo na estreia.
 *
 * /cardapio fica de fora de propósito — a cliente não quer os preços na
 * busca, e a página leva noindex. /admin também não entra.
 */
const paginas = [{ caminho: "/", prioridade: "1.0", frequencia: "weekly" }];

export async function GET() {
  const agora = new Date().toISOString().slice(0, 10);
  const urls = siteNoAr()
    ? paginas
        .map(
          (p) => `  <url>
    <loc>https://${hosts.apex}${p.caminho}</loc>
    <lastmod>${agora}</lastmod>
    <changefreq>${p.frequencia}</changefreq>
    <priority>${p.prioridade}</priority>
  </url>`,
        )
        .join("\n")
    : "";

  const corpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(corpo, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
