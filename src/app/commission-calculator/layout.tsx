import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commission Calculator',
  description: 'Free commission calculator for insurance agents. Compare expected vs actual carrier commission, surface underpayments, and quantify revenue leakage on every policy.',
  alternates: { canonical: '/commission-calculator' },
  openGraph: {
    title: 'Commission Calculator | Metro Point Technology',
    description: 'Free commission calculator for insurance agents. Compare expected vs actual carrier commission and surface underpayments.',
    url: 'https://aamshub.com/commission-calculator',
  },
}

export default function CommissionCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
