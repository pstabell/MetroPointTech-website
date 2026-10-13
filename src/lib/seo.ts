import type { Metadata } from 'next'

// The site card built from the approved wordmark (src/app/opengraph-image.png). A page-level openGraph object replaces
// the root one in Next 14, images included, so every page built with pageMetadata names it explicitly.
export const OG_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'Agenient - Autonomous Insurance Software',
}

type PageSeo = {
  /** Page title without the brand; the root template adds " | Agenient". */
  title: string
  description: string
  /** Path of the page, e.g. '/AAMS'. Used for the canonical and og:url. */
  path: string
  /** Absolute title (no template), for the home page. */
  absoluteTitle?: boolean
  /** Canonical on another site (a page whose main copy lives there). Defaults to the page's own path. */
  canonical?: string
  keywords?: string
}

// One place for title, description, canonical, Open Graph and Twitter. Pages that set only title and description
// used to inherit the home page's og:title, og:description and og:url (SEO audit 2026-10-13).
export function pageMetadata(p: PageSeo): Metadata {
  const fullTitle = p.absoluteTitle ? p.title : `${p.title} | Agenient`
  return {
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description: p.description,
    ...(p.keywords ? { keywords: p.keywords } : {}),
    alternates: { canonical: p.canonical ?? p.path },
    openGraph: {
      type: 'website',
      siteName: 'Agenient',
      title: fullTitle,
      description: p.description,
      url: p.canonical ?? p.path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: p.description,
      images: [OG_IMAGE.url],
    },
  }
}
