import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getPlaceStats } from "@/lib/google-place";

/**
 * O site institucional. O cardápio de mesa e o admin ficam fora daqui.
 *
 * Busca `stats` aqui para o cabeçalho e a home lerem a MESMA fonte. É o
 * mesmo fetch com revalidate da página, então não custa requisição nova.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const stats = await getPlaceStats();

  return (
    <>
      <SiteHeader stats={stats} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
