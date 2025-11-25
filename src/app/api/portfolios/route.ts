import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db/supabase';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const portfolios = await db.getPortfoliosByUserId(session.user.id);
        return NextResponse.json(portfolios);
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
        try {
            const existing = await db.getPortfolioBySlug(slug);
            if (existing) {
                return new NextResponse('Slug already taken', { status: 409 });
            }
        } catch (e) {
            // Ignore error if not found (expected)
        }

        const portfolio = await db.createPortfolio({
            user_id: session.user.id,
            slug,
            data,
            template_id: templateId || 'minimal-pro',
            is_published: isPublished || false,
        });

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('[PORTFOLIOS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
