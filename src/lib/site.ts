export const site = {
  name: "Padaria Rainha da Massa",
  shortName: "Rainha da Massa",
  city: "Petrópolis",
  state: "RJ",
  // TODO: substituir pelos dados reais da padaria
  phone: "+55 24 99999-0000",
  whatsapp: "5524999990000",
  address: "Rua Exemplo, 123 — Centro, Petrópolis/RJ",
  hours: "Todos os dias · 6h às 20h",
  instagram: "https://instagram.com/padariarainhadamassa",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Olá! Gostaria de fazer um pedido na Padaria Rainha da Massa.",
)}`;

export type NavItem = { label: string; href: string; hint: string };

export const navigation: NavItem[] = [
  { label: "A Padaria", href: "#a-padaria", hint: "Nossa história" },
  { label: "Pães", href: "#paes", hint: "Fermentação natural" },
  { label: "Confeitaria", href: "#confeitaria", hint: "Doces e bolos" },
  { label: "Encomendas", href: "#encomendas", hint: "Festas e eventos" },
  { label: "Onde estamos", href: "#contato", hint: "Centro de Petrópolis" },
];
