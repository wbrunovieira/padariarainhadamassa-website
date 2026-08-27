"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { Item } from "@/lib/cardapio";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  id: string;
  sobretitulo: string;
  marca?: ReactNode;
  titulo: ReactNode;
  texto: ReactNode;
  itens: Item[];
  foto: StaticImageData;
  fotoAlt: string;
  fotoLegenda: string;
  /** true põe a foto à direita */
  invertido?: boolean;
  fundo?: string;
  rodape?: ReactNode;
};

/** Molde comum do café da manhã e da confeitaria. */
export function MenuSection({
  id,
  sobretitulo,
  marca,
  titulo,
  texto,
  itens,
  foto,
  fotoAlt,
  fotoLegenda,
  invertido = false,
  fundo = "",
  rodape,
}: Props) {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section id={id} className={`border-t border-espresso/10 ${fundo}`}>
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            {...reveal(0.1)}
            className={invertido ? "lg:order-2" : undefined}
          >
            <div className="group relative overflow-hidden rounded-b-3xl rounded-t-[6rem] border border-espresso/12 bg-cream-deep lg:rounded-t-[8rem]">
              <Image
                src={foto}
                alt={fotoAlt}
                placeholder="blur"
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] sm:aspect-[5/4] lg:aspect-[4/5]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent p-6 pt-20">
                <span className="eyebrow text-cream">{fotoLegenda}</span>
              </span>
            </div>
          </motion.div>

          <div className={invertido ? "lg:order-1" : undefined}>
            <motion.p
              {...reveal()}
              className="eyebrow flex items-center gap-2.5 text-gold"
            >
              {marca}
              {sobretitulo}
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl"
            >
              {titulo}
            </motion.h2>

            <motion.div
              {...reveal(0.12)}
              className="mt-7 max-w-lg text-lg leading-relaxed text-espresso-soft"
            >
              {texto}
            </motion.div>

            <ul className="mt-10 border-t border-espresso/15">
              {itens.map((item, i) => (
                <motion.li
                  key={item.nome}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    ease: EASE,
                    delay: reduce ? 0 : 0.14 + i * 0.04,
                  }}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-espresso/12 py-4"
                >
                  <span className="font-display text-xl italic text-espresso sm:text-2xl">
                    {item.nome}
                  </span>
                  {item.nota && (
                    <span className="text-sm text-espresso-soft">{item.nota}</span>
                  )}
                </motion.li>
              ))}
            </ul>

            {rodape && <motion.div {...reveal(0.2)}>{rodape}</motion.div>}
          </div>
        </div>
      </div>
    </section>
  );
}
