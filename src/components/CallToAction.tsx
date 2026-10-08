import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 text-ivory border-t border-[#1a3a52]" style={{ background: 'linear-gradient(135deg, #003B5C 0%, #0d2137 50%, #001F33 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for Autonomous Operations?
        </h2>
        <p className="text-xl mb-8 text-[#A9BFCF]">
          Legacy AMS platforms make you do the work. Agenient does the work for you. Built by an active agent with 30 years of experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#001F33] font-bold shadow-lg shadow-[#D4AF37]/20 px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
          >
            Schedule a Demo
          </Link>
          <Link
            href="/products/commission-tracker"
            className="border-2 border-[#8BA5B8]/50 text-ivory hover:border-[#D4AF37] hover:text-[#E5C158] px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
          >
            Start Free Trial
          </Link>
        </div>
        <p className="mt-6 text-sm text-[#8BA5B8]">
          No card needed on Producer, Starter and Agency Self-Service • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
