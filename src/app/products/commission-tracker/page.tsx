import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insurance Commission Tracking Software',
  description: 'Insurance commission tracking software for agencies and independent agents. Track policies, reconcile carrier statements, and catch every dollar of commission. Start with a free trial.',
  keywords: 'insurance commission tracking software, insurance commission tracker, insurance commission software, commission reconciliation software',
  alternates: { canonical: '/products/commission-tracker' },
}

export default function CommissionTrackerProduct() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-accent font-semibold mb-4">FOR INDEPENDENT AGENTS</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Commission Tracker
            </h1>
            <p className="text-xl mb-8">
              Insurance agents lose thousands of dollars every year to commission errors.
              Stop leaving money on the table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.aamshub.com/ams-app"
                className="bg-accent text-white hover:bg-accent-dark px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Start Free 14-Day Trial
              </a>
              <Link
                href="#features"
                className="bg-white text-slate-800 hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                See Features
              </Link>
            </div>
            <p className="mt-4 text-sm">
              No credit card required • Start with a free trial
            </p>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                The Problem
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-slate-800">Carriers make mistakes on commission statements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-slate-800">Spreadsheets are error-prone and time-consuming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-slate-800">Manual reconciliation takes 10+ hours per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-slate-800">Lost commissions add up to thousands per year</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                The Solution
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-slate-800">Automated carrier statement import</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-slate-800">Smart policy-to-payment matching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-slate-800">Catch discrepancies automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-slate-800">Reconcile in 30 minutes instead of 8 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-neutral-lighter" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Features Built by an Agent, for Agents
            </h2>
            <p className="text-xl text-slate-800">
              Every feature solves a real problem we've encountered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Policy Management</h3>
              <p className="text-slate-800">
                Track all your policies in one place. NEW, RWL, END, CAN - all transaction types supported with automated calculations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Automated Reconciliation</h3>
              <p className="text-slate-800">
                Import carrier statements, auto-match to policies, identify discrepancies. No more manual spreadsheet nightmares.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Revenue Reports</h3>
              <p className="text-slate-800">
                Policy Revenue Ledger with custom column selection. Export to CSV and Excel with subtotals. Professional reports in seconds.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Search & Filter</h3>
              <p className="text-slate-800">
                Find any policy instantly. Filter by customer, carrier, MGA, policy type, date range. Advanced search that actually works.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Commission Rules</h3>
              <p className="text-slate-800">
                Policy type-specific commission rates. Multi-level rule matching. Automatic rate selection. Real-time commission calculation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Bank-Level Security</h3>
              <p className="text-slate-800">
                Secure cloud database (Supabase). Automatic backups. SOC 2 compliant infrastructure. Your data is safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Path */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Grows With Your Business
          </h2>
          <p className="text-xl text-slate-800 mb-12">
            Start as a solo agent. Upgrade to Agency Mode when you hire your first agent.
          </p>

          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Solo Agent</h3>
                <p className="text-slate-800 mb-4">Track your own commissions</p>
                <ul className="text-left space-y-2 text-slate-800">
                  <li>✓ Full reconciliation capabilities</li>
                  <li>✓ Policy & commission tracking</li>
                  <li>✓ Reports & exports</li>
                </ul>
              </div>

              <div className="border-l-2 border-accent/20 pl-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">→ Agency Mode</h3>
                <p className="text-slate-800 mb-4">When you hire your first agent</p>
                <ul className="text-left space-y-2 text-slate-800">
                  <li>✓ Multi-agent tracking</li>
                  <li>✓ Mirror Architecture</li>
                  <li>✓ Real-time agent visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Trusted by Independent Agents
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8">
              <p className="text-slate-800 mb-4 italic">
                "I recovered $3,200 in missing commissions in my first month. The auto-matching feature is incredible."
              </p>
              <div className="font-semibold text-slate-800">Sarah M.</div>
              <div className="text-sm text-slate-800">Independent Agent, FL</div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <p className="text-slate-800 mb-4 italic">
                "Reconciliation used to take me 8 hours. Now it takes 30 minutes. This tool paid for itself immediately."
              </p>
              <div className="font-semibold text-slate-800">Mike T.</div>
              <div className="text-sm text-slate-800">Agency Owner, TX</div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <p className="text-slate-800 mb-4 italic">
                "Finally, a tool built by someone who actually understands the insurance business. Game changer."
              </p>
              <div className="font-semibold text-slate-800">Jennifer L.</div>
              <div className="text-sm text-slate-800">Independent Agent, CA</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Free 14-Day Trial
          </h2>
          <p className="text-xl mb-8">
            No credit card required. See how much you've been leaving on the table.
          </p>
          <a
            href="https://www.aamshub.com/ams-app"
            className="inline-block bg-accent text-white hover:bg-accent-dark px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Get Started Free
          </a>
          <p className="mt-6 text-sm">
            Join hundreds of agents who have recovered thousands in missing commissions
          </p>
        </div>
      </section>
    </div>
  )
}
