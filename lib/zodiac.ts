export function lonToSignDeg(lon: number) {
  // normalize 0..360
  const L = ((lon % 360) + 360) % 360;
  const signs = [
    "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];
  const signIndex = Math.floor(L / 30);
  const deg = L - signIndex * 30;
  return { sign: signs[signIndex], deg: Math.round(deg * 100) / 100 };
}
