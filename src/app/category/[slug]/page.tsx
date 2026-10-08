import { notFound } from "next/navigation";
import CategoryProducts from "@/components/products/CategoryProducts";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";

export async function generateStaticParams() {
  return (await getCategories()).map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategory(slug), getProductsByCategory(slug)]);
  if (!category) notFound();
  return <main className="flex-1 py-14 sm:py-18"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><header className="mb-10 text-center"><span aria-hidden="true" className="text-5xl">{category.icon}</span><h1 className="mt-3 text-4xl font-bold text-emerald-950">{category.nameBn}</h1><p className="mt-3 text-slate-600">এই ক্যাটাগরির আজকের বাজারদর</p></header><CategoryProducts products={products} /></div></main>;
}
