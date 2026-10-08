import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackURL=/profile");
  const { user } = session;
  return <main className="flex flex-1 items-center justify-center px-4 py-14"><section className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm">{user.image ? <Image src={user.image} alt={`${user.name} এর প্রোফাইল ছবি`} width={96} height={96} className="mx-auto size-24 rounded-full object-cover" /> : <div className="mx-auto grid size-24 place-items-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-800">{user.name.charAt(0)}</div>}<h1 className="mt-5 text-3xl font-bold text-emerald-950">{user.name}</h1><p className="mt-2 text-slate-600">{user.email}</p><Link href="/profile/update" className="btn mt-8 border-0 bg-emerald-700 text-white hover:bg-emerald-800">তথ্য আপডেট করুন</Link></section></main>;
}
