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
    default: `${site.name} — Almoço e padaria em ${site.city}`,
    template: `%s · ${site.shortName}`,
  },
  description: `Almoço caseiro todo dia em ${site.city}/${site.state}: prato feito bem servido, com prato do dia de segunda a domingo. Padaria e confeitaria desde ${site.since}, na ${site.street}. Aberto das 6h às 22h, com delivery no ${site.delivery}.`,
  metadataBase: new URL("https://padariarainhadamassa.com.br"),
  openGraph: {
    title: `${site.name} — Almoço e padaria em ${site.city}`,
    description: `Almoço caseiro, padaria e confeitaria em ${site.city}/${site.state}. ${site.street}, aberto todos os dias.`,
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
