'use client'

import { useState } from 'react'
import Link from 'next/link'
import AgenientWordmark from '@/components/AgenientWordmark'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[120px]">
        <div className="flex justify-between items-center w-full">
          {/* Logo — Agenient SPIN wordmark (animated, header) */}
          <Link href="/" className="flex items-center" aria-label="Agenient home">
            <AgenientWordmark variant="spin" size="clamp(30px, 4.2vw, 46px)" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-800 hover:text-slate-800 transition">
              Home
            </Link>
            <Link href="/#products" className="text-slate-800 hover:text-slate-800 transition">
              Products
            </Link>
            <Link href="/services" className="text-slate-800 hover:text-slate-800 transition">
              Services
            </Link>
            <Link href="/about" className="text-slate-800 hover:text-slate-800 transition">
              About
            </Link>
            <Link href="/team" className="text-slate-800 hover:text-slate-800 transition">
              Team
            </Link>
            <Link href="/blog" className="text-slate-800 hover:text-slate-800 transition">
              Blog
            </Link>
            <Link href="/commission-calculator" className="text-slate-800 hover:text-slate-800 transition">
              Tools
            </Link>
            <Link href="/contact" className="text-slate-800 hover:text-slate-800 transition">
              Contact
            </Link>
            <a
              href="https://ams.metropointtech.com/login"
              className="text-slate-800 hover:text-slate-800 transition"
            >
              Log In
            </a>
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-neutral-lighter transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Home
            </Link>
            <Link href="/#products" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Products
            </Link>
            <Link href="/services" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Services
            </Link>
            <Link href="/about" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              About
            </Link>
            <Link href="/team" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Team
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Blog
            </Link>
            <Link href="/commission-calculator" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Tools
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition">
              Contact
            </Link>
            <a
              href="https://ams.metropointtech.com/login"
              className="block px-4 py-2 text-slate-800 hover:bg-neutral-lighter rounded transition"
            >
              Log In
            </a>
            <Link
              href="/contact"
              className="block mx-4 mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition text-center"
            >
              Request Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
