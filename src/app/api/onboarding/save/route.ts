import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isValidClientNumber } from '@/lib/client-number'
import { computeProgressPercent, questionsForTier, type Tier } from '@/lib/onboarding-questions'

/* ------------------------------------------------------------------ */
/* POST /api/onboarding/save                                           */
/*                                                                      */
/* Auto-save endpoint. Client sends the full responses object on each  */
/* meaningful change. Server merges with existing, filters to valid    */
/* question keys for the client's tier (drops any stray keys), writes  */
/* back, recomputes progress_percent.                                  */
/*                                                                      */
/* Body: { clientNumber: string, responses: Record<string,unknown> }   */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  let body: { clientNumber?: string; responses?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const rawCN = (body.clientNumber || '').trim().toUpperCase()
  if (!isValidClientNumber(rawCN)) {
    return NextResponse.json({ error: 'Invalid client number' }, { status: 400 })
  }
  if (!body.responses || typeof body.responses !== 'object') {
    return NextResponse.json({ error: 'responses object required' }, { status: 400 })
  }

  const sb = getSupabaseAdmin()

  const { data: customer, error: customerError } = await sb
    .from('aia_customers')
    .select('id, tier, onboarding_complete')
    .eq('client_number', rawCN)
    .maybeSingle()

  if (customerError) {
    return NextResponse.json({ error: customerError.message }, { status: 500 })
  }
  if (!customer) {
    return NextResponse.json({ error: 'Client number not found' }, { status: 404 })
  }
  if (customer.onboarding_complete) {
    return NextResponse.json({ error: 'Onboarding is already complete for this client' }, { status: 403 })
  }

  const tier = customer.tier as Tier
  const validKeys = new Set(questionsForTier(tier).map(q => q.key))

  // Filter responses to only valid keys for this tier — drops anything
  // the form client shouldn't have been able to send.
  const filtered: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(body.responses)) {
    if (validKeys.has(k)) filtered[k] = v
  }

  const progressPercent = computeProgressPercent(tier, filtered)

  // Upsert — the customer already has a row from the Stripe webhook, we
  // just overwrite responses and progress.
  const { error: upsertError } = await sb
    .from('aia_onboarding_responses')
    .update({
      responses: filtered,
      progress_percent: progressPercent,
      updated_at: new Date().toISOString(),
    })
    .eq('customer_id', customer.id)

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    progressPercent,
    savedAt: new Date().toISOString(),
  })
}
