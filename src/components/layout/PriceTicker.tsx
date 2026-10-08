import { getProducts } from "@/lib/api";
import { bengaliNumber, unitLabels } from "@/lib/utils";
import type { Product } from "@/types";

function TickerItems({ products, hidden = false }: { products: Product[]; hidden?: boolean }) {
  return <div className={`flex shrink-0 items-center gap-8 pr-8 ${hidden ? "price-ticker-copy" : ""}`} aria-hidden={hidden || undefined}>{products.map((product) => {
    const colors = { up: "text-emerald-300", down: "text-red-300", flat: "text-slate-400" };
    const symbols = { up: "▲", down: "▼", flat: "•" };
    return <span key={product.id} className="flex shrink-0 items-center gap-2 text-sm"><span aria-hidden="true" className="text-base">{product.image}</span><span className="font-medium text-slate-200">{product.nameBn}</span><span className="font-semibold text-white">৳{bengaliNumber.format(product.today)}/{unitLabels[product.unit]}</span><span className={`font-semibold ${colors[product.change.dir]}`}>{symbols[product.change.dir]} {bengaliNumber.format(Math.abs(product.change.pct))}%</span></span>;
  })}</div>;
}

export default async function PriceTicker() {
  const products = (await getProducts()).slice(0, 12);
  if (!products.length) return null;
  return <aside aria-label="আজকের পণ্যের দাম" className="price-ticker overflow-hidden bg-emerald-950 py-2.5"><div className="price-ticker-track flex w-max items-center"><TickerItems products={products} /><TickerItems products={products} hidden /></div></aside>;
}
