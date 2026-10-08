type TickerProduct = {
  id: number;
  nameBn: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const productEndpoints = [
  "https://api.api-store.workers.dev/api/bazardor/products",
  "https://api.abcz.workers.dev/api/bazardor/products",
];

const unitLabels: Record<TickerProduct["unit"], string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const bengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

async function getProducts(): Promise<TickerProduct[]> {
  for (const endpoint of productEndpoints) {
    try {
      const response = await fetch(endpoint, { next: { revalidate: 3600 } });

      if (!response.ok) continue;

      const products: unknown = await response.json();
      if (Array.isArray(products)) return products as TickerProduct[];
    } catch {
      // Try the alternative endpoint.
    }
  }

  return [];
}

function TickerItems({ products, hidden = false }: { products: TickerProduct[]; hidden?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-8 pr-8 ${hidden ? "price-ticker-copy" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {products.map((product) => {
        const changeStyles = {
          up: "text-emerald-300",
          down: "text-red-300",
          flat: "text-slate-400",
        }[product.change.dir];
        const changeSymbol = { up: "▲", down: "▼", flat: "•" }[product.change.dir];

        return (
          <span key={product.id} className="flex shrink-0 items-center gap-2 text-sm">
            <span aria-hidden="true" className="text-base">
              {product.image}
            </span>
            <span className="font-medium text-slate-200">{product.nameBn}</span>
            <span className="font-semibold text-white">
              ৳{bengaliNumber.format(product.today)}/{unitLabels[product.unit]}
            </span>
            <span className={`font-semibold ${changeStyles}`}>
              {changeSymbol} {bengaliNumber.format(Math.abs(product.change.pct))}%
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default async function PriceTicker() {
  const products = (await getProducts()).slice(0, 12);

  if (products.length === 0) return null;

  return (
    <aside
      aria-label="আজকের পণ্যের দাম"
      className="price-ticker overflow-hidden bg-emerald-950 py-2.5"
    >
      <div className="price-ticker-track flex w-max items-center">
        <TickerItems products={products} />
        <TickerItems products={products} hidden />
      </div>
    </aside>
  );
}
