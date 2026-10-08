import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getAveragePrice, formatPrice, unitLabels } from "@/lib/utils";
import { getProductBySlug, getProducts } from "@/lib/api";

export const instant = false;

export async function generateStaticParams() {
  return (await getProducts()).map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const mins = product.markets.map((item) => item.min);
  const maxes = product.markets.map((item) => item.max);
  const minimum = Math.min(...mins);
  const maximum = Math.max(...maxes);
  const average = product.markets.reduce((sum, item) => sum + getAveragePrice(item.min, item.max), 0) / product.markets.length;
  return <main className="flex-1 py-12 sm:py-16"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><header className="rounded-3xl bg-white p-6 shadow-sm sm:p-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><span aria-hidden="true" className="grid size-24 place-items-center rounded-3xl bg-emerald-50 text-6xl">{product.image}</span><div><span className="badge badge-success badge-outline">{product.categoryIcon} {product.categoryNameBn}</span><h1 className="mt-3 text-4xl font-bold text-emerald-950">{product.nameBn}</h1><p className="mt-2 text-slate-600">প্রতি {unitLabels[product.unit]} পণ্যের আজকের বাজারদর ও বাজারভিত্তিক তুলনা।</p></div></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-emerald-50 p-5"><p className="text-sm text-slate-500">সর্বনিম্ন</p><p className="mt-1 text-2xl font-bold">{formatPrice(minimum)}</p></div><div className="rounded-2xl bg-amber-50 p-5"><p className="text-sm text-slate-500">গড় দাম</p><p className="mt-1 text-2xl font-bold">{formatPrice(average)}</p></div><div className="rounded-2xl bg-red-50 p-5"><p className="text-sm text-slate-500">সর্বোচ্চ</p><p className="mt-1 text-2xl font-bold">{formatPrice(maximum)}</p></div></div></header><section className="mt-10"><h2 className="mb-5 text-2xl font-bold text-emerald-950">বাজারভিত্তিক দাম</h2><div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white"><table className="table"><thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr></thead><tbody>{product.markets.map((market) => <tr key={`${market.division}-${market.market}`}><td className="font-semibold">{market.market}</td><td>{market.division}</td><td>{formatPrice(market.min)}</td><td>{formatPrice(market.max)}</td></tr>)}</tbody></table></div></section></div></main>;
}
