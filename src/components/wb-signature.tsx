import { ArrowUpRight, Code2, Heart } from "lucide-react";

type Props = {
  className?: string;
  /** `bare` tira a moldura, para rodapés discretos. */
  variant?: "framed" | "bare";
};

/**
 * Assinatura da WB Digital Solutions.
 *
 * Herda a cor do contexto via `currentColor`, então funciona em qualquer
 * fundo sem variante de cor. Componente compartilhado entre projetos —
 * ao alterar, vale replicar na origem.
 */
export default function WBSignature({
  className = "",
  variant = "framed",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-2 sm:flex-row sm:gap-3 ${className}`}
    >
      <span className="flex items-center gap-2 text-[0.7rem] opacity-60 sm:text-xs">
        <span className="font-light">Desenvolvido com</span>
        <span className="relative inline-flex">
          <Heart
            className="h-3 w-3 animate-pulse fill-current sm:h-3.5 sm:w-3.5"
            aria-label="amor"
          />
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse bg-current opacity-25 blur-sm"
          />
        </span>
        <span className="font-light">por</span>
      </span>

      <a
        href="https://www.wbdigitalsolutions.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group/wb relative inline-flex"
      >
        <span
          aria-hidden
          className="absolute -inset-2 hidden rounded-lg bg-current opacity-0 blur-xl transition duration-500 group-hover/wb:opacity-10 sm:block"
        />
        <span
          className={`relative flex items-center gap-1.5 transition-all duration-300 sm:gap-2 ${
            variant === "framed"
              ? "rounded-lg border border-current/20 bg-current/5 px-2 py-1 group-hover/wb:border-current/40 group-hover/wb:bg-current/10 sm:px-3 sm:py-1.5"
              : ""
          }`}
        >
          <Code2
            aria-hidden
            className="h-3 w-3 transition-transform duration-300 group-hover/wb:rotate-12 sm:h-4 sm:w-4"
          />
          <span className="text-[0.7rem] font-medium tracking-wide sm:text-xs">
            WB Digital Solutions
          </span>
          <ArrowUpRight
            aria-hidden
            className="h-2.5 w-2.5 opacity-60 transition-all duration-300 group-hover/wb:-translate-y-0.5 group-hover/wb:translate-x-0.5 group-hover/wb:opacity-100 sm:h-3 sm:w-3"
          />
        </span>
      </a>
    </div>
  );
}
