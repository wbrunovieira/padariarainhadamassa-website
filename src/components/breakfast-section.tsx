"use client";

import Image from "next/image";

import { MenuSection } from "@/components/menu-section";
import { OpenNow } from "@/components/open-now";
import { DeliveryLinks } from "@/components/delivery-links";
import { cafeDaManha, maisNoCardapio } from "@/lib/cardapio";
import paesFranceses from "@/assets/fotos/paes-franceses.jpg";

export function BreakfastSection() {
  return (
    <MenuSection
      id="cafe-da-manha"
      fundo="bg-gradient-to-br from-cream-light via-cream to-cream-deep/30"
      sobretitulo="Café da manhã · desde as 6h"
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
          A luz acende às seis,
          <span className="block italic text-ink">e o pão já está saindo.</span>
        </>
      }
      texto={
        <>
          <p>
            É o que a cidade mais lembra da Rainha da Massa: a fila da manhã, o
            pão quente e o café na xícara. Dá para comer sentado no salão antes
            de seguir o dia.
          </p>
          <p className="mt-5">
            <OpenNow className="text-base text-espresso" />
          </p>
        </>
      }
      itens={cafeDaManha}
      foto={paesFranceses}
      fotoAlt="Cesta cheia de pães franceses recém-saídos do forno, segurada por um funcionário da padaria"
      fotoLegenda="A fornada de pão francês"
      rodape={
        <div className="mt-10 rounded-2xl bg-espresso/[0.05] px-6 py-6">
          <p className="eyebrow text-espresso-soft/70">
            E o cardápio não para aí
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {maisNoCardapio.map((item) => (
              <li
                key={item}
                className="rounded-full border border-espresso/20 px-4 py-2 text-sm tracking-wide text-espresso-soft"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-espresso-soft/85">
            O cardápio completo, com os preços, está no balcão e no {" "}
            <DeliveryLinks />.
          </p>
        </div>
      }
    />
  );
}
