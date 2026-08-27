import { promises as fs } from "node:fs";
import path from "node:path";

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
  ativo: boolean;
  itens: ItemCardapio[];
};

export type Cardapio = {
  atualizadoEm: string;
  aviso: string;
  secoes: SecaoCardapio[];
};

const ARQUIVO = path.join(process.cwd(), "data", "cardapio.json");

/**
 * Guarda o cardápio num JSON no disco.
 *
 * ATENÇÃO PARA O DEPLOY: em hospedagem serverless — Vercel incluída — o disco
 * é somente leitura e efêmero. Ler funciona; gravar pelo /admin, não. Para
 * produção é preciso trocar `gravar` por um armazenamento de verdade
 * (Vercel Blob, um banco, ou commit no repositório pela API do GitHub).
 * O resto do código não muda: só estas duas funções.
 */
export async function lerCardapio(): Promise<Cardapio> {
  const bruto = await fs.readFile(ARQUIVO, "utf-8");
  return JSON.parse(bruto) as Cardapio;
}

export async function gravarCardapio(cardapio: Cardapio): Promise<void> {
  const doc: Cardapio = { ...cardapio, atualizadoEm: new Date().toISOString() };
  await fs.writeFile(ARQUIVO, JSON.stringify(doc, null, 2) + "\n", "utf-8");
}

export const formatarPreco = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Só o que está ativo, para a página pública. */
export function somenteAtivos(c: Cardapio): Cardapio {
  return {
    ...c,
    secoes: c.secoes
      .filter((s) => s.ativo)
      .map((s) => ({ ...s, itens: s.itens.filter((i) => i.ativo) }))
      .filter((s) => s.itens.length > 0),
  };
}
