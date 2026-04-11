-- AI Agent Teams — Onboarding Infrastructure Tables
-- =======================================================
-- Two new tables to support the full post-purchase onboarding flow:
--   1. aia_customers — one row per AI Agent Teams customer, keyed by client_number
--   2. aia_onboarding_responses — the discovery form submissions + save-for-later progress
--
-- Table prefix `aia_` stands for "AI Agent" so these stay distinct from
-- mc_ (Mission Control), mkt_ (Marketing Hub), and eos_ (EOS/Traction) tables.

-- ─── aia_customers ───────────────────────────────────────────────────────────
-- One row per customer purchase. Client number is the primary client-facing key
-- the customer sees in every onboarding email, and is what they enter on the
-- discovery form to access their save-for-later progress.

CREATE TABLE IF NOT EXISTS aia_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_number TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'premium', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_checkout_session_id TEXT,
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  welcome_email_sent_at TIMESTAMPTZ,
  onboarding_form_submitted_at TIMESTAMPTZ,
  first_training_scheduled_at TIMESTAMPTZ,
  first_training_at TIMESTAMPTZ,
  agent_live_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_aia_customers_client_number ON aia_customers (client_number);
CREATE INDEX IF NOT EXISTS idx_aia_customers_email ON aia_customers (email);
CREATE INDEX IF NOT EXISTS idx_aia_customers_stripe_customer_id ON aia_customers (stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_aia_customers_onboarding_complete ON aia_customers (onboarding_complete);

COMMENT ON TABLE aia_customers IS 'AI Agent Teams customers. Created on successful Stripe checkout. Client number is the primary client-facing identifier.';
COMMENT ON COLUMN aia_customers.client_number IS 'MPT-XXXXXX where X is 6 random alphanumeric. Not sequential. Appears in every onboarding email.';
COMMENT ON COLUMN aia_customers.onboarding_complete IS 'When true, stops CCing support@metropointtech.com on outbound emails for this customer. Flip this when the "your agent is live" email fires.';

-- ─── aia_onboarding_responses ────────────────────────────────────────────────
-- The discovery form data. One row per customer. Auto-saved as the client
-- fills in fields. is_submitted flips to true when the client hits Submit.

CREATE TABLE IF NOT EXISTS aia_onboarding_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES aia_customers(id) ON DELETE CASCADE,
  client_number TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'premium', 'enterprise')),
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  is_submitted BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (customer_id)
);

CREATE INDEX IF NOT EXISTS idx_aia_onboarding_responses_client_number ON aia_onboarding_responses (client_number);
CREATE INDEX IF NOT EXISTS idx_aia_onboarding_responses_is_submitted ON aia_onboarding_responses (is_submitted);

COMMENT ON TABLE aia_onboarding_responses IS 'Discovery form submissions for AI Agent customers. One row per customer. Auto-saved during form fill.';
COMMENT ON COLUMN aia_onboarding_responses.responses IS 'JSONB map of question key → answer value. Keys correspond to the question bank defined in OPS/PRODUCTS/AI AGENTS/Master Plan.md section 5.';
COMMENT ON COLUMN aia_onboarding_responses.progress_percent IS 'Informational progress indicator shown to the client during form fill. Computed by the /api/onboarding/save endpoint as (answered_questions / required_questions_for_tier) * 100.';
