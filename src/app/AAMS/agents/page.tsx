'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AgentsRedirect() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ams_landing_view', 'agent')
    }
    router.replace('/AAMS#features')
  }, [router])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Agenient AAMS for Insurance Agents</h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        Agent commission tracking, statement reconciliation, and autonomous workflows for solo and producer-level agents. Loading the agent experience…
      </p>
    </div>
  )
}
