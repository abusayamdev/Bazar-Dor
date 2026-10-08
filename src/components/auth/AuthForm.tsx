"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const isSignUp = mode === "signup";

  useEffect(() => {
    if (!isSignUp && new URLSearchParams(window.location.search).has("callbackURL")) toast("এই পেজটি দেখতে আগে সাইন ইন করুন।");
  }, [isSignUp]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    if (!email || password.length < 8 || (isSignUp && !name)) { toast.error("সঠিক তথ্য দিন; পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।"); return; }
    setPending(true);
    try {
      if (isSignUp) {
        const result = await signUp.email({ name, email, password });
        if (result.error) throw new Error(result.error.message);
        toast.success("রেজিস্ট্রেশন সফল হয়েছে");
        router.push("/signin");
      } else {
        const callbackURL = new URLSearchParams(window.location.search).get("callbackURL") || "/";
        const result = await signIn.email({ email, password, callbackURL });
        if (result.error) throw new Error(result.error.message);
        toast.success("সাইন ইন সফল হয়েছে");
        router.push(callbackURL);
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "অনুরোধটি সম্পন্ন হয়নি");
    } finally { setPending(false); }
  }

  async function social(provider: "google" | "github") {
    await signIn.social({ provider, callbackURL: "/" });
  }

  return <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"><div className="text-center"><span className="text-4xl" aria-hidden="true">🛒</span><h1 className="mt-3 text-3xl font-bold text-emerald-950">{isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "স্বাগতম"}</h1><p className="mt-2 text-sm text-slate-500">{isSignUp ? "বাজার দর ব্যবহার করতে নিবন্ধন করুন" : "আপনার অ্যাকাউন্টে সাইন ইন করুন"}</p></div><form onSubmit={handleSubmit} className="mt-8 space-y-4">{isSignUp && <label className="form-control"><span className="label-text mb-2">নাম</span><input className="input input-bordered w-full" name="name" required autoComplete="name" /></label>}<label className="form-control"><span className="label-text mb-2">ইমেইল</span><input className="input input-bordered w-full" name="email" type="email" required autoComplete="email" /></label><label className="form-control"><span className="label-text mb-2">পাসওয়ার্ড</span><input className="input input-bordered w-full" name="password" type="password" minLength={8} required autoComplete={isSignUp ? "new-password" : "current-password"} /></label><button className="btn w-full border-0 bg-emerald-700 text-white hover:bg-emerald-800" disabled={pending}>{pending ? <span className="loading loading-spinner loading-sm" /> : isSignUp ? "রেজিস্ট্রেশন" : "সাইন ইন"}</button></form><div className="divider text-xs text-slate-400">অথবা</div><div className="grid grid-cols-2 gap-3"><button type="button" className="btn btn-outline" onClick={() => social("google")}>G Google</button><button type="button" className="btn btn-outline" onClick={() => social("github")}>GitHub</button></div><p className="mt-6 text-center text-sm text-slate-600">{isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"} <Link className="font-bold text-emerald-700 hover:underline" href={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "সাইন ইন" : "অ্যাকাউন্ট তৈরি করুন"}</Link></p></div>;
}
