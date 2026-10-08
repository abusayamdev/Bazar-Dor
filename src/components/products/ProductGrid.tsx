import { getProducts } from "@/lib/api";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="পণ্য লোড হচ্ছে">{Array.from({ length: count }, (_, index) => <div key={index} className="h-64 animate-pulse rounded-2xl bg-emerald-100/60" />)}</div>;
}

export default async function ProductGrid({ products }: { products?: Product[] }) {
  const items = products ?? (await getProducts());
  if (!items.length) return <p className="rounded-2xl bg-white p-8 text-center text-slate-500">কোনো পণ্য পাওয়া যায়নি।</p>;
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
