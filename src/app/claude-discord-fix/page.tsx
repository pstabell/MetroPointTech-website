'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ClaudeDiscordFixPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/claude-discord-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong')
        setStatus('error')
        return
      }

      setStatus('success')

      // Trigger download
      if (data.downloadUrl) {
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = 'claude-discord-fix.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-accent font-semibold mb-4">OPEN SOURCE FIX</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Claude Code Discord Channels Fix
            </h1>
            <p className="text-xl mb-4 text-violet-100">
              GitHub Issue #36477 broke Discord channels in Claude Code v2.1.85.
              We built a custom MCP server that replaces the broken plugin entirely.
            </p>
            <p className="text-lg text-violet-200">
              Event-driven architecture. Zero polling. Production-tested on 13 AI agents.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">The Problem</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-lg text-neutral mb-4">
                Claude Code&apos;s official Discord channels plugin has a confirmed bug in v2.1.85
                (<a href="https://github.com/anthropics/claude-code/issues/36477" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark underline">GitHub Issue #36477</a>).
              </p>
              <ul className="space-y-3 text-neutral">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">&#10007;</span>
                  <span>Channels stop processing after the first response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">&#10007;</span>
                  <span>Bot shows online (green dot) but the brain is dead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">&#10007;</span>
                  <span>No error messages &mdash; fails silently</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl flex-shrink-0">&#10007;</span>
                  <span>Affects every user running Discord through channels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="py-16 bg-neutral-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Solution</h2>
            <p className="text-lg text-neutral mb-8 text-center">
              A custom MCP server that bypasses the broken channels plugin and connects directly to Discord.
            </p>

            {/* Architecture Diagram */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center justify-center">
                  <div className="bg-[#5865F2] text-white px-6 py-3 rounded-lg text-center">
                    Discord Gateway<br /><span className="text-xs opacity-75">WebSocket (event-driven)</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-accent"></div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-accent text-white px-6 py-3 rounded-lg text-center">
                    Custom MCP Server<br /><span className="text-xs opacity-90">discord.js + @modelcontextprotocol/sdk</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-accent"></div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-primary text-white px-6 py-3 rounded-lg text-center">
                    Claude Code<br /><span className="text-xs opacity-75">stdio transport &bull; MCP protocol</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-primary mb-2">Event-Driven</h3>
                <p className="text-neutral-light">No polling. Messages arrive instantly via Discord&apos;s WebSocket gateway. Eliminates the state management bug in the official plugin.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-primary mb-2">Standard MCP Protocol</h3>
                <p className="text-neutral-light">Full compatibility with Claude Code. Uses the official MCP SDK. Drop-in replacement for the channels plugin.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-primary mb-2">Direct Connection</h3>
                <p className="text-neutral-light">No middleman plugin to fail. Your bot connects directly to Discord and pushes notifications to Claude Code.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-primary mb-2">Production Tested</h3>
                <p className="text-neutral-light">We run 13 AI agents on Discord using this architecture. It handles DMs, mentions, multi-channel, and auto-restart.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">What&apos;s in the Download</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-accent mr-3 text-xl flex-shrink-0">&#10003;</span>
                <div>
                  <span className="font-semibold text-primary">server.mjs</span>
                  <span className="text-neutral-light"> &mdash; Complete MCP server template with Discord gateway connection, message handling, tool definitions (reply, fetch, react, edit), and graceful shutdown</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 text-xl flex-shrink-0">&#10003;</span>
                <div>
                  <span className="font-semibold text-primary">package.json</span>
                  <span className="text-neutral-light"> &mdash; Dependencies and configuration ready to npm install</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-accent mr-3 text-xl flex-shrink-0">&#10003;</span>
                <div>
                  <span className="font-semibold text-primary">README.md</span>
                  <span className="text-neutral-light"> &mdash; Setup guide, architecture explanation, troubleshooting, and customization instructions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Gate Download Form */}
      <section id="download" className="py-16 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Download the Fix</h2>
            <p className="text-violet-200 mb-8 text-center">
              Enter your info below and we&apos;ll send you the template package instantly.
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">&#10003;</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Download Started!</h3>
                <p className="text-green-700 mb-4">
                  Your template package is downloading now. Check your downloads folder.
                </p>
                <p className="text-sm text-green-600">
                  If the download didn&apos;t start,{' '}
                  <a href="/downloads/claude-discord-fix.zip" className="underline font-semibold">
                    click here to download manually
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-neutral"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-neutral"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-primary mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-neutral"
                    placeholder="Acme AI Labs"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-6 py-4 rounded-lg text-lg font-semibold transition"
                >
                  {status === 'submitting' ? 'Processing...' : 'Download MCP Server Template'}
                </button>

                <p className="text-xs text-neutral-light text-center">
                  We respect your privacy. No spam, no selling your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Built by Metro Point Technology</h2>
            <p className="text-lg text-neutral mb-6">
              We build intelligent software solutions for businesses. Our engineering team runs
              production AI systems at scale &mdash; 13 autonomous agents coordinating through Discord,
              processing tasks, and producing real deliverables every day.
            </p>
            <p className="text-lg text-neutral mb-8">
              If your team is building with AI and running into infrastructure problems, we can help.
              Custom integrations, agent architectures, and the tools that make AI actually work in production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Contact Us
              </a>
              <a
                href="/services"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
