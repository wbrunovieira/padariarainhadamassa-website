import { minutosDoDia } from "@/lib/agora";
import { expediente, site } from "./site";

export type Estado = {
  aberto: boolean;
  /** frase curta pronta para exibir */
  texto: string;
};

/**
 * Hora local em Petrópolis como número com fração — 6h30 vira 6.5.
 *
 * Reaproveita o formatador de `agora.ts` em vez de construir o próprio. Esta
 * função é o caminho quente de verdade do site: `estadoAgora` é o
 * `getSnapshot` do `useSyncExternalStore` em `open-now.tsx`, que roda a cada
 * render, e antes cada chamada criava um `Intl.DateTimeFormat` novo.
 */
function horaEmPetropolis(agora: Date) {
  return minutosDoDia(agora) / 60;
}

export function estadoAgora(agora = new Date()): Estado {
  const h = horaEmPetropolis(agora);
  if (h >= expediente.abre && h < expediente.fecha) {
    return { aberto: true, texto: `Aberto agora · fecha às ${expediente.fecha}h` };
  }
  return {
    aberto: false,
    texto:
      h < expediente.abre
        ? `Fechado · abre às ${expediente.abre}h`
        : `Fechado · abre amanhã às ${expediente.abre}h`,
  };
}

export const horarioTexto = site.hours;
