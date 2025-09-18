import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * If a Supabase magic-link lands anywhere with ?code=...,
 * redirect it to our dedicated callback route so the session is set.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // If the email link appended ?code=... on any path except the callback,
  // send it to /auth/callback and preserve the query string.
  if (url.searchParams.has("code") && url.pathname !== "/auth/callback") {
    const redirect = new URL("/auth/callback", url);
    redirect.search = url.search; // keep ?code=...
    return NextResponse.redirect(redirect);
  }

  return NextResponse.next();
}

// Run on all pages (cheap check), adjust if you want to scope it.
export const config = {
  matcher: ["/:path*"],
};
