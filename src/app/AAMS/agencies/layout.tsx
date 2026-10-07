import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { graph, breadcrumb } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Agenient AAMS for Insurance Agencies',
  description: 'Agenient AAMS for insurance agencies. Multi-producer commission management, agency-wide reconciliation, and autonomous operations from $99 to $999 per month.',
  alternates: { canonical: '/AAMS/agencies' },
  openGraph: {
    title: 'Agenient AAMS for Insurance Agencies | Agenient',
    description: 'Agenient AAMS for insurance agencies. Multi-producer commission management and autonomous operations.',
    url: 'https://agenient.com/AAMS/agencies',
  },
}

export default function AamsAgenciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={graph(breadcrumb(['Agenient AAMS', '/AAMS'], ['For Insurance Agencies', '/AAMS/agencies']))} />
    </>
  )
}
