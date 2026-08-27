"use client";

import { Wheat } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { formatRating, type PlaceStats } from "@/lib/google-place";
import { mencoes, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection({ stats }: { stats: PlaceStats }) {
  const reduce = useReducedMotion();
  const anos = new Date().getFullYear() - site.since;

  const numeros = [
    { valor: `${anos}`, unidade: "anos", legenda: `Abrimos em ${site.since}` },
    {
      valor: formatRating(stats.rating),
      unidade: "estrelas",
      legenda: `${stats.count} avaliações no Google`,
    },
    { valor: "7", unidade: "dias", legenda: `Toda semana, ${site.hoursShort}` },
  ];

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
    <section id="a-padaria" className="relative border-t border-espresso/10">
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <motion.p {...reveal()} className="eyebrow text-gold">
              Quem somos
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              className="mt-6 max-w-2xl font-display text-4xl leading-[1.02] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
            >
              Uma padaria de bairro que
              <span className="italic text-ink"> abre todo dia às seis</span>.
            </motion.h2>

            <motion.div
              {...reveal(0.12)}
              className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-espresso-soft"
            >
              <p>
                A Rainha da Massa abriu as portas em {site.since}, na{" "}
                {site.street}, e desde então funciona todos os dias — do café da
                manhã até a noite.
              </p>
              <p>
                O balcão junta as duas metades do nome: a padaria de todo dia e
                a confeitaria das ocasiões. Encomendas saem pelo telefone e o
                delivery corre pelo {site.delivery}.
              </p>
            </motion.div>

            <motion.div {...reveal(0.18)} className="mt-12">
              <p className="eyebrow flex items-center gap-2 text-espresso-soft/70">
                <Wheat
                  className="size-4 text-gold"
                  strokeWidth={1.6}
                  aria-hidden
                />
                O que os clientes mais citam nas avaliações
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {mencoes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-espresso/20 px-4 py-2 text-sm tracking-wide text-espresso-soft transition-colors duration-300 hover:border-gold hover:text-espresso"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.dl
            {...reveal(0.1)}
            className="flex flex-col justify-center gap-px"
          >
            {numeros.map((n, i) => (
              <motion.div
                key={n.unidade}
                {...reveal(0.16 + i * 0.08)}
                className="border-t border-espresso/15 py-8 first:border-t-0 first:pt-0 last:pb-0"
              >
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-6xl leading-none text-espresso lg:text-7xl">
                    {n.valor}
                  </span>
                  <span className="font-display text-2xl italic text-gold">
                    {n.unidade}
                  </span>
                </dt>
                <dd className="mt-3 text-sm tracking-wide text-espresso-soft">
                  {n.legenda}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
