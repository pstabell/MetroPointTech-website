import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout Cancelled',
}

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-neutral-lighter flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="text-6xl mb-6">🔙</div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          No worries!
        </h1>
        <p className="text-lg text-neutral-light mb-8">
          Your checkout was cancelled. No charges were made.
          If you have questions about our plans, we're happy to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ai-agent-teams"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Back to Plans
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </div>
  )
}
