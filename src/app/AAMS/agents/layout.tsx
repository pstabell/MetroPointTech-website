import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { graph, breadcrumb } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Agenient AAMS for Insurance Agents',
  description: 'Agenient AAMS for solo and producer-level insurance agents. Agent commission tracking, statement reconciliation, and autonomous workflows for $19.99 per month.',
  alternates: { canonical: '/AAMS/agents' },
  openGraph: {
    title: 'Agenient AAMS for Insurance Agents | Agenient',
    description: 'Agenient AAMS for solo and producer-level insurance agents. Commission tracking and autonomous workflows for $19.99 per month.',
    url: 'https://agenient.com/AAMS/agents',
  },
}

export default function AamsAgentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={graph(breadcrumb(['Agenient AAMS', '/AAMS'], ['For Insurance Agents', '/AAMS/agents']))} />
    </>
  )
}
