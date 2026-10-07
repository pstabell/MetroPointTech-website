import Link from 'next/link'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import ValueProposition from '@/components/ValueProposition'
import CallToAction from '@/components/CallToAction'
import ExplainerVideo from '@/components/ExplainerVideo'
import JsonLd from '@/components/JsonLd'
import { graph, aamsSoftware, crmSoftware, aiAgentTeamsService } from '@/lib/structured-data'

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
