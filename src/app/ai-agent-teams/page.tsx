import Link from 'next/link'
import { Metadata } from 'next'
import AIAgentCheckout from '@/components/AIAgentCheckout'

export const metadata: Metadata = {
  title: 'AI Agent Teams | Metro Point Technology',
  description: 'Your own dedicated AI employee, connected to your agency systems. 24/7 back-office automation for insurance agencies. Two plans: Basic ($499.99/mo) and Premium ($999.99/mo).',
  keywords: 'AI agent, insurance automation, back office automation, commission reconciliation, agency management, AI employee, insurance technology',
}

const plans = [
  {
    name: 'AI Agent Basic',
    tagline: 'Your own AI employee, connected to your systems',
    setupPrice: '$999.99',
    monthlyPrice: '$499.99',
    setupHours: '4 hours',
    monthlyHours: '1 hour',
    platforms: 2,
    badge: null,
    accent: false,
    planKey: 'basic' as const,
    features: [
      'Dedicated cloud-based AI agent on our secure infrastructure',
      'Connects to up to 2 of your existing platforms',
      'One designated employee manages the agent via Discord',
      'Commission reconciliation and data entry',
      'Renewal tracking and carrier statement processing',
      'System-to-system data sync',
      'Agent available 24/7 — no sick days, no turnover',
      'Monthly training and fine-tuning to your workflow',
    ],
    idealFor: 'Agencies that need two systems connected and want to offload repetitive back-office work to an AI that never sleeps.',
    platformExamples: 'e.g. HawkSoft + accounting software, or EZLynx + AgencyZoom',
  },
  {
    name: 'AI Agent Premium',
    tagline: 'Full-service AI operations for your entire agency',
    setupPrice: '$1,999.99',
    monthlyPrice: '$999.99',
    setupHours: '8 hours',
    monthlyHours: '2 hours',
    platforms: 5,
    badge: 'Most Popular',
    accent: true,
    planKey: 'premium' as const,
    features: [
      'Everything in Basic, plus:',
      'Connects to up to 5 of your existing platforms',
      'Active performance monitoring and optimization',
      'We verify the agent is working at maximum efficiency',
      'Priority support — your issues go to the front of the line',
      'Complex multi-system workflows and data orchestration',
      'Advanced carrier portal and CRM integrations',
      'Twice the monthly training and optimization time',
    ],
    idealFor: 'Agencies running HawkSoft + AgencyZoom + accounting software + carrier portals + CRM that need everything tied together seamlessly.',
    platformExamples: 'e.g. Applied Epic + AgencyZoom + QuickBooks + carrier portals + CRM',
  },
]

const compatiblePlatforms = [
  'Vertafore AMS360',
  'HawkSoft',
  'Applied Epic',
  'EZLynx',
  'AgencyZoom',
  'QuickBooks',
  'Xero',
  'Salesforce',
  'HubSpot',
  'Carrier Portals',
]

export default function AIAgentTeamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent-light rounded-full text-sm font-medium mb-6">
            AI-Powered Back-Office Automation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Own AI Employee.
            <br />
            <span className="text-accent">Works 24/7. Never Quits.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A dedicated AI agent hosted on our infrastructure, connected to your agency platforms,
            handling the back-office work that drains your team's time. Commission reconciliation,
            data entry, renewal tracking — done automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#plans"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See Plans & Pricing
            </a>
            <Link
              href="/contact"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* What Your Agent Does */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Your AI Agent Handles
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              The repetitive, time-consuming work that keeps your team from selling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'Commission Reconciliation',
                description: 'Automatically matches carrier statements against your book of business. Catches discrepancies that cost agencies 1-5% in lost revenue every year.',
              },
              {
                icon: '📋',
                title: 'Data Entry & Sync',
                description: 'Moves data between your systems so your team never has to copy-paste between platforms again. Real-time sync, zero manual effort.',
              },
              {
                icon: '🔄',
                title: 'Renewal Tracking',
                description: 'Monitors upcoming renewals across all carriers and platforms. Flags policies that need attention before they lapse.',
              },
              {
                icon: '📄',
                title: 'Statement Processing',
                description: 'Ingests carrier statements in any format, extracts the data, and reconciles against your records automatically.',
              },
              {
                icon: '🔗',
                title: 'Platform Integration',
                description: 'Bridges the gap between systems that were never designed to talk to each other. Your AMS, CRM, accounting, and carrier portals — connected.',
              },
              {
                icon: '📊',
                title: 'Reporting & Alerts',
                description: 'Surfaces issues proactively instead of waiting for someone to notice. Missing commissions, data mismatches, renewal deadlines — all flagged automatically.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-neutral-lighter rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-neutral-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-20 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              Two straightforward plans. No hidden fees. No long-term contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 md:p-10 transition-all hover:shadow-2xl ${
                  plan.accent
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white ring-4 ring-accent shadow-xl'
                    : 'bg-white shadow-lg'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-sm font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${plan.accent ? 'text-white' : 'text-primary'}`}>
                  {plan.name}
                </h3>
                <p className={`text-lg mb-6 ${plan.accent ? 'text-blue-200' : 'text-neutral-light'}`}>
                  {plan.tagline}
                </p>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl font-bold ${plan.accent ? 'text-accent-light' : 'text-accent'}`}>
                      {plan.monthlyPrice}
                    </span>
                    <span className={plan.accent ? 'text-blue-200' : 'text-neutral-light'}>/month</span>
                  </div>
                  <p className={`text-sm ${plan.accent ? 'text-blue-200' : 'text-neutral-light'}`}>
                    {plan.setupPrice} one-time setup ({plan.setupHours} of configuration)
                  </p>
                  <p className={`text-sm ${plan.accent ? 'text-blue-200' : 'text-neutral-light'}`}>
                    Includes {plan.monthlyHours}/month of agent training & optimization
                  </p>
                  <p className={`text-sm font-medium mt-1 ${plan.accent ? 'text-blue-100' : 'text-primary'}`}>
                    Up to {plan.platforms} platform connections
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`mt-0.5 flex-shrink-0 ${plan.accent ? 'text-accent-light' : 'text-accent'}`}>
                        {feature.startsWith('Everything') ? '★' : '✓'}
                      </span>
                      <span className={plan.accent ? 'text-blue-100' : 'text-neutral-light'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Ideal For */}
                <div className={`rounded-xl p-4 mb-8 ${plan.accent ? 'bg-white/10' : 'bg-neutral-lighter'}`}>
                  <p className={`text-sm font-medium mb-1 ${plan.accent ? 'text-blue-100' : 'text-primary'}`}>
                    Ideal for:
                  </p>
                  <p className={`text-sm ${plan.accent ? 'text-blue-200' : 'text-neutral-light'}`}>
                    {plan.idealFor}
                  </p>
                  <p className={`text-xs mt-2 italic ${plan.accent ? 'text-blue-300' : 'text-neutral-light'}`}>
                    {plan.platformExamples}
                  </p>
                </div>

                <AIAgentCheckout plan={plan.planKey} accent={plan.accent} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Platforms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Connects to the Platforms You Already Use
          </h2>
          <p className="text-lg text-neutral-light mb-10 max-w-2xl mx-auto">
            Secure API integrations with the tools your agency depends on
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {compatiblePlatforms.map((platform, index) => (
              <span
                key={index}
                className="bg-neutral-lighter text-primary font-medium px-5 py-3 rounded-xl text-sm hover:shadow-md transition-all"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              From signup to a working AI agent in days, not months
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: '💬',
                title: 'Discovery Call',
                description: 'We learn about your agency, your platforms, and the work that eats up your team\'s time. Free, no obligation.',
              },
              {
                step: '02',
                icon: '🔧',
                title: 'Setup & Connect',
                description: 'We configure your dedicated AI agent and connect it to your platforms through secure API integrations.',
              },
              {
                step: '03',
                icon: '🧪',
                title: 'Train & Test',
                description: 'We train the agent on your specific workflows and data. Your team tests it and gives feedback before going live.',
              },
              {
                step: '04',
                icon: '🚀',
                title: 'Go Live',
                description: 'Your agent starts handling real work. We monitor performance and fine-tune monthly to keep it sharp.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-accent font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-neutral-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Enterprise-Grade Security. Personal Service.
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: '🔒',
                    title: 'Secure API Connections Only',
                    description: 'All client data is handled through secure, authorized API connections. No screen scraping, no shortcuts.',
                  },
                  {
                    icon: '🛡️',
                    title: 'PHI & PII Protection',
                    description: 'Private information is respected and protected at all times. Your data stays your data.',
                  },
                  {
                    icon: '☁️',
                    title: 'Fully Managed Infrastructure',
                    description: 'Your agent runs on our secure cloud infrastructure. We handle all the technical maintenance so you don\'t have to.',
                  },
                  {
                    icon: '🎯',
                    title: 'Scoped & Controlled',
                    description: 'Agents operate within defined token usage limits. They handle back-office tasks only — they don\'t write code or modify your systems beyond their authorized scope.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{item.title}</h3>
                      <p className="text-neutral-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-3xl p-8 md:p-12">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🏢</div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Built by Insurance People</h3>
                    <p className="text-neutral-light mb-4">
                      Metro Point Technology is led by Patrick Stabell — an active insurance agent with
                      30 years in the industry. We don't just understand the technology. We understand
                      your business.
                    </p>
                    <p className="text-neutral-light">
                      Every AI agent we deploy is battle-tested on real agency workflows at
                      Metro Point Insurance before it ever reaches a client.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Stop Paying Humans to Do
            <br />
            <span className="text-accent">Robot Work.</span>
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Your team should be selling, servicing, and growing your book.
            Let an AI agent handle the back-office grind. Book a free discovery call —
            no commitment, no hard sell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Book a Discovery Call
            </Link>
            <a
              href="mailto:sales@metropointtech.com"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Email Sales Directly
            </a>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            Or call us at <a href="tel:+12394267058" className="underline hover:text-white">(239) 426-7058</a>
          </p>
        </div>
      </section>
    </div>
  )
}
