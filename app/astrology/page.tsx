"use client";
import { useMemo, useState } from "react";
import { computePlanetLongitudes, zodiacSign } from "@/lib/astro";
import { findAspects } from "@/lib/aspects";
import { degreeBlurb } from "@/lib/degreeTheory";

type Form = {
  name: string;
  date: string;  // YYYY-MM-DD
  time: string;  // HH:MM
  tz: string;    // minutes offset like "-300" or "0" or "330"
  location: string; // free text for now
};

const tzOptions = [
  { label: "UTC (±0)", value: "0" },
  { label: "US Eastern (-300)", value: "-300" },
  { label: "US Central (-360)", value: "-360" },
  { label: "US Mountain (-420)", value: "-420" },
  { label: "US Pacific (-480)", value: "-480" },
  { label: "India (+330)", value: "330" },
  { label: "Japan (+540)", value: "540" },
];

export default function AstrologyPage(){
  const [form, setForm] = useState<Form>({
    name: "",
    date: "",
    time: "",
    tz: "0",
    location: "",
  });
  const [touched, setTouched] = useState(false);

  const result = useMemo(()=>{
    if (!form.date || !form.time) return null;
    const planets = computePlanetLongitudes(form.date, form.time, parseInt(form.tz,10), form.location);
    const bodies = planets.map(p=>({ name: p.planet, longitude: p.longitude }));
    const aspects = findAspects(bodies, true);
    return { planets, aspects };
  }, [form]);

  const canRun = !!form.date && !!form.time;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Astrology</h1>
      <p className="text-neutral-300">Enter your birth details to generate a birth chart report. (Ephemeris upgrade with houses & asteroids is next.)</p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-900/60 p-4 rounded-2xl"
        onSubmit={e=>{ e.preventDefault(); setTouched(true); }}
      >
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Name (optional)</label>
          <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="Your name" />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Date</label>
          <input type="date" value={form.date} onChange={e=>setForm(f=>({...f, date:e.target.value}))}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Time</label>
          <input type="time" value={form.time} onChange={e=>setForm(f=>({...f, time:e.target.value}))}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Timezone</label>
          <select value={form.tz} onChange={e=>setForm(f=>({...f, tz:e.target.value}))}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2">
            {tzOptions.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-1">Birthplace (free text)</label>
          <input value={form.location} onChange={e=>setForm(f=>({...f, location:e.target.value}))}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="City, Country" />
        </div>

        <div className="md:col-span-2">
          <button
            className="rounded-xl bg-violet-600 hover:bg-violet-700 px-4 py-2 font-medium"
            onClick={()=>setTouched(true)}
          >
            Generate Report
          </button>
        </div>
      </form>

      {touched && !canRun && (
        <p className="text-red-400">Please enter both Date and Time.</p>
      )}

      {canRun && result && (
        <div className="space-y-10">
          <section className="bg-neutral-900/60 p-5 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Planetary Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.planets.map((p)=> {
                const z = zodiacSign(p.longitude);
                return (
                  <div key={p.planet} className="rounded-xl border border-neutral-800 p-3">
                    <div className="font-medium">{p.planet}</div>
                    <div className="text-neutral-300">{z.sign} {z.deg}° ({p.longitude.toFixed(2)}° ecliptic)</div>
                    <div className="text-neutral-400 text-sm mt-1">{degreeBlurb(p.longitude)}</div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              *Positions currently use a temporary demo engine. We’ll plug in Swiss Ephemeris next for exact planets, houses, and asteroids.
            </p>
          </section>

          <section className="bg-neutral-900/60 p-5 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Aspects</h2>
            <div className="space-y-2">
              {findAspects(result.planets.map(p=>({ name: p.planet, longitude: p.longitude })), true).map((a, i)=>(
                <div key={i} className="rounded-lg border border-neutral-800 px-3 py-2">
                  <div className="font-medium">
                    {a.a} {a.name} {a.b} <span className="text-neutral-400">({a.actual.toFixed(1)}°, orb {a.orb.toFixed(1)}°)</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
