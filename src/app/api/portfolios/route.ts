import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase-admin';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all portfolios for the user using Supabase Admin
        const { data: portfolios, error } = await supabaseAdmin
            .from('app_portfolios')
            .select('*')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false });

        if (error) {
            console.error('[PORTFOLIOS_GET]', error);
            return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
        }

        return NextResponse.json(portfolios || []);
    } catch (error) {
        console.error('[PORTFOLIOS_GET]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { slug, data, templateId, isPublished } = body;

        if (!slug || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('[PORTFOLIOS_POST] Missing SUPABASE_SERVICE_ROLE_KEY. Cannot check global slug uniqueness.');
            return NextResponse.json({
                error: 'Server configuration error'
            }, { status: 500 });
        }

        // Check if slug is already taken using Supabase Admin
        const { data: existing, error: checkError } = await supabaseAdmin
            .from('app_portfolios')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (checkError) {
            console.error('[SLUG_CHECK] Detailed error:', JSON.stringify(checkError, null, 2));
            return NextResponse.json({
                error: 'Failed to check slug'
            }, { status: 500 });
        }

        if (existing) {
            return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });
        }

        // Create portfolio using Supabase Admin (bypasses RLS)
        const { data: portfolio, error: insertError } = await supabaseAdmin
            .from('app_portfolios')
            .insert({
                user_id: session.user.id,
                slug: slug,
                data: data,
                template_id: templateId || 'minimal-pro',
                is_published: isPublished || false,
                is_draft: !(isPublished || false)
            })
            .select()
            .single();

        if (insertError) {
            console.error('[PORTFOLIOS_POST]', insertError);
            return NextResponse.json({ error: insertError.message || 'Failed to create portfolio' }, { status: 500 });
        }

        return NextResponse.json(portfolio, { status: 201 });
    } catch (error) {
        console.error('[PORTFOLIOS_POST]', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
