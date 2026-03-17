import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase-admin';

// Simple in-memory rate limiter
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || (request as any).ip || 'unknown-ip';
    
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();

    const {
      portfolioId,
      sessionId,
      referrer,
      deviceType,
      browser,
      country,
      city,
      timeSpent
    } = body;

    // Validate required fields and UUID format
    if (!portfolioId || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!uuidRegex.test(portfolioId)) {
        return NextResponse.json(
            { error: 'Invalid portfolioId format' },
            { status: 400 }
        );
    }

    // Insert view record
    const { data, error } = await supabaseAdmin
      .from('portfolio_views')
      .insert({
        portfolio_id: portfolioId,
        session_id: sessionId,
        referrer: referrer || null,
        device_type: deviceType || 'desktop',
        browser: browser || 'unknown',
        country: country || null,
        city: city || null,
        time_spent: timeSpent || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error tracking view:', error);
      return NextResponse.json(
        { error: 'Failed to track view' },
        { status: 500 }
      );
    }

    // Update portfolio view count
    await supabaseAdmin.rpc('increment_view_count', {
      portfolio_id: portfolioId
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in track endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update time spent on page
export async function PATCH(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || (request as any).ip || 'unknown-ip';
    
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();

    const { viewId, timeSpent } = body;

    if (!viewId || timeSpent === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!uuidRegex.test(viewId)) {
        return NextResponse.json(
            { error: 'Invalid viewId format' },
            { status: 400 }
        );
    }

    const { error } = await supabaseAdmin
      .from('portfolio_views')
      .update({ time_spent: timeSpent })
      .eq('id', viewId);

    if (error) {
      console.error('Error updating time spent:', error);
      return NextResponse.json(
        { error: 'Failed to update time spent' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track PATCH endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
