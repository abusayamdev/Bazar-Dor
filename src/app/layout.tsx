import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
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
        {children}
      </body>
    </html>
  );
}
