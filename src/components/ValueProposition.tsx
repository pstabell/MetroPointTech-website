export default function ValueProposition() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Why Agenient?
          </h2>
          <p className="text-xl text-slate-800 max-w-3xl mx-auto">
            We're not just developers who learned about insurance.
            We're insurance professionals who learned to code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Active Agent Credibility */}
          <div className="bg-neutral-lighter rounded-xl p-8">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Built by an Active Agent</h3>
            <p className="text-slate-800 mb-4">
              Patrick Stabell has 30 years of hands-on agency experience running independent insurance agencies.
              These apps are battle-tested in real agency environments every single day.
            </p>
            <p className="text-slate-800 font-semibold">
              If it works for us, it'll work for you.
            </p>
          </div>

          {/* Battle-Tested Solutions */}
          <div className="bg-neutral-lighter rounded-xl p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Battle-Tested Solutions</h3>
            <p className="text-slate-800 mb-4">
              Every feature solves a real problem we've encountered. No theoretical features,
              no bloat, just practical tools that save time and catch errors.
            </p>
            <p className="text-slate-800 font-semibold">
              Real agency problems. Real solutions.
            </p>
          </div>

          {/* Community-Driven Roadmap */}
          <div className="bg-neutral-lighter rounded-xl p-8">
            <div className="text-4xl mb-4">🗣️</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Community-Driven Roadmap</h3>
            <p className="text-slate-800 mb-4">
              We listen to agent needs on social media and build features everyone can use.
              No custom development services - we stay focused on building great products.
            </p>
            <p className="text-slate-800 font-semibold">
              Your feedback shapes our products.
            </p>
          </div>

          {/* Bootstrap Model */}
          <div className="bg-neutral-lighter rounded-xl p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Customer-Funded Development</h3>
            <p className="text-slate-800 mb-4">
              Setup fees fund integration development. We build what you actually need,
              when you need it - no speculative features that never get used.
            </p>
            <p className="text-slate-800 font-semibold">
              You pay for what you use. Nothing more.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
