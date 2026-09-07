import { describe, expect, it } from "vitest";

import { estadoAgora } from "@/lib/expediente";
import { expediente } from "@/lib/site";

/**
 * `estadoAgora` alimenta o selo "Aberto agora" da home (open-now.tsx) — é a
 * informação mais visível que o site calcula sozinho, e a única que muda
 * sozinha ao longo do dia.
 *
 * Tem a mesma forma `>= abre && < fecha` de `secaoDeAgora`, e a mesma
 * armadilha: limite de faixa é onde mora o off-by-one. Some a isso uma
 * bifurcação que ninguém olha — "abre às 6h" antes do expediente e "abre
 * AMANHÃ às 6h" depois dele.
 *
 * Datas em UTC porque a hora é a de Petrópolis (UTC-3, sem horário de verão
 * desde 2019), não a de quem roda o teste.
 */
const as = (h: number, m = 0) => new Date(Date.UTC(2026, 8, 9, h + 3, m));

describe("estadoAgora", () => {
  it("abre exatamente na hora de abrir", () => {
    expect(estadoAgora(as(expediente.abre)).aberto).toBe(true);
    expect(estadoAgora(as(expediente.abre, 1)).aberto).toBe(true);
  });

  it("um minuto antes de abrir ainda está fechado", () => {
    const antes = estadoAgora(as(expediente.abre - 1, 59));
    expect(antes.aberto).toBe(false);
    expect(antes.texto).toContain("abre às");
    expect(antes.texto).not.toContain("amanhã");
  });

  it("fecha na hora de fechar — o limite NÃO entra", () => {
    expect(estadoAgora(as(expediente.fecha - 1, 59)).aberto).toBe(true);
    expect(estadoAgora(as(expediente.fecha)).aberto).toBe(false);
  });

  it("depois de fechar, diz que abre AMANHÃ", () => {
    const depois = estadoAgora(as(expediente.fecha, 30));
    expect(depois.aberto).toBe(false);
    expect(depois.texto).toContain("amanhã");
  });

  it("de madrugada diz que abre hoje, não amanhã", () => {
    // 2h da manhã: ainda falta abrir NESTE dia
    const madrugada = estadoAgora(as(2));
    expect(madrugada.aberto).toBe(false);
    expect(madrugada.texto).not.toContain("amanhã");
  });

  it("usa a hora de Petrópolis, não a de UTC", () => {
    // 02:00 UTC = 23:00 do dia anterior em Petrópolis -> fechado, abre amanhã
    const emUtc = new Date(Date.UTC(2026, 8, 10, 2, 0));
    expect(estadoAgora(emUtc).aberto).toBe(false);
    expect(estadoAgora(emUtc).texto).toContain("amanhã");
  });
});
