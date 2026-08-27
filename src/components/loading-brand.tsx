import Image from "next/image";

/**
 * Carregamento da casa: o brasão respirando e um fio dourado varrendo.
 * Sem biblioteca de animação — é a primeira coisa que aparece, então
 * precisa ser CSS puro e chegar antes de qualquer JavaScript.
 */
export function LoadingBrand({
  texto = "Um instante",
  escuro = false,
}: {
  texto?: string;
  escuro?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-6"
    >
      <Image
        src={
          escuro
            ? "/brand/logo-rainha-da-massa-cream.png"
            : "/brand/logo-rainha-da-massa.png"
        }
        alt=""
        width={900}
        height={897}
        sizes="88px"
        priority
        className="anima-respira size-[5.5rem] object-contain"
      />

      <span
        className={`block h-px w-40 overflow-hidden ${escuro ? "bg-cream/15" : "bg-espresso/12"}`}
      >
        <span className="anima-varredura block h-px w-full bg-gold" />
      </span>

      <span className={`eyebrow ${escuro ? "text-cream/50" : "text-espresso-soft/60"}`}>
        {texto}
      </span>
    </div>
  );
}
