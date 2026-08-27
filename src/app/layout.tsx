import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
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
    default: `${site.name} — Padaria e confeitaria em ${site.city}/${site.state}`,
    template: `%s · ${site.shortName}`,
  },
  description: `Padaria e confeitaria em ${site.city}/${site.state} desde ${site.since}. ${site.street}. Aberto todos os dias, ${site.hoursShort}. Encomendas pelo telefone ${site.phone} e delivery no ${site.delivery}.`,
  metadataBase: new URL("https://padariarainhadamassa.com.br"),
  openGraph: {
    title: `${site.name} — Padaria e confeitaria em ${site.city}/${site.state}`,
    description: `Padaria e confeitaria em ${site.city}/${site.state} desde ${site.since}. ${site.street}.`,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
