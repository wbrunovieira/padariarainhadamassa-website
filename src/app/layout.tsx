import type { Metadata } from "next";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        {children}
      </body>
    </html>
  );
}
