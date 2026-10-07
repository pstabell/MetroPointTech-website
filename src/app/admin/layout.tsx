import type { Metadata } from 'next'

// Not a public page: keep it out of search engines and AI assistants (also disallowed in robots.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function NoIndexLayout({ children }: { children: React.ReactNode }) {
  return children
}
