import type { Metadata } from 'next'
import { Inter, Alata } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const alata = Alata({ weight: '400', subsets: ['latin'], variable: '--font-alata' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aamshub.com'),
  title: {
    default: 'Metro Point Technology | Autonomous Insurance Software',
    template: '%s | Metro Point Technology',
  },
  description: 'AAMS — the autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations built by an active agent with 30 years of experience.',
  keywords: 'AAMS, autonomous agency management system, agentic AI, zero-touch operations, insurance software, commission tracking, insurance CRM',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Metro Point Technology',
    title: 'Metro Point Technology | Autonomous Insurance Software',
    description: 'AAMS — the autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations built by an active agent with 30 years of experience.',
    url: 'https://aamshub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metro Point Technology | Autonomous Insurance Software',
    description: 'AAMS — the autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations built by an active agent with 30 years of experience.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.aamshub.com/#organization',
      name: 'Metro Point Technology',
      url: 'https://www.aamshub.com',
      logo: 'https://www.aamshub.com/logo.svg',
      description:
        'Autonomous insurance agency software built by an active agent with 30 years of experience. AAMS delivers zero-touch commission reconciliation, agentic workflows, and autonomous operations.',
      founder: { '@type': 'Person', name: 'Patrick Stabell' },
      areaServed: { '@type': 'Country', name: 'United States' },
      sameAs: ['https://github.com/pstabell'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.aamshub.com/#website',
      url: 'https://www.aamshub.com',
      name: 'Metro Point Technology',
      publisher: { '@id': 'https://www.aamshub.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'AAMS — Autonomous Agency Management System',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.aamshub.com/AAMS',
      description:
        'Autonomous agency management system for insurance agencies and independent agents — zero-touch commission reconciliation, agent and policy management, and AI-powered CRM.',
      publisher: { '@id': 'https://www.aamshub.com/#organization' },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <Analytics />
        <SpeedInsights />
        {/* Google Analytics 4 — property "aamshub.com" */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHVH1EHVX1"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZHVH1EHVX1');
        `}</Script>
        <Script id="mkt-hub-analytics" strategy="afterInteractive">{`
          (function(){
            var d='https://mpt-marketing-hub.vercel.app/api/analytics/drain';
            try{
              var q=new URLSearchParams(location.search);
              if(q.get('mpt_internal')==='1'){localStorage.setItem('mpt_internal','1');console.log('[mpt] internal traffic opt-out enabled for this browser')}
              if(q.get('mpt_internal')==='0'){localStorage.removeItem('mpt_internal');console.log('[mpt] internal traffic opt-out cleared')}
            }catch(e){}
            function isInternal(){try{return localStorage.getItem('mpt_internal')==='1'}catch(e){return false}}
            function send(){
              if(isInternal())return;
              try{navigator.sendBeacon(d,JSON.stringify([{
                eventType:'pageview',path:location.pathname,
                origin:location.origin,referrer:document.referrer||'',
                queryParams:location.search||'',
                timestamp:Date.now(),
                projectId:'metropointtech',
                deviceType:/Mobi/i.test(navigator.userAgent)?'mobile':'desktop',
                vercelEnvironment:'production'
              }]))}catch(e){}
            }
            send();
            var pushState=history.pushState;
            history.pushState=function(){pushState.apply(this,arguments);send()};
            window.addEventListener('popstate',send);
          })();
        `}</Script>
      </body>
    </html>
  )
}
