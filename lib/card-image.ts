export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type Rank =
  | 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten'
  | 'page' | 'knight' | 'queen' | 'king';

const numberWord: Record<number, Rank> = {
  1: 'ace', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
  6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
};

const majorKeyMap: Record<string, string> = {
  'the fool':'fool','the magician':'magician','the high priestess':'priestess','the empress':'empress','the emperor':'emperor',
  'the hierophant':'hierophant','the lovers':'lovers','the chariot':'chariot','strength':'strength','the hermit':'hermit',
  'wheel of fortune':'fortune','justice':'justice','the hanged man':'hanged','death':'death','temperance':'temperance',
  'the devil':'devil','the tower':'tower','the star':'star','the moon':'moon','the sun':'sun','judgement':'judgement','the world':'world',
};

function rankToken(r: Rank): string {
  if (r === 'ace') return 'a';
  if (r === 'queen') return 'q';
  if (r === 'king') return 'k';
  if (r === 'page') return 'page';
  if (r === 'knight') return 'knight';
  const num = Object.entries(numberWord).find(([, w]) => w === r)?.[0];
  return num ?? r;
}

export function pathForMajor(name: string): string {
  const key = majorKeyMap[name.toLowerCase().trim()];
  return key ? `/cards/major_arcana_${key}.png` : '/cards/major_arcana_fool.png';
}

export function pathForMinor(suit: Suit, rank: Rank|number): string {
  const r: Rank = typeof rank === 'number' ? numberWord[Math.max(1, Math.min(10, rank))] : rank;
  const token = rankToken(r);
  return `/cards/minor_arcana_${suit}_${token}.png`;
}

// Convenience: one function for either type
export function cardImgPath(card: any): string {
  if (!card) return '/cards/major_arcana_fool.png';
  if (card.arcana === 'major') return pathForMajor(card.name);
  return pathForMinor(card.suit, card.rank);
}
