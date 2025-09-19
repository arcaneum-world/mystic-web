export type AspectName =
  | "Conjunction" | "Opposition" | "Trine" | "Square" | "Sextile"
  | "Quincunx" | "Semisextile" | "Quintile" | "BiQuintile" | "Septile" | "Novile";

type AspectDef = { name: AspectName; angle: number; orb: number };

export const MAJOR_ASPECTS: AspectDef[] = [
  { name: "Conjunction", angle: 0,   orb: 8 },
  { name: "Opposition",  angle: 180, orb: 8 },
  { name: "Trine",       angle: 120, orb: 7 },
  { name: "Square",      angle: 90,  orb: 6 },
  { name: "Sextile",     angle: 60,  orb: 4 },
];

export const MINOR_ASPECTS: AspectDef[] = [
  { name: "Quincunx",    angle: 150,    orb: 3  },
  { name: "Semisextile", angle: 30,     orb: 2  },
  { name: "Quintile",    angle: 72,     orb: 2  },
  { name: "BiQuintile",  angle: 144,    orb: 2  },
  { name: "Septile",     angle: 51.4286,orb: 1.5},
  { name: "Novile",      angle: 40,     orb: 1.5},
];

export type BodyReading = { name: string; longitude: number };

function angleDelta(a: number, b: number) {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

export function findAspects(
  bodies: BodyReading[],
  includeMinor = true
){
  const defs = includeMinor ? [...MAJOR_ASPECTS, ...MINOR_ASPECTS] : MAJOR_ASPECTS;
  const hits: {
    a: string; b: string; name: AspectName; exact: number; actual: number; orb: number;
  }[] = [];
  for (let i=0;i<bodies.length;i++){
    for (let j=i+1;j<bodies.length;j++){
      const A = bodies[i], B = bodies[j];
      const sep = angleDelta(A.longitude, B.longitude);
      for (const def of defs){
        const diff = Math.abs(sep - def.angle);
        if (diff <= def.orb){
          hits.push({ a: A.name, b: B.name, name: def.name, exact: def.angle, actual: sep, orb: diff });
        }
      }
    }
  }
  const majors = new Set(MAJOR_ASPECTS.map(d=>d.name));
  hits.sort((x,y)=>{
    const mx = majors.has(x.name), my = majors.has(y.name);
    if (mx!==my) return mx ? -1 : 1;
    return x.orb - y.orb;
  });
  return hits;
}
