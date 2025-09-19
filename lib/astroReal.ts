import { julian, planetposition, solar, moonposition } from "astronomia";

// Vercel/TS sometimes fusses about JSON imports;
// using a runtime require avoids needing resolveJsonModule.
const earth = require("astronomia/data/vsop87b/earth.json");

export type BodyPos = {
  name: string;
  longitude: number;
};

const earthPlanet = new planetposition.Planet(earth);

/**
 * Compute Sun & Moon longitudes for a given birth moment.
 * (We’ll expand to full planets/aspects next.)
 */
export async function computeChart(
  date: string,        // "YYYY-MM-DD"
  time: string,        // "HH:mm"
  tzOffset: number,    // e.g. -300 for US Central (minutes)
  lat: number,         // not used yet
  lon: number          // not used yet
): Promise<{ bodies: BodyPos[] }> {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);

  // Convert to UTC hours
  const ut = hh + mm / 60 - tzOffset / 60;

  // Julian day (UTC)
  const jd = julian.CalendarGregorianToJD(y, m, d) + ut / 24;

  // Sun apparent ecliptic longitude (degrees)
  const sunLon = solar.apparentVSOP87(earthPlanet, jd).lon;

  // Moon ecliptic longitude (degrees)
  const moonLon = moonposition.position(jd).lon;

  return {
    bodies: [
      { name: "Sun", longitude: sunLon },
      { name: "Moon", longitude: moonLon },
    ],
  };
}
