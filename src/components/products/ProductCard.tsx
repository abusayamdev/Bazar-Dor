import Link from "next/link";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { bengaliNumber, unitLabels } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const change = {
    up: {
      Icon: ArrowUp,
      className: "bg-emerald-50 text-emerald-700",
      label: "বেড়েছে",
      symbol: "▲",
    },
    down: {
      Icon: ArrowDown,
      className: "bg-red-50 text-red-600",
      label: "কমেছে",
      symbol: "▼",
    },
    flat: {
      Icon: Minus,
      className: "bg-slate-100 text-slate-500",
      label: "অপরিবর্তিত",
      symbol: "—",
    },
  }[product.change.dir];

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
      className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <article className="h-full rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-3xl"
          >
            {product.image}
          </span>
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${change.className}`}>
            <change.Icon className="size-3.5" aria-hidden="true" />
            {change.symbol} {bengaliNumber.format(Math.abs(product.change.pct))}%
            <span className="sr-only">{change.label}</span>
          </span>
        </div>

        <h3 className="mt-5 text-lg font-bold text-emerald-950">{product.nameBn}</h3>
        <p className="mt-1 text-sm text-slate-500">প্রতি {unitLabels[product.unit]}</p>

        <div className="mt-5 border-t border-emerald-50 pt-4">
          <p className="text-xs font-medium text-slate-500">আজকের দাম</p>
          <p className="mt-1 text-2xl font-bold text-slate-950">
            {bengaliNumber.format(product.today)} টাকা
          </p>
        </div>
      </article>
    </Link>
  );
}
