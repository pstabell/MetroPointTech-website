import { MetadataRoute } from 'next';

const BASE = 'https://www.aamshub.com';

// Supabase — public anon key fallback mirrors blog/[slug]/page.tsx so the
// sitemap can enumerate published posts at request time.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://umedbjslspilqakwnapa.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZWRianNsc3BpbHFha3duYXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDQyODcsImV4cCI6MjA4NTcyMDI4N30.3aKfBRVZy2y1pU_oBWzyAr0TU0l5DXNmkNtRmGXJDGc';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Hardcoded legacy blog slugs — preserved so existing posts stay in the sitemap
// even if Supabase is unreachable at request time. Any published Supabase post
// with the same slug is de-duped below.
const LEGACY_BLOG_SLUGS = [
  'why-insurance-agencies-lose-thousands-to-commission-errors',
  'how-we-fixed-claude-code-broken-discord-channels',
  'how-to-dispute-underpaid-commissions-with-carriers',
  '5-signs-your-agency-needs-a-commission-tracker',
  'automated-reconciliation-saves-10-hours',
  'hidden-cost-of-spreadsheet-commission-tracking',
];

type BlogRow = { slug: string; published_at: string | null };

async function fetchPublishedBlogPosts(): Promise<BlogRow[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/mkt_blog_posts?select=slug,published_at&status=eq.published&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as BlogRow[];
    return rows.filter((r) => r && r.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/AAMS', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS/agents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS/agencies', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS-CRM', priority: 0.8, changeFrequency: 'weekly' },
    // /ams-app* removed 2026-06-01: those routes 307-redirect to /AAMS*, and
    // listing redirecting URLs in the sitemap triggered Google Search Console
    // "page with redirect" / "redirect error" indexing notices. The canonical
    // /AAMS pages above are what should be indexed.
    { url: '/products/ams', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/products/commission-tracker', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/products/wrap-proposal-generator', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/commission-calculator', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/month-end-variance-worksheet', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/periodic-review-checklist', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/services', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/ai-agent-teams', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/team', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/blog', priority: 0.7, changeFrequency: 'daily' },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog posts: Supabase-published merged with legacy slugs, de-duped.
  const published = await fetchPublishedBlogPosts();
  const slugDates = new Map<string, Date>();
  for (const slug of LEGACY_BLOG_SLUGS) slugDates.set(slug, now);
  for (const row of published) {
    slugDates.set(row.slug, row.published_at ? new Date(row.published_at) : now);
  }

  const blogEntries: MetadataRoute.Sitemap = Array.from(slugDates.entries()).map(
    ([slug, lastModified]) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  );

  return [...staticEntries, ...blogEntries];
}
