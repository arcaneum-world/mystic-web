'use client'
import { useEffect } from 'react'

export default function CodeRedirector() {
  useEffect(() => {
    try {
      const { location } = window

      // Grab query (?code=...) and also hash (#?code=...) – some mail apps put params here
      const search = location.search
      const hash = location.hash?.startsWith('#') ? location.hash.slice(1) : ''

      const qs = new URLSearchParams(search || '')
      const hs = new URLSearchParams(hash.replace(/^\?/, ''))

      // If ?code is in the hash, move it into a real redirect to /auth/callback
      if (!qs.has('code') && hs.has('code')) {
        const code = hs.get('code')!
        const next = hs.get('next') || '/account'
        const url = new URL('/auth/callback', location.origin)
        url.searchParams.set('code', code)
        if (next) url.searchParams.set('next', next)
        location.replace(url.toString())
        return
      }

      // If ?code is in the query but we're not on /auth/callback, send it there
      if (qs.has('code') && location.pathname !== '/auth/callback') {
        const url = new URL('/auth/callback', location.origin)
        url.search = search
        location.replace(url.toString())
      }
    } catch {
      // ignore
    }
  }, [])

  return null
}
