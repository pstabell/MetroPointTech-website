import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

/* ------------------------------------------------------------------ */
/* POST /api/checkout                                                  */
/* Creates a Stripe Checkout session for AI Agent Teams plans.         */
/* Body: { plan: 'basic' | 'premium', email: string }                 */
/* ------------------------------------------------------------------ */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia',
})

const PLANS: Record<string, { monthly: string; setup: string; name: string }> = {
  basic: {
    monthly: process.env.STRIPE_PRICE_AI_BASIC_MONTHLY || '',
    setup: process.env.STRIPE_PRICE_AI_BASIC_SETUP || '',
    name: 'AI Agent Basic',
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_AI_PREMIUM_MONTHLY || '',
    setup: process.env.STRIPE_PRICE_AI_PREMIUM_SETUP || '',
    name: 'AI Agent Premium',
  },
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { plan, email } = body as { plan?: string; email?: string }

  if (!plan || !PLANS[plan]) {
    return NextResponse.json({ error: 'Invalid plan. Must be basic or premium.' }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const planConfig = PLANS[plan]

  if (!planConfig.monthly || !planConfig.setup) {
    return NextResponse.json({ error: 'Stripe prices not configured.' }, { status: 500 })
  }

  // Find or create Stripe customer
  const customers = await stripe.customers.list({ email, limit: 1 })
  let customerId: string
  if (customers.data.length > 0) {
    customerId = customers.data[0].id
  } else {
    const customer = await stripe.customers.create({ email })
    customerId = customer.id
  }

  const origin = req.nextUrl.origin

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [
      { price: planConfig.monthly, quantity: 1 },
      { price: planConfig.setup, quantity: 1 },
    ],
    subscription_data: {
      metadata: { plan: plan, product: 'ai_agent_teams' },
    },
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    success_url: `${origin}/checkout/success?plan=${plan}`,
    cancel_url: `${origin}/checkout/cancelled`,
    metadata: { plan, product: 'ai_agent_teams' },
  })

  return NextResponse.json({ url: session.url })
}
