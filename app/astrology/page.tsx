"use client";

import { useEffect, useMemo, useState } from "react";
import { computePositions, BodyPos } from "@/lib/astroCore";

type GeoHit = {
  display_name: string;
  lat: string;
  lon: string;
};

function useBrowserTzOffset() {
  // minutes east of UTC. JS gives +west, so invert sign.
  const off = new Date().getTimezoneOffset(); // minutes west of UTC
  return -off;
}

export default function AstrologyPage() {
  const tzOffset = useBrowserTzOffset();

  // Form state
  const now = new Date();
  const [date, setDate] = useState(() =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" })
      .format(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())))
  ); // "YYYY-MM-DD"
  const [time, setTime] = useState(() =>
    now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
  ); // "HH:mm"
  const [place, setPlace] = useState("Chicago, United States");
  const [hits, setHits] = useState<GeoHit[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BodyPos[] | null>(null);

  // Geocode the user's text to lat/lon
  async function lookupPlace() {
    setError(null);
    setLoadingGeo(true);
    setHits([]);
    setLat(null);
    setLon(null);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(place)}`);
      const data: GeoHit[] = await res.json();
      setHits(data);
      if (data[0]) {
        setLat(parseFloat(data[0].lat));
        setLon(parseFloat(data[0].lon));
      }
    } catch (e: any) {
      setError(e?.message ?? "Geocode failed");
    } finally {
      setLoadingGeo(false);
    }
  }

  function generate() {
    setError(null);
    setResult(null);
    if (lat == null || lon == null) {
      setError("Pick a place first (use the lookup).");
      return;
    }
    try {
      const positions = computePositions({
        date, time, tzOffsetMinutes: tzOffset, lat, lon, elev: 0,
      });
      setResult(positions);
    } catch (e: any) {
      setError(e?.message ?? "Calculation error");
    }
  }

  const tzLabel = useMemo(() => {
    const hrs = (tzOffset/60).toFixed(2).replace(/\.00$/,"");
    return `${tzOffset} min (UTC${hrs.startsWith("-")?hrs: "+"+hrs})`;
  }, [tzOffset]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Astrology</h1>

      <div className="grid md:grid-cols-4 gap-3">
        <div className="col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">Birth date</label>
          <input
            type="date"
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Local time</label>
          <input
            type="time"
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">TZ offset</label>
          <input
            value={tzLabel}
            readOnly
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-neutral-300"
          />
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm text-neutral-400 mb-1">Birthplace (city, country)</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
              placeholder="City, Country"
              value={place}
              onChange={(e)=>setPlace(e.target.value)}
            />
            <button
              onClick={lookupPlace}
              className="rounded-md bg-violet-600 hover:bg-violet-500 px-4 font-medium"
              disabled={loadingGeo}
            >
              {loadingGeo ? "Looking…" : "Lookup"}
            </button>
          </div>
          {hits.length > 0 && (
            <div className="text-xs text-neutral-400 mt-1">
              Using: <span className="text-neutral-200">{hits[0].display_name}</span>
              {lat!=null && lon!=null && (
                <span className="ml-2">({lat.toFixed(4)}, {lon.toFixed(4)})</span>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            onClick={generate}
            className="w-full rounded-md bg-violet-600 hover:bg-violet-500 px-4 py-2 font-semibold"
          >
            Generate Report
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Planetary Positions</h2>
        {!result && <p className="text-neutral-400">Fill in your info and click “Generate Report”.</p>}
        {result && (
          <div className="grid md:grid-cols-2 gap-3">
            {result.map((b)=>(
              <div key={b.name} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm text-neutral-300">
                  {b.sign} {b.degInSign.toFixed(2)}°
                  <span className="ml-2 text-neutral-500">(λ {b.elon.toFixed(2)}°, β {b.elat.toFixed(2)}°)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
