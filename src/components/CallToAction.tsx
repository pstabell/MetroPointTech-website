import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for Autonomous Operations?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Legacy AMS platforms make you do the work. Agenient does the work for you. Built by an active agent with 30 years of experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
          >
            Schedule a Demo
          </Link>
          <Link
            href="/products/commission-tracker"
            className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
          >
            Start Free Trial
          </Link>
        </div>
        <p className="mt-6 text-sm text-blue-100">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
