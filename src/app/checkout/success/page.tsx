import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome!',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-lighter flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Welcome to Metro Point Technology!
        </h1>
        <p className="text-lg text-neutral-light mb-6">
          Your AI Agent subscription is confirmed. We've sent a confirmation
          email with your next steps to get started.
        </p>
        <div className="bg-neutral-lighter rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-bold text-slate-800 mb-3">What happens next:</h2>
          <ol className="space-y-3 text-neutral-light">
            <li className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span>You'll receive a confirmation email within a few minutes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span>Our team will reach out within 24 hours to schedule your setup session</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span>We'll connect your platforms and configure your dedicated AI agent</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <span>Your agent goes live and starts handling back-office tasks</span>
            </li>
          </ol>
        </div>
        <p className="text-sm text-neutral-light mb-6">
          Questions? Email us at{' '}
          <a href="mailto:support@metropointtech.com" className="text-accent hover:underline">
            support@metropointtech.com
          </a>{' '}
          or call{' '}
          <a href="tel:+12394267058" className="text-accent hover:underline">
            (239) 426-7058
          </a>
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold transition-all"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
