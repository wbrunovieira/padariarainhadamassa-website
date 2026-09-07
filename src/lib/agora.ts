/**
 * O relógio de Petrópolis, num lugar só.
 *
 * O fuso estava escrito à mão em seis funções espalhadas por três módulos —
 * e ainda havia `expediente.fuso` em site.ts, usado por um só. Cada uma
 * construía o próprio `Intl.DateTimeFormat` com o mesmo timeZone.
 *
 * Além da duplicação, havia um custo real: dois `getSnapshot` de
 * `useSyncExternalStore` passam por aqui — `estadoAgora` (open-now.tsx, via
 * expediente.ts) e `diaEmPetropolis` (lunch-section.tsx) — e rodam a cada
 * render. Construir um `Intl.DateTimeFormat` é caro, e antes cada chamada
 * criava o seu. Aqui os formatadores nascem uma vez, no módulo.
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
const DIAS_EN: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};
export function diaDaSemana(agora = new Date()) {
  const nome = diaPorExtenso(agora).replace("-feira", "");
  const i = DIAS.indexOf(nome);
  if (i >= 0) return i;
  /*
   * Rede de segurança para runtime sem dados de pt-BR (Node com small-icu,
   * WebView antiga): ali o Intl cai para inglês e a tabela acima não casa.
   * Sem isto, a resposta seria 0 — ou seja, DOMINGO TODO DIA, em silêncio,
   * e a seção de almoço mostraria o prato errado sem ninguém perceber.
   * en-US existe até no small-icu, então serve de chão.
   */
  const en = new Intl.DateTimeFormat("en-US", { timeZone: FUSO, weekday: "short" }).format(agora);
  return DIAS_EN[en] ?? 0;
}

/** Ano corrente em Petrópolis — o fuso de quem acessa não muda a conta. */
export function anoDeAgora(agora = new Date()) {
  return Number(fAno.format(agora));
}
