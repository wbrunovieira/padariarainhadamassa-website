import { describe, expect, it } from "vitest";

import { linkWhatsapp, whatsappCom } from "@/lib/site";

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
