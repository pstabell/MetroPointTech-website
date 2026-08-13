import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

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
  deck?: string | null;
  image_seed?: string | null;
};

async function loadFromSupabase(key: string): Promise<ResolvedPost | null> {
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const column = UUID_RE.test(key) ? "id" : "slug";
    const { data } = await sb
      .from("mkt_blog_posts")
      .select(
        "title, body, product_or_service, published_at, featured_image_url, deck, image_seed"
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
      deck: (data.deck as string) || null,
      image_seed: (data.image_seed as string) || null,
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

If your agency is seeing any of these warning signs, take a closer look at AI Commission Tracker at aamshub.com/ams-app and see how much time and revenue you could recover.`,
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

AI Commission Tracker helps teams focus on exceptions instead of rebuilding the process every month. Learn more at aamshub.com/ams-app.`,
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

See how AI Commission Tracker helps agencies reduce manual work and catch more errors at aamshub.com/ams-app.`,
  },
};

// Curated inline image pool — pulled from email-images/commission-problems.
// Renderer picks 2 deterministically from this list per post (seeded by slug)
// so the same article always shows the same images, but different articles
// look visually distinct.
// NOTE: this static list is a fallback. The renderer queries the bucket
// at request time (see loadInlinePool) and uses whatever files actually
// exist, so a rename in the Image Library no longer breaks the blog.
const INLINE_IMAGE_POOL_FALLBACK = [
  "commission-problems/commission-7.jpg",
];

const SUPABASE_PUBLIC_BASE =
  "https://umedbjslspilqakwnapa.supabase.co/storage/v1/object/public/email-images/";

// Read a broad pool of images from the mkt_image_metadata table at
// request time. Patrick scar 2026-05-12: the storage list() approach
// silently failed for the anon role even after we opened anon SELECT on
// storage.objects, because the bucket stores files at the top level with
// UUID names — the category lives in mkt_image_metadata.category_slug,
// not in the storage path. Query the table directly, build full public
// URLs from storage_filename.
async function loadInlinePool(): Promise<string[]> {
  const categories = [
    "agency-staff",
    "happy-agency-team",
    "commission-problems",
    "insurance-industry",
    "office-technology",
  ];
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (sb as any)
      .from("mkt_image_metadata")
      .select("storage_filename, category_slug")
      .in("category_slug", categories);
    const rows = (data || []) as Array<{ storage_filename: string; category_slug: string }>;
    const all = rows
      .filter((r) => r.storage_filename && /\.(jpg|jpeg|png|gif|webp)$/i.test(r.storage_filename))
      .map((r) => r.storage_filename);
    return all.length > 0 ? all : INLINE_IMAGE_POOL_FALLBACK;
  } catch {
    return INLINE_IMAGE_POOL_FALLBACK;
  }
}

// Seeded Fisher-Yates shuffle. Same slug always produces the same
// sequence so readers on the same post see the same images, but
// different posts get distinct random selections from the full library.
function seededShuffle<T>(items: T[], slug: string): T[] {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < slug.length; i++) {
    h = Math.imul(h ^ slug.charCodeAt(i), 16777619) >>> 0;
  }
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    h = (Math.imul(h, 48271) + 1) >>> 0;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickInlineImages(
  seed: string,
  featured: string | null | undefined,
  count: number,
  pool: string[],
): string[] {
  // Dedupe the pool by path — guarantees the seeded shuffle cannot hand
  // back the same file twice regardless of what the storage list returned.
  const seen = new Set<string>();
  const unique = pool.filter(p => (seen.has(p) ? false : (seen.add(p), true)));
  const filtered = unique.filter((p) => !featured || !featured.includes(p));
  if (filtered.length === 0) return [];
  const shuffled = seededShuffle(filtered, seed);
  const picks = shuffled.slice(0, Math.min(count, shuffled.length));
  return picks.map((p) => SUPABASE_PUBLIC_BASE + p);
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

// Maven sometimes packages a full campaign drop inside the blog body:
// landing page scaffolding (### Hero, ### Pain Section, ### Solution Section,
// ### Social Proof, ### Offer Section, ### CTA Section, ### Footer Compliance
// Copy) followed by ## Form Copy and ## Email 1/2/3 sections. None of that
// belongs on the public blog page — emails go to mkt_campaigns, form copy
// goes to the landing page, scaffolding labels are author guidance.
//
// stripScaffolding removes:
//   1. The everything-from-here-down internal sections (## Form Copy, ## Email N,
//      ## Landing Page Form, etc.)
//   2. Scaffolding section labels inside the article (### Hero, ### Pain Section,
//      etc.) — keep the content, drop the label
//   3. The wrapper "## Landing Page" heading — it's a container, not a section
//
// Anything outside these patterns flows through untouched, so legacy blog
// posts that don't carry the scaffolding are unaffected.
const INTERNAL_SECTION_RE = /^(##\s+)(Form\s+Copy|Email\s+\d+|Landing\s+Page\s+Form|Compliance\s+Notes?|Internal\s+Notes?|SEO\s+Notes?|Production\s+Notes?)\s*$/i;
const SCAFFOLD_H3_RE = /^###\s+(Hero|Pain\s+Section|Solution\s+Section|Social\s+Proof|Offer\s+Section|CTA\s+Section|Footer\s+Compliance\s+Copy|Headline|Subhead|Button|Subject)\s*$/i;
const LANDING_WRAPPER_RE = /^##\s+Landing\s+Page\s*$/i;

function stripScaffolding(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Hit an internal-only section heading — truncate everything from here down.
    if (INTERNAL_SECTION_RE.test(trimmed)) break;
    // Drop the "## Landing Page" wrapper heading entirely.
    if (LANDING_WRAPPER_RE.test(trimmed)) continue;
    // Drop scaffolding subsection labels (keep their content).
    if (SCAFFOLD_H3_RE.test(trimmed)) continue;
    out.push(line);
  }
  // Collapse any runs of 3+ blank lines that the strips might leave behind.
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

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
    title: post.title,
    description: post.content.slice(0, 160) + "...",
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.content.slice(0, 160) + "...",
      url: `/blog/${slug}`,
    },
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

  const blocks = renderMarkdownBlocks(stripScaffolding(post.content));
  // Find all h2 section starts. Decide image count by article length — short
  // posts get 2 inline images, longer posts (5+ sections) get 3. Combined
  // with the featured image at top that's 3–4 images per post, our target.
  const h2Indices: number[] = [];
  blocks.forEach((b, i) => { if (b.kind === "h2") h2Indices.push(i); });
  // Anchor plan stays identical to the original 2-or-3 image layout that
  // already looks clean on the bottom of every post. The ONE addition:
  // a single intro image floated RIGHT near the top, anchored to the
  // pull-quote (or lead paragraph if no quote exists). The bottom images
  // keep their proven positions and left-side starting float.
  const bottomCount = h2Indices.length >= 5 ? 3 : 2;
  // One extra image for the intro placement. Pool must return enough
  // distinct images to cover the full count.
  const totalCount = bottomCount + 1;
  const inlinePool = await loadInlinePool();
  // Use per-post image_seed when set so Patrick can nudge the renderer
  // toward a fresh set of images without renaming the blog or touching
  // the library. Falls back to slug for posts without a seed.
  const shuffleSeed = post.image_seed || slug;
  const inlineImages = pickInlineImages(shuffleSeed, post.featured_image_url, totalCount, inlinePool);

  const injectAfter: Record<number, { url: string; side: "left" | "right" }> = {};

  // Bottom anchors — same as before, alternating left/right starting LEFT.
  const bottomAnchors: Array<{ idx: number; side: "left" | "right" }> = [];
  if (bottomCount === 2 && h2Indices.length >= 4) {
    bottomAnchors.push({ idx: h2Indices[1], side: "left" });
    bottomAnchors.push({ idx: h2Indices[3], side: "right" });
  } else if (bottomCount === 2) {
    bottomAnchors.push({ idx: h2Indices[1] ?? h2Indices[0], side: "left" });
    bottomAnchors.push({ idx: h2Indices[h2Indices.length - 1], side: "right" });
  } else if (bottomCount === 3) {
    const n = h2Indices.length;
    bottomAnchors.push({ idx: h2Indices[Math.max(1, Math.floor(n * 0.25))], side: "left" });
    bottomAnchors.push({ idx: h2Indices[Math.floor(n * 0.5)], side: "right" });
    bottomAnchors.push({ idx: h2Indices[Math.min(n - 1, Math.floor(n * 0.75))], side: "left" });
  }

  // Intro image — always RIGHT, anchored to the pull-quote or lead paragraph.
  const firstQuoteIdx = blocks.findIndex(b => b.kind === "quote");
  const firstParaIdx = blocks.findIndex(b => b.kind === "p");
  const firstH2 = h2Indices[0] ?? Infinity;
  const introAnchorIdx = (firstQuoteIdx !== -1 && firstQuoteIdx < firstH2) ? firstQuoteIdx
    : (firstParaIdx !== -1 && firstParaIdx < firstH2) ? firstParaIdx
    : -1;

  // Assign images. Intro first (img[0]), bottom anchors use img[1..n].
  if (introAnchorIdx !== -1 && inlineImages[0] !== undefined) {
    injectAfter[introAnchorIdx] = { url: inlineImages[0], side: "right" };
  }
  bottomAnchors.forEach((a, i) => {
    const url = inlineImages[i + 1];
    if (url !== undefined && !injectAfter[a.idx]) {
      injectAfter[a.idx] = { url, side: a.side };
    }
  });

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

      {/* Deck / subhead — sits between hero image and article body to signal
          "start reading here" without repeating the h1. Only renders when
          the post has a deck field set. */}
      {post.deck && (
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10">
            <p className="text-lg md:text-xl font-serif italic text-neutral-light leading-relaxed">
              {post.deck}
            </p>
          </div>
        </section>
      )}

      {/* Content */}
      <section className={`${post.deck ? 'pt-8 pb-12' : 'py-12'} bg-white`}>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* firstParaIdx is used to flag the lead paragraph inside the
              map below — bigger font, drop cap, more line-height. */}
          {(() => null)()}
          {blocks.map((block, i) => {
            const firstParaIdx = blocks.findIndex(b => b.kind === 'p');
            const isFirstPara = i === firstParaIdx && block.kind === 'p';
            const inject = injectAfter[i];
            const injectedImg = inject ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`img-${i}`}
                src={inject.url}
                alt=""
                className={`rounded-lg shadow-md mb-4 w-full md:w-2/5 object-cover aspect-[4/3] ${
                  inject.side === "left"
                    ? "md:float-left md:mr-6 md:mt-2"
                    : "md:float-right md:ml-6 md:mt-2"
                }`}
              />
            ) : null;
            // Wrapper — emits the block and, if this index has an image
            // anchor, the floated image right after it so the following
            // text wraps around the image on the opposite side.
            const withImg = (node: React.ReactNode) => (
              <React.Fragment key={i}>
                {node}
                {injectedImg}
              </React.Fragment>
            );
            if (block.kind === "h2") {
              return withImg(
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-12 mb-4 leading-snug clear-both">
                  {renderInline(block.text)}
                </h2>
              );
            }
            if (block.kind === "h3") {
              return withImg(
                <h3 className="text-xl font-serif font-semibold text-primary mt-8 mb-3">
                  {renderInline(block.text)}
                </h3>
              );
            }
            if (block.kind === "ul") {
              return withImg(
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-lg text-neutral leading-relaxed">
                      {renderInline(item)}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.kind === "quote") {
              // Pull-quote: magazine-style visual break. Any markdown line
              // starting with "> " becomes one. Much larger than body,
              // brand-navy, accent left bar, generous margins.
              return withImg(
                <blockquote className="mpt-pullquote border-l-4 border-accent pl-6 md:pl-8 my-10 md:my-12 text-2xl md:text-3xl font-serif italic text-primary leading-snug">
                  {renderInline(block.text)}
                </blockquote>
              );
            }
            // Lead paragraph (first <p> of the article) gets bumped up in
            // size and line-height so readers see where reading starts.
            if (isFirstPara) {
              return withImg(
                <p className="text-xl md:text-2xl font-serif text-neutral leading-relaxed mb-8 first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  {renderInline(block.text)}
                </p>
              );
            }
            return withImg(
              <p className="text-lg text-neutral leading-relaxed mb-6">
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
