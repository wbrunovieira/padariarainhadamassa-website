import { LoadingBrand } from "@/components/loading-brand";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-5 pt-[var(--header-h)]">
      <LoadingBrand />
    </div>
  );
}
