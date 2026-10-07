import { MetadataRoute } from 'next';

// Non-public routes: the API, the admin page, customer onboarding and checkout results.
const DISALLOW = ['/api/', '/admin', '/onboarding', '/checkout'];

// AI assistants and the search engines that feed them are welcome on every public page (2026-10-07).
// A crawler named in its own group ignores the * group, so the same disallows are repeated here.
const AI_AND_SEARCH_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_AND_SEARCH_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: 'https://agenient.com/sitemap.xml',
  };
}
