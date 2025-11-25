import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db/supabase';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const portfolio = await db.getPortfolioById(params.id);

        if (!portfolio) {
            return new NextResponse('Not Found', { status: 404 });
        }

        // Verify ownership
        if (portfolio.user_id !== session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const portfolio = await db.updatePortfolio(params.id, body);

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('[PORTFOLIO_PATCH]', error);
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

        await db.deletePortfolio(params.id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
