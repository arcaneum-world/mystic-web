import { julian, planetposition, solar, moonposition } from "astronomia";
import data from "astronomia/data/vsop87B/earth.json";

export type BodyPos = {
  name: string;
  longitude: number;
};

const earth = new planetposition.Planet(data);

export async function computeChart(
  date: string,
  time: string,
  tzOffset: number,
  lat: number,
  lon: number
): Promise<{ bodies: BodyPos[] }> {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);

  const ut = hh + mm / 60 - tzOffset / 60;
  const jd = julian.CalendarGregorianToJD(y, m, d) + ut / 24;

  // Sun
  const { lon: sunLon } = solar.apparentVSOP87(earth, jd);
  // Moon
  const { lon: moonLon } = moonposition.position(jd);

  // Expand with planets using more VSOP data later
  return {
    bodies: [
      { name: "Sun", longitude: sunLon },
      { name: "Moon", longitude: moonLon },
    ],
  };
}
