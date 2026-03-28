import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Metro Point Technology</h3>
            <p className="text-blue-100 mb-4">
              Insurance software built by an agent with 30 years of experience.
              We understand what agents need because we've been there.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/ams" className="text-blue-100 hover:text-accent transition">
                  AMS Platform
                </Link>
              </li>
              <li>
                <Link href="/products/commission-tracker" className="text-blue-100 hover:text-accent transition">
                  Commission Tracker
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-accent transition">
                  Agent CRM (Q1 2026)
                </Link>
              </li>
              <li>
                <Link href="/products/wrap-proposal-generator" className="text-blue-100 hover:text-accent transition">
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
                <Link href="/about" className="text-blue-100 hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/commission-calculator" className="text-blue-100 hover:text-accent transition">
                  Commission Leak Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-light mt-8 pt-8 text-center text-sm text-blue-100">
          <p>&copy; 2026 Metro Point Technology LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
