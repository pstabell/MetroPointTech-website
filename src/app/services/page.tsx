import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Technology services that actually make sense. System optimization, integrations, custom development, and AI-powered solutions - all delivered with a personal touch.',
  alternates: { canonical: '/services' },
}

const services = [
  {
    icon: '⚡',
    title: 'System Optimization',
    tagline: 'Get more from what you already have',
    description: "You've invested in software. Let's make sure it's actually working for you, not the other way around. We'll dig into your existing tools, find the hidden features you're not using, and tune everything so your team can work smarter.",
    highlights: [
      'Audit your current tech stack',
      'Unlock features you didn\'t know existed',
      'Speed up slow workflows',
      'Train your team on best practices',
    ],
    gradient: 'from-violet-500 to-cyan-400',
    bgColor: 'bg-violet-50',
    iconBg: 'bg-violet-100',
  },
  {
    icon: '🔗',
    title: 'Integration & Automation',
    tagline: 'Connect the dots, automate the boring stuff',
    description: "Tired of copying data between systems? We build bridges between your tools so information flows automatically. Your CRM talks to your accounting software. Your email syncs with your database. Everything just... works.",
    highlights: [
      'Connect apps that don\'t naturally talk',
      'Eliminate manual data entry',
      'Set up automated workflows',
      'Real-time syncing between systems',
    ],
    gradient: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
  {
    icon: '🛠️',
    title: 'Custom Development',
    tagline: 'When off-the-shelf just won\'t cut it',
    description: "Sometimes you need something built just for you. Whether it's a web app to manage your unique process, a mobile tool for your field team, or an internal dashboard that actually shows what matters - we'll build it.",
    highlights: [
      'Web applications & portals',
      'Mobile apps (iOS & Android)',
      'Custom business tools & dashboards',
      'Internal systems & workflows',
    ],
    gradient: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Solutions',
    tagline: 'Work faster with a digital teammate',
    description: "AI isn't just hype - it's a real way to get more done in less time. We'll help you find where AI makes sense for YOUR business, then implement solutions that actually deliver results (not just cool demos).",
    highlights: [
      'AI-assisted content & communications',
      'Smart document processing',
      'Intelligent chatbots & assistants',
      'Automated analysis & reporting',
    ],
    gradient: 'from-green-500 to-emerald-400',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
  },
  {
    icon: '📞',
    title: 'Business Phone System',
    tagline: 'Ditch the expensive phone bills',
    description: "Why pay $30-50 per user for RingCentral or Lightspeed when you could pay a fraction of that? We build custom VoIP phone systems that do everything the big guys do - for way less. Plus, our systems come with an AI receptionist that never takes a sick day.",
    highlights: [
      'Web & mobile softphone apps',
      'AI receptionist that answers 24/7',
      'Call recording & voicemail transcription',
      'Keep your existing phone numbers',
    ],
    gradient: 'from-teal-500 to-cyan-400',
    bgColor: 'bg-teal-50',
    iconBg: 'bg-teal-100',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent-light rounded-full text-sm font-medium mb-6">
            Technology that works for YOU
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            No Jargon. No Fluff.
            <br />
            <span className="text-accent">Just Results.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-violet-100 max-w-3xl mx-auto leading-relaxed">
            We're not here to sell you buzzwords. We're here to solve real problems, 
            streamline your operations, and help your business run smoother.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Let's Talk →
            </Link>
            <a
              href="#services"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              See Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What We Do Best
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              Four ways we help businesses like yours get ahead
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`${service.bgColor} rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 group`}
              >
                {/* Icon */}
                <div className={`${service.iconBg} w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-primary mb-2">{service.title}</h3>
                <p className={`text-lg font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-4`}>
                  {service.tagline}
                </p>
                <p className="text-neutral-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Highlights */}
                <ul className="space-y-2">
                  {service.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-neutral">
                      <span className="text-accent mr-2">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How We Work Together
            </h2>
            <p className="text-xl text-neutral-light max-w-2xl mx-auto">
              Simple, straightforward, no surprises
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: "We hop on a call (free, no pressure) and you tell us what's bugging you. What's slow? What's broken? What do you wish your tech could do?",
                icon: '💬',
              },
              {
                step: '02',
                title: 'Game Plan',
                description: "We put together a clear plan with real timelines and honest pricing. No mystery fees, no scope creep surprises.",
                icon: '📋',
              },
              {
                step: '03',
                title: 'Build & Iterate',
                description: "We get to work, keeping you in the loop the whole time. You'll see progress, give feedback, and we adjust as needed.",
                icon: '🔨',
              },
              {
                step: '04',
                title: 'Launch & Support',
                description: "We don't just hand off and disappear. We make sure everything's running smooth and we're here when you need us.",
                icon: '🚀',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-accent font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-neutral-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Why Work With Us?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">We Speak Human</h3>
                    <p className="text-neutral-light">No tech jargon or confusing acronyms. We explain things in plain English and make sure you actually understand what we're building.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    💪
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">Business-First Thinking</h3>
                    <p className="text-neutral-light">We're not just coders - we understand business. Every solution is designed to actually move the needle on what matters to you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    🤝
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">Real Partnership</h3>
                    <p className="text-neutral-light">We're not a faceless agency. You'll work directly with people who know your project inside and out, and who actually care about your success.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">AI-Accelerated Delivery</h3>
                    <p className="text-neutral-light">We use AI tools internally to work faster and smarter. That means quicker turnarounds and better results for you.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-3xl p-8 md:p-12">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <div className="text-5xl mb-4">💡</div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Not Sure Where to Start?</h3>
                    <p className="text-neutral-light mb-6">
                      That's totally fine. Book a free discovery call and we'll figure it out together. 
                      No commitment, no hard sell - just a conversation.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Schedule a Call
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Make Your Tech
            <br />
            <span className="text-accent">Work For You?</span>
          </h2>
          <p className="text-xl mb-8 text-violet-100 max-w-2xl mx-auto">
            Whether you've got a specific project in mind or just know something needs to change, 
            let's talk. The first call is always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started →
            </Link>
            <a
              href="mailto:support@metropointtech.com"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Email Us Directly
            </a>
          </div>
          <p className="mt-8 text-sm text-violet-200">
            📞 Or call us at <a href="tel:+12394267058" className="underline hover:text-white">(239) 426-7058</a>
          </p>
        </div>
      </section>
    </div>
  )
}
