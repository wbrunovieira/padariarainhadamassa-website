"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Aba = { id: string; titulo: string };

/** Abas grudadas no topo, que acompanham a seção visível. */
export function MenuNav({ abas }: { abas: Aba[] }) {
  const [ativa, setAtiva] = useState(abas[0]?.id ?? "");
  const [risco, setRisco] = useState({ x: 0, w: 0 });
  const trilho = useRef<HTMLDivElement>(null);
  const visiveis = useRef(new Map<string, boolean>());

  useEffect(() => {
    const alvos = abas
      .map((a) => document.getElementById(a.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) visiveis.current.set(e.target.id, e.isIntersecting);
        const primeira = abas.find((a) => visiveis.current.get(a.id));
        if (primeira) setAtiva(primeira.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 },
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [abas]);

  const posicionar = useCallback(() => {
    const t = trilho.current;
    const botao = t?.querySelector<HTMLElement>(`[data-aba="${ativa}"]`);
    if (!t || !botao) return;
    setRisco({ x: botao.offsetLeft, w: botao.clientWidth });
    /*
     * Só o scrollLeft do trilho. scrollIntoView reposicionaria todos os
     * contêineres de rolagem acima — o documento inclusive — e roubaria a
     * rolagem da página.
     */
    const destino = botao.offsetLeft - (t.clientWidth - botao.clientWidth) / 2;
    t.scrollTo({ left: Math.max(0, destino), behavior: "smooth" });
  }, [ativa]);

  useLayoutEffect(posicionar, [posicionar]);

  useEffect(() => {
    window.addEventListener("resize", posicionar);
    return () => window.removeEventListener("resize", posicionar);
  }, [posicionar]);

  return (
    <div className="sticky top-0 z-30 border-b border-espresso/12 bg-cream-light shadow-[0_10px_18px_-16px_rgba(44,32,26,0.55)]">
      <div
        ref={trilho}
        className="scrollbar-none trilho-abas relative mx-auto flex max-w-4xl gap-1 overflow-x-auto px-3 py-1.5"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-gold transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            width: 1,
            transform: `translateX(${risco.x}px) scaleX(${risco.w})`,
            transformOrigin: "left",
          }}
        />
        {abas.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            data-aba={a.id}
            aria-current={ativa === a.id ? "true" : undefined}
            className={[
              "flex min-h-11 shrink-0 items-center px-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
              ativa === a.id ? "text-espresso" : "text-espresso-soft/65",
            ].join(" ")}
          >
            {a.titulo}
          </a>
        ))}
      </div>
    </div>
  );
}
