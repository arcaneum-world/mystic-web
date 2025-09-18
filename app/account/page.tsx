"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type View = "loading" | "signed-out" | "signed-in" | "sending" | "sent" | "error";

export default function AccountPage(){
  const [view,setView]=useState<View>("loading");
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");

  const sb = supabaseBrowser();

  // On load, check if we already have a session (i.e., after callback)
  useEffect(()=>{
    let mounted = true;

    sb.auth.getUser().then(({ data })=>{
      if(!mounted) return;
      if (data.user){
        setEmail(data.user.email ?? "");
        setView("signed-in");
      } else {
        setView("signed-out");
      }
    });

    // Also react to auth state changes when callback finishes
    const { data: sub } = sb.auth.onAuthStateChange((_event, session)=>{
      if (session){
        setEmail(session.user.email ?? "");
        setView("signed-in");
      } else {
        setView("signed-out");
      }
    });

    return ()=>{ sub.subscription.unsubscribe(); mounted=false; };
  },[]);

  async function sendLink(e: React.FormEvent){
    e.preventDefault();
    setView("sending"); setError("");

    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "https://www.arcaneum.world");

    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${base}/auth/callback` },
    });

    if (error){ setError(error.message); setView("error"); return; }
    setView("sent");
  }

  async function signOut(){
    await sb.auth.signOut();
    setView("signed-out");
  }

  if (view === "loading") return <div className="p-8">Loading…</div>;

  if (view === "signed-in"){
    return (
      <div className="max-w-md mx-auto py-16 space-y-4">
        <h1 className="text-3xl font-bold">Account</h1>
        <p>Signed in as <span className="font-semibold">{email}</span></p>
        <button onClick={signOut} className="rounded-lg bg-neutral-800 px-4 py-2">Sign out</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <form onSubmit={sendLink} className="space-y-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2"
        />
        <button type="submit" disabled={view==="sending"} className="rounded-lg bg-violet-600 px-4 py-2 font-medium">
          {view==="sending" ? "Sending…" : "Send Magic Link"}
        </button>
      </form>
      {view==="sent" && <p>Check your email for the magic link ✨</p>}
      {view==="error" && <p className="text-red-400">Error: {error}</p>}
    </div>
  );
}
