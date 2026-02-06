import type { Metadata } from 'next'
import { Inter, Alata } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const alata = Alata({ weight: '400', subsets: ['latin'], variable: '--font-alata' })

export const metadata: Metadata = {
  title: 'Metro Point Technology | Insurance Software Built by Agents',
  description: 'Insurance software built by an active agent with 30 years of experience. AMS, Commission Tracking, and CRM solutions designed for agencies and independent agents.',
  keywords: 'insurance software, agency management system, commission tracking, insurance CRM, agent tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${alata.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* AI Chat Widget for Product Inquiries */}
        <div id="mpt-chat-widget"></div>
        <Script 
          src="/js/mpt-chat-widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
