import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AAMS for Insurance Agents',
  description: 'AAMS for solo and producer-level insurance agents. Agent commission tracking, statement reconciliation, and autonomous workflows for $19.99 per month.',
  alternates: { canonical: '/AAMS/agents' },
  openGraph: {
    title: 'AAMS for Insurance Agents | Metro Point Technology',
    description: 'AAMS for solo and producer-level insurance agents. Commission tracking and autonomous workflows for $19.99 per month.',
    url: 'https://metropointtech.com/AAMS/agents',
  },
}

export default function AamsAgentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
