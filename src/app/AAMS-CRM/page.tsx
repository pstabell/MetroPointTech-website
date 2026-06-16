import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AAMS CRM | AI AMS CRM for Insurance Agencies',
  description: 'AAMS CRM is the AI insurance agency CRM built into your AMS. AI agents Closer and Pulse handle quoting, renewals, and follow-ups. 18 ACORD form generators. 7-stage pipeline. $99.99/user/mo add-on to AAMS Platform.',
  alternates: { canonical: '/AAMS-CRM' },
  keywords: 'ams crm, insurance CRM, insurance agency CRM, AI sales, ACORD forms, insurance quoting, renewal management, agency CRM, insurance pipeline',
}

const screenshots = [
  { src: '/images/crm/02-dashboard.png', title: 'Agency Dashboard', description: 'Real-time overview of your pipeline, tasks, renewals, and agent activity — all in one place.' },
  { src: '/images/crm/04-pipeline.png', title: 'Sales Pipeline', description: '7-stage pipeline with hard-gate compliance enforcement. Every deal moves through a defined process.' },
  { src: '/images/crm/03-contacts.png', title: 'Contact Management', description: 'Full contact database with tags, status tracking, and instant search across your entire book.' },
  { src: '/images/crm/05-tasks.png', title: 'Task Management', description: 'Prioritized task lists with due dates, assignees, and status tracking. Nothing falls through the cracks.' },
  { src: '/images/crm/06-quote-generator.png', title: 'Quote Generator', description: 'AI-powered quoting with carrier comparison. Closer shops policies and flags coverage gaps automatically.' },
  { src: '/images/crm/08-renewals.png', title: 'Renewal Tracking', description: 'Pulse monitors every renewal across all carriers. Automated reminders before policies lapse.' },
  { src: '/images/crm/07-marketing.png', title: 'Marketing Hub', description: 'Built-in campaign tools for client communications, drip sequences, and engagement tracking.' },
  { src: '/images/crm/10-agents.png', title: 'Agent Management', description: 'Manage your team with role-based access, production tracking, and commission visibility.' },
]

const features = [
  {
    icon: '🤖',
    title: 'AI Agent Closer',
    description: 'Shops policies across carriers, compares quotes side by side, flags coverage gaps and red flags. Your AI quoting assistant that never misses a detail.',
  },
  {
    icon: '🔔',
    title: 'AI Agent Pulse',
    description: 'Monitors renewals, tracks client health, and triggers follow-ups automatically. No more missed renewals or forgotten callbacks.',
  },
  {
    icon: '📋',
    title: '18 ACORD Form Generators',
    description: 'Personal and commercial lines. Generate pre-filled ACORD forms from your contact data in seconds, not hours.',
  },
  {
    icon: '🔒',
    title: '7-Stage Pipeline with Hard Gates',
    description: 'Every deal follows a defined process. Compliance gates prevent skipping steps. No shortcuts, no missed requirements.',
  },
  {
    icon: '📊',
    title: 'MGA Submission Tracking',
    description: 'Track submissions to MGAs and wholesalers with status updates, quote comparisons, and bind-ready workflows.',
  },
  {
    icon: '👥',
    title: 'Role-Based Access',
    description: 'Admin, Manager, Agent, and Owner roles. Each team member sees exactly what they need — nothing more, nothing less.',
  },
]

export default function AAMSCRMPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent-light rounded-full text-sm font-medium mb-6">
                AAMS Platform Add-On
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                AI-Powered CRM
                <br />
                <span className="text-accent">Built for Insurance.</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Two AI agents manage your sales pipeline and renewals while you focus on relationships.
                Closer shops policies and compares quotes. Pulse tracks renewals and triggers follow-ups.
                18 ACORD form generators. Hard-gate compliance enforcement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://ams.metropointtech.com/login"
                  className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-center"
                >
                  Add CRM to Your AAMS
                </Link>
                <a
                  href="#screenshots"
                  className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm text-center"
                >
                  See Screenshots
                </a>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                Requires AAMS Platform subscription (Agency tier)
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30">
              <Image
                src="/images/crm/02-dashboard.png"
                alt="AAMS CRM Dashboard"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* spacer — gold strip removed */}

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What AAMS CRM Does For Your Agency
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              Two AI agents, 18 form generators, and a pipeline that enforces compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-neutral-lighter rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-neutral-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="py-20 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              Every screen built for insurance workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {screenshots.map((shot, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative overflow-hidden" style={{ maxHeight: '400px' }}>
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">{shot.title}</h3>
                  <p className="text-neutral-light text-sm">{shot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-neutral-light max-w-2xl mx-auto">
              AAMS CRM is an add-on to the AAMS Platform. You must have an active AAMS Agency subscription to add CRM.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl ring-2 ring-primary overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="text-5xl mb-4">📇</div>
                <h3 className="text-2xl font-bold text-primary mb-2">AAMS CRM</h3>
                <p className="text-accent font-semibold mb-6">AI-Powered Sales & Quoting</p>

                <div className="border-t border-neutral-lighter pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-primary">$99.99</span>
                    <span className="text-neutral-light">/user/month</span>
                  </div>
                  <p className="text-sm text-neutral-light">Add-on to AAMS Agency ($199.99/mo)</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'AI agent Closer — shops policies, compares quotes, flags red flags',
                    'AI agent Pulse — renewal reminders, client health, follow-ups',
                    '18 ACORD form generators (personal + commercial)',
                    '7-stage sales pipeline with hard-gate enforcement',
                    'MGA submission tracking & quote comparison',
                    'Full contact management with tags and search',
                    'Task management with priorities and due dates',
                    'Role-based access (Admin, Manager, Agent, Owner)',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent mr-2 flex-shrink-0">✓</span>
                      <span className="text-sm text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://ams.metropointtech.com/login"
                  className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
                >
                  Add CRM to My AAMS
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-neutral-light">
                Don't have AAMS yet? <Link href="/AAMS/agencies" className="text-accent font-semibold hover:underline">Sign up for AAMS Agency first</Link>
              </p>
              <p className="text-sm text-neutral-light">
                Solo agents: upgrade to the Agency tier ($199.99/mo), then add CRM for $99.99/user/mo.
              </p>
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
            Stop Chasing Renewals.
            <br />
            <span className="text-accent">Let AI Do It.</span>
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Your team should be closing new business, not buried in follow-ups and paperwork.
            Add AAMS CRM and let Closer and Pulse handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://ams.metropointtech.com/login"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Add CRM to Your AAMS
            </Link>
            <Link
              href="/AAMS/agencies"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Get AAMS First
            </Link>
          </div>
          <p className="mt-8 text-sm text-blue-200">
            Questions? Call us at <a href="tel:+12394267058" className="underline hover:text-white">(239) 426-7058</a>
          </p>
        </div>
      </section>
    </div>
  )
}
