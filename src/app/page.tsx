import Hero from "@/components/home/Hero";
import AllProducts from "@/components/home/AllProducts";
import PriceChangeSection from "@/components/home/PriceChangeSection";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Suspense fallback={<section className="mx-auto max-w-7xl px-4 py-20"><ProductGridSkeleton count={6} /></section>}>
        <PriceChangeSection />
      </Suspense>
      <Suspense fallback={<section className="mx-auto max-w-7xl px-4 py-20"><ProductGridSkeleton /></section>}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
