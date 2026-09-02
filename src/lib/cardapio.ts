/**
 * Itens do café da manhã, da confeitaria e da conveniência.
 *
 * `maisNoCardapio` sai do cardápio oficial que o cliente passou em
 * 27/08/2026 — docs/cardapio/cardapio-rainha-da-massa.pdf.
 * Sem preços por decisão do cliente.
 *
 * `cafeDaManha` deixou de ser recorte só do PDF: em 02/09/2026 eram seis
 * itens de pão. Os pães viraram uma linha só, com as variações na `nota` e
 * reticências para indicar que há mais no balcão, e entraram salgados, bolos
 * e pizza. Pizza foi confirmada pela cliente nessa data, depois de ter sido
 * removida do site por falta de confirmação.
 *
 * `confeitaria` e `tambemTem` ainda vêm das fotos, dos posts e das
 * avaliações. PENDENTE: confirmar com o cliente.
 */

export type Item = { nome: string; nota?: string };

export const cafeDaManha: Item[] = [
  { nome: "Pães", nota: "Com manteiga, na chapa, com ovo…" },
  { nome: "Salgados diversos" },
  { nome: "Bolos" },
  { nome: "Pizza" },
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

/**
 * O frango assado de domingo. Só o que a cliente confirmou em 02/09/2026:
 * frango assado, com maionese e salpicão vendidos a quilo. O frango NÃO é
 * a quilo — foi a correção dela. Nada sobre tempero, forno ou modo de
 * preparo entra aqui sem ela dizer: "assamos frango e pernil" já foi uma
 * afirmação inventada que precisou ser removida do site (ver
 * docs/fatos-confirmados.md).
 */
export const frangoAssado: Item[] = [
  { nome: "Frango assado" },
  { nome: "Maionese", nota: "A quilo" },
  { nome: "Salpicão", nota: "A quilo" },
];

export const confeitaria: Item[] = [
  { nome: "Bolos", nota: "Chocolate, fubá e o que o dia pedir" },
  { nome: "Tortas", nota: "Doces e salgadas, na fatia ou inteiras" },
  { nome: "Rocambole", nota: "De goiabada com coco ou de doce de leite" },
  { nome: "Sonhos e folhados", nota: "Do balcão de doces" },
];

/**
 * Conveniência: o que mais tem na loja além da padaria.
 *
 * "Tabacaria" aparece como menção neutra, sem imagem de produto, preço
 * ou apelo de compra. A Lei 9.294/1996, com a redação da Lei 10.167/2000,
 * proíbe propaganda de cigarro em qualquer meio e só permite a exposição
 * no ponto de venda — uma seção própria com foto de maço e chamada de
 * venda seria propaganda. Ver docs/fotos-cliente/LEIA-ME.md.
 */
export const tambemTem: Item[] = [
  { nome: "Açaí" },
  { nome: "Tabacaria" },
  { nome: "Sorvete" }, // PENDENTE: confirmar se é picolé/pote de marca ou próprio
  { nome: "Bebidas geladas" },
  { nome: "Mercearia do dia a dia" },
  { nome: "Opções sem açúcar" },
];
