import Link from 'next/link'

export default function ProductShowcase() {
  const products = [
    {
      name: 'Agenient AAMS',
      subtitle: 'Autonomous Agency Management',
      description: 'The autonomous evolution of legacy AMS. Zero-touch commission reconciliation, agentic workflows, and real-time agent visibility — your agency on autopilot.',
      icon: '🏢',
      features: [
        '3-Status Commission Tracking (Due → Reconciled → Paid)',
        'Mirror Architecture - agents see updates in real-time',
        '4-Role Hierarchy (Admin, Manager, Agent, Owner)',
        'Commission splits & chargeback handling',
        'Multi-location support',
      ],
      pricing: '$99.99/user/mo',
      setupFee: '14-day free trial • No credit card required',
      link: '/AAMS?view=agency#features',
      cta: 'See Plans',
      highlight: true,
      borderColor: 'accent',
    },
    {
      name: 'Agenient CRM',
      subtitle: 'AI-Powered Sales & Quoting',
      description: 'Autonomous CRM with AI agents built in. Closer shops policies and compares quotes. Pulse manages renewals and follow-ups. 18 ACORD form generators. Hard-gate compliance enforcement.',
      icon: '📇',
      features: [
        'AI agent Closer — shops policies, compares quotes, flags red flags',
        'AI agent Pulse — renewal reminders, client health, follow-ups',
        '18 ACORD form generators (personal + commercial)',
        '7-stage sales pipeline with hard-gate enforcement',
        'MGA submission tracking & quote comparison',
      ],
      pricing: '$99.99/user/mo add-on',
      setupFee: 'Requires Agenient AAMS subscription',
      link: '/AAMS-CRM',
      cta: 'See Details',
      highlight: false,
      borderColor: 'primary',
    },
    {
      name: 'AI Agents',
      subtitle: 'Your Own AI Employee',
      description: 'A dedicated AI agent hosted on our infrastructure, connected to your agency platforms. Commission reconciliation, data entry, renewal tracking, and system-to-system sync — done automatically, 24/7.',
      icon: '🤖',
      features: [
        'Dedicated cloud-based AI agent on secure infrastructure',
        'Connects to your existing platforms via secure API',
        'Commission reconciliation & carrier statement processing',
        'Renewal tracking & data sync across systems',
        'Monthly training & optimization included',
      ],
      pricing: 'From $499.99/mo',
      setupFee: 'Basic & Premium plans available',
      link: '/ai-agent-teams',
      cta: 'See Plans',
      highlight: false,
      borderColor: 'accent',
    },
    {
      name: 'Agenient Solo',
      subtitle: 'For Independent Agents',
      description: 'Autonomous commission tracking that catches every dollar. Agentic reconciliation runs while you sell. The foundation that grows with you.',
      icon: '💰',
      features: [
        'Policy & commission tracking',
        'Agentic reconciliation',
        'Statement import & matching',
        'Revenue ledger & reports',
        'Upgrade to Agenient AAMS as you grow',
      ],
      pricing: 'Start Free Trial',
      setupFee: 'No credit card required',
      link: '/AAMS?view=agent#features',
      cta: 'See Plans',
      highlight: false,
      borderColor: 'primary',
    },
  ]

  return (
    <section id="products" className="py-16 md:py-24 bg-[#001F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-4">
            Autonomous Product Suite
          </h2>
          <p className="text-xl text-[#A9BFCF] max-w-3xl mx-auto">
            From solo agent to full agency — autonomous operations at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.name}
              className={`bg-[#0d2137] border border-[#1a3a52] rounded-xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col ${
                product.highlight ? 'ring-2 ring-[#D4AF37] transform lg:scale-105' : 'ring-1 ring-[#2a4a62]'
              }`}
            >
              {product.highlight && (
                <div className="bg-[#D4AF37] text-[#001F33] text-center py-2 text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 flex-grow">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-ivory mb-2">{product.name}</h3>
                <p className="text-[#D4AF37] font-semibold mb-4">{product.subtitle}</p>
                <p className="text-[#A9BFCF] mb-6">{product.description}</p>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#D4AF37] mr-2 flex-shrink-0">✓</span>
                      <span className="text-sm text-[#A9BFCF]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#1a3a52] pt-6 mb-6">
                  <div className="text-2xl font-bold text-ivory mb-1">{product.pricing}</div>
                  <div className="text-sm text-[#8BA5B8]">{product.setupFee}</div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  href={product.link}
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${
                    product.highlight
                      ? 'bg-[#D4AF37] text-[#001F33] font-bold hover:bg-[#E5C158] shadow-lg shadow-[#D4AF37]/20'
                      : 'border-2 border-[#2a4a62] text-ivory hover:border-[#D4AF37] hover:text-[#E5C158]'
                  }`}
                >
                  {product.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
