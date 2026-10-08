import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/auth/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackURL=/profile/update");
  return <main className="flex flex-1 items-center justify-center px-4 py-14"><section className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm"><h1 className="text-3xl font-bold text-emerald-950">প্রোফাইল আপডেট</h1><p className="mt-2 text-sm text-slate-500">আপনার প্রদর্শিত নাম পরিবর্তন করুন।</p><div className="mt-8"><UpdateProfileForm name={session.user.name} /></div></section></main>;
}
