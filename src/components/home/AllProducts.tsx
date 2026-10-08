import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";

export default async function AllProducts() {
  const products = await getProducts();
  return <section id="সব-পণ্য" className="scroll-mt-8 bg-[#f7faf7] py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><p className="text-sm font-bold tracking-widest text-emerald-700">আজকের হালনাগাদ দাম</p><h2 className="mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl">সব পণ্য</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন।</p></div><ProductGrid products={products} /></div></section>;
}
