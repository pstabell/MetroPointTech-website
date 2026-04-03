import Image from 'next/image'
import type { Metadata } from 'next'
import AAMSContent from '@/components/AAMSContent'

export const metadata: Metadata = {
  title: 'AAMS — Autonomous Agency Management System | Metro Point Technology',
  description: 'The autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations for insurance agencies. 14-day free trial.',
}

export default function AAMSPage() {
  const trialUrl = 'https://ams.metropointtech.com/login'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent font-semibold mb-4">AUTONOMOUS AGENCY MANAGEMENT SYSTEM</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Agency, on Autopilot. Zero-Touch Operations.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Legacy AMS platforms are just digital filing cabinets. AAMS is a digital employee.
                Autonomous commission reconciliation, agentic workflows, and zero-touch operations
                that run your agency while you focus on selling.
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
                No credit card required. Cancel anytime.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30">
              <Image
                src="/images/ams-app/dashboard.png"
                alt="AAMS Dashboard — Autonomous Commission Reconciliation"
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
              <div className="text-3xl font-bold text-primary">Zero-Touch</div>
              <div className="text-sm text-neutral-dark mt-1">Autonomous Operations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-neutral-dark mt-1">Commission Visibility</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">Agentic</div>
              <div className="text-sm text-neutral-dark mt-1">AI-Powered Workflows</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">2 Floors</div>
              <div className="text-sm text-neutral-dark mt-1">Solo Agent & Agency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content: Toggle, How It Works, See It In Action */}
      <AAMSContent />

      {/* Pricing is inside AAMSContent, responds to toggle */}

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Agency Deserves Autonomy
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Legacy AMS platforms make you do the work. AAMS does the work for you. Autonomous reconciliation, zero-touch operations, and agentic workflows — starting today.
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
