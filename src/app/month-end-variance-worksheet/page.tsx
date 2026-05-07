import type { Metadata } from 'next'
import FreeToolPage from '@/components/FreeToolPage'

export const metadata: Metadata = {
  title: 'Month-End Variance Worksheet | Free Insurance Agency Tool | Metro Point Technology',
  description: 'A free month-end variance worksheet for insurance agencies to spot commission, premium, receivable, and carrier statement exceptions before close.',
}

export default function MonthEndVarianceWorksheetPage() {
  return (
    <FreeToolPage
      eyebrow="FREE INSURANCE AGENCY TOOL"
      title="Month-End Variance Worksheet"
      description="Close the month with fewer surprises. Use this worksheet to compare expected commission, carrier statements, deposits, receivables, and agency production before small variances turn into revenue leakage."
      primaryCta="Use the Worksheet"
      secondaryCta="Automate This in AAMS"
      stats={[
        { value: '5 Steps', label: 'Month-End Review Flow' },
        { value: 'Carrier', label: 'Statement Reconciliation' },
        { value: 'Premium', label: 'Production Variance Check' },
        { value: 'AAMS', label: 'Automation Ready' },
      ]}
      toolTitle="A simple close process for agency financial control"
      toolIntro="Run this worksheet before finalizing the month. It gives producers, account managers, and agency owners a shared checklist for finding mismatches between what was written, what was billed, what was deposited, and what was paid."
      steps={[
        {
          label: 'STEP 1',
          title: 'Pull the expected month',
          body: 'Export new business, renewals, endorsements, cancellations, agency bill receivables, and carrier commission statements for the same period.',
        },
        {
          label: 'STEP 2',
          title: 'Compare the money path',
          body: 'Match written premium to billed premium, deposits to statements, commission paid to commission expected, and open balances to receivables.',
        },
        {
          label: 'STEP 3',
          title: 'Assign every exception',
          body: 'Every variance needs an owner, a next action, and a due date so the month-end close does not become a pile of unresolved notes.',
        },
      ]}
      worksheetTitle="Variance worksheet"
      worksheetItems={[
        'List all carrier statements received for the close period and mark any missing statements.',
        'Compare policy-level commission paid against expected commission percentage and agency split rules.',
        'Flag premium changes from endorsements, audits, cancellations, reinstatements, and rewrites.',
        'Match agency bill deposits to open receivables and note partial payments or unapplied cash.',
        'Separate timing differences from true errors so next month does not inherit stale noise.',
        'Record variance owner, corrective action, due date, and current status before closing the period.',
      ]}
      checklistTitle="Month-end review checklist"
      checklistItems={[
        'All carrier statements for the month are downloaded and saved.',
        'Every unmatched commission line has been reviewed or assigned.',
        'Agency bill receivables match deposit records or have documented exceptions.',
        'Producer splits and agency splits were checked on new business and renewals.',
        'Open exceptions are documented with owner, action, and follow-up date.',
        'Final month-end variance total is reviewed by the agency owner or finance lead.',
      ]}
      proofTitle="Why agencies use this worksheet"
      proofItems={[
        {
          title: 'Find leakage sooner',
          body: 'Commission errors are easier to recover when the statement, deposit, and policy record are reviewed in the same close cycle.',
        },
        {
          title: 'Create accountability',
          body: 'A variance without an owner is just another recurring close problem. This worksheet forces assignment before the month is closed.',
        },
        {
          title: 'Prepare for automation',
          body: 'AAMS turns this review into an operating workflow by reconciling carrier statements, commissions, and exceptions automatically.',
        },
      ]}
      finalHeadline="Stop closing the month blind"
      finalBody="Use the worksheet manually today, then let AAMS automate commission reconciliation, exception routing, and agency operations going forward."
    />
  )
}
