import { Suspense } from "react";
import CategoryLinks from "./CategoryLinks";

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const categoryEndpoints = [
  "https://api.api-store.workers.dev/api/bazardor/categories",
  "https://api.abcz.workers.dev/api/bazardor/categories",
];

async function getCategories(): Promise<Category[]> {
  for (const endpoint of categoryEndpoints) {
    try {
      const response = await fetch(endpoint, { next: { revalidate: 3600 } });

      if (!response.ok) continue;

      const categories: unknown = await response.json();
      if (Array.isArray(categories)) return categories as Category[];
    } catch {
      // Try the alternative endpoint.
    }
  }

  return [];
}

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav aria-label="পণ্যের ক্যাটাগরি" className="border-b border-emerald-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-2">
          {categories.length > 0 ? (
            <Suspense fallback={<span className="text-sm text-slate-500">ক্যাটাগরি লোড হচ্ছে…</span>}>
              <CategoryLinks categories={categories} />
            </Suspense>
          ) : (
            <span className="text-sm text-slate-500">ক্যাটাগরি পাওয়া যায়নি</span>
          )}
        </div>
      </div>
    </nav>
  );
}
