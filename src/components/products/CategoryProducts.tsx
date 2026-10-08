"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "low") copy.sort((a, b) => a.today - b.today);
    if (sort === "high") copy.sort((a, b) => b.today - a.today);
    return copy;
  }, [products, sort]);
  return <><div className="mb-8 flex justify-end"><label className="flex items-center gap-3 text-sm font-medium text-slate-700">সাজান<select className="select select-bordered bg-white" value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">ডিফল্ট</option><option value="low">দাম কম থেকে বেশি</option><option value="high">দাম বেশি থেকে কম</option></select></label></div>{sorted.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{sorted.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="rounded-2xl bg-white p-10 text-center text-slate-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>}</>;
}
