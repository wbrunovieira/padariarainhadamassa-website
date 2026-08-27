/**
 * Prova social.
 *
 * `temas` são as expressões que o Restaurant Guru aponta como mais
 * frequentes nas avaliações. `depoimentos` são avaliações públicas do
 * Google, citadas com autoria.
 *
 * PENDENTE: o cliente deve reivindicar o perfil do Google e autorizar a
 * citação, ou substituir por depoimentos coletados por ele. Ver
 * docs/diagnostico-presenca-digital.html.
 */
export const temas = ["Ótimo serviço", "Equipe simpática", "Café da manhã", "Variedade"];

export type Depoimento = { texto: string; autor: string; origem: string };

export const depoimentos: Depoimento[] = [
  {
    texto:
      "Tem sorvete a quilo, existem várias opções, muito bom o lugar. Opções sem adição de açúcar, sem lactose. Muito bom, vale a pena experimentar.",
    autor: "Fabio Gonçalves da Silva",
    origem: "Avaliação no Google",
  },
];
