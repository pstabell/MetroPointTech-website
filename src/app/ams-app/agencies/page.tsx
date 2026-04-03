'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AgenciesRedirect() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ams_landing_view', 'agency')
    }
    router.replace('/ams-app#features')
  }, [router])
  return <div className="min-h-screen flex items-center justify-center">Loading AAMS for Agencies...</div>
}
