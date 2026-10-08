import { getProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";

export default async function PriceChangeSection() {
  const products = await getProducts();
  const groups = [{ title: "আজ দাম বেড়েছে ▲", items: products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6) }, { title: "আজ দাম কমেছে ▼", items: products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6) }];
  return <div className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">{groups.map((group) => <section key={group.title}><h2 className="mb-7 text-2xl font-bold text-emerald-950 sm:text-3xl">{group.title}</h2>{group.items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{group.items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="text-slate-500">এই তালিকায় কোনো পণ্য নেই।</p>}</section>)}</div></div>;
}
