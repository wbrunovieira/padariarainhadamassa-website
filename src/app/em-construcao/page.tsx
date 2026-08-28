import type { Metadata } from "next";

import { CoroaSvg } from "@/components/coroa-svg";
import { OpenNow } from "@/components/open-now";
import { fullAddress, googleMapsUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — em breve`,
  description: `Padaria e confeitaria em ${site.city}/${site.state} desde ${site.since}.`,
  robots: { index: false, follow: false },
};

/** Página de espera na raiz até o cliente aprovar o site. */
export default function EmConstrucao() {
  return (
    <div className="grain relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream-light via-cream to-cream-deep/60 px-5 py-16 text-center">
      <CoroaSvg className="h-14 w-auto text-espresso" />

      <p className="eyebrow mt-8 text-gold">
        {site.city} — {site.state} · desde {site.since}
      </p>

      <h1 className="mt-5 font-display text-5xl italic leading-[0.98] text-ink sm:text-6xl">
        {site.shortName}
      </h1>

      <p className="mt-7 max-w-md text-lg leading-relaxed text-espresso-soft">
        Nosso site está sendo preparado. Enquanto isso, a padaria continua
        aberta todos os dias — e o balcão não espera ninguém.
      </p>

      <p className="mt-6">
        <OpenNow className="text-base text-espresso" />
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={site.phoneHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-espresso px-7 text-cream transition-colors duration-300 hover:bg-ink"
        >
          <span className="eyebrow">Ligar {site.phone}</span>
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-espresso/25 px-7 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
        >
          <span className="eyebrow">Como chegar</span>
        </a>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 text-sm text-espresso-soft">
        <p>{fullAddress}</p>
        <p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            {site.instagramHandle}
          </a>
          {" · "}
          {site.delivery.map((app, i) => (
            <span key={app.nome}>
              {i > 0 && " e "}
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
              >
                {app.nome}
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
