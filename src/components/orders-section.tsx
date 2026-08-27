"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { encomendas } from "@/lib/encomendas";
import { site } from "@/lib/site";

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
    <section id="encomendas" className="border-t border-espresso/10">
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
              A festa começa com
              <span className="block italic text-ink">um telefonema.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mt-8 max-w-md text-lg leading-relaxed text-espresso-soft"
            >
              Combine o que precisa pelo telefone e retire na loja, na {site.street}.
              Quanto antes avisar, melhor — véspera de festa e fim de ano enchem o
              forno rápido.
            </motion.p>

            <motion.a
              {...reveal(0.18)}
              href={site.phoneHref}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow">Encomendar {site.phone}</span>
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </motion.a>
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
