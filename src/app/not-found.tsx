import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { navigationCompleta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="grain relative flex flex-1 items-center overflow-hidden bg-gradient-to-b from-cream-light via-cream to-cream-deep/50">
        <Image
          src="/brand/logo-rainha-da-massa.png"
          alt=""
          width={900}
          height={897}
          quality={40}
          sizes="(min-width: 1024px) 40rem, 1px"
          className="pointer-events-none absolute -right-32 top-1/2 hidden w-[40rem] -translate-y-1/2 opacity-[0.07] lg:block"
        />

        <div className="relative mx-auto w-full max-w-[88rem] px-5 pb-24 pt-[calc(var(--header-h)+4rem)] lg:px-10">
          <p className="eyebrow flex items-center gap-2.5 text-gold">
            <Image
              src="/brand/ornamento-coroa.png"
              alt=""
              width={480}
              height={199}
              className="h-3 w-auto opacity-80"
            />
            Erro 404
          </p>

          <h1 className="mt-7 max-w-3xl font-display tracking-tight text-espresso">
            <span className="block text-3xl leading-tight text-espresso-soft sm:text-4xl">
              Essa página
            </span>
            <span className="mt-1 block text-5xl italic leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              saiu do cardápio.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-espresso-soft">
            O endereço que você abriu não existe mais — ou nunca existiu. O pão,
            esse continua no balcão, das 6h às 22h.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow">Voltar para o início</span>
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-4 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
            >
              <span className="eyebrow">Ligar {site.phone}</span>
            </a>
          </div>

          <nav aria-label="Atalhos" className="mt-14">
            <p className="eyebrow text-espresso-soft/60">Talvez você procurasse</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {navigationCompleta.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="inline-flex rounded-full border border-espresso/20 px-4 py-2 text-sm tracking-wide text-espresso-soft transition-colors duration-300 hover:border-gold hover:text-espresso"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
