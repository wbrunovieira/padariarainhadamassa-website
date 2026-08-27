import { AboutSection } from "@/components/about-section";
import { BrandDivider } from "@/components/brand-divider";
import { HeroSection } from "@/components/hero-section";
import { LocationSection } from "@/components/location-section";
import { getPlaceStats } from "@/lib/google-place";
import { navigation, site } from "@/lib/site";

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

      {/* Ainda sem conteúdo — dependem do cardápio real da padaria */}
      {navigation.slice(1, 4).map((item) => (
        <section
          key={item.href}
          id={item.href.replace("#", "")}
          className="border-t border-espresso/10"
        >
          <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-32 lg:px-10">
            <p className="eyebrow text-gold">{item.hint}</p>
            <h2 className="font-display text-4xl italic text-espresso sm:text-5xl">
              {item.label}
            </h2>
            <p className="mt-2 max-w-md text-espresso-soft">Em breve.</p>
          </div>
        </section>
      ))}

      <LocationSection />
    </>
  );
}
