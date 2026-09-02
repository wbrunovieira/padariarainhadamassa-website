"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { encomendas } from "@/lib/encomendas";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { site, whatsappUrl } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OrdersSection() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      id="encomendas"
      className="border-t border-espresso/10 bg-gradient-to-b from-cream-deep/25 to-cream"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <motion.p {...reveal()} className="eyebrow flex items-center gap-2.5 text-gold">
              <Image
                src="/brand/ornamento-coroa.png"
                alt=""
                width={480}
                height={199}
                className="h-3 w-auto opacity-80"
              />
              Encomendas
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
            >
              Bolos, tortas e salgados:
              <span className="block italic text-ink">a encomenda começa por um telefonema.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mt-8 max-w-md text-lg leading-relaxed text-espresso-soft"
            >
              Combine o que precisa pelo telefone ou WhatsApp e retire na loja, na{" "}
              {site.street}.
              Quanto antes avisar, melhor — véspera de festa e fim de ano enchem o
              forno rápido.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-espresso px-6 py-4 text-cream transition-colors duration-300 hover:bg-ink"
              >
                <PhoneIcon className="size-4 shrink-0" />
                <span className="eyebrow">Ligar {site.phone}</span>
              </a>

              {/* Só aparece quando `site.whatsapp` tiver número. */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-espresso/25 px-6 py-4 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  <span className="eyebrow">WhatsApp</span>
                </a>
              )}
            </motion.div>
          </div>

          <ul className="flex flex-col">
            {encomendas.map((item, i) => (
              <motion.li
                key={item.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  ease: EASE,
                  delay: reduce ? 0 : 0.12 + i * 0.09,
                }}
                className="group border-t border-espresso/15 py-8 last:border-b lg:py-10"
              >
                <div className="flex items-baseline gap-5 lg:gap-8">
                  <span
                    aria-hidden
                    className="mt-2 block h-px w-6 shrink-0 bg-espresso/25 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-10 group-hover:bg-gold lg:w-10 lg:group-hover:w-16"
                  />
                  <div>
                    <h3 className="font-display text-2xl italic text-espresso sm:text-3xl">
                      {item.titulo}
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-espresso-soft">
                      {item.texto}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
