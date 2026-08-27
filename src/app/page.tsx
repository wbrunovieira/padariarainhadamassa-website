import { AboutSection } from "@/components/about-section";
import { BrandDivider } from "@/components/brand-divider";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { LunchSection } from "@/components/lunch-section";
import { OrdersSection } from "@/components/orders-section";
import { LocationSection } from "@/components/location-section";
import { acompanhamentos, fixos, semana } from "@/lib/almoco";
import { getPlaceStats } from "@/lib/google-place";
import { site } from "@/lib/site";

// Sem aggregateRating de propósito: a nota é do Google, e o Google não
// aceita avaliação de terceiros no schema do próprio site.
const schema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  legalName: site.legalName,
  image: "https://padariarainhadamassa.com.br/brand/logo-rainha-da-massa.png",
  telephone: "+552433022752",
  priceRange: "R$",
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.state,
    postalCode: site.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "22:00",
    },
  ],
  sameAs: [site.instagram],
  servesCuisine: "Brasileira",
  hasMenu: {
    "@type": "Menu",
    name: "Almoço",
    inLanguage: "pt-BR",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Todo dia",
        description: acompanhamentos,
        hasMenuItem: fixos.map((item) => ({
          "@type": "MenuItem",
          name: item.nome,
        })),
      },
      {
        "@type": "MenuSection",
        name: "Prato do dia",
        hasMenuItem: semana.map((d) => ({
          "@type": "MenuItem",
          name: `${d.nome}: ${d.prato}`,
          description: d.detalhe,
        })),
      },
    ],
  },
};

export default async function Home() {
  const stats = await getPlaceStats();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <HeroSection stats={stats} />

      <BrandDivider />

      <AboutSection stats={stats} />

      <LunchSection />

      <GallerySection />

      <OrdersSection />

      <LocationSection />
    </>
  );
}
