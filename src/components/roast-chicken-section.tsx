"use client";

import Image from "next/image";

import { MenuSection } from "@/components/menu-section";
import { frangoAssado } from "@/lib/cardapio";
import { site } from "@/lib/site";
/*
 * FOTO PROVISÓRIA. A cliente vai enviar a foto do frango assado.
 * Esta é a do prato do dia (frango ensopado) — serve de lugar-guardado para
 * a seção não nascer quebrada, mas mostra outro prato. Ao trocar, atualize
 * também `fotoAlt` e `fotoLegenda`, que descrevem a imagem de hoje.
 */
import fotoProvisoria from "@/assets/fotos/prato-do-dia.jpg";

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
      foto={fotoProvisoria}
      fotoAlt="Prato servido no salão da padaria, com frango, polenta, arroz e couve refogada"
      fotoLegenda="O almoço servido no salão"
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
