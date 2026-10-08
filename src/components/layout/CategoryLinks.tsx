"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

type CategoryLinksProps = {
  categories: Category[];
};

export default function CategoryLinks({ categories }: CategoryLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "সব পণ্য", icon: "🛍️" },
    ...categories.map((category) => ({
      href: `/category/${category.slug}`,
      label: category.nameBn,
      icon: category.icon,
    })),
  ];

  return links.map((link) => {
    const isActive = pathname === link.href;

    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-emerald-700 text-white"
            : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
        }`}
      >
        <span aria-hidden="true" className="mr-1.5">
          {link.icon}
        </span>
        {link.label}
      </Link>
    );
  });
}
