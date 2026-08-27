import type { Metadata } from "next";
import Image from "next/image";

import { MenuNav } from "@/app/cardapio/menu-nav";
import {
  formatarPreco,
  lerCardapio,
  somenteAtivos,
  type ItemCardapio,
} from "@/lib/cardapio-digital";
import { deliveryTexto, googleMapsUrl, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cardápio",
  description: `Cardápio da ${site.name}, em ${site.city}/${site.state}: café da manhã, sanduíches, omeletes, salgados, almoço e bebidas.`,
};

export default async function CardapioPage() {
  const cardapio = somenteAtivos(await lerCardapio());
  const abas = cardapio.secoes.map((s) => ({ id: s.id, titulo: s.titulo }));

  return (
    <div className="min-h-dvh bg-gradient-to-b from-cream-light via-cream to-cream-deep/40">
      <header className="grain relative overflow-hidden bg-ink px-5 pb-10 pt-9 text-cream">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Image
            src="/brand/logo-rainha-da-massa-cream.png"
            alt=""
            width={900}
            height={897}
            sizes="88px"
            priority
            className="size-[5.5rem] object-contain"
          />
          <p className="eyebrow mt-4 text-cream/50">Padaria e confeitaria</p>
          <h1 className="mt-2 font-display text-4xl italic leading-none sm:text-5xl">
            {site.shortName}
          </h1>
          <p className="mt-5 text-sm text-cream/60">
            {site.street} · {site.city}/{site.state} · {site.hoursShort}
          </p>
        </div>
      </header>

      <MenuNav abas={abas} />

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-10">
        {cardapio.secoes.map((secao) => (
          <section key={secao.id} id={secao.id} className="scroll-mt-20 pb-14">
            <h2 className="font-display text-3xl italic text-espresso sm:text-4xl">
              {secao.titulo}
            </h2>
            {secao.descricao && (
              <p className="mt-3 max-w-xl leading-relaxed text-espresso-soft">
                {secao.descricao}
              </p>
            )}

            <ul className="mt-7 border-t border-espresso/12">
              {secao.itens.map((item) => (
                <Linha key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}

        <footer className="border-t border-espresso/15 pt-8">
          {cardapio.aviso && (
            <p className="text-sm text-espresso-soft">{cardapio.aviso}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center rounded-full bg-espresso px-5 py-3 text-cream transition-colors hover:bg-ink"
            >
              <span className="eyebrow">Ligar {site.phone}</span>
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-espresso/25 px-5 py-3 text-espresso transition-colors hover:border-espresso hover:bg-espresso/5"
            >
              <span className="eyebrow">Como chegar</span>
            </a>
            {site.delivery.map((app) => (
              <a
                key={app.nome}
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-espresso/25 px-5 py-3 text-espresso transition-colors hover:border-espresso hover:bg-espresso/5"
              >
                <span className="eyebrow">{app.nome}</span>
              </a>
            ))}
          </div>

          <p className="mt-8 text-xs text-espresso-soft/70">
            Peça também pelo {deliveryTexto}. Atualizado em{" "}
            {new Date(cardapio.atualizadoEm).toLocaleDateString("pt-BR")}.
          </p>
        </footer>
      </main>
    </div>
  );
}

function Linha({ item }: { item: ItemCardapio }) {
  const temVariacoes = Boolean(item.variacoes?.length);

  return (
    <li className="border-b border-espresso/10 py-4">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xl italic leading-tight text-espresso sm:text-2xl">
          {item.nome}
        </span>
        {/* pontilhado, como no cardápio impresso */}
        <span
          aria-hidden
          className="mt-auto hidden h-px min-w-6 flex-1 border-b border-dotted border-espresso/30 sm:block"
        />
        {!temVariacoes && (
          <span className="ml-auto shrink-0 font-medium tabular-nums text-espresso sm:ml-0">
            {formatarPreco(item.preco)}
          </span>
        )}
      </div>

      {item.descricao && (
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-espresso-soft">
          {item.descricao}
        </p>
      )}

      {temVariacoes && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.variacoes!.map((v) => (
            <li
              key={v.rotulo}
              className="flex items-baseline gap-2 rounded-full border border-espresso/20 px-3.5 py-1.5 text-sm"
            >
              <span className="text-espresso-soft">{v.rotulo}</span>
              <span className="font-medium tabular-nums text-espresso">
                {formatarPreco(v.preco)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
