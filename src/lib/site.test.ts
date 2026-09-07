import { describe, expect, it } from "vitest";

import { anosDeCasa, decadaDeCasa, linkWhatsapp, whatsappCom } from "@/lib/site";

/**
 * O corte em 11 dígitos tem 8 linhas de comentário em site.ts explicando que
 * errar produz um link que FALHA EM SILÊNCIO: o WhatsApp abre e diz "número
 * inválido", sem erro no console e sem nada quebrar no site. Foi bug real —
 * a primeira versão gerava `wa.me/24999990000`, sem o 55.
 *
 * A PRIMEIRA VERSÃO DESTE TESTE não pegava esse bug. Ela só chamava
 * `whatsappCom`, que usa `site.whatsapp` — um número que já vem com o país,
 * então o ramo que acrescenta o 55 nunca rodava. Uma revisão provou por
 * mutação: apagar o `55` da implementação deixava os 27 testes verdes.
 *
 * Daí a tabela abaixo: ela entra pela função pura e cobre os dois lados do
 * corte, inclusive a borda (10 e 11 dígitos vs 12 e 13).
 */
describe("linkWhatsapp", () => {
  it.each([
    ["(24) 99999-0000", "5524999990000", "11 dígitos: celular sem país"],
    ["24 3302-2752", "552433022752", "10 dígitos: fixo sem país — borda do corte"],
    ["+55 24 3302-2752", "552433022752", "12 dígitos: já com país"],
    ["+55 24 99999-0000", "5524999990000", "13 dígitos: já com país"],
  ])("%s -> %s (%s)", (entrada, esperado) => {
    expect(linkWhatsapp(entrada, "oi")).toBe(`https://wa.me/${esperado}?text=oi`);
  });

  it("nunca duplica o país", () => {
    for (const n of ["+55 24 3302-2752", "5524999990000"]) {
      expect(linkWhatsapp(n, "x")).not.toMatch(/wa\.me\/5555/);
    }
  });

  it("descarta pontuação e espaço", () => {
    const url = linkWhatsapp("+55 (24) 3302-2752", "oi");
    expect(url).not.toContain(" ");
    expect(url).not.toContain("(");
    expect(url).not.toContain("-");
  });

  it("codifica o texto na query", () => {
    const url = linkWhatsapp("+5524330227522", "Oi! Vim pelo site 🙂");
    // encodeURIComponent não escapa "!" — a primeira versão deste teste
    // presumia que sim, e o teste pegou o meu engano, não o do código.
    expect(url).toContain("text=Oi!%20Vim");
    expect(decodeURIComponent(url.split("text=")[1])).toBe("Oi! Vim pelo site 🙂");
  });
});

describe("whatsappCom", () => {
  /*
   * Um só, e frouxo de propósito: prende que o link sai com país e formato
   * de wa.me, sem decorar o DDD nem o número da cliente — que pode mudar sem
   * que nada esteja errado. O comportamento fica preso na tabela acima.
   */
  it("monta um link com país a partir do número configurado", () => {
    expect(whatsappCom("oi")).toMatch(/^https:\/\/wa\.me\/55\d{10,11}\?text=/);
  });
});

/**
 * `decadaDeCasa` sai literalmente na página — "há mais de vinte anos" no
 * herói e "vinte anos de balcão" na prova social. É por extenso de propósito,
 * e o `?? String(d)` do final é o que estraga isso em silêncio: devolve o
 * número, e a frase vira "há mais de 20 anos" no meio de um texto que evita
 * algarismo.
 */
describe("decadaDeCasa", () => {
  const em = (ano: number) => new Date(Date.UTC(ano, 5, 15));

  it("conta os anos a partir da abertura", () => {
    expect(anosDeCasa(em(2026))).toBe(22);
    expect(anosDeCasa(em(2034))).toBe(30);
  });

  it("arredonda para a dezena de baixo, por extenso", () => {
    expect(decadaDeCasa(em(2026))).toBe("vinte");
    expect(decadaDeCasa(em(2033))).toBe("vinte");
    expect(decadaDeCasa(em(2034))).toBe("trinta");
  });

  it("cobre a dezena de 10, que faltava na tabela", () => {
    /*
     * Em 2020 a casa tinha 16 anos -> dezena 10. Sem a chave `10` no mapa, o
     * `?? String(d)` devolvia "10" e a frase virava "há mais de 10 anos" no
     * meio de um texto que evita algarismo.
     *
     * Hoje é inalcançável pelo relógio (a casa tem 22 e o número só sobe),
     * mas alcançável pelo parâmetro — e vira alcançável de verdade no dia em
     * que alguém corrigir `site.since`.
     */
    expect(decadaDeCasa(em(2020))).toBe("dez");
  });

  it("nunca devolve algarismo dentro da faixa que a casa vai viver", () => {
    // de hoje até 2094: nada pode sair como número
    for (let ano = 2026; ano <= 2094; ano++) {
      expect(decadaDeCasa(em(ano))).not.toMatch(/\d/);
    }
  });
});
