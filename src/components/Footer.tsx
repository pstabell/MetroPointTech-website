import Link from 'next/link'
import AgenientWordmark from '@/components/AgenientWordmark'

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: 'linear-gradient(135deg, #047857 0%, #6D28D9 55%, #5B21B6 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4"><AgenientWordmark variant="stretch" size="30px" mono="#ffffff" /></div>
            <p className="text-violet-100 mb-4">
              Insurance software built by an agent with 30 years of experience.
              We understand what agents need because we've been there.
            </p>
            <div className="text-violet-100 space-y-1">
              <p>📞 <a href="tel:+12394267058" className="hover:text-accent transition">(239) 426-7058</a></p>
              <p>✉️ <a href="mailto:Support@MetroPointTech.com" className="hover:text-accent transition">Support@MetroPointTech.com</a></p>
              <p>📍 Cape Coral, Florida</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/AAMS" className="text-violet-100 hover:text-accent transition">
                  Agenient AAMS
                </Link>
              </li>
              <li>
                <Link href="/AAMS-CRM" className="text-violet-100 hover:text-accent transition">
                  Agenient CRM
                </Link>
              </li>
              <li>
                <Link href="/AAMS/agents" className="text-violet-100 hover:text-accent transition">
                  Agenient Solo
                </Link>
              </li>
              <li>
                <Link href="/ai-agent-teams" className="text-violet-100 hover:text-accent transition">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/products/wrap-proposal-generator" className="text-violet-100 hover:text-accent transition">
                  WRAP Proposal Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-violet-100 hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-violet-100 hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/commission-calculator" className="text-violet-100 hover:text-accent transition">
                  Commission Leak Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-light mt-8 pt-8 text-center text-sm text-violet-100 space-y-2">
          <p>&copy; 2026 Metro Point Technology LLC. All rights reserved.</p>
          <p className="space-x-4">
            <Link href="/privacy-policy" className="hover:text-accent transition">Privacy Policy</Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms-of-service" className="hover:text-accent transition">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
