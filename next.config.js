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
        destination: 'https://www.aamshub.com/AAMS',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.agentcommissiontracker.com' }],
        destination: 'https://www.aamshub.com/AAMS',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'app.agentcommissiontracker.com' }],
        destination: 'https://ams.metropointtech.com/login',
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
