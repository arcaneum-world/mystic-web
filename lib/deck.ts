/**
 * deck.ts
 * Produce a canonical 78-card deck description with keys that the UI uses.
 * Each card object:
 *  - id: unique id string
 *  - arcana: 'major'|'minor'
 *  - name/key: for major
 *  - suit/rank: for minor
 *
 * This generator matches the filename mapping above.
 */

import { Suit } from './card-image';

export type Card = {
  id: string;
  arcana: 'major'|'minor';
  key?: string; // major key (e.g. 'fool')
  name?: string; // friendly name
  suit?: Suit;
  rank?: number | string;
};

const majors: Array<{key:string,name:string}> = [
  {key:'fool', name: 'The Fool'},
  {key:'magician', name: 'The Magician'},
  {key:'priestess', name: 'The High Priestess'},
  {key:'empress', name: 'The Empress'},
  {key:'emperor', name: 'The Emperor'},
  {key:'hierophant', name: 'The Hierophant'},
  {key:'lovers', name: 'The Lovers'},
  {key:'chariot', name: 'The Chariot'},
  {key:'strength', name: 'Strength'},
  {key:'hermit', name: 'The Hermit'},
  {key:'fortune', name: 'Wheel of Fortune'},
  {key:'justice', name: 'Justice'},
  {key:'hanged', name: 'The Hanged Man'},
  {key:'death', name: 'Death'},
  {key:'temperance', name: 'Temperance'},
  {key:'devil', name: 'The Devil'},
  {key:'tower', name: 'The Tower'},
  {key:'star', name: 'The Star'},
  {key:'moon', name: 'The Moon'},
  {key:'sun', name: 'The Sun'},
  {key:'judgement', name: 'Judgement'},
  {key:'world', name: 'The World'}
];

const suits: Suit[] = ['wands','cups','swords','pentacles'];
const pipRanks = [
  {rank:1, label:'Ace'},
  {rank:2, label:'Two'},
  {rank:3, label:'Three'},
  {rank:4, label:'Four'},
  {rank:5, label:'Five'},
  {rank:6, label:'Six'},
  {rank:7, label:'Seven'},
  {rank:8, label:'Eight'},
  {rank:9, label:'Nine'},
  {rank:10, label:'Ten'}
];
const court = [
  {rank:'page', label:'Page'},
  {rank:'knight', label:'Knight'},
  {rank:'queen', label:'Queen'},
  {rank:'king', label:'King'}
];

export function fullDeck(): Card[] {
  const out: Card[] = [];

  majors.forEach((m, i) => {
    out.push({
      id: `major_${i}_${m.key}`,
      arcana: 'major',
      key: m.key,
      name: m.name
    });
  });

  suits.forEach(s => {
    pipRanks.forEach(p => {
      out.push({
        id: `minor_${s}_${p.rank}`,
        arcana: 'minor',
        suit: s,
        rank: p.rank,
        name: `${p.label} of ${s.charAt(0).toUpperCase()+s.slice(1)}`
      });
    });
    court.forEach(c => {
      out.push({
        id: `minor_${s}_${c.rank}`,
        arcana: 'minor',
        suit: s,
        rank: c.rank,
        name: `${c.label} of ${s.charAt(0).toUpperCase()+s.slice(1)}`
      });
    });
  });

  return out;
}

/** shuffle (Fisher–Yates) returning a NEW array */
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Draw n random cards (with reversals boolean) */
export function drawRandom(n = 1) {
  const deck = shuffle(fullDeck());
  const drawn = deck.slice(0, n).map(c => ({
    card: c,
    reversed: Math.random() < 0.5
  }));
  return drawn;
}
