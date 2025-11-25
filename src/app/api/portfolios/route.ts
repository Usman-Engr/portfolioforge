import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db/postgres';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get all portfolios for the user using direct pg client
        const result = await db.query(
            `SELECT id, user_id, slug, data, template_id, is_published, is_draft, 
                    view_count, thumbnail_url, created_at, updated_at, published_at
             FROM public.app_portfolios 
             WHERE user_id = $1 
             ORDER BY updated_at DESC`,
            [session.user.id]
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('[PORTFOLIOS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { slug, data, templateId, isPublished } = body;

        if (!slug || !data) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        // Check if slug is already taken
        const existingResult = await db.query(
            'SELECT id FROM public.app_portfolios WHERE slug = $1 LIMIT 1',
            [slug]
        );

        if (existingResult.rows.length > 0) {
            return new NextResponse('Slug already taken', { status: 409 });
        }

        // Create portfolio using direct pg client
        const result = await db.query(
            `INSERT INTO public.app_portfolios 
             (user_id, slug, data, template_id, is_published, is_draft)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, user_id, slug, data, template_id, is_published, is_draft, 
                       view_count, created_at, updated_at`,
            [
                session.user.id,
                slug,
                JSON.stringify(data),
                templateId || 'minimal-pro',
                isPublished || false,
                !(isPublished || false) // is_draft is opposite of is_published
            ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('[PORTFOLIOS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
