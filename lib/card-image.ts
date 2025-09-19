/**
 * card-image.ts
 * Map cards to the filenames you showed (public/cards/...).
 * Filenames expected:
 *  - major_arcana_fool.png, major_arcana_chariot.png, etc. (lowercase keys)
 *  - minor_arcana_{suit}_{token}.png  e.g. minor_arcana_cups_7.png or minor_arcana_wands_page.png
 */

export type Suit = 'wands'|'cups'|'swords'|'pentacles';
export type Rank = 'ace'|'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine'|'ten'|'page'|'knight'|'queen'|'king';

const numToWord: Record<number,string> = {
  1: 'a', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10'
};

// mapping for major arcana names to your file suffixes (lowercase, underscore/words)
// adjust keys if your filenames differ
const majorMap: Record<string,string> = {
  'fool':'fool','magician':'magician','priestess':'priestess','empress':'empress','emperor':'emperor',
  'hierophant':'hierophant','lovers':'lovers','chariot':'chariot','strength':'strength','hermit':'hermit',
  'wheel':'fortune','justice':'justice','hanged':'hanged','death':'death','temperance':'temperance',
  'devil':'devil','tower':'tower','star':'star','moon':'moon','sun':'sun','judgement':'judgement','world':'world'
};

export function pathForMajor(key: string) {
  const k = key.toLowerCase().replace(/the\s+/,'').replace(/\s+/g,'_');
  const mapped = majorMap[k] ?? k;
  return `/cards/major_arcana_${mapped}.png`;
}

export function pathForMinor(suit: Suit, rank: Rank | number) {
  let token = '';
  if (typeof rank === 'number') {
    token = numToWord[Math.max(1, Math.min(10, rank))] ?? String(rank);
  } else {
    // keep page/knight/queen/king or 'a' for ace if your files use 'a' or 'ace'
    if (rank === 'ace') token = 'a';
    else if (rank === 'page') token = 'page';
    else if (rank === 'knight') token = 'knight';
    else if (rank === 'queen') token = 'q';
    else if (rank === 'king') token = 'k';
    else {
      // number words two..ten
      const wordMap: any = { two:'2', three:'3', four:'4', five:'5', six:'6', seven:'7', eight:'8', nine:'9', ten:'10' };
      token = wordMap[rank] ?? (rank as string);
    }
  }
  return `/cards/minor_arcana_${suit}_${token}.png`;
}

/**
 * Convenience: given a card object {arcana:'major'|'minor', name?, suit?, rank?}
 * return public path string.
 */
export function cardImgPath(card: any) {
  if (!card) return '/cards/major_arcana_fool.png';
  if (card.arcana === 'major') return pathForMajor(card.key ?? card.name ?? 'fool');
  return pathForMinor(card.suit, card.rank);
}
