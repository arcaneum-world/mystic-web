import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json([]);

  const res = await fetch(
    "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q,
        format: "json",
        addressdetails: "1",
        limit: "5",
      }),
    {
      headers: {
        "User-Agent": "arcaneum.world/astrology (contact: arcaneum.world@gmail.com)",
      },
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
