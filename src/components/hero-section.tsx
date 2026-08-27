"use client";

import Image from "next/image";
import { useRef } from "react";
import { Wheat } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { HeroCarousel } from "@/components/hero-carousel";
import { formatRating, type PlaceStats } from "@/lib/google-place";
import { decadaDeCasa, deliveryTexto, fullAddress, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.09 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Cada linha do título sobe de dentro de uma máscara. */
const linha: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: EASE } },
};

export function HeroSection({ stats }: { stats: PlaceStats }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const brasaoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const brasaoGiro = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const conteudoY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const parallax = reduce ? undefined : { y: brasaoY, rotate: brasaoGiro };
  const conteudo = reduce
    ? undefined
    : { y: conteudoY, opacity: conteudoOpacidade };

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-cream-light via-cream to-cream-deep/70"
    >
      <motion.div
        style={parallax}
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
        className="pointer-events-none absolute -right-40 top-1/2 hidden w-[50rem] -translate-y-1/2 lg:block"
      >
        <Image
          src="/brand/logo-rainha-da-massa.png"
          alt=""
          width={900}
          height={897}
          quality={40}
          sizes="(min-width: 1024px) 46rem, 1px"
          loading="lazy"
          className="w-full opacity-[0.09]"
        />
      </motion.div>

      <motion.div
        style={conteudo}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-[88rem] px-5 pb-28 pt-[calc(var(--header-h)+4rem)] [@media(max-height:840px)]:pb-14 [@media(max-height:840px)]:pt-[calc(var(--header-h)+1.5rem)] lg:px-10"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <motion.p
              variants={rise}
              className="eyebrow flex items-center gap-2.5 text-espresso-soft"
            >
              <Image
                src="/brand/ornamento-coroa.png"
                alt=""
                width={480}
                height={199}
                className="h-3 w-auto opacity-70"
              />
              {site.city} — {site.state} · Desde {site.since}
            </motion.p>

            <h1 className="mt-7 font-display tracking-tight text-espresso">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={linha}
                  className="block text-3xl leading-tight text-espresso-soft sm:text-4xl lg:text-[2.6rem] [@media(max-height:840px)]:lg:text-[2.1rem] xl:text-5xl [@media(max-height:840px)]:xl:text-[2.4rem]"
                >
                  Padaria e confeitaria
                </motion.span>
              </span>
              <span className="mt-1 block overflow-hidden pb-[0.12em]">
                <motion.span
                  variants={linha}
                  className="block text-5xl italic leading-[0.98] text-ink sm:text-6xl lg:text-[4.2rem] [@media(max-height:840px)]:lg:text-[3.4rem] xl:text-7xl [@media(max-height:840px)]:xl:text-[3.9rem]"
                >
                  há mais de {decadaDeCasa()} anos.
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-md text-xl leading-relaxed text-espresso-soft [@media(max-height:840px)]:mt-6"
            >
              Aberta todos os dias, das 6h às 22h.
            </motion.p>

            <motion.ul
              variants={rise}
              className="mt-7 flex flex-wrap items-center gap-y-3 text-sm text-espresso-soft"
            >
              <li className="flex items-center gap-2 pr-5">
                <Wheat
                  className="size-4 text-gold"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <span>
                  <strong className="font-medium text-espresso">
                    {formatRating(stats.rating)}
                  </strong>{" "}
                  com {stats.count} avaliações no Google
                </span>
              </li>
              <li className="whitespace-nowrap">
                Encomendas pelo telefone
              </li>
              <li className="whitespace-nowrap">
                Delivery no {deliveryTexto}
              </li>
            </motion.ul>

            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap items-center gap-4 [@media(max-height:840px)]:mt-7"
            >
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
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-10 text-sm tracking-wide text-espresso-soft/80 [@media(max-height:840px)]:mt-6"
            >
              {fullAddress}
            </motion.p>
          </div>

          <motion.div variants={rise}>
            <HeroCarousel />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="eyebrow text-espresso-soft/50">Role</span>
        <span className="relative block h-10 w-px bg-espresso/15">
          <motion.span
            animate={reduce ? {} : { y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-x-0 top-0 block h-1/2 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
