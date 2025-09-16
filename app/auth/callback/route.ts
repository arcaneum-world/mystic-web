import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") || "/account"

  if (!code) {
    return NextResponse.redirect(new URL(`/account?error=missing_code`, url.origin))
  }

  const cookieStore = cookies()

  // IMPORTANT: provide get/set/remove so Supabase can write the session cookie
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookieStore.set(name, "", { ...options, maxAge: 0 })
        },
      },
    }
  )

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      const msg = encodeURIComponent(error.message || "exchange failed")
      return NextResponse.redirect(new URL(`/account?error=exchange_failed&error_description=${msg}`, url.origin))
    }
    // success → go to the intended page
    return NextResponse.redirect(new URL(next, url.origin))
  } catch (e: any) {
    const msg = encodeURIComponent(e?.message || "unknown")
    return NextResponse.redirect(new URL(`/account?error=callback_exception&error_description=${msg}`, url.origin))
  }
}
