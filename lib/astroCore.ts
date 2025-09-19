import * as Astronomy from "astronomy-engine";

export type BodyPos = {
  name: string;
  elon: number;     // ecliptic longitude (° 0..360)
  elat: number;     // ecliptic latitude (°)
  sign: string;     // zodiac sign name
  degInSign: number;// degrees within sign (0..30)
};

// Helper: 0..360
function norm360(x: number) {
  let v = x % 360;
  return v < 0 ? v + 360 : v;
}

const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const BODIES: (keyof typeof Astronomy.Body)[] = [
  "Sun","Moon","Mercury","Venus","Mars",
  "Jupiter","Saturn","Uranus","Neptune","Pluto"
];

export type ComputeInput = {
  /** Local date like "2025-09-18" */
  date: string;
  /** Local time like "13:45" (24h) */
  time: string;
  /** Minutes east of UTC (browser gives negative for USA). Example: New York in EDT = -240. */
  tzOffsetMinutes: number;
  /** Decimal degrees */
  lat: number;
  lon: number;
  /** Elevation meters (optional) */
  elev?: number;
};

export function computePositions(inp: ComputeInput): BodyPos[] {
  // Convert local date+time to a UTC Date using tz offset
  const [Y,M,D] = inp.date.split("-").map(Number);
  const [h,m]   = inp.time.split(":").map(Number);
  // Convert local -> UTC by subtracting offset minutes
  const utcMillis = Date.UTC(Y, (M-1), D, h, m) - inp.tzOffsetMinutes*60*1000;
  const time = new (Astronomy as any).AstroTime(new Date(utcMillis));

  // We compute **geocentric** ecliptic positions (good for sign/degree).
  return BODIES.map((bname) => {
    const bodyEnum = (Astronomy as any).Body[bname];
    const vec = Astronomy.GeoVector(bodyEnum, time, true); // light-time corrected
    const ecl = Astronomy.Ecliptic(vec);                   // true-of-date ecliptic
    const elon = norm360(ecl.elon);
    const signIndex = Math.floor(elon / 30);
    const degInSign = elon - signIndex*30;
    return {
      name: bname,
      elon,
      elat: ecl.elat,
      sign: SIGNS[signIndex],
      degInSign,
    };
  });
}
