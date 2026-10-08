import Image from "next/image";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div className="text-center md:text-left">
          <p className="mb-4 text-sm font-bold tracking-widest text-emerald-700">
            প্রতিদিনের বাজারদর, এক জায়গায়
          </p>
          <h1 className="text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl lg:text-6xl">
            বাজারের সঠিক দাম
            <span className="block text-emerald-700">জানুন সহজেই</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg md:mx-0">
            নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দামের পরিবর্তন এবং বাজারভেদে
            তুলনা দেখুন এক নজরে।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-8 border-0 bg-emerald-700 px-7 text-white shadow-sm hover:bg-emerald-800"
          >
            সব পণ্যের দাম দেখুন
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute size-72 rounded-full bg-emerald-100/80 blur-3xl sm:size-80"
          />
          <Image
            src="/bazar-hero.png"
            alt="তাজা ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
            width={320}
            height={320}
            priority
            className="relative h-auto w-64 drop-shadow-xl sm:w-80"
            style={{ height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
