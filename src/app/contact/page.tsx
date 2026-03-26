'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    message: ''
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
<<<<<<< Updated upstream
    
=======
    setStatus('submitting')
    setErrorMessage('')

>>>>>>> Stashed changes
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

<<<<<<< Updated upstream
      if (response.ok) {
        setSubmitted(true)
      } else {
        console.error('Form submission failed')
        // You could add error state here if needed
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // You could add error state here if needed
=======
      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: '',
        message: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Sorry, there was an error sending your message. Please try emailing us directly at sales@metropointtech.com')
>>>>>>> Stashed changes
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-blue-100">
            Ready to see how our software can transform your agency? Let's talk.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-neutral mb-6">Request a Demo</h2>

              {status === 'success' ? (
                <div className="bg-accent/10 border-2 border-accent rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-neutral mb-3">Thank You!</h3>
                  <p className="text-neutral-light mb-4">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-accent hover:text-accent-dark font-semibold transition-colors"
                  >
                    ← Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-neutral mb-2">
                      Agency/Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                      placeholder="Your Agency Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm font-semibold text-neutral mb-2">
                      Interested In *
                    </label>
                    <select
                      id="product"
                      name="product"
                      required
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral"
                    >
                      <option value="">Select a product...</option>
                      <option value="ams">AMS Platform (Agency Management)</option>
                      <option value="commission-tracker">Commission Tracker (Solo Agent)</option>
                      <option value="crm">CRM Lite (Coming Soon)</option>
                      <option value="multiple">Multiple Products</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-neutral mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-neutral resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <p className="text-red-700 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-sm text-neutral-light text-center">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-neutral mb-6">Contact Information</h2>

              <div className="space-y-8">
                <div className="bg-neutral-lighter rounded-xl p-6">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="font-semibold text-neutral mb-2">Email</h3>
                  <a href="mailto:sales@metropointtech.com" className="text-primary hover:text-primary-dark">
                    sales@metropointtech.com
                  </a>
                </div>

                <div className="bg-neutral-lighter rounded-xl p-6">
                  <div className="text-3xl mb-3">🏢</div>
                  <h3 className="font-semibold text-neutral mb-2">Office</h3>
                  <p className="text-neutral-light">
                    Metro Point Technology, LLC<br />
                    Cape Coral, FL
                  </p>
                </div>

                <div className="bg-neutral-lighter rounded-xl p-6">
                  <div className="text-3xl mb-3">⏰</div>
                  <h3 className="font-semibold text-neutral mb-2">Response Time</h3>
                  <p className="text-neutral-light">
                    We typically respond within 24 hours on business days
                  </p>
                </div>

                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6">
                  <h3 className="font-semibold text-neutral mb-3">Prefer to start immediately?</h3>
                  <a
                    href="https://www.agentcommissiontracker.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Start Free 14-Day Trial
                  </a>
                  <p className="text-sm text-neutral-light mt-3">
                    No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
