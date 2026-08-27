/**
 * Perguntas frequentes.
 *
 * As respostas saem de fontes públicas: avaliações do Google, ficha do
 * Restaurant Guru e o que a própria padaria publica.
 * PENDENTE: o cliente precisa confirmar todas antes de virarem promessa —
 * principalmente estacionamento e acessibilidade, que vieram de terceiros.
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
      "Sim, pelo iFood. Encomenda de bolo, salgado, frango e pernil é combinada pelo telefone e retirada na loja.",
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
  {
    pergunta: "Tem estacionamento?",
    resposta:
      "Não temos estacionamento próprio, e as vagas na rua são disputadas. Se puder vir a pé ou de carona, é mais tranquilo.",
  },
  {
    pergunta: "A loja é acessível para cadeira de rodas?",
    resposta:
      "A entrada tem desnível e o espaço entre as mesas é apertado. Se precisar de apoio para entrar, ligue antes que a equipe ajuda.",
  },
];
