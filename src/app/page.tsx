import Image from "next/image";

import { navigation, site, whatsappUrl } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* HERO — provisório, só para o header respirar sobre um fundo real */}
      <section
        id="a-padaria"
        className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-cream-light via-cream to-cream-deep/70"
      >
        <Image
          src="/brand/logo-rainha-da-massa.png"
          alt=""
          width={900}
          height={897}
          quality={40}
          sizes="(min-width: 1024px) 46rem, 1px"
          className="pointer-events-none absolute -right-24 top-1/2 hidden w-[46rem] max-w-none -translate-y-1/2 opacity-[0.07] lg:block lg:-right-10"
        />

        <div className="relative mx-auto w-full max-w-[88rem] px-5 pb-24 pt-[calc(var(--header-h)+5rem)] lg:px-10">
          <p className="eyebrow text-espresso-soft">
            Desde a madrugada · {site.city} — {site.state}
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-espresso sm:text-6xl lg:text-7xl xl:text-8xl">
            O pão de cada dia,
            <span className="block italic text-ink">feito como se fosse festa.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-espresso-soft">
            Fermentação natural, forno quente de hora em hora e uma confeitaria que a
            cidade conhece de nome. Bem-vindo à casa da Rainha da Massa.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-cream transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow">Fazer um pedido</span>
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#paes"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-4 text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso/5"
            >
              <span className="eyebrow">Ver a padaria</span>
            </a>
          </div>
        </div>
      </section>

      {/* Seções seguintes — âncoras do menu, conteúdo ainda por vir */}
      {navigation.slice(1).map((item) => (
        <section
          key={item.href}
          id={item.href.replace("#", "")}
          className="border-t border-espresso/10"
        >
          <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-32 lg:px-10">
            <p className="eyebrow text-gold">{item.hint}</p>
            <h2 className="font-display text-4xl italic text-espresso sm:text-5xl">
              {item.label}
            </h2>
            <p className="mt-2 max-w-md text-espresso-soft">Em breve.</p>
          </div>
        </section>
      ))}
    </>
  );
}
