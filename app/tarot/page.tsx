"use client";

import { useState } from "react";
import { drawThree, type Drawn } from "@/lib/tarot";
import Link from "next/link";

const POSITIONS = ["Past", "Present", "Future"] as const;

export default function TarotPage() {
  const [spread, setSpread] = useState<Drawn[] | null>(null);
  const [majorsOnly, setMajorsOnly] = useState(false);

  const handleDraw = () => setSpread(drawThree(majorsOnly));
  const handleReset = () => setSpread(null);

  return (
    <div className="mx-auto max-w-5xl px-3 py-6 md:px-4 md:py-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold md:text-4xl">Three-Card Spread</h1>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              className="h-4 w-4 accent-violet-600"
              checked={majorsOnly}
              onChange={(e) => setMajorsOnly(e.target.checked)}
            />
            Majors only (22)
          </label>

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

      {/* Instruction note */}
      {!spread && (
        <div className="mb-6 rounded-xl border border-violet-900/40 bg-violet-900/10 p-4 text-sm leading-relaxed text-neutral-200">
          <p>
            Before you draw, take a breath. Hold your question in your mind&rsquo;s eye, or name your intent.
            When you feel ready, tap <span className="font-medium text-violet-300">Draw Cards</span>.
          </p>
        </div>
      )}

      {!spread && (
        <p className="mb-8 text-neutral-300">
          Choose <span className="font-medium text-violet-300">Majors only</span> or the{" "}
          <span className="font-medium text-violet-300">full 78-card deck</span>, then draw.
        </p>
      )}

      {spread && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {spread.map((d, i) => (
            <div key={`${d.card.id}-${i}`} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
              <div className="mb-2 text-xs uppercase tracking-wide text-neutral-400">{POSITIONS[i]}</div>
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
        Next up: card artwork and saving spreads to your profile.
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
