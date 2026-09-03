import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenient AAMS for Insurance Agents',
  description: 'Agenient AAMS for solo and producer-level insurance agents. Agent commission tracking, statement reconciliation, and autonomous workflows for $19.99 per month.',
  alternates: { canonical: '/AAMS/agents' },
  openGraph: {
    title: 'Agenient AAMS for Insurance Agents | Agenient',
    description: 'Agenient AAMS for solo and producer-level insurance agents. Commission tracking and autonomous workflows for $19.99 per month.',
    url: 'https://aamshub.com/AAMS/agents',
  },
}

export default function AamsAgentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
