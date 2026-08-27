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

export const acompanhamentos =
  "Arroz, feijão, batata frita ou batata palha e salada — de legumes, alface e tomate, ou os dois juntos.";

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
