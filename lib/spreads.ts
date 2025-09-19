export type SpreadKey = 'one' | 'three' | 'celtic' | 'free';

export const spreads: Record<SpreadKey, { title: string; positions: string[] }> = {
  one: {
    title: 'One-Card Pull',
    positions: ['Message'],
  },
  three: {
    title: 'Three-Card (Past • Present • Future)',
    positions: ['Past', 'Present', 'Future'],
  },
  celtic: {
    title: 'Celtic Cross',
    positions: [
      'Significator (Heart of the Matter)', // 1
      'Crossing (Challenge)',               // 2
      'Crowning (Conscious Goal)',          // 3
      'Root (Unconscious / Foundation)',    // 4
      'Past (Recent Influence)',            // 5
      'Future (Near Term)',                 // 6
      'Self (Your Attitude)',               // 7
      'Environment (Others / Situation)',   // 8
      'Hopes & Fears',                      // 9
      'Outcome',                            // 10
    ],
  },
  free: {
    title: 'Free Spread',
    positions: [], // we’ll label as Card 1..N at runtime
  },
};
