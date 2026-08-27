import { promises as fs } from "node:fs";
import path from "node:path";

import type { Cardapio } from "./cardapio-tipos";

export * from "./cardapio-tipos";

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
