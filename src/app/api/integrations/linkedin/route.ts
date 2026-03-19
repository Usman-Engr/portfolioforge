import { NextRequest, NextResponse } from 'next/server';
import { fetchLinkedInProfile } from '@/lib/integrations/linkedin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

const LinkedInBodySchema = z.object({
    accessToken: z.string().min(20),
});

/**
 * POST /api/integrations/linkedin
 * Body: { accessToken: string }
 * Returns: LinkedIn profile data (id, firstName, lastName, email, avatar)
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const ip = getClientIp(request);
        const rate = checkRateLimit(`linkedin:${session.user.id}:${ip}`, {
            windowMs: 60_000,
            max: 10,
        });

        if (!rate.allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const payload = LinkedInBodySchema.safeParse(await request.json());
        if (!payload.success) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { accessToken } = payload.data;
        const profile = await fetchLinkedInProfile(accessToken);
        return NextResponse.json(profile);
    } catch (error) {
        console.error('LinkedIn import error');
        return NextResponse.json({ error: 'Failed to import LinkedIn profile' }, { status: 500 });
    }
}
