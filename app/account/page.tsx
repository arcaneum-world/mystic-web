"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "sending" | "sent" | "error">(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const supabase = supabaseBrowser();

    // Choose base URL: env in prod, origin in dev, then hard-fallback to www
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "https://www.arcaneum.world");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${base}/auth/callback` },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("sent");
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <form onSubmit={onSend} className="space-y-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-violet-600 px-4 py-2 font-medium"
        >
          {status === "sending" ? "Sending..." : "Send Magic Link"}
        </button>
      </form>

      {status === "sent" && <p>Check your email for the magic link ✨</p>}
      {status === "error" && <p className="text-red-400">Error: {errorMsg}</p>}
    </div>
  );
}
