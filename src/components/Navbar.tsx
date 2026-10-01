'use client'

import { useState } from 'react'
import Link from 'next/link'
import AgenientEmblem from '@/components/AgenientEmblem'
import AgenientWordmark from '@/components/AgenientWordmark'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#001F33] border-b border-[#1a3a52] shadow-lg shadow-black/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[120px]">
        <div className="flex justify-between items-center w-full min-h-[120px]">
          {/* Logo — compass emblem + SPIN wordmark (white Agen + gold ient, sparkle i-dot) (Patrick 2026-10-01) */}
          <Link href="/" className="flex items-center gap-3" aria-label="Agenient home">
            <AgenientEmblem size={56} />
            <AgenientWordmark variant="spin" size="clamp(30px, 4.2vw, 46px)" dark />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Home
            </Link>
            <Link href="/#products" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Products
            </Link>
            <Link href="/services" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Services
            </Link>
            <Link href="/about" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              About
            </Link>
            <Link href="/team" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Team
            </Link>
            <Link href="/blog" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Blog
            </Link>
            <Link href="/commission-calculator" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Tools
            </Link>
            <Link href="/contact" className="text-[#A9BFCF] hover:text-[#D4AF37] transition">
              Contact
            </Link>
            <a
              href="https://aams.agenient.com/login"
              className="text-[#A9BFCF] hover:text-[#D4AF37] transition"
            >
              Log In
            </a>
            <Link
              href="/contact"
              className="bg-[#D4AF37] text-[#001F33] font-bold px-6 py-2 rounded-lg hover:bg-[#E5C158] transition shadow-lg shadow-[#D4AF37]/20"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-[#A9BFCF] hover:bg-[#0d2137] transition"
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
          <div className="lg:hidden w-full pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Home
            </Link>
            <Link href="/#products" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Products
            </Link>
            <Link href="/services" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Services
            </Link>
            <Link href="/about" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              About
            </Link>
            <Link href="/team" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Team
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Blog
            </Link>
            <Link href="/commission-calculator" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Tools
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition">
              Contact
            </Link>
            <a
              href="https://aams.agenient.com/login"
              className="block px-4 py-2 text-[#A9BFCF] hover:bg-[#0d2137] hover:text-[#D4AF37] rounded transition"
            >
              Log In
            </a>
            <Link
              href="/contact"
              className="block mx-4 mt-4 bg-[#D4AF37] text-[#001F33] font-bold px-6 py-2 rounded-lg hover:bg-[#E5C158] transition text-center"
            >
              Request Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
