import { LoadingBrand } from "@/components/loading-brand";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream-light px-5">
      <LoadingBrand texto="Abrindo o cardápio" />
    </div>
  );
}
