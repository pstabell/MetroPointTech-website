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

      {/* Why AAMS — Competitive Advantage */}
      <section className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Why Agencies Switch to AAMS
          </h2>
          <p className="text-lg text-neutral-dark text-center max-w-3xl mx-auto mb-12">
            IVANS handles 60-80% of your commission downloads, but the remaining 20-40% — MGAs, wholesale brokers, regional carriers, complex commercial lines — lands on your desk as PDFs and spreadsheets with zero automation. AAMS handles every carrier, every line, every format.
          </p>

          {/* Competitive Pricing Table */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">See How We Compare</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left p-4 rounded-tl-lg">Platform</th>
                    <th className="text-center p-4">Monthly Cost</th>
                    <th className="text-center p-4">AI Included</th>
                    <th className="text-center p-4">Setup Fees</th>
                    <th className="text-center p-4 rounded-tr-lg">Contract</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-accent/10 border-2 border-accent font-semibold">
                    <td className="p-4">AAMS</td>
                    <td className="text-center p-4">$99 - $199/mo</td>
                    <td className="text-center p-4 text-green-600">Yes</td>
                    <td className="text-center p-4 text-green-600">$0</td>
                    <td className="text-center p-4 text-green-600">None</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-4 text-neutral-dark">Applied Epic</td>
                    <td className="text-center p-4 text-neutral-dark">$200 - $500/user</td>
                    <td className="text-center p-4 text-red-500">No</td>
                    <td className="text-center p-4 text-red-500">$5,000+</td>
                    <td className="text-center p-4 text-red-500">Multi-year</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-4 text-neutral-dark">Vertafore AMS360</td>
                    <td className="text-center p-4 text-neutral-dark">$150 - $400/user</td>
                    <td className="text-center p-4 text-red-500">No</td>
                    <td className="text-center p-4 text-red-500">$3,000+</td>
                    <td className="text-center p-4 text-red-500">Multi-year</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-4 text-neutral-dark">EZLynx</td>
                    <td className="text-center p-4 text-neutral-dark">$100 - $300/user</td>
                    <td className="text-center p-4 text-red-500">No</td>
                    <td className="text-center p-4 text-red-500">$1,500+</td>
                    <td className="text-center p-4 text-red-500">Annual</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-4 text-neutral-dark">HawkSoft</td>
                    <td className="text-center p-4 text-neutral-dark">$200 - $300 flat</td>
                    <td className="text-center p-4 text-red-500">No</td>
                    <td className="text-center p-4 text-red-500">$2,000+</td>
                    <td className="text-center p-4 text-red-500">Annual</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 text-neutral-dark">Manual (Admin Employee)</td>
                    <td className="text-center p-4 text-neutral-dark">$3,000 - $5,000</td>
                    <td className="text-center p-4 text-red-500">No</td>
                    <td className="text-center p-4 text-neutral-dark">Training</td>
                    <td className="text-center p-4 text-neutral-dark">Ongoing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-neutral-dark text-center mt-4">
              A 10-user agency with AAMS AI pays $1,099/month. The same agency on Applied Epic pays $2,000 - $5,000/month with no AI.
            </p>
          </div>

          {/* Industry Data */}
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">The Industry Is Moving to Autonomous</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-4xl font-bold text-primary mb-2">72%</div>
                <p className="text-sm text-neutral-dark">of agencies say commercial submissions need greater automation</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-4xl font-bold text-primary mb-2">51%</div>
                <p className="text-sm text-neutral-dark">want data uploads from management systems fully automated</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-4xl font-bold text-accent mb-2">29%</div>
                <p className="text-sm text-neutral-dark">now prioritize real-time data over traditional policy downloads (up from 12% in 2024)</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-4xl font-bold text-primary mb-2">700+</div>
                <p className="text-sm text-neutral-dark">industry professionals surveyed</p>
              </div>
            </div>
            <p className="text-xs text-neutral-dark text-center mt-4">
              Source: 2025 Insurance Agency-Carrier Connectivity Trends Survey Report, Ivans
            </p>
          </div>

          {/* Three Advantage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-4xl mb-4">&#128176;</div>
              <h3 className="text-xl font-bold mb-3">Commission Leakage</h3>
              <p className="text-neutral-dark">
                Most agencies lose 1-5% of commission revenue to undetected errors. AAMS catches every discrepancy autonomously. One recovered payment pays for the entire year.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-4xl mb-4">&#9889;</div>
              <h3 className="text-xl font-bold mb-3">Every Carrier, Every Line</h3>
              <p className="text-neutral-dark">
                IVANS gets you 60-80% of the way. The remaining 20-40% — MGAs, wholesale brokers, non-standard carriers, stripped transactions — lands on your desk. AAMS processes every statement in any format. PDF, Excel, CSV. No limitations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-4xl mb-4">&#128274;</div>
              <h3 className="text-xl font-bold mb-3">No Lock-In, No Exit Fees</h3>
              <p className="text-neutral-dark">
                14-day free trial. No credit card required. No setup fees. No multi-year contracts. No exit fees. Export all your data in minutes and take it with you. We earn your business every month.
              </p>
            </div>
          </div>
        </div>
      </section>

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
