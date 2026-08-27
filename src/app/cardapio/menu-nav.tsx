"use client";

import { useEffect, useRef, useState } from "react";

type Aba = { id: string; titulo: string };

/** Abas grudadas no topo, que acompanham a seção visível. */
export function MenuNav({ abas }: { abas: Aba[] }) {
  const [ativa, setAtiva] = useState(abas[0]?.id ?? "");
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

  /*
   * Mantém a aba ativa à vista no trilho.
   *
   * Aqui era scrollIntoView, e ele roubava a rolagem da página: a cada troca
   * de seção o navegador reposicionava o documento inteiro, matando o impulso
   * do dedo e cancelando o salto do clique na aba. Agora só mexe no
   * scrollLeft do trilho, que não toca no scroll do documento.
   */
  useEffect(() => {
    const t = trilho.current;
    const botao = t?.querySelector<HTMLElement>(`[data-aba="${ativa}"]`);
    if (!t || !botao) return;
    const destino = botao.offsetLeft - (t.clientWidth - botao.clientWidth) / 2;
    t.scrollTo({ left: Math.max(0, destino), behavior: "smooth" });
  }, [ativa]);

  return (
    <div className="sticky top-0 z-30 border-b border-espresso/12 bg-cream-light/92 backdrop-blur-md">
      <div
        ref={trilho}
        className="scrollbar-none mx-auto flex max-w-4xl gap-1.5 overflow-x-auto px-3 py-2"
      >
        {abas.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            data-aba={a.id}
            aria-current={ativa === a.id ? "true" : undefined}
            className={[
              "flex min-h-11 shrink-0 items-center rounded-full px-4 text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
              ativa === a.id
                ? "bg-espresso text-cream"
                : "text-espresso-soft hover:bg-espresso/8 hover:text-espresso",
            ].join(" ")}
          >
            {a.titulo}
          </a>
        ))}
      </div>
    </div>
  );
}
