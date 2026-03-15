import type { MetadataRoute } from 'next'
import { blogArticles } from './articles'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://blog.manulacooray.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...blogArticles.map((article) => ({
      url: `https://blog.manulacooray.com/articles/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
