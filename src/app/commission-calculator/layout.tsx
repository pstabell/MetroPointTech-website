import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { graph, commissionCalculatorApp, breadcrumb } from '@/lib/structured-data'

// Target query and page SEO: see D:/Atlas/artifacts/seo-agenient-mpt-2026-10-13/plan.md
export const metadata: Metadata = pageMetadata({
  title: 'Free Insurance Commission Calculator',
  description: 'Free insurance commission calculator. Compare expected vs actual carrier commission, surface underpayments and measure revenue leakage on every policy.',
  path: '/commission-calculator',
})

export default function CommissionCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={graph(commissionCalculatorApp, breadcrumb(['Commission Calculator', '/commission-calculator']))} />
    </>
  )
}
