import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isValidClientNumber } from '@/lib/client-number'
import { computeProgressPercent, questionsForTier, requiredKeysForTier, type Tier } from '@/lib/onboarding-questions'

/* ------------------------------------------------------------------ */
/* POST /api/onboarding/submit                                         */
/*                                                                      */
/* Final submission. Validates all required fields for the tier are    */
/* answered, flips is_submitted, writes onboarding_form_submitted_at,  */
/* and pings Discord via the webhook so Catalyst can pick up the card. */
/*                                                                      */
/* Body: { clientNumber: string, responses: Record<string,unknown> }   */
/* ------------------------------------------------------------------ */

const DISCORD_WEBHOOK_URL = process.env.DISCORD_ONBOARDING_WEBHOOK_URL || ''

async function pingDiscord(payload: { clientNumber: string; email: string; tier: string; customerId: string }) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('[onboarding-submit] DISCORD_ONBOARDING_WEBHOOK_URL not set, skipping ping')
    return
  }
  const body = {
    content: `🎯 **New onboarding form submitted** — ${payload.clientNumber}\n\n- Tier: **${payload.tier}**\n- Email: ${payload.email}\n- Customer ID: ${payload.customerId}\n\nAtlas + Catalyst — Mission Control card coming next. Pull the full responses from \`aia_onboarding_responses\` where \`client_number='${payload.clientNumber}'\`.`,
  }
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (err) {
    console.error('[onboarding-submit] Discord ping failed:', err)
  }
}

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
    .select('id, client_number, email, tier, onboarding_form_submitted_at')
    .eq('client_number', rawCN)
    .maybeSingle()

  if (customerError) {
    return NextResponse.json({ error: customerError.message }, { status: 500 })
  }
  if (!customer) {
    return NextResponse.json({ error: 'Client number not found' }, { status: 404 })
  }
  if (customer.onboarding_form_submitted_at) {
    return NextResponse.json({ error: 'Form has already been submitted for this client' }, { status: 409 })
  }

  const tier = customer.tier as Tier
  const validKeys = new Set(questionsForTier(tier).map(q => q.key))
  const required = requiredKeysForTier(tier)

  const filtered: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(body.responses)) {
    if (validKeys.has(k)) filtered[k] = v
  }

  // Validate required fields
  const missing = required.filter(k => {
    const v = filtered[k]
    if (v === undefined || v === null) return true
    if (typeof v === 'string') return v.trim().length === 0
    if (Array.isArray(v)) return v.length === 0
    return false
  })

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}`, missing },
      { status: 400 },
    )
  }

  const nowIso = new Date().toISOString()
  const progressPercent = computeProgressPercent(tier, filtered)

  // Update the responses row
  const { error: respError } = await sb
    .from('aia_onboarding_responses')
    .update({
      responses: filtered,
      progress_percent: progressPercent,
      is_submitted: true,
      submitted_at: nowIso,
      updated_at: nowIso,
    })
    .eq('customer_id', customer.id)

  if (respError) {
    return NextResponse.json({ error: respError.message }, { status: 500 })
  }

  // Mark the customer as having submitted
  await sb
    .from('aia_customers')
    .update({ onboarding_form_submitted_at: nowIso, updated_at: nowIso })
    .eq('id', customer.id)

  // Fire Discord notification (non-blocking on failure)
  await pingDiscord({
    clientNumber: customer.client_number,
    email: customer.email,
    tier,
    customerId: customer.id,
  })

  return NextResponse.json({
    ok: true,
    submittedAt: nowIso,
    clientNumber: customer.client_number,
  })
}
