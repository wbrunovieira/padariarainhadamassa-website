import Image from "next/image";

import WBSignature from "@/components/wb-signature";
import { OpenNow } from "@/components/open-now";
import { fullAddress, googleMapsUrl, navigationCompleta, site } from "@/lib/site";

export function SiteFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-gradient-to-b from-[#1b1310] via-ink to-[#120c0a] text-cream/85">
      <div className="relative mx-auto max-w-[88rem] px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/brand/logo-rainha-da-massa-cream.png"
                alt=""
                width={900}
                height={897}
                sizes="72px"
                className="size-[4.5rem] object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="eyebrow text-cream/50">Padaria</span>
                <span className="mt-2 font-display text-2xl italic text-cream">
                  {site.shortName}
                </span>
              </span>
            </div>

            <p className="mt-8 max-w-sm leading-relaxed text-cream/70">
              Padaria e confeitaria em {site.city}/{site.state} desde {site.since}.
              Café da manhã, almoço no salão, confeitaria e encomendas.
            </p>

            <p className="mt-6">
              <OpenNow className="text-sm text-cream/80" />
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="eyebrow text-cream/45">No site</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {navigationCompleta.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-cream/75 underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-300 hover:text-cream hover:decoration-wheat"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-cream/45">Contato</h2>
            <ul className="mt-6 flex flex-col gap-4 text-cream/75">
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-wheat/30 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {fullAddress}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="underline decoration-wheat/30 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.hours}</li>
              <li>
                <a
                  href={site.emailHref}
                  className="break-all underline decoration-wheat/30 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-wheat/30 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.instagramHandle}
                </a>
              </li>
              {site.delivery.map((app) => (
                <li key={app.nome}>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-wheat/30 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                  >
                    Pedir no {app.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-cream/45">
            © {ano} {site.legalName}
          </p>
          <WBSignature className="text-cream/70" />
        </div>
      </div>
    </footer>
  );
}
