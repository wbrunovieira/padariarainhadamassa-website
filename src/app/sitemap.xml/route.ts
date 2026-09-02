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
/*
 * Data real da última mudança de conteúdo. É constante de propósito.
 *
 * Antes isto era `new Date()`, ou seja: o sitemap dizia "mudou hoje" TODO
 * DIA, para sempre. O Google trata lastmod que nunca envelhece como sinal
 * não confiável e passa a ignorar o campo — o oposto do que se quer.
 *
 * Ao mudar o conteúdo da home de verdade, atualize aqui.
 */
const ATUALIZADO_EM = "2026-09-02";

const paginas = [{ caminho: "/", prioridade: "1.0", frequencia: "weekly" }];

export async function GET() {
  const urls = siteNoAr()
    ? paginas
        .map(
          (p) => `  <url>
    <loc>https://${hosts.apex}${p.caminho}</loc>
    <lastmod>${ATUALIZADO_EM}</lastmod>
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
      /*
       * Cacheia na borda. Sem isso toda busca do Googlebot acordava uma
       * função: a leitura dele mediu 1,55s contra 0,32s já quente, e é
       * exatamente nesse cold start que uma leitura pode falhar. O sitemap
       * não varia por host, então cachear é seguro; o deploy limpa a borda.
       */
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
