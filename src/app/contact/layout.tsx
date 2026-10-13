import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { graph, breadcrumb } from '@/lib/structured-data'

// Target query and page SEO: see D:/Atlas/artifacts/seo-agenient-mpt-2026-10-13/plan.md
export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Questions about Agenient AAMS, the commission tracker or our AI agents for insurance agencies? Get in touch with Metro Point Technology; we respond personally.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd data={graph(breadcrumb(['Contact', '/contact']))} />
    </>
  )
}
