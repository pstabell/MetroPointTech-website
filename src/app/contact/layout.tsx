import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Metro Point Technology. Questions about Agenient AAMS, the agent commission tracker, or our autonomous insurance software — we respond personally.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Metro Point Technology',
    description: 'Get in touch with Metro Point Technology about Agenient AAMS or our autonomous insurance software.',
    url: 'https://aamshub.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
