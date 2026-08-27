"use client";

import Image from "next/image";

import { MenuSection } from "@/components/menu-section";
import { OpenNow } from "@/components/open-now";
import { cafeDaManha } from "@/lib/cardapio";
import paesFranceses from "@/assets/fotos/paes-franceses.jpg";

export function BreakfastSection() {
  return (
    <MenuSection
      id="cafe-da-manha"
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
            pão francês quente e o café passado na hora. Dá para comer sentado
            no salão antes de seguir o dia.
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
    />
  );
}
