/** @type {import('next').NextConfig} */

// The agent and agency views of /AAMS. AAMSContent reads ?view= and the #features anchor is the section it sets.
const AAMS_AGENT_VIEW = '/AAMS?view=agent#features'
const AAMS_AGENCY_VIEW = '/AAMS?view=agency#features'

// aamshub.com was a second full copy of this site (www.aamshub.com/ was in Google). Its pages now send visitors and
// search engines to the same path here. /api/ is left alone so nothing posting to aamshub.com (a Stripe webhook, an
// old form) breaks: a redirect would turn a POST into a failed call. Checked 2026-10-08: no auth, OAuth, Stripe
// return URL or email in this repo or the AAMS app names aamshub.com.
const AAMSHUB_HOSTS = ['aamshub.com', 'www.aamshub.com']

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
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
}

module.exports = nextConfig
