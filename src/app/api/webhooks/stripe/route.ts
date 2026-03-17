import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/db/supabase-admin';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata?.userId;
        const templateId = session.metadata?.templateId;

        if (!userId || !templateId) {
            return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
        }

        try {
            // Record purchase in database
            const { error } = await supabaseAdmin
                .from('template_purchases')
                .insert({
                    user_id: userId,
                    template_id: templateId,
                    stripe_payment_id: session.id,
                    amount: session.amount_total,
                    status: 'completed',
                });

            if (error) {
                console.error('Error recording purchase:', error);
                return new NextResponse('Database Error', { status: 500 });
            }

        } catch (error) {
            console.error('Error processing webhook:', error);
            return new NextResponse('Internal Error', { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
