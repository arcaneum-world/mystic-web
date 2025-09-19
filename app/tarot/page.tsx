'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { drawRandom } from '@/lib/deck';
import { candidatePaths } from '@/lib/card-image';
import { majorMeanings, minorMeaning } from '@/lib/meanings';

type Drawn = { card: any; reversed: boolean; };

function TarotCard({ item }: { item: Drawn }) {
  const variants = useMemo(() => candidatePaths(item.card), [item.card]);
  const [idx, setIdx] = useState(0);

  const src = variants[Math.min(idx, variants.length-1)];

  return (
    <figure className="text-center">
      <div className="relative rounded overflow-hidden w-36 sm:w-44 md:w-48 lg:w-56 h-[220px] sm:h-[260px]">
        <Image
          src={src}
          alt={item.card.name ?? item.card.key}
          fill
          unoptimized
          className={`object-contain transition-transform duration-300 ${item.reversed ? 'rotate-180' : ''}`}
          onError={()=> setIdx(i => Math.min(i+1, variants.length-1))}
          sizes="(max-width: 640px) 144px, 192px"
        />
      </div>
      <figcaption className="mt-2 text-sm font-medium">
        {item.card.name ?? item.card.key}{item.reversed ? ' (Reversed)' : ''}
      </figcaption>
      <p className="mt-1 max-w-[16rem] text-xs opacity-80 mx-auto">
        {(() => {
          if (item.card.arcana === 'major') {
            const k = (item.card.key ?? '').toLowerCase();
            const m = majorMeanings[k];
            if (!m) return '';
            return item.reversed ? m.reversed : m.upright;
          }
          const m2 = minorMeaning(item.card.suit, item.card.rank);
          return item.reversed ? m2.reversed : m2.upright;
        })()}
      </p>
    </figure>
  );
}

export default function TarotPage() {
  const [spreadType, setSpreadType] = useState<'one'|'three'|'celtic'|'free'>('three');
  const [freeCount, setFreeCount] = useState<number>(3);
  const [drawn, setDrawn] = useState<Drawn[]>([]);

  function handleDraw() {
    let count = 1;
    if (spreadType === 'one') count = 1;
    else if (spreadType === 'three') count = 3;
    else if (spreadType === 'celtic') count = 10;
    else count = Math.max(1, Math.min(78, freeCount || 1));
    setDrawn(drawRandom(count));
  }

  return (
    <main className="px-6 py-12 min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Tarot Reading</h1>

        <div className="bg-neutral-900/60 p-6 rounded-2xl shadow-lg mb-6">
          <p className="mb-3 text-center italic">
            Hold your question in your mind&apos;s eye before you draw.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            {(['one','three','celtic','free'] as const).map(val => (
              <label key={val} className="flex items-center gap-2 capitalize">
                <input
                  type="radio" name="spread" value={val}
                  checked={spreadType===val}
                  onChange={()=>setSpreadType(val)}
                />
                {val === 'one' ? 'One' : val === 'three' ? 'Three' : val === 'celtic' ? 'Celtic Cross' : 'Free'}
              </label>
            ))}
            {spreadType === 'free' && (
              <input
                type="number" value={freeCount} min={1} max={78}
                onChange={(e)=>setFreeCount(parseInt(e.target.value || '1'))}
                className="ml-2 w-20 p-1 rounded"
              />
            )}
          </div>

          <div className="text-center">
            <button onClick={handleDraw} className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-full font-semibold">
              Draw
            </button>
          </div>
        </div>

        <div className="grid gap-6 justify-items-center">
          {drawn.length === 0 && (
            <div className="py-10 opacity-70 text-center">No cards drawn yet — press Draw.</div>
          )}

          <div className="flex flex-wrap gap-6 justify-center">
            {drawn.map((d, idx) => <TarotCard key={d.card.id+'-'+idx} item={d} />)}
          </div>

          {drawn.length > 0 && (
            <div className="text-xs opacity-80 pt-4 text-center">
              Tip: Click Draw again to get a fresh reading.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
