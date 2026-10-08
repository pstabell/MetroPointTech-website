// schema.org structured data for agenient.com, so search engines and AI assistants (ChatGPT, Copilot,
// Perplexity, Gemini, Claude) read the products, prices and company facts correctly.
// Every fact and price here is copied from what the site already shows. When a price or plan changes on a
// page, change it here too (AAMS plans: src/components/AAMSContent.tsx; CRM: src/app/AAMS-CRM/page.tsx;
// AI Agent Teams: src/app/ai-agent-teams/page.tsx). /products/ams carries an older price table that does
// not match /AAMS, so it is deliberately left out of the offers below.

export const SITE = 'https://agenient.com'
export const ORG_ID = `${SITE}/#organization`
export const WEBSITE_ID = `${SITE}/#website`
const AAMS_ID = `${SITE}/AAMS#software`
const CRM_ID = `${SITE}/AAMS-CRM#software`
const AI_AGENTS_ID = `${SITE}/ai-agent-teams#service`

const orgRef = { '@id': ORG_ID }

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Metro Point Technology',
  legalName: 'Metro Point Technology LLC',
  url: SITE,
  logo: `${SITE}/logo.svg`,
  description:
    'Autonomous insurance agency software built by an active agent with 30 years of experience. Agenient AAMS delivers zero-touch commission reconciliation, agentic workflows, and autonomous operations.',
  brand: { '@type': 'Brand', name: 'Agenient', logo: `${SITE}/agenient-emblem-512.png` },
  email: 'Support@MetroPointTech.com',
  telephone: '+1-239-426-7058',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Coral',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+1-239-426-7058',
    email: 'Support@MetroPointTech.com',
    url: `${SITE}/contact`,
  },
  founder: { '@type': 'Person', name: 'Patrick Stabell' },
  areaServed: { '@type': 'Country', name: 'United States' },
  sameAs: ['https://github.com/pstabell'],
}

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE,
  name: 'Agenient',
  description:
    'Agenient AAMS — the autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations built by an active agent with 30 years of experience.',
  inLanguage: 'en-US',
  publisher: orgRef,
}

const monthly = (price: string, unitText = 'MONTH') => ({
  '@type': 'UnitPriceSpecification',
  price,
  priceCurrency: 'USD',
  billingDuration: 'P1M',
  unitText,
})

const offer = (name: string, price: string, url: string, description: string, spec?: Record<string, unknown> | Record<string, unknown>[]) => ({
  '@type': 'Offer',
  name,
  price,
  priceCurrency: 'USD',
  url,
  description,
  ...(spec ? { priceSpecification: spec } : {}),
})

export const aamsSoftware = {
  '@type': 'SoftwareApplication',
  '@id': AAMS_ID,
  name: 'Agenient AAMS — Autonomous Agency Management System',
  alternateName: 'Agenient AAMS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE}/AAMS`,
  description:
    'Agenient AAMS is an autonomous agency management system for insurance agencies — the AI evolution of legacy AMS platforms, with agentic workflows, real-time agent visibility, and zero-touch operations. 14-day free trial.',
  audience: { '@type': 'BusinessAudience', audienceType: 'Insurance agencies, solo insurance agents and producers' },
  featureList: [
    '3-Status Commission Tracking (Due → Reconciled → Paid)',
    'Mirror Architecture - agents see updates in real-time',
    '4-Role Hierarchy (Admin, Manager, Agent, Owner)',
    'Commission splits & chargeback handling',
    'Multi-location support',
    'AI Agentic Reconciliation',
    'Email Statement Forwarding',
  ],
  publisher: orgRef,
  softwareAddOn: { '@type': 'SoftwareApplication', '@id': CRM_ID, name: 'Agenient CRM', url: `${SITE}/AAMS-CRM` },
  offers: [
    offer('Agenient AAMS Producer', '0', `${SITE}/AAMS`,
      'Free forever for producers at agencies. No credit card. Built-in split cap: 90% new / 80% renewal.'),
    offer('Agenient AAMS Starter', '19.99', `${SITE}/AAMS`,
      'For solo agents. Unlimited policy tracking, manual reconciliation, revenue ledger and reports. 14-day free trial, no credit card required.',
      monthly('19.99')),
    offer('Agenient AAMS Pro', '49.99', `${SITE}/AAMS`,
      'For solo agents. Adds AI agentic reconciliation and AI coaching and alerts. 14-day free trial; credit card required at signup.',
      monthly('49.99')),
    offer('Agenient AAMS Autopilot', '79.99', `${SITE}/AAMS`,
      'For solo agents. Adds email statement forwarding and auto-processing. 14-day free trial; credit card required at signup.',
      monthly('79.99')),
    offer('Agenient AAMS Agency Self-Service', '99.99', `${SITE}/AAMS`,
      'For agencies. Multi-agent management, commission splits and chargebacks, admin panel and role hierarchy. 1 user included; extra users $49.99/mo each. 14-day free trial, no credit card required.',
      monthly('99.99')),
    offer('Agenient AAMS Agency With AI Agent', '199.99', `${SITE}/AAMS`,
      'For agencies. Adds AI agentic reconciliation, AI back office agent and email auto-processing. 1 user included; extra users $99.99/mo each. 14-day free trial; credit card required at signup.',
      monthly('199.99')),
    offer('Agenient AAMS Agency AI Plus', '299.99', `${SITE}/AAMS`,
      'For agencies. Three full AI seats included; extra users $99.99/mo each. No trial; billed on day one. Cancel anytime.',
      monthly('299.99')),
    offer('AI Action Bucket', '99.99', `${SITE}/AAMS`,
      '600 additional AI actions. One-time purchase, no auto-recurring charges.'),
  ],
}

export const crmSoftware = {
  '@type': 'SoftwareApplication',
  '@id': CRM_ID,
  name: 'Agenient CRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE}/AAMS-CRM`,
  description:
    'Agenient CRM is the AI insurance agency CRM built into your AMS. AI agents Closer and Pulse handle quoting, renewals, and follow-ups. 18 ACORD form generators. 7-stage pipeline.',
  featureList: [
    'AI agent Closer — shops policies, compares quotes, flags red flags',
    'AI agent Pulse — renewal reminders, client health, follow-ups',
    '18 ACORD form generators (personal + commercial)',
    '7-stage sales pipeline with hard-gate enforcement',
    'MGA submission tracking & quote comparison',
    'Role-based access (Admin, Manager, Agent, Owner)',
  ],
  publisher: orgRef,
  offers: offer('Agenient CRM', '99.99', `${SITE}/AAMS-CRM`,
    'Per user per month. Add-on to Agenient AAMS Agency ($199.99/mo). Solo agents upgrade to the Agency tier first.',
    monthly('99.99', 'per user per month')),
}

const agentPlan = (name: string, monthlyPrice: string, setupPrice: string, description: string) =>
  offer(name, monthlyPrice, `${SITE}/ai-agent-teams`, description, [
    { ...monthly(monthlyPrice), priceComponentType: 'https://schema.org/Subscription' },
    { '@type': 'UnitPriceSpecification', price: setupPrice, priceCurrency: 'USD', priceComponentType: 'https://schema.org/ActivationFee', description: 'One-time setup' },
  ])

export const aiAgentTeamsService = {
  '@type': 'Service',
  '@id': AI_AGENTS_ID,
  name: 'AI Agent Teams',
  serviceType: 'Dedicated AI back-office agents for insurance agencies',
  url: `${SITE}/ai-agent-teams`,
  description:
    'Your own dedicated AI employees, connected to your agency systems. 24/7 back-office automation for insurance agencies: commission reconciliation, data entry and sync, renewal tracking, and carrier statement processing.',
  provider: orgRef,
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: [
    agentPlan('AI Agent Basic', '499.99', '999.99',
      'Your own AI employee, connected to your systems. Connects to up to 2 of your existing platforms. $999.99 one-time setup (4 hours of configuration); includes 1 hour/month of agent training & optimization.'),
    agentPlan('AI Agent Premium', '999.99', '1999.99',
      'Full-service AI operations for your entire agency. Connects to up to 5 of your existing platforms. $1,999.99 one-time setup (8 hours of configuration); includes 2 hours/month of agent training & optimization.'),
    agentPlan('AI Agent Enterprise', '2499.99', '4999.99',
      'A three-agent AI team replacing your entire back-office department. 3 dedicated AI agents, connects to up to 10 of your existing platforms. $4,999.99 one-time setup (20 hours of configuration); includes 4 hours/month of agent training & optimization.'),
  ],
}

const freeWebApp = (name: string, path: string, description: string) => ({
  '@type': 'WebApplication',
  name,
  url: `${SITE}${path}`,
  description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: orgRef,
})

export const commissionCalculatorApp = freeWebApp('Commission Calculator', '/commission-calculator',
  'Free commission calculator for insurance agents. Compare expected vs actual carrier commission, surface underpayments, and quantify revenue leakage on every policy.')

export const wrapProposalGeneratorApp = freeWebApp('WRAP Proposal Generator', '/products/wrap-proposal-generator',
  'Create professional WRAP (Wealth Risk Analysis & Protection) proposals in minutes. Beautiful Word documents with your agency branding. Free to use, no sign-up required, export to Word instantly.')

// The /services page offers, verbatim from src/app/services/page.tsx (no prices are published there).
export const servicesFromServicesPage = (items: { title: string; description: string }[]) =>
  items.map((s) => ({
    '@type': 'Service',
    name: s.title,
    description: s.description,
    url: `${SITE}/services`,
    provider: orgRef,
  }))

// Breadcrumb trail: Home is always first; pass the rest as [name, path] pairs.
export const breadcrumb = (...trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: path === '/' ? SITE : `${SITE}${path}`,
  })),
})

export const graph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
})
