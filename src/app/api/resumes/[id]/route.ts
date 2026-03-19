import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase-admin';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: resume, error } = await supabaseAdmin
      .from('app_resumes')
      .select('*')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('app_resumes')) {
        return NextResponse.json({ 
          error: 'Database table "app_resumes" missing!',
          code: 'TABLE_MISSING'
        }, { status: 500 });
      }
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    if (!resume) return NextResponse.json({ error: 'Resume not found' }, { status: 404 });

    return NextResponse.json(resume);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { title, templateId, data } = body;

    const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (title !== undefined) updatePayload.title = title;
    if (templateId !== undefined) updatePayload.template_id = templateId;
    if (data !== undefined) updatePayload.data = data;

    const { data: resume, error } = await supabaseAdmin
      .from('app_resumes')
      .update(updatePayload)
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      console.error('[RESUMES_PUT]', error);
      if (error.code === 'PGRST205' || error.message?.includes('app_resumes')) {
        return NextResponse.json({ 
          error: 'Database table "app_resumes" missing!',
          code: 'TABLE_MISSING'
        }, { status: 500 });
      }
      return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
    }

    return NextResponse.json(resume);
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabaseAdmin
      .from('app_resumes')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('[RESUMES_DELETE]', error);
      if (error.code === 'PGRST205' || error.message?.includes('app_resumes')) {
        return NextResponse.json({ 
          error: 'Database table "app_resumes" missing!',
          code: 'TABLE_MISSING'
        }, { status: 500 });
      }
      return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
