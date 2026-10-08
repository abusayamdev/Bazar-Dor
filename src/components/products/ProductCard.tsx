import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react";
import { bengaliNumber, formatPrice, unitLabels } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const change = { up: { Icon: ArrowUp, className: "text-emerald-700", label: "বেড়েছে" }, down: { Icon: ArrowDown, className: "text-red-600", label: "কমেছে" }, flat: { Icon: Minus, className: "text-slate-500", label: "অপরিবর্তিত" } }[product.change.dir];
  return <article className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between gap-4"><span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-3xl">{product.image}</span><span className={`flex items-center gap-1 text-xs font-semibold ${change.className}`}><change.Icon className="size-3.5" aria-hidden="true" />{bengaliNumber.format(Math.abs(product.change.pct))}%<span className="sr-only">{change.label}</span></span></div><h3 className="mt-5 text-lg font-bold text-emerald-950">{product.nameBn}</h3><p className="mt-1 text-sm text-slate-500">প্রতি {unitLabels[product.unit]}</p><div className="mt-5 flex items-end justify-between gap-3"><p className="text-2xl font-bold text-slate-950">{formatPrice(product.today)}</p><Link href={`/product/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900">বিস্তারিত <ArrowRight className="size-4" aria-hidden="true" /></Link></div></article>;
}
