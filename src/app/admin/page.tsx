import type { Metadata } from "next";

import { Editor } from "@/app/admin/editor";
import { Login } from "@/app/admin/login";
import { sessaoValida } from "@/lib/admin-auth";
import { lerCardapio } from "@/lib/cardapio-digital";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administração do cardápio",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const autenticado = await sessaoValida();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-cream-light to-cream px-5 pb-24">
      {autenticado ? <Editor inicial={await lerCardapio()} /> : <Login />}
    </div>
  );
}
