/**
 * Animação: a curva e o padrão de entrada, num lugar só.
 *
 * A curva vivia duplicada de duas formas — `ease-[cubic-bezier(...)]`
 * literal em 21 className e `const EASE` copiado em 12 componentes. Mudar a
 * animação do site custava 33 edições.
 *
 * No CSS a mesma curva é o token `--ease-crust` (globals.css), que o Tailwind
 * v4 transforma na utility `ease-crust`. São as duas pontas do mesmo valor:
 * ao mudar um, mude o outro.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Duração padrão das entradas, em segundos. */
export const DURACAO = 0.7;

type Reveal = {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; margin: string };
  transition: { duration: number; ease: typeof EASE; delay: number };
};

/**
 * Props de "aparecer ao rolar", prontas para espalhar num `motion.*`.
 *
 * Recebe `reduce` (de `useReducedMotion`) em vez de chamar o hook aqui: assim
 * continua sendo função pura, e o componente que já tem o valor não paga por
 * uma segunda assinatura.
 *
 * As seis cópias que isto substitui tinham deriva de copiar e colar — `y: 22`
 * em quatro e `y: 24` em duas, `margin` de -70px e -80px. Nada indicava que a
 * diferença fosse intencional; ficou a variante maioritária.
 */
export function revelar(reduce: boolean | null) {
  return (delay = 0): Reveal => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: {
      duration: reduce ? 0 : DURACAO,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });
}
