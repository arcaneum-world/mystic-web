"use client";

import { useState } from "react";
import { drawThree, type Drawn } from "@/lib/tarot";
import Link from "next/link";

const POSITIONS = ["Past", "Present", "Future"] as const;

export default function TarotPage() {
  const [spread, setSpread] = useState<Drawn[] | null>(null);
  const [reveal, setReveal] = useState(false);

  const handleDraw = () => {
    setSpread(drawThree());
    setReveal(true);
  };

  const handleReset = () => {
    setSpread(null);
    setReveal(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-3 py-6 md:px-4 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold md:text-4xl">Three-Card Spread</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDraw}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            {spread ? "Draw Again" : "Draw Cards"}
          </button>
          {spread && (
            <button
              onClick={handleReset}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-800"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {!spread && (
        <p className="text-neutral-300">
          Click <span className="font-medium text-violet-300">Draw Cards</span>{" "}
          to pull Past / Present / Future from the Major Arcana.
        </p>
      )}

      {spread && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {spread.map((d, i) => (
            <div
              key={d.card.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
            >
              <div className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
                {POSITIONS[i]}
              </div>

              <div className="mb-3 h-44 w-full rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-900/60 ring-1 ring-neutral-800" />

              <div className="text-lg font-semibold">
                {d.card.name} {d.reversed ? " (Reversed)" : ""}
              </div>

              <p className="mt-2 text-sm text-neutral-300">
                {d.reversed ? d.card.reversed : d.card.upright}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-sm text-neutral-400">
        Tip: add images later by dropping card art in <code>/public/cards</code>{" "}
        and rendering with <code>next/image</code>.
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-block rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
        >
          ← Back Home
        </Link>
      </div>
    </div>
  );
}
