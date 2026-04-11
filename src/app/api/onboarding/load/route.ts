import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isValidClientNumber } from '@/lib/client-number'
import { questionsForTier, sectionsForTier, type Tier } from '@/lib/onboarding-questions'

/* ------------------------------------------------------------------ */
/* POST /api/onboarding/load                                           */
/*                                                                      */
/* Client provides their client number. Returns their customer record, */
/* tier, current responses, and the tier-filtered question bank so the */
/* form knows what to render.                                           */
/*                                                                      */
/* Body: { clientNumber: string }                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  let body: { clientNumber?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const rawCN = (body.clientNumber || '').trim().toUpperCase()
  if (!isValidClientNumber(rawCN)) {
    return NextResponse.json(
      { error: 'Invalid client number. Format: MPT-XXXXXX' },
      { status: 400 },
    )
  }

  const sb = getSupabaseAdmin()

  const { data: customer, error: customerError } = await sb
    .from('aia_customers')
    .select('id, client_number, email, name, tier, onboarding_complete, onboarding_form_submitted_at')
    .eq('client_number', rawCN)
    .maybeSingle()

  if (customerError) {
    return NextResponse.json({ error: customerError.message }, { status: 500 })
  }
  if (!customer) {
    return NextResponse.json({ error: 'Client number not found. Double-check the number in your welcome email.' }, { status: 404 })
  }

  const tier = customer.tier as Tier

  const { data: responsesRow, error: respError } = await sb
    .from('aia_onboarding_responses')
    .select('responses, progress_percent, is_submitted, submitted_at')
    .eq('customer_id', customer.id)
    .maybeSingle()

  if (respError) {
    return NextResponse.json({ error: respError.message }, { status: 500 })
  }

  const questions = questionsForTier(tier)
  const sections = sectionsForTier(tier)

  return NextResponse.json({
    customer: {
      clientNumber: customer.client_number,
      email: customer.email,
      name: customer.name,
      tier,
      onboardingComplete: customer.onboarding_complete,
      onboardingFormSubmittedAt: customer.onboarding_form_submitted_at,
    },
    responses: responsesRow?.responses || {},
    progressPercent: responsesRow?.progress_percent || 0,
    isSubmitted: responsesRow?.is_submitted || false,
    submittedAt: responsesRow?.submitted_at || null,
    sections,
    questions,
  })
}
