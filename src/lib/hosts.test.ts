import { afterEach, describe, expect, it } from "vitest";

import {
  ehAmbienteDeTrabalho,
  ehApex,
  ehPreview,
  ehWww,
  foraDoIndice,
  normalizar,
} from "@/lib/hosts";

/**
 * Estas funções decidem se o site inteiro entra no Google. Errar aqui não dá
 * erro em lugar nenhum: o site fica no ar, bonito, e invisível — ou o
 * contrário, com o endereço provisório competindo com o definitivo.
 *
 * A tabela do README (apex/preview/www x SITE_LIVE) já era uma tabela de
 * teste escrita; isto aqui é a transcrição dela.
 */
const APEX = "padariarainhadamassa.com.br";
const PREVIEW = `aprovacao.${APEX}`;

const original = process.env.SITE_LIVE;
afterEach(() => {
  if (original === undefined) delete process.env.SITE_LIVE;
  else process.env.SITE_LIVE = original;
});

describe("normalizar", () => {
  it("descarta a porta, para comparar hostname com hostname", () => {
    expect(normalizar("localhost:3000")).toBe("localhost");
    expect(normalizar(`${APEX}:443`)).toBe(APEX);
  });

  it("baixa a caixa", () => {
    expect(normalizar(APEX.toUpperCase())).toBe(APEX);
  });

  it("host ausente não explode", () => {
    expect(normalizar(null)).toBe("");
  });
});

describe("reconhecimento de host", () => {
  it("separa apex, preview e www", () => {
    expect(ehApex(APEX)).toBe(true);
    expect(ehApex(`www.${APEX}`)).toBe(false);
    expect(ehPreview(PREVIEW)).toBe(true);
    expect(ehPreview(APEX)).toBe(false);
    expect(ehWww(`www.${APEX}`)).toBe(true);
  });

  it("localhost e *.vercel.app são ambiente de trabalho", () => {
    expect(ehAmbienteDeTrabalho("localhost:3000")).toBe(true);
    expect(ehAmbienteDeTrabalho("padaria-abc123.vercel.app")).toBe(true);
    expect(ehAmbienteDeTrabalho("127.0.0.1:3000")).toBe(true);
    expect(ehAmbienteDeTrabalho(APEX)).toBe(false);
  });

  it("não confunde domínio que só TERMINA parecido", () => {
    // a armadilha clássica de checar sufixo sem cuidado
    expect(ehApex(`fake-${APEX}`)).toBe(false);
    expect(ehAmbienteDeTrabalho("naovercel.app")).toBe(false);
  });
});

describe("foraDoIndice — quem fica fora do Google", () => {
  it("com SITE_LIVE=true, só o apex entra no índice", () => {
    process.env.SITE_LIVE = "true";
    expect(foraDoIndice(APEX)).toBe(false);
    expect(foraDoIndice(PREVIEW)).toBe(true);
    expect(foraDoIndice("padaria-abc.vercel.app")).toBe(true);
    expect(foraDoIndice("localhost:3000")).toBe(true);
  });

  it("sem SITE_LIVE, NADA entra — nem o apex", () => {
    delete process.env.SITE_LIVE;
    expect(foraDoIndice(APEX)).toBe(true);
    expect(foraDoIndice(PREVIEW)).toBe(true);
  });

  it("só a string 'true' liga; qualquer outro valor mantém fechado", () => {
    for (const v of ["false", "1", "TRUE", "sim", ""]) {
      process.env.SITE_LIVE = v;
      expect(foraDoIndice(APEX)).toBe(true);
    }
  });
});
