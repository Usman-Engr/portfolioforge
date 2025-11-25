import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db/postgres';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const result = await db.query(
            `SELECT id, user_id, slug, data, template_id, is_published, is_draft, 
              view_count, thumbnail_url, created_at, updated_at, published_at
       FROM public.app_portfolios 
       WHERE id = $1 AND user_id = $2`,
            [params.id, session.user.id]
        );

        if (result.rows.length === 0) {
            return new NextResponse('Portfolio not found', { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { slug, data, template_id, is_published } = body;

        // Verify ownership
        const ownershipResult = await db.query(
            'SELECT id FROM public.app_portfolios WHERE id = $1 AND user_id = $2',
            [params.id, session.user.id]
        );

        if (ownershipResult.rows.length === 0) {
            return new NextResponse('Portfolio not found or unauthorized', { status: 404 });
        }

        // Check if slug is taken by another portfolio
        if (slug) {
            const slugResult = await db.query(
                'SELECT id FROM public.app_portfolios WHERE slug = $1 AND id != $2',
                [slug, params.id]
            );

            if (slugResult.rows.length > 0) {
                return new NextResponse('Slug already taken', { status: 409 });
            }
        }

        // Update portfolio
        const result = await db.query(
            `UPDATE public.app_portfolios 
       SET slug = COALESCE($1, slug),
           data = COALESCE($2, data),
           template_id = COALESCE($3, template_id),
           is_published = COALESCE($4, is_published),
           is_draft = NOT COALESCE($4, is_published),
           published_at = CASE WHEN $4 = true AND is_published = false THEN NOW() ELSE published_at END,
           updated_at = NOW()
       WHERE id = $5 AND user_id = $6
       RETURNING id, user_id, slug, data, template_id, is_published, is_draft, 
                 view_count, created_at, updated_at, published_at`,
            [
                slug || null,
                data ? JSON.stringify(data) : null,
                template_id || null,
                is_published !== undefined ? is_published : null,
                params.id,
                session.user.id
            ]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('[PORTFOLIO_PUT]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Verify ownership and delete
        const result = await db.query(
            'DELETE FROM public.app_portfolios WHERE id = $1 AND user_id = $2 RETURNING id',
            [params.id, session.user.id]
        );

        if (result.rows.length === 0) {
            return new NextResponse('Portfolio not found or unauthorized', { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
