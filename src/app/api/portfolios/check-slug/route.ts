import { NextResponse } from 'next/server';
import { db } from '@/lib/db/supabase';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        // Check if slug exists in database
        const portfolio = await db.getPortfolioBySlug(slug);
        const available = !portfolio;

        return NextResponse.json({ available, slug });
    } catch (error) {
        console.error('[CHECK_SLUG]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
