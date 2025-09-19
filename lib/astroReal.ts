import { julian, solar, moonposition, planetposition } from "astronomia";
import earth from "astronomia/data/vsop87Bearth.json";
import jupiter from "astronomia/data/vsop87Bjupiter.json";
import mars from "astronomia/data/vsop87Bmars.json";
import mercury from "astronomia/data/vsop87Bmercury.json";
import neptune from "astronomia/data/vsop87Bneptune.json";
import saturn from "astronomia/data/vsop87Bsaturn.json";
import uranus from "astronomia/data/vsop87Buranus.json";
import venus from "astronomia/data/vsop87Bvenus.json";

export type BodyPos = {
  name: string;
  longitude: number;
};

export async function computeChart(
  date: string,
  time: string,
  tzOffset: number,
  lat: number,
  lon: number
): Promise<{ bodies: BodyPos[] }> {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);

  // Convert to UTC fractional day
  const ut = (hh + mm / 60 - tzOffset / 60) / 24;
  const jd = julian.CalendarGregorianToJD(y, m, d) + ut;

  // Sun and Moon
  const { lon: sunLon } = solar.apparentVSOP87(earth, jd);
  const { lon: moonLon } = moonposition.position(jd);

  // Planets
  const mercuryP = new planetposition.Planet(mercury);
  const venusP = new planetposition.Planet(venus);
  const marsP = new planetposition.Planet(mars);
  const jupiterP = new planetposition.Planet(jupiter);
  const saturnP = new planetposition.Planet(saturn);
  const uranusP = new planetposition.Planet(uranus);
  const neptuneP = new planetposition.Planet(neptune);

  return {
    bodies: [
      { name: "Sun", longitude: sunLon },
      { name: "Moon", longitude: moonLon },
      { name: "Mercury", longitude: mercuryP.position(jd).lon },
      { name: "Venus", longitude: venusP.position(jd).lon },
      { name: "Mars", longitude: marsP.position(jd).lon },
      { name: "Jupiter", longitude: jupiterP.position(jd).lon },
      { name: "Saturn", longitude: saturnP.position(jd).lon },
      { name: "Uranus", longitude: uranusP.position(jd).lon },
      { name: "Neptune", longitude: neptuneP.position(jd).lon },
    ],
  };
}
