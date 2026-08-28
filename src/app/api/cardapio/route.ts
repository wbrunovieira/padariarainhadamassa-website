import { NextResponse } from "next/server";

import { sessaoValida } from "@/lib/admin-auth";
import {
  armazenamento,
  gravarCardapio,
  lerCardapio,
  type Cardapio,
} from "@/lib/cardapio-digital";

export async function GET() {
  if (!(await sessaoValida())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json(await lerCardapio());
}

export async function PUT(req: Request) {
  if (!(await sessaoValida())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }

  const corpo = (await req.json().catch(() => null)) as Cardapio | null;
  if (!corpo || !Array.isArray(corpo.secoes)) {
    return NextResponse.json({ erro: "Formato inválido." }, { status: 400 });
  }

  // saneamento: nada entra sem passar por aqui
  const limpo: Cardapio = {
    atualizadoEm: new Date().toISOString(),
    aviso: String(corpo.aviso ?? "").slice(0, 240),
    secoes: corpo.secoes.slice(0, 40).map((s, i) => ({
      id: String(s.id || `secao-${i}`).slice(0, 60),
      titulo: String(s.titulo ?? "").slice(0, 80),
      descricao: String(s.descricao ?? "").slice(0, 240),
      // só caminho interno: nada de URL externa entrando por aqui
      foto: /^\/[\w./-]*$/.test(String(s.foto ?? "")) ? String(s.foto).slice(0, 160) : "",
      horario: {
        rotulo: String(s.horario?.rotulo ?? "").slice(0, 40),
        de: /^\d{2}:\d{2}$/.test(String(s.horario?.de ?? "")) ? String(s.horario!.de) : "",
        ate: /^\d{2}:\d{2}$/.test(String(s.horario?.ate ?? "")) ? String(s.horario!.ate) : "",
      },
      ativo: Boolean(s.ativo),
      itens: (s.itens ?? []).slice(0, 120).map((it, j) => ({
        id: String(it.id || `item-${j}`).slice(0, 60),
        nome: String(it.nome ?? "").slice(0, 90),
        descricao: String(it.descricao ?? "").slice(0, 200),
        preco: Number.isFinite(Number(it.preco)) ? Math.max(0, Number(it.preco)) : 0,
        ativo: Boolean(it.ativo),
        ...(it.variacoes?.length
          ? {
              variacoes: it.variacoes.slice(0, 6).map((v) => ({
                rotulo: String(v.rotulo ?? "").slice(0, 40),
                preco: Number.isFinite(Number(v.preco)) ? Math.max(0, Number(v.preco)) : 0,
              })),
            }
          : {}),
      })),
    })),
  };

  try {
    await gravarCardapio(limpo);
  } catch (e) {
    return NextResponse.json(
      {
        erro:
          armazenamento() === "blob"
            ? "Não foi possível gravar no armazenamento. Tente de novo em alguns segundos."
            : "Não foi possível gravar o arquivo. Em hospedagem serverless o disco é somente leitura: falta configurar o Vercel Blob (BLOB_READ_WRITE_TOKEN).",
        detalhe: e instanceof Error ? e.message : String(e),
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, atualizadoEm: limpo.atualizadoEm });
}
