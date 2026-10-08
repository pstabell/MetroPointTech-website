/** @type {import('next').NextConfig} */

// The agent and agency views of /AAMS. AAMSContent reads ?view= and the #features anchor is the section it sets.
const AAMS_AGENT_VIEW = '/AAMS?view=agent#features'
const AAMS_AGENCY_VIEW = '/AAMS?view=agency#features'

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
      // /AAMS/agents and /AAMS/agencies were client-side jumps to /AAMS (a near-empty page in the sitemap), and the
      // retired /ams-app pages answered 307 with no Location header. All are real redirects now (SEO audit 2026-10-08).
      { source: '/AAMS/agents', destination: AAMS_AGENT_VIEW, permanent: true },
      { source: '/AAMS/agencies', destination: AAMS_AGENCY_VIEW, permanent: true },
      { source: '/ams-app', destination: '/AAMS', permanent: true },
      { source: '/ams-app/agents', destination: AAMS_AGENT_VIEW, permanent: true },
      { source: '/ams-app/agencies', destination: AAMS_AGENCY_VIEW, permanent: true },
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
