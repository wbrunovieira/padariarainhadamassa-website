"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { heroSlides } from "@/lib/fotos";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVALO = 5200;

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [pausado, setPausado] = useState(false);

  const ir = useCallback((passo: number) => {
    setDirecao(passo);
    setI((atual) => (atual + passo + heroSlides.length) % heroSlides.length);
  }, []);

  const foto = heroSlides[i];
  // o vídeo fica no ar até terminar; as fotos, o intervalo padrão
  const duracao = foto.duracao ?? INTERVALO;

  useEffect(() => {
    if (pausado || reduce) return;
    const t = setTimeout(() => ir(1), duracao);
    return () => clearTimeout(t);
  }, [pausado, reduce, ir, i, duracao]);

  return (
    <div
      className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto lg:max-w-[27rem]"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-b-3xl rounded-t-[7rem] border border-espresso/12 bg-cream-deep shadow-[0_50px_90px_-60px_rgba(44,32,26,0.9)] sm:aspect-[4/5] lg:aspect-auto lg:h-[min(58vh,32rem)] lg:rounded-t-[10rem]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={foto.src.src}
            initial={{ opacity: 0, scale: 1.07, x: reduce ? 0 : direcao * 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: reduce ? 0 : 0.95, ease: EASE }}
            className="absolute inset-0"
          >
            {foto.video ? (
              <video
                src={foto.video}
                poster={foto.src.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={foto.alt}
                className="size-full object-cover"
              />
            ) : (
              <Image
                src={foto.src}
                alt={foto.alt}
                placeholder="blur"
                priority={i === 1}
                sizes="(min-width: 1024px) 30rem, 92vw"
                className="size-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent p-6 pt-24">
          <AnimatePresence mode="wait">
            <motion.p
              key={foto.legenda}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              className="eyebrow text-cream"
            >
              {foto.legenda}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <ul className="flex items-center gap-2" aria-hidden>
          {heroSlides.map((s, n) => (
            <li key={s.src.src}>
              <span
                className={[
                  "block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  n === i ? "w-8 bg-gold" : "w-4 bg-espresso/25",
                ].join(" ")}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Foto anterior"
            className="flex size-11 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-cream"
          >
            <ChevronLeft className="size-5" strokeWidth={1.8} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Próxima foto"
            className="flex size-11 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-cream"
          >
            <ChevronRight className="size-5" strokeWidth={1.8} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
