import Image from "next/image";

const products = [
  {
    name: "Kingsday Reversible Zipper Hoodie",
    price: "€85",
    image: "/merch/kingsday-reversible-zipper-hoodie.jpg",
    url: "https://www.instagram.com/p/DXcdo-TAoi-/?img_index=8",
  },
];

export default function MerchPage() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pt-[76px] md:px-8">
      <h1 className="display text-[clamp(3rem,10vw,103px)]">Merch</h1>
      <p className="mt-[46px] max-w-[62ch]">Limited drops only. Apparel tied to our events and collaborations.</p>
      <div className="mt-[76px] grid gap-[19px] sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="flex flex-col border border-ink bg-paper">
            <Image src={product.image} alt={product.name} width={1440} height={1800} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="h-auto w-full border-b border-ink" />
            <div className="flex flex-1 flex-col gap-4 px-5 py-5 md:px-[30px]">
              <div className="flex items-start justify-between gap-4">
                <h2 className="display text-[22px] leading-[0.95] md:text-[26px]">{product.name}</h2>
                <p className="text-[22px] leading-none md:text-[26px]">{product.price}</p>
              </div>
              <a href={product.url} target="_blank" rel="noreferrer" className="pill pill-lg pill-solid mt-auto self-start">
                Order via Instagram ↗
              </a>
            </div>
          </article>
        ))}
        <div className="grid-paper flex min-h-[240px] flex-col justify-end border border-ink p-5 md:p-[30px]">
          <p className="label">Next drop</p>
          <p className="display mt-2 text-[22px] md:text-[26px]">Coming soon</p>
        </div>
      </div>
    </section>
  );
}
