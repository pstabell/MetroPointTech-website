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
  return <div className="min-h-screen flex items-center justify-center">Loading AAMS for Agents...</div>
}
