import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import CategoryLinks from "./CategoryLinks";

export default async function CategoryNav() {
  const categories = await getCategories();
  return (
    <nav aria-label="পণ্যের ক্যাটাগরি" className="border-b border-emerald-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-2">
          {categories.length ? <Suspense fallback={<span className="text-sm text-slate-500">ক্যাটাগরি লোড হচ্ছে…</span>}><CategoryLinks categories={categories} /></Suspense> : <span className="text-sm text-slate-500">ক্যাটাগরি পাওয়া যায়নি</span>}
        </div>
      </div>
    </nav>
  );
}
