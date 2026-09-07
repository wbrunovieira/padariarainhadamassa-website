import { describe, expect, it } from "vitest";

import { anoDeAgora, diaDaSemana, diaPorExtenso, horaDoDia, minutosDoDia } from "@/lib/agora";

/**
 * Tudo aqui é hora de PETRÓPOLIS, não do relógio de quem roda o teste. Por
 * isso as datas são montadas em UTC e a expectativa é escrita já convertida:
 * o Brasil está em UTC-3 e não usa mais horário de verão desde 2019.
 */
const emPetropolis = (ano: number, mes: number, dia: number, h = 12, m = 0) =>
  new Date(Date.UTC(ano, mes - 1, dia, h + 3, m));

describe("minutosDoDia", () => {
  it("converte a hora de parede em minutos desde a meia-noite", () => {
    expect(minutosDoDia(emPetropolis(2026, 9, 9, 6, 30))).toBe(390);
    expect(minutosDoDia(emPetropolis(2026, 9, 9, 0, 0))).toBe(0);
    expect(minutosDoDia(emPetropolis(2026, 9, 9, 23, 59))).toBe(1439);
  });

  it("usa o fuso de Petrópolis, não o de quem executa", () => {
    // 02:00 UTC = 23:00 do dia anterior em Petrópolis
    expect(minutosDoDia(new Date(Date.UTC(2026, 8, 10, 2, 0)))).toBe(23 * 60);
  });
});

describe("horaDoDia", () => {
  it("devolve 24h com zero à esquerda", () => {
    expect(horaDoDia(emPetropolis(2026, 9, 9, 6, 5))).toBe("06:05");
    expect(horaDoDia(emPetropolis(2026, 9, 9, 18, 0))).toBe("18:00");
  });
});

describe("diaDaSemana", () => {
  it("devolve 0 para domingo, igual ao Date.getDay()", () => {
    // 6/9/2026 é um domingo
    expect(diaDaSemana(emPetropolis(2026, 9, 6))).toBe(0);
    expect(diaDaSemana(emPetropolis(2026, 9, 7))).toBe(1);
    expect(diaDaSemana(emPetropolis(2026, 9, 12))).toBe(6);
  });

  it("cobre os sete dias sem cair no fallback", () => {
    const vistos = new Set<number>();
    for (let i = 0; i < 7; i++) vistos.add(diaDaSemana(emPetropolis(2026, 9, 6 + i)));
    expect([...vistos].sort()).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("sábado e domingo não têm '-feira' e mesmo assim casam", () => {
    // é aqui que um .replace("-feira","") mal feito derrubaria dois dias
    expect(diaPorExtenso(emPetropolis(2026, 9, 6))).toBe("domingo");
    expect(diaPorExtenso(emPetropolis(2026, 9, 12))).toBe("sábado");
    expect(diaDaSemana(emPetropolis(2026, 9, 6))).toBe(0);
    expect(diaDaSemana(emPetropolis(2026, 9, 12))).toBe(6);
  });

  it("vira o dia na meia-noite de Petrópolis, não na de UTC", () => {
    // 23:30 de sábado em Petrópolis = 02:30 de domingo em UTC
    expect(diaDaSemana(emPetropolis(2026, 9, 12, 23, 30))).toBe(6);
    expect(diaDaSemana(emPetropolis(2026, 9, 13, 0, 30))).toBe(0);
  });
});

describe("anoDeAgora", () => {
  it("usa o ano de Petrópolis na virada", () => {
    // 31/12/2026 21:00 em Petrópolis já é 00:00 de 2027 em UTC
    expect(anoDeAgora(new Date(Date.UTC(2027, 0, 1, 0, 0)))).toBe(2026);
    expect(anoDeAgora(emPetropolis(2027, 1, 1, 1, 0))).toBe(2027);
  });
});
