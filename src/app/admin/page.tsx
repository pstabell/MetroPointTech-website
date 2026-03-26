'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Check for existing admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('mpt-admin-session')
    if (adminSession === 'authenticated') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password protection - in production this should be more secure
    if (password === 'MPTAdmin2026!') {
      setIsAuthenticated(true)
      localStorage.setItem('mpt-admin-session', 'authenticated')
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('mpt-admin-session')
    setPassword('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              MPT Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter admin credentials to access the portal
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Admin Password"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Access Admin Portal
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Metro Point Technology - Admin Portal
              </h1>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* System Management */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  System Management
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://mpt-mission-control.vercel.app" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800">
                      Mission Control
                    </a>
                  </li>
                  <li>
                    <a href="https://mpt-crm.streamlit.app" target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 hover:text-blue-800">
                      CRM System
                    </a>
                  </li>
                  <li>
                    <a href="https://mpt-accounting.streamlit.app" target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 hover:text-blue-800">
                      Accounting System
                    </a>
                  </li>
                </ul>
              </div>

              {/* Development Tools */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Development
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer"
                       className="text-green-600 hover:text-green-800">
                      Vercel Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/pstabell" target="_blank" rel="noopener noreferrer"
                       className="text-green-600 hover:text-green-800">
                      GitHub Repositories
                    </a>
                  </li>
                  <li>
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
                       className="text-green-600 hover:text-green-800">
                      Supabase Dashboard
                    </a>
                  </li>
                </ul>
              </div>

              {/* Analytics & Monitoring */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">
                  Analytics
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer"
                       className="text-purple-600 hover:text-purple-800">
                      Google Analytics
                    </a>
                  </li>
                  <li>
                    <a href="https://dashboard.vapi.ai" target="_blank" rel="noopener noreferrer"
                       className="text-purple-600 hover:text-purple-800">
                      Vapi Voice Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer"
                       className="text-purple-600 hover:text-purple-800">
                      Twilio Console
                    </a>
                  </li>
                </ul>
              </div>

              {/* Business Tools */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-900 mb-4">
                  Business Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer"
                       className="text-yellow-600 hover:text-yellow-800">
                      Stripe Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="https://sendgrid.com/marketing-campaigns" target="_blank" rel="noopener noreferrer"
                       className="text-yellow-600 hover:text-yellow-800">
                      SendGrid Marketing
                    </a>
                  </li>
                  <li>
                    <a href="https://mpt-phone.vercel.app" target="_blank" rel="noopener noreferrer"
                       className="text-yellow-600 hover:text-yellow-800">
                      MPT Phone System
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support & Communication */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-red-900 mb-4">
                  Communication
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://teams.microsoft.com" target="_blank" rel="noopener noreferrer"
                       className="text-red-600 hover:text-red-800">
                      Microsoft Teams
                    </a>
                  </li>
                  <li>
                    <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer"
                       className="text-red-600 hover:text-red-800">
                      Outlook
                    </a>
                  </li>
                  <li>
                    <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer"
                       className="text-red-600 hover:text-red-800">
                      WhatsApp Web
                    </a>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block text-gray-600 hover:text-gray-800"
                  >
                    ← Back to Website
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="block w-full text-left text-gray-600 hover:text-gray-800"
                  >
                    Refresh Portal
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-green-500 text-sm">●</div>
                  <div className="text-sm text-gray-600">Website</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 text-sm">●</div>
                  <div className="text-sm text-gray-600">CRM</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 text-sm">●</div>
                  <div className="text-sm text-gray-600">Mission Control</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 text-sm">●</div>
                  <div className="text-sm text-gray-600">Phone System</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}