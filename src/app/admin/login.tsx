"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    const r = await fetch("/api/admin/sessao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    });
    setEnviando(false);
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setErro(d.erro ?? "Não foi possível entrar.");
      return;
    }
    router.refresh();
  }

  return (
    <form
      onSubmit={entrar}
      className="mx-auto mt-24 w-full max-w-sm rounded-3xl border border-espresso/12 bg-cream-light p-8 shadow-[0_30px_60px_-50px_rgba(44,32,26,0.8)]"
    >
      <p className="eyebrow text-gold">Área da padaria</p>
      <h1 className="mt-4 font-display text-3xl italic text-espresso">
        Editar o cardápio
      </h1>

      <label className="mt-8 block">
        <span className="eyebrow text-espresso-soft/70">Senha</span>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-espresso/20 bg-cream px-4 py-3 text-espresso outline-none focus:border-gold"
        />
      </label>

      {erro && <p className="mt-4 text-sm text-red-700">{erro}</p>}

      <button
        type="submit"
        disabled={enviando || !senha}
        className="mt-7 w-full rounded-full bg-espresso px-6 py-3.5 text-cream transition-colors hover:bg-ink disabled:opacity-50"
      >
        <span className="eyebrow">{enviando ? "Entrando…" : "Entrar"}</span>
      </button>
    </form>
  );
}
