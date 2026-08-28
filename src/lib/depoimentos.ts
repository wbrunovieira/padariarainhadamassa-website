/**
 * Prova social.
 *
 * `temas` são as expressões que o Restaurant Guru aponta como mais
 * frequentes nas avaliações — dado agregado, não citação.
 *
 * Os três depoimentos são avaliações públicas de 5 estrelas no Google,
 * transcritas das capturas que o cliente enviou em 28/08/2026. Texto
 * literal, sem corte: o que está entre aspas foi escrito pela pessoa.
 */
export const temas = ["Ótimo serviço", "Equipe simpática", "Café da manhã", "Ambiente"];

export type Depoimento = {
  texto: string;
  autor: string;
  detalhe: string;
  quando: string;
};

export const depoimentos: Depoimento[] = [
  {
    texto:
      "Padaria maravilhosa! Sou do Rio. Me senti naquelas padarias de antigamente. A moça que atende foi super atenciosa e educada com os clientes. As meninas que fazem a comida também são simpáticas.",
    autor: "Bre Mi",
    detalhe: "Local Guide · 196 avaliações",
    quando: "há um ano",
  },
  {
    texto:
      "Atendimento muito bom! Funcionárias educadas e simpáticas, o ambiente foi reformado, ficou muito bom. Os produtos estão deliciosos. Adorei! Prestigiem o comércio local.",
    autor: "Nathalia Karl",
    detalhe: "Avaliação no Google",
    quando: "há quatro anos",
  },
  {
    texto:
      "Um local aconchegante e muito agradável, com funcionários extremamente atenciosos.",
    autor: "Renata Kally",
    detalhe: "Local Guide · 36 avaliações",
    quando: "há um ano",
  },
];
