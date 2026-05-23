import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AMS Platform - Agency Management System',
  description: 'Multi-tenant commission platform with Mirror Architecture. Real-time agent visibility as admin reconciles carrier statements.',
  alternates: { canonical: '/products/ams' },
}

export default function AMSProduct() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-accent font-semibold mb-4">FOR INSURANCE AGENCIES</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Agency Management System
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Multi-tenant commission platform with revolutionary Mirror Architecture.
              Agents see commissions update in REAL-TIME as you reconcile carrier statements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Request Demo
              </Link>
              <Link
                href="#features"
                className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                See Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mirror Architecture Explanation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What is Mirror Architecture?
              </h2>
              <p className="text-xl text-primary">
                Like a two-sided mirror - agents see their isolated view, admin sees through to everything, but the data is identical.
              </p>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">👁️ Agent View</h3>
                  <ul className="space-y-3 text-primary">
                    <li>✓ Sees only their commissions</li>
                    <li>✓ 3 statuses: Due → Reconciled → Paid</li>
                    <li>✓ Updates appear INSTANTLY</li>
                    <li>✓ Complete transparency</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">🔍 Admin View</h3>
                  <ul className="space-y-3 text-primary">
                    <li>✓ Sees all agents</li>
                    <li>✓ Reconciles carrier statements</li>
                    <li>✓ Agents update in real-time</li>
                    <li>✓ Full control & oversight</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-neutral-lighter rounded-xl p-8">
              <p className="text-lg text-primary mb-4">
                <strong>Traditional way:</strong> Admin reconciles month-end, creates spreadsheet, emails to agents. Agents wait weeks to see their numbers.
              </p>
              <p className="text-lg text-primary font-semibold text-accent">
                <strong>Mirror Architecture:</strong> Admin reconciles a carrier statement → Agent sees update immediately. No waiting. No spreadsheets. No email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Status System */}
      <section className="py-16 md:py-24 bg-neutral-lighter" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              3-Status Commission Tracking
            </h2>
            <p className="text-xl text-primary">
              Clear visibility from policy entry to payment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-3 text-primary">1. Due (Unreconciled)</h3>
              <p className="text-primary mb-4">
                Agent enters policy, commission shows as "Due". Waiting for carrier statement to arrive.
              </p>
              <div className="text-sm text-accent font-semibold">
                Agent knows it's coming
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg ring-2 ring-accent">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-3 text-primary">2. Reconciled</h3>
              <p className="text-primary mb-4">
                Admin matches carrier statement → Agent sees update INSTANTLY. Commission amount confirmed.
              </p>
              <div className="text-sm text-accent font-semibold">
                Agent sees it in real-time
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-primary">3. Paid</h3>
              <p className="text-primary mb-4">
                Admin marks as paid → Appears in agent's commission statement. Agent balance updated.
              </p>
              <div className="text-sm text-accent font-semibold">
                Agent gets paid
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Role Hierarchy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              4-Role Hierarchy
            </h2>
            <p className="text-xl text-primary">
              Perfect access control for agencies of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-lighter rounded-xl p-6">
              <div className="text-3xl mb-3">👨‍💼</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Admin</h3>
              <ul className="text-sm text-primary space-y-2">
                <li>• Reconciles statements</li>
                <li>• Sees all agents</li>
                <li>• Overrides locks</li>
                <li>• Full control</li>
              </ul>
            </div>

            <div className="bg-neutral-lighter rounded-xl p-6">
              <div className="text-3xl mb-3">👔</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Manager</h3>
              <ul className="text-sm text-primary space-y-2">
                <li>• Locks transactions</li>
                <li>• Sees their team</li>
                <li>• Cannot reconcile</li>
                <li>• Location oversight</li>
              </ul>
            </div>

            <div className="bg-neutral-lighter rounded-xl p-6">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Agent</h3>
              <ul className="text-sm text-primary space-y-2">
                <li>• Sees own commissions</li>
                <li>• Tracks Due/Reconciled/Paid</li>
                <li>• Enters policies</li>
                <li>• Real-time updates</li>
              </ul>
            </div>

            <div className="bg-neutral-lighter rounded-xl p-6">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Owner</h3>
              <ul className="text-sm text-primary space-y-2">
                <li>• Read-only dashboard</li>
                <li>• Oversight view</li>
                <li>• Agency metrics</li>
                <li>• No data entry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Everything You Need
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">📊 Commission Splits</h3>
              <p className="text-primary">
                Agency keeps X%, Agent gets Y%. Different splits for new business vs renewals. Auto-calculated during reconciliation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">🔒 Transaction Locking</h3>
              <p className="text-primary">
                Managers lock verified transactions. Admin can override. Prevents accidental changes during reconciliation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">⚡ Chargeback Handling</h3>
              <p className="text-primary">
                Carrier issues chargeback → Auto-deducts from agent balance. Next payment calculates: New - Chargeback Balance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">🏢 Multi-Location</h3>
              <p className="text-primary">
                Multiple office locations. Manager oversight per location. Policy reassignment between agents. Team performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Pricing That Scales With You
            </h2>
            <p className="text-xl text-primary">
              Natural growth from solo agent to enterprise agency
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-lighter rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-primary">Starter Agency</h3>
                <p className="text-primary">2-5 agents</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$299/month</div>
                <div className="text-sm text-primary">+ $2,500 setup</div>
              </div>
            </div>

            <div className="bg-accent/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center ring-2 ring-accent">
              <div>
                <div className="text-accent font-semibold text-sm mb-1">MOST POPULAR</div>
                <h3 className="text-xl font-bold text-primary">Pro Agency</h3>
                <p className="text-primary">6-20 agents</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$599/month</div>
                <div className="text-sm text-primary">+ $5,000 setup</div>
              </div>
            </div>

            <div className="bg-neutral-lighter rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-primary">Enterprise</h3>
                <p className="text-primary">20+ agents, multiple locations</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$999.99/month</div>
                <div className="text-sm text-primary">+ $10,000 setup</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-primary mb-6">
              <strong>Setup fees fund integration development:</strong> Legacy AMS integrations ($5,000), QuickBooks ($3,000), custom integrations quoted based on complexity
            </p>
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
