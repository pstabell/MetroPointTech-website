import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenient AAMS for Insurance Agencies',
  description: 'Agenient AAMS for insurance agencies. Multi-producer commission management, agency-wide reconciliation, and autonomous operations from $99 to $999 per month.',
  alternates: { canonical: '/AAMS/agencies' },
  openGraph: {
    title: 'Agenient AAMS for Insurance Agencies | Agenient',
    description: 'Agenient AAMS for insurance agencies. Multi-producer commission management and autonomous operations.',
    url: 'https://aamshub.com/AAMS/agencies',
  },
}

export default function AamsAgenciesLayout({ children }: { children: React.ReactNode }) {
  return children
}
