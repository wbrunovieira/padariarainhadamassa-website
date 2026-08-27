/**
 * A coroa do brasão, em SVG embutido.
 *
 * Existe porque o carregamento não pode depender de rede: a versão em PNG
 * simplesmente não aparecia sob conexão ruim, que é exatamente quando a
 * tela de carregamento é vista.
 */
export function CoroaSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 88" fill="currentColor" aria-hidden className={className}>
      <path d="M20 62 L26 33 L38 51 L50 24 L62 51 L74 33 L80 62 Z" />
      <rect x="19" y="66" width="62" height="13" rx="4" />
      <circle cx="26" cy="28" r="6.5" />
      <circle cx="50" cy="19" r="7.5" />
      <circle cx="74" cy="28" r="6.5" />
    </svg>
  );
}
