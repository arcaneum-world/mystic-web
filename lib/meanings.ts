export type Meaning = { upright: string; reversed: string };

export const majorMeanings: Record<string, Meaning> = {
  fool: {upright:"new beginnings, faith, spontaneity", reversed:"reckless, naive, hesitance"},
  magician:{upright:"willpower, skill, manifestation", reversed:"trickery, scattered energy"},
  priestess:{upright:"intuition, mystery, inner voice", reversed:"secrets, doubt, disconnected"},
  empress:{upright:"nurture, abundance, creativity", reversed:"smothering, creative block"},
  emperor:{upright:"structure, leadership, order", reversed:"rigidity, domination"},
  hierophant:{upright:"tradition, guidance, learning", reversed:"rebellion, dogma"},
  lovers:{upright:"union, values alignment, choice", reversed:"disharmony, misalignment"},
  chariot:{upright:"drive, victory, determination", reversed:"scattered will, stall"},
  strength:{upright:"inner strength, compassion", reversed:"self-doubt, impatience"},
  hermit:{upright:"reflection, solitude, wisdom", reversed:"isolation, avoidance"},
  fortune:{upright:"cycles, luck, turning point", reversed:"resistance to change"},
  justice:{upright:"truth, accountability, balance", reversed:"unfairness, bias"},
  hanged:{upright:"surrender, new perspective", reversed:"stalling, needless sacrifice"},
  death:{upright:"ending, transformation, rebirth", reversed:"stagnation, fear of change"},
  temperance:{upright:"moderation, synthesis, healing", reversed:"excess, imbalance"},
  devil:{upright:"attachment, shadow, temptation", reversed:"release, awareness"},
  tower:{upright:"sudden change, revelation", reversed:"avoiding the inevitable"},
  star:{upright:"hope, serenity, renewal", reversed:"discouragement, doubt"},
  moon:{upright:"intuition, dreams, uncertainty", reversed:"clarity dawning, fears easing"},
  sun:{upright:"vitality, success, joy", reversed:"temporary cloud, overexposure"},
  judgement:{upright:"awakening, calling, review", reversed:"self-doubt, denial"},
  world:{upright:"completion, wholeness, travel", reversed:"nearly there, loose ends"},
};

const suitWord = (s:string)=> s[0].toUpperCase()+s.slice(1);
const pip = (n:number)=>["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"][n-1];

export function minorMeaning(suit: 'wands'|'cups'|'swords'|'pentacles', rank: number|string): Meaning {
  const suitThemes: Record<string, string> = {
    wands:"passion, drive, energy",
    cups:"feelings, relationships, intuition",
    swords:"thoughts, truth, conflict",
    pentacles:"material, health, work",
  };
  const label = typeof rank==='number' ? pip(rank) : (rank as string)[0].toUpperCase()+ (rank as string).slice(1);
  return {
    upright: `${label} of ${suitWord(suit)} — ${suitThemes[suit]} in motion`,
    reversed: `${label} of ${suitWord(suit)} (rev) — block or re-channel in ${suitThemes[suit]}`,
  };
}
