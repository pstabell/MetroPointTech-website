import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WRAP Proposal Generator',
  description: 'Create professional WRAP (Wealth Risk Analysis & Protection) proposals in minutes. Beautiful Word documents with your agency branding.',
  alternates: { canonical: '/products/wrap-proposal-generator' },
}

export default function WRAPProposalGeneratorProduct() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-accent font-semibold mb-4">FOR HIGH-NET-WORTH AGENTS</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              WRAP Proposal Generator
            </h1>
            <p className="text-xl mb-8 text-violet-100">
              Create professional Wealth Risk Analysis & Protection proposals in minutes.
              Impress high-net-worth clients with beautiful, branded Word documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wrap.metropointtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Try It Free
              </a>
              <Link
                href="#features"
                className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                See Features
              </Link>
            </div>
            <p className="mt-4 text-sm">
              Free to use • No sign-up required • Export to Word instantly
            </p>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                The Problem
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-primary">WRAP proposals take hours to create manually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-primary">Word templates are clunky and error-prone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-primary">Hard to maintain consistent branding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">✗</span>
                  <span className="text-primary">Comparing multiple carriers is tedious</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                The Solution
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-primary">Build proposals in 10 minutes instead of 2 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-primary">Clean web interface, professional output</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-primary">Add your agency logo and team photos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 text-xl flex-shrink-0">✓</span>
                  <span className="text-primary">Compare up to 10 coverage types side-by-side</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Everything You Need for High-Net-Worth Proposals
            </h2>
            <p className="text-xl text-primary">
              Professional features for presenting complex insurance portfolios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-primary">10 Coverage Types</h3>
              <p className="text-primary">
                Homeowners, Auto, Umbrella, Watercraft, Jewelry, Fine Art, Cyber, Condo, Wind/Hurricane, and Custom coverage types. Everything your HNW clients need.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Your Team Showcase</h3>
              <p className="text-primary">
                Add up to 4 agents with photos, titles, and contact info. 2x2 grid layout keeps everyone on one page. Perfect for team presentations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Agency Branding</h3>
              <p className="text-primary">
                Upload your agency logo. Consistent navy and gold color scheme throughout. Professional appearance that builds trust.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Savings Calculator</h3>
              <p className="text-primary">
                Automatic calculation of total savings. Shows current vs. proposed premiums with percentage reduction. Let the numbers sell themselves.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Clean Word Output</h3>
              <p className="text-primary">
                Export to fully-editable Word documents. Professional formatting with tables, headers, and page numbers. Ready to email or print.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Load Sample Data</h3>
              <p className="text-primary">
                One-click sample data to see the full proposal. Perfect for testing or showing your team how it works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Supported Coverage Types
            </h2>
            <p className="text-xl text-primary">
              Everything your high-net-worth clients need in one proposal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: '🏠', name: 'Homeowners' },
              { icon: '🏢', name: 'Condo' },
              { icon: '🌪️', name: 'Wind/Hurricane' },
              { icon: '🚗', name: 'Auto' },
              { icon: '☂️', name: 'Umbrella/Excess' },
              { icon: '⛵', name: 'Watercraft' },
              { icon: '💎', name: 'Jewelry & Valuables' },
              { icon: '🔒', name: 'Cyber Insurance' },
              { icon: '🖼️', name: 'Fine Arts' },
              { icon: '📦', name: 'Other Coverage' },
            ].map((coverage) => (
              <div key={coverage.name} className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">{coverage.icon}</div>
                <div className="font-semibold text-primary">{coverage.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Start Creating Professional WRAP Proposals
          </h2>
          <p className="text-xl mb-8 text-primary">
            Free to use. No sign-up required. Export to Word instantly.
          </p>
          <a
            href="https://wrap.metropointtech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Try It Now
          </a>
          <p className="mt-6 text-sm text-primary">
            Built by an insurance agent, for insurance agents
          </p>
        </div>
      </section>
    </div>
  )
}
