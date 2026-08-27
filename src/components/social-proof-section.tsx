"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { depoimentos, temas } from "@/lib/depoimentos";
import { formatRating, type PlaceStats } from "@/lib/google-place";
import { googleReviewsUrl } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SocialProofSection({ stats }: { stats: PlaceStats }) {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section id="avaliacoes" className="border-t border-espresso/10">
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <motion.p {...reveal()} className="eyebrow text-gold">
              O que dizem por aí
            </motion.p>

            <motion.div {...reveal(0.06)} className="mt-7 flex items-end gap-4">
              <span className="font-display text-7xl leading-none text-espresso lg:text-8xl">
                {formatRating(stats.rating)}
              </span>
              <span
                className="mb-2 flex gap-1 text-gold"
                aria-label={`${formatRating(stats.rating)} de 5 estrelas`}
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star
                    key={n}
                    className="size-4"
                    strokeWidth={1.4}
                    fill={n < Math.round(stats.rating) ? "currentColor" : "none"}
                    aria-hidden
                  />
                ))}
              </span>
            </motion.div>

            <motion.p {...reveal(0.1)} className="mt-4 text-espresso-soft">
              {stats.count} avaliações no Google, ao longo de mais de vinte anos
              de balcão.
            </motion.p>

            <motion.ul {...reveal(0.14)} className="mt-8 flex flex-wrap gap-2.5">
              {temas.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-espresso/20 px-4 py-2 text-sm tracking-wide text-espresso-soft"
                >
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.a
              {...reveal(0.18)}
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-espresso/25 px-6 py-3.5 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
            >
              <span className="eyebrow">Ler no Google</span>
            </motion.a>
          </div>

          <ul className="flex flex-col justify-center gap-10">
            {depoimentos.map((d, i) => (
              <motion.li key={d.autor} {...reveal(0.12 + i * 0.08)}>
                <blockquote>
                  <p className="font-display text-2xl leading-snug text-espresso sm:text-3xl">
                    <span className="text-gold">“</span>
                    {d.texto}
                    <span className="text-gold">”</span>
                  </p>
                  <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <cite className="not-italic eyebrow text-espresso">{d.autor}</cite>
                    <span aria-hidden className="h-px w-6 bg-espresso/25" />
                    <span className="text-sm text-espresso-soft">{d.origem}</span>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
