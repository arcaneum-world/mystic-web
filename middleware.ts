import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host === "arcaneum.world") {
    const url = req.nextUrl;
    url.host = "www.arcaneum.world";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
