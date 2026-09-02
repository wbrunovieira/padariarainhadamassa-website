import { AboutSection } from "@/components/about-section";
import { BreakfastSection } from "@/components/breakfast-section";
import { ConfectionerySection } from "@/components/confectionery-section";
import { FaqSection } from "@/components/faq-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { BrandDivider } from "@/components/brand-divider";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { LunchSection } from "@/components/lunch-section";
import { OrdersSection } from "@/components/orders-section";
import { RoastChickenSection } from "@/components/roast-chicken-section";
import { LocationSection } from "@/components/location-section";
import { acompanhamentos, diaEmPetropolis, fixos, semana } from "@/lib/almoco";
import { getPlaceStats } from "@/lib/google-place";
import { perguntas } from "@/lib/perguntas";
import { site } from "@/lib/site";

// Sem aggregateRating de propósito: a nota é do Google, e o Google não
// aceita avaliação de terceiros no schema do próprio site.
const schema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  legalName: site.legalName,
  image: "https://padariarainhadamassa.com.br/brand/logo-rainha-da-massa.png",
  // Deriva do phoneHref para o número não existir digitado em dois lugares.
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
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
        name: "Sempre no cardápio",
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

/** 15 min: o HTML servido nunca erra o dia por mais que isso. */
export const revalidate = 900;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntas.map((p) => ({
    "@type": "Question",
    name: p.pergunta,
    acceptedAnswer: { "@type": "Answer", text: p.resposta },
  })),
};

export default async function Home() {
  const stats = await getPlaceStats();
  const diaInicial = diaEmPetropolis();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection stats={stats} />

      <BrandDivider />

      <AboutSection stats={stats} />

      <BreakfastSection />

      <LunchSection diaInicial={diaInicial} />

      <RoastChickenSection />

      <ConfectionerySection />

      <GallerySection />

      <OrdersSection />

      <SocialProofSection stats={stats} />

      <FaqSection />

      <LocationSection />
    </>
  );
}
