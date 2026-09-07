"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

import {
  fotosDisponiveis,
  type Cardapio,
  type ItemCardapio,
  type SecaoCardapio,
} from "@/lib/cardapio-tipos";

const campo =
  "w-full rounded-lg border border-espresso/20 bg-cream px-3 py-2 text-espresso outline-none transition-colors focus:border-gold";
const rotulo = "eyebrow text-espresso-soft/70";

const idNovo = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

export function Editor({ inicial }: { inicial: Cardapio }) {
  const router = useRouter();
  const [cardapio, setCardapio] = useState<Cardapio>(inicial);
  const [aberta, setAberta] = useState<string | null>(inicial.secoes[0]?.id ?? null);
  const [estado, setEstado] = useState<"parado" | "salvando" | "salvo" | "erro">("parado");
  const [msg, setMsg] = useState<string | null>(null);
  /*
   * Guarda o timer que devolve o botão a "parado" depois de salvar. Sem
   * cancelar: salvar duas vezes em menos de 3s fazia o timer da primeira
   * disparar no meio da segunda, reabilitando o botão durante o PUT — e
   * permitindo um envio duplicado.
   */
  const timerVolta = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timerVolta.current) clearTimeout(timerVolta.current);
  }, []);

  function mudarSecao(id: string, muda: Partial<SecaoCardapio>) {
    setCardapio((anterior) => ({
      ...anterior,
      secoes: anterior.secoes.map((s) => (s.id === id ? { ...s, ...muda } : s)),
    }));
  }

  function mudarItem(secaoId: string, itemId: string, muda: Partial<ItemCardapio>) {
    setCardapio((anterior) => ({
      ...anterior,
      secoes: anterior.secoes.map((s) =>
        s.id !== secaoId
          ? s
          : { ...s, itens: s.itens.map((i) => (i.id === itemId ? { ...i, ...muda } : i)) },
      ),
    }));
  }

  function novoItem(secaoId: string) {
    const item: ItemCardapio = {
      id: idNovo("item"),
      nome: "",
      descricao: "",
      preco: 0,
      ativo: true,
    };
    setCardapio((anterior) => ({
      ...anterior,
      secoes: anterior.secoes.map((s) => (s.id === secaoId ? { ...s, itens: [...s.itens, item] } : s)),
    }));
  }

  function removerItem(secaoId: string, itemId: string) {
    setCardapio((anterior) => ({
      ...anterior,
      secoes: anterior.secoes.map((s) =>
        s.id === secaoId ? { ...s, itens: s.itens.filter((i) => i.id !== itemId) } : s,
      ),
    }));
  }

  function novaSecao() {
    const s: SecaoCardapio = {
      id: idNovo("secao"),
      titulo: "Nova seção",
      descricao: "",
      ativo: true,
      itens: [],
    };
    setCardapio((anterior) => ({ ...anterior, secoes: [...anterior.secoes, s] }));
    setAberta(s.id);
  }

  function removerSecao(id: string) {
    setCardapio((anterior) => ({ ...anterior, secoes: anterior.secoes.filter((s) => s.id !== id) }));
  }

  function moverSecao(id: string, passo: number) {
    setCardapio((anterior) => {
      const i = anterior.secoes.findIndex((s) => s.id === id);
      const j = i + passo;
      if (i < 0 || j < 0 || j >= anterior.secoes.length) return anterior;
      const secoes = [...anterior.secoes];
      [secoes[i], secoes[j]] = [secoes[j], secoes[i]];
      return { ...anterior, secoes };
    });
  }

  async function salvar() {
    if (timerVolta.current) clearTimeout(timerVolta.current);
    setEstado("salvando");
    setMsg(null);
    /*
     * O try existe para o caso mais provável: editar do celular, no balcão,
     * e a rede cair no meio. Sem ele a promise rejeita, nenhum setEstado
     * roda, o botão fica preso em "Salvando…" e a única saída é recarregar
     * — perdendo tudo o que foi digitado.
     */
    try {
      const r = await fetch("/api/cardapio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardapio),
      });
      const resposta = await r.json().catch(() => ({}));
      if (!r.ok) {
        setEstado("erro");
        setMsg(resposta.erro ?? "Não foi possível salvar.");
        return;
      }
      setEstado("salvo");
      setMsg("Cardápio salvo. Já está no ar.");
      timerVolta.current = setTimeout(() => setEstado("parado"), 3000);
    } catch {
      setEstado("erro");
      setMsg("Sem conexão. O que você editou continua aqui — tente salvar de novo.");
    }
  }

  async function sair() {
    // mesmo motivo do try em salvar(): sem ele, rede caindo deixa o clique
    // sem efeito e sem aviso nenhum
    try {
      await fetch("/api/admin/sessao", { method: "DELETE" });
    } catch {
      setEstado("erro");
      setMsg("Sem conexão. Não foi possível sair agora.");
      return;
    }
    router.refresh();
  }

  const totalAtivos = cardapio.secoes.reduce(
    (n, s) => n + (s.ativo ? s.itens.filter((i) => i.ativo).length : 0),
    0,
  );

  return (
    <div className="mx-auto max-w-4xl pt-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-espresso/15 pb-6">
        <div>
          <p className="eyebrow text-gold">Cardápio digital</p>
          <h1 className="mt-3 font-display text-3xl italic text-espresso sm:text-4xl">
            O que está no QR Code da mesa
          </h1>
          <p className="mt-3 text-sm text-espresso-soft">
            {totalAtivos} itens aparecendo hoje · veja em{" "}
            <a href="/cardapio" target="_blank" className="underline decoration-gold/50 underline-offset-4">
              /cardapio
            </a>
          </p>
        </div>
        <button onClick={sair} className="eyebrow text-espresso-soft hover:text-espresso">
          Sair
        </button>
      </header>

      <label className="mt-8 block">
        <span className={rotulo}>Aviso no rodapé do cardápio</span>
        <input
          value={cardapio.aviso}
          onChange={(e) => setCardapio({ ...cardapio, aviso: e.target.value })}
          className={`${campo} mt-2`}
        />
      </label>

      <div className="mt-10 flex flex-col gap-4">
        {cardapio.secoes.map((s, idx) => {
          const abertaAqui = aberta === s.id;
          return (
            <section
              key={s.id}
              className={`rounded-2xl border bg-cream-light transition-colors ${s.ativo ? "border-espresso/15" : "border-espresso/10 opacity-60"}`}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex flex-col text-espresso-soft/50">
                  <button
                    onClick={() => moverSecao(s.id, -1)}
                    disabled={idx === 0}
                    aria-label="Subir seção"
                    className="disabled:opacity-25"
                  >
                    <ChevronDown className="size-3.5 rotate-180" />
                  </button>
                  <button
                    onClick={() => moverSecao(s.id, 1)}
                    disabled={idx === cardapio.secoes.length - 1}
                    aria-label="Descer seção"
                    className="disabled:opacity-25"
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                </div>

                <input
                  value={s.titulo}
                  onChange={(e) => mudarSecao(s.id, { titulo: e.target.value })}
                  className="flex-1 bg-transparent font-display text-2xl italic text-espresso outline-none"
                />

                <Interruptor
                  ligado={s.ativo}
                  aoMudar={(ligado) => mudarSecao(s.id, { ativo: ligado })}
                  rotulo={`Seção ${s.titulo}`}
                />

                <button
                  onClick={() => setAberta(abertaAqui ? null : s.id)}
                  aria-expanded={abertaAqui}
                  aria-label={abertaAqui ? "Fechar seção" : "Abrir seção"}
                  className="flex size-9 items-center justify-center rounded-full border border-espresso/20 text-espresso"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${abertaAqui ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {abertaAqui && (
                <div className="border-t border-espresso/10 px-5 py-6">
                  <div className="grid gap-3 sm:grid-cols-[1fr_8rem_8rem]">
                    <label className="block">
                      <span className={rotulo}>Horário (texto exibido)</span>
                      <input
                        value={s.horario?.rotulo ?? ""}
                        placeholder="11h30 às 15h"
                        onChange={(ev) =>
                          mudarSecao(s.id, {
                            horario: {
                              rotulo: ev.target.value,
                              de: s.horario?.de ?? "",
                              ate: s.horario?.ate ?? "",
                            },
                          })
                        }
                        className={`${campo} mt-2`}
                      />
                    </label>
                    <label className="block">
                      <span className={rotulo}>Começa</span>
                      <input
                        type="time"
                        value={s.horario?.de ?? ""}
                        onChange={(ev) =>
                          mudarSecao(s.id, {
                            horario: {
                              rotulo: s.horario?.rotulo ?? "",
                              de: ev.target.value,
                              ate: s.horario?.ate ?? "",
                            },
                          })
                        }
                        className={`${campo} mt-2`}
                      />
                    </label>
                    <label className="block">
                      <span className={rotulo}>Termina</span>
                      <input
                        type="time"
                        value={s.horario?.ate ?? ""}
                        onChange={(ev) =>
                          mudarSecao(s.id, {
                            horario: {
                              rotulo: s.horario?.rotulo ?? "",
                              de: s.horario?.de ?? "",
                              ate: ev.target.value,
                            },
                          })
                        }
                        className={`${campo} mt-2`}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-espresso-soft/70">
                    Com hora de início e fim, a seção ganha a marca dourada de
                    “Agora” no cardápio durante esse intervalo. Deixe as horas em
                    branco para a seção sair o dia todo.
                  </p>

                  <label className="mt-5 block">
                    <span className={rotulo}>Foto da seção</span>
                    <select
                      value={s.foto ?? ""}
                      onChange={(e) => mudarSecao(s.id, { foto: e.target.value })}
                      className={`${campo} mt-2`}
                    >
                      {fotosDisponiveis.map((f) => (
                        <option key={f.valor} value={f.valor}>
                          {f.rotulo}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="mt-4 block">
                    <span className={rotulo}>Descrição da seção</span>
                    <input
                      value={s.descricao}
                      onChange={(e) => mudarSecao(s.id, { descricao: e.target.value })}
                      className={`${campo} mt-2`}
                    />
                  </label>

                  <ul className="mt-6 flex flex-col gap-3">
                    {s.itens.map((item) => (
                      <li
                        key={item.id}
                        className={`rounded-xl border border-espresso/12 bg-cream p-4 ${item.ativo ? "" : "opacity-55"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_7rem]">
                            <input
                              value={item.nome}
                              placeholder="Nome do item"
                              onChange={(e) =>
                                mudarItem(s.id, item.id, { nome: e.target.value })
                              }
                              className={campo}
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-espresso-soft">R$</span>
                              <input
                                type="number"
                                step="0.10"
                                min="0"
                                value={item.preco}
                                onChange={(e) =>
                                  mudarItem(s.id, item.id, { preco: Number(e.target.value) })
                                }
                                className={`${campo} tabular-nums`}
                              />
                            </div>
                            <input
                              value={item.descricao}
                              placeholder="Descrição (opcional)"
                              onChange={(e) =>
                                mudarItem(s.id, item.id, { descricao: e.target.value })
                              }
                              className={`${campo} sm:col-span-2`}
                            />

                            {item.variacoes?.map((variacao, vi) => (
                              <div key={vi} className="flex gap-2 sm:col-span-2">
                                <input
                                  value={variacao.rotulo}
                                  placeholder="Variação"
                                  onChange={(e) => {
                                    const variacoes = [...item.variacoes!];
                                    variacoes[vi] = { ...variacao, rotulo: e.target.value };
                                    mudarItem(s.id, item.id, { variacoes });
                                  }}
                                  className={campo}
                                />
                                <input
                                  type="number"
                                  step="0.10"
                                  min="0"
                                  value={variacao.preco}
                                  onChange={(e) => {
                                    const variacoes = [...item.variacoes!];
                                    variacoes[vi] = { ...variacao, preco: Number(e.target.value) };
                                    mudarItem(s.id, item.id, { variacoes });
                                  }}
                                  className={`${campo} w-28 tabular-nums`}
                                />
                                <button
                                  onClick={() =>
                                    mudarItem(s.id, item.id, {
                                      variacoes: item.variacoes!.filter((_, k) => k !== vi),
                                    })
                                  }
                                  aria-label="Remover variação"
                                  className="shrink-0 text-espresso-soft/60 hover:text-red-700"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            ))}

                            <button
                              onClick={() =>
                                mudarItem(s.id, item.id, {
                                  variacoes: [
                                    ...(item.variacoes ?? []),
                                    { rotulo: "", preco: item.preco },
                                  ],
                                })
                              }
                              className="justify-self-start text-xs text-espresso-soft underline decoration-gold/40 underline-offset-4 sm:col-span-2"
                            >
                              + tamanho ou variação
                            </button>
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-3">
                            <Interruptor
                              ligado={item.ativo}
                              aoMudar={(ligado) => mudarItem(s.id, item.id, { ativo: ligado })}
                              rotulo={item.nome || "item"}
                            />
                            <button
                              onClick={() => removerItem(s.id, item.id)}
                              aria-label={`Remover ${item.nome}`}
                              className="text-espresso-soft/60 hover:text-red-700"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-4">
                    <button
                      onClick={() => novoItem(s.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-4 py-2 text-espresso hover:bg-espresso/5"
                    >
                      <Plus className="size-4" />
                      <span className="eyebrow">Item</span>
                    </button>
                    <button
                      onClick={() => removerSecao(s.id)}
                      className="eyebrow text-espresso-soft/70 hover:text-red-700"
                    >
                      Remover seção
                    </button>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <button
        onClick={novaSecao}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-espresso/25 px-5 py-3 text-espresso hover:bg-espresso/5"
      >
        <Plus className="size-4" />
        <span className="eyebrow">Nova seção</span>
      </button>

      {/* barra fixa de salvar */}
      <div className="sticky bottom-0 z-20 -mx-5 mt-10 border-t border-espresso/15 bg-cream-light/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <p
            className={`text-sm ${estado === "erro" ? "text-red-700" : "text-espresso-soft"}`}
          >
            {msg ?? "As mudanças só valem depois de salvar."}
          </p>
          <button
            onClick={salvar}
            disabled={estado === "salvando"}
            className="rounded-full bg-espresso px-7 py-3.5 text-cream transition-colors hover:bg-ink disabled:opacity-50"
          >
            <span className="eyebrow">
              {estado === "salvando" ? "Salvando…" : estado === "salvo" ? "Salvo" : "Salvar"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Interruptor({
  ligado,
  aoMudar,
  rotulo,
}: {
  ligado: boolean;
  aoMudar: (ligado: boolean) => void;
  rotulo: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      aria-label={`${ligado ? "Desativar" : "Ativar"} ${rotulo}`}
      onClick={() => aoMudar(!ligado)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${ligado ? "bg-espresso" : "bg-espresso/20"}`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-cream transition-transform duration-300 ${ligado ? "translate-x-[1.4rem]" : "translate-x-0.5"}`}
      />
    </button>
  );
}
