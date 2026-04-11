import sgMail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
const FROM_EMAIL = 'onboarding@send.mptams.com'
const FROM_NAME = 'Metro Point Technology'
const SUPPORT_CC = 'support@metropointtech.com'

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY)

const TIER_DETAILS: Record<'basic' | 'premium' | 'enterprise', { name: string; agents: number; platforms: number; setupHours: number; monthlyHours: number }> = {
  basic: { name: 'AI Agent Basic', agents: 1, platforms: 2, setupHours: 4, monthlyHours: 1 },
  premium: { name: 'AI Agent Premium', agents: 1, platforms: 5, setupHours: 8, monthlyHours: 2 },
  enterprise: { name: 'AI Agent Enterprise', agents: 3, platforms: 10, setupHours: 20, monthlyHours: 4 },
}

export async function sendWelcomeEmail(params: {
  to: string
  clientNumber: string
  tier: 'basic' | 'premium' | 'enterprise'
  onboardingFormUrl: string
}) {
  if (!SENDGRID_API_KEY) {
    console.warn('[onboarding-email] SENDGRID_API_KEY not set, skipping send')
    return
  }

  const tier = TIER_DETAILS[params.tier]
  const subject = `Welcome to Metro Point Technology — your client number is ${params.clientNumber}`

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f5f5f7; color: #1a1a1a;">
  <div style="background: linear-gradient(135deg, #003B5C 0%, #001F33 100%); color: #ffffff; padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 700;">Welcome to Metro Point Technology</h1>
    <p style="margin: 0; font-size: 16px; color: #c8dce9;">Your AI Agent Team is about to come to life.</p>
  </div>

  <div style="background-color: #ffffff; padding: 40px; border-radius: 0 0 16px 16px;">
    <p style="margin: 0 0 20px; font-size: 16px;">Thank you for choosing <strong>${tier.name}</strong>. We are excited to get your agents running.</p>

    <div style="background-color: #f8f9fb; border-left: 4px solid #D4AF37; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8899a6;">Your client number</p>
      <p style="margin: 0; font-size: 24px; font-weight: 700; color: #003B5C; font-family: 'SF Mono', Consolas, monospace;">${params.clientNumber}</p>
      <p style="margin: 8px 0 0; font-size: 13px; color: #4a5568;">Save this number. You will use it to access your discovery form and track your onboarding.</p>
    </div>

    <h2 style="margin: 32px 0 12px; font-size: 18px; color: #003B5C;">Your plan includes</h2>
    <ul style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
      <li>${tier.agents} dedicated AI agent${tier.agents > 1 ? 's' : ''}</li>
      <li>Up to ${tier.platforms} platform integrations</li>
      <li>${tier.setupHours} hours of setup and configuration</li>
      <li>${tier.monthlyHours} hour${tier.monthlyHours > 1 ? 's' : ''} of monthly training and optimization with Patrick Stabell</li>
    </ul>

    <h2 style="margin: 32px 0 12px; font-size: 18px; color: #003B5C;">What happens next</h2>
    <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.75;">
      <li><strong>Fill out your discovery form</strong> using the button below. It takes about 15 minutes for Basic, 25 minutes for Premium, 40 minutes for Enterprise. You can save your progress and come back anytime using your client number.</li>
      <li><strong>We review your responses</strong> and prep a training call with Patrick, matched to your agency's specific needs.</li>
      <li><strong>Patrick runs your first training hour</strong> — covering how the agent works, what it will do for you, and how to get the most out of it day one.</li>
      <li><strong>We wire up your agent(s)</strong> to your platforms and turn them on. You will get a confirmation email the moment your agents go live.</li>
    </ol>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${params.onboardingFormUrl}" style="display: inline-block; background-color: #D4AF37; color: #003B5C; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">Start your discovery form</a>
    </div>

    <p style="margin: 24px 0 0; font-size: 13px; color: #8899a6; border-top: 1px solid #e4e4e7; padding-top: 16px;">
      Questions? Reply to this email or write to <a href="mailto:support@metropointtech.com" style="color: #003B5C;">support@metropointtech.com</a>.
      Metro Point Technology, Cape Coral, Florida. Your client number is <strong>${params.clientNumber}</strong> — keep it somewhere you can find it.
    </p>
  </div>
</body>
</html>`.trim()

  await sgMail.send({
    to: params.to,
    cc: SUPPORT_CC,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    replyTo: { email: SUPPORT_CC, name: 'Metro Point Technology Support' },
    subject,
    html,
  })
}
