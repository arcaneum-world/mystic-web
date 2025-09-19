export type PlanetReading = { planet: string; longitude: number };

function hashStr(s: string){
  let h=0; for (let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))|0; }
  return (h>>>0);
}
function norm360(x:number){ x%=360; if (x<0) x+=360; return x; }

export function computePlanetLongitudes(
  isoDate: string, time: string, tzOffsetMinutes: number, location: string
): PlanetReading[] {
  // TEMP ENGINE (demo): deterministic pseudo-positions based on date/time/location.
  const seed = hashStr(`${isoDate}|${time}|${tzOffsetMinutes}|${location}`);
  const base = (seed % 360);
  // Rough spreads so it *looks* real enough for UI wiring:
  const longs = {
    Sun:      norm360(base + 0),
    Moon:     norm360(base + 130),
    Mercury:  norm360(base + 28),
    Venus:    norm360(base + 47),
    Mars:     norm360(base + 80),
    Jupiter:  norm360(base + 210),
    Saturn:   norm360(base + 260),
    Uranus:   norm360(base + 300),
    Neptune:  norm360(base + 315),
    Pluto:    norm360(base + 330),
  };
  return Object.entries(longs).map(([planet,longitude])=>({ planet, longitude }));
}

export function zodiacSign(longitude:number){
  const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  const idx = Math.floor(((longitude%360)+360)%360 / 30);
  const deg = Math.floor(((longitude%30)+30)%30);
  return { sign: signs[idx], deg };
}
