import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Metro Point Technology LLC collects, uses, and safeguards your information.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-violet-100">Metro Point Technology LLC</p>
          <p className="text-violet-100 text-sm mt-2">Effective Date: January 15, 2025 &middot; Last Updated: January 15, 2025</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800 leading-relaxed space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
            <p className="mb-3">Metro Point Technology LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Software as a Service (SaaS) products, including AMS-App (insurance agency management system) and related services (collectively, the "Services").</p>
            <p className="font-semibold">Contact Information:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Email: Support@MetroPointTech.com</li>
              <li>Address: Southwest Florida, United States</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Information You Provide Directly</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Account Information:</strong> Name, email address, company name, phone number, billing address</li>
              <li><strong>Profile Information:</strong> User preferences, settings, and profile details</li>
              <li><strong>Business Data:</strong> Information you upload, store, or process through our Services, including client records, policy information, commission data, and other business-related content</li>
              <li><strong>Communications:</strong> Messages sent through our support channels, feedback forms, or customer service interactions</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Usage Data:</strong> How you interact with our Services, features used, time spent, click patterns</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Log Data:</strong> Server logs, error reports, API calls, system performance metrics</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address (not precise location tracking)</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">2.3 Cookies and Similar Technologies</h3>
            <p className="mb-2">We use cookies, web beacons, and similar technologies to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Maintain your session and authentication</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze usage patterns and improve our Services</li>
              <li>Provide security features and prevent fraud</li>
            </ul>
            <p className="mt-3 font-semibold">Cookie Types:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how you use our Services</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Provide Services:</strong> Deliver, maintain, and improve our SaaS products</li>
              <li><strong>Account Management:</strong> Create and manage your account, process subscriptions</li>
              <li><strong>Customer Support:</strong> Respond to inquiries, provide technical assistance</li>
              <li><strong>Communication:</strong> Send service updates, security alerts, administrative messages</li>
              <li><strong>Analytics:</strong> Analyze usage patterns to improve our Services</li>
              <li><strong>Security:</strong> Protect against fraud, unauthorized access, and security threats</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Data Storage and Security</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Data Storage</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Cloud Infrastructure:</strong> We use industry-standard cloud providers with robust security measures</li>
              <li><strong>Data Centers:</strong> Located in the United States with SOC 2 compliance</li>
              <li><strong>Encryption:</strong> Data is encrypted both in transit (TLS 1.2+) and at rest (AES-256)</li>
              <li><strong>Backups:</strong> Regular automated backups with secure storage and retention policies</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Security Measures</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Multi-factor authentication options</li>
              <li>Regular security audits and penetration testing</li>
              <li>Employee access controls and training</li>
              <li>Incident response procedures</li>
              <li>Compliance with industry security standards</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">4.3 Data Retention</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>Business Data:</strong> Retained according to your subscription terms</li>
              <li><strong>Log Data:</strong> Typically retained for 12 months for security and analytics purposes</li>
              <li><strong>Deleted Data:</strong> Securely deleted within 30 days of account termination (unless required by law)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Information Sharing and Disclosure</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">5.1 We Do Not Sell Your Personal Information</h3>
            <p>Metro Point Technology does not sell, rent, or trade your personal information to third parties for monetary consideration.</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">5.2 Limited Sharing Scenarios</h3>
            <p className="mb-2">We may share information only in the following circumstances:</p>
            <p className="font-semibold mt-2">Service Providers</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Cloud hosting providers (AWS, Google Cloud, etc.)</li>
              <li>Payment processors (Stripe, etc.)</li>
              <li>Email service providers</li>
              <li>Analytics and monitoring tools</li>
            </ul>
            <p className="font-semibold mt-3">Legal Requirements</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Compliance with subpoenas or legal process</li>
              <li>Protection of our rights and property</li>
              <li>Prevention of fraud or security threats</li>
              <li>Public safety requirements</li>
            </ul>
            <p className="font-semibold mt-3">Business Transfers</p>
            <p>In the event of merger, acquisition, or sale of assets (with advance notice to users).</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Your Rights and Choices</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">6.1 Access and Control</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Account Access:</strong> View and update your account information through our Services</li>
              <li><strong>Data Export:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Data Correction:</strong> Update or correct inaccurate personal information</li>
              <li><strong>Data Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">6.2 Communication Preferences</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Marketing Emails:</strong> Opt-out of promotional communications (service emails may continue)</li>
              <li><strong>Notifications:</strong> Control in-app and email notifications through your settings</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">6.3 Cookie Controls</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Browser Settings:</strong> Disable cookies through your browser (may affect functionality)</li>
              <li><strong>Opt-Out:</strong> Use browser-based opt-out tools for analytics cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Third-Party Services</h2>
            <p className="mb-2">Our Services may integrate with third-party applications and services. This Privacy Policy does not apply to third-party services. We encourage you to review their privacy policies before connecting or sharing information.</p>
            <p className="font-semibold">Common Integrations:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Email providers (Outlook, Gmail)</li>
              <li>Insurance carrier systems</li>
              <li>Accounting software</li>
              <li>CRM platforms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. International Users</h2>
            <p>Our Services are primarily designed for users in the United States. If you access our Services from outside the U.S., your information may be transferred to and processed in the United States, where our servers are located and our central database is operated.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">9. Children's Privacy</h2>
            <p>Our Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that we have collected information from a child under 13, we will promptly delete such information.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">10. Changes to This Privacy Policy</h2>
            <p className="mb-2">We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Post the updated policy on our website</li>
              <li>Notify you of material changes via email or through our Services</li>
              <li>Update the "Last Updated" date at the top of this policy</li>
            </ul>
            <p className="mt-3">Continued use of our Services after changes constitute acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">11. California Privacy Rights</h2>
            <p className="mb-2">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Right to know what personal information we collect and how it's used</li>
              <li>Right to delete personal information (with certain exceptions)</li>
              <li>Right to opt-out of the sale of personal information (we don't sell your information)</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at Support@MetroPointTech.com.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">12. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
            <p><strong>Metro Point Technology LLC</strong></p>
            <p>Email: Support@MetroPointTech.com</p>
            <p>Subject Line: "Privacy Policy Inquiry"</p>
            <p className="mt-3">We will respond to privacy-related inquiries within 30 days.</p>
          </div>

          <p className="text-sm italic border-t pt-6">This Privacy Policy is effective as of the date listed above and applies to all users of Metro Point Technology's Services.</p>
        </div>
      </section>
    </div>
  )
}
