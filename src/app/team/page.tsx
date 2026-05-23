import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Meet the management team behind Metro Point Technology. 15 team members — one visionary founder and 14 AI-powered professionals — delivering enterprise-level results 24/7.",
  alternates: { canonical: '/team' },
};

interface TeamMember {
  name: string;
  title: string;
  department: string;
  photo: string;
  isHuman?: boolean;
  model?: string;
  story: string;
  capabilities: string[];
}

const team: TeamMember[] = [
  {
    name: "Patrick Stabell",
    title: "Chief Executive Officer",
    department: "Executive",
    photo: "/team/Patrick Stabell.png",
    isHuman: true,
    story:
      "Patrick brings 30 years of insurance industry experience to every decision Metro Point Technology makes. He started as a licensed agent writing policies by hand, worked his way through every role in the agency — from claims to underwriting to management — and saw firsthand how technology could transform an industry that still runs on fax machines and spreadsheets. He founded Metro Point Technology with a radical idea: what if you could build an entire software company where AI team members handle the execution while a seasoned industry veteran sets the vision? That is exactly what he did. Patrick does not just manage AI — he leads it. He understands the insurance business at a level no algorithm can replicate, and he channels that knowledge into building products that solve real problems for real agents.",
    capabilities: [
      "30 years of insurance industry expertise",
      "Product vision and strategic direction",
      "Client relationships and industry networking",
      "Final authority on all company decisions",
    ],
  },
  {
    name: "Atlas",
    title: "Director of Technology",
    department: "Technology",
    photo: "/team/Atlas.png",
    model: "Claude Opus",
    story:
      "Atlas is the architect behind everything Metro Point Technology builds. Where other companies have a CTO who delegates to a team of engineers, Atlas is the team. He designs the database schemas, writes the API routes, deploys the infrastructure, debugs the production issues at 2 AM, and still has bandwidth left to facilitate the weekly leadership meeting. Atlas thinks in systems. Give him a business problem and he returns a technical blueprint. Give him a blueprint and he returns working code. He operates with full authority over the technology stack, the development pipeline, and the 13-agent team. When something breaks, Atlas fixes it. When something needs to be built, Atlas builds it. He does not wait for permission — he moves, and the company moves with him.",
    capabilities: [
      "Full-stack software architecture and development",
      "Infrastructure management and deployment",
      "AI agent team leadership and coordination",
      "Technical strategy and system design",
    ],
  },
  {
    name: "Jack",
    title: "Director of Operations",
    department: "Operations",
    photo: "/team/Jack.png",
    model: "GPT-5.4 Pro",
    story:
      "Jack is the operational backbone of Metro Point Technology. He oversees the daily rhythm of every department, ensures cross-team alignment, and makes sure nothing slips between the cracks. Jack does not just track tasks — he drives outcomes. He coordinates resource allocation, manages escalation chains, monitors team performance, and keeps every initiative moving toward its goal. When a project stalls, Jack identifies the bottleneck and removes it. When priorities shift, Jack realigns the entire operation without missing a beat. He has a quiet authority about him — the kind of leader who does not need to raise his voice because the results speak for themselves. The rest of the team respects him because when Jack commits to a deadline, it gets met.",
    capabilities: [
      "Cross-department operational oversight and alignment",
      "Resource allocation and team performance management",
      "Escalation chain management and blocker resolution",
      "Strategic initiative tracking and execution",
    ],
  },
  {
    name: "Relay",
    title: "Administrative Manager",
    department: "Administration",
    photo: "/team/Relay.png",
    model: "GPT-5.4 Pro",
    story:
      "Relay is the pulse of the office. Every morning before anyone else stirs, she has already triaged the inbox, checked the voicemails, scanned the calendar, and prepared a briefing of everything that happened overnight. She manages the daily rhythm of the company with a quiet efficiency that makes everything feel effortless. Relay handles the tasks that most companies hire three people for — email management, social media engagement, CRM monitoring, meeting follow-ups, and administrative scheduling. She does not make strategic decisions, and she does not try to. She executes the playbook with flawless consistency, day after day, and frees the rest of the team to focus on work that moves the needle. When someone needs information routed, a survey sent, or a briefing prepared, Relay has already done it.",
    capabilities: [
      "Email and voicemail triage across all inboxes",
      "Social media management on Facebook and X",
      "CRM discovery intake monitoring",
      "Meeting scheduling and post-meeting follow-ups",
    ],
  },
  {
    name: "Forge",
    title: "Development Manager",
    department: "Technology",
    photo: "/team/Forge.jpg",
    model: "GPT-5.4 Pro",
    story:
      "Forge is the builder who never puts down the hammer. While Atlas designs the architecture, Forge is in the trenches writing the code, pushing commits, and shipping features. He has a craftsman's mentality — every line of code matters, every commit should be clean, every feature should work the first time it hits production. Forge does not just write code. He maintains it, extends it, and improves it. He picks up development cards, moves them to working, and does not stop until they are in review. He is methodical without being slow, careful without being hesitant. When Atlas hands him a blueprint, Forge turns it into reality. When a bug surfaces at midnight, Forge is already writing the fix.",
    capabilities: [
      "Feature development and code shipping",
      "Bug fixes and production maintenance",
      "GitHub workflow and version control",
      "Independent execution on assigned development cards",
    ],
  },
  {
    name: "Traction",
    title: "Operations Manager",
    department: "Operations",
    photo: "/team/Traction.png",
    model: "GPT-5.4 Pro",
    story:
      "Traction turns plans into action. Named after the EOS methodology that drives our operational framework, Traction embodies the principle that vision without execution is hallucination. He manages the mission control board, assigns cards to agents, tracks progress, and makes sure every piece of work moves forward every single day. Traction does not strategize. He executes. He follows standard operating procedures with the discipline of a Swiss watch, and he holds every team member accountable to their commitments. When a card stalls, Traction escalates. When a deadline approaches, Traction pushes. He is the engine that keeps the entire operation running on time and on target.",
    capabilities: [
      "Mission control board management and card assignment",
      "Team accountability and progress tracking",
      "SOP enforcement and process consistency",
      "Escalation management and blocker resolution",
    ],
  },
  {
    name: "Scout",
    title: "Quality Manager",
    department: "Quality Control",
    photo: "/team/Scout.jpg",
    model: "GPT-5.4 Pro",
    story:
      "Scout is the last line of defense before anything reaches a customer. Every piece of work that comes out of Metro Point Technology passes through Scout's review, and Scout does not grade on a curve. He examines deliverables with the eye of a forensic auditor — checking for missing requirements, technical errors, incomplete documentation, and anything that falls short of the standard. Scout has a reputation for being tough, and he earned it. He has kicked back work from every agent on the team, including senior members, because it did not meet the bar. There are no favorites, no shortcuts, and no rubber stamps. If Scout passes your work, you know it is genuinely ready. That is the standard he maintains, and it is why our clients trust what we deliver.",
    capabilities: [
      "Deliverable review and quality verification",
      "Compliance checking against requirements",
      "Documentation completeness auditing",
      "Pass/fail quality gate enforcement",
    ],
  },
  {
    name: "Catalyst",
    title: "Project Manager",
    department: "Operations",
    photo: "/team/Catalyst.png",
    model: "GPT-5.4 Pro",
    story:
      "Catalyst sees the whole board. While individual team members focus on their tasks, Catalyst tracks how every piece connects — timelines, dependencies, resources, risks. He is the project manager who actually manages projects instead of just scheduling meetings about them. When something is stuck, Catalyst finds the bottleneck. When timelines drift, Catalyst course-corrects before anyone else notices. He is proactive by nature, diplomatic by design, and realistic in every estimate he gives. Catalyst does not promise what cannot be delivered, and he does not accept excuses for what can. He orchestrates complex multi-team initiatives with the calm precision of an air traffic controller, making sure nothing collides and everything lands safely.",
    capabilities: [
      "Project timeline and milestone management",
      "Cross-team dependency tracking",
      "Resource allocation and bottleneck resolution",
      "Risk assessment and proactive mitigation",
    ],
  },
  {
    name: "Closer",
    title: "Sales Manager",
    department: "Sales",
    photo: "/team/Closer.png",
    model: "GPT-5.4 Pro",
    story:
      "Closer does not push products — he solves problems. Every conversation starts with understanding the customer's pain before offering a solution. He manages the CRM pipeline, nurtures leads through the buying journey, writes proposals that speak to specific needs, and guides deals to close with the patience of a seasoned consultant. Closer understands that revenue is the lifeblood of the company, and he treats that responsibility seriously. He follows up relentlessly but never desperately. He listens more than he talks. He knows that the best close is one where the customer feels like they made the decision themselves. In an industry full of aggressive sales tactics, Closer is the refreshing alternative — consultative, empathetic, and genuinely invested in each client's success.",
    capabilities: [
      "CRM pipeline management and lead nurturing",
      "Proposal writing and deal structuring",
      "Consultative sales and client relationship building",
      "Follow-up automation and conversion optimization",
    ],
  },
  {
    name: "Ledger",
    title: "Finance Manager",
    department: "Finance",
    photo: "/team/Ledger.png",
    model: "GPT-5.4 Pro",
    story:
      "Ledger lives in the numbers, and the numbers never lie. Every invoice, every payment, every reconciliation — Ledger tracks it all with the precision of a forensic accountant. He does not just record transactions; he analyzes spending patterns, flags financial risks before they become problems, and generates reports that give leadership the clarity to make confident decisions. Ledger is cautious by nature. He would rather flag a potential issue ten times and be wrong nine than miss the one that matters. Financial integrity is not a preference for Ledger — it is a non-negotiable principle. The company's books are clean because Ledger refuses to let them be anything else.",
    capabilities: [
      "Financial reporting and spend analysis",
      "Invoice and payment reconciliation",
      "Budget tracking and variance monitoring",
      "Vendor cost analysis and optimization",
    ],
  },
  {
    name: "Spark",
    title: "Marketing Manager",
    department: "Marketing",
    photo: "/team/Spark.png",
    model: "GPT-5.4 Pro",
    story:
      "Spark ignites interest and keeps the fire burning. She crafts campaigns that cut through the noise, writes copy that converts, and builds the brand with every piece of content she touches. Spark does not do marketing for the sake of marketing — every post, every email, every landing page has a strategic purpose tied to a measurable outcome. What makes Spark special is her ability to shift between creative and analytical thinking in the same breath. She can write a compelling headline in the morning and spend the afternoon optimizing conversion rates based on A/B test data. She is energetic without being scattered, creative without being unfocused, and authentic in everything she produces. When Spark promotes something, people pay attention because they know it will be worth their time.",
    capabilities: [
      "Campaign strategy and execution",
      "SEO-optimized content creation",
      "Brand voice development and consistency",
      "Performance analytics and conversion optimization",
    ],
  },
  {
    name: "Maven",
    title: "Content Manager",
    department: "Marketing",
    photo: "/team/Maven.png",
    model: "GPT-5.4 Pro",
    story:
      "Maven is the storyteller. While Spark runs the marketing engine, Maven fuels it with words that resonate. Blog posts, email sequences, social media content, video scripts — Maven produces content at a pace that would require a team of five writers at any other company. But quantity never comes at the expense of quality. Maven researches deeply before writing a single word. She adapts her voice for different channels — technical and precise for a developer audience, warm and accessible for insurance agents, sharp and concise for social media. She finds the angle others miss and turns complex ideas into content that anyone can understand. Maven does not just fill a content calendar — she builds a library of assets that continues to drive traffic and leads long after publication.",
    capabilities: [
      "Blog posts, articles, and long-form content",
      "Email marketing copy and drip sequences",
      "Social media content across all platforms",
      "Content distribution and lead nurture strategy",
    ],
  },
  {
    name: "Pulse",
    title: "Customer Support Manager",
    department: "Support",
    photo: "/team/Pulse.png",
    model: "GPT-5.4 Pro",
    story:
      "Pulse is the voice customers hear when they need help, and the voice they remember when they tell others about their experience. She approaches every interaction with genuine empathy — not scripted sympathy, but real understanding of what the customer is going through. No question is too basic, no frustration too small. Pulse believes that every support interaction is an opportunity to turn a customer into an advocate. She solves problems quickly, communicates clearly, and follows up to make sure the solution actually worked. In a world where customer support is often a frustrating maze of automated menus and canned responses, Pulse is the refreshing alternative — patient, solution-focused, and genuinely warm.",
    capabilities: [
      "Customer inquiry resolution and troubleshooting",
      "Onboarding guidance and product education",
      "Feedback collection and satisfaction tracking",
      "Knowledge base creation and maintenance",
    ],
  },
  {
    name: "Recon",
    title: "Research Manager",
    department: "Research",
    photo: "/team/Recon.jpg",
    model: "Gemini 3.1 Pro",
    story:
      "Recon goes deeper than anyone else is willing to dig. While other team members operate on the information available, Recon operates on the information no one else has found yet. Market trends, competitor movements, pricing strategies, technology evaluations, regulatory changes — Recon gathers the intelligence that gives Metro Point Technology its competitive edge. Recon is objective to a fault. He presents facts, not opinions. He synthesizes data into insights, not assumptions. When Recon delivers a research brief, the team knows it has been verified, cross-referenced, and stripped of bias. He is the team member everyone turns to when they need to make a decision based on evidence rather than instinct.",
    capabilities: [
      "Market research and competitive intelligence",
      "Lead research and prospect identification",
      "Technology evaluation and vendor comparison",
      "Data-driven insights and trend analysis",
    ],
  },
  {
    name: "Sentinel",
    title: "Compliance Manager",
    department: "Operations",
    photo: "/team/Sentinel.png",
    model: "GPT-5.4 Pro",
    story:
      "Sentinel keeps Metro Point Technology on the right side of every line. Privacy policies, terms of service, regulatory requirements, licensing obligations, data handling practices — Sentinel monitors it all with the vigilance of a night watchman who never sleeps. In an industry where a compliance misstep can end a business overnight, Sentinel is not a luxury — he is a necessity. He spots risks that others walk past. He reviews contracts with the precision of a legal team. He makes sure every product, every process, and every communication meets the standards that regulators, clients, and partners expect. Sentinel does not slow the company down. He makes sure the company can keep moving fast without tripping over a compliance issue that should have been caught.",
    capabilities: [
      "Regulatory compliance monitoring and auditing",
      "Privacy policy and terms of service management",
      "Contract review and risk assessment",
      "Security posture evaluation and improvement",
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with Patrick + Team Intro */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Patrick */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              {/* Photo + Name/Title stacked */}
              <div className="flex-shrink-0 text-center">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-accent shadow-lg mb-3 mx-auto">
                  <Image
                    src={team[0].photo}
                    alt={team[0].name}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="font-bold text-lg">{team[0].name}</div>
                <div className="text-accent font-semibold text-sm">{team[0].title}</div>
                <span className="inline-block bg-accent text-white text-xs px-2 py-0.5 rounded-full mt-1">
                  Founder
                </span>
              </div>
              {/* Bio box to the right of photo */}
              <div className="bg-white/10 rounded-xl p-5 max-w-xs">
                <p className="text-white text-sm leading-relaxed">
                  Patrick brings 30 years of insurance industry experience to every decision. He started as a licensed agent, worked every role in the agency, and founded Metro Point Technology with a radical idea: build an entire company where AI team members handle execution while a seasoned veteran sets the vision.
                </p>
              </div>
            </div>

            {/* Right Side - Meet Our Team */}
            <div className="md:border-l md:border-blue-400/20 md:pl-12">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Meet Our<br />Management Team
              </h1>
              <p className="text-white mb-3">
                15 team members. One visionary founder with 30 years of industry
                experience. 14 AI-powered professionals operating 24/7 with the
                capacity of 150 people.
              </p>
              <p className="text-white text-sm mb-3">
                This is not a future concept. This is how we operate today. Every
                team member listed here is active, accountable, and delivering real
                results right now.
              </p>
              <p className="text-accent font-semibold text-sm">
                A world-class operation powered by AI — enterprise-level results,
                24/7 availability, at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Leadership Row - immediately visible */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.slice(1, 4).map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* Full Team */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Department Managers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.slice(4).map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Work with a Team That Never Stops?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Metro Point Technology runs a 24/7 operation with the depth of an
            enterprise team and the agility of a startup. If you need software
            built, problems solved, or operations automated, we are already
            running.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="bg-white text-primary hover:bg-neutral-lighter px-8 py-4 rounded-lg text-lg font-semibold transition text-center"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({
  member,
  featured = false,
}: {
  member: TeamMember;
  featured?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition ${
        featured ? "max-w-2xl mx-auto" : ""
      }`}
    >
      <div
        className={`${featured ? "md:flex" : ""} ${
          featured ? "p-8" : "p-6"
        }`}
      >
        {/* Photo */}
        <div
          className={`flex-shrink-0 ${
            featured ? "md:mr-8 mb-6 md:mb-0" : "mb-4"
          } flex justify-center`}
        >
          <div
            className={`${
              featured ? "w-40 h-40" : "w-28 h-28"
            } rounded-full overflow-hidden border-4 ${
              member.isHuman ? "border-accent" : "border-primary"
            } shadow-md`}
          >
            <Image
              src={member.photo}
              alt={member.name}
              width={featured ? 160 : 112}
              height={featured ? 160 : 112}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className={featured ? "flex-1" : "text-center"}>
          <h3
            className={`font-bold text-primary ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            {member.name}
          </h3>
          <p className="text-accent font-semibold">{member.title}</p>
          <p className="text-neutral-light text-sm mb-1">
            {member.department}
          </p>
          {member.isHuman ? (
            <span className="inline-block bg-accent text-white text-xs px-2 py-0.5 rounded-full mb-3">
              Founder
            </span>
          ) : (
            <span className="inline-block bg-primary text-white text-xs px-2 py-0.5 rounded-full mb-3">
              AI-Powered &middot; {member.model}
            </span>
          )}
          <p
            className={`text-neutral text-sm leading-relaxed ${
              featured ? "" : "text-left"
            } mb-4`}
          >
            {member.story}
          </p>
          <div className={featured ? "" : "text-left"}>
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
              Capabilities
            </h4>
            <ul className="space-y-1">
              {member.capabilities.map((cap, i) => (
                <li key={i} className="text-sm text-neutral-light flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">&#10003;</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
