import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Supabase creds — env-first with hardcoded public anon key fallback.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://umedbjslspilqakwnapa.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZWRianNsc3BpbHFha3duYXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDQyODcsImV4cCI6MjA4NTcyMDI4N30.3aKfBRVZy2y1pU_oBWzyAr0TU0l5DXNmkNtRmGXJDGc";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ResolvedPost = {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  featured_image_url?: string | null;
};

async function loadFromSupabase(key: string): Promise<ResolvedPost | null> {
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const column = UUID_RE.test(key) ? "id" : "slug";
    const { data } = await sb
      .from("mkt_blog_posts")
      .select(
        "title, body, product_or_service, published_at, featured_image_url"
      )
      .eq(column, key)
      .eq("status", "published")
      .single();
    if (!data) return null;
    const body = (data.body as string) || "";
    const date = (data.published_at as string)
      ? new Date(data.published_at as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
    return {
      title: (data.title as string) || "(untitled)",
      date,
      category: (data.product_or_service as string) || "Insurance",
      readTime: body
        ? `${Math.max(1, Math.round(body.length / 1500))} min read`
        : "",
      content: body,
      featured_image_url: (data.featured_image_url as string) || null,
    };
  } catch {
    return null;
  }
}

// Hardcoded legacy blog posts. Preserved so existing URLs keep working even
// if Supabase is unreachable. Any Supabase post with the same slug will
// render the Supabase version instead.
const blogPosts: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  "why-insurance-agencies-lose-thousands-to-commission-errors": {
    title: "Why Insurance Agencies Lose Thousands to Commission Errors",
    date: "March 28, 2026",
    category: "Insurance",
    readTime: "7 min read",
    content: `If you ask most agency owners where they lose money, they usually point to missed sales, rising expenses, or carrier changes. What gets overlooked is the slow leak happening in the background: commission errors.

A small underpayment on one policy does not feel dramatic. A missing endorsement commission may not get noticed at all. A split that was entered wrong can look like a harmless accounting issue. But when those errors stack up across renewals, endorsements, new business, and multiple carriers, agencies can lose thousands of dollars without realizing it.

The problem is not just the error itself. The real problem is how easy it is for commission mistakes to hide inside normal operations.

Where commission errors usually start

Most agencies are juggling carrier statements, policy downloads, spreadsheets, AMS reports, and team notes at the same time. The more places the data lives, the easier it is for something to go wrong.

Common failure points include carrier statements that do not clearly match the policies in your system, manual spreadsheet entry mistakes, wrong commission rates tied to the wrong carrier or product, renewal changes that never get reconciled, endorsements that pay differently than expected, producer splits that were set up incorrectly, and missing payments that nobody has time to chase down.

None of these issues are rare. They are normal enough that teams start treating them like background noise.

Why agencies miss the loss for so long

Commission errors are dangerous because they rarely arrive as one big obvious problem. They show up as tiny mismatches scattered across weeks or months.

That creates three major blind spots.

First, teams are busy. Service work, renewals, quoting, and client communication always come first. Reconciling statements line by line gets pushed down the list.

Second, most agencies rely on spreadsheets or fragmented reports. That means there is no fast way to compare expected commissions against what actually got paid.

Third, many teams assume the carrier paid correctly unless something looks wildly off. But most losses are not wild. They are subtle.

A two percent variance here. A missing renewal there. A policy that should have paid in February but never shows up. Individually, each issue feels too small to trigger a full investigation. Together, they create a serious revenue leak.

The hidden cost goes beyond the missing money

When commissions are wrong, the agency does not just lose revenue. It also loses time, confidence, and operational clarity.

Someone has to stop what they are doing and investigate the issue. That often means pulling statements, checking policy details, emailing carrier reps, and rebuilding the math by hand. Even when the agency finds the problem, recovering the money can take more rounds of follow-up.

That time cost adds up fast.

Worse, inaccurate commission tracking makes it harder to answer basic business questions. Which carriers are paying accurately and on time. Which lines of business are most profitable. Which producers are driving clean revenue. What expected income should hit this month. How much money is still outstanding.

If the underlying commission data is unreliable, every report built on top of it becomes less trustworthy.

What this looks like in real life

A growing agency may assume margins are tightening, when the real issue is that endorsement income is not being reconciled consistently.

A principal may trust that the book is performing well, while finance staff are quietly spending hours every week hunting down missing commission lines.

The result is the same: money slips out, nobody sees the full picture, and the team stays stuck in reactive cleanup.

How to reduce commission leakage

The fix is not telling your team to work harder in spreadsheets. The fix is building a repeatable reconciliation process.

That means your agency needs a way to track expected commission by policy, compare expected amounts against actual carrier payments, spot missing short or delayed commissions quickly, flag discrepancies before they age out, and keep a clear history of what was disputed and what was recovered.

When that process becomes consistent, errors stop hiding.

How AI Commission Tracker helps

AI Commission Tracker gives agencies a cleaner way to see what should have been paid, what was actually paid, and where the gaps are.

Instead of stitching together statements and spreadsheets manually, teams can identify discrepancies faster, follow up sooner, and protect revenue with less admin drag.

That means fewer missed payments, less time spent auditing by hand, and more confidence in the numbers behind the business.

The payoff is simple: your agency keeps more of the money it already earned.

If your team is still tracking commissions in spreadsheets, there is a good chance revenue is slipping through the cracks. AI Commission Tracker helps you catch errors faster, recover missed income, and finally trust your commission reporting. Learn more at www.MetroPointTechnology.com.`,
  },
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

AI Commission Tracker helps agencies catch discrepancies earlier and recover missed revenue. Learn more at www.MetroPointTechnology.com.`,
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

If your agency is seeing any of these warning signs, take a closer look at AI Commission Tracker at metropointtech.com/ams-app and see how much time and revenue you could recover.`,
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

AI Commission Tracker helps teams focus on exceptions instead of rebuilding the process every month. Learn more at metropointtech.com/ams-app.`,
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

See how AI Commission Tracker helps agencies reduce manual work and catch more errors at metropointtech.com/ams-app.`,
  },
};

// Curated inline image pool — pulled from email-images/commission-problems.
// Renderer picks 2 deterministically from this list per post (seeded by slug)
// so the same article always shows the same images, but different articles
// look visually distinct.
const INLINE_IMAGE_POOL = [
  "commission-problems/commission-13.jpg",
  "commission-problems/commission-16.jpg",
  "commission-problems/commission-17.jpg",
  "commission-problems/commission-18.jpg",
  "commission-problems/commission-19.jpg",
  "commission-problems/commission-20.jpg",
  "commission-problems/commission-24.jpg",
  "commission-problems/commission-29.jpg",
  "commission-problems/commission-30.jpg",
  "commission-problems/pexels-3483098.jpg",
  "commission-problems/pexels-4475523.jpg",
  "commission-problems/pexels-6694543.jpg",
  "commission-problems/pexels-7821702.jpg",
];

const SUPABASE_PUBLIC_BASE =
  "https://umedbjslspilqakwnapa.supabase.co/storage/v1/object/public/email-images/";

function pickInlineImages(slug: string, featured: string | null | undefined): string[] {
  // Cheap deterministic hash so the same slug always picks the same pair.
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const pool = INLINE_IMAGE_POOL.filter(
    (p) => !featured || !featured.includes(p)
  );
  const a = pool[h % pool.length];
  let b = pool[(h * 7 + 13) % pool.length];
  if (a === b) b = pool[(h + 5) % pool.length];
  return [SUPABASE_PUBLIC_BASE + a, SUPABASE_PUBLIC_BASE + b];
}

// ---- Lightweight markdown rendering --------------------------------
// Turns Maven's markdown-flavored body into proper HTML blocks. Supports
// ## h2 headings, ### h3 subheads, - bullets, > blockquotes, **bold**, and
// *italic*. Strips any leftover SEO frontmatter like "SEO Title:" lines
// that bled in from the draft template.
type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string };

const STRIP_PREFIXES = [
  "SEO Title:",
  "Slug:",
  "Meta Description:",
  "CTA:",
  "CTA URL:",
  "Primary CTA:",
  "Secondary CTA:",
  "Landing Page URL:",
  "Website URL:",
  "Title:",
];

function renderMarkdownBlocks(raw: string): Block[] {
  const lines = raw.split("\n");
  const out: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];

  function flushPara() {
    if (para.length === 0) return;
    out.push({ kind: "p", text: para.join(" ").trim() });
    para = [];
  }
  function flushList() {
    if (list.length === 0) return;
    out.push({ kind: "ul", items: list });
    list = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    // Skip the markdown frontmatter labels Maven leaves behind.
    if (STRIP_PREFIXES.some((p) => trimmed.toLowerCase().startsWith(p.toLowerCase()))) {
      continue;
    }
    // Blank line — flush whatever's in flight.
    if (!trimmed) {
      flushPara();
      flushList();
      continue;
    }
    // Heading 2.
    if (trimmed.startsWith("## ")) {
      flushPara();
      flushList();
      out.push({ kind: "h2", text: trimmed.slice(3).trim() });
      continue;
    }
    // Heading 3 — sub-section, used for numbered points like "### 1. Missed".
    if (trimmed.startsWith("### ")) {
      flushPara();
      flushList();
      out.push({ kind: "h3", text: trimmed.slice(4).trim() });
      continue;
    }
    // Single-# title at the very top — drop it; the page already shows it.
    if (trimmed.startsWith("# ")) {
      flushPara();
      flushList();
      continue;
    }
    // Blockquote.
    if (trimmed.startsWith("> ")) {
      flushPara();
      flushList();
      out.push({ kind: "quote", text: trimmed.slice(2).trim() });
      continue;
    }
    // List item.
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushPara();
      list.push(trimmed.slice(2).trim());
      continue;
    }
    // Otherwise it's a paragraph line — accumulate.
    flushList();
    para.push(trimmed);
  }
  flushPara();
  flushList();
  return out;
}

// Inline transform: **bold** → <strong>, *italic* → <em>. Run after the
// block split so we don't accidentally bold across paragraphs.
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Combined regex for **bold** and *italic*. Bold checked first to avoid
  // greedy single-asterisk matching inside double-asterisks.
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIdx = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) nodes.push(text.slice(lastIdx, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    lastIdx = m.index + tok.length;
  }
  if (lastIdx < text.length) nodes.push(text.slice(lastIdx));
  return nodes;
}

async function resolvePost(slug: string): Promise<ResolvedPost | null> {
  // Supabase wins over hardcoded legacy entries so republished posts reflect
  // the latest edit. Fall back to the inline legacy map for the 6 original
  // articles whose slugs are not in Supabase.
  const sb = await loadFromSupabase(slug);
  if (sb) return sb;
  const legacy = blogPosts[slug];
  if (!legacy) return null;
  return { ...legacy };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Metro Point Technology Blog`,
    description: post.content.slice(0, 160) + "...",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  const blocks = renderMarkdownBlocks(post.content);
  const inlineImages = pickInlineImages(slug, post.featured_image_url);
  // Insert inline images after the 2nd and 4th h2 sections so the eye
  // zigzags down the page. Float left then right.
  const h2Indices: number[] = [];
  blocks.forEach((b, i) => { if (b.kind === "h2") h2Indices.push(i); });
  // Position values are the index in `blocks` AFTER which to inject.
  const injectAfter: Record<number, { url: string; side: "left" | "right" }> = {};
  if (h2Indices[1] !== undefined && inlineImages[0]) {
    injectAfter[h2Indices[1]] = { url: inlineImages[0], side: "left" };
  }
  if (h2Indices[3] !== undefined && inlineImages[1]) {
    injectAfter[h2Indices[3]] = { url: inlineImages[1], side: "right" };
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-8 md:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-white/70 hover:text-white text-sm mb-3 inline-block"
          >
            &larr; Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            {post.date && (
              <span className="text-sm text-white/70">{post.date}</span>
            )}
            {post.readTime && (
              <span className="text-sm text-white/70">{post.readTime}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Featured image — show the full image without cropping */}
      {post.featured_image_url && (
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          {blocks.map((block, i) => {
            const inject = injectAfter[i];
            const injectedImg = inject ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`img-${i}`}
                src={inject.url}
                alt=""
                className={`rounded-lg shadow-md mb-4 w-full md:w-2/5 ${
                  inject.side === "left"
                    ? "md:float-left md:mr-6 md:mt-2"
                    : "md:float-right md:ml-6 md:mt-2"
                }`}
              />
            ) : null;
            if (block.kind === "h2") {
              return (
                <React.Fragment key={i}>
                  <h2
                    className="text-2xl md:text-3xl font-serif font-bold text-primary mt-12 mb-4 leading-snug clear-both"
                  >
                    {renderInline(block.text)}
                  </h2>
                  {injectedImg}
                </React.Fragment>
              );
            }
            if (block.kind === "h3") {
              return (
                <h3
                  key={i}
                  className="text-xl font-serif font-semibold text-primary mt-8 mb-3"
                >
                  {renderInline(block.text)}
                </h3>
              );
            }
            if (block.kind === "ul") {
              return (
                <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-lg text-neutral leading-relaxed">
                      {renderInline(item)}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.kind === "quote") {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-accent bg-neutral-lighter pl-5 py-3 my-8 text-xl font-serif italic text-primary"
                >
                  {renderInline(block.text)}
                </blockquote>
              );
            }
            return (
              <p
                key={i}
                className="text-lg text-neutral leading-relaxed mb-6"
              >
                {renderInline(block.text)}
              </p>
            );
          })}
          {/* Clear floats so the next section doesn't wrap into the last image */}
          <div className="clear-both"></div>
        </article>
      </section>

      {/* CTA */}
      <section className="py-12 bg-neutral-lighter">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Want to learn more?
          </h2>
          <p className="text-neutral-light mb-6 text-center">
            Metro Point Technology builds intelligent software solutions for businesses.
            <br />
            Let us know how we can help.
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
