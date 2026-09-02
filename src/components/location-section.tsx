"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { googleMapsUrl, mapEmbedUrl, site, wazeUrl } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LocationSection() {
  const reduce = useReducedMotion();
  const { caixaMapa, preparar, montar } = useMapaSobDemanda();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.7,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <section
      id="contato"
      className="grain relative overflow-hidden bg-gradient-to-b from-[#241a15] via-ink to-[#1b1310] text-cream"
    >
      <Image
        src="/brand/logo-rainha-da-massa-cream.png"
        alt=""
        width={900}
        height={897}
        quality={40}
        sizes="(min-width: 1024px) 34rem, 1px"
        className="pointer-events-none absolute -left-40 -top-32 hidden w-[34rem] max-w-none opacity-[0.05] lg:block"
      />

      <div className="relative mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <motion.p {...reveal()} className="eyebrow text-wheat">
              Onde estamos
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.street}
              <span className="block italic text-wheat/90">
                Centro — {`${site.city}, ${site.state}`}
              </span>
            </motion.h2>
          </div>

          <motion.dl
            {...reveal(0.12)}
            className="order-4 space-y-7 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <div className="border-t border-cream/15 pt-5">
              <dt className="eyebrow text-cream/50">Horário</dt>
              <dd className="mt-2 text-lg">{site.hours}</dd>
            </div>

            <div className="border-t border-cream/15 pt-5">
              <dt className="eyebrow text-cream/50">Telefone e encomendas</dt>
              <dd className="mt-2 text-lg">
                <a
                  href={site.phoneHref}
                  className="underline decoration-wheat/40 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.phone}
                </a>
              </dd>
            </div>

            <div className="border-t border-cream/15 pt-5">
              <dt className="eyebrow text-cream/50">E-mail</dt>
              <dd className="mt-2 break-all text-lg">
                <a
                  href={site.emailHref}
                  className="underline decoration-wheat/40 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div className="border-t border-cream/15 pt-5">
              <dt className="eyebrow text-cream/50">Instagram</dt>
              <dd className="mt-2 text-lg">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-wheat/40 decoration-1 underline-offset-4 transition-colors hover:decoration-wheat"
                >
                  {site.instagramHandle}
                </a>
              </dd>
            </div>

            <div className="border-t border-cream/15 pt-5">
              <dt className="eyebrow text-cream/50">CEP</dt>
              <dd className="mt-2 text-lg">{site.zip}</dd>
            </div>
          </motion.dl>

          <motion.div
            {...reveal(0.2)}
            className="order-2 flex flex-col gap-3 sm:flex-row lg:order-none lg:col-start-1 lg:row-start-3"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-4 text-ink transition-colors duration-300 hover:bg-[#1a73e8] hover:text-white"
            >
              <MapPin className="size-4" strokeWidth={1.8} aria-hidden />
              <span className="eyebrow">Abrir no Google Maps</span>
            </a>
            <a
              href={wazeUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-cream/30 px-6 py-4 text-cream transition-colors duration-300 hover:border-[#33ccff] hover:bg-[#33ccff] hover:text-[#08263a]"
            >
              <Navigation className="size-4" strokeWidth={1.8} aria-hidden />
              <span className="eyebrow">Abrir no Waze</span>
            </a>
          </motion.div>

          <motion.div
            {...reveal(0.14)}
            className="order-3 self-start lg:order-none lg:col-start-2 lg:row-span-3 lg:row-start-1"
          >
            {/*
              O iframe só entra quando a seção se aproxima. `loading="lazy"`
              sozinho não segurava: em conexão lenta o Chrome usa uma margem
              enorme e baixava o mapa no carregamento inicial — 457 KB, 39% do
              peso da home. A altura fica reservada nos dois estados, então
              montar o mapa não empurra nada.
            */}
            <div
              ref={caixaMapa}
              className="h-[380px] overflow-hidden rounded-3xl border border-cream/15 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] lg:h-[560px]"
            >
              {preparar && (
                <>
                  {/* abrem a conexão enquanto o iframe ainda é montado */}
                  <link rel="preconnect" href="https://maps.google.com" />
                  <link rel="preconnect" href="https://www.google.com" />
                  <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
                </>
              )}
              {montar ? (
                <iframe
                  src={mapEmbedUrl}
                  title={`Mapa com a localização da ${site.name}`}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0"
                />
              ) : (
                <div aria-hidden className="size-full bg-cream/5" />
              )}
            </div>
            <p className="mt-4 text-xs tracking-wide text-cream/45">
              Toque no mapa para abrir a rota no seu aplicativo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Monta o mapa só quando a seção se aproxima, em dois tempos.
 *
 * A 900px de distância abre as conexões (`preconnect`): eram 868 ms parados
 * em handshake — 534 ms no google.com e 334 ms no maps.google.com. Um quadro
 * depois monta o iframe, já com a conexão de pé.
 *
 * Sem isso o preconnect teria de ficar no <head>, abrindo conexão para um
 * domínio que quem não rola até o fim nunca usa.
 */
function useMapaSobDemanda() {
  const caixaMapa = useRef<HTMLDivElement>(null);
  const [preparar, setPreparar] = useState(false);
  const [montar, setMontar] = useState(false);

  useEffect(() => {
    const alvo = caixaMapa.current;
    // sem IntersectionObserver, mostra o mapa em vez de esconder
    if (!alvo || typeof IntersectionObserver === "undefined") {
      setPreparar(true);
      setMontar(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        obs.disconnect();
        setPreparar(true);
        requestAnimationFrame(() => setMontar(true));
      },
      { rootMargin: "900px" },
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  return { caixaMapa, preparar, montar };
}
