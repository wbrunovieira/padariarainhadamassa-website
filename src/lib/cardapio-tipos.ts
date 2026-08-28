/**
 * Tipos e constantes do cardápio digital.
 *
 * Fica separado de `cardapio-digital.ts` de propósito: aquele importa
 * `node:fs` e só roda no servidor. Este aqui o /admin pode importar.
 */
export type Variacao = { rotulo: string; preco: number };

export type ItemCardapio = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
  variacoes?: Variacao[];
};

export type Horario = {
  /** texto exibido, ex.: "11h30 às 15h" */
  rotulo: string;
  /** "HH:MM" — vazio quando a seção sai o dia todo */
  de: string;
  ate: string;
};

export type SecaoCardapio = {
  id: string;
  titulo: string;
  descricao: string;
  /** caminho de uma imagem em /public, ou "" para seção sem foto */
  foto?: string;
  horario?: Horario;
  ativo: boolean;
  itens: ItemCardapio[];
};

/** Fotos disponíveis para as seções, oferecidas no /admin. */
export const fotosDisponiveis = [
  { valor: "", rotulo: "Sem foto" },
  { valor: "/cardapio/cafe-da-manha.jpg", rotulo: "Pães franceses" },
  { valor: "/cardapio/almoco.jpg", rotulo: "Prato do dia" },
  { valor: "/cardapio/doces.jpg", rotulo: "Rocambole" },
  { valor: "/cardapio/salao.jpg", rotulo: "Salão" },
];

export type Cardapio = {
  atualizadoEm: string;
  aviso: string;
  secoes: SecaoCardapio[];
};

/** Só o que está ativo, para a página pública. */
export function somenteAtivos(c: Cardapio): Cardapio {
  return {
    ...c,
    secoes: c.secoes
      .filter((s) => s.ativo)
      .map((s) => ({ ...s, itens: s.itens.filter((i) => i.ativo) }))
      .filter((s) => s.itens.length > 0),
  };
}

export const formatarPreco = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Hora de Petrópolis em minutos desde a meia-noite. */
export function minutosAgora(agora = new Date()) {
  const [h, m] = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(agora)
    .split(":")
    .map(Number);
  return h * 60 + m;
}

const emMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : null;
};

/**
 * Qual seção é a "de agora". Só concorre quem tem janela própria — as
 * seções do dia todo nunca ganham a marca, senão todas ganhariam.
 */
export function secaoDeAgora(secoes: SecaoCardapio[], agora = new Date()) {
  const min = minutosAgora(agora);
  for (const s of secoes) {
    const de = s.horario?.de ? emMinutos(s.horario.de) : null;
    const ate = s.horario?.ate ? emMinutos(s.horario.ate) : null;
    if (de === null || ate === null) continue;
    if (min >= de && min < ate) return s.id;
  }
  return null;
}

/** "Quinta-feira, 12h40" no fuso de Petrópolis. */
export function agoraPorExtenso(agora = new Date()) {
  const dia = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
  }).format(agora);
  const hora = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(agora)
    .replace(":", "h");
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)}, ${hora}`;
}

/** O prato do dia já traz o dia no nome: "Quinta · Strogonoff". */
export function ehPratoDeHoje(nome: string, agora = new Date()) {
  const dia = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
  })
    .format(agora)
    .replace("-feira", "");
  return nome.toLowerCase().startsWith(dia.toLowerCase() + " ·");
}
