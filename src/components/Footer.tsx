import Link from 'next/link'
import AgenientEmblem from '@/components/AgenientEmblem'
import AgenientWordmark from '@/components/AgenientWordmark'

export default function Footer() {
  return (
    <footer className="text-[#8BA5B8] bg-[#001F33] border-t border-[#1a3a52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center gap-3"><AgenientEmblem size={44} /><AgenientWordmark variant="stretch" size="30px" dark /></div>
            <p className="text-[#8BA5B8] mb-4">
              Insurance software built by an agent with 30 years of experience.
              We understand what agents need because we've been there.
            </p>
            <div className="text-[#8BA5B8] space-y-1">
              <p>📞 <a href="tel:+12394267058" className="hover:text-[#D4AF37] transition">(239) 426-7058</a></p>
              <p>✉️ <a href="mailto:Support@MetroPointTech.com" className="hover:text-[#D4AF37] transition">Support@MetroPointTech.com</a></p>
              <p>📍 Cape Coral, Florida</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-ivory">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/AAMS" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  Agenient AAMS
                </Link>
              </li>
              <li>
                <Link href="/AAMS-CRM" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  Agenient CRM
                </Link>
              </li>
              <li>
                <Link href="/AAMS?view=agent#features" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  Agenient Solo
                </Link>
              </li>
              <li>
                <Link href="/ai-agent-teams" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/products/wrap-proposal-generator" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  WRAP Proposal Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-ivory">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/commission-calculator" className="text-[#8BA5B8] hover:text-[#D4AF37] transition">
                  Commission Leak Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a3a52] mt-8 pt-8 text-center text-sm text-[#8BA5B8] space-y-2">
          <p>&copy; 2026 Metro Point Technology LLC. All rights reserved.</p>
          <p className="space-x-4">
            <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition">Privacy Policy</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms-of-service" className="hover:text-[#D4AF37] transition">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
