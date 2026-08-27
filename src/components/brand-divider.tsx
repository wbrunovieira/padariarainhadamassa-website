import Image from "next/image";

/** Faixa com a coroa recortada do brasão, separando seções. */
export function BrandDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-[88rem] items-center gap-5 px-5 lg:px-10"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-espresso/20" />
      <Image
        src="/brand/ornamento-coroa.png"
        alt=""
        width={480}
        height={199}
        className="h-5 w-auto opacity-45"
      />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-espresso/20" />
    </div>
  );
}
