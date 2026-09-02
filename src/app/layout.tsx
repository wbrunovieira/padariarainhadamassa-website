import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bodoni_Moda, Jost } from "next/font/google";

import { deliveryTexto, site } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Almoço e padaria em ${site.city}`,
    template: `%s · ${site.shortName}`,
  },
  description: `Almoço em ${site.city}/${site.state}: prato feito bem servido, com prato do dia de segunda a sábado. Padaria e confeitaria desde ${site.since}, na ${site.street}. Aberta todos os dias, ${site.hoursShort}, com delivery no ${deliveryTexto}.`,
  metadataBase: new URL("https://padariarainhadamassa.com.br"),
  openGraph: {
    title: `${site.name} — Almoço e padaria em ${site.city}`,
    description: `Almoço, padaria e confeitaria em ${site.city}/${site.state}. ${site.street}, aberta todos os dias.`,
    url: "/",
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
    // A imagem vem de src/app/opengraph-image.jpg pela convenção de arquivo
    // do Next — não precisa ser listada aqui.
  },
  twitter: {
    // sem isso o cartão sai pequeno, com a imagem em miniatura ao lado
    card: "summary_large_image",
    title: `${site.name} — Almoço e padaria em ${site.city}`,
    description: `Almoço, padaria e confeitaria no Centro de ${site.city}.`,
  },
  alternates: { canonical: "/" },
  /*
   * Preenchido por variável de ambiente, não no código: assim dá para
   * verificar o site no Search Console e no Bing colando o código no painel
   * da Vercel, sem commit nem deploy de código.
   *
   * Se a verificação for por DNS (TXT na Cloudflare), estas ficam vazias —
   * DNS vale para o domínio inteiro e sobrevive a qualquer mudança no site.
   */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
};

/*
 * Analytics da Vercel em vez do Google Analytics de propósito: os dois não
 * usam cookie, então o site não precisa de banner de consentimento — o que,
 * sob a LGPD, seria obrigatório com o GA4. Numa padaria de bairro, banner é
 * atrito para ver o cardápio.
 *
 * O Speed Insights é o que mais importa agora: ele mede Core Web Vitals de
 * usuário real. Todo número da auditoria de 02/09/2026 é de laboratório —
 * o que o Google usa para ranquear é o de campo, e ainda não temos nenhum.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
