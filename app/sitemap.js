import { projectsMain } from '@/constants/data';
import { sanityClient } from '@/lib/sanityClient';
import { absoluteUrl } from '@/lib/site';

async function getBlogEntries() {
  try {
    const posts = await sanityClient.fetch(`*[_type == "post"] | order(_updatedAt desc){
      "slug": slug.current,
      _updatedAt
    }`);

    return posts
      .filter((post) => post.slug)
      .map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post._updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (error) {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticRoutes = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectRoutes = projectsMain.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: project.featured ? 0.8 : 0.7,
  }));

  const blogRoutes = await getBlogEntries();

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
