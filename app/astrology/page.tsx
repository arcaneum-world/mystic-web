"use client";

import { useEffect, useMemo, useState } from "react";
import { computeChart } from "@/lib/astroReal";
import { lonToSignDeg } from "@/lib/zodiac";

type Body = { name: string; longitude: number };

export default function AstrologyPage() {
  const now = useMemo(() => new Date(), []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const defaultTz = -now.getTimezoneOffset(); // minutes east of UTC

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [tzOffset, setTzOffset] = useState(defaultTz);
  const [lat, setLat] = useState(41.8781);   // Chicago placeholder
  const [lon, setLon] = useState(-87.6298);  // Chicago placeholder
  const [bodies, setBodies] = useState<Body[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function generate() {
    try {
      setLoading(true);
      setErr(null);
      const result = await computeChart(date, time, tzOffset, lat, lon);
      setBodies(result.bodies);
    } catch (e: any) {
      setErr(e?.message || "Failed to compute chart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Astrology</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Date</span>
          <input className="rounded-md bg-neutral-800 px-3 py-2"
                 type="date" value={date}
                 onChange={(e) => setDate(e.target.value)} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Time (local)</span>
          <input className="rounded-md bg-neutral-800 px-3 py-2"
                 type="time" value={time}
                 onChange={(e) => setTime(e.target.value)} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">TZ offset (minutes, east of UTC)</span>
          <input className="rounded-md bg-neutral-800 px-3 py-2"
                 type="number" value={tzOffset}
                 onChange={(e) => setTzOffset(parseInt(e.target.value || "0", 10))} />
          <span className="text-xs text-neutral-500">
            Browser default is {defaultTz}.
          </span>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Latitude</span>
          <input className="rounded-md bg-neutral-800 px-3 py-2"
                 type="number" step="0.0001" value={lat}
                 onChange={(e) => setLat(parseFloat(e.target.value || "0"))} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-400">Longitude</span>
          <input className="rounded-md bg-neutral-800 px-3 py-2"
                 type="number" step="0.0001" value={lon}
                 onChange={(e) => setLon(parseFloat(e.target.value || "0"))} />
        </label>

        <div className="flex items-end">
          <button onClick={generate}
                  className="rounded-lg bg-violet-600 px-4 py-2 font-medium hover:bg-violet-700 disabled:opacity-50"
                  disabled={loading}>
            {loading ? "Generating…" : "Generate Report"}
          </button>
        </div>
      </div>

      {err && <p className="text-red-400">{err}</p>}

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Planetary Positions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {bodies.map((b) => {
            const { sign, deg } = lonToSignDeg(b.longitude);
            return (
              <div key={b.name} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                <div className="text-neutral-300">{b.name}</div>
                <div className="text-neutral-100">
                  {sign} {deg}°
                  <span className="text-neutral-500">
                    {" "}({Math.round(b.longitude * 100) / 100}° ecliptic)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {bodies.length === 0 && !loading && (
          <p className="text-neutral-400">Fill in date/time and click “Generate Report”.</p>
        )}
      </section>
    </div>
  );
}
