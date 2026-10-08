"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex flex-1 items-center justify-center px-4 py-20 text-center"><div><h1 className="text-3xl font-bold text-emerald-950">কিছু একটা সমস্যা হয়েছে</h1><p className="mt-3 text-slate-600">অনুগ্রহ করে আবার চেষ্টা করুন।</p><button type="button" onClick={retry} className="btn mt-7 border-0 bg-emerald-700 text-white hover:bg-emerald-800">আবার চেষ্টা করুন</button></div></main>;
}
