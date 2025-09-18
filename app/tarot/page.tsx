'use client';
import Image from 'next/image';
import { cardImgPath } from '@/lib/card-image';

export default function TarotPage() {
  // Dummy example: replace this with your existing spread logic
  const sample = { arcana: 'major', name: 'The Fool' };
  const isReversed = false;

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Tarot Reading</h1>
      <div className="relative mx-auto mb-3 aspect-[2/3] w-40 sm:w-48 rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/10">
        <Image
          src={cardImgPath(sample)}
          alt={sample.name}
          fill
          className={isReversed ? 'object-contain rotate-180' : 'object-contain'}
          sizes="160px, (min-width: 640px) 192px"
        />
      </div>
      <p>{sample.name}{isReversed ? ' (Reversed)' : ''}</p>
    </main>
  );
}
