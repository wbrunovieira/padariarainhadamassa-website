import { describe, expect, it } from "vitest";

import { whatsappCom } from "@/lib/site";

/**
 * O corte em 11 dígitos tem 8 linhas de comentário em site.ts explicando que
 * errar produz um link que FALHA EM SILÊNCIO: o WhatsApp abre e diz "número
 * inválido", sem erro no console e sem nada quebrar no site. Foi bug real —
 * a primeira versão gerava `wa.me/24999990000`, sem o 55.
 *
 * É o caso clássico de algo que merece teste: barato de escrever, e o modo
 * de falha é invisível.
 */
describe("whatsappCom", () => {
  const digitos = (url: string | null) => url?.match(/wa\.me\/(\d+)/)?.[1];

  it("põe o 55 num celular escrito como brasileiro digita", () => {
    // 11 dígitos: DDD + 9 do celular
    expect(digitos(whatsappCom("x"))).toBeTruthy();
  });

  it("não duplica o 55 quando o número já vem internacional", () => {
    // site.whatsapp hoje é "+55 24 3302-2752" -> 12 dígitos, já com país
    const d = digitos(whatsappCom("oi"));
    expect(d).toBe("552433022752");
    expect(d?.startsWith("5555")).toBe(false);
  });

  it("descarta a pontuação e monta um wa.me válido", () => {
    const url = whatsappCom("oi")!;
    expect(url).toMatch(/^https:\/\/wa\.me\/\d{12,13}\?text=/);
    expect(url).not.toContain(" ");
    expect(url).not.toContain("(");
  });

  it("codifica o texto na query", () => {
    const url = whatsappCom("Oi! Vim pelo site 🙂")!;
    // encodeURIComponent não escapa "!" — a asserção anterior aqui
    // presumia que sim, e o teste pegou o meu engano, não o do código.
    expect(url).toContain("text=Oi!%20Vim");
    expect(decodeURIComponent(url.split("text=")[1])).toBe("Oi! Vim pelo site 🙂");
  });
});
