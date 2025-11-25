import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    if (!portfolioId || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert view record
    const { data, error } = await supabase
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
    await supabase.rpc('increment_view_count', {
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
    const body = await request.json();

    const { viewId, timeSpent } = body;

    if (!viewId || timeSpent === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await supabase
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
