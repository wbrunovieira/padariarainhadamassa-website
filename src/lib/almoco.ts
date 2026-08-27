/**
 * Cardápio do almoço, passado pela padaria em 27/08/2026.
 * PENDENTE: os preços. As artes de cardápio traziam R$ 27 no prato do dia
 * e R$ 35 na feijoada, mas são de data incerta — não publicar sem
 * confirmar, preço errado no site vira atrito no balcão.
 */

export const fixos = [
  { nome: "Frango grelhado" },
  { nome: "Frango à milanesa" },
  { nome: "Frango à parmegiana" },
  { nome: "Contra-filé" },
];

/**
 * Guarnição dos quatro pratos fixos. O prato do dia tem acompanhamento
 * próprio, que muda com o dia — confirmado pelo cliente em 27/08/2026.
 */
export const acompanhamentos =
  "arroz, feijão, batata frita ou batata palha e salada — de legumes, alface e tomate, ou os dois juntos.";

/** Dia da semana em Petrópolis, independente do fuso de quem acessa. */
export function diaEmPetropolis(agora = new Date()): number {
  const nome = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
  }).format(agora);
  const mapa: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return mapa[nome] ?? 0;
}

export type PratoDoDia = {
  /** 0 = domingo, igual ao Date.getDay() */
  dia: number;
  nome: string;
  prato: string;
  detalhe: string;
};

export const semana: PratoDoDia[] = [
  {
    dia: 1,
    nome: "Segunda",
    prato: "Sobrecoxa de frango",
    detalhe: "Com maionese ou salpicão, arroz e feijão",
  },
  {
    dia: 2,
    nome: "Terça",
    prato: "Carré",
    detalhe: "Com tutu, couve, arroz e feijão",
  },
  {
    dia: 3,
    nome: "Quarta",
    prato: "Carne assada",
    detalhe: "Com nhoque ou espaguete",
  },
  {
    dia: 4,
    nome: "Quinta",
    prato: "Strogonoff",
    detalhe: "De frango ou de carne, com batata palha ou frita — muda a cada semana",
  },
  {
    dia: 5,
    nome: "Sexta",
    prato: "Feijoada",
    detalhe: "A feijoada da casa, com os acompanhamentos",
  },
  {
    dia: 6,
    nome: "Sábado",
    prato: "Filé de tilápia empanado",
    detalhe: "Com purê de batata, arroz e feijão",
  },
  {
    dia: 0,
    nome: "Domingo",
    prato: "Frango assado a quilo",
    detalhe: "Com maionese e salpicão",
  },
];
