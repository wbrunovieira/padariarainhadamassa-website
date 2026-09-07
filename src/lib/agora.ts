/**
 * O relógio de Petrópolis, num lugar só.
 *
 * O fuso estava escrito à mão em seis funções espalhadas por três módulos —
 * e ainda havia `expediente.fuso` em site.ts, usado por um só. Cada uma
 * construía o próprio `Intl.DateTimeFormat` com o mesmo timeZone.
 *
 * Além da duplicação, havia um custo real: `minutosAgora` é chamada pelo
 * `getSnapshot` de um `useSyncExternalStore` (open-now.tsx), que roda a cada
 * render. Construir um `Intl.DateTimeFormat` é caro, e ali estava sendo
 * refeito toda vez. Aqui os formatadores são criados uma vez, no módulo.
 *
 * Tudo recebe `agora = new Date()` para dar teste sem mexer no relógio.
 */
export const FUSO = "America/Sao_Paulo";

const fHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: FUSO,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const fDiaSemana = new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, weekday: "long" });
const fAno = new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, year: "numeric" });

/** "06h30" vira 390. Minutos desde a meia-noite, em Petrópolis. */
export function minutosDoDia(agora = new Date()) {
  const [h, m] = fHora.format(agora).split(":").map(Number);
  return h * 60 + m;
}

/** "06:30" — hora de parede em Petrópolis. */
export function horaDoDia(agora = new Date()) {
  return fHora.format(agora);
}

/** "quinta-feira" */
export function diaPorExtenso(agora = new Date()) {
  return fDiaSemana.format(agora);
}

/**
 * 0 = domingo, igual ao `Date.getDay()`.
 *
 * Derivado do nome em pt-BR em vez de formatar em en-US e mapear
 * `{Sun:0, Mon:1, …}`, que era o caminho anterior — uma volta a mais para
 * chegar no mesmo lugar, e com uma segunda tabela para manter.
 */
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
export function diaDaSemana(agora = new Date()) {
  const nome = diaPorExtenso(agora).replace("-feira", "");
  const i = DIAS.indexOf(nome);
  return i >= 0 ? i : 0;
}

/** Ano corrente em Petrópolis — o fuso de quem acessa não muda a conta. */
export function anoDeAgora(agora = new Date()) {
  return Number(fAno.format(agora));
}
