import { NextResponse, type NextRequest } from "next/server";

import { ehApex, ehAmbienteDeTrabalho, ehPreview, ehWww, hosts, siteNoAr } from "@/lib/hosts";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const url = request.nextUrl;

  /*
   * Quando o site vai ao ar, o preview deixa de existir: 301 para a raiz,
   * e essa regra vem ANTES de qualquer outra. Se ficasse depois, o /admin
   * continuaria vivo no endereço antigo.
   */
  if (siteNoAr() && ehPreview(host)) {
    return NextResponse.redirect(
      new URL(url.pathname + url.search, `https://${hosts.apex}`),
      301,
    );
  }

  // um site, um endereço
  if (ehWww(host)) {
    return NextResponse.redirect(
      new URL(url.pathname + url.search, `https://${hosts.apex}`),
      301,
    );
  }

  /*
   * O cardápio com preços fica fora do Google em qualquer endereço, a
   * pedido do cliente. O robots continua deixando rastrear — é assim que
   * o buscador lê este cabeçalho e tira a página do índice.
   */
  if (url.pathname.startsWith("/cardapio")) {
    const r = NextResponse.next();
    r.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
    return r;
  }

  // o preview serve o site, mas nunca entra em buscador
  if (ehPreview(host)) {
    const r = NextResponse.next();
    r.headers.set("x-robots-tag", "noindex, nofollow");
    return r;
  }

  // antes da aprovação, a raiz mostra a página de espera
  if (ehApex(host) && !siteNoAr()) {
    if (url.pathname === "/em-construcao") return NextResponse.next();
    const r = NextResponse.rewrite(new URL("/em-construcao", request.url));
    r.headers.set("x-robots-tag", "noindex, nofollow");
    return r;
  }

  /*
   * localhost e *.vercel.app servem o site completo, para dar para revisar
   * — mas as URLs de deploy também levam noindex. Elas são públicas até
   * alguém ligar a Deployment Protection, e não podem virar uma cópia do
   * site competindo no Google com o domínio de verdade.
   */
  if (ehAmbienteDeTrabalho(host)) {
    const r = NextResponse.next();
    r.headers.set("x-robots-tag", "noindex, nofollow");
    return r;
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Fora do proxy: arquivos do Next, ícones, a imagem de compartilhamento e
   * o robots. Sem isso o preview do WhatsApp fica sem imagem, a aba sem
   * ícone, e o robots.txt vira a página de espera em HTML — o rastreador
   * receberia HTML no lugar das regras.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|robots.txt|sitemap.xml|brand/|video/|fotos/).*)",
  ],
};
