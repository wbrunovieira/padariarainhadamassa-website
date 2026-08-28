import { cafeDaManha, confeitaria, maisNoCardapio, tambemTem } from "@/lib/cardapio";
import { encomendas } from "@/lib/encomendas";
import { fixos, semana } from "@/lib/almoco";
import { hosts, siteNoAr } from "@/lib/hosts";
import { anosDeCasa, deliveryTexto, fullAddress, site } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * llms.txt — resumo do negócio em texto limpo, para assistentes que
 * respondem perguntas do tipo "onde almoçar em Petrópolis".
 *
 * É um padrão proposto, não oficial: nenhum dos grandes confirmou que lê.
 * Está aqui porque o conteúdo já existe estruturado, custa pouco e a
 * visibilidade em busca por IA foi apontada como oportunidade real no
 * diagnóstico. Aposta barata, não certeza.
 *
 * SEM PREÇOS, a pedido da cliente — nem aqui, nem na busca.
 * Gerado a partir das mesmas fontes do site, então não sai do ar.
 */
export async function GET() {
  if (!siteNoAr()) {
    return new Response("# Em construção\n", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const linhas = [
    `# ${site.name}`,
    "",
    `> Padaria e confeitaria de bairro em ${site.city}/${site.state}, aberta desde ${site.since} — ${anosDeCasa()} anos. Café da manhã, almoço servido no salão, confeitaria e encomendas. ${site.rating.value.toString().replace(".", ",")} estrelas com ${site.rating.count} avaliações no Google.`,
    "",
    "## Onde e quando",
    "",
    `- Endereço: ${fullAddress}`,
    `- Horário: ${site.hours}`,
    `- Telefone: ${site.phone}`,
    `- E-mail: ${site.email}`,
    `- Instagram: ${site.instagram}`,
    ...site.delivery.map((a) => `- Delivery ${a.nome}: ${a.url}`),
    "",
    "## Almoço",
    "",
    "Servido no salão, todos os dias. Preço único para qualquer prato — consulte no local ou por telefone.",
    "",
    `Sempre no cardápio: ${fixos.map((f) => f.nome).join(", ")}.`,
    "",
    "Prato do dia:",
    "",
    ...semana.map((d) => `- ${d.nome}: ${d.prato} — ${d.detalhe.toLowerCase()}`),
    "",
    "## Café da manhã",
    "",
    `Sai o dia todo: ${cafeDaManha.map((i) => i.nome).join(", ")}.`,
    "",
    `Também: ${maisNoCardapio.join(", ").toLowerCase()}.`,
    "",
    "## Confeitaria",
    "",
    confeitaria.map((i) => `- ${i.nome}${i.nota ? ` — ${i.nota.toLowerCase()}` : ""}`).join("\n"),
    "",
    "## Encomendas",
    "",
    `Combinadas por telefone (${site.phone}) e retiradas na loja.`,
    "",
    ...encomendas.map((e) => `- ${e.titulo}: ${e.texto}`),
    "",
    "## Na loja também tem",
    "",
    `${tambemTem.map((i) => i.nome).join(", ")}.`,
    "",
    "## Observações",
    "",
    `- Delivery pelos aplicativos ${deliveryTexto}. Encomenda de bolo, torta e salgado é por telefone, com retirada na loja.`,
    "- O almoço é servido no salão, para comer sentado. Não é marmitaria.",
    "- Preços não são divulgados online, a pedido da casa.",
    "",
    `Site: https://${hosts.apex}`,
    "",
  ];

  return new Response(linhas.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
