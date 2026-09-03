'use client'

import { useState } from 'react'

interface AIAgentCheckoutProps {
  plan: 'basic' | 'premium' | 'enterprise'
  accent: boolean
}

export default function AIAgentCheckout({ plan, accent }: AIAgentCheckoutProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    if (!showEmail) {
      setShowEmail(true)
      return
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email }),
      })
      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {showEmail && (
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            placeholder="Enter your business email"
            className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
              accent
                ? 'bg-white/10 border-white/20 text-white placeholder-violet-300 focus:ring-accent'
                : 'bg-neutral-lighter border-gray-200 text-slate-800 placeholder-gray-400 focus:ring-primary'
            }`}
            onKeyDown={e => e.key === 'Enter' && handleCheckout()}
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
      )}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`block w-full text-center py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait ${
          accent
            ? 'bg-accent hover:bg-accent-dark text-white shadow-lg'
            : 'bg-primary hover:bg-primary-dark text-white'
        }`}
      >
        {loading ? 'Redirecting to Checkout...' : showEmail ? 'Continue to Checkout' : 'Get Started'}
      </button>
    </div>
  )
}
