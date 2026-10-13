import { NextRequest, NextResponse } from 'next/server'

/**
 * In-memory fixed-window rate limiter for the public onboarding routes
 * (security fix 2026-10-13). Per serverless instance, so it is a stopgap
 * against a single script guessing client numbers, not a distributed one.
 */

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

function tooMany(retryMs: number) {
  return NextResponse.json(
    { error: 'Too many attempts. Please wait a few minutes and try again.' },
    { status: 429, headers: { 'Retry-After': String(Math.ceil(retryMs / 1000)) } },
  )
}

/** Counts one hit against `name` for this IP; 429 when over `limit`. */
export function rateLimit(req: NextRequest, name: string, limit: number, windowMs: number): NextResponse | null {
  const now = Date.now()
  const key = `${name}:${clientIp(req)}`
  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
  } else if (++b.count > limit) {
    return tooMany(b.resetAt - now)
  }
  if (buckets.size > 5000) {
    buckets.forEach((v, k) => {
      if (v.resetAt <= now) buckets.delete(k)
    })
  }
  return null
}

/** True (and a 429 ready) when this IP is already over `limit` for `name`, without counting a hit. */
export function isLimited(req: NextRequest, name: string, limit: number): NextResponse | null {
  const b = buckets.get(`${name}:${clientIp(req)}`)
  if (b && b.resetAt > Date.now() && b.count >= limit) return tooMany(b.resetAt - Date.now())
  return null
}

/** 403 unless the request comes from a page on this same host. */
export function requireSameOrigin(req: NextRequest): NextResponse | null {
  const host = (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').toLowerCase()
  const origin = req.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).host.toLowerCase() === host) return null
    } catch {}
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  if (req.headers.get('sec-fetch-site') === 'same-origin') return null
  const referer = req.headers.get('referer')
  if (referer) {
    try {
      if (new URL(referer).host.toLowerCase() === host) return null
    } catch {}
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// Wrong client numbers are the guessing signal: allow a handful per IP.
export const MISS_LIMIT = 10
export const MISS_WINDOW_MS = 60 * 60 * 1000

/**
 * Shared guard for the onboarding routes: same-origin, a general per-route
 * limit, and a block once this IP has hit too many unknown client numbers.
 */
export function guardOnboarding(req: NextRequest, name: string, limit: number): NextResponse | null {
  return (
    requireSameOrigin(req) ||
    isLimited(req, 'onboarding-miss', MISS_LIMIT) ||
    rateLimit(req, `onboarding-${name}`, limit, 10 * 60 * 1000)
  )
}

/** Record one unknown-client-number lookup for this IP. */
export function recordMiss(req: NextRequest): void {
  rateLimit(req, 'onboarding-miss', Number.MAX_SAFE_INTEGER, MISS_WINDOW_MS)
}
