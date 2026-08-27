"use client";

import { useSyncExternalStore } from "react";

import { estadoAgora } from "@/lib/expediente";

/** Um minuto de granularidade basta para virar o estado na hora certa. */
function assinar(aoMudar: () => void) {
  const t = setInterval(aoMudar, 60_000);
  return () => clearInterval(t);
}

const noCliente = () => estadoAgora().texto;
const noServidor = () => null;

export function OpenNow({ className = "" }: { className?: string }) {
  const texto = useSyncExternalStore(assinar, noCliente, noServidor);
  if (!texto) return null;

  const aberto = texto.startsWith("Aberto");

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className={`relative flex size-1.5 shrink-0 rounded-full ${aberto ? "bg-emerald-600" : "bg-espresso/40"}`}
      >
        {aberto && (
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-600 opacity-60" />
        )}
      </span>
      {texto}
    </span>
  );
}
