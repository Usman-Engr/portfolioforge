import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/db/supabase';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: portfolio, error } = await supabase
            .from('app_portfolios')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

        if (error || !portfolio) {
            return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        console.error('[PORTFOLIO_GET]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { slug, data, templateId, isPublished } = body;

        // Verify ownership
        const { data: existing, error: ownershipError } = await supabase
            .from('app_portfolios')
            .select('id')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

        if (ownershipError || !existing) {
            return NextResponse.json({ error: 'Portfolio not found or unauthorized' }, { status: 404 });
        }

        // Check if slug is taken by another portfolio
        if (slug) {
            const { data: slugCheck, error: slugError } = await supabase
                .from('app_portfolios')
                .select('id')
                .eq('slug', slug)
                .neq('id', id)
                .maybeSingle();

            if (slugError) {
                console.error('[SLUG_CHECK]', slugError);
                return NextResponse.json({ error: 'Failed to check slug' }, { status: 500 });
            }

            if (slugCheck) {
                return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });
            }
        }

        // Update portfolio
        const updateData: any = {
            updated_at: new Date().toISOString()
        };

        if (slug) updateData.slug = slug;
        if (data) updateData.data = data;
        if (templateId) updateData.template_id = templateId;
        if (typeof isPublished === 'boolean') {
            updateData.is_published = isPublished;
            updateData.is_draft = !isPublished;
            if (isPublished) {
                updateData.published_at = new Date().toISOString();
            }
        }

        const { data: updated, error: updateError } = await supabase
            .from('app_portfolios')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (updateError) {
            console.error('[PORTFOLIO_UPDATE]', updateError);
            return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PORTFOLIO_PUT]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify ownership and delete
        const { error } = await supabase
            .from('app_portfolios')
            .delete()
            .eq('id', id)
            .eq('user_id', session.user.id);

        if (error) {
            console.error('[PORTFOLIO_DELETE]', error);
            return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[PORTFOLIO_DELETE]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
