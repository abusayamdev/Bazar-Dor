import { Suspense } from "react";

async function CategoryHeading({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;

  return (
    <div className="text-center">
      <p className="text-sm font-semibold text-emerald-700">ক্যাটাগরি</p>
      <h1 className="mt-2 text-4xl font-bold text-emerald-950">{slug}</h1>
      <p className="mt-4 text-slate-600">এই ক্যাটাগরির পণ্য পরবর্তী ধাপে যোগ করা হবে।</p>
    </div>
  );
}

export default function CategoryPage(props: PageProps<"/category/[slug]">) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <Suspense fallback={<p className="text-slate-500">ক্যাটাগরি লোড হচ্ছে…</p>}>
        <CategoryHeading {...props} />
      </Suspense>
    </main>
  );
}
