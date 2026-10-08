import Link from "next/link";
import BengaliDate from "./BengaliDate";

const authLinks = (
  <>
    <Link
      href="/signin"
      className="btn btn-ghost btn-sm text-emerald-900 sm:btn-md"
    >
      সাইন ইন
    </Link>
    <Link
      href="/signup"
      className="btn btn-sm border-0 bg-emerald-700 text-white shadow-none hover:bg-emerald-800 sm:btn-md"
    >
      সাইন আপ
    </Link>
  </>
);

export default function Navbar() {
  return (
    <header className="border-b border-emerald-100 bg-white">
      <nav
        aria-label="প্রধান নেভিগেশন"
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর হোম">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-2xl"
          >
            🛒
          </span>
          <span>
            <span className="block text-xl font-bold leading-tight text-emerald-950">
              বাজার দর
            </span>
            <span className="block text-xs text-slate-500">
              <BengaliDate />
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">{authLinks}</div>

        <details className="dropdown dropdown-end sm:hidden">
          <summary
            className="btn btn-ghost btn-square list-none text-emerald-950"
            aria-label="নেভিগেশন মেনু খুলুন"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-6"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="dropdown-content z-10 mt-2 flex w-40 flex-col gap-2 rounded-xl border border-emerald-100 bg-white p-3 shadow-lg">
            {authLinks}
          </div>
        </details>
      </nav>
    </header>
  );
}
