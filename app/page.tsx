import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-violet-700/20 via-fuchsia-700/10 to-transparent px-6 py-16 shadow-xl sm:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[auto,1fr]">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/arcaneum-logo.jpeg"
            alt="Arcaneum Logo"
            width={120}
            height={120}
            className="rounded-xl ring-1 ring-neutral-800"
            priority
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-neutral-100">Discover</span>{" "}
            <span className="text-violet-300">Your Magic</span>
          </h1>
          <p className="mt-4 text-neutral-300">
            Tarot pulls, astrology, and hidden wisdom — all in one app.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/tarot"
              className="rounded-lg bg-violet-700 px-4 py-2 font-medium text-white hover:bg-violet-600"
            >
              Try Tarot
            </Link>
            <Link
              href="/astrology"
              className="rounded-lg border border-neutral-700 px-4 py-2 font-medium text-neutral-200 hover:bg-neutral-800"
            >
              Astrology
            </Link>
            <Link
              href="/learn"
              className="rounded-lg border border-neutral-700 px-4 py-2 font-medium text-neutral-200 hover:bg-neutral-800"
            >
              Learn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
