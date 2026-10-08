import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Suspense } from "react";
import CategoryNav from "@/components/layout/CategoryNav";
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${notoSansBengali.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Navbar />
        <Suspense
          fallback={
            <div className="h-16 border-b border-emerald-100 bg-white" aria-hidden="true" />
          }
        >
          <CategoryNav />
        </Suspense>
        <Suspense
          fallback={<div className="h-10 bg-emerald-950" aria-hidden="true" />}
        >
          <PriceTicker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
