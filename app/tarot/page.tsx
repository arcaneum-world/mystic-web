'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { drawRandom } from '@/lib/deck';
import { candidatePaths } from '@/lib/card-image';
import { majorMeanings, minorMeaning } from '@/lib/meanings';
import { spreads, type SpreadKey } from '@/lib/spreads';

type Drawn = { card: any; reversed: boolean };

const BLUR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="32"><rect width="100%" height="100%" fill="#1f2937"/></svg>'
  );

function Meaning({ item }: { item: Drawn }) {
  if (item.card.arcana === 'major') {
    const k = (item.card.key ?? '').toLowerCase();
    const m = majorMeanings[k];
    if (!m) return null;
    return <p className="mt-1 max-w-xs text-center text-sm opacity-80">{item.reversed ? m.reversed : m.upright}</p>;
  }
  const m2 = minorMeaning(item.card.suit, item.card.rank);
  return <p className="mt-1 max-w-xs text-center text-sm opacity-80">{item.reversed ? m2.reversed : m2.upright}</p>;
}

function TarotCard({ item, label }: { item: Drawn; label: string }) {
  const variants = useMemo(() => candidatePaths(item.card), [item.card]);
  const [idx, setIdx] = useState(0);
  const src = variants[Math.min(idx, variants.length - 1)];

  return (
    <figure className="flex flex-col items-center">
      <div className="text-xs mb-2 opacity-70">{label}</div>
      <div className="rounded-2xl bg-neutral-900/60 p-3 shadow-lg">
        <Image
          src={src}
          alt={item.card.name ?? item.card.key}
          width={260}
          height={420}
          placeholder="blur"
          blurDataURL={BLUR}
          className={`h-auto w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] object-contain transition-transform duration-300 ${
            item.reversed ? 'rotate-180' : ''
          }`}
          onError={() => setIdx((i) => Math.min(i + 1, variants.length - 1))}
          priority={false}
          sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
        />
      </div>
      <figcaption className="mt-3 text-center text-base font-medium">
        {(item.card.name ?? item.card.key) + (item.reversed ? ' (Reversed)' : '')}
      </figcaption>
      <Meaning item={item} />
    </figure>
  );
}

export default function TarotPage() {
  const [spreadType, setSpreadType] = useState<SpreadKey>('three');
  const [freeCount, setFreeCount] = useState<number>(3);
  const [drawn, setDrawn] = useState<Drawn[]>([]);

  function handleDraw() {
    const count =
      spreadType === 'one'
        ? 1
        : spreadType === 'three'
        ? 3
        : spreadType === 'celtic'
        ? 10
        : Math.max(1, Math.min(78, freeCount || 1));
    setDrawn(drawRandom(count));
  }

  const positionLabels = useMemo(() => {
    if (spreadType === 'free') return drawn.map((_, i) => `Card ${i + 1}`);
    const base = spreads[spreadType].positions;
    return drawn.map((_, i) => base[i] ?? `Card ${i + 1}`);
  }, [spreadType, drawn]);

  return (
    <main className="px-4 sm:px-6 py-10 min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Tarot Reading</h1>

        <div className="bg-neutral-900/60 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
          <p className="mb-3 text-center italic">Hold your question in your mind&apos;s eye before you draw.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            {(['one', 'three', 'celtic', 'free'] as const).map((val) => (
              <label key={val} className="flex items-center gap-2 capitalize">
                <input type="radio" name="spread" value={val} checked={spreadType === val} onChange={() => setSpreadType(val)} />
                {val === 'one' ? 'One' : val === 'three' ? 'Three' : val === 'celtic' ? 'Celtic Cross' : 'Free'}
              </label>
            ))}
            {spreadType === 'free' && (
              <input
                type="number"
                value={freeCount}
                min={1}
                max={78}
                onChange={(e) => setFreeCount(parseInt(e.target.value || '1'))}
                className="ml-2 w-24 p-1 rounded bg-neutral-800"
              />
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleDraw}
              className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-full font-semibold"
            >
              Draw
            </button>
          </div>
        </div>

        <h2 className="text-center text-sm opacity-70 mb-4">{spreads[spreadType].title}</h2>

        <div
          className="grid justify-items-center gap-8
                     grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {drawn.length === 0 && <div className="py-10 opacity-70">No cards drawn yet — press Draw.</div>}

          {drawn.map((d, i) => (
            <TarotCard key={d.card.id + '-' + i} item={d} label={positionLabels[i]} />
          ))}
        </div>

        {drawn.length > 0 && (
          <div className="text-xs opacity-80 pt-6 text-center">Tip: Click Draw again to get a fresh reading.</div>
        )}
      </div>
    </main>
  );
}
