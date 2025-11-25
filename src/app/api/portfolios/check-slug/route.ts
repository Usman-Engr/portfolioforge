import { NextResponse } from 'next/server';
import { db } from '@/lib/db/postgres';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        // Check if slug exists in database
        const result = await db.query(
            'SELECT id FROM public.app_portfolios WHERE slug = $1 LIMIT 1',
            [slug]
        );

        const available = result.rows.length === 0;

        return NextResponse.json({ available, slug });
    } catch (error) {
        console.error('[CHECK_SLUG]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
