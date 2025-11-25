import { MetadataRoute } from 'next';
import { db } from '@/lib/db/postgres';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Fetch all published portfolios
    const portfolios = await db.query(
        `SELECT slug, updated_at 
     FROM public.app_portfolios 
     WHERE is_published = true`
    );

    const portfolioUrls = portfolios.rows.map((portfolio) => ({
        url: `${baseUrl}/p/${portfolio.slug}`,
        lastModified: new Date(portfolio.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/auth/signin`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/auth/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...portfolioUrls,
    ];
}
