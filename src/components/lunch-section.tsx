"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { acompanhamentos, fixos, semana } from "@/lib/almoco";
import { pratosDoAlmoco } from "@/lib/fotos";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** O dia da semana só existe no navegador — no servidor volta null, para o
 *  HTML renderizado bater com a primeira pintura do cliente. */
const naoAssina = () => () => {};
const diaNoCliente = () => new Date().getDay();
const diaNoServidor = () => null;

export function LunchSection() {
  const reduce = useReducedMotion();
  const hoje = useSyncExternalStore(naoAssina, diaNoCliente, diaNoServidor);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section id="almoco" className="relative border-t border-espresso/10 bg-cream-deep/35">
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="max-w-3xl">
          <motion.p {...reveal()} className="eyebrow flex items-center gap-2 text-gold">
            <UtensilsCrossed className="size-4" strokeWidth={1.6} aria-hidden />
            Almoço · todo dia
          </motion.p>

          <motion.h2
            {...reveal(0.06)}
            className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          >
            O almoço de todo dia,
            <span className="block italic text-ink">com tempero de casa.</span>
          </motion.h2>

          <motion.div
            {...reveal(0.12)}
            className="mt-8 space-y-5 text-lg leading-relaxed text-espresso-soft"
          >
            <p>
              Prato bem servido, comida caseira e preço que cabe no meio da semana.
              Todo dia tem frango grelhado, à milanesa, à parmegiana e contra-filé —
              e ainda o prato do dia, que muda de segunda a domingo.
            </p>
            <p>
              Você almoça aqui no salão, na {site.street} — sentado, com o prato
              servido na hora. Em {site.city}, é o almoço de quem quer comida de
              verdade sem perder a hora. Quem não pode sair, pede pelo{" "}
              {site.delivery}.
            </p>
          </motion.div>
        </div>

        {/* As fotos de prato, as mesmas da galeria */}
        <motion.ul {...reveal(0.16)} className="mt-16 grid gap-4 sm:grid-cols-3 lg:gap-6">
          {pratosDoAlmoco.map((foto, i) => (
            <motion.li
              key={foto.src.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reduce ? 0 : 0.7,
                ease: EASE,
                delay: reduce ? 0 : 0.18 + i * 0.09,
              }}
              className="group overflow-hidden rounded-2xl bg-cream-deep"
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  placeholder="blur"
                  sizes="(min-width: 640px) 30vw, 92vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-4 pt-14">
                  <span className="eyebrow text-cream">{foto.legenda}</span>
                </span>
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Fixos do dia a dia */}
        <motion.div {...reveal(0.16)} className="mt-16">
          <h3 className="eyebrow text-espresso-soft/70">
            Quatro pratos feitos que nunca saem do cardápio
          </h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-espresso/12 bg-espresso/12 sm:grid-cols-2 lg:grid-cols-4">
            {fixos.map((item) => (
              <li
                key={item.nome}
                className="bg-cream-light px-6 py-7 font-display text-2xl italic text-espresso"
              >
                {item.nome}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-espresso-soft">{acompanhamentos}</p>
        </motion.div>

        {/* Prato do dia */}
        <motion.div {...reveal(0.2)} className="mt-20">
          <h3 className="eyebrow text-espresso-soft/70">O prato de cada dia</h3>

          <ul className="mt-6 border-t border-espresso/15">
            {semana.map((d, i) => {
              const eHoje = hoje === d.dia;
              return (
                <motion.li
                  key={d.nome}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    ease: EASE,
                    delay: reduce ? 0 : i * 0.05,
                  }}
                  className={[
                    "grid grid-cols-1 items-baseline gap-x-8 gap-y-1.5 border-b border-espresso/12 px-4 py-6 transition-colors sm:grid-cols-[7.5rem_1fr] lg:grid-cols-[9rem_20rem_1fr] lg:px-6",
                    eHoje ? "bg-cream-light" : "",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <span className="eyebrow text-espresso-soft">{d.nome}</span>
                    {eHoje && (
                      <span className="rounded-full bg-espresso px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-cream">
                        Hoje
                      </span>
                    )}
                  </span>

                  <span className="font-display text-2xl italic text-espresso sm:text-[1.7rem]">
                    {d.prato}
                  </span>

                  <span className="text-sm leading-relaxed text-espresso-soft lg:text-base">
                    {d.detalhe}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div {...reveal(0.24)} className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
          >
            <span className="eyebrow">Encomendar pelo telefone</span>
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="text-sm text-espresso-soft">
            Ou peça pelo {site.delivery}, que entrega em {site.city}.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
