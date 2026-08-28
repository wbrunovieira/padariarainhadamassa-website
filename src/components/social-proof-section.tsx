"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { depoimentos, temas } from "@/lib/depoimentos";
import { formatRating, type PlaceStats } from "@/lib/google-place";
import { decadaDeCasa, googleReviewsUrl } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const INTERVALO = 7000;

/** Um depoimento por vez, trocando sozinho, com setas para passar. */
function Depoimentos() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);

  const ir = useCallback(
    (passo: number) =>
      setI((atual) => (atual + passo + depoimentos.length) % depoimentos.length),
    [],
  );

  useEffect(() => {
    if (pausado || reduce || depoimentos.length < 2) return;
    const t = setTimeout(() => ir(1), INTERVALO);
    return () => clearTimeout(t);
  }, [pausado, reduce, ir, i]);

  if (!depoimentos.length) return null;
  const d = depoimentos[i];

  return (
    <div
      className="flex flex-col justify-center"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="min-h-[15rem] sm:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={d.autor}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          >
            <p className="font-display text-2xl leading-snug text-espresso sm:text-[1.9rem]">
              <span className="text-gold">“</span>
              {d.texto}
              <span className="text-gold">”</span>
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <cite className="eyebrow not-italic text-espresso">{d.autor}</cite>
              <span aria-hidden className="h-px w-6 bg-espresso/25" />
              <span className="text-sm text-espresso-soft">
                {d.detalhe} · {d.quando}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {depoimentos.length > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <ul className="flex items-center gap-2" aria-hidden>
            {depoimentos.map((x, n) => (
              <li key={x.autor}>
                <span
                  className={`block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${n === i ? "w-8 bg-gold" : "w-4 bg-espresso/25"}`}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Depoimento anterior"
              className="flex size-11 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-cream"
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Próximo depoimento"
              className="flex size-11 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-cream"
            >
              <ChevronRight className="size-5" strokeWidth={1.8} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SocialProofSection({ stats }: { stats: PlaceStats }) {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section id="avaliacoes" className="relative border-t border-espresso/10">
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="brilho relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <motion.p {...reveal()} className="eyebrow text-gold">
              O que dizem por aí
            </motion.p>

            <motion.h2
              {...reveal(0.04)}
              className="mt-6 font-display text-3xl leading-[1.05] tracking-tight text-espresso sm:text-4xl"
            >
              O que os clientes de Petrópolis
              <span className="block italic text-ink">escrevem sobre a casa.</span>
            </motion.h2>

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
              {stats.count} avaliações no Google, ao longo de mais de{" "}
              {decadaDeCasa()} anos de balcão.
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

          <Depoimentos />
        </div>
      </div>
    </section>
  );
}
