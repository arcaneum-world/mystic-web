import { julian, planetposition, solar, moonposition } from "astronomia";

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
  // Parse inputs
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);

  // Convert to UTC
  const ut = (hh + mm / 60) - tzOffset / 60;
  const jd = julian.CalendarGregorianToJD(y, m, d) + ut / 24;

  // Sun
  const sunLon = solar.apparentVSOP87("earth", jd).lon;

  // Moon
  const moonLon = moonposition.position(jd).lon;

  // Planets Mercury → Pluto
  const mercury = planetposition.mercury.position(jd).lon;
  const venus = planetposition.venus.position(jd).lon;
  const mars = planetposition.mars.position(jd).lon;
  const jupiter = planetposition.jupiter.position(jd).lon;
  const saturn = planetposition.saturn.position(jd).lon;
  const uranus = planetposition.uranus.position(jd).lon;
  const neptune = planetposition.neptune.position(jd).lon;
  const pluto = planetposition.pluto.position(jd).lon;

  return {
    bodies: [
      { name: "Sun", longitude: sunLon },
      { name: "Moon", longitude: moonLon },
      { name: "Mercury", longitude: mercury },
      { name: "Venus", longitude: venus },
      { name: "Mars", longitude: mars },
      { name: "Jupiter", longitude: jupiter },
      { name: "Saturn", longitude: saturn },
      { name: "Uranus", longitude: uranus },
      { name: "Neptune", longitude: neptune },
      { name: "Pluto", longitude: pluto },
    ],
  };
}
