import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Patrick Stabell and Metro Point Technology. 30 years of insurance experience building software that actually works.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Metro Point Technology
          </h1>
          <p className="text-xl text-blue-100">
            Insurance software built by someone who actually works in the trenches
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>

            <p className="text-primary mb-6">
              Metro Point Technology was born from a unique combination: decades of insurance experience
              and a lifelong immersion in technology.
            </p>

            <p className="text-primary mb-6">
              I'm Patrick Stabell. I owned and operated my own independent insurance agency in Orange County, California
              for many years, building relationships with clients and carriers while learning every aspect of the business.
              But technology has been in my DNA since birth—my father spent his entire career as a physicist at IBM,
              and that analytical, problem-solving mindset was molded into me from day one.
            </p>

            <p className="text-primary mb-6">
              After 30 years in the insurance industry, I got tired of using software that was either too complicated,
              too expensive, or just didn't solve the right problems. So I combined my insurance expertise with
              the technical foundation I inherited and started building tools that actually work for agents in the field.
            </p>

            <p className="text-primary mb-6">
              Every feature in our products solves a real problem I've encountered while running an agency.
              If it doesn't work for us, we don't ship it. That's the Metro Point Technology difference.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Our Philosophy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">👨‍💼 Agent First</h3>
              <p className="text-primary">
                We're agents who learned to code, not developers who learned about insurance.
                This fundamental difference shapes everything we build.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">🔨 Build What We Use</h3>
              <p className="text-primary">
                These apps solve real agency problems. We don't build features speculatively.
                If we don't need it, we don't build it.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">🗣️ Listen to the Community</h3>
              <p className="text-primary">
                Product roadmaps come from social media feedback and agent conversations.
                We build what the community needs, not what we think they want.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">🚫 No Custom Dev Shop</h3>
              <p className="text-primary">
                We build products, not projects. No client services means we stay focused on
                making great software instead of becoming someone's IT department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Try Software Built by Agents?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            See why agents trust tools built by someone who understands the business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/products/commission-tracker"
              className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
