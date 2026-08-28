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
      "Não. O almoço é servido no salão, por ordem de chegada, todos os dias. Se for um grupo grande, vale avisar pelo telefone.",
  },
  {
    pergunta: "Vocês entregam?",
    resposta:
      "Sim, pelo iFood e pelo 99Food — os dois links estão no rodapé desta página. Encomenda de bolo, salgado, frango e pernil é combinada pelo telefone e retirada na loja.",
  },
  {
    pergunta: "Aceitam cartão?",
    resposta: "Sim, cartão de crédito e débito.",
  },
  {
    pergunta: "Tem opção sem açúcar ou sem lactose?",
    resposta:
      "Sim. É uma das coisas que os clientes mais comentam nas avaliações. A variedade muda de um dia para o outro — vale perguntar no balcão.",
  },
];
