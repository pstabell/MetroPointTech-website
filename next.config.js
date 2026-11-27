/** @type {import('next').NextConfig} */

// The agent and agency views of /AAMS. AAMSContent reads ?view= and the #features anchor is the section it sets.
const AAMS_AGENT_VIEW = '/AAMS?view=agent#features'
const AAMS_AGENCY_VIEW = '/AAMS?view=agency#features'

// aamshub.com was a second full copy of this site (www.aamshub.com/ was in Google). Its pages now send visitors and
// search engines to the same path here. /api/ is left alone so nothing posting to aamshub.com (a Stripe webhook, an
// old form) breaks: a redirect would turn a POST into a failed call. Checked 2026-10-08: no auth, OAuth, Stripe
// return URL or email in this repo or the AAMS app names aamshub.com.
const AAMSHUB_HOSTS = ['aamshub.com', 'www.aamshub.com']

// Content-Security-Policy (added 2026-11-18). This is the ONE place the policy lives; it is sent on every response.
// It limits which sites the browser may run scripts from, so a script injected from anywhere else is blocked.
// ANY NEW OUTSIDE SCRIPT (analytics, chat, video, Stripe.js, a review or booking widget, a CDN) MUST BE ADDED TO THIS
// LIST, or the browser will silently refuse to load it. Exact hosts only: no "https:" and no "*".
const SCRIPT_HOSTS = [
  'https://www.googletagmanager.com', // Google Analytics 4 gtag.js (src/app/layout.tsx)
  'https://www.clarity.ms', // Microsoft Clarity tag (src/components/MicrosoftClarity.tsx)
  'https://scripts.clarity.ms', // clarity.js, which the Clarity tag loads at run time
]
// `next dev` only: React needs eval for hot reload, and Vercel Analytics loads its debug script from
// va.vercel-scripts.com. Neither is in the production header (in production those scripts are served from this site).
const DEV_ONLY_SCRIPT_SOURCES = process.env.NODE_ENV === 'development' ? ["'unsafe-eval'", 'https://va.vercel-scripts.com'] : []
const CONTENT_SECURITY_POLICY = [
  // 'unsafe-inline' stays for now: Next.js and the analytics snippets emit inline scripts (nonces are a later step).
  ['script-src', "'self'", "'unsafe-inline'", ...DEV_ONLY_SCRIPT_SOURCES, ...SCRIPT_HOSTS].join(' '),
  "object-src 'none'",
  "base-uri 'self'",
  // No other site is meant to show this site inside a frame.
  "frame-ancestors 'self'",
].join('; ')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Next.js 15 name for what Next.js 14 called experimental.serverComponentsExternalPackages (same effect).
  serverExternalPackages: ['@supabase/supabase-js'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'agentcommissiontracker.com' }],
        destination: 'https://agenient.com/AAMS',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.agentcommissiontracker.com' }],
        destination: 'https://agenient.com/AAMS',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'app.agentcommissiontracker.com' }],
        destination: 'https://ams.metropointtech.com/login',
        permanent: true,
      },
      ...AAMSHUB_HOSTS.map((host) => ({
        source: '/:path((?!api/).*)',
        has: [{ type: 'host', value: host }],
        destination: 'https://agenient.com/:path',
        permanent: true,
      })),
      // /AAMS/agents and /AAMS/agencies were client-side jumps to /AAMS (a near-empty page in the sitemap), and the
      // retired /ams-app pages answered 307 with no Location header. All are real redirects now (SEO audit 2026-10-08).
      { source: '/AAMS/agents', destination: AAMS_AGENT_VIEW, permanent: true },
      { source: '/AAMS/agencies', destination: AAMS_AGENCY_VIEW, permanent: true },
      { source: '/ams-app', destination: '/AAMS', permanent: true },
      // /products/ams was an older duplicate of /AAMS with a price table that no longer matched (SEO 2026-10-13).
      { source: '/products/ams', destination: '/AAMS', permanent: true },
      { source: '/ams-app/agents', destination: AAMS_AGENT_VIEW, permanent: true },
      { source: '/ams-app/agencies', destination: AAMS_AGENCY_VIEW, permanent: true },
      // The Claude Code Discord post is about our own engineering, so its home is metropointtechnology.com; that site
      // sends its copies of the AAMS posts here.
      {
        source: '/blog/how-we-fixed-claude-code-broken-discord-channels',
        destination: 'https://www.metropointtechnology.com/blog/how-we-fixed-claude-code-broken-discord-channels',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      { source: '/ai4', destination: '/ai4.html' },
      { source: '/ai4/', destination: '/ai4.html' },
    ]
  },
  async headers() {
    return [
      { source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY }] },
      // The Ai4 landing page is a bio of Patrick that competed with patrickstabell.com in search (SEO audit 2026-10-08).
      ...['/ai4', '/ai4/', '/ai4.html'].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      })),
    ]
  },
}

module.exports = nextConfig
