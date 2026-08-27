import { CoroaSvg } from "@/components/coroa-svg";

/**
 * Esqueleto do cardápio. A pessoa está de pé na mesa com o celular na
 * mão: mostrar a forma da página que vem chegando engana menos que um
 * disco girando no vazio.
 */
export default function Loading() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-cream-light via-cream to-cream-deep/40">
      <header className="grain relative overflow-hidden border-b border-gold/35 bg-ink px-5 pb-7 pt-7 text-cream">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <CoroaSvg className="anima-respira h-9 w-auto text-cream" />
          <h1 className="mt-3 font-display text-3xl italic leading-none sm:text-4xl">
            Rainha da Massa
          </h1>
          <span className="mt-5 block h-px w-40 overflow-hidden bg-cream/15">
            <span className="anima-varredura block h-px w-full bg-gold" />
          </span>
        </div>
      </header>

      <div className="border-b border-espresso/12 bg-cream-light">
        <div className="mx-auto flex max-w-4xl gap-3 px-3 py-4">
          {[7, 5, 6, 5].map((w, i) => (
            <span
              key={i}
              className="h-3 shrink-0 rounded-full bg-espresso/10"
              style={{ width: `${w}rem` }}
            />
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-5 pt-10" aria-hidden>
        <span className="block h-3 w-24 rounded-full bg-espresso/10" />
        <span className="mt-5 block h-9 w-56 rounded-lg bg-espresso/10" />
        <span className="mt-5 block h-px w-10 bg-gold/50" />

        <ul className="mt-10 flex flex-col gap-7">
          {[13, 10, 15, 11, 12, 9].map((w, i) => (
            <li key={i} className="flex items-baseline gap-4">
              <span
                className="h-5 rounded-md bg-espresso/10"
                style={{ width: `${w}rem` }}
              />
              <span className="h-px flex-1 bg-espresso/8" />
              <span className="h-5 w-16 rounded-md bg-espresso/10" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
