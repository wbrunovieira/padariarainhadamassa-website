"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { perguntas } from "@/lib/perguntas";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FaqSection() {
  const reduce = useReducedMotion();
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="perguntas" className="border-t border-espresso/10 bg-cream-deep/35">
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-gold">Perguntas frequentes</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl">
              O que a gente
              <span className="block italic text-ink">mais escuta.</span>
            </h2>
          </div>

          <ul className="border-t border-espresso/15">
            {perguntas.map((p, i) => {
              const abertaAqui = aberta === i;
              return (
                <li key={p.pergunta} className="border-b border-espresso/12">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(abertaAqui ? null : i)}
                      aria-expanded={abertaAqui}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-xl italic text-espresso transition-colors group-hover:text-ink sm:text-2xl">
                        {p.pergunta}
                      </span>
                      <motion.span
                        animate={{ rotate: abertaAqui ? 45 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                        className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors group-hover:border-gold group-hover:text-gold"
                      >
                        <Plus className="size-4" strokeWidth={1.8} aria-hidden />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {abertaAqui && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-espresso-soft">
                          {p.resposta}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
