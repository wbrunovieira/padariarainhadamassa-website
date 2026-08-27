/**
 * Itens do café da manhã, da confeitaria e da conveniência.
 *
 * Origem: fotos e posts publicados pela própria padaria e menções
 * recorrentes nas avaliações públicas do Google e do Restaurant Guru.
 * PENDENTE: passar a lista com o cliente antes de tratar como cardápio
 * oficial — e perguntar o que mais sai de manhã que não está aqui.
 */

export type Item = { nome: string; nota?: string };

export const cafeDaManha: Item[] = [
  { nome: "Pão francês", nota: "Sai do forno de hora em hora" },
  { nome: "Pão de queijo", nota: "Quentinho, com café" },
  { nome: "Pão na chapa", nota: "Com manteiga na chapa" },
  { nome: "Pão doce", nota: "Com goiabada, polvilhado de açúcar" },
  { nome: "Lanche gratinado", nota: "Queijo e batata palha por cima" },
  { nome: "Café", nota: "Coado na hora" },
];

export const confeitaria: Item[] = [
  { nome: "Bolos", nota: "Chocolate, fubá e o que o dia pedir" },
  { nome: "Tortas", nota: "Doces e salgadas, na fatia ou inteiras" },
  { nome: "Rocambole", nota: "De goiabada com coco" },
  { nome: "Fios de ovos", nota: "Dos mais citados pelos clientes" },
  { nome: "Sonhos e folhados", nota: "Do balcão de doces" },
  { nome: "Sorvete a quilo", nota: "Você monta o pote" },
];

/** Conveniência: o que mais tem na loja além da padaria. */
export const tambemTem: Item[] = [
  { nome: "Açaí" },
  { nome: "Sorvete" },
  { nome: "Bebidas geladas" },
  { nome: "Mercearia do dia a dia" },
  { nome: "Opções sem açúcar" },
  { nome: "Opções sem lactose" },
];
