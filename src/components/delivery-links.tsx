import { site } from "@/lib/site";

/**
 * "iFood e 99Food", com cada nome clicável.
 *
 * Existe para o texto corrido do site não citar os aplicativos sem levar
 * a lugar nenhum — em qualquer seção que fale de entrega, o nome é o link.
 */
export function DeliveryLinks({ className = "" }: { className?: string }) {
  return (
    <>
      {site.delivery.map((app, i) => (
        <span key={app.nome}>
          {i > 0 && " e "}
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className={`underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold ${className}`}
          >
            {app.nome}
          </a>
        </span>
      ))}
    </>
  );
}
