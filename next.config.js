/** @type {import('next').NextConfig} */
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
        destination: 'https://www.metropointtech.com/AAMS',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.agentcommissiontracker.com' }],
        destination: 'https://www.metropointtech.com/AAMS',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
