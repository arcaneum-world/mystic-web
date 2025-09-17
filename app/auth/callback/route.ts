import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type CookieSetOptions = Parameters<ReturnType<typeof cookies>["set"]>[2];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/account";

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
        set(name: string, value: string, options: CookieSetOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieSetOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  const dest = new URL(next, url.origin);
  if (error) dest.searchParams.set("error", error.message);

  return NextResponse.redirect(dest);
}
