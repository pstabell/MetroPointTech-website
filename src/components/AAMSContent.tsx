'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AgencyCalculator from '@/components/AgencyCalculator'

type View = 'producer' | 'agent' | 'agency'

export default function AAMSContent() {
  const [view, setView] = useState<View>('agency')

  useEffect(() => {
    const saved = localStorage.getItem('ams_landing_view')
    if (saved === 'producer' || saved === 'agent' || saved === 'agency') {
      setView(saved)
      localStorage.removeItem('ams_landing_view')
    }
  }, [])

  const isProducer = view === 'producer'
  const isAgent = view === 'agent'
  const isAgency = view === 'agency'

  const borderColor = isAgency
    ? 'border-violet-600'
    : isProducer
    ? 'border-cyan-700'
    : 'border-primary'
  const stepBg = isAgency
    ? 'bg-violet-600'
    : isProducer
    ? 'bg-cyan-700'
    : 'bg-primary'

  return (
    <>
      {/* Features with Producer/Agent/Agency Toggle */}
      <section id="features" className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Autonomous Operations for Producers, Agents, and Agencies
          </h2>

          {/* Three-way Toggle Button */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-xl p-1.5 border border-gray-200">
              <button
                onClick={() => setView('producer')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isProducer
                    ? 'bg-cyan-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Producer
                <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">FREE</span>
              </button>
              <button
                onClick={() => setView('agent')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isAgent
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Solo Agent
              </button>
              <button
                onClick={() => setView('agency')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isAgency
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Agency
              </button>
            </div>
          </div>

          {isProducer ? (
            <div>
              <p className="text-center text-lg text-neutral-dark mb-4 max-w-3xl mx-auto">
                Agent commission tracking, free forever. Producers at agencies use AAMS Producer to track their agency commission statements, catch carrier underpayments along the way, and make sure they get paid right on every commission they earn.
              </p>
              <p className="text-center text-sm text-cyan-800 font-semibold mb-10 max-w-3xl mx-auto">
                Manual reconciliation. Upgrade to AAMS Solo Agent any time to manage 100% of your commissions and turn on autonomous reconciliation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-cyan-700">
                    <Image src="/images/ams-app/reconciliation.png" alt="Agency commission statement reconciliation" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Reconcile Your Agency Statement</h3>
                  <p className="text-neutral-dark">Upload the agency commission statement you receive each cycle and reconcile it against the policies you've tracked. See what matched and what is missing.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-cyan-700">
                    <Image src="/images/ams-app/carriers.png" alt="Catch carrier underpayments" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Catch Carrier Underpayments</h3>
                  <p className="text-neutral-dark">Spot when a carrier short-pays a commission against the policy you wrote. Win for the agency, win for your wallet.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-cyan-700">
                    <Image src="/images/ams-app/ledger.png" alt="Personal revenue ledger" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Personal Revenue Ledger</h3>
                  <p className="text-neutral-dark">Every commission dollar tracked in one ledger you control. Yours, separate from the agency's books, exportable any time.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-cyan-700">
                    <Image src="/images/ams-app/f1-dark-dashboard.png" alt="Dashboard dark mode" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Dark Mode</h3>
                  <p className="text-neutral-dark">Switch between light and dark themes. Same comfort as the paid tiers.</p>
                </div>
              </div>
            </div>
          ) : isAgent ? (
            <div>
              <p className="text-center text-lg text-neutral-dark mb-10 max-w-3xl mx-auto">
                Solo agents use AAMS Solo to track their own commissions, catch discrepancies, and make sure they get paid every dollar they earned.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                    <Image src="/images/ams-app/reconciliation.png" alt="Commission reconciliation" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Upload & Reconcile</h3>
                  <p className="text-neutral-dark">Import your commission statements and instantly see what matched, what is missing, and what needs attention.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                    <Image src="/images/ams-app/carriers.png" alt="Carrier management" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Carrier Management</h3>
                  <p className="text-neutral-dark">All your carriers in one place. Progressive, Travelers, Safeco, and many more P&C carriers supported.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                    <Image src="/images/ams-app/ledger.png" alt="Policy revenue ledger" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Policy Revenue Ledger</h3>
                  <p className="text-neutral-dark">Track every commission dollar across all your policies in one clear ledger.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                    <Image src="/images/ams-app/f1-dark-dashboard.png" alt="Dashboard dark mode" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Dark Mode</h3>
                  <p className="text-neutral-dark">Switch between light and dark themes. Your preference, your comfort.</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-lg text-neutral-dark mb-10 max-w-3xl mx-auto">
                Agency owners and managers use AAMS Agency to reconcile carrier statements, manage agents, and oversee all commissions across the entire team.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                    <Image src="/images/ams-app/f2-dashboard.png" alt="Agency dashboard" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Agency Dashboard</h3>
                  <p className="text-neutral-dark">See all commissions, policies, and transactions across your entire agency in one view.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                    <Image src="/images/ams-app/f2-reconciliation.png" alt="Agency reconciliation" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Agency Reconciliation</h3>
                  <p className="text-neutral-dark">Upload carrier commission statements and reconcile across all agents and house accounts.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                    <Image src="/images/ams-app/f2-admin.png" alt="Admin panel" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Admin Panel</h3>
                  <p className="text-neutral-dark">Manage users, carriers, commission rules, and column mappings from one central control panel.</p>
                </div>
                <div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                    <Image src="/images/ams-app/f2-dark-dashboard.png" alt="Agency dark mode" width={1440} height={900} className="w-full h-auto" />
                  </div>
                  <h3 className="font-bold text-xl mt-4 mb-2">Dark Mode</h3>
                  <p className="text-neutral-dark">The full agency experience is available in dark mode for comfortable extended use.</p>
                </div>
              </div>
              <AgencyCalculator />
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`w-14 h-14 ${stepBg} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6`}>1</div>
                <h3 className="text-2xl font-bold mb-4">Upload Your Statements</h3>
                <p className="text-lg text-neutral-dark">
                  {isAgency
                    ? 'Import carrier commission statements for your entire agency. Reconcile across all agents and house accounts in one upload.'
                    : isProducer
                    ? 'Import your agency commission statements via CSV, Excel, or manual entry. Whatever your agency hands you each pay cycle — monthly summary, per-carrier breakdown, anything in between — drops in the same way.'
                    : 'Import your carrier commission statements via CSV, Excel, or manual entry. We support Progressive, Travelers, Safeco, and many other P&C carriers.'}
                </p>
              </div>
              <div className={`rounded-xl overflow-hidden shadow-lg border-2 ${borderColor}`}>
                <Image
                  src={isAgency ? '/images/ams-app/f2-reconciliation.png' : '/images/ams-app/reconciliation.png'}
                  alt="Upload and import commission statements"
                  width={1440} height={900} className="w-full h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2">
                <div className={`w-14 h-14 ${stepBg} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6`}>2</div>
                <h3 className="text-2xl font-bold mb-4">
                  {isProducer ? 'Manual Reconciliation' : 'Agentic Reconciliation'}
                </h3>
                <p className="text-lg text-neutral-dark">
                  {isAgency
                    ? 'Zero-touch matching across your entire book of business. The system reconciles every agent, every carrier, every policy autonomously.'
                    : isProducer
                    ? 'Match payments to your tracked policies with the manual reconciliation workflow. Want the system to do it for you autonomously? Upgrade to Solo Agent or higher.'
                    : 'Zero-touch matching of payments to policies. The system identifies and flags discrepancies autonomously — no manual cross-referencing.'}
                </p>
              </div>
              <div className={`md:order-1 rounded-xl overflow-hidden shadow-lg border-2 ${borderColor}`}>
                <Image
                  src={isAgency ? '/images/ams-app/f2-policies.png' : '/images/ams-app/ledger.png'}
                  alt="Reconciliation"
                  width={1440} height={900} className="w-full h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`w-14 h-14 ${stepBg} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6`}>3</div>
                <h3 className="text-2xl font-bold mb-4">Get Paid Right</h3>
                <p className="text-lg text-neutral-dark">
                  {isAgency
                    ? 'Agency-wide reports show exactly what every carrier owes across all agents. Dispute underpayments with data, not guesswork.'
                    : isProducer
                    ? 'Your reports show exactly what you were paid against what you were owed on every policy you wrote. Bring proof to the agency owner if anything is short. Know what you earned and what you are owed.'
                    : 'Use our reports to dispute underpayments with an agency or carriers. Know exactly what you earned and what you are owed.'}
                </p>
              </div>
              <div className={`rounded-xl overflow-hidden shadow-lg border-2 ${borderColor}`}>
                <Image
                  src={isAgency ? '/images/ams-app/f2-reports.png' : '/images/ams-app/reports.png'}
                  alt="Commission reports"
                  width={1440} height={900} className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action */}
      <section className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">See It In Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className={`rounded-xl overflow-hidden shadow-lg border-2 ${borderColor}`}>
                <Image
                  src={isAgency ? '/images/ams-app/f2-customers.png' : '/images/ams-app/customers.png'}
                  alt={isAgency ? 'Agency customer management' : 'Customer management'}
                  width={1440} height={900} className="w-full h-auto"
                />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">
                {isAgency ? 'Agency-Wide Customers' : 'Customer Management'}
              </h3>
              <p className="text-neutral-dark">
                {isAgency
                  ? 'See every customer across all agents. Track policies, carriers, and commission activity for the entire agency.'
                  : 'See every customer, their policies, carriers, and commission activity at a glance.'}
              </p>
            </div>
            <div>
              <div className={`rounded-xl overflow-hidden shadow-lg border-2 ${borderColor}`}>
                <Image
                  src={isAgency ? '/images/ams-app/f2-carriers.png' : '/images/ams-app/ledger-reports.png'}
                  alt={isAgency ? 'Agency carrier management' : 'Detailed ledger reports'}
                  width={1440} height={900} className="w-full h-auto"
                />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">
                {isAgency ? 'Agency Carrier Management' : 'Detailed Reports'}
              </h3>
              <p className="text-neutral-dark">
                {isAgency
                  ? 'Manage all carrier relationships, commission rules, and statement mappings across the agency from one place.'
                  : 'Comprehensive revenue analytics with transaction details, policy summaries, and export to CSV.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Tables */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Three-way Toggle Button */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-xl p-1.5 border border-gray-200">
              <button
                onClick={() => setView('producer')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isProducer
                    ? 'bg-cyan-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Producer
                <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">FREE</span>
              </button>
              <button
                onClick={() => setView('agent')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isAgent
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Solo Agent
              </button>
              <button
                onClick={() => setView('agency')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isAgency
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Agency
              </button>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Pricing</h2>
          <p className="text-lg text-neutral-dark max-w-2xl mx-auto mb-12">
            A fraction of what legacy AMS platforms charge. Full autonomous operations included on the paid tiers. Producer is free forever for producers at agencies — no credit card.
          </p>

          {isProducer ? (
            /* Producer view — Free card prominent + upgrade hook */
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Producer Free */}
                <div className="bg-white border-2 border-cyan-700 rounded-2xl p-8 shadow-xl flex flex-col relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    FREE FOREVER
                  </div>
                  <div className="text-sm font-semibold text-cyan-700 mb-1">AAMS PRODUCER</div>
                  <div className="text-5xl font-bold mb-1">$0</div>
                  <div className="text-neutral-dark mb-3 text-sm">forever</div>
                  <div className="text-xs text-neutral-dark mb-6 italic text-left">
                    <div>Agent commission tracking for producers at agencies.</div>
                    <div className="mt-1">Built-in split cap: 90% new / 80% renewal.</div>
                  </div>
                  <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                    {[
                      { feature: 'Unlimited Policy Tracking', included: true },
                      { feature: 'Manual Reconciliation', included: true },
                      { feature: 'Capped Split Ledger', included: true },
                      { feature: 'Revenue Reports', included: true },
                      { feature: 'Excel Import/Export', included: true },
                      { feature: 'All Major P&C Carriers', included: true },
                      { feature: 'AI Agentic Reconciliation', included: false },
                      { feature: 'AI Coaching & Alerts', included: false },
                    ].map((item) => (
                      <li key={item.feature} className="flex items-center gap-2">
                        <span className={item.included ? 'text-green-500' : 'text-gray-300'}>
                          {item.included ? '✓' : '✗'}
                        </span>
                        <span className={item.included ? '' : 'text-gray-400'}>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://ams.metropointtech.com/login?plan=producer&promo=PRODUCER_FREE" className="block w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-lg transition text-center">
                    Get Started Free
                  </a>
                </div>

                {/* Upgrade hook */}
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 shadow-lg flex flex-col text-left">
                  <div className="text-sm font-semibold text-blue-100 mb-1">READY TO MANAGE 100% OF YOUR COMMISSIONS?</div>
                  <div className="text-3xl font-bold mb-4">Upgrade to AAMS Solo Agent</div>
                  <p className="text-blue-100 mb-6">
                    Drop the split cap and track 100% of your commissions — yours plus anything you handle as your own book. Move up to Pro or Autopilot to add autonomous reconciliation on top, so the system runs your commission ops while you focus on selling.
                  </p>
                  <ul className="space-y-2 mb-8 text-sm flex-grow">
                    <li className="flex items-center gap-2"><span className="text-accent">✓</span> Manage 100% of commissions — no split cap</li>
                    <li className="flex items-center gap-2"><span className="text-accent">✓</span> AI Agentic Reconciliation (Pro & Autopilot)</li>
                    <li className="flex items-center gap-2"><span className="text-accent">✓</span> AI Coaching & Alerts (Pro & Autopilot)</li>
                    <li className="flex items-center gap-2"><span className="text-accent">✓</span> Email Statement Forwarding (Autopilot)</li>
                  </ul>
                  <div className="text-xs text-blue-200 mb-3">Starter $19.99/mo · Autonomous from $49.99/mo · 14-day free trial</div>
                  <button
                    onClick={() => setView('agent')}
                    className="block w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition text-center"
                  >
                    See Solo Agent Plans
                  </button>
                </div>
              </div>
            </div>
          ) : isAgent ? (
            /* Solo Agent Comparison — 3 columns */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg flex flex-col">
                <div className="text-sm font-semibold text-primary mb-1">AAMS STARTER</div>
                <div className="text-4xl font-bold mb-1">$19.99</div>
                <div className="text-neutral-dark mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                  {[
                    { feature: 'Unlimited Policy Tracking', included: true },
                    { feature: 'Manual Reconciliation', included: true },
                    { feature: 'Revenue Ledger & Reports', included: true },
                    { feature: 'Excel Import/Export', included: true },
                    { feature: 'All Major P&C Carriers', included: true },
                    { feature: 'AI Agentic Reconciliation', included: false },
                    { feature: 'AI Coaching & Alerts', included: false },
                    { feature: 'Email Statement Forwarding', included: false },
                    { feature: 'Auto-Processing', included: false },
                  ].map((item) => (
                    <li key={item.feature} className="flex items-center gap-2">
                      <span className={item.included ? 'text-green-500' : 'text-gray-300'}>
                        {item.included ? '✓' : '✗'}
                      </span>
                      <span className={item.included ? '' : 'text-gray-400'}>{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition text-center">
                  Start Free Trial
                </a>
              </div>

              {/* Pro */}
              <div className="bg-white border-2 border-accent rounded-2xl p-6 shadow-xl flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <div className="text-sm font-semibold text-accent mb-1">AAMS PRO</div>
                <div className="text-4xl font-bold mb-1">$49.99</div>
                <div className="text-neutral-dark mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                  {[
                    { feature: 'Unlimited Policy Tracking', included: true },
                    { feature: 'Manual Reconciliation', included: true },
                    { feature: 'Revenue Ledger & Reports', included: true },
                    { feature: 'Excel Import/Export', included: true },
                    { feature: 'All Major P&C Carriers', included: true },
                    { feature: 'AI Agentic Reconciliation', included: true },
                    { feature: 'AI Coaching & Alerts', included: true },
                    { feature: 'Email Statement Forwarding', included: false },
                    { feature: 'Auto-Processing', included: false },
                  ].map((item) => (
                    <li key={item.feature} className="flex items-center gap-2">
                      <span className={item.included ? 'text-green-500' : 'text-gray-300'}>
                        {item.included ? '✓' : '✗'}
                      </span>
                      <span className={item.included ? '' : 'text-gray-400'}>{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition text-center">
                  Start Free Trial
                </a>
              </div>

              {/* Autopilot */}
              <div className="bg-white border-2 border-primary rounded-2xl p-6 shadow-lg flex flex-col">
                <div className="text-sm font-semibold text-primary mb-1">AAMS AUTOPILOT</div>
                <div className="text-4xl font-bold mb-1">$79.99</div>
                <div className="text-neutral-dark mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                  {[
                    { feature: 'Unlimited Policy Tracking', included: true },
                    { feature: 'Manual Reconciliation', included: true },
                    { feature: 'Revenue Ledger & Reports', included: true },
                    { feature: 'Excel Import/Export', included: true },
                    { feature: 'All Major P&C Carriers', included: true },
                    { feature: 'AI Agentic Reconciliation', included: true },
                    { feature: 'AI Coaching & Alerts', included: true },
                    { feature: 'Email Statement Forwarding', included: true },
                    { feature: 'Auto-Processing', included: true },
                  ].map((item) => (
                    <li key={item.feature} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition text-center">
                  Start Free Trial
                </a>
              </div>
            </div>
          ) : (
            /* Agency Comparison — 3 columns */
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Self-Service */}
                <div className="bg-white border-2 border-violet-400 rounded-2xl p-8 shadow-lg flex flex-col">
                  <div className="text-sm font-semibold text-violet-600 mb-1">AAMS AGENCY</div>
                  <div className="text-sm text-neutral-dark mb-4">Self-Service</div>
                  <div className="text-5xl font-bold mb-1">$99.99</div>
                  <div className="text-neutral-dark mb-6">per month</div>
                  <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                    {[
                      { feature: 'Everything in AAMS Solo', included: true },
                      { feature: 'Multi-Agent Management', included: true },
                      { feature: 'Commission Splits & Chargebacks', included: true },
                      { feature: 'Admin Panel & Role Hierarchy', included: true },
                      { feature: 'Real-Time Agent Visibility', included: true },
                      { feature: 'Multi-Location Support', included: true },
                      { feature: 'E-Signatures (BoldSign)', included: true },
                      { feature: 'AI Agentic Reconciliation', included: false },
                      { feature: 'AI Back Office Agent', included: false },
                      { feature: 'Email Auto-Processing', included: false },
                    ].map((item) => (
                      <li key={item.feature} className="flex items-center gap-2">
                        <span className={item.included ? 'text-violet-500' : 'text-gray-300'}>
                          {item.included ? '✓' : '✗'}
                        </span>
                        <span className={item.included ? '' : 'text-gray-400'}>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-neutral-dark mb-4">1 user included. Extra users: $49.99/mo each</div>
                  <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg transition text-center">
                    Start Free 14-Day Trial
                  </a>
                </div>

                {/* AI */}
                <div className="bg-white border-2 border-violet-600 rounded-2xl p-8 shadow-xl flex flex-col relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <div className="text-sm font-semibold text-violet-600 mb-1">AAMS AGENCY</div>
                  <div className="text-sm text-neutral-dark mb-4">With AI Agent</div>
                  <div className="text-5xl font-bold mb-1">$199.99</div>
                  <div className="text-neutral-dark mb-6">per month</div>
                  <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                    {[
                      { feature: 'Everything in Self-Service', included: true },
                      { feature: 'Multi-Agent Management', included: true },
                      { feature: 'Commission Splits & Chargebacks', included: true },
                      { feature: 'Admin Panel & Role Hierarchy', included: true },
                      { feature: 'Real-Time Agent Visibility', included: true },
                      { feature: 'Multi-Location Support', included: true },
                      { feature: 'E-Signatures (BoldSign)', included: true },
                      { feature: 'AI Agentic Reconciliation', included: true },
                      { feature: 'AI Back Office Agent', included: true },
                      { feature: 'Email Auto-Processing', included: true },
                    ].map((item) => (
                      <li key={item.feature} className="flex items-center gap-2">
                        <span className="text-violet-500">✓</span>
                        <span>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-neutral-dark mb-4">1 user included. Extra users: $99.99/mo each</div>
                  <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition text-center">
                    Start Free 14-Day Trial
                  </a>
                </div>

                {/* AI Plus */}
                <div className="bg-white border-2 border-violet-700 rounded-2xl p-8 shadow-lg flex flex-col relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-700 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                  <div className="text-sm font-semibold text-violet-700 mb-1">AAMS AGENCY AI</div>
                  <div className="text-sm text-neutral-dark mb-4">Plus — 3 Seats Bundled</div>
                  <div className="text-5xl font-bold mb-1">$299.99</div>
                  <div className="text-neutral-dark mb-6">per month</div>
                  <ul className="text-left space-y-2 mb-8 flex-grow text-sm">
                    {[
                      { feature: 'Everything in Agency AI', included: true },
                      { feature: 'Three Full AI Seats Included', included: true },
                      { feature: 'AI Agentic Reconciliation', included: true },
                      { feature: 'AI Back Office Agent', included: true },
                      { feature: 'Email Auto-Processing', included: true },
                      { feature: 'Shared Agency Dashboard', included: true },
                      { feature: 'Priority Onboarding', included: true },
                    ].map((item) => (
                      <li key={item.feature} className="flex items-center gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-neutral-dark mb-4">3 users included. Save $100/mo vs buying seats separately. Extra users: $99.99/mo each.</div>
                  <a href="https://ams.metropointtech.com/login" className="block w-full py-3 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-lg transition text-center">
                    Subscribe Now
                  </a>
                </div>
              </div>

              {/* AI Action Bucket Add-On */}
              <div className="mt-8 max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-sm font-semibold text-neutral-dark mb-1">AI ACTION BUCKET</div>
                <div className="text-2xl font-bold">$99.99 <span className="text-sm font-normal text-neutral-dark">one-time</span></div>
                <p className="text-sm text-neutral-dark mt-2">600 additional AI actions. Purchase when you need more. No auto-recurring charges.</p>
              </div>
            </div>
          )}

          <p className="text-sm text-neutral-dark mt-8">
            AAMS Producer is free forever for producers at agencies — no credit card, capped commission split.
            AAMS Starter ($19.99) and AAMS Agency Self-Service ($99.99) come with a 14-day free trial — no credit card required.
            AAMS Pro, Autopilot, and Agency AI also include a 14-day free trial but require a credit card at signup.
            AAMS Agency AI Plus ($299.99) has no trial — it is a volume-discount plan billed on day one. Cancel anytime.
          </p>
        </div>
      </section>
    </>
  )
}
