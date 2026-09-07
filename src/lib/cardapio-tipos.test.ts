import { describe, expect, it } from "vitest";

import { formatarPreco, secaoDeAgora } from "@/lib/cardapio-tipos";
import type { SecaoCardapio } from "@/lib/cardapio-tipos";

/**
 * `formatarPreco` é consumida por `Preco` (cardapio/page.tsx), que corta o
 * resultado para pôr o "R$" num span menor. O separador que o Intl usa entre
 * símbolo e número MUDOU de espaço comum para NBSP no ICU 72 — este teste
 * existe para o corte não depender de qual dos dois o runtime produz.
 */
describe("formatarPreco", () => {
  it("separa símbolo e número qualquer que seja o espaço do runtime", () => {
    const [moeda, numero] = formatarPreco(12.5).split(/\s/);
    expect(moeda).toBe("R$");
    expect(numero).toBe("12,50");
  });

  it("usa vírgula decimal e ponto de milhar, como pt-BR", () => {
    expect(formatarPreco(1234.5).split(/\s/)[1]).toBe("1.234,50");
  });

  it("sempre traz duas casas", () => {
    expect(formatarPreco(7).split(/\s/)[1]).toBe("7,00");
  });
});

/**
 * `secaoDeAgora` devolve o ID da seção a destacar, pela hora. A regra é
 * `>= de && < ate`, e limite de faixa é onde mora o off-by-one — daí os
 * testes baterem exatamente nas bordas.
 */
describe("secaoDeAgora", () => {
  const secao = (id: string, de: string, ate: string): SecaoCardapio =>
    ({ id, titulo: id, descricao: "", foto: "", ativo: true, itens: [],
       horario: { rotulo: id, de, ate } }) as SecaoCardapio;

  const secoes = [secao("manha", "06:00", "11:00"), secao("almoco", "11:00", "15:00")];
  // meia-noite local de Petrópolis é 03:00 UTC (UTC-3)
  const as = (h: number, m = 0) => new Date(Date.UTC(2026, 8, 9, h + 3, m));

  it("o início da faixa entra", () => {
    expect(secaoDeAgora(secoes, as(6))).toBe("manha");
    expect(secaoDeAgora(secoes, as(11))).toBe("almoco");
  });

  it("o fim da faixa NÃO entra — é onde o off-by-one aparece", () => {
    expect(secaoDeAgora(secoes, as(10, 59))).toBe("manha");
    expect(secaoDeAgora(secoes, as(14, 59))).toBe("almoco");
    expect(secaoDeAgora(secoes, as(15))).toBeNull();
  });

  it("fora de qualquer faixa devolve null", () => {
    expect(secaoDeAgora(secoes, as(5, 59))).toBeNull();
    expect(secaoDeAgora(secoes, as(23))).toBeNull();
  });
});
