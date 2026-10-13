import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import ValueProposition from '@/components/ValueProposition'
import CallToAction from '@/components/CallToAction'
import ExplainerVideo from '@/components/ExplainerVideo'
import JsonLd from '@/components/JsonLd'
import { graph, aamsSoftware, crmSoftware, aiAgentTeamsService } from '@/lib/structured-data'

// Target query and page SEO: see D:/Atlas/artifacts/seo-agenient-mpt-2026-10-13/plan.md
export const metadata: Metadata = pageMetadata({
  title: 'Agenient | AI Software for Insurance Agencies',
  description: 'AI software for insurance agencies: an autonomous agency management system, a CRM built in, and commission tracking that reconciles carrier statements.',
  path: '/',
  absoluteTitle: true,
})

export default function Home() {
  return (
    <>
      <JsonLd data={graph(aamsSoftware, crmSoftware, aiAgentTeamsService)} />
      <Hero />
      <ExplainerVideo />
      <ValueProposition />
      <ProductShowcase />
      <CallToAction />
    </>
  )
}
