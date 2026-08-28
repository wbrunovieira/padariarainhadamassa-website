import { promises as fs } from "node:fs";
import path from "node:path";

import type { Cardapio } from "./cardapio-tipos";
import semente from "@/data/cardapio.json";

export * from "./cardapio-tipos";

/**
 * Onde o cardápio mora.
 *
 * Em produção (Vercel) o disco é somente leitura, então o cardápio vive
 * num blob. Em desenvolvimento, sem token, ele fica no arquivo do
 * repositório — assim dá para editar pelo /admin na máquina local.
 *
 * O JSON versionado é sempre a semente: se o blob ainda não existe, é ele
 * que aparece, e a primeira gravação no /admin cria o blob.
 */
const CAMINHO_BLOB = "cardapio/cardapio.json";
const ARQUIVO = path.join(process.cwd(), "src", "data", "cardapio.json");

const usaBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function lerDoBlob(): Promise<Cardapio | null> {
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CAMINHO_BLOB, limit: 1 });
    const alvo = blobs.find((b) => b.pathname === CAMINHO_BLOB);
    if (!alvo) return null;
    const r = await fetch(alvo.url, { cache: "no-store" });
    return r.ok ? ((await r.json()) as Cardapio) : null;
  } catch {
    return null;
  }
}

async function lerDoDisco(): Promise<Cardapio | null> {
  try {
    return JSON.parse(await fs.readFile(ARQUIVO, "utf-8")) as Cardapio;
  } catch {
    return null;
  }
}

export async function lerCardapio(): Promise<Cardapio> {
  const guardado = usaBlob() ? await lerDoBlob() : await lerDoDisco();
  return guardado ?? (semente as Cardapio);
}

export async function gravarCardapio(cardapio: Cardapio): Promise<void> {
  const doc: Cardapio = { ...cardapio, atualizadoEm: new Date().toISOString() };
  const conteudo = JSON.stringify(doc, null, 2) + "\n";

  if (usaBlob()) {
    const { put } = await import("@vercel/blob");
    await put(CAMINHO_BLOB, conteudo, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await fs.writeFile(ARQUIVO, conteudo, "utf-8");
}

/** Para a mensagem de erro do /admin dizer a verdade sobre o ambiente. */
export const armazenamento = () => (usaBlob() ? "blob" : "arquivo");
