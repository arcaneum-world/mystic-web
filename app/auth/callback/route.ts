import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Handles Supabase email magic-link callback.
 * Exchanges the code for a session, sets cookies, then redirects.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/account";

  if (!code) {
    return NextResponse.redirect(new URL("/account?error=missing_code", url.origin));
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: Parameters<typeof cookieStore.set>[2]) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: Parameters<typeof cookieStore.set>[2]) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Exchange the code for a session (sets auth cookies via the adapter above)
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/account?error=${encodeURIComponent(error.message)}`, url.origin)
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
