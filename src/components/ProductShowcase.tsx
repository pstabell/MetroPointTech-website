import Link from 'next/link'

export default function ProductShowcase() {
  const products = [
    {
      name: 'AAMS Platform',
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
      pricing: '$99/user/mo',
      setupFee: '14-day free trial • No credit card required',
      link: '/products/ams',
      cta: 'Request Demo',
      highlight: true,
      borderColor: 'accent',
    },
    {
      name: 'AAMS Solo',
      subtitle: 'For Independent Agents',
      description: 'Autonomous commission tracking that catches every dollar. Agentic reconciliation runs while you sell. The foundation that grows with you.',
      icon: '💰',
      features: [
        'Policy & commission tracking',
        'Agentic reconciliation',
        'Statement import & matching',
        'Revenue ledger & reports',
        'Upgrade to AAMS Agency as you grow',
      ],
      pricing: 'Start Free Trial',
      setupFee: 'No credit card required',
      link: '/products/commission-tracker',
      cta: 'Start Free Trial',
      highlight: false,
      borderColor: 'primary',
    },
    {
      name: 'AAMS CRM',
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
      pricing: '$99/user/mo',
      setupFee: '14-day free trial • No credit card required',
      link: '/contact',
      cta: 'Start Free Trial',
      highlight: false,
      borderColor: 'primary',
    },
    {
      name: 'WRAP Proposal Generator',
      subtitle: 'For High-Net-Worth Agents',
      description: 'Create professional Wealth Risk Analysis & Protection proposals in minutes. Beautiful Word documents with your agency branding.',
      icon: '📊',
      features: [
        'Professional Word document output',
        '10 coverage types supported',
        'Up to 4 agents with photos',
        'Agency logo and branding',
        'Automatic savings calculations',
      ],
      pricing: 'Free to Use',
      setupFee: 'No sign-up required',
      link: '/products/wrap-proposal-generator',
      cta: 'Try It Now',
      highlight: false,
      borderColor: 'accent',
    },
  ]

  return (
    <section id="products" className="py-16 md:py-24 bg-neutral-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Autonomous Product Suite
          </h2>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            From solo agent to full agency — autonomous operations at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${
                product.borderColor === 'accent' ? 'ring-2 ring-accent transform lg:scale-105' :
                product.borderColor === 'primary' ? 'ring-2 ring-primary' : ''
              }`}
            >
              {product.highlight && (
                <div className="bg-accent text-white text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 flex-grow">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{product.name}</h3>
                <p className="text-accent font-semibold mb-4">{product.subtitle}</p>
                <p className="text-primary mb-6">{product.description}</p>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2 flex-shrink-0">✓</span>
                      <span className="text-sm text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-neutral-lighter pt-6 mb-6">
                  <div className="text-2xl font-bold text-primary mb-1">{product.pricing}</div>
                  <div className="text-sm text-primary">{product.setupFee}</div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Link
                  href={product.link}
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${
                    product.highlight
                      ? 'bg-accent text-white hover:bg-accent-dark'
                      : 'bg-primary text-white hover:bg-primary-dark'
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
