export type Card = {
  id: number;
  name: string;
  upright: string;
  reversed: string;
};

// -------------------- Major Arcana (22) --------------------
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
  { id: 21, name: "The World", upright: "completion, integration, travel", reversed: "loose ends, almost there" }
];

// -------------------- Minor Arcana generator (56) --------------------
const SUITS = [
  { key: "Wands", theme: "inspiration, drive, action" },
  { key: "Cups", theme: "emotion, relationships, intuition" },
  { key: "Swords", theme: "thoughts, decisions, conflict" },
  { key: "Pentacles", theme: "work, resources, body & money" }
] as const;

const RANKS = [
  { key: "Ace", up: "seed, burst of potential", rev: "blocked start, hesitation" },
  { key: "Two", up: "choice, planning, duality", rev: "indecision, imbalance" },
  { key: "Three", up: "growth, collaboration, first results", rev: "delay, misalignment" },
  { key: "Four", up: "stability, structure, consolidation", rev: "stagnation, restlessness" },
  { key: "Five", up: "challenge, tension, tests", rev: "resolution, learning from friction" },
  { key: "Six", up: "progress, harmony returning", rev: "stalling, difficulty moving on" },
  { key: "Seven", up: "assessment, perseverance, strategy", rev: "impatience, scattered effort" },
  { key: "Eight", up: "momentum, skill, movement", rev: "frustration, interruptions" },
  { key: "Nine", up: "near completion, resilience", rev: "fatigue, defensiveness" },
  { key: "Ten", up: "culmination, burden or plenty", rev: "release, redistribution" },
  { key: "Page", up: "curiosity, learning, messenger", rev: "inexperience, mixed signals" },
  { key: "Knight", up: "pursuit, action, quest", rev: "impulsive or stalled motion" },
  { key: "Queen", up: "maturity, mastery, nurture", rev: "smothering, insecurity" },
  { key: "King", up: "command, leadership, authority", rev: "rigidity, misuse of power" }
] as const;

function buildMinor() {
  const out = [];
  let id = 22;
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      out.push({
        id: id++,
        name: `${rank.key} of ${suit.key}`,
        upright: `${rank.up} in the realm of ${suit.theme}`,
        reversed: `${rank.rev} around ${suit.theme}`
      });
    }
  }
  return out;
}

export const MINOR_ARCANA = buildMinor();
export const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

// ---------- helpers ----------
export type Drawn = { card: Card; reversed: boolean };

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function draw(count: number, majorsOnly = false): Drawn[] {
  const deck = majorsOnly ? MAJOR_ARCANA : FULL_DECK;
  const shuffled = shuffle(deck);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() < 0.5
  }));
}

export const drawThree = (majorsOnly = false) => draw(3, majorsOnly);
