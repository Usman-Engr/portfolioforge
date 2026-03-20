import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase-admin';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: resumes, error } = await supabaseAdmin
      .from('app_resumes')
      .select('*')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[RESUMES_GET]', error);

      // Handle missing table specifically
      if (error.code === 'PGRST205' || error.message?.includes('app_resumes')) {
        return NextResponse.json({ 
          error: 'Database table "app_resumes" missing!',
          details: 'Please run the SQL migration script from the instructions I sent you in your Supabase Dashboard.',
          code: 'TABLE_MISSING'
        }, { status: 500 });
      }

      return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
    }

    return NextResponse.json(resumes || []);
  } catch (error) {
    console.error('[RESUMES_GET]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { title, templateId, data } = body;

    if (!data) return NextResponse.json({ error: 'Missing resume data' }, { status: 400 });

    const { data: resume, error } = await supabaseAdmin
      .from('app_resumes')
      .insert({
        user_id: session.user.id,
        title: title || 'Untitled Resume',
        template_id: templateId || 'resume-classic',
        data: data,
      })
      .select()
      .single();

    if (error) {
      console.error('[RESUMES_POST]', error);
      
      // Handle missing table specifically
      if (error.code === 'PGRST205' || error.message?.includes('app_resumes')) {
        return NextResponse.json({ 
          error: 'Database table "app_resumes" missing!',
          details: 'Please run the SQL migration script from the instructions I sent you in your Supabase Dashboard.',
          code: 'TABLE_MISSING'
        }, { status: 500 });
      }

      return NextResponse.json({ error: error.message || 'Failed to create resume' }, { status: 500 });
    }

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('[RESUMES_POST]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
