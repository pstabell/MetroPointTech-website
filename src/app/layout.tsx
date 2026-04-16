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
  title: 'Metro Point Technology | Autonomous Insurance Software',
  description: 'AAMS — the autonomous evolution of legacy AMS platforms. Zero-touch commission reconciliation, agentic workflows, and autonomous operations built by an active agent with 30 years of experience.',
  keywords: 'AAMS, autonomous agency management system, agentic AI, zero-touch operations, insurance software, commission tracking, insurance CRM',
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
        <Analytics />
        <SpeedInsights />
        <Script id="mkt-hub-analytics" strategy="afterInteractive">{`
          (function(){
            var d='https://mpt-marketing-hub.vercel.app/api/analytics/drain';
            function send(){
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
