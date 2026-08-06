import type { MetadataRoute } from 'next';
import { getFolders } from '@/lib/supabase';
import { AREAS } from '@/lib/areas';

const BASE = 'https://kevinhatcherexcavation.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/areas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.7 },
  ];

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${BASE}/areas/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Add a URL for each published service folder (safe: never fails the build).
  let folderRoutes: MetadataRoute.Sitemap = [];
  try {
    const folders = await getFolders();
    folderRoutes = folders.map((f) => ({
      url: `${BASE}/services/${f.slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // ignore — the core routes still get indexed
  }

  return [...staticRoutes, ...areaRoutes, ...folderRoutes];
}
