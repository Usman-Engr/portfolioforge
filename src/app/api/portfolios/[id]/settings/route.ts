import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/db/supabase';

const DEFAULT_SETTINGS = {
    seo: {
        title: '',
        description: '',
        keywords: [],
        ogImage: '',
    },
    theme: {
        colorScheme: 'blue',
        font: 'Inter',
        darkMode: false,
    },
    content: {
        showTestimonials: false,
        showCertifications: false,
        videoIntro: '',
    },
};

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify ownership
        const { data: portfolio } = await supabase
            .from('app_portfolios')
            .select('settings, user_id')
            .eq('id', params.id)
            .single();

        if (!portfolio) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 }
            );
        }

        if (portfolio.user_id !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        // Return settings with defaults merged
        return NextResponse.json({
            ...DEFAULT_SETTINGS,
            ...(portfolio.settings || {}),
        });
    } catch (error) {
        console.error('Settings fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const settings = await request.json();

        // Verify ownership
        const { data: portfolio } = await supabase
            .from('app_portfolios')
            .select('user_id')
            .eq('id', params.id)
            .single();

        if (!portfolio) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 }
            );
        }

        if (portfolio.user_id !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        // Update settings
        const { error } = await supabase
            .from('app_portfolios')
            .update({
                settings,
                updated_at: new Date().toISOString()
            })
            .eq('id', params.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
