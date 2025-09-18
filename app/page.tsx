"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-3 py-6 md:px-4 md:py-10">
      <section className="rounded-2xl border border-neutral-800 bg-gradient-to-b from-violet-900/20 to-neutral-900 p-4 md:p-8">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-xl bg-black/30 md:mb-8 md:h-32 md:w-32">
          <Image
            src="/arcaneum-logo.jpg?v=2"
            alt="Arcaneum"
            width={128}
            height={128}
            className="h-16 w-16 rounded md:h-20 md:w-20"
            priority
          />
        </div>

        <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          <span className="text-neutral-100">Discover </span>
          <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
            Your Magic
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-300 md:mt-5">
          Tarot pulls, astrology, and hidden wisdom — all in one app.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/tarot"
            className="w-full max-w-xs rounded-lg bg-violet-600 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-violet-500 sm:w-auto"
          >
            Try Tarot
          </Link>
          <Link
            href="/astrology"
            className="w-full max-w-xs rounded-lg border border-neutral-700 px-5 py-3 text-center text-sm font-medium text-neutral-200 transition hover:bg-neutral-800 sm:w-auto"
          >
            Astrology
          </Link>
          <Link
            href="/learn"
            className="w-full max-w-xs rounded-lg border border-neutral-700 px-5 py-3 text-center text-sm font-medium text-neutral-200 transition hover:bg-neutral-800 sm:w-auto"
          >
            Learn
          </Link>
        </div>
      </section>
    </div>
  );
}
