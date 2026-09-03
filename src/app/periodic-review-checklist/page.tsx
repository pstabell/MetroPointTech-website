import type { Metadata } from 'next'
import FreeToolPage from '@/components/FreeToolPage'

export const metadata: Metadata = {
  title: 'Periodic Review Checklist | Free Insurance Agency Tool',
  description: 'A free periodic review checklist for insurance agencies to keep renewals, remarkets, client follow-ups, and operational reviews on schedule.',
  alternates: { canonical: '/periodic-review-checklist' },
}

export default function PeriodicReviewChecklistPage() {
  return (
    <FreeToolPage
      eyebrow="FREE INSURANCE AGENCY TOOL"
      title="Periodic Review Checklist"
      description="Keep client reviews, renewals, remarkets, policy cleanup, and service follow-ups from slipping through the cracks. This checklist gives your agency a repeatable operating rhythm."
      primaryCta="Use the Checklist"
      secondaryCta="Automate This in Agenient AAMS"
      stats={[
        { value: '90 Days', label: 'Renewal Review Window' },
        { value: 'Client', label: 'Coverage Conversation' },
        { value: 'Policy', label: 'Data Quality Check' },
        { value: 'Agenient AAMS', label: 'Follow-Up Automation' },
      ]}
      toolTitle="A recurring review rhythm for insurance agencies"
      toolIntro="Use this checklist weekly, monthly, or before renewals. It gives your team a standard way to review upcoming policy events, client needs, remarketing decisions, missing data, and follow-up ownership."
      steps={[
        {
          label: 'STEP 1',
          title: 'Identify accounts due for review',
          body: 'Pull renewals, high-value accounts, policy changes, open service requests, and clients without a recent coverage conversation.',
        },
        {
          label: 'STEP 2',
          title: 'Review risk and service signals',
          body: 'Look for coverage gaps, premium jumps, claims activity, missing documents, stale contact data, and accounts needing remarketing.',
        },
        {
          label: 'STEP 3',
          title: 'Schedule the next action',
          body: 'Assign the call, email, remarket, certificate request, renewal review, or policy cleanup task before the review meeting ends.',
        },
      ]}
      worksheetTitle="Review worksheet"
      worksheetItems={[
        'List policies renewing in the next 90 days and mark accounts that need producer review.',
        'Identify clients with premium increases, coverage changes, recent claims, or missing contact data.',
        'Confirm whether each account needs remarketing, coverage review, cross-sell review, or simple renewal follow-up.',
        'Record open service issues, certificate needs, billing problems, and document gaps by account.',
        'Assign each follow-up to a producer, account manager, or service team member.',
        'Set the next review date so every client has a clear cadence instead of random outreach.',
      ]}
      checklistTitle="Periodic review checklist"
      checklistItems={[
        'Upcoming renewals reviewed for premium, coverage, and remarketing needs.',
        'Client contact information and decision-maker records are current.',
        'Coverage gaps, missing policies, or cross-sell opportunities are documented.',
        'Open service issues are assigned with due dates.',
        'Accounts needing client calls or renewal meetings have scheduled next steps.',
        'Review outcomes are recorded so the next cycle starts with clean context.',
      ]}
      proofTitle="Why agencies use this checklist"
      proofItems={[
        {
          title: 'Prevent renewal surprises',
          body: 'Reviewing accounts before renewal pressure hits gives producers time to explain changes, remarket when needed, and protect retention.',
        },
        {
          title: 'Standardize follow-up',
          body: 'A repeatable checklist keeps service, sales, and operations aligned on what needs attention and who owns the next move.',
        },
        {
          title: 'Turn reviews into workflow',
          body: 'Agenient AAMS helps convert review outcomes into tasks, reminders, renewal actions, and operational follow-up without manual tracking.',
        },
      ]}
      finalHeadline="Make every review cycle intentional"
      finalBody="Use the checklist manually today, then let Agenient AAMS automate client review workflows, renewal follow-up, and agency operating rhythm."
    />
  )
}
