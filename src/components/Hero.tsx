import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #F5F3FF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
            Autonomous Insurance Software <span className="text-accent">That Works for You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-600">
            30 years of agency experience. Zero-touch operations. Agentic AI that runs your back office
            while you focus on selling. This is not another filing cabinet — this is a digital employee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              Request a Demo
            </Link>
            <Link
              href="/products/commission-tracker"
              className="bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-lg text-lg font-semibold transition shadow-sm"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
              <div className="text-3xl mb-2">🏢</div>
              <div className="text-lg font-semibold mb-1 text-slate-900">Built by Agents</div>
              <div className="text-sm text-slate-500">30 years of agency experience</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-lg font-semibold mb-1 text-slate-900">Agentic AI</div>
              <div className="text-sm text-slate-500">Autonomous workflows, not chatbots</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-lg font-semibold mb-1 text-slate-900">Zero-Touch Operations</div>
              <div className="text-sm text-slate-500">Your back office runs itself</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
