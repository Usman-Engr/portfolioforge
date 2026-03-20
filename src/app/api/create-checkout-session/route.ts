import { NextResponse } from 'next/server';

// Stripe is disabled for now
export async function POST() {
    return NextResponse.json(
        { 
            message: 'Payments are currently disabled. Please contact support.',
            debug_info: 'STRIPE_REMOVAL_VERIFIED_V3' 
        },
        { status: 503 }
    );
}
