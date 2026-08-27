/**
 * Itens do café da manhã, da confeitaria e da conveniência.
 *
 * `cafeDaManha` e `maisNoCardapio` saem do cardápio oficial que o cliente
 * passou em 27/08/2026 — docs/cardapio/cardapio-rainha-da-massa.pdf.
 * Sem preços por decisão do cliente.
 *
 * `confeitaria` e `tambemTem` ainda vêm das fotos, dos posts e das
 * avaliações. PENDENTE: confirmar com o cliente.
 */

export type Item = { nome: string; nota?: string };

export const cafeDaManha: Item[] = [
  { nome: "Pão com manteiga" },
  { nome: "Pão na chapa" },
  { nome: "Pão com ovo" },
  { nome: "Pão com ovo e queijo" },
  { nome: "Pão com polenguinho" },
  { nome: "Pão de queijo" },
];

/**
 * As outras famílias do cardápio da lanchonete. Servem para deixar claro
 * que a lista acima é um recorte, não o cardápio inteiro.
 */
export const maisNoCardapio = [
  "Sanduíches",
  "Omeletes",
  "Salgados fritos e assados",
  "Empadão",
  "Cafezinho, expresso e cappuccino",
  "Chocolate quente",
  "Sucos naturais e vitaminas",
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
