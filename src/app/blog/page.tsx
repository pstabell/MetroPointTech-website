import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Metro Point Technology",
  description:
    "Insights on AI infrastructure, insurance technology, commission tracking, and building software that works. From the team at Metro Point Technology.",
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    slug: "why-insurance-agencies-lose-thousands-to-commission-errors",
    title: "Why Insurance Agencies Lose Thousands to Commission Errors",
    excerpt:
      "Commission errors rarely arrive as one big obvious problem. They hide in renewals, endorsements, and broken spreadsheet workflows. Here is where the money slips and how to stop the leak.",
    date: "March 28, 2026",
    category: "Insurance",
    readTime: "7 min read",
  },
  {
    slug: "how-we-fixed-claude-code-broken-discord-channels",
    title: "How We Fixed Claude Code's Broken Discord Channels with a Custom MCP Server",
    excerpt:
      "Claude Code v2.1.85 has a confirmed bug where Discord channels stop processing after the first response. We built a custom MCP server to replace the broken plugin entirely.",
    date: "March 27, 2026",
    category: "AI Infrastructure",
    readTime: "8 min read",
  },
  {
    slug: "how-to-dispute-underpaid-commissions-with-carriers",
    title: "How to Dispute Underpaid Commissions with Carriers",
    excerpt:
      "A practical guide for insurance agents on identifying underpaid commissions, building a case, and getting carriers to pay what they owe.",
    date: "March 27, 2026",
    category: "Insurance",
    readTime: "6 min read",
  },
  {
    slug: "5-signs-your-agency-needs-a-commission-tracker",
    title: "5 Signs Your Agency Needs a Commission Tracker",
    excerpt:
      "Still using spreadsheets to track commissions? Here are five signs your agency has outgrown manual tracking and why Agent Commission Tracker helps you recover missed revenue.",
    date: "March 27, 2026",
    category: "Insurance",
    readTime: "5 min read",
  },
  {
    slug: "automated-reconciliation-saves-10-hours",
    title: "How Automated Reconciliation Saves Insurance Agencies 10+ Hours a Month",
    excerpt:
      "Manual commission reconciliation quietly eats up more time than most agencies realize. Here is how automation helps agencies cut admin time and catch missed commissions faster.",
    date: "March 26, 2026",
    category: "Insurance",
    readTime: "6 min read",
  },
  {
    slug: "hidden-cost-of-spreadsheet-commission-tracking",
    title: "The Hidden Cost of Spreadsheet Commission Tracking",
    excerpt:
      "Spreadsheets might feel free, but the real cost of manual commission tracking is measured in lost revenue, wasted time, and missed discrepancies.",
    date: "March 26, 2026",
    category: "Insurance",
    readTime: "5 min read",
  },
];

function categoryColor(cat: string) {
  switch (cat) {
    case "AI Infrastructure":
      return "bg-primary/10 text-primary";
    case "Insurance":
      return "bg-accent/10 text-accent-dark";
    default:
      return "bg-neutral-lighter text-neutral";
  }
}

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-white">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Insights on AI infrastructure, insurance technology,
            <br />
            and building software that actually ships
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-accent transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-sm text-neutral-light">
                      {post.date}
                    </span>
                    <span className="text-sm text-neutral-light">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-primary group-hover:text-accent transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-neutral-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-accent font-semibold text-sm group-hover:underline">
                    Read more &rarr;
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
