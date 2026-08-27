import { NextResponse } from "next/server";

import { criarSessao, encerrarSessao, senhaCorreta, sessaoValida } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ autenticado: await sessaoValida() });
}

export async function POST(req: Request) {
  const { senha } = (await req.json().catch(() => ({}))) as { senha?: string };
  if (!senha || !senhaCorreta(senha)) {
    // atraso curto para desestimular tentativa em série
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ erro: "Senha incorreta." }, { status: 401 });
  }
  await criarSessao();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await encerrarSessao();
  return NextResponse.json({ ok: true });
}
