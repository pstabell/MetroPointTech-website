/**
 * Discovery form question bank for AI Agent Teams onboarding.
 *
 * Single source of truth matching section 5 of
 * OPS/PRODUCTS/AI AGENTS/Master Plan.md.
 *
 * One form with progressive tier reveals:
 *   - Base section (all tiers): 15 questions
 *   - Unlock A (Tier 2 + Tier 3): +10 questions
 *   - Unlock B (Tier 3 only):    +15 questions
 *
 * Totals: Basic 15, Premium 25, Enterprise 40.
 */

export type Tier = 'basic' | 'premium' | 'enterprise'

export type QuestionType =
  | 'short-text'
  | 'long-text'
  | 'number'
  | 'select'
  | 'multi-select'
  | 'email'

export interface Question {
  key: string
  label: string
  type: QuestionType
  helper?: string
  placeholder?: string
  options?: string[]
  required?: boolean
  sectionKey: string
}

export interface Section {
  key: string
  title: string
  tier: 'base' | 'unlock-a' | 'unlock-b'
  description?: string
}

export const SECTIONS: Section[] = [
  { key: 'agency-basics', title: 'Agency basics', tier: 'base' },
  { key: 'your-systems', title: 'Your systems', tier: 'base' },
  { key: 'what-agent-does', title: 'What the agent should do', tier: 'base' },
  { key: 'interaction', title: 'How you want to interact', tier: 'base' },
  { key: 'advanced-workflows', title: 'Advanced workflows', tier: 'unlock-a' },
  { key: 'deeper-context', title: 'Deeper agency context', tier: 'unlock-a' },
  { key: 'three-agent', title: 'Three-agent architecture', tier: 'unlock-b' },
  { key: 'account-mgmt', title: 'Dedicated account management', tier: 'unlock-b' },
  { key: 'team-access', title: 'Team and access', tier: 'unlock-b' },
  { key: 'data-compliance', title: 'Data and compliance', tier: 'unlock-b' },
]

export const QUESTIONS: Question[] = [
  // ─── Base section — all tiers (15) ─────────────────────────────────────
  // Agency basics
  { key: 'agency_legal_name', label: 'Agency legal name', type: 'short-text', required: true, sectionKey: 'agency-basics' },
  { key: 'primary_location', label: 'Primary location (city, state)', type: 'short-text', required: true, sectionKey: 'agency-basics', placeholder: 'e.g. Cape Coral, FL' },
  { key: 'team_size', label: 'Team size', type: 'short-text', required: true, sectionKey: 'agency-basics', helper: 'Producers plus support staff', placeholder: 'e.g. 8 producers + 4 support' },
  { key: 'years_in_business', label: 'Years in business', type: 'number', required: true, sectionKey: 'agency-basics' },
  { key: 'primary_carriers', label: 'Primary carriers appointed with', type: 'long-text', required: true, sectionKey: 'agency-basics', helper: 'List all that apply, plus any others' },

  // Your systems
  { key: 'primary_ams', label: 'Primary agency management system', type: 'select', required: true, sectionKey: 'your-systems', options: ['Applied Epic', 'Vertafore AMS360', 'HawkSoft', 'EZLynx', 'NowCerts', 'AgencyZoom', 'Other'] },
  { key: 'second_platform', label: 'Second platform the agent should integrate with', type: 'long-text', required: true, sectionKey: 'your-systems', helper: 'Carrier portal, commission software, Google Drive, SharePoint, email inbox, or other', placeholder: 'e.g. QuickBooks for commission reconciliation' },
  { key: 'platform_access_method', label: 'How should the agent access each platform?', type: 'select', required: true, sectionKey: 'your-systems', options: ['API credentials', 'Login credentials', 'CSV imports', 'Email attachments', 'Mix — I will detail later'] },
  { key: 'platform_check_frequency', label: 'How often should the agent check those platforms?', type: 'select', required: true, sectionKey: 'your-systems', options: ['Real-time', 'Hourly', 'Daily', 'Weekly', 'On-demand only'] },

  // What the agent should do
  { key: 'top_3_tasks', label: 'Top 3 things you want the agent doing day one', type: 'long-text', required: true, sectionKey: 'what-agent-does' },
  { key: 'biggest_commission_pain', label: 'Biggest commission-related pain you want automated first', type: 'long-text', required: true, sectionKey: 'what-agent-does' },
  { key: 'recurring_task_to_automate', label: 'Any recurring task you spend 2+ hours per week on that you want fully automated?', type: 'long-text', sectionKey: 'what-agent-does' },

  // How you want to interact
  { key: 'preferred_comm_channel', label: 'Preferred communication channel for agent updates', type: 'select', required: true, sectionKey: 'interaction', options: ['Discord', 'Email', 'SMS', 'Slack'] },
  { key: 'direct_access_user', label: 'Who on your team gets direct access to the agent?', type: 'long-text', required: true, sectionKey: 'interaction', helper: 'Name, email, role' },
  { key: 'timezone_working_hours', label: 'Timezone and working hours for agent activity', type: 'short-text', required: true, sectionKey: 'interaction', placeholder: 'e.g. ET, 8am-6pm Mon-Fri' },

  // ─── Unlock A — Premium + Enterprise (+10) ─────────────────────────────
  // Advanced workflows
  { key: 'multi_step_workflow', label: 'A multi-step workflow that requires hand-offs between team members today', type: 'long-text', required: true, sectionKey: 'advanced-workflows' },
  { key: 'platforms_list_5', label: 'Up to 5 platforms — list each with priority (1-5) and access method', type: 'long-text', required: true, sectionKey: 'advanced-workflows' },
  { key: 'exception_handling', label: 'How should the agent handle exceptions it cannot resolve?', type: 'select', required: true, sectionKey: 'advanced-workflows', options: ['Queue for review', 'Escalate to named person', 'Pause workflow', 'Notify via Discord'] },
  { key: 'priority_escalation_contact', label: 'Priority support escalation contact at your agency', type: 'short-text', required: true, sectionKey: 'advanced-workflows', helper: 'Name + direct phone or email' },
  { key: 'weekly_metrics', label: 'Performance metrics you want reported weekly', type: 'long-text', required: true, sectionKey: 'advanced-workflows' },

  // Deeper agency context
  { key: 'commission_reconciliation_owner', label: 'Who owns your commission reconciliation today, and how many hours per week do they spend on it?', type: 'long-text', required: true, sectionKey: 'deeper-context' },
  { key: 'bad_month_end', label: 'Describe a bad month-end close you have had — what specifically went wrong?', type: 'long-text', required: true, sectionKey: 'deeper-context' },
  { key: 'renewal_vs_new_tracking', label: 'How do you currently track renewal commissions vs new-business commissions?', type: 'long-text', required: true, sectionKey: 'deeper-context' },
  { key: 'producer_payout_cycle', label: 'Average producer payout cycle', type: 'select', required: true, sectionKey: 'deeper-context', options: ['Weekly', 'Bi-weekly', 'Monthly', 'Other'] },
  { key: 'compliance_audit_requirements', label: 'Compliance or audit requirements we need to know about?', type: 'long-text', sectionKey: 'deeper-context', helper: 'Data retention, reporting formats, state-specific rules' },

  // ─── Unlock B — Enterprise only (+15) ──────────────────────────────────
  // Three-agent architecture
  { key: 'three_agent_roles', label: 'You get 3 agents — what role does each play?', type: 'long-text', required: true, sectionKey: 'three-agent', helper: 'Commission, renewal, reporting, producer support, or something else' },
  { key: 'agents_share_context', label: 'Should the 3 agents share context or run independently?', type: 'select', required: true, sectionKey: 'three-agent', options: ['Share context', 'Run independently', 'Not sure yet'] },
  { key: 'platforms_list_10', label: 'Up to 10 platforms — list all 10 with integration priority and access method', type: 'long-text', required: true, sectionKey: 'three-agent' },
  { key: 'unique_workflow', label: 'Describe any workflow unique to your agency', type: 'long-text', sectionKey: 'three-agent', helper: 'Something another agency wouldn\'t have' },

  // Dedicated account management
  { key: 'account_sync_cadence', label: 'How often do you want a standing sync with your account manager?', type: 'select', required: true, sectionKey: 'account-mgmt', options: ['Weekly', 'Bi-weekly', 'Monthly', 'Ad-hoc only'] },
  { key: 'account_comm_style', label: 'Preferred communication style for account reviews', type: 'select', required: true, sectionKey: 'account-mgmt', options: ['Video call', 'Async doc', 'In-person visit', 'Mix'] },
  { key: 'quarterly_review_focus', label: 'Quarterly strategy review — what do you want reviewed?', type: 'long-text', required: true, sectionKey: 'account-mgmt', helper: 'Performance, cost savings, new automations, roadmap' },

  // Team and access
  { key: 'team_interacting_count', label: 'How many people at your agency will interact with the agents directly?', type: 'number', required: true, sectionKey: 'team-access' },
  { key: 'team_roles_and_contacts', label: 'Roles and contact info for each person', type: 'long-text', required: true, sectionKey: 'team-access' },
  { key: 'role_based_permissions', label: 'Role-based permissions needed?', type: 'select', required: true, sectionKey: 'team-access', options: ['Yes — read-only, write, admin', 'Yes — custom scheme', 'No, same access for everyone'] },
  { key: 'it_security_contact', label: 'Dedicated IT or security contact for integrations', type: 'short-text', required: true, sectionKey: 'team-access', helper: 'Name + email' },

  // Data and compliance
  { key: 'data_retention_policy', label: 'Data retention policy — how long should the agent retain records, emails, logs?', type: 'long-text', required: true, sectionKey: 'data-compliance' },
  { key: 'compliance_requirements', label: 'Specific compliance requirements', type: 'long-text', sectionKey: 'data-compliance', helper: 'State insurance regs, HIPAA, PII handling' },
  { key: 'backup_export_format', label: 'Preferred backup and export format for agent data', type: 'select', required: true, sectionKey: 'data-compliance', options: ['CSV', 'JSON', 'XLSX', 'PDF', 'Other'] },
  { key: 'platforms_to_exclude', label: 'Platforms you do NOT want any agent to touch', type: 'long-text', sectionKey: 'data-compliance' },
]

export function questionsForTier(tier: Tier): Question[] {
  return QUESTIONS.filter(q => {
    const section = SECTIONS.find(s => s.key === q.sectionKey)
    if (!section) return false
    if (section.tier === 'base') return true
    if (section.tier === 'unlock-a') return tier === 'premium' || tier === 'enterprise'
    if (section.tier === 'unlock-b') return tier === 'enterprise'
    return false
  })
}

export function sectionsForTier(tier: Tier): Section[] {
  return SECTIONS.filter(s => {
    if (s.tier === 'base') return true
    if (s.tier === 'unlock-a') return tier === 'premium' || tier === 'enterprise'
    if (s.tier === 'unlock-b') return tier === 'enterprise'
    return false
  })
}

export function requiredKeysForTier(tier: Tier): string[] {
  return questionsForTier(tier).filter(q => q.required).map(q => q.key)
}

export function computeProgressPercent(tier: Tier, responses: Record<string, unknown>): number {
  const required = requiredKeysForTier(tier)
  if (required.length === 0) return 0
  const answered = required.filter(k => {
    const v = responses[k]
    if (v === undefined || v === null) return false
    if (typeof v === 'string') return v.trim().length > 0
    if (Array.isArray(v)) return v.length > 0
    return true
  }).length
  return Math.round((answered / required.length) * 100)
}
