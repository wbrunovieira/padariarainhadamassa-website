import type { Metadata } from "next";
import Image from "next/image";

import { MenuNav } from "@/app/cardapio/menu-nav";
import {
  agoraPorExtenso,
  ehPratoDeHoje,
  formatarPreco,
  lerCardapio,
  secaoDeAgora,
  somenteAtivos,
  type ItemCardapio,
  type SecaoCardapio,
} from "@/lib/cardapio-digital";
import { googleMapsUrl, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cardápio",
  description: `Cardápio da ${site.name}, em ${site.city}/${site.state}: café da manhã, almoço, sanduíches, omeletes, salgados e bebidas.`,
};

/** Preço em Bodoni romana, com o "R$" fora do caminho. */
function Preco({ valor, grande = false }: { valor: number; grande?: boolean }) {
  const [moeda, numero] = formatarPreco(valor).split(" ");
  return (
    <span
      className={`shrink-0 font-display tabular-nums not-italic text-espresso ${grande ? "text-[1.5rem]" : "text-[1.15rem]"}`}
    >
      <span className="mr-[0.18em] align-[0.32em] text-[0.6em] font-normal tracking-[0.06em] text-espresso-soft/70">
        {moeda}
      </span>
      {numero}
    </span>
  );
}

export default async function CardapioPage() {
  const cardapio = somenteAtivos(await lerCardapio());
  const abas = cardapio.secoes.map((s) => ({ id: s.id, titulo: s.titulo }));
  const agora = new Date();
  const idAgora = secaoDeAgora(cardapio.secoes, agora);
  const secaoAtual = cardapio.secoes.find((s) => s.id === idAgora);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-cream-light via-cream to-cream-deep/40">
      <header className="grain relative overflow-hidden border-b border-gold/35 bg-ink px-5 pb-7 pt-7 text-cream">
        <Image
          src="/brand/ornamento-coroa-cream.png"
          alt=""
          width={480}
          height={199}
          aria-hidden
          className="pointer-events-none absolute -right-[12%] -top-[18%] w-[220px] rotate-[8deg] opacity-[0.09]"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Image
            src="/brand/logo-rainha-da-massa-cream.png"
            alt=""
            width={900}
            height={897}
            sizes="52px"
            priority
            className="size-[3.25rem] object-contain"
          />
          <h1 className="mt-3 font-display text-3xl italic leading-none sm:text-4xl">
            {site.shortName}
          </h1>

          <p className="mt-4 text-sm text-cream/70">
            {agoraPorExtenso(agora)}
            {secaoAtual ? (
              <>
                {" · "}
                <span className="font-display italic text-cream/95">
                  agora é hora do {secaoAtual.titulo.toLowerCase()}
                </span>
              </>
            ) : (
              <> · aberto das 6h às 22h</>
            )}
          </p>
        </div>
      </header>

      <MenuNav abas={abas} />

      <main className="mx-auto max-w-4xl px-5 pb-20 pt-10">
        {cardapio.secoes.map((secao) => (
          <Secao
            key={secao.id}
            secao={secao}
            agora={agora}
            eAgora={secao.id === idAgora}
          />
        ))}

        <footer className="border-t border-espresso/15 pt-9">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-espresso px-6 text-cream transition-colors hover:bg-ink sm:w-auto"
            >
              <span className="eyebrow">Ligar {site.phone}</span>
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-espresso/25 px-6 text-espresso transition-colors hover:border-espresso hover:bg-espresso/5 sm:w-auto"
            >
              <span className="eyebrow">Como chegar</span>
            </a>
          </div>

          <p className="mt-6 text-[0.94rem] text-espresso-soft">
            Prefere em casa?{" "}
            {site.delivery.map((app, i) => (
              <span key={app.nome}>
                {i > 0 && " e "}
                <a
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-espresso underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
                >
                  {app.nome}
                </a>
              </span>
            ))}
            .
          </p>

          <div className="mt-14 flex flex-col items-center gap-4">
            <Image
              src="/brand/ornamento-coroa.png"
              alt=""
              width={480}
              height={199}
              aria-hidden
              className="h-6 w-auto opacity-25"
            />
            <p className="text-center text-xs text-espresso-soft/70">
              {cardapio.aviso} Atualizado em{" "}
              {new Date(cardapio.atualizadoEm).toLocaleDateString("pt-BR")}.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Secao({
  secao,
  agora,
  eAgora,
}: {
  secao: SecaoCardapio;
  agora: Date;
  eAgora: boolean;
}) {
  // preço único: quando todo mundo custa o mesmo, mostra uma vez só
  const precos = new Set(secao.itens.map((i) => i.preco));
  const precoUnico =
    precos.size === 1 && secao.itens.every((i) => !i.variacoes?.length)
      ? secao.itens[0].preco
      : null;

  /*
   * Mesma ideia do preço: a guarnição que se repete em três ou mais itens
   * sobe uma vez só para o topo da seção, e some das linhas. No almoço, os
   * quatro pratos fixos dividem o mesmo acompanhamento; os pratos do dia
   * têm o seu e continuam mostrando.
   */
  const contagem = new Map<string, number>();
  for (const i of secao.itens) {
    if (i.descricao) contagem.set(i.descricao, (contagem.get(i.descricao) ?? 0) + 1);
  }
  const maisComum = [...contagem.entries()].sort((a, b) => b[1] - a[1])[0];
  const descricaoComum = maisComum && maisComum[1] >= 3 ? maisComum[0] : null;

  return (
    <section
      id={secao.id}
      className={`scroll-mt-[4.5rem] pb-20 ${eAgora ? "relative -ml-5 border-l-2 border-gold/70 pl-5" : ""}`}
    >
      {eAgora && (
        <Image
          src="/brand/ornamento-coroa.png"
          alt=""
          width={480}
          height={199}
          aria-hidden
          className="absolute -left-[0.85rem] top-0 size-6 w-auto opacity-70"
        />
      )}

      {secao.horario?.rotulo && (
        <p
          className={`eyebrow flex items-center gap-2 ${eAgora ? "text-gold" : "text-espresso-soft/60"}`}
        >
          {eAgora && (
            <span aria-hidden className="block size-[5px] rounded-full bg-gold" />
          )}
          {eAgora ? "Agora · " : ""}
          {secao.horario.rotulo}
        </p>
      )}

      <h2 className="mt-3 font-display text-[2.5rem] italic leading-[0.95] tracking-tight text-ink">
        {secao.titulo}
      </h2>
      <span aria-hidden className="mt-5 block h-px w-10 bg-gold" />

      {secao.foto && (
        <div className="relative mt-7 overflow-hidden rounded-b-2xl rounded-t-[2.75rem] bg-cream-deep">
          <Image
            src={secao.foto}
            alt=""
            width={1400}
            height={700}
            quality={68}
            sizes="(min-width: 896px) 56rem, 92vw"
            className="aspect-[5/2] w-full object-cover"
          />
        </div>
      )}

      {secao.descricao && (
        <p className="mt-6 max-w-xl leading-relaxed text-espresso-soft">
          {secao.descricao}
        </p>
      )}

      {precoUnico !== null && (
        <div className="mt-7 flex items-baseline justify-between rounded-b-xl rounded-t-2xl border border-gold/40 bg-cream-light px-5 py-3.5">
          <span className="eyebrow text-gold">Qualquer prato</span>
          <Preco valor={precoUnico} grande />
        </div>
      )}

      {descricaoComum && (
        <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-espresso-soft">
          Os pratos marcados com{" "}
          <span
            aria-hidden
            className="inline-block size-[5px] rounded-full bg-gold align-middle"
          />{" "}
          vêm com {descricaoComum.replace(/^Com /, "").toLowerCase()}.
        </p>
      )}

      <ul className="mt-6">
        {secao.itens.map((item) => (
          <Linha
            key={item.id}
            item={item}
            escondePreco={precoUnico !== null}
            escondeDescricao={item.descricao === descricaoComum}
            destaque={ehPratoDeHoje(item.nome, agora)}
          />
        ))}
      </ul>
    </section>
  );
}

function Linha({
  item,
  escondePreco,
  escondeDescricao,
  destaque,
}: {
  item: ItemCardapio;
  escondePreco: boolean;
  escondeDescricao: boolean;
  destaque: boolean;
}) {
  const temVariacoes = Boolean(item.variacoes?.length);

  return (
    <li
      className={`py-[0.85rem] ${destaque ? "-ml-4 border-l-2 border-gold pl-4" : ""}`}
    >
      <div className="flex gap-3 [align-items:last_baseline]">
        <span
          className={`font-display italic leading-[1.15] text-ink ${destaque ? "text-[1.5rem]" : "text-[1.3rem]"}`}
        >
          {item.nome}
          {escondeDescricao && (
            <span
              aria-hidden
              className="ml-2 inline-block size-[5px] rounded-full bg-gold align-middle"
            />
          )}
        </span>
        {!temVariacoes && !escondePreco && (
          <>
            <span aria-hidden className="leader" />
            <Preco valor={item.preco} />
          </>
        )}
      </div>

      {item.descricao && !escondeDescricao && (
        <p className="mt-1.5 max-w-[30ch] pr-14 text-[0.86rem] leading-[1.45] text-espresso-soft/85">
          {item.descricao}
        </p>
      )}

      {temVariacoes && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.variacoes!.map((v) => (
            <li
              key={v.rotulo}
              className="flex min-h-10 items-center gap-2 rounded-full border border-espresso/25 bg-cream-light px-4 text-[0.94rem]"
            >
              <span className="text-espresso-soft">{v.rotulo}</span>
              <Preco valor={v.preco} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
