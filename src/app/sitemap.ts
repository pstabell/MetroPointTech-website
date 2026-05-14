import { MetadataRoute } from 'next';

const BASE = 'https://www.metropointtech.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/AAMS', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS/agents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS/agencies', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/AAMS-CRM', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/ams-app', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/ams-app/agents', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/ams-app/agencies', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/products/ams', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/products/commission-tracker', priority: 0.7, changeFrequency: 'weekly' },
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

  return routes.map(r => ({
    url: `${BASE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
