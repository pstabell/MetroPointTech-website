import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32" style={{ background: 'linear-gradient(180deg, #001F33 0%, #003B5C 55%, #001F33 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ivory">
            {/* Gold phrase always starts its own line; two clean lines on desktop (Patrick 2026-10-01: it looked choppy) */}
            <span className="block">Autonomous Insurance Software</span>{' '}
            <span className="block text-[#D4AF37]">That Works<br className="sm:hidden" /> for You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#A9BFCF] max-w-4xl mx-auto">
            30 years of agency experience. Zero-touch operations. Agentic AI that runs your back office
            while you focus on selling. This is not another filing cabinet — this is a digital employee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact"
              className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#001F33] px-8 py-4 rounded-lg text-lg font-bold transition shadow-lg shadow-[#D4AF37]/20 hover:shadow-xl"
            >
              Request a Demo
            </Link>
            <Link
              href="/products/commission-tracker"
              className="border-2 border-[#2a4a62] bg-[#0d2137]/60 hover:border-[#D4AF37] text-ivory hover:text-[#E5C158] px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#0d2137] rounded-xl p-6 shadow-2xl shadow-black/30 border border-[#1a3a52] border-t-2 border-t-[#D4AF37]">
              <div className="text-3xl mb-2">🏢</div>
              <div className="text-lg font-semibold mb-1 text-ivory">Built by Agents</div>
              <div className="text-sm text-[#8BA5B8]">30 years of agency experience</div>
            </div>
            <div className="bg-[#0d2137] rounded-xl p-6 shadow-2xl shadow-black/30 border border-[#1a3a52] border-t-2 border-t-[#D4AF37]">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-lg font-semibold mb-1 text-ivory">Agentic AI</div>
              <div className="text-sm text-[#8BA5B8]">Autonomous workflows, not chatbots</div>
            </div>
            <div className="bg-[#0d2137] rounded-xl p-6 shadow-2xl shadow-black/30 border border-[#1a3a52] border-t-2 border-t-[#D4AF37]">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-lg font-semibold mb-1 text-ivory">Zero-Touch Operations</div>
              <div className="text-sm text-[#8BA5B8]">Your back office runs itself</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
