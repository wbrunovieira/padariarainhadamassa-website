"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Wheat, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function GallerySection() {
  const reduce = useReducedMotion();
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (passo: number) =>
      setAberta((i) => (i === null ? i : (i + passo + fotos.length) % fotos.length)),
    [],
  );

  useEffect(() => {
    if (aberta === null) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberta, fechar, mover]);

  const foto = aberta === null ? null : fotos[aberta];

  return (
    <section
      id="galeria"
      className="border-t border-espresso/10 bg-gradient-to-b from-cream via-cream-light to-cream-deep/25"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-gold">
            <Wheat className="size-4" strokeWidth={1.6} aria-hidden />
            O que sai do balcão
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl">
            Fotos de um dia qualquer
            <span className="block italic text-ink">na {site.shortName}.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-espresso-soft">
            Pão francês saindo do forno, o almoço do dia, os doces do balcão e a
            fachada na esquina. Sem produção — é o que está lá.
          </p>
        </div>

        <div className="mt-16 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 lg:gap-6">
          {fotos.map((item, i) => (
            <motion.button
              key={item.src.src}
              type="button"
              onClick={() => setAberta(i)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reduce ? 0 : 0.75,
                ease: EASE,
                delay: reduce ? 0 : (i % 3) * 0.08,
              }}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-cream-deep text-left shadow-[0_22px_48px_-34px_rgba(44,32,26,0.65)] transition-shadow duration-500 hover:shadow-[0_34px_64px_-34px_rgba(44,32,26,0.8)] lg:mb-6"
              aria-label={`Ampliar: ${item.legenda}`}
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  placeholder="blur"
                  quality={68}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/75 via-ink/10 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow text-cream">{item.legenda}</span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {foto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={foto.legenda}
          >
            <div className="flex items-center justify-between px-5 py-4 lg:px-10">
              <span className="eyebrow text-cream/60">
                {(aberta ?? 0) + 1} / {fotos.length}
              </span>
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar"
                className="flex size-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                <X className="size-5" strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
              <motion.div
                key={foto.src.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                className="relative flex h-full w-full max-w-5xl items-center justify-center"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  placeholder="blur"
                  quality={68}
                  sizes="(min-width: 1024px) 60vw, 96vw"
                  className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pb-8 lg:px-10">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Foto anterior"
                className="flex size-12 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                <ArrowLeft className="size-5" strokeWidth={1.8} aria-hidden />
              </button>

              <p className="text-center text-sm text-cream/80">{foto.legenda}</p>

              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Próxima foto"
                className="flex size-12 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                <ArrowRight className="size-5" strokeWidth={1.8} aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
