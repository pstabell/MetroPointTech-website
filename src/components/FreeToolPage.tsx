import Image from 'next/image'

type ToolStep = {
  label: string
  title: string
  body: string
}

type ToolPageProps = {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  stats: Array<{ value: string; label: string }>
  toolTitle: string
  toolIntro: string
  steps: ToolStep[]
  worksheetTitle: string
  worksheetItems: string[]
  checklistTitle: string
  checklistItems: string[]
  proofTitle: string
  proofItems: Array<{ title: string; body: string }>
  finalHeadline: string
  finalBody: string
}

const trialUrl = 'https://ams.metropointtech.com/login'

export default function FreeToolPage({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats,
  toolTitle,
  toolIntro,
  steps,
  worksheetTitle,
  worksheetItems,
  checklistTitle,
  checklistItems,
  proofTitle,
  proofItems,
  finalHeadline,
  finalBody,
}: ToolPageProps) {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-accent font-semibold mb-4">{eyebrow}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
              <p className="text-xl mb-8 text-violet-100">{description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#free-tool"
                  className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
                >
                  {primaryCta}
                </a>
                <a
                  href={trialUrl}
                  className="bg-white text-slate-800 hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
                >
                  {secondaryCta}
                </a>
              </div>
              <p className="text-sm text-violet-200 mt-4">
                Free worksheet. No credit card required. Built for insurance agencies.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white">
              <Image
                src="/images/ams-app/dashboard.png"
                alt="Agenient AAMS dashboard preview"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-neutral-dark mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="free-tool" className="py-16 md:py-24 bg-neutral-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{toolTitle}</h2>
            <p className="text-lg text-neutral-dark">{toolIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step) => (
              <div key={step.label} className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-sm font-semibold text-accent mb-3">{step.label}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-dark">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md border-t-4 border-accent">
              <h3 className="text-2xl font-bold mb-6">{worksheetTitle}</h3>
              <div className="space-y-4">
                {worksheetItems.map((item, index) => (
                  <div key={item} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-neutral-dark pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border-t-4 border-primary">
              <h3 className="text-2xl font-bold mb-6">{checklistTitle}</h3>
              <div className="space-y-4">
                {checklistItems.map((item) => (
                  <label key={item} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0">
                    <span className="w-6 h-6 rounded border-2 border-primary mt-1 flex-shrink-0" />
                    <span className="text-neutral-dark">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{proofTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {proofItems.map((item) => (
              <div key={item.title} className="bg-neutral-lightest rounded-xl p-8 shadow-md text-center">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-dark">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{finalHeadline}</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">{finalBody}</p>
          <a
            href={trialUrl}
            className="inline-block bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-lg text-xl font-semibold transition shadow-lg"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>
    </div>
  )
}
