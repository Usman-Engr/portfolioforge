import { NextResponse } from 'next/server';
import { fetchLinkedInProfile } from '@/lib/integrations/linkedin';

/**
 * POST /api/integrations/linkedin
 * Body: { accessToken: string }
 * Returns: LinkedIn profile data (id, firstName, lastName, email, avatar)
 */
export async function POST(request: Request) {
    try {
        const { accessToken } = await request.json();
        if (!accessToken) {
            return NextResponse.json({ error: 'Missing access token' }, { status: 400 });
        }
        const profile = await fetchLinkedInProfile(accessToken);
        return NextResponse.json(profile);
    } catch (error) {
        console.error('LinkedIn import error:', error);
        return NextResponse.json({ error: 'Failed to import LinkedIn profile' }, { status: 500 });
    }
}
