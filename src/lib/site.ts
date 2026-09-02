/**
 * Dados apurados publicamente em 27/08/2026 (Google Maps, Instagram
 * @rainha_da_massa_, Restaurant Guru, registro de CNPJ).
 * O endereço foi confirmado pelo cliente. Ver `PENDENTE` para o resto.
 */
export const site = {
  name: "Padaria Rainha da Massa",
  shortName: "Rainha da Massa",
  legalName: "Padaria e Confeitaria Rainha da Massa Ltda",
  cnpj: "06.280.419/0001-20",
  since: 2004,

  street: "Rua Washington Luiz, 1.255",
  city: "Petrópolis",
  state: "RJ",
  zip: "25655-007",
  /*
   * SEM COORDENADAS DE PROPÓSITO.
   *
   * O pino do Google fica na R. Saldanha Marinho, a cerca de 2 km do
   * endereço que o cliente confirmou. Publicar essa coordenada mandaria
   * o cliente para o lugar errado, e publicar o centro do CEP seria um
   * palpite. Rota e mapa passam a usar o endereço por extenso, que é o
   * dado confirmado. Ver docs/diagnostico-presenca-digital.html.
   */

  phone: "(24) 3302-2752",
  phoneHref: "tel:+552433022752",
  email: "padariarainhadamassa@outlook.com",
  emailHref: "mailto:padariarainhadamassa@outlook.com",

  // PENDENTE: bio do Instagram diz "domingo a domingo das 6h às 22h";
  // o Google mostra 6h às 21h. Usando a versão do próprio negócio.
  hours: "Todos os dias · 6h às 22h",
  hoursShort: "6h às 22h",

  instagram: "https://www.instagram.com/rainha_da_massa_/",
  instagramHandle: "@rainha_da_massa_",

  /** Aplicativos de entrega, com o link da loja. Links do cliente, 27/08/2026. */
  delivery: [
    {
      nome: "iFood",
      url: "https://www.ifood.com.br/delivery/petropolis-rj/padaria-rainha-da-massa-centro/a671cba8-c771-4384-a4c5-25b8dba3c84b",
    },
    { nome: "99Food", url: "https://oia.99app.com/dlp9/dI57qr" },
  ],
  /**
   * Confirmado pela cliente em 02/09/2026: é o MESMO número do telefone
   * fixo, com WhatsApp. Fica num campo próprio mesmo assim — se um dia ela
   * usar um celular separado, muda aqui e nada mais precisa saber disso.
   */
  whatsapp: "+55 24 3302-2752" as string | null,

  rating: { value: 4.5, count: 168, source: "Google" },
} as const;

/**
 * Link do WhatsApp, ou `null` enquanto não houver número.
 *
 * O `wa.me` só abre conversa com o número internacional, em dígitos puros:
 * 55 + DDD + número. Preencher `site.whatsapp` em qualquer formato basta —
 * a pontuação é descartada e o 55 é posto quando falta.
 *
 * Celular brasileiro tem 11 dígitos com DDD (10 nos fixos), e 13 com o DDI.
 * Por isso o corte em 11: acima disso o número já veio com o país, e
 * prefixar de novo geraria "5555…", que o WhatsApp rejeita em silêncio —
 * o link abre e diz que o número é inválido, sem erro nenhum no console.
 */
function linkWhatsapp(numero: string, texto: string) {
  const digitos = numero.replace(/\D/g, "");
  const comDdi = digitos.length > 11 ? digitos : `55${digitos}`;
  return `https://wa.me/${comDdi}?text=${encodeURIComponent(texto)}`;
}

/** Link do WhatsApp com a mensagem já escrita, ou `null` sem número. */
export function whatsappCom(texto: string) {
  return site.whatsapp ? linkWhatsapp(site.whatsapp, texto) : null;
}

export const whatsappUrl = whatsappCom(
  "Olá! Gostaria de fazer uma encomenda.",
);

/** "iFood e 99Food" — para usar no meio de uma frase. */
export const deliveryTexto = site.delivery
  .map((d) => d.nome)
  .join(" e ");

export const fullAddress = `${site.street} — ${site.city}/${site.state} · ${site.zip}`;

/** Endereço por extenso: é o dado confirmado, e o que os apps entendem. */
const enderecoBusca = `${site.street}, ${site.city} - ${site.state}, ${site.zip}`;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  enderecoBusca,
)}&z=17&hl=pt-BR&output=embed`;

export const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  enderecoBusca,
)}`;
export const wazeUrl = `https://www.waze.com/ul?q=${encodeURIComponent(
  enderecoBusca,
)}&navigate=yes`;

export const googlePlaceUrl = "https://www.google.com/maps?cid=9761951682365984765";
export const googleReviewsUrl = `${googlePlaceUrl}#lrd=0x9908161e97f039:0x87796b5585f38ffd,1`;

/**
 * O que a casa oferece, uma palavra cada.
 *
 * ATENÇÃO: antes isto era "o que os clientes mais citam nas avaliações" —
 * uma lista de terceiros, com o hedge embutido no rótulo. Agora o site diz
 * na primeira pessoa "o que você encontra aqui", então cada item virou
 * afirmação da padaria. O que entrar nesta lista precisa estar em
 * `docs/fatos-confirmados.md`.
 */
export const oQueTem = [
  "Café da manhã",
  "Almoço",
  "Pães",
  "Bolos",
  "Tortas",
  "Sanduíches",
  "Sem açúcar",
  "Mercearia",
  "Tabacaria",
];

export type NavItem = { label: string; href: string; hint: string };

export const navigation: NavItem[] = [
  { label: "Café da manhã", href: "#cafe-da-manha", hint: "Aberto desde as 6h" },
  { label: "Almoço", href: "#almoco", hint: "O prato de hoje" },
  { label: "Confeitaria", href: "#confeitaria", hint: "Bolos, tortas e doces" },
  { label: "Encomendas", href: "#encomendas", hint: "Festa e fim de ano" },
  { label: "Onde estamos", href: "#contato", hint: "Centro de Petrópolis" },
];

/** Navegação completa, usada no rodapé. */
export const navigationCompleta: NavItem[] = [
  { label: "A Padaria", href: "#a-padaria", hint: `Desde ${site.since}` },
  ...navigation.slice(0, 3),
  { label: "Galeria", href: "#galeria", hint: "Fotos da casa" },
  ...navigation.slice(3),
  { label: "Perguntas", href: "#perguntas", hint: "Dúvidas comuns" },
];

/** Horário de funcionamento, para o indicador de aberto/fechado. */
export const expediente = { abre: 6, fecha: 22, fuso: "America/Sao_Paulo" } as const;

/** Ano corrente em Petrópolis — o fuso de quem acessa não muda a conta. */
function anoAtual(agora = new Date()) {
  return Number(
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
    }).format(agora),
  );
}

/** Quantos anos de casa. Em 2026 são 22; a conta se atualiza sozinha. */
export function anosDeCasa(agora = new Date()) {
  return anoAtual(agora) - site.since;
}

const dezenaPorExtenso: Record<number, string> = {
  20: "vinte",
  30: "trinta",
  40: "quarenta",
  50: "cinquenta",
  60: "sessenta",
  70: "setenta",
  80: "oitenta",
  90: "noventa",
};

/**
 * A década cheia, por extenso, para frases do tipo "há mais de vinte anos".
 * Vira "trinta" sozinho em 2034, sem ninguém precisar lembrar.
 */
export function decadaDeCasa(agora = new Date()) {
  const d = Math.floor(anosDeCasa(agora) / 10) * 10;
  return dezenaPorExtenso[d] ?? String(d);
}
