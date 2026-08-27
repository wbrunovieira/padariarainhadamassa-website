import { expediente, site } from "./site";

export type Estado = {
  aberto: boolean;
  /** frase curta pronta para exibir */
  texto: string;
};

/** Hora local em Petrópolis, independente do fuso do aparelho. */
function horaEmPetropolis(agora: Date) {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: expediente.fuso,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(agora);
  const hora = Number(partes.find((p) => p.type === "hour")?.value ?? 0);
  const minuto = Number(partes.find((p) => p.type === "minute")?.value ?? 0);
  return hora + minuto / 60;
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
