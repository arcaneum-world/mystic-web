export type TarotCard = {
  arcana: 'major'|'minor'
  name: string
  suit?: 'wands'|'cups'|'swords'|'pentacles'
  rank?: 'ace'|'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine'|'ten'|'page'|'knight'|'queen'|'king'
  number?: number // 0-21 for majors
};

// same slug logic as before
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g,'');
}

// We return a .png path by default, but components can try .jpg if they want.
// Our build ships .png images; keeping a stable path is enough for next/image.
export function imagePathFor(card: TarotCard): string {
  if (card.arcana === 'major') {
    const idx = String(card.number ?? 0).padStart(2, '0');
    return `/tarot/major/${idx}-${slugify(card.name)}.png`;
  }
  if (!card.suit || !card.rank) return '/tarot/missing.png';
  return `/tarot/minor/${card.suit}/${card.rank}.png`;
}
