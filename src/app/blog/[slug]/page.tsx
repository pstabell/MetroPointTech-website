import Link from "next/link";
import { notFound } from "next/navigation";

// Blog post content stored as simple objects
// Maven and Spark can add new posts by adding entries here
const blogPosts: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  "how-we-fixed-claude-code-broken-discord-channels": {
    title: "How We Fixed Claude Code's Broken Discord Channels with a Custom MCP Server",
    date: "March 27, 2026",
    category: "AI Infrastructure",
    readTime: "8 min read",
    content: `If you run Claude Code with Discord channels, you have probably hit the wall. Your bot connects, responds to the first message, and then goes completely silent. No errors. No crash. Just silence.

You are not alone. This is a confirmed bug in Claude Code v2.1.85, tracked as GitHub Issue 36477. The channels plugin stops processing after the first response. It affects every user running Discord through the official channels integration.

We hit this bug while running a 13-agent AI team on Discord. Our Director of Technology, Atlas, runs as a persistent Claude Code instance connected to Discord. When channels broke, our entire team communication pipeline went dark. We could not afford to wait for Anthropic to ship a patch. So we built our own fix.

The official Claude Code channels plugin for Discord uses a polling-based architecture to receive messages. After processing the first inbound message and sending a response, the plugin enters a state where it no longer picks up new messages. The Claude Code process stays alive. The Discord bot token stays connected. The bot even shows as online with a green dot. But the brain behind it is dead.

This is particularly dangerous because there is no visible error. Operators assume their bot is running because Discord shows it online. In reality, it stopped thinking after the first interaction.

Instead of waiting for a patch or trying to hack around the plugin internals, we took a different approach. We built a standalone MCP (Model Context Protocol) server that replaces the channels plugin entirely.

The architecture is straightforward. We use the Discord.js library to maintain a persistent WebSocket connection to the Discord gateway. This is event-driven, not polling. Every message arrives instantly as a gateway event, which eliminates the failure mode in the official plugin.

We implement a standard MCP server using the official Model Context Protocol SDK. This server exposes tools that Claude Code can call, such as replying to messages, fetching channel history, adding reactions, and editing previous messages. The server communicates with Claude Code over stdio transport.

When a Discord message arrives that is relevant, the MCP server pushes a notification to Claude Code using the MCP notification protocol. Claude Code receives this as a channel notification, exactly as it would from the official plugin, but without the bug.

We have been running this in production and it works reliably. We put together an architecture breakdown and a downloadable MCP server template you can adapt at www.MetroPointTechnology.com/claude-discord-fix.`,
  },
  "how-to-dispute-underpaid-commissions-with-carriers": {
    title: "How to Dispute Underpaid Commissions with Carriers",
    date: "March 27, 2026",
    category: "Insurance",
    readTime: "6 min read",
    content: `Underpaid commissions are one of the most common and most frustrating problems insurance agents face. A carrier sends a commission statement, the numbers do not match what you expected, and now you have to figure out what went wrong and how to get it corrected.

The good news is that most underpayment issues can be resolved if you approach the dispute systematically. The bad news is that most agents do not have a system, so discrepancies go unnoticed or unresolved for months.

Start by comparing the carrier statement line by line against your records. Look at the policy number, the premium amount, the commission rate, and the calculated commission. Any variance needs to be flagged and investigated.

Common causes of underpayment include incorrect commission rates applied by the carrier, missing policies that should have been on the statement, premium changes that were not reflected in the commission calculation, and timing differences between when a policy was written and when the commission was calculated.

Once you have identified the discrepancy, document everything. Write down the policy number, the expected commission, the actual commission, the difference, and the reason you believe the carrier owes you more. Keep copies of the original policy, the commission schedule, and the carrier statement.

Contact the carrier's commission department directly. Be specific about which policies are affected and what the correct amounts should be. Carriers receive hundreds of dispute requests, so the clearer and more organized your documentation is, the faster it gets resolved.

Agent Commission Tracker helps agencies catch discrepancies earlier and recover missed revenue. Learn more at www.MetroPointTechnology.com.`,
  },
  "5-signs-your-agency-needs-a-commission-tracker": {
    title: "5 Signs Your Agency Needs a Commission Tracker",
    date: "March 27, 2026",
    category: "Insurance",
    readTime: "5 min read",
    content: `If commission tracking feels messy, slow, or full of guesswork, that is usually a sign the problem is not your team. It is your system.

Most insurance agencies do not realize how much money slips through the cracks until someone finally compares expected commissions against what carriers actually paid. By then, the agency may have lost income for months.

Sign 1: You are tracking commissions in spreadsheets that only one person understands. A spreadsheet might work when your book is small. But over time, formulas break, tabs multiply, and the process becomes dependent on one person who knows where everything lives.

Sign 2: You cannot quickly verify whether a carrier paid the right amount. If someone asks whether you got paid correctly on a policy and the answer takes hours to find, that is a serious operational problem.

Sign 3: Reconciliation only happens when there is already a problem. A lot of agencies treat reconciliation like damage control. They only review commissions after a producer notices missing income or accounting sees a discrepancy. That is too late.

Sign 4: Your team is spending too much time on manual follow-up. Every hour spent downloading statements, matching policies, checking rates, and emailing carriers is time your team cannot spend on clients, renewals, or growth.

Sign 5: You have no visibility into commission trends. Without a system tracking your commissions over time, you cannot see patterns. Which carriers pay on time? Which ones consistently underpay? What is your recovery rate?

If your agency is seeing any of these warning signs, take a closer look at Agent Commission Tracker at ams.metropointtech.com and see how much time and revenue you could recover.`,
  },
  "automated-reconciliation-saves-10-hours": {
    title: "How Automated Reconciliation Saves Insurance Agencies 10+ Hours a Month",
    date: "March 26, 2026",
    category: "Insurance",
    readTime: "6 min read",
    content: `Commission reconciliation is one of those tasks that quietly eats up more time than anyone realizes. Pulling statements from carrier portals, downloading PDFs and spreadsheets, matching line items to policies, checking rates, flagging discrepancies, and following up with carriers. For most agencies, this process takes 10 or more hours every month.

The problem is not that reconciliation is hard. The problem is that it is tedious, repetitive, and easy to make mistakes. One missed line item can mean hundreds of dollars in lost revenue. One transposed number can send you chasing a discrepancy that does not exist.

Automated reconciliation changes the equation. Instead of manually comparing every line item on every statement against every policy in your book, the system does it for you. Upload the carrier statement, and the software matches each commission entry against your policy records. Matches are confirmed automatically. Discrepancies are flagged for review.

The time savings are significant. What used to take 10 hours can be done in under an hour. But the bigger benefit is accuracy. Automated matching catches discrepancies that humans miss, especially when dealing with hundreds of policies across dozens of carriers.

Agencies that switch to automated reconciliation typically discover they were missing 2 to 5 percent of their expected commissions. On a book of $500,000 in annual commission revenue, that is $10,000 to $25,000 per year recovered.

Agent Commission Tracker helps teams focus on exceptions instead of rebuilding the process every month. Learn more at ams.metropointtech.com.`,
  },
  "hidden-cost-of-spreadsheet-commission-tracking": {
    title: "The Hidden Cost of Spreadsheet Commission Tracking",
    date: "March 26, 2026",
    category: "Insurance",
    readTime: "5 min read",
    content: `Spreadsheets feel free. They are familiar, flexible, and every computer has one. So it makes sense that most insurance agencies start tracking commissions in Excel or Google Sheets.

But spreadsheets have hidden costs that grow as your agency grows. And by the time you notice them, they have already cost you real money.

The first hidden cost is time. Every month, someone on your team spends hours downloading carrier statements, copying data into the spreadsheet, matching policy numbers, and checking formulas. This is skilled labor doing unskilled work.

The second hidden cost is errors. Spreadsheets do not validate data. A typo in a policy number, a formula that references the wrong cell, a row that gets accidentally deleted. These errors compound over time and lead to incorrect commission calculations.

The third hidden cost is knowledge concentration. When one person builds and maintains the commission spreadsheet, all the institutional knowledge about how commissions work lives in their head. If that person is out sick, takes vacation, or leaves the agency, the process stops.

The fourth hidden cost is missed revenue. Without automated matching between carrier statements and your policy records, discrepancies go unnoticed. Carriers underpay, policies get missed, and rate changes are not caught. The money you do not know you are owed is the most expensive cost of all.

The fifth hidden cost is opportunity cost. Every hour your team spends on manual reconciliation is an hour they are not spending on clients, renewals, or growth.

See how Agent Commission Tracker helps agencies reduce manual work and catch more errors at ams.metropointtech.com.`,
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Metro Point Technology Blog`,
    description: post.content.slice(0, 160) + "...",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter((p) => p.trim());

  return (
    <main>
      {/* Header */}
      <section className="gradient-primary text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-white/70 hover:text-white text-sm mb-4 inline-block"
          >
            &larr; Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-white/70">{post.date}</span>
            <span className="text-sm text-white/70">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-neutral leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </article>
      </section>

      {/* CTA */}
      <section className="py-12 bg-neutral-lighter">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Want to learn more?
          </h2>
          <p className="text-neutral-light mb-6">
            Metro Point Technology builds intelligent software solutions for
            businesses. Let us know how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
