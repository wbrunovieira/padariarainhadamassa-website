"use client";

import Image from "next/image";

import { MenuSection } from "@/components/menu-section";
import { frangoAssado } from "@/lib/cardapio";
import { site } from "@/lib/site";
// Vídeo da rotisserie, enviado pela cliente em 02/09/2026. O JPG é o
// primeiro quadro do próprio loop, e serve de poster.
import posterFrango from "@/assets/fotos/frango-assado.jpg";

export function RoastChickenSection() {
  return (
    <MenuSection
      id="frango-assado"
      fundo="bg-gradient-to-b from-cream via-cream-light to-cream"
      sobretitulo="Domingo · frango assado"
      marca={
        <Image
          src="/brand/ornamento-coroa.png"
          alt=""
          width={480}
          height={199}
          className="h-3 w-auto opacity-80"
        />
      }
      titulo={
        <>
          Domingo é dia de
          <span className="block italic text-ink">frango assado.</span>
        </>
      }
      texto={
        <>
          <p>
            O clássico que resolve o almoço de domingo sem ninguém precisar
            acender o fogão. Você passa no balcão, escolhe e leva pronto.
          </p>
          <p className="mt-5">
            A maionese e o salpicão saem a quilo — dá para levar a medida da
            sua mesa, do almoço de duas pessoas ao da família inteira.
          </p>
        </>
      }
      itens={frangoAssado}
      foto={posterFrango}
      video="/video/frango-assado.mp4"
      fotoAlt="Frangos temperados girando nos espetos da rotisserie da padaria"
      fotoLegenda="Os frangos na rotisserie"
      rodape={
        <div className="mt-10 rounded-2xl bg-espresso/[0.05] px-6 py-6">
          <p className="text-sm leading-relaxed text-espresso-soft/85">
            Domingo o balcão abre no mesmo horário de sempre, {site.hoursShort}.
            Para encomendar, é só ligar:{" "}
            <a
              href={site.phoneHref}
              className="text-espresso underline decoration-gold/60 underline-offset-4 transition-colors hover:decoration-gold"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>
      }
    />
  );
}
