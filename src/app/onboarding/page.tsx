'use client'

import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Question, Section, Tier } from '@/lib/onboarding-questions'

interface LoadedCustomer {
  clientNumber: string
  email: string
  name: string | null
  tier: Tier
  onboardingComplete: boolean
  onboardingFormSubmittedAt: string | null
}

interface LoadResponse {
  customer: LoadedCustomer
  responses: Record<string, unknown>
  progressPercent: number
  isSubmitted: boolean
  submittedAt: string | null
  sections: Section[]
  questions: Question[]
}

function OnboardingInner() {
  const searchParams = useSearchParams()
  const urlClientNumber = searchParams.get('cn') || ''

  const [step, setStep] = useState<'enter-cn' | 'form' | 'submitted'>(urlClientNumber ? 'form' : 'enter-cn')
  const [clientNumberInput, setClientNumberInput] = useState(urlClientNumber)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [loaded, setLoaded] = useState<LoadResponse | null>(null)
  const [responses, setResponses] = useState<Record<string, unknown>>({})
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-load when URL has cn param
  useEffect(() => {
    if (urlClientNumber && !loaded) {
      loadForm(urlClientNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadForm(cn: string) {
    setLoading(true)
    setLoadError(null)
    try {
      const res = await fetch('/api/onboarding/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientNumber: cn }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoadError(data.error || 'Failed to load form')
        setStep('enter-cn')
        return
      }
      setLoaded(data)
      setResponses(data.responses || {})
      setStep(data.isSubmitted ? 'submitted' : 'form')
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Network error')
      setStep('enter-cn')
    } finally {
      setLoading(false)
    }
  }

  function updateField(key: string, value: unknown) {
    setResponses(prev => {
      const next = { ...prev, [key]: value }
      scheduleAutoSave(next)
      return next
    })
  }

  function scheduleAutoSave(next: Record<string, unknown>) {
    if (!loaded) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveState('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/onboarding/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientNumber: loaded.customer.clientNumber,
            responses: next,
          }),
        })
        if (res.ok) {
          const data = await res.json()
          setSaveState('saved')
          setLastSavedAt(data.savedAt)
          if (loaded) {
            setLoaded({ ...loaded, progressPercent: data.progressPercent })
          }
        } else {
          setSaveState('error')
        }
      } catch {
        setSaveState('error')
      }
    }, 800)
  }

  async function handleSubmit() {
    if (!loaded) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientNumber: loaded.customer.clientNumber,
          responses,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Submission failed')
        return
      }
      setStep('submitted')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setSubmitting(false)
    }
  }

  const groupedSections = useMemo(() => {
    if (!loaded) return []
    return loaded.sections.map(section => ({
      section,
      questions: loaded.questions.filter(q => q.sectionKey === section.key),
    }))
  }, [loaded])

  // ─── Render: Enter client number step ──────────────────────────────
  if (step === 'enter-cn') {
    return (
      <div className="min-h-screen bg-neutral-lighter py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Onboarding Discovery Form</h1>
          <p className="text-neutral-light mb-8">Enter your client number to start or resume your discovery form. Your client number is in your welcome email from Metro Point Technology.</p>

          <label className="block text-sm font-medium text-primary mb-2">Client number</label>
          <input
            type="text"
            value={clientNumberInput}
            onChange={e => setClientNumberInput(e.target.value.toUpperCase())}
            placeholder="MPT-XXXXXX"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg font-mono tracking-wider"
            onKeyDown={e => e.key === 'Enter' && loadForm(clientNumberInput)}
          />
          {loadError && <p className="text-red-600 text-sm mt-2">{loadError}</p>}

          <button
            onClick={() => loadForm(clientNumberInput)}
            disabled={loading || !clientNumberInput}
            className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Continue'}
          </button>
        </div>
      </div>
    )
  }

  // ─── Render: Submitted / thank you step ────────────────────────────
  if (step === 'submitted' && loaded) {
    return (
      <div className="min-h-screen bg-neutral-lighter py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-primary mb-3">Discovery form submitted</h1>
          <p className="text-neutral-light mb-6 text-lg">Thank you. Your responses are in our queue.</p>

          <div className="bg-neutral-lighter rounded-xl p-6 text-left mb-8">
            <p className="text-sm text-neutral-light mb-1">Client number</p>
            <p className="text-2xl font-mono font-bold text-primary">{loaded.customer.clientNumber}</p>
          </div>

          <div className="text-left space-y-4 text-neutral-light">
            <div className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span>Catalyst (our internal project manager) is reviewing your responses right now and building a tailored setup plan for your {loaded.customer.tier} tier.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span>Patrick Stabell will reach out within one business day to schedule your first training hour, matched to your agency&apos;s specific needs.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span>After your first training call, Atlas will wire up your agent(s) to your platforms. You&apos;ll get a separate email with a secure upload link for any API credentials.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <span>You&apos;ll receive a &quot;your agent is live&quot; email the moment your agents go operational.</span>
            </div>
          </div>

          <p className="text-sm text-neutral-light mt-8">Questions? Email <a href="mailto:support@metropointtech.com" className="text-primary underline">support@metropointtech.com</a></p>
        </div>
      </div>
    )
  }

  // ─── Render: Form step ─────────────────────────────────────────────
  if (step === 'form' && loaded) {
    const totalQuestions = loaded.questions.length
    const requiredCount = loaded.questions.filter(q => q.required).length
    const tierLabel = loaded.customer.tier.charAt(0).toUpperCase() + loaded.customer.tier.slice(1)

    return (
      <div className="min-h-screen bg-neutral-lighter py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-4 z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-primary">Discovery Form — AI Agent {tierLabel}</h1>
                <p className="text-sm text-neutral-light font-mono">{loaded.customer.clientNumber} · {loaded.customer.email}</p>
              </div>
              <div className="text-right text-sm">
                {saveState === 'saving' && <span className="text-neutral-light">Saving…</span>}
                {saveState === 'saved' && <span className="text-green-600">✓ Saved</span>}
                {saveState === 'error' && <span className="text-red-600">Save failed</span>}
                {saveState === 'idle' && <span className="text-neutral-light">Auto-saves as you type</span>}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{ width: `${loaded.progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-neutral-light mt-2">
              {loaded.progressPercent}% complete · {requiredCount} required fields · {totalQuestions} total
            </p>
          </div>

          {/* Sections */}
          {groupedSections.map(({ section, questions }) => (
            <div key={section.key} className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-primary mb-6 pb-3 border-b border-gray-200">
                {section.title}
              </h2>
              <div className="space-y-6">
                {questions.map(q => (
                  <div key={q.key}>
                    <label className="block text-sm font-medium text-primary mb-1">
                      {q.label}
                      {q.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {q.helper && <p className="text-xs text-neutral-light mb-2">{q.helper}</p>}
                    {renderField(q, responses[q.key], val => updateField(q.key, val))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-neutral-light mb-4">
              When you hit Submit, Catalyst (our internal project manager) will review your responses and we&apos;ll schedule your first training hour with Patrick. You can always come back to this form and update your answers before submitting — use the same client number.
            </p>
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4">
                {submitError}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting || loaded.progressPercent < 100}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Submitting…'
                : loaded.progressPercent < 100
                  ? `Complete required fields to submit (${loaded.progressPercent}%)`
                  : 'Submit discovery form'}
            </button>
            {lastSavedAt && (
              <p className="text-xs text-neutral-light text-center mt-3">
                Last saved: {new Date(lastSavedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}

function renderField(q: Question, value: unknown, onChange: (v: unknown) => void) {
  const strVal = typeof value === 'string' ? value : value === undefined || value === null ? '' : String(value)

  if (q.type === 'short-text' || q.type === 'email') {
    return (
      <input
        type={q.type === 'email' ? 'email' : 'text'}
        value={strVal}
        onChange={e => onChange(e.target.value)}
        placeholder={q.placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
      />
    )
  }

  if (q.type === 'number') {
    return (
      <input
        type="number"
        value={strVal}
        onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder={q.placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
      />
    )
  }

  if (q.type === 'long-text') {
    return (
      <textarea
        value={strVal}
        onChange={e => onChange(e.target.value)}
        placeholder={q.placeholder}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-sans"
      />
    )
  }

  if (q.type === 'select' && q.options) {
    return (
      <select
        value={strVal}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
      >
        <option value="">Select one…</option>
        {q.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )
  }

  return (
    <input
      type="text"
      value={strVal}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-lighter flex items-center justify-center"><p className="text-neutral-light">Loading…</p></div>}>
      <OnboardingInner />
    </Suspense>
  )
}
