"use client";

import Link from "next/link";
import { LogOut, Menu, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import BengaliDate from "./BengaliDate";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ fetchOptions: { onSuccess: () => { toast.success("সাইন আউট হয়েছে"); router.push("/"); router.refresh(); } } });
  }

  const actions = isPending ? <span className="loading loading-spinner loading-sm text-emerald-700" /> : session ? <><Link href="/profile" className="btn btn-ghost btn-sm text-emerald-900 sm:btn-md"><UserRound className="size-4" /> প্রোফাইল</Link><button type="button" onClick={handleSignOut} className="btn btn-sm border-0 bg-emerald-700 text-white shadow-none hover:bg-emerald-800 sm:btn-md"><LogOut className="size-4" /> সাইন আউট</button></> : <><Link href="/signin" className="btn btn-ghost btn-sm text-emerald-900 sm:btn-md">সাইন ইন</Link><Link href="/signup" className="btn btn-sm border-0 bg-emerald-700 text-white shadow-none hover:bg-emerald-800 sm:btn-md">সাইন আপ</Link></>;

  return <header className="border-b border-emerald-100 bg-white"><nav aria-label="প্রধান নেভিগেশন" className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"><Link href="/" className="flex items-center gap-3" aria-label="বাজার দর হোম"><span aria-hidden="true" className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-2xl">🛒</span><span><span className="block text-xl font-bold leading-tight text-emerald-950">বাজার দর</span><span className="block text-xs text-slate-500"><BengaliDate /></span></span></Link><div className="hidden items-center gap-2 sm:flex">{actions}</div><details className="dropdown dropdown-end sm:hidden"><summary className="btn btn-ghost btn-square list-none text-emerald-950" aria-label="নেভিগেশন মেনু খুলুন"><Menu className="size-6" /></summary><div className="dropdown-content z-20 mt-2 flex w-44 flex-col gap-2 rounded-xl border border-emerald-100 bg-white p-3 shadow-lg">{actions}</div></details></nav></header>;
}
