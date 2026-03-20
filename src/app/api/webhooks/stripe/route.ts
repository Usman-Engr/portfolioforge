import { NextResponse } from 'next/server';

// Stripe is disabled for now
export async function POST() {
    return new NextResponse('Webhooks are currently disabled.', { status: 200 });
}
