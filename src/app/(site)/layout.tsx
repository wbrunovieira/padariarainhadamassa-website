import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** O site institucional. O cardápio de mesa e o admin ficam fora daqui. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
