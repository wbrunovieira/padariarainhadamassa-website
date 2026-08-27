"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import { navigation, site, whatsappUrl } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const TICKER = [
  "Pão quentinho de hora em hora",
  "Fermentação natural desde as 4 da manhã",
  `${site.city} · ${site.state}`,
  "Encomendas para festas e eventos",
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 28);
  });

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 font-sans">
        {/* Faixa superior — recolhe ao rolar */}
        <motion.div
          initial={false}
          animate={{ height: scrolled || open ? 0 : 34, opacity: scrolled || open ? 0 : 1 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          className="relative overflow-hidden bg-ink text-cream/85"
        >
          <div className="flex h-[34px] items-center overflow-hidden">
            <div className="marquee-track flex w-max shrink-0 items-center gap-10 pr-10">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
                  {TICKER.map((text) => (
                    <span
                      key={`${copy}-${text}`}
                      className="eyebrow flex shrink-0 items-center gap-10 whitespace-nowrap"
                    >
                      {text}
                      <WheatMark className="size-2.5 text-wheat/70" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Barra principal */}
        <div
          className={[
            "relative transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled
              ? "grain bg-cream/85 shadow-[0_1px_0_0_rgba(82,61,45,0.14),0_26px_50px_-40px_rgba(44,32,26,0.8)] backdrop-blur-xl"
              : "bg-transparent",
          ].join(" ")}
        >
          <motion.div
            initial={false}
            animate={{ paddingTop: scrolled ? 10 : 20, paddingBottom: scrolled ? 10 : 20 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 lg:px-10"
          >
            {/* Brasão + wordmark */}
            <Link
              href="/"
              aria-label={`${site.name} — início`}
              className="group flex items-center gap-3.5"
            >
              <motion.span
                animate={{ width: scrolled ? 44 : 60, height: scrolled ? 44 : 60 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                className="relative block shrink-0"
              >
                <Image
                  src="/brand/logo-rainha-da-massa.png"
                  alt=""
                  fill
                  priority
                  sizes="60px"
                  className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:scale-105"
                />
              </motion.span>

              <span className="hidden flex-col leading-none sm:flex">
                <span className="eyebrow text-espresso-soft/80">Padaria</span>
                <motion.span
                  animate={{ fontSize: scrolled ? "1.28rem" : "1.5rem" }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  className="mt-1.5 font-display italic tracking-tight text-espresso"
                >
                  Rainha da Massa
                </motion.span>
              </span>
            </Link>

            {/* Navegação */}
            <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
              {navigation.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-4">
              <span className="hidden text-right text-[0.7rem] leading-tight text-espresso-soft xl:block">
                <span className="block eyebrow text-espresso-soft/70">Aberto hoje</span>
                <span className="mt-1 block tracking-wide">{site.hours}</span>
              </span>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-espresso/15 bg-espresso px-5 py-2.5 text-cream transition-colors duration-300 sm:inline-flex"
              >
                <span className="absolute inset-0 -translate-x-[101%] bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <WhatsAppIcon className="relative size-4" />
                <span className="relative eyebrow">Peça agora</span>
                <span className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  →
                </span>
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="relative flex size-11 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:bg-espresso hover:text-cream lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="absolute left-0 top-0 h-px w-full bg-current"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="absolute bottom-0 left-0 h-px w-full bg-current"
                  />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Fio de progresso de leitura */}
          <div
            className={[
              "relative h-px w-full transition-colors duration-500",
              scrolled ? "bg-espresso/10" : "bg-transparent",
            ].join(" ")}
          >
            <motion.div
              style={{ scaleX: progress }}
              className="h-px w-full origin-left bg-gradient-to-r from-gold via-wheat to-gold"
            />
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              className="grain absolute inset-x-0 top-0 overflow-hidden bg-cream-light pb-10 pt-28 shadow-2xl"
            >
              <Image
                src="/brand/logo-rainha-da-massa.png"
                alt=""
                width={420}
                height={418}
                className="pointer-events-none absolute -bottom-16 -right-16 w-72 opacity-[0.06]"
              />

              <nav aria-label="Mobile" className="relative flex flex-col px-6">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease: EASE,
                      delay: reduce ? 0 : 0.12 + index * 0.06,
                    }}
                    className="group flex flex-col gap-1.5 border-b border-espresso/10 py-4"
                  >
                    <span className="eyebrow text-gold/80">{item.hint}</span>
                    <span className="font-display text-[2rem] leading-none italic text-espresso transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                      {item.label}
                    </span>
                  </motion.a>
                ))}

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.5,
                    ease: EASE,
                    delay: reduce ? 0 : 0.12 + navigation.length * 0.06,
                  }}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-cream"
                >
                  <WhatsAppIcon className="size-4" />
                  <span className="eyebrow">Peça no WhatsApp</span>
                </motion.a>

                <p className="mt-6 text-center text-xs tracking-wide text-espresso-soft">
                  {site.hours} · {site.city}/{site.state}
                </p>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative py-1.5 text-espresso">
      <WheatMark className="absolute -top-2 left-1/2 size-2 -translate-x-1/2 text-gold opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-top-2.5 group-hover:opacity-100" />
      <span className="eyebrow transition-colors duration-300 group-hover:text-ink">{label}</span>
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </a>
  );
}

function WheatMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M6 0.5 7.3 6 6 11.5 4.7 6Z" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.17 8.17 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.65 4.2 3.72.59.25 1.04.4 1.4.52.59.18 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
