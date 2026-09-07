import { describe, expect, it } from "vitest";

import { ehPratoDeHoje, formatarPreco, secaoDeAgora } from "@/lib/cardapio-tipos";
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
    // titulo != id de propósito: com os dois iguais, trocar `return s.id` por
    // `return s.titulo` na implementação passaria despercebido.
    ({ id, titulo: `Título de ${id}`, descricao: "", foto: "", ativo: true, itens: [],
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

  it("seção sem horário nunca ganha a marca", () => {
    /*
     * É o caso que o docstring da implementação descreve: se a seção do dia
     * todo entrasse, TODAS entrariam. E não é hipótese — `de`/`ate` vêm de um
     * <input type="time"> no /admin, então string vazia é o que a cliente
     * produz ao limpar o campo.
     */
    const semHorario = secao("mercearia", "", "");
    expect(secaoDeAgora([semHorario, ...secoes], as(12))).toBe("almoco");
    expect(secaoDeAgora([semHorario], as(12))).toBeNull();
  });

  it("fora de qualquer faixa devolve null", () => {
    expect(secaoDeAgora(secoes, as(5, 59))).toBeNull();
    expect(secaoDeAgora(secoes, as(23))).toBeNull();
  });
});

/**
 * `ehPratoDeHoje` destaca o prato do dia comparando o começo do nome com o
 * dia da semana. Duas armadilhas empilhadas:
 *
 * 1. O mesmo `-feira` de `diaDaSemana` — "segunda-feira" nunca casaria com
 *    um nome que começa com "Segunda ·".
 * 2. O separador é o PONTO MÉDIO "·" (U+00B7), digitado pela cliente no
 *    /admin. Um hífen no lugar apaga o destaque para sempre, sem erro nenhum
 *    em lugar nenhum — o prato do dia simplesmente deixa de aparecer marcado.
 */
describe("ehPratoDeHoje", () => {
  // 9/9/2026 é uma quarta-feira em Petrópolis
  const quarta = new Date(Date.UTC(2026, 8, 9, 15, 0));

  it("casa o dia certo, apesar do '-feira'", () => {
    expect(ehPratoDeHoje("Quarta · Carne assada", quarta)).toBe(true);
  });

  it("não casa outro dia", () => {
    expect(ehPratoDeHoje("Terça · Carré", quarta)).toBe(false);
    expect(ehPratoDeHoje("Domingo · Frango assado", quarta)).toBe(false);
  });

  it("ignora a caixa do que a cliente digitou", () => {
    expect(ehPratoDeHoje("QUARTA · Carne assada", quarta)).toBe(true);
    expect(ehPratoDeHoje("quarta · carne assada", quarta)).toBe(true);
  });

  it("hífen no lugar do ponto médio NÃO casa — é a falha silenciosa", () => {
    expect(ehPratoDeHoje("Quarta - Carne assada", quarta)).toBe(false);
    expect(ehPratoDeHoje("Quarta: Carne assada", quarta)).toBe(false);
  });

  it("sábado e domingo, que não têm '-feira', também casam", () => {
    const sabado = new Date(Date.UTC(2026, 8, 12, 15, 0));
    const domingo = new Date(Date.UTC(2026, 8, 13, 15, 0));
    expect(ehPratoDeHoje("Sábado · Tilápia", sabado)).toBe(true);
    expect(ehPratoDeHoje("Domingo · Frango assado", domingo)).toBe(true);
  });
});
