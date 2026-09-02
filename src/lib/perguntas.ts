/**
 * Perguntas frequentes.
 *
 * As respostas saem de fontes públicas: avaliações do Google, ficha do
 * Restaurant Guru e o que a própria padaria publica.
 * As perguntas de estacionamento e acessibilidade saíram a pedido do
 * cliente em 28/08/2026: as respostas vinham do Restaurant Guru e de uma
 * avaliação, não da padaria.
 */
export type Pergunta = { pergunta: string; resposta: string };

export const perguntas: Pergunta[] = [
  {
    pergunta: "Precisa reservar para almoçar?",
    resposta:
      "Não. O almoço é servido no salão, por ordem de chegada, de segunda a sábado. Se for um grupo grande, vale avisar pelo telefone.",
  },
  {
    pergunta: "Vocês entregam?",
    resposta:
      "Sim, pelo iFood e pelo 99Food — os dois links estão no rodapé desta página. Encomenda de bolo, torta e salgado é combinada pelo telefone ou WhatsApp e retirada na loja.",
  },
  {
    pergunta: "Aceitam cartão?",
    resposta:
      "Sim, cartão de crédito e débito, e também a maioria dos vouchers de alimentação do mercado.",
  },
  {
    // Sem lactose saiu em 02/09/2026: a cliente confirmou que NÃO tem.
    // Antes esta resposta dizia "sim" para as duas coisas.
    pergunta: "Tem opção sem açúcar?",
    resposta:
      "Sim. A variedade muda de um dia para o outro — vale perguntar no balcão.",
  },
];
