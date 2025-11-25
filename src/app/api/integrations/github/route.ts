import { NextRequest, NextResponse } from 'next/server';
import { importGitHubProjects } from '@/lib/integrations/github';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        const { username } = await request.json();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        const projects = await importGitHubProjects(username);

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('GitHub import error:', error);
        return NextResponse.json(
            { error: 'Failed to import projects' },
            { status: 500 }
        );
    }
}
