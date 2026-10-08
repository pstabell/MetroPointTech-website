'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Microsoft Clarity analytics (Patrick, 2026-10-07). Public pages only: admin, customer onboarding and
// checkout are left out (the same non-public routes robots.ts disallows). Disclosed in the privacy
// policy, section 2.3.
const CLARITY_PROJECT_ID = 'yu589yeh4i'
const EXCLUDED_PREFIXES = ['/admin', '/onboarding', '/checkout']

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
  }
}

function isExcluded(pathname: string) {
  return EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'))
}

export default function MicrosoftClarity() {
  const excluded = isExcluded(usePathname() ?? '/')

  // A visitor who opens a public page and then moves into an excluded page without a full reload would
  // still be recorded, so Clarity is stopped there (it stays off until the next full page load).
  useEffect(() => {
    if (!excluded) return
    try {
      window.clarity?.('stop')
    } catch {
      // Clarity not loaded or blocked: nothing to stop.
    }
  }, [excluded])

  if (excluded) return null

  return (
    // lazyOnload: Clarity starts once the page has finished loading, so it never competes with the first render on a
    // phone (SEO audit 2026-10-08, item 20). Google Analytics in layout.tsx loads the same way.
    <Script id="microsoft-clarity" strategy="lazyOnload">{`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
    `}</Script>
  )
}
