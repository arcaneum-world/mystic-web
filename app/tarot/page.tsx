'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { drawRandom, shuffle, fullDeck } from '@/lib/deck';
import { cardImgPath } from '@/lib/card-image';

type Drawn = { card: any; reversed: boolean; };

export default function TarotPage() {
  const [spreadType, setSpreadType] = useState<'one'|'three'|'celtic'|'free'>('one');
  const [freeCount, setFreeCount] = useState<number>(5);
  const [drawn, setDrawn] = useState<Drawn[]>([]);
  const [seed, setSeed] = useState(0);

  function handleDraw() {
    let count = 1;
    if (spreadType === 'one') count = 1;
    else if (spreadType === 'three') count = 3;
    else if (spreadType === 'celtic') count = 10;
    else count = Math.max(1, Math.min(78, freeCount || 1));

    // drawRandom uses randomness and returns reversed flags
    const drawn = drawRandom(count);
    setDrawn(drawn);
    setSeed(prev => prev + 1);
  }

  // small layout helper: size responsive
  const cardSizeClass = 'w-36 sm:w-44 md:w-48 lg:w-56';

  return (
    <main className="px-6 py-12 min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Tarot Reading</h1>

        <div className="bg-neutral-900/60 p-6 rounded-2xl shadow-lg mb-6">
          <p className="mb-3 text-center italic">
            Hold your question in your mind's eye before you draw.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio" name="spread" value="one" checked={spreadType==='one'}
                onChange={() => setSpreadType('one')}
              /> One
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="spread" value="three" checked={spreadType==='three'}
                onChange={() => setSpreadType('three')} /> Three
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="spread" value="celtic" checked={spreadType==='celtic'}
                onChange={() => setSpreadType('celtic')} /> Celtic Cross
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="spread" value="free" checked={spreadType==='free'}
                onChange={() => setSpreadType('free')} /> Free
            </label>

            {spreadType === 'free' && (
              <input
                type="number" value={freeCount} min={1} max={78}
                onChange={(e)=>setFreeCount(parseInt(e.target.value || '1'))}
                className="ml-2 w-20 p-1 rounded"
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

        {/* Display drawn cards */}
        <div className="grid gap-6 justify-items-center">
          {drawn.length === 0 && (
            <div className="py-10 opacity-70 text-center">No cards drawn yet — press Draw.</div>
          )}

          <div className={`flex flex-wrap gap-6 justify-center ${drawn.length>6 ? 'max-w-full' : ''}`}>
            {drawn.map((d, idx) => (
              <figure key={d.card.id + '-' + idx} className="text-center">
                <div className={`relative rounded overflow-hidden ${cardSizeClass} h-[220px] sm:h-[260px]`}>
                  <Image
                    src={cardImgPath(d.card)}
                    alt={d.card.name ?? d.card.key}
                    fill
                    className={`object-contain transition-transform duration-300 ${d.reversed ? 'rotate-180' : ''}`}
                    sizes="(max-width: 640px) 144px, 192px"
                  />
                </div>
                <figcaption className="mt-2 text-sm">
                  {d.card.name ?? d.card.key}{d.reversed ? ' (Reversed)' : ''}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* extra small legend */}
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
