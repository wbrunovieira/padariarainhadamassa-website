"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { Item } from "@/lib/cardapio";
import { EASE, revelar } from "@/lib/animacao";

type Props = {
  id: string;
  sobretitulo: string;
  marca?: ReactNode;
  titulo: ReactNode;
  texto: ReactNode;
  itens: Item[];
  foto: StaticImageData;
  /**
   * Se vier, um vídeo em loop entra no lugar da foto — e a foto passa a ser
   * o poster dele, o que aparece antes de o vídeo carregar.
   */
  video?: string;
  /**
   * Proporção da moldura da mídia. O padrão serve às fotos, que são
   * paisagem; vídeo de celular é retrato e pede uma caixa mais estreita,
   * senão o object-cover amplia demais e come as bordas.
   */
  proporcao?: string;
  /** Largura máxima da moldura, para a mídia não dominar a seção. */
  midiaMax?: string;
  fotoAlt: string;
  fotoLegenda: string;
  /** true põe a foto à direita */
  invertido?: boolean;
  fundo?: string;
  rodape?: ReactNode;
};

/**
 * Molde comum do café da manhã, da confeitaria e do frango de domingo.
 *
 * É client component de propósito (usa `useReducedMotion` e `motion`). As
 * seções que o chamam NÃO são — elas só montam props.
 *
 * Medido ao mover essas seções para o servidor: os chunks de JS encolheram
 * ~1,6 KB gzip, mas o HTML de `/` cresceu ~2,5 KB e o payload RSC ~6,8 KB.
 * Ou seja, numa primeira visita o saldo é NEGATIVO em ~1 KB. A troca não foi
 * feita por bytes — foi por sinal: `"use client"` estava em 19 de 25
 * componentes e tinha deixado de significar alguma coisa.
 */
export function MenuSection({
  id,
  sobretitulo,
  marca,
  titulo,
  texto,
  itens,
  foto,
  video,
  proporcao = "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
  midiaMax = "",
  fotoAlt,
  fotoLegenda,
  invertido = false,
  fundo = "",
  rodape,
}: Props) {
  const reduce = useReducedMotion();

  const reveal = revelar(reduce);

  return (
    <section id={id} className={`border-t border-espresso/10 ${fundo}`}>
      <div className="mx-auto max-w-[88rem] px-5 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            {...reveal(0.1)}
            className={invertido ? "lg:order-2" : undefined}
          >
            <div
              className={`group relative overflow-hidden rounded-b-3xl rounded-t-[6rem] border border-espresso/12 bg-cream-deep lg:rounded-t-[8rem] ${midiaMax}`}
            >
              {video ? (
                /*
                 * `autoPlay` só quando o sistema não pede menos movimento —
                 * senão fica o poster parado, que é o primeiro quadro do
                 * próprio loop, então ninguém percebe a diferença.
                 */
                <video
                  src={video}
                  poster={foto.src}
                  autoPlay={!reduce}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={fotoAlt}
                  className={`w-full object-cover transition-transform duration-[1100ms] ease-crust group-hover:scale-[1.04] ${proporcao}`}
                />
              ) : (
                <Image
                  src={foto}
                  alt={fotoAlt}
                  placeholder="blur"
                  quality={68}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className={`w-full object-cover transition-transform duration-[1100ms] ease-crust group-hover:scale-[1.04] ${proporcao}`}
                />
              )}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent p-6 pt-20">
                <span className="eyebrow text-cream">{fotoLegenda}</span>
              </span>
            </div>
          </motion.div>

          <div className={invertido ? "lg:order-1" : undefined}>
            <motion.p
              {...reveal()}
              className="eyebrow flex items-center gap-2.5 text-gold"
            >
              {marca}
              {sobretitulo}
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              className="mt-6 font-display text-4xl leading-[1.03] tracking-tight text-espresso sm:text-5xl"
            >
              {titulo}
            </motion.h2>

            <motion.div
              {...reveal(0.12)}
              className="mt-7 max-w-lg text-lg leading-relaxed text-espresso-soft"
            >
              {texto}
            </motion.div>

            <ul className="mt-10 border-t border-espresso/15">
              {itens.map((item, i) => (
                <motion.li
                  key={item.nome}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    ease: EASE,
                    delay: reduce ? 0 : 0.14 + i * 0.04,
                  }}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-espresso/12 py-4"
                >
                  <span className="font-display text-xl italic text-espresso sm:text-2xl">
                    {item.nome}
                  </span>
                  {item.nota && (
                    <span className="text-sm text-espresso-soft">{item.nota}</span>
                  )}
                </motion.li>
              ))}
            </ul>

            {rodape && <motion.div {...reveal(0.2)}>{rodape}</motion.div>}
          </div>
        </div>
      </div>
    </section>
  );
}
