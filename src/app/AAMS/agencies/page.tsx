'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AgenciesRedirect() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ams_landing_view', 'agency')
    }
    router.replace('/AAMS#features')
  }, [router])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Agenient AAMS for Insurance Agencies</h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        Multi-producer commission management, agency-wide reconciliation, and autonomous operations from $99 to $999 per month. Loading the agency experience…
      </p>
    </div>
  )
}
