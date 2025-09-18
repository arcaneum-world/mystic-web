export type Card = {
  id: number;
  name: string;
  upright: string;
  reversed: string;
};

export const MAJOR_ARCANA: Card[] = [
  { id: 0, name: "The Fool", upright: "new beginnings, trust, leap of faith", reversed: "hesitation, naivety, risky impulse" },
  { id: 1, name: "The Magician", upright: "willpower, skill, manifestation", reversed: "scattered energy, manipulation" },
  { id: 2, name: "The High Priestess", upright: "intuition, mystery, inner voice", reversed: "secrets, ignoring intuition" },
  { id: 3, name: "The Empress", upright: "nurture, abundance, creativity", reversed: "smothering, creative block" },
  { id: 4, name: "The Emperor", upright: "structure, leadership, stability", reversed: "rigidity, control issues" },
  { id: 5, name: "The Hierophant", upright: "tradition, learning, guidance", reversed: "nonconformity, outdated beliefs" },
  { id: 6, name: "The Lovers", upright: "union, values alignment, choice", reversed: "disharmony, difficult decision" },
  { id: 7, name: "The Chariot", upright: "drive, victory, determination", reversed: "stalling, misdirection" },
  { id: 8, name: "Strength", upright: "courage, compassion, patience", reversed: "self-doubt, reactivity" },
  { id: 9, name: "The Hermit", upright: "reflection, solitude, wisdom", reversed: "isolation, aimless searching" },
  { id: 10, name: "Wheel of Fortune", upright: "turning point, luck, cycles", reversed: "resistance to change, a rough patch" },
  { id: 11, name: "Justice", upright: "truth, fairness, accountability", reversed: "bias, imbalance, avoidance" },
  { id: 12, name: "The Hanged One", upright: "pause, new perspective, surrender", reversed: "stalling, martyrdom" },
  { id: 13, name: "Death", upright: "ending → rebirth, transformation", reversed: "clinging, blocked change" },
  { id: 14, name: "Temperance", upright: "balance, healing, moderation", reversed: "excess, impatience" },
  { id: 15, name: "The Devil", upright: "attachment, temptation, shadow", reversed: "release, reclaiming power" },
  { id: 16, name: "The Tower", upright: "sudden change, revelation", reversed: "avoiding upheaval, fear of change" },
  { id: 17, name: "The Star", upright: "hope, renewal, guidance", reversed: "discouragement, dim faith" },
  { id: 18, name: "The Moon", upright: "dreams, uncertainty, subconscious", reversed: "clarity emerging, anxiety easing" },
  { id: 19, name: "The Sun", upright: "vitality, joy, success", reversed: "temporary cloud, overexposure" },
  { id: 20, name: "Judgement", upright: "awakening, calling, evaluation", reversed: "self-criticism, delay" },
  { id: 21, name: "The World", upright: "completion, integration, travel", reversed: "loose ends, almost there" },
];

// Fisher–Yates shuffle
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type Drawn = {
  card: Card;
  reversed: boolean;
};

export function drawThree(): Drawn[] {
  const deck = shuffle(MAJOR_ARCANA);
  return deck.slice(0, 3).map((card) => ({
    card,
    reversed: Math.random() < 0.5,
  }));
}
