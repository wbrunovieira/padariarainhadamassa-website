import Image from "next/image";

import { AboutSection } from "@/components/about-section";
import { LocationSection } from "@/components/location-section";
import { fullAddress, navigation, site } from "@/lib/site";

// Sem aggregateRating de propósito: a nota é do Google, e o Google não
// aceita avaliação de terceiros no schema do próprio site.
const schema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  legalName: site.legalName,
  image: "https://padariarainhadamassa.com.br/brand/logo-rainha-da-massa.png",
  telephone: "+552433022752",
  priceRange: "R$",
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.state,
    postalCode: site.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "22:00",
    },
  ],
  sameAs: [site.instagram],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-cream-light via-cream to-cream-deep/70">
        <Image
          src="/brand/logo-rainha-da-massa.png"
          alt=""
          width={900}
          height={897}
          quality={40}
          sizes="(min-width: 1024px) 46rem, 1px"
          className="pointer-events-none absolute -right-24 top-1/2 hidden w-[46rem] max-w-none -translate-y-1/2 opacity-[0.07] lg:block lg:-right-10"
        />

        <div className="relative mx-auto w-full max-w-[88rem] px-5 pb-24 pt-[calc(var(--header-h)+5rem)] lg:px-10">
          <p className="eyebrow text-espresso-soft">
            {site.city} — {site.state} · Desde {site.since}
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-espresso sm:text-6xl lg:text-7xl xl:text-8xl">
            Padaria e confeitaria
            <span className="block italic text-ink">
              em Petrópolis há mais de vinte anos.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-espresso-soft">
            {site.rating.value.toString().replace(".", ",")} estrelas com{" "}
            {site.rating.count} avaliações no {site.rating.source}. Aberto todos os
            dias, {site.hoursShort}. Encomendas pelo telefone e delivery no{" "}
            {site.delivery}.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={site.phoneHref}
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow">Ligar {site.phone}</span>
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-4 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
            >
              <span className="eyebrow">{site.instagramHandle}</span>
            </a>
          </div>

          <p className="mt-10 text-sm tracking-wide text-espresso-soft/80">
            {fullAddress}
          </p>
        </div>
      </section>

      <AboutSection />

      {/* Ainda sem conteúdo — dependem do cardápio real da padaria */}
      {navigation.slice(1, 4).map((item) => (
        <section
          key={item.href}
          id={item.href.replace("#", "")}
          className="border-t border-espresso/10"
        >
          <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-32 lg:px-10">
            <p className="eyebrow text-gold">{item.hint}</p>
            <h2 className="font-display text-4xl italic text-espresso sm:text-5xl">
              {item.label}
            </h2>
            <p className="mt-2 max-w-md text-espresso-soft">Em breve.</p>
          </div>
        </section>
      ))}

      <LocationSection />
    </>
  );
}
