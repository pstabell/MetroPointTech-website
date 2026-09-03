import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI infrastructure, insurance technology, commission tracking, and building software that works. From the team at Metro Point Technology.",
  alternates: { canonical: '/blog' },
};

// Supabase creds — env-first, hardcoded public anon key as belt-and-suspenders
// fallback so rotations do not silently break the blog list.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://umedbjslspilqakwnapa.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZWRianNsc3BpbHFha3duYXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDQyODcsImV4cCI6MjA4NTcyMDI4N30.3aKfBRVZy2y1pU_oBWzyAr0TU0l5DXNmkNtRmGXJDGc";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  isLegacy?: boolean;
  featured_image_url?: string | null;
}

// The 6 legacy posts are now in Supabase (migrated 2026-04-21 with
// social_generated_at preset to prevent spawn). This array is kept empty
// as a safety net — if Supabase is fully unreachable the page just shows
// an empty state instead of crashing. All rendering goes through Supabase.
const LEGACY_POSTS: BlogPost[] = [];

function categoryColor(cat: string) {
  switch (cat) {
    case "AI Infrastructure":
      return "bg-primary/10 text-slate-800";
    case "Insurance":
      return "bg-accent/10 text-accent-dark";
    default:
      return "bg-neutral-lighter text-neutral";
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

async function loadSupabasePosts(): Promise<BlogPost[]> {
  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await sb
      .from("mkt_blog_posts")
      .select(
        "id, slug, title, seo_meta_description, product_or_service, published_at, body, featured_image_url"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!data) return [];

    return data.map((row) => {
      const body = (row.body as string) || "";
      const excerpt =
        (row.seo_meta_description as string) ||
        body.slice(0, 200) + (body.length > 200 ? "..." : "");
      return {
        slug: (row.slug as string) || (row.id as string),
        title: (row.title as string) || "(untitled)",
        excerpt,
        date: (row.published_at as string)
          ? formatDate(row.published_at as string)
          : "",
        category: (row.product_or_service as string) || "Insurance",
        readTime: body
          ? `${Math.max(1, Math.round(body.length / 1500))} min read`
          : "",
        featured_image_url: (row.featured_image_url as string) || null,
      } as BlogPost;
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  // Live Supabase posts appear first (newest on top), then the 6 legacy
  // articles. If a Supabase post shares a slug with a legacy one the
  // Supabase version wins.
  const supabasePosts = await loadSupabasePosts();
  const legacyFiltered = LEGACY_POSTS.filter(
    (lp) => !supabasePosts.some((sp) => sp.slug === lp.slug)
  );
  const posts = [...supabasePosts, ...legacyFiltered];

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
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.featured_image_url && (
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                        {post.date && (
                          <span className="text-sm text-neutral-light">
                            {post.date}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="text-sm text-neutral-light">
                            {post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-800 group-hover:text-accent transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-neutral-light leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 text-accent font-semibold text-sm group-hover:underline">
                        Read more &rarr;
                      </div>
                    </div>
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
