"use client";

import { motion, useReducedMotion } from "motion/react";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappCom } from "@/lib/site";

/*
 * O verde é o da marca do WhatsApp (#25D366), de propósito fora da paleta
 * da padaria: o botão precisa ser reconhecido de relance, e é o único
 * elemento do site que fala por outra marca.
 */
const VERDE = "#25D366";
const VERDE_ESCURO = "#1da851";

/** Mensagem já escrita. Curta de propósito — quem chega só precisa enviar. */
const MENSAGEM = "Oi! Vim pelo site 🙂";

export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const url = whatsappCom(MENSAGEM);

  // Sem número em `site.whatsapp`, o botão não existe.
  if (!url) return null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a padaria no WhatsApp"
      initial={reduce ? false : { opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : 1.4,
      }}
      /*
       * z-30 fica abaixo do cabeçalho (z-50) e do menu mobile (z-40): com o
       * menu aberto o botão some atrás do overlay, em vez de flutuar sobre ele.
       * O bottom usa safe-area para não cair sob a barra do iPhone.
       */
      className="group fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-30 flex items-center gap-0 rounded-full py-4 pl-4 pr-4 text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] transition-[background-color,gap,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-2.5 hover:pr-6 focus-visible:gap-2.5 focus-visible:pr-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      style={{ backgroundColor: VERDE }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = VERDE_ESCURO;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = VERDE;
      }}
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      {/*
        O rótulo abre no hover e no foco pelo teclado. Fica em max-w-0 em vez
        de display:none para a transição ter o que animar.
      */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium tracking-wide opacity-0 transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[11rem] group-hover:opacity-100 group-focus-visible:max-w-[11rem] group-focus-visible:opacity-100">
        Falar no WhatsApp
      </span>
    </motion.a>
  );
}
