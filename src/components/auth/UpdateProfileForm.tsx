"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ name }: { name: string }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    if (nextName.length < 2) { toast.error("নাম অন্তত ২ অক্ষরের হতে হবে"); return; }
    setPending(true);
    const result = await authClient.updateUser({ name: nextName });
    setPending(false);
    if (result.error) { toast.error(result.error.message ?? "তথ্য আপডেট হয়নি"); return; }
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }
  return <form onSubmit={submit} className="space-y-5"><label className="form-control"><span className="label-text mb-2">নাম</span><input name="name" defaultValue={name} minLength={2} required className="input input-bordered w-full" /></label><button disabled={pending} className="btn w-full border-0 bg-emerald-700 text-white hover:bg-emerald-800">{pending ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}</button></form>;
}
