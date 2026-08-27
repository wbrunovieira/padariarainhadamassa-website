import { CoroaSvg } from "@/components/coroa-svg";

/**
 * Carregamento da casa: a coroa respirando e um fio dourado varrendo.
 * Sem imagem e sem biblioteca de animação — é a primeira coisa que
 * aparece, então precisa funcionar antes de qualquer rede ou JavaScript.
 */
export function LoadingBrand({
  texto = "Um instante",
  escuro = false,
}: {
  texto?: string;
  escuro?: boolean;
}) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-6">
      <span className="sr-only">Carregando</span>

      <CoroaSvg
        className={`anima-respira h-12 w-auto ${escuro ? "text-cream" : "text-espresso"}`}
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
