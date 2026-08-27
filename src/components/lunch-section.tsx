"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { UtensilsCrossed, Wheat } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { acompanhamentos, diaEmPetropolis, fixos, semana } from "@/lib/almoco";
import { pratosDoAlmoco } from "@/lib/fotos";
import { googleMapsUrl, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** O dia vira no navegador de quem tem o relógio em outro fuso. */
function assinar(aoMudar: () => void) {
  const t = setInterval(aoMudar, 60_000);
  return () => clearInterval(t);
}
const diaNoCliente = () => diaEmPetropolis();

const nomesFixos = fixos.map((f) => f.nome.toLowerCase()).join(", ");

export function LunchSection({ diaInicial }: { diaInicial: number }) {
  const reduce = useReducedMotion();
  const hoje = useSyncExternalStore(assinar, diaNoCliente, () => diaInicial);
  const pratoDeHoje = semana.find((d) => d.dia === hoje) ?? semana[0];

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      id="almoco"
      className="relative border-t border-espresso/10 bg-gradient-to-b from-cream via-cream-light to-cream"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="max-w-3xl">
          <motion.p {...reveal()} className="eyebrow flex items-center gap-2 text-gold">
            <UtensilsCrossed className="size-4" strokeWidth={1.6} aria-hidden />
            Almoço · todos os dias
          </motion.p>

          <motion.h2
            {...reveal(0.06)}
            className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          >
            O almoço de todo dia,
            <span className="block italic text-ink">com tempero de casa.</span>
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            className="mt-8 text-lg leading-relaxed text-espresso-soft"
          >
            Todo dia são dois cardápios ao mesmo tempo: quatro pratos que nunca
            saem — {nomesFixos} — e o prato do dia, que muda de segunda a
            domingo. Você almoça sentado no salão, na {site.street}, com o prato
            servido na hora.
          </motion.p>
        </div>

        {/* O que tem hoje — a pergunta que a pessoa veio fazer */}
        <motion.div
          {...reveal(0.16)}
          className="brilho relative mt-14 overflow-hidden rounded-b-3xl rounded-t-[3rem] border border-gold/40 bg-cream-light shadow-[0_2px_0_0_rgba(255,255,255,0.6)_inset,0_34px_64px_-46px_rgba(44,32,26,0.85)] lg:rounded-t-[4rem]"
        >
          <div className="grid gap-8 px-7 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-12 lg:py-14">
            <div>
              <p className="eyebrow text-gold">Hoje, {pratoDeHoje.nome.toLowerCase()}</p>
              <p className="mt-4 font-display text-4xl italic leading-none text-espresso sm:text-5xl">
                {pratoDeHoje.prato}
              </p>
              <p className="mt-4 text-espresso-soft">{pratoDeHoje.detalhe}</p>
            </div>

            <p className="border-t border-espresso/15 pt-7 leading-relaxed text-espresso-soft lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              E, como em todo dia: {nomesFixos}.
            </p>
          </div>
        </motion.div>

        {/* A semana inteira */}
        <motion.div {...reveal(0.2)} className="mt-20">
          <h3 className="eyebrow text-gold">O prato do dia</h3>
          <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-espresso sm:text-3xl">
            Um prato diferente <span className="italic text-ink">a cada dia</span> da
            semana.
          </p>

          <ul className="mt-8 border-t border-espresso/15">
            {semana.map((d) => {
              const eHoje = hoje === d.dia;
              return (
                <li
                  key={d.nome}
                  aria-current={eHoje ? "date" : undefined}
                  className={[
                    "grid grid-cols-1 items-baseline gap-x-8 gap-y-1.5 border-b border-espresso/12 py-6 transition-colors sm:grid-cols-[9rem_1fr] lg:grid-cols-[11rem_20rem_1fr]",
                    eHoje
                      ? "-ml-[3px] border-l-[3px] border-l-gold bg-cream-light pl-4 lg:pl-6"
                      : "px-4 lg:px-6",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    {eHoje && (
                      <span className="rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-ink">
                        Hoje
                      </span>
                    )}
                    <span
                      className={`eyebrow ${eHoje ? "text-espresso" : "text-espresso-soft"}`}
                    >
                      {d.nome}
                    </span>
                  </span>

                  <span
                    className={`font-display italic text-espresso ${eHoje ? "text-[1.9rem] sm:text-[2.1rem]" : "text-2xl sm:text-[1.7rem]"}`}
                  >
                    {d.prato}
                  </span>

                  <span
                    className={`text-sm leading-relaxed lg:text-base ${eHoje ? "text-espresso" : "text-espresso-soft"}`}
                  >
                    {d.detalhe}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Os fixos, agora como referência */}
        <motion.div {...reveal(0.16)} className="mt-20">
          <h3 className="eyebrow text-espresso-soft/70">Sempre no cardápio</h3>
          <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-espresso sm:text-3xl">
            Quatro pratos que você encontra em qualquer dia —{" "}
            <span className="italic text-ink">inclusive hoje</span>.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {fixos.map((item, i) => (
              <motion.li
                key={item.nome}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  ease: EASE,
                  delay: reduce ? 0 : 0.2 + i * 0.08,
                }}
                className="group relative flex flex-col items-center gap-5 rounded-b-2xl rounded-t-[3.5rem] border border-espresso/12 bg-cream-light px-5 pb-7 pt-10 text-center transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_14px_30px_-26px_rgba(44,32,26,0.5)] hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_30px_54px_-34px_rgba(44,32,26,0.8)] lg:rounded-t-[5rem] lg:px-6 lg:pb-9 lg:pt-12"
              >
                <Wheat
                  className="size-5 shrink-0 text-gold/45 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:text-gold"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="font-display text-xl italic leading-tight text-espresso sm:text-2xl">
                  {item.nome}
                </span>
                <span
                  aria-hidden
                  className="block h-px w-10 origin-center scale-x-50 bg-espresso/20 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:bg-gold"
                />
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-espresso/[0.05] px-6 py-5 sm:flex-row sm:items-baseline sm:gap-5">
            <span className="eyebrow shrink-0 text-espresso-soft/70">
              Esses quatro vêm com
            </span>
            <p className="text-espresso-soft">{acompanhamentos}</p>
          </div>
          <p className="mt-3 px-1 text-sm text-espresso-soft/80">
            O prato do dia tem o acompanhamento próprio de cada dia, listado acima.
          </p>
        </motion.div>

        {/* As fotos, depois de os pratos terem nome */}
        <motion.ul {...reveal(0.14)} className="mt-20 grid gap-4 sm:grid-cols-3 lg:gap-6">
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
              className="group overflow-hidden rounded-2xl bg-cream-deep shadow-[0_20px_44px_-32px_rgba(44,32,26,0.6)]"
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

        <motion.div {...reveal(0.18)} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
          >
            <span className="eyebrow">Como chegar ao salão</span>
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="max-w-md text-sm leading-relaxed text-espresso-soft">
            Servido no salão, na {site.street}. Quem não pode sair, pede pelo{" "}
            {site.delivery}. Dúvidas:{" "}
            <a href={site.phoneHref} className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
              {site.phone}
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
