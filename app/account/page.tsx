"use client"
import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"

export default function AccountPage() {
  const supabase = supabaseBrowser()
  const [emailInput, setEmailInput] = useState("")
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  async function signIn() {
    setStatus("Sending magic link…")
    const { error } = await supabase.auth.signInWithOtp({
      email: emailInput,
      options: { emailRedirectTo: `${location.origin}/auth/callback?next=/account` },
    })
    if (error) setStatus(`Error: ${error.message}`)
    else setStatus("Check your email for the magic link ✨")
  }

  async function signOut() {
    await supabase.auth.signOut()
    setStatus("Signed out")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Account</h1>

      {userEmail ? (
        <div className="space-y-4">
          <p>Signed in as <span className="font-medium">{userEmail}</span></p>
          <button onClick={signOut} className="rounded bg-purple-600 px-4 py-2">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded px-4 py-2 text-black"
          />
          <button onClick={signIn} className="rounded bg-purple-600 px-4 py-2">
            Send Magic Link
          </button>
          {status && <p className="text-sm text-gray-300">{status}</p>}
        </div>
      )}
    </main>
  )
}
