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

  street: "R. Saldanha Marinho, 7",
  city: "Petrópolis",
  state: "RJ",
  zip: "25640-233",

  phone: "(24) 3302-2752",
  phoneHref: "tel:+552433022752",

  // PENDENTE: bio do Instagram diz "domingo a domingo das 6h às 22h";
  // o Google mostra 6h às 21h. Usando a versão do próprio negócio.
  hours: "Todos os dias · 6h às 22h",
  hoursShort: "6h às 22h",

  instagram: "https://www.instagram.com/rainha_da_massa_/",
  instagramHandle: "@rainha_da_massa_",

  delivery: "iFood",
  // PENDENTE: não há link público direto da loja no iFood.
  deliveryUrl: null as string | null,
  // PENDENTE: cliente não divulga número de WhatsApp em nenhum canal.
  whatsapp: null as string | null,

  rating: { value: 4.5, count: 168, source: "Google" },
} as const;

export const fullAddress = `${site.street} — ${site.city}/${site.state} · ${site.zip}`;

export type NavItem = { label: string; href: string; hint: string };

export const navigation: NavItem[] = [
  { label: "A Padaria", href: "#a-padaria", hint: `Desde ${site.since}` },
  { label: "Padaria", href: "#padaria", hint: "Pães e sanduíches" },
  { label: "Confeitaria", href: "#confeitaria", hint: "Bolos e tortas" },
  { label: "Encomendas", href: "#encomendas", hint: "Pelo telefone" },
  { label: "Onde estamos", href: "#contato", hint: "Saldanha Marinho" },
];
