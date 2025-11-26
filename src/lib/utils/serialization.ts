/**
 * Serialization utilities for Next.js server components
 * Converts non-serializable data (like Dates) to serializable formats
 */

/**
 * Converts a Supabase portfolio object to a serializable format
 * All Date objects are converted to ISO strings
 */
export function serializePortfolio(portfolio: any) {
    return {
        id: String(portfolio.id),
        user_id: String(portfolio.user_id),
        slug: String(portfolio.slug),
        template_id: String(portfolio.template_id),
        data: portfolio.data, // Already JSON
        is_published: Boolean(portfolio.is_published),
        is_draft: Boolean(portfolio.is_draft),
        view_count: Number(portfolio.view_count || 0),
        views: Number(portfolio.views || 0),
        created_at: portfolio.created_at instanceof Date
            ? portfolio.created_at.toISOString()
            : String(portfolio.created_at),
        updated_at: portfolio.updated_at instanceof Date
            ? portfolio.updated_at.toISOString()
            : String(portfolio.updated_at),
        published_at: portfolio.published_at
            ? (portfolio.published_at instanceof Date
                ? portfolio.published_at.toISOString()
                : String(portfolio.published_at))
            : null,
    };
}

/**
 * Generic serialization function for any object with Date fields
 * Recursively converts all Date objects to ISO strings
 */
export function serializeObject<T>(obj: T): T {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (obj instanceof Date) {
        return obj.toISOString() as any;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => serializeObject(item)) as any;
    }

    if (typeof obj === 'object') {
        const serialized: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                serialized[key] = serializeObject(obj[key]);
            }
        }
        return serialized;
    }

    return obj;
}
