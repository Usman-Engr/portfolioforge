import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

const TrackBodySchema = z.object({
  portfolioId: z.string().uuid(),
  sessionId: z.string().min(8).max(255),
  referrer: z.string().max(2048).optional().nullable(),
  deviceType: z.enum(['mobile', 'tablet', 'desktop']).optional(),
  browser: z.string().max(100).optional(),
  country: z.string().max(100).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  timeSpent: z.number().int().min(0).max(86400).optional(),
});

const TrackPatchSchema = z.object({
  viewId: z.string().uuid(),
  timeSpent: z.number().int().min(0).max(86400),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`analytics:post:${ip}`, {
      windowMs: 60_000,
      max: 120,
    });

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const parsed = TrackBodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const {
      portfolioId,
      sessionId,
      referrer,
      deviceType,
      browser,
      country,
      city,
      timeSpent
    } = parsed.data;

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
    const ip = getClientIp(request);
    const rate = checkRateLimit(`analytics:patch:${ip}`, {
      windowMs: 60_000,
      max: 180,
    });

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const parsed = TrackPatchSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { viewId, timeSpent } = parsed.data;

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
