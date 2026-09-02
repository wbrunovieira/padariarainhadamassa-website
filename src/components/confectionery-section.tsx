"use client";

import { Wheat } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { MenuSection } from "@/components/menu-section";
import { confeitaria, tambemTem } from "@/lib/cardapio";
import { site } from "@/lib/site";
import rocambole from "@/assets/fotos/rocambole.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ConfectionerySection() {
  const reduce = useReducedMotion();

  return (
    <MenuSection
      id="confeitaria"
      invertido
      fundo="bg-gradient-to-b from-cream-deep/50 via-cream-deep/15 to-cream"
      sobretitulo="Confeitaria"
      marca={<Wheat className="size-4" strokeWidth={1.6} aria-hidden />}
      titulo={
        <>
          Bolos, tortas e doces —
          <span className="block italic text-ink">a outra metade do nome da casa.</span>
        </>
      }
      texto={
        <p>
          Rainha da <em className="not-italic">Massa</em> é padaria e confeitaria
          desde {site.since}. O balcão de doces trabalha o dia inteiro: bolo para levar
          na fatia, torta para a mesa, rocambole, sonho e folhados.
        </p>
      }
      itens={confeitaria}
      foto={rocambole}
      fotoAlt="Fatia de rocambole de goiabada com coco ralado, segurada em um prato à frente da fachada da padaria"
      fotoLegenda="Rocambole de goiabada com coco"
      rodape={
        <div className="mt-12 rounded-2xl bg-espresso/[0.05] px-6 py-6">
          <p className="eyebrow flex items-center gap-2 text-espresso-soft/70">
            <Wheat className="size-4 text-gold" strokeWidth={1.6} aria-hidden />
            Na loja também tem
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {tambemTem.map((item, i) => (
              <motion.li
                key={item.nome}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  ease: EASE,
                  delay: reduce ? 0 : i * 0.05,
                }}
                className="rounded-full border border-espresso/20 px-4 py-2 text-sm tracking-wide text-espresso-soft transition-colors duration-300 hover:border-gold hover:text-espresso"
              >
                {item.nome}
              </motion.li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
