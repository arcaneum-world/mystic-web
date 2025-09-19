import { Suit } from './deck';

/**
 * Return an ordered list of possible image paths for a card.
 * The UI will try each in order until one loads.
 */
export function candidatePaths(card: any): string[] {
  if (!card) return ['/cards/major_arcana_fool.png'];

  const list: string[] = [];

  if (card.arcana === 'major') {
    const k = (card.key ?? card.name ?? 'fool').toLowerCase().replace(/^the\s+/,'').replace(/\s+/g,'_');

    // common variants for majors
    const variants = new Set<string>();
    variants.add(k);
    if (k === 'fortune' || k.includes('wheel')) { variants.add('fortune'); variants.add('wheel'); }
    if (k === 'priestess' || k.includes('high_priestess')) { variants.add('priestess'); variants.add('high_priestess'); }
    if (k === 'hanged' || k.includes('hanged_man')) { variants.add('hanged'); variants.add('hanged_man'); }
    if (k === 'judgement' || k === 'judgment') { variants.add('judgement'); variants.add('judgment'); }

    for (const v of variants) list.push(`/cards/major_arcana_${v}.png`);
    return list;
  }

  // minor
  const suit: Suit = card.suit;
  const r = card.rank;
  const variants: string[] = [];

  const push = (tok:string)=>variants.push(`/cards/minor_arcana_${suit}_${tok}.png`);

  if (typeof r === 'number') {
    // numbers: expect 1..10 files using 1..10 or a for ace
    if (r === 1) { push('a'); push('ace'); }
    else { push(String(r)); }
  } else {
    const rr = String(r).toLowerCase();
    if (rr === 'ace') { push('a'); push('ace'); }
    else if (rr === 'king') { push('k'); push('king'); }
    else if (rr === 'queen') { push('q'); push('queen'); }
    else if (rr === 'knight') { push('knight'); push('n'); }
    else if (rr === 'page') { push('page'); push('p'); }
    else {
      // two..ten as numbers
      const map: any = {two:'2',three:'3',four:'4',five:'5',six:'6',seven:'7',eight:'8',nine:'9',ten:'10'};
      push(map[rr] ?? rr);
    }
  }

  return variants;
}
