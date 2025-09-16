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

  // Use Next.js cookies and infer the correct options type so we don't use "any"
  const cookieStore = cookies()
  type CookieSetOptions = Parameters<typeof cookieStore.set>[2]

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieSetOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieSetOptions) {
          cookieStore.set(name, "", { ...options, maxAge: 0 })
        },
      },
    }
  )

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      const msg = encodeURIComponent(error.message || "exchange failed")
      return NextResponse.redirect(
        new URL(`/account?error=exchange_failed&error_description=${msg}`, url.origin)
      )
    }
    return NextResponse.redirect(new URL(next, url.origin))
  } catch (e) {
    const msg = encodeURIComponent((e as Error)?.message || "unknown")
    return NextResponse.redirect(
      new URL(`/account?error=callback_exception&error_description=${msg}`, url.origin)
    )
  }
}
