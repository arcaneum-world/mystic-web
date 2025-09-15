"use client"
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: hook into Mailchimp, Supabase, or backend
    console.log("Email submitted:", email)
    setSubmitted(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-black to-purple-950 text-white px-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold">
          Discover <span className="text-purple-400">Your Magic</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Tarot pulls, astrology, and hidden wisdom — all in one app. 
          Be the first to access the future of esoterica.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-black w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold w-full sm:w-auto"
            >
              Notify Me
            </button>
          </form>
        ) : (
          <p className="text-green-400 font-semibold">
            ✨ Thanks! You’re on the list.
          </p>
        )}

        <div className="space-x-4 pt-4">
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition font-semibold"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  )
}
