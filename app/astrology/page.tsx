"use client";

import { useState } from "react";
import { computeChart } from "@/lib/astroReal";
import NodeGeocoder from "node-geocoder";

const geocoder = NodeGeocoder({ provider: "openstreetmap" });

export default function AstrologyPage() {
  const [date, setDate] = useState("2025-09-18");
  const [time, setTime] = useState("12:00");
  const [place, setPlace] = useState("Chicago, United States");
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    try {
      setError(null);

      // Geocode city → lat/lon
      const res = await geocoder.geocode(place);
      if (!res.length) {
        setError("Could not find location");
        return;
      }

      const { latitude, longitude } = res[0];
      const tzOffset = new Date().getTimezoneOffset() * -1;

      const result = await computeChart(date, time, tzOffset, latitude, longitude);
      setReport(result);
    } catch (err: any) {
      setError("Failed to compute chart");
      console.error(err);
    }
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Astrology</h1>
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mb-6">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 rounded bg-gray-800 text-white"/>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="p-2 rounded bg-gray-800 text-white"/>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="City, Country" className="p-2 rounded bg-gray-800 text-white"/>
      </div>
      <button onClick={handleGenerate} className="bg-purple-600 px-4 py-2 rounded text-white">Generate Report</button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {report && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Planetary Positions</h2>
          <ul className="space-y-2">
            {report.bodies.map((b: any, i: number) => (
              <li key={i}>
                {b.name}: {b.longitude.toFixed(2)}°
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
