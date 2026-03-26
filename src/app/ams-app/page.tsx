import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Commission Tracker | Metro Point Technology',
  description: 'Track commissions, catch discrepancies, and ensure you get paid every dollar you earned. Built for insurance agents. 14-day free trial, $19.99/month.',
}

export default function AmsAppPage() {
  const trialUrl = 'https://ams.metropointtech.com/login'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent font-semibold mb-4">BUILT FOR INSURANCE AGENTS</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Track Commissions. Catch Every Dollar.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Insurance agents lose thousands every year to commission errors and missed payments.
                Agent Commission Tracker automatically reconciles your carrier statements, catches discrepancies,
                and ensures you get paid what you earned.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={trialUrl}
                  className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
                >
                  Start Free 14-Day Trial
                </a>
                <a
                  href="#how-it-works"
                  className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
                >
                  See How It Works
                </a>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                No credit card required. Cancel anytime. $19.99/month after trial.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30">
              <Image
                src="/images/ams-app/dashboard.png"
                alt="Agent Commission Tracker Dashboard"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-neutral-dark mt-1">Hours Saved Monthly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-neutral-dark mt-1">Commission Visibility</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">P&amp;C</div>
              <div className="text-sm text-neutral-dark mt-1">Progressive, Travelers, Safeco &amp; More</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">$19.99</div>
              <div className="text-sm text-neutral-dark mt-1">Per Month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Screenshots */}
      <section className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Stop Losing Money to Commission Errors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/reconciliation.png" alt="Commission reconciliation" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Automated Reconciliation</h3>
                <p className="text-neutral-dark">Import carrier statements and match payments to policies automatically. Discrepancies are highlighted instantly.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/carriers.png" alt="Carrier management" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Carrier Management</h3>
                <p className="text-neutral-dark">All your carriers in one place. Progressive, Travelers, Safeco, and many more P&amp;C carriers supported.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/ledger.png" alt="Policy revenue ledger" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Policy Revenue Ledger</h3>
                <p className="text-neutral-dark">Track every commission dollar across all your policies in one clear ledger. Know exactly what you are owed.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/renewals.png" alt="Pending policy renewals" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Pending Renewals</h3>
                <p className="text-neutral-dark">Never miss a renewal. Track upcoming policy renewals and their commission status at a glance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
                <h3 className="text-2xl font-bold mb-4">Upload Your Statements</h3>
                <p className="text-lg text-neutral-dark">
                  Import your carrier commission statements via CSV, Excel, or manual entry. We support Progressive, Travelers, Safeco, and many other P&amp;C carriers.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/reconciliation.png" alt="Upload and import commission statements" width={1344} height={980} className="w-full h-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                <h3 className="text-2xl font-bold mb-4">Auto-Reconcile</h3>
                <p className="text-lg text-neutral-dark">
                  Our system matches every payment against your policies and highlights any discrepancies instantly. No more hours of manual cross-referencing.
                </p>
              </div>
              <div className="md:order-1 rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/ledger.png" alt="Automatic policy revenue reconciliation" width={1344} height={980} className="w-full h-auto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                <h3 className="text-2xl font-bold mb-4">Get Paid Right</h3>
                <p className="text-lg text-neutral-dark">
                  Use our reports to dispute underpayments with an agency or carriers. Know exactly what you earned and what you are owed.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/reports.png" alt="Commission reports for disputing underpayments" width={1344} height={980} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Screenshots */}
      <section className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">See It In Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/customers.png" alt="Customer management" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Customer Management</h3>
                <p className="text-neutral-dark">See every customer, their policies, carriers, and commission activity at a glance.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image src="/images/ams-app/ledger-reports.png" alt="Detailed ledger reports" width={1344} height={980} className="w-full h-auto" />
              <div className="p-5 bg-white">
                <h3 className="font-bold text-xl mb-2">Detailed Reports</h3>
                <p className="text-neutral-dark">Comprehensive revenue analytics with transaction details, policy summaries, and export to CSV.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Pricing</h2>
          <p className="text-lg text-neutral-dark max-w-2xl mx-auto mb-12">
            One plan. Everything included. No setup fees. Cancel anytime.
          </p>
          <div className="max-w-md mx-auto bg-white border-2 border-primary rounded-2xl p-8 shadow-xl">
            <div className="text-sm font-semibold text-primary mb-2">SOLO AGENT</div>
            <div className="text-5xl font-bold mb-2">$19.99</div>
            <div className="text-neutral-dark mb-8">per month</div>
            <ul className="text-left space-y-3 mb-8">
              {['Unlimited Policy Tracking', 'Advanced Reporting & Analytics', 'Automated Reconciliation', 'Excel Import/Export', 'All Major P&C Carriers', 'Priority Support'].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={trialUrl}
              className="block w-full py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg text-lg transition text-center"
            >
              Start Free 14-Day Trial
            </a>
            <p className="text-sm text-neutral-dark mt-4">No credit card required. Secure payment via Stripe.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Leaving Money on the Table
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            If Agent Commission Tracker helps you recover even one missed payment, the trial has already proven its value.
          </p>
          <a
            href={trialUrl}
            className="inline-block bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-lg text-xl font-semibold transition shadow-lg"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>
    </div>
  )
}
