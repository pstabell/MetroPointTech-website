import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateClientNumber } from '@/lib/client-number'
import { sendWelcomeEmail } from '@/lib/onboarding-email'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

/* ------------------------------------------------------------------ */
/* POST /api/stripe/onboarding-complete                                */
/*                                                                      */
/* Stripe webhook handler for successful AI Agent Teams checkouts.     */
/* On checkout.session.completed:                                       */
/*   1. Generate a unique client number (MPT-XXXXXX)                   */
/*   2. Insert a new row into aia_customers                            */
/*   3. Insert an empty aia_onboarding_responses shell                 */
/*   4. Send the welcome + next-steps email via SendGrid               */
/*   5. Mark welcome_email_sent_at                                      */
/*                                                                      */
/* Configure the webhook URL in Stripe dashboard and set the secret as */
/* STRIPE_WEBHOOK_SECRET_ONBOARDING env var.                            */
/* ------------------------------------------------------------------ */

// Lazy Stripe init — a module-scope `new Stripe('')` throws at BUILD time when STRIPE_SECRET_KEY is
// absent (e.g. Preview deploys), failing the build. Instantiate per request; runtime is unchanged.
function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-03-25.dahlia',
  })
}

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET_ONBOARDING || ''

function siteOrigin(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin || 'https://www.aamshub.com'
}

function tierFromSessionMetadata(session: Stripe.Checkout.Session): 'basic' | 'premium' | 'enterprise' | null {
  const metaPlan = session.metadata?.plan
  if (metaPlan === 'basic' || metaPlan === 'premium' || metaPlan === 'enterprise') return metaPlan
  return null
}

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET_ONBOARDING not configured' }, { status: 500 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const rawBody = await req.text()

  const stripe = getStripe()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // We only care about successful checkouts for AI Agent Teams plans.
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const tier = tierFromSessionMetadata(session)
  if (!tier) {
    return NextResponse.json({ received: true, ignored: 'No AI Agent tier in session metadata' })
  }

  const email = session.customer_details?.email || session.customer_email
  if (!email) {
    console.error('[stripe-webhook] No email on checkout session', session.id)
    return NextResponse.json({ error: 'No email on session' }, { status: 400 })
  }

  const name = session.customer_details?.name || null

  const sb = getSupabaseAdmin()

  // Idempotency — if we already created a customer for this checkout session, skip.
  const { data: existing } = await sb
    .from('aia_customers')
    .select('id, client_number')
    .eq('stripe_checkout_session_id', session.id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ received: true, duplicate: true, client_number: existing.client_number })
  }

  // Generate a client number, retrying up to 5 times if we hit a collision
  // on the UNIQUE constraint (extremely unlikely at 32^6 = ~1B space).
  let clientNumber = ''
  let insertedCustomer: { id: string; client_number: string } | null = null
  for (let attempt = 0; attempt < 5; attempt++) {
    clientNumber = generateClientNumber()
    const { data, error } = await sb
      .from('aia_customers')
      .insert({
        client_number: clientNumber,
        email,
        name,
        tier,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
        stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        stripe_checkout_session_id: session.id,
      })
      .select('id, client_number')
      .single()

    if (!error && data) {
      insertedCustomer = data
      break
    }

    // 23505 = unique_violation in Postgres — retry with a new number
    if (error && (error as { code?: string }).code === '23505') {
      continue
    }

    console.error('[stripe-webhook] aia_customers insert error:', error)
    return NextResponse.json({ error: error?.message || 'Insert failed' }, { status: 500 })
  }

  if (!insertedCustomer) {
    return NextResponse.json({ error: 'Could not generate a unique client number after 5 tries' }, { status: 500 })
  }

  // Seed the onboarding responses row so /onboarding lookups succeed
  const { error: responsesError } = await sb
    .from('aia_onboarding_responses')
    .insert({
      customer_id: insertedCustomer.id,
      client_number: insertedCustomer.client_number,
      tier,
      responses: {},
      progress_percent: 0,
      is_submitted: false,
    })

  if (responsesError) {
    console.error('[stripe-webhook] aia_onboarding_responses seed error:', responsesError)
    // Non-fatal — customer exists, they can still access the form
  }

  // Send welcome + next steps email
  const origin = siteOrigin(req)
  const onboardingFormUrl = `${origin}/onboarding?cn=${encodeURIComponent(insertedCustomer.client_number)}`

  try {
    await sendWelcomeEmail({
      to: email,
      clientNumber: insertedCustomer.client_number,
      tier,
      onboardingFormUrl,
    })

    await sb
      .from('aia_customers')
      .update({ welcome_email_sent_at: new Date().toISOString() })
      .eq('id', insertedCustomer.id)
  } catch (err) {
    console.error('[stripe-webhook] Welcome email send failed:', err)
    // Don't fail the webhook — customer is created, we can retry email manually
  }

  return NextResponse.json({
    received: true,
    client_number: insertedCustomer.client_number,
    customer_id: insertedCustomer.id,
  })
}
