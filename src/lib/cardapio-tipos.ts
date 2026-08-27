/**
 * Tipos e constantes do cardápio digital.
 *
 * Fica separado de `cardapio-digital.ts` de propósito: aquele importa
 * `node:fs` e só roda no servidor. Este aqui o /admin pode importar.
 */
export type Variacao = { rotulo: string; preco: number };

export type ItemCardapio = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
  variacoes?: Variacao[];
};

export type SecaoCardapio = {
  id: string;
  titulo: string;
  descricao: string;
  /** caminho de uma imagem em /public, ou "" para seção sem foto */
  foto?: string;
  ativo: boolean;
  itens: ItemCardapio[];
};

/** Fotos disponíveis para as seções, oferecidas no /admin. */
export const fotosDisponiveis = [
  { valor: "", rotulo: "Sem foto" },
  { valor: "/cardapio/cafe-da-manha.jpg", rotulo: "Pães franceses" },
  { valor: "/cardapio/almoco.jpg", rotulo: "Prato do dia" },
  { valor: "/cardapio/doces.jpg", rotulo: "Rocambole" },
  { valor: "/cardapio/salao.jpg", rotulo: "Salão" },
];

export type Cardapio = {
  atualizadoEm: string;
  aviso: string;
  secoes: SecaoCardapio[];
};

export const formatarPreco = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
