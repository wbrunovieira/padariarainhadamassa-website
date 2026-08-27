import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "rm_admin";
const DURACAO = 60 * 60 * 8; // 8 horas

function segredo() {
  const s = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("Defina ADMIN_PASSWORD (e de preferência ADMIN_SECRET) no ambiente.");
  return s;
}

function assinar(valor: string) {
  return createHmac("sha256", segredo()).update(valor).digest("hex");
}

function iguais(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function senhaCorreta(tentativa: string) {
  const esperada = process.env.ADMIN_PASSWORD;
  if (!esperada) return false;
  return iguais(tentativa, esperada);
}

export async function criarSessao() {
  const expira = Date.now() + DURACAO * 1000;
  const valor = String(expira);
  const jar = await cookies();
  jar.set(COOKIE, `${valor}.${assinar(valor)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURACAO,
  });
}

export async function encerrarSessao() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function sessaoValida(): Promise<boolean> {
  try {
    const jar = await cookies();
    const bruto = jar.get(COOKIE)?.value;
    if (!bruto) return false;
    const [valor, assinatura] = bruto.split(".");
    if (!valor || !assinatura) return false;
    if (!iguais(assinatura, assinar(valor))) return false;
    return Number(valor) > Date.now();
  } catch {
    return false;
  }
}
